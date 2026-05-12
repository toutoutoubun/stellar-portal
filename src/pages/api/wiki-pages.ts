import type { APIRoute } from 'astro';
import { hasWikiEditAccess } from '@/lib/access';
import { languages } from '@/lib/i18n';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { slugify } from '@/lib/validators';

export const prerender = false;

const statuses = ['draft', 'published', 'archived'] as const;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!hasWikiEditAccess(profile as any)) {
    return Response.json({ error: 'Developer Plan is required for Wiki editing.' }, { status: 403 });
  }

  const body = await context.request.json();
  const title = String(body.title ?? '').trim().slice(0, 160);
  const content = String(body.body ?? '').trim().slice(0, 30000);
  const locale = languages.includes(body.locale) ? body.locale : 'ja';
  const slug = slugify(body.slug || title).replace(/^addon-/, 'wiki-');
  const status = statuses.includes(body.status) ? body.status : 'published';

  if (!title || title.length < 2) {
    return Response.json({ error: 'title is required.' }, { status: 400 });
  }

  if (!content || content.length < 20) {
    return Response.json({ error: 'body must be at least 20 characters.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('wiki_pages')
    .upsert(
      {
        slug,
        locale,
        title,
        body: content,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null
      },
      { onConflict: 'slug,locale' }
    )
    .select('slug,locale,status')
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ ok: true, page: data });
};
