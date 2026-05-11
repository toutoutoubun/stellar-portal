import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { isReviewerOrAdmin, isAdmin } from '@/lib/access';

export const prerender = false;

const reviewStatuses = ['pending','needs_changes','approved','rejected','suspended'];
const risks = ['low','medium','high','unknown'];
const officialStatuses = ['official','reviewed','community','unreviewed'];

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!isReviewerOrAdmin(profile as any)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await context.request.json();
  const review_status = reviewStatuses.includes(body.review_status) ? body.review_status : 'pending';
  const risk_level = risks.includes(body.risk_level) ? body.risk_level : 'unknown';
  let official_status = officialStatuses.includes(body.official_status) ? body.official_status : 'unreviewed';
  if (official_status === 'official' && !isAdmin(profile as any)) return Response.json({ error: 'Only admin can mark official.' }, { status: 403 });
  if (review_status === 'approved' && official_status === 'unreviewed') official_status = 'community';

  const admin = createSupabaseAdmin();
  const { error } = await admin.from('addons').update({
    review_status,
    risk_level,
    official_status,
    published_at: review_status === 'approved' ? new Date().toISOString() : null
  }).eq('id', context.params.id);
  if (error) return Response.json({ error: error.message }, { status: 400 });

  await admin.from('moderation_logs').insert({
    target_type: 'addon',
    target_id: context.params.id,
    moderator_id: user.id,
    action: body.action ?? review_status,
    note: body.note ? String(body.note).slice(0, 2000) : null
  });

  return Response.json({ ok: true });
};
