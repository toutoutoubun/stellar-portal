import type { APIRoute } from 'astro';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { hasDeveloperAccess } from '@/lib/access';

export const prerender = false;

async function upsert(context: Parameters<APIRoute>[0], method: 'POST' | 'PATCH') {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!hasDeveloperAccess(profile as any)) return Response.json({ error: 'Developer Plan is required.' }, { status: 403 });
  const body = await context.request.json();
  const payload = {
    user_id: user.id,
    handle: String(body.handle ?? '').trim().toLowerCase(),
    display_name: String(body.display_name ?? '').trim(),
    bio: body.bio ? String(body.bio).slice(0, 1000) : null,
    website_url: body.website_url || null,
    github_url: body.github_url || null,
    bluesky_url: body.bluesky_url || null,
    x_url: body.x_url || null,
    linkedin_url: body.linkedin_url || null
  };
  if (!payload.handle || !payload.display_name) return Response.json({ error: 'handle and display_name are required.' }, { status: 400 });
  const { error } = await supabase.from('developer_profiles').upsert(payload, { onConflict: 'user_id' });
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ ok: true });
}

export const POST: APIRoute = (context) => upsert(context, 'POST');
export const PATCH: APIRoute = (context) => upsert(context, 'PATCH');
