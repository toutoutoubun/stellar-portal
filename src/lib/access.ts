import type { APIContext, AstroGlobal } from 'astro';
import { createSupabaseServer } from './supabaseServer';
import { normalizeLang } from './i18n';

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: 'free_user' | 'developer' | 'reviewer' | 'admin';
  stripe_customer_id: string | null;
  subscription_status: 'none' | 'incomplete' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
};

export function isReviewerOrAdmin(profile?: Profile | null) {
  return profile?.role === 'reviewer' || profile?.role === 'admin';
}

export function isAdmin(profile?: Profile | null) {
  return profile?.role === 'admin';
}

export function hasDeveloperAccess(profile?: Profile | null) {
  if (!profile) return false;
  return ['developer', 'reviewer', 'admin'].includes(profile.role) || ['active', 'trialing'].includes(profile.subscription_status);
}

export function hasWikiEditAccess(profile?: Profile | null) {
  return hasDeveloperAccess(profile);
}

export async function getViewer(context: APIContext | AstroGlobal) {
  const supabase = createSupabaseServer(context);
  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult.user;
  if (!user) return { user: null, profile: null };
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return { user, profile: profile as Profile | null };
}

export async function requireUser(context: APIContext | AstroGlobal) {
  const viewer = await getViewer(context);
  if (!viewer.user) {
    const lang = normalizeLang((context.params as any)?.lang);
    return { redirect: context.redirect(`/${lang}/login`) };
  }
  return viewer;
}
