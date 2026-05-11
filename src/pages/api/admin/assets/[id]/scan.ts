import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';
import { createPresignedDownloadUrl } from '@/lib/r2';
import { getScannerVersion, scanAddonZip } from '@/lib/addonSafety';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const guard = await requireAdminApi(context, true);
  if (!guard.ok) return guard.response;

  const assetId = context.params.id;

  if (!assetId) {
    return Response.json({ error: 'Missing asset id.' }, { status: 400 });
  }

  const { data: asset, error: assetError } = await guard.admin
    .from('addon_assets')
    .select('*')
    .eq('id', assetId)
    .single();

  if (assetError || !asset) {
    return Response.json({ error: 'Asset not found.' }, { status: 404 });
  }

  if (asset.storage_status === 'deleted') {
    return Response.json({ error: 'Deleted asset cannot be scanned.' }, { status: 400 });
  }

  if (Number(asset.byte_size ?? 0) > 25 * 1024 * 1024) {
    const result = {
      status: 'warning',
      risk_level: 'medium',
      summary: 'ファイルサイズが大きいため、Worker上の簡易スキャン対象外です。手動確認が必要です。',
      findings: [
        {
          severity: 'warning',
          code: 'scan.too_large_for_worker',
          message: '25MBを超えるため、簡易スキャンを省略しました。'
        }
      ]
    };

    await guard.admin.from('addon_safety_checks').insert({
      addon_id: asset.addon_id,
      asset_id: asset.id,
      scanner_version: getScannerVersion(),
      status: result.status,
      risk_level: result.risk_level,
      summary: result.summary,
      findings: result.findings,
      created_by: guard.user.id
    });

    await guard.admin
      .from('addon_assets')
      .update({
        safety_status: result.status,
        safety_summary: result.summary,
        safety_checked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', asset.id);

    return Response.json(result);
  }

  const downloadUrl = await createPresignedDownloadUrl({
    objectKey: asset.object_key,
    fileName: asset.file_name
  });

  const fileRes = await fetch(downloadUrl);

  if (!fileRes.ok) {
    return Response.json(
      { error: `Failed to fetch asset from R2: ${fileRes.status}` },
      { status: 500 }
    );
  }

  const bytes = await fileRes.arrayBuffer();
  const result = scanAddonZip({ bytes });

  await guard.admin.from('addon_safety_checks').insert({
    addon_id: asset.addon_id,
    asset_id: asset.id,
    scanner_version: getScannerVersion(),
    status: result.status,
    risk_level: result.risk_level,
    summary: result.summary,
    findings: result.findings,
    created_by: guard.user.id
  });

  await guard.admin
    .from('addon_assets')
    .update({
      safety_status: result.status,
      safety_summary: result.summary,
      safety_checked_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', asset.id);

  await guard.admin.from('moderation_logs').insert({
    target_type: 'addon_asset',
    target_id: asset.id,
    moderator_id: guard.user.id,
    action: `safety_${result.status}`,
    note: result.summary
  });

  await guard.admin.from('audit_logs').insert({
    actor_id: guard.user.id,
    action: 'admin.asset.safety_scan',
    target_type: 'addon_asset',
    target_id: asset.id,
    metadata: {
      addon_id: asset.addon_id,
      status: result.status,
      risk_level: result.risk_level,
      findings_count: result.findings.length
    }
  });

  return Response.json(result);
};
