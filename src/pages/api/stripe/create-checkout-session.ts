import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getEnv } from '@/lib/env';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { normalizeLang } from '@/lib/i18n';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const env = getEnv();

    if (
      !env.STRIPE_SECRET_KEY ||
      env.STRIPE_SECRET_KEY === 'dev-placeholder' ||
      env.STRIPE_SECRET_KEY === 'sk_test_xxx' ||
      !env.STRIPE_SECRET_KEY.startsWith('sk_')
    ) {
      return Response.json(
        { error: 'STRIPE_SECRET_KEY is not configured.' },
        { status: 400 }
      );
    }

    if (
      !env.STRIPE_DEVELOPER_PRICE_ID ||
      env.STRIPE_DEVELOPER_PRICE_ID === 'dev-placeholder' ||
      env.STRIPE_DEVELOPER_PRICE_ID === 'price_xxx' ||
      !env.STRIPE_DEVELOPER_PRICE_ID.startsWith('price_')
    ) {
      return Response.json(
        { error: 'STRIPE_DEVELOPER_PRICE_ID is not configured.' },
        { status: 400 }
      );
    }

    const body = await context.request.json().catch(() => ({}));
    const lang = normalizeLang(body.lang ?? 'ja');

    const supabase = createSupabaseServer(context);
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json(
        { error: 'You must be logged in before starting checkout.' },
        { status: 401 }
      );
    }

    const admin = createSupabaseAdmin();

    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('id,email,stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return Response.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    let customerId = profile?.stripe_customer_id as string | null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? profile?.email ?? undefined,
        metadata: {
          user_id: user.id,
          supabase_user_id: user.id
        }
      });

      customerId = customer.id;

      await admin
        .from('profiles')
        .update({
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    }

    const siteUrl = env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price: env.STRIPE_DEVELOPER_PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${siteUrl}/${lang}/dashboard/subscription?stripe=success`,
      cancel_url: `${siteUrl}/${lang}/pricing?stripe=cancelled`,
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
        supabase_user_id: user.id
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          supabase_user_id: user.id
        }
      }
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unknown Stripe checkout error.'
      },
      { status: 500 }
    );
  }
};
