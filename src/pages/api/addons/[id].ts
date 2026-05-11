import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { hasDeveloperAccess } from '@/lib/access';
import { slugify, validateAddonPayload } from '@/lib/validators';

export const prerender = false;

export const PATCH: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!hasDeveloperAccess(profile as any)) return Response.json({ error: 'Developer Plan is required.' }, { status: 403 });

  const admin = createSupabaseAdmin(context);
  const { data: existing } = await admin.from('addons').select('*').eq('id', context.params.id).single();
  if (!existing || existing.author_id !== user.id) return Response.json({ error: 'Not found.' }, { status: 404 });
  if (['approved', 'suspended'].includes(existing.review_status) && profile?.role !== 'admin' && profile?.role !== 'reviewer') {
    return Response.json({ error: 'Approved or suspended addons cannot be edited by the author in this MVP.' }, { status: 403 });
  }

  const body = await context.request.json();
  const validation = validateAddonPayload(body);
  if (!validation.ok) return Response.json({ errors: validation.errors }, { status: 400 });

  const { error } = await admin.from('addons').update({
    slug: body.slug ? slugify(body.slug) : existing.slug,
    name: String(body.name).trim(),
    short_description: String(body.short_description).trim(),
    description: String(body.description).trim(),
    default_locale: ['ja','en','fr','af'].includes(body.default_locale) ? body.default_locale : existing.default_locale,
    repo_url: body.repo_url || null,
    release_url: String(body.release_url).trim(),
    documentation_url: body.documentation_url || null,
    license: String(body.license).trim(),
    compatible_stellar_version: String(body.compatible_stellar_version).trim(),
    current_version: String(body.current_version).trim(),
    checksum: String(body.checksum).trim(),
    permissions: validation.permissions,
    review_status: 'pending',
    risk_level: validation.inferredRisk,
    published_at: null
  }).eq('id', existing.id);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ ok: true });
};
