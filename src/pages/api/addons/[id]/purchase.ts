import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getEnv } from '@/lib/env';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const env = getEnv();

  if (!env.STRIPE_SECRET_KEY) {
    return Response.json({ error: 'STRIPE_SECRET_KEY is not configured.' }, { status: 500 });
  }

  const addonId = context.params.id;

  if (!addonId) {
    return Response.json({ error: 'Missing addon id.' }, { status: 400 });
  }

  const supabase = createSupabaseServer(context);
  const admin = createSupabaseAdmin();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Login is required before purchase.' }, { status: 401 });
  }

  const { data: addon, error: addonError } = await admin
    .from('addons')
    .select('id, name, slug, short_description, review_status, is_paid, price_jpy, currency, sales_status')
    .eq('id', addonId)
    .single();

  if (addonError || !addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  if (addon.review_status !== 'approved') {
    return Response.json({ error: 'This addon is not available for purchase.' }, { status: 403 });
  }

  if (!addon.is_paid) {
    return Response.json({ error: 'This addon is free.' }, { status: 400 });
  }

  if (addon.sales_status !== 'for_sale') {
    return Response.json({ error: 'This addon is not currently for sale.' }, { status: 403 });
  }

  const amount = Number(addon.price_jpy ?? 0);

  if (!Number.isFinite(amount) || amount < 100) {
    return Response.json({ error: 'Invalid addon price.' }, { status: 400 });
  }

  const { data: existingPurchase } = await admin
    .from('addon_purchases')
    .select('id,status')
    .eq('addon_id', addon.id)
    .eq('user_id', user.id)
    .eq('status', 'paid')
    .maybeSingle();

  if (existingPurchase) {
    return Response.json({
      url: `${env.PUBLIC_SITE_URL}/ja/addons/${addon.slug}?purchase=already_owned`
    });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: addon.currency ?? 'jpy',
          unit_amount: amount,
          product_data: {
            name: addon.name,
            description: addon.short_description ?? undefined,
            metadata: {
              addon_id: addon.id
            }
          }
        }
      }
    ],
    success_url: `${env.PUBLIC_SITE_URL}/ja/addons/${addon.slug}?purchase=success`,
    cancel_url: `${env.PUBLIC_SITE_URL}/ja/addons/${addon.slug}?purchase=cancelled`,
    client_reference_id: user.id,
    metadata: {
      type: 'addon_purchase',
      addon_id: addon.id,
      user_id: user.id
    }
  });

  if (!session.url) {
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }

  await admin.from('addon_purchases').insert({
    user_id: user.id,
    addon_id: addon.id,
    stripe_checkout_session_id: session.id,
    amount_total: amount,
    currency: addon.currency ?? 'jpy',
    status: 'pending'
  });

  return Response.json({ url: session.url });
};
