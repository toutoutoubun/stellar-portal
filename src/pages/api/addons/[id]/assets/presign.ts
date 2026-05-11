import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';
import { createSupabaseServer, createSupabaseAdmin } from '@/lib/supabaseServer';
import { getEnv } from '@/lib/env';

export const prerender = false;

function safeFileName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 160);
}

function requireR2Env() {
  const env = getEnv();

  const missing = [
    ['R2_ACCOUNT_ID', env.R2_ACCOUNT_ID],
    ['R2_BUCKET_NAME', env.R2_BUCKET_NAME],
    ['R2_ACCESS_KEY_ID', env.R2_ACCESS_KEY_ID],
    ['R2_SECRET_ACCESS_KEY', env.R2_SECRET_ACCESS_KEY]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Missing R2 environment variables: ${missing.join(', ')}`);
  }
}

export const POST: APIRoute = async (context) => {
  try {
    requireR2Env();

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
        review_status: 'pending',
        safety_status: 'unchecked',
        storage_status: 'active'
      })
      .select('id, object_key')
      .single();

    if (assetError || !asset) {
      return Response.json(
        { error: assetError?.message ?? 'Failed to create asset.' },
        { status: 400 }
      );
    }

    const r2 = await import('@/lib/r2');

    const uploadUrl = await r2.createPresignedUploadUrl({
      objectKey,
      contentType
    });

    return Response.json({
      asset_id: asset.id,
      object_key: objectKey,
      upload_url: uploadUrl,
      method: 'PUT'
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Presign failed.'
      },
      { status: 500 }
    );
  }
};
