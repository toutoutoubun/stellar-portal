import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

const salesStatuses = ['not_for_sale', 'for_sale', 'paused'];

export const PATCH: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const admin = createSupabaseAdmin();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const addonId = context.params.id;

  if (!addonId) {
    return Response.json({ error: 'Missing addon id.' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));

  const isPaid = Boolean(body.is_paid);
  const priceJpy = body.price_jpy === null || body.price_jpy === undefined || body.price_jpy === ''
    ? null
    : Number(body.price_jpy);
  const salesStatus = String(body.sales_status ?? 'not_for_sale');

  if (!salesStatuses.includes(salesStatus)) {
    return Response.json({ error: 'Invalid sales_status.' }, { status: 400 });
  }

  if (isPaid) {
    if (!Number.isFinite(priceJpy) || Number(priceJpy) < 100) {
      return Response.json({ error: '有料アドオンは100円以上にしてください。' }, { status: 400 });
    }
  }

  const { data: addon, error: addonError } = await admin
    .from('addons')
    .select('id, author_id, review_status')
    .eq('id', addonId)
    .single();

  if (addonError || !addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const role = profile?.role ?? 'free_user';
  const canEdit = addon.author_id === user.id || role === 'admin' || role === 'reviewer';

  if (!canEdit) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { error } = await admin
    .from('addons')
    .update({
      is_paid: isPaid,
      price_jpy: isPaid ? Number(priceJpy) : null,
      currency: 'jpy',
      sales_status: isPaid ? salesStatus : 'not_for_sale',
      updated_at: new Date().toISOString()
    })
    .eq('id', addonId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  await admin.from('audit_logs').insert({
    actor_id: user.id,
    action: 'addon.sales.update',
    target_type: 'addon',
    target_id: addonId,
    metadata: {
      is_paid: isPaid,
      price_jpy: isPaid ? Number(priceJpy) : null,
      sales_status: isPaid ? salesStatus : 'not_for_sale'
    }
  });

  return Response.json({ ok: true });
};
