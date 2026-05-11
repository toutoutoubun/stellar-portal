import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';
import { createSupabaseServer, createSupabaseAdmin } from '@/lib/supabaseServer';
import { createPresignedUploadUrl } from '@/lib/r2';

export const prerender = false;

function safeFileName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 160);
}

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

  const fileName = safeFileName(String(body.file_name ?? 'addon.zip'));
  const contentType = String(body.content_type ?? 'application/octet-stream');
  const byteSize = Number(body.byte_size ?? 0);
  const version = String(body.version ?? '0.1.0').trim();
  const checksum = String(body.checksum ?? '').trim();

  if (!version) {
    return Response.json({ error: 'Version is required.' }, { status: 400 });
  }

  if (!checksum) {
    return Response.json({ error: 'Checksum is required.' }, { status: 400 });
  }

  if (!Number.isFinite(byteSize) || byteSize <= 0) {
    return Response.json({ error: 'Invalid file size.' }, { status: 400 });
  }

  if (byteSize > 100 * 1024 * 1024) {
    return Response.json({ error: 'File is too large. Current limit is 100MB.' }, { status: 400 });
  }

  const { data: addon, error: addonError } = await admin
    .from('addons')
    .select('id, author_id, review_status')
    .eq('id', addonId)
    .single();

  if (addonError || !addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  const guard = await requireAdminApi(context, true);
  const isReviewer = guard.ok;
  const isAuthor = addon.author_id === user.id;

  if (!isAuthor && !isReviewer) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const objectKey = `addons/${addonId}/${version}/${crypto.randomUUID()}-${fileName}`;

  const { data: asset, error: assetError } = await admin
    .from('addon_assets')
    .insert({
      addon_id: addonId,
      uploader_id: user.id,
      version,
      file_name: fileName,
      object_key: objectKey,
      content_type: contentType,
      byte_size: byteSize,
      checksum,
      review_status: 'pending'
    })
    .select('id, object_key')
    .single();

  if (assetError || !asset) {
    return Response.json({ error: assetError?.message ?? 'Failed to create asset.' }, { status: 400 });
  }

  const uploadUrl = await createPresignedUploadUrl({
    objectKey,
    contentType
  });

  return Response.json({
    asset_id: asset.id,
    object_key: objectKey,
    upload_url: uploadUrl,
    method: 'PUT'
  });
};
