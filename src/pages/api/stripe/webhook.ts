import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createSupabaseAdmin } from '@/lib/supabaseServer';
import { createStripe, stripeCryptoProvider } from '@/lib/stripe';
import { getEnv } from '@/lib/env';

export const prerender = false;

function mapStripeStatus(status: string) {
  if (status === 'active') return 'active';
  if (status === 'trialing') return 'trialing';
  if (status === 'past_due') return 'past_due';
  if (status === 'canceled') return 'canceled';
  if (status === 'unpaid') return 'unpaid';
  if (status === 'incomplete' || status === 'incomplete_expired') return 'incomplete';
  return 'none';
}

async function syncSubscription(context: Parameters<APIRoute>[0], subscription: Stripe.Subscription, userIdFromMetadata?: string | null) {
  const admin = createSupabaseAdmin(context);
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  let userId = userIdFromMetadata ?? subscription.metadata?.user_id ?? null;
  if (!userId) {
    const { data: profile } = await admin.from('profiles').select('id').eq('stripe_customer_id', customerId).maybeSingle();
    userId = profile?.id ?? null;
  }
  if (!userId) return;
  const status = mapStripeStatus(subscription.status);
  await admin.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    status,
    current_period_start: subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null,
    current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    cancel_at_period_end: subscription.cancel_at_period_end
  }, { onConflict: 'stripe_subscription_id' });

  const { data: currentProfile } = await admin.from('profiles').select('role').eq('id', userId).single();
  const staffRole = currentProfile?.role === 'admin' || currentProfile?.role === 'reviewer';
  const nextRole = staffRole ? currentProfile.role : (['active','trialing'].includes(status) ? 'developer' : 'free_user');
  await admin.from('profiles').update({
    stripe_customer_id: customerId,
    subscription_status: status,
    role: nextRole
  }).eq('id', userId);
}

export const POST: APIRoute = async (context) => {
  const env = getEnv(context);
  const signature = context.request.headers.get('stripe-signature');
  if (!signature) return Response.json({ error: 'Missing signature.' }, { status: 400 });
  const body = await context.request.text();
  const stripe = createStripe(context);

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, env.STRIPE_WEBHOOK_SECRET, undefined, stripeCryptoProvider());
  } catch (err) {
    return Response.json({ error: `Webhook signature verification failed: ${(err as Error).message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode === 'subscription' && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(String(session.subscription));
      await syncSubscription(context, subscription, session.client_reference_id ?? session.metadata?.user_id ?? null);
    }
  }

  if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
    await syncSubscription(context, event.data.object as Stripe.Subscription);
  }

  return Response.json({ received: true });
};
