import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getEnv } from '@/lib/env';
import { createSupabaseAdmin } from '@/lib/supabaseServer';

export const prerender = false;

function timestampToIso(value: unknown) {
  if (typeof value !== 'number') return null;
  return new Date(value * 1000).toISOString();
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const admin = createSupabaseAdmin();
  const sub = subscription as unknown as Record<string, any>;

  const customerId =
    typeof sub.customer === 'string'
      ? sub.customer
      : sub.customer?.id ?? null;

  if (!customerId) return;

  let userId =
    sub.metadata?.supabase_user_id ??
    sub.metadata?.user_id ??
    null;

  if (!userId) {
    const { data: profile } = await admin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();

    userId = profile?.id ?? null;
  }

  if (!userId) return;

  const now = new Date().toISOString();

  await admin
    .from('profiles')
    .update({
      stripe_customer_id: customerId,
      subscription_status: String(sub.status ?? 'unknown'),
      updated_at: now
    })
    .eq('id', userId);

  await admin
    .from('subscriptions')
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: String(sub.id),
        status: String(sub.status ?? 'unknown'),
        current_period_start: timestampToIso(sub.current_period_start),
        current_period_end: timestampToIso(sub.current_period_end),
        cancel_at_period_end: Boolean(sub.cancel_at_period_end),
        updated_at: now
      },
      {
        onConflict: 'stripe_subscription_id'
      }
    );
}

export const POST: APIRoute = async (context) => {
  const env = getEnv();

  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Stripe webhook is not configured.', { status: 500 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const signature = context.request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing Stripe signature.', { status: 400 });
  }

  const body = await context.request.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : 'Invalid Stripe signature.',
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId =
          session.metadata?.supabase_user_id ??
          session.metadata?.user_id ??
          session.client_reference_id ??
          null;

        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id ?? null;

        if (userId && customerId) {
          const admin = createSupabaseAdmin();

          await admin
            .from('profiles')
            .update({
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        }

        if (typeof session.subscription === 'string') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await syncSubscription(subscription);
        }

        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscription(subscription);
        break;
      }

      default:
        break;
    }

    return Response.json({ received: true });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : 'Webhook handler failed.',
      { status: 500 }
    );
  }
};
