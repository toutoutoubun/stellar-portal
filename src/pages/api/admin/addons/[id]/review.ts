import type { APIRoute } from 'astro';
import { requireAdminApi } from '@/lib/admin';

export const prerender = false;

const reviewStatuses = ['pending', 'needs_changes', 'approved', 'rejected', 'suspended'];
const riskLevels = ['low', 'medium', 'high', 'unknown'];
const officialStatuses = ['official', 'reviewed', 'community', 'unreviewed'];

export const PATCH: APIRoute = async (context) => {
  const guard = await requireAdminApi(context, true);
  if (!guard.ok) return guard.response;

  const id = context.params.id;
  if (!id) {
    return Response.json({ error: 'Missing addon id' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));

  const reviewStatus = String(body.review_status ?? '');
  const riskLevel = String(body.risk_level ?? '');
  const officialStatus = String(body.official_status ?? '');
  const note = String(body.note ?? '').trim();

  if (!reviewStatuses.includes(reviewStatus)) {
    return Response.json({ error: 'Invalid review_status' }, { status: 400 });
  }

  if (!riskLevels.includes(riskLevel)) {
    return Response.json({ error: 'Invalid risk_level' }, { status: 400 });
  }

  if (!officialStatuses.includes(officialStatus)) {
    return Response.json({ error: 'Invalid official_status' }, { status: 400 });
  }

  if (officialStatus === 'official' && guard.profile.role !== 'admin') {
    return Response.json({ error: 'Only admin can mark official addons.' }, { status: 403 });
  }

  const now = new Date().toISOString();

  const update: Record<string, unknown> = {
    review_status: reviewStatus,
    risk_level: riskLevel,
    official_status: officialStatus,
    updated_at: now
  };

  if (reviewStatus === 'approved') {
    update.published_at = now;
  }

  if (reviewStatus === 'suspended' || reviewStatus === 'rejected') {
    update.published_at = null;
  }

  const { error } = await guard.admin
    .from('addons')
    .update(update)
    .eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  await guard.admin.from('moderation_logs').insert({
    target_type: 'addon',
    target_id: id,
    moderator_id: guard.user.id,
    action: reviewStatus,
    note: note || null
  });

  await guard.admin.from('audit_logs').insert({
    actor_id: guard.user.id,
    action: 'admin.addon.review',
    target_type: 'addon',
    target_id: id,
    metadata: {
      review_status: reviewStatus,
      risk_level: riskLevel,
      official_status: officialStatus
    }
  });

  return Response.json({ ok: true });
};
