import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { createPresignedDownloadUrl } from '@/lib/r2';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const addonId = context.params.id;

  if (!addonId) {
    return Response.json({ error: 'Missing addon id.' }, { status: 400 });
  }

  const admin = createSupabaseAdmin();

  const { data: addon, error: addonError } = await admin
    .from('addons')
    .select('id, name, release_url, review_status, is_paid')
    .eq('id', addonId)
    .single();

  if (addonError || !addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  if (addon.review_status !== 'approved') {
    return Response.json({ error: 'This addon is not available.' }, { status: 403 });
  }

  const supabase = createSupabaseServer(context);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (addon.is_paid) {
    if (!user) {
      return Response.json({ error: 'Login is required.' }, { status: 401 });
    }

    const { data: purchase } = await admin
      .from('addon_purchases')
      .select('id')
      .eq('addon_id', addon.id)
      .eq('user_id', user.id)
      .eq('status', 'paid')
      .maybeSingle();

    if (!purchase) {
      return Response.json({ error: 'Purchase required.' }, { status: 402 });
    }
  }

  const { data: asset } = await admin
    .from('addon_assets')
    .select('id, object_key, file_name')
    .eq('addon_id', addon.id)
    .eq('review_status', 'approved')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (asset?.object_key) {
    const url = await createPresignedDownloadUrl({
      objectKey: asset.object_key,
      fileName: asset.file_name
    });

    return Response.redirect(url, 302);
  }

  if (addon.release_url) {
    return Response.redirect(addon.release_url, 302);
  }

  return Response.json({ error: 'No downloadable asset found.' }, { status: 404 });
};
