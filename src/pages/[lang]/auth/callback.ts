import type { APIRoute } from 'astro';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { normalizeLang } from '@/lib/i18n';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const lang = normalizeLang(context.params.lang);
  const requestUrl = new URL(context.request.url);
  const code = requestUrl.searchParams.get('code');
  if (code) {
    const supabase = createSupabaseServer(context);
    await supabase.auth.exchangeCodeForSession(code);
  }
  return context.redirect(`/${lang}/account`);
};
