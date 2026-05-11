import { defineMiddleware } from 'astro:middleware';
import { isLang } from '@/lib/i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith('/api') || pathname.startsWith('/_astro') || pathname.includes('.')) {
    return next();
  }
  if (pathname === '/') return context.redirect('/ja');
  const first = pathname.split('/').filter(Boolean)[0];
  if (!isLang(first)) return context.redirect(`/ja${pathname}`);
  return next();
});
