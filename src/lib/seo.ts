import { languages, type Lang } from './i18n';

export function absoluteUrl(pathname: string, siteUrl: string) {
  return new URL(pathname, siteUrl).toString();
}

export function alternateLinks(pathname: string, siteUrl: string) {
  const parts = pathname.split('/').filter(Boolean);
  const hasLang = languages.includes(parts[0] as Lang);
  return languages.map((lang) => {
    const next = [...parts];
    if (hasLang) next[0] = lang;
    else next.unshift(lang);
    return { lang, href: absoluteUrl('/' + next.join('/'), siteUrl) };
  });
}
