import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';

export const prerender = false;

const allowedStatuses = ['pending', 'approved', 'rejected', 'suspended'];

export const PATCH: APIRoute = async (context) => {
  const guard = await requireAdminApi(context, true);
  if (!guard.ok) return guard.response;

  const assetId = context.params.id;

  if (!assetId) {
    return Response.json({ error: 'Missing asset id.' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));
  const reviewStatus = String(body.review_status ?? '');
  const note = String(body.note ?? '').trim();

  if (!allowedStatuses.includes(reviewStatus)) {
    return Response.json({ error: 'Invalid review_status.' }, { status: 400 });
  }

  const { data: asset, error: assetError } = await guard.admin
    .from('addon_assets')
    .select('*')
    .eq('id', assetId)
    .single();

  if (assetError || !asset) {
    return Response.json({ error: 'Asset not found.' }, { status: 404 });
  }

  if (reviewStatus === 'approved') {
    const safetyStatus = asset.safety_status ?? 'unchecked';

    if (!['pass', 'warning'].includes(safetyStatus)) {
      return Response.json(
        {
          error:
            'Run safety check before approving this asset. Assets with fail/error/unchecked status cannot be approved.'
        },
        { status: 400 }
      );
    }
  }

  const now = new Date().toISOString();

  const { error: updateAssetError } = await guard.admin
    .from('addon_assets')
    .update({
      review_status: reviewStatus,
      review_note: note || null,
      reviewed_by: guard.user.id,
      reviewed_at: now,
      updated_at: now
    })
    .eq('id', assetId);

  if (updateAssetError) {
    return Response.json({ error: updateAssetError.message }, { status: 400 });
  }

  if (reviewStatus === 'approved') {
    await guard.admin
      .from('addons')
      .update({
        distribution_method: 'r2',
        current_version: asset.version,
        checksum: asset.checksum,
        updated_at: now
      })
      .eq('id', asset.addon_id);

    await guard.admin.from('addon_versions').insert({
      addon_id: asset.addon_id,
      version: asset.version,
      release_url: null,
      changelog: 'Asset uploaded to Stellar Portal storage.',
      checksum: asset.checksum,
      compatible_stellar_version: null,
      permissions: null,
      review_status: 'approved'
    });
  }

  await guard.admin.from('moderation_logs').insert({
    target_type: 'addon_asset',
    target_id: assetId,
    moderator_id: guard.user.id,
    action: `asset_${reviewStatus}`,
    note: note || null
  });

  await guard.admin.from('audit_logs').insert({
    actor_id: guard.user.id,
    action: 'admin.asset.review',
    target_type: 'addon_asset',
    target_id: assetId,
    metadata: {
      addon_id: asset.addon_id,
      review_status: reviewStatus,
      note: note || null
    }
  });

  return Response.json({ ok: true });
};
