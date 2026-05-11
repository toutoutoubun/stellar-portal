import type { APIContext, AstroGlobal } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';
import { getViewer } from '@/lib/access';

type RuntimeContext = APIContext | AstroGlobal;

export function isAdminRole(role: string | null | undefined) {
  return role === 'admin';
}

export function isReviewerRole(role: string | null | undefined) {
  return role === 'admin' || role === 'reviewer';
}

export async function requireAdminPage(context: AstroGlobal, lang: string) {
  const viewer = await getViewer(context);
  const role = viewer.profile?.role ?? 'free_user';

  if (!viewer.user) {
    return {
      ok: false as const,
      redirect: `/${lang}/login`,
      viewer
    };
  }

  if (!isReviewerRole(role)) {
    return {
      ok: false as const,
      redirect: `/${lang}/dashboard`,
      viewer
    };
  }

  return {
    ok: true as const,
    viewer,
    admin: createSupabaseAdmin()
  };
}

export async function requireAdminApi(context: APIContext, reviewerAllowed = true) {
  const supabase = createSupabaseServer(context);
  const admin = createSupabaseAdmin();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false as const,
      response: Response.json({ error: 'Unauthorized' }, { status: 401 })
    };
  }

  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select('id,email,role,subscription_status')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return {
      ok: false as const,
      response: Response.json({ error: 'Profile not found' }, { status: 403 })
    };
  }

  const allowed = reviewerAllowed
    ? isReviewerRole(profile.role)
    : isAdminRole(profile.role);

  if (!allowed) {
    return {
      ok: false as const,
      response: Response.json({ error: 'Forbidden' }, { status: 403 })
    };
  }

  return {
    ok: true as const,
    user,
    profile,
    admin
  };
}
