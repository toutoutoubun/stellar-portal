import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { hasDeveloperAccess } from '@/lib/access';
import { slugify, validateAddonPayload } from '@/lib/validators';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!hasDeveloperAccess(profile as any)) return Response.json({ error: 'Developer Plan is required.' }, { status: 403 });

  const { data: developerProfile } = await supabase.from('developer_profiles').select('*').eq('user_id', user.id).maybeSingle();
  if (!developerProfile) return Response.json({ error: 'Create a developer profile first.' }, { status: 400 });

  const body = await context.request.json();
  const validation = validateAddonPayload(body);
  if (!validation.ok) return Response.json({ errors: validation.errors }, { status: 400 });

  const admin = createSupabaseAdmin();
  const slug = body.slug ? slugify(body.slug) : slugify(body.name);
  const { data, error } = await admin.from('addons').insert({
    author_id: user.id,
    developer_profile_id: developerProfile.id,
    slug,
    name: String(body.name).trim(),
    short_description: String(body.short_description).trim(),
    description: String(body.description).trim(),
    default_locale: ['ja','en','fr','af'].includes(body.default_locale) ? body.default_locale : 'en',
    repo_url: body.repo_url || null,
    release_url: String(body.release_url).trim(),
    documentation_url: body.documentation_url || null,
    license: String(body.license).trim(),
    compatible_stellar_version: String(body.compatible_stellar_version).trim(),
    current_version: String(body.current_version).trim(),
    checksum: String(body.checksum).trim(),
    permissions: validation.permissions,
    risk_level: validation.inferredRisk,
    review_status: 'pending',
    official_status: 'unreviewed'
  }).select('id').single();

  if (error) {
    if (error.code === '23505') {
      return Response.json(
        {
          error: 'This addon slug is already used.',
          message: '別のslugを指定してください。例: citation-cleaner-2'
        },
        { status: 409 }
      );
    }

    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true, id: data.id });
};
