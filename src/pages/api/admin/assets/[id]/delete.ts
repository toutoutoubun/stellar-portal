import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';
import { deleteR2Object } from '@/lib/r2';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const guard = await requireAdminApi(context, true);
  if (!guard.ok) return guard.response;

  const assetId = context.params.id;

  if (!assetId) {
    return Response.json({ error: 'Missing asset id.' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));
  const reason = String(body.reason ?? '').trim();

  const { data: asset, error: assetError } = await guard.admin
    .from('addon_assets')
    .select('*')
    .eq('id', assetId)
    .single();

  if (assetError || !asset) {
    return Response.json({ error: 'Asset not found.' }, { status: 404 });
  }

  if (asset.storage_status === 'deleted') {
    return Response.json({ ok: true, already_deleted: true });
  }

  try {
    await deleteR2Object(asset.object_key);
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete R2 object.'
      },
      { status: 500 }
    );
  }

  const now = new Date().toISOString();

  const { error: updateError } = await guard.admin
    .from('addon_assets')
    .update({
      storage_status: 'deleted',
      review_status: 'suspended',
      deleted_at: now,
      deleted_by: guard.user.id,
      deleted_reason: reason || null,
      updated_at: now
    })
    .eq('id', assetId);

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 400 });
  }

  await guard.admin.from('moderation_logs').insert({
    target_type: 'addon_asset',
    target_id: assetId,
    moderator_id: guard.user.id,
    action: 'asset_deleted',
    note: reason || null
  });

  await guard.admin.from('audit_logs').insert({
    actor_id: guard.user.id,
    action: 'admin.asset.delete',
    target_type: 'addon_asset',
    target_id: assetId,
    metadata: {
      addon_id: asset.addon_id,
      object_key: asset.object_key,
      reason: reason || null
    }
  });

  return Response.json({ ok: true });
};
