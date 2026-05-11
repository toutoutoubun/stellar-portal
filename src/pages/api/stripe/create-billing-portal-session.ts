import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { createStripe } from '@/lib/stripe';
import { getEnv } from '@/lib/env';
import { normalizeLang } from '@/lib/i18n';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await context.request.json().catch(() => ({}));
  const lang = normalizeLang(body.lang);
  const env = getEnv(context);
  const admin = createSupabaseAdmin(context);
  const { data: profile } = await admin.from('profiles').select('stripe_customer_id').eq('id', user.id).single();
  if (!profile?.stripe_customer_id) return Response.json({ error: 'No Stripe customer found.' }, { status: 400 });
  const stripe = createStripe(context);
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${env.PUBLIC_SITE_URL}/${lang}/dashboard/subscription`
  });
  return Response.json({ url: session.url });
};
