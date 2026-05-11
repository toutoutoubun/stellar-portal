import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { putR2Object } from '@/lib/r2';

export const prerender = false;

function safeFileName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 160);
}

export const POST: APIRoute = async (context) => {
  try {
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

    const form = await context.request.formData();

    const file = form.get('file');
    const version = String(form.get('version') ?? '').trim();
    const checksum = String(form.get('checksum') ?? '').trim();

    if (!(file instanceof File)) {
      return Response.json({ error: 'File is required.' }, { status: 400 });
    }

    if (!version) {
      return Response.json({ error: 'Version is required.' }, { status: 400 });
    }

    if (!checksum) {
      return Response.json({ error: 'Checksum is required.' }, { status: 400 });
    }

    if (file.size <= 0) {
      return Response.json({ error: 'Invalid file size.' }, { status: 400 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return Response.json(
        { error: 'Current Worker upload limit is 25MB for this MVP route.' },
        { status: 400 }
      );
    }

    const { data: addon, error: addonError } = await admin
      .from('addons')
      .select('id, author_id')
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

    const fileName = safeFileName(file.name || 'addon.zip');
    const objectKey = `addons/${addonId}/${version}/${crypto.randomUUID()}-${fileName}`;
    const contentType = file.type || 'application/octet-stream';

    await putR2Object({
      objectKey,
      body: await file.arrayBuffer(),
      contentType,
      metadata: {
        addon_id: addonId,
        uploader_id: user.id,
        version,
        checksum
      }
    });

    const { data: asset, error: assetError } = await admin
      .from('addon_assets')
      .insert({
        addon_id: addonId,
        uploader_id: user.id,
        version,
        file_name: fileName,
        object_key: objectKey,
        content_type: contentType,
        byte_size: file.size,
        checksum,
        review_status: 'pending',
        safety_status: 'unchecked',
        storage_status: 'active'
      })
      .select('id')
      .single();

    if (assetError || !asset) {
      return Response.json(
        { error: assetError?.message ?? 'Failed to create asset record.' },
        { status: 400 }
      );
    }

    await admin.from('moderation_logs').insert({
      target_type: 'addon_asset',
      target_id: asset.id,
      moderator_id: user.id,
      action: 'asset_uploaded',
      note: 'Developer uploaded a new addon asset. Asset remains pending until review.'
    });

    return Response.json({
      ok: true,
      asset_id: asset.id,
      object_key: objectKey
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Upload failed.'
      },
      { status: 500 }
    );
  }
};
