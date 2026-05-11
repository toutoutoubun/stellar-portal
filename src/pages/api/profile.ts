import type { APIRoute } from 'astro';
import { createSupabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

export const PATCH: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await context.request.json();
  const payload = {
    display_name: String(body.display_name ?? '').slice(0, 80),
    avatar_url: body.avatar_url ? String(body.avatar_url).slice(0, 500) : null
  };
  const { error } = await supabase.from('profiles').update(payload).eq('id', user.id);
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ ok: true });
};
