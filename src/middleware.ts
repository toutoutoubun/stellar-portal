import { defineMiddleware } from 'astro:middleware';

const locales = ['ja', 'en', 'fr', 'af'];

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // API routes must never be redirected by locale middleware.
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/og-') ||
    pathname.includes('.')
  ) {
    return next();
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0];

  if (!firstSegment || !locales.includes(firstSegment)) {
    return context.redirect(`/ja${pathname === '/' ? '' : pathname}`, 302);
  }

  return next();
});
