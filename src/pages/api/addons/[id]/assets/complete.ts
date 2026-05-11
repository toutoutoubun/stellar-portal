import type { APIRoute } from 'astro';
import { createSupabaseServer, createSupabaseAdmin } from '@/lib/supabaseServer';

export const prerender = false;

export const POST: APIRoute = async (context) => {
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
    return Response.json({ error: 'Missing addon id' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));
  const assetId = String(body.asset_id ?? '');

  if (!assetId) {
    return Response.json({ error: 'Missing asset id.' }, { status: 400 });
  }

  const { data: addon } = await admin
    .from('addons')
    .select('id, author_id')
    .eq('id', addonId)
    .single();

  if (!addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  if (addon.author_id !== user.id) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { error } = await admin
    .from('addon_assets')
    .update({
      updated_at: new Date().toISOString()
    })
    .eq('id', assetId)
    .eq('addon_id', addonId)
    .eq('uploader_id', user.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  await admin.from('moderation_logs').insert({
    target_type: 'addon_asset',
    target_id: assetId,
    moderator_id: user.id,
    action: 'asset_uploaded',
    note: 'Developer uploaded a new addon asset. Asset remains pending until review.'
  });

  return Response.json({ ok: true });
};
