export const languages = ['ja', 'en', 'fr', 'af'] as const;
export type Lang = (typeof languages)[number];

export function isLang(value: string | undefined): value is Lang {
  return !!value && languages.includes(value as Lang);
}

export function normalizeLang(value: string | undefined): Lang {
  return isLang(value) ? value : 'ja';
}

export const languageNames: Record<Lang, string> = {
  ja: '日本語',
  en: 'English',
  fr: 'Français',
  af: 'Afrikaans'
};

const dict = {
  ja: {
    portal: 'STELLAR PORTAL',
    tagline: '文献、ノート、ハイライト、グラフ、分析のためのローカルファースト研究環境。',
    readThinkWrite: '読む。考える。書く。つなげる。',
    wiki: 'Wiki',
    addons: 'Addons',
    developers: 'Developers',
    pricing: 'Pricing',
    dashboard: 'Dashboard',
    account: 'Account',
    login: 'Login',
    admin: 'Admin',
    safety: 'Safety',
    changelog: 'Changelog',
    about: 'About',
    github: 'GitHub',
    developerPlan: 'Developer Plan',
    submitAddon: 'アドオン投稿',
    reviewedAddons: '審査済みアドオン',
    officialWiki: '公式Wiki',
    localFirst: 'LOCAL-FIRST RESEARCH DESKTOP',
    coordinate: 'OBSERVATORY NODE / ARCHIVE ROOM 08-1014',
    loginHint: 'Emailでログインリンクを受け取ります。',
    noAddons: '公開中のアドオンはまだありません。',
    pending: '審査待ち',
    approved: '公開中',
    needs_changes: '修正依頼あり',
    rejected: '却下',
    suspended: '停止中',
    draft: '下書き'
  },
  en: {
    portal: 'STELLAR PORTAL',
    tagline: 'A local-first research environment for papers, notes, highlights, graphs, and analysis.',
    readThinkWrite: 'Read. Think. Write. Connect.',
    wiki: 'Wiki',
    addons: 'Addons',
    developers: 'Developers',
    pricing: 'Pricing',
    dashboard: 'Dashboard',
    account: 'Account',
    login: 'Login',
    admin: 'Admin',
    safety: 'Safety',
    changelog: 'Changelog',
    about: 'About',
    github: 'GitHub',
    developerPlan: 'Developer Plan',
    submitAddon: 'Submit addon',
    reviewedAddons: 'Reviewed addons',
    officialWiki: 'Official Wiki',
    localFirst: 'LOCAL-FIRST RESEARCH DESKTOP',
    coordinate: 'OBSERVATORY NODE / ARCHIVE ROOM 08-1014',
    loginHint: 'Receive a login link by email.',
    noAddons: 'No public addons yet.',
    pending: 'Pending review',
    approved: 'Published',
    needs_changes: 'Needs changes',
    rejected: 'Rejected',
    suspended: 'Suspended',
    draft: 'Draft'
  },
  fr: {
    portal: 'STELLAR PORTAL',
    tagline: 'Un environnement de recherche local-first pour articles, notes, surlignages, graphes et analyses.',
    readThinkWrite: 'Lire. Penser. Écrire. Relier.',
    wiki: 'Wiki',
    addons: 'Extensions',
    developers: 'Développeurs',
    pricing: 'Tarifs',
    dashboard: 'Tableau de bord',
    account: 'Compte',
    login: 'Connexion',
    admin: 'Admin',
    safety: 'Sécurité',
    changelog: 'Journal',
    about: 'À propos',
    github: 'GitHub',
    developerPlan: 'Plan Developer',
    submitAddon: 'Soumettre une extension',
    reviewedAddons: 'Extensions examinées',
    officialWiki: 'Wiki officiel',
    localFirst: 'LOCAL-FIRST RESEARCH DESKTOP',
    coordinate: 'OBSERVATORY NODE / ARCHIVE ROOM 08-1014',
    loginHint: 'Recevez un lien de connexion par email.',
    noAddons: 'Aucune extension publique pour le moment.',
    pending: 'En attente',
    approved: 'Publié',
    needs_changes: 'Modifications demandées',
    rejected: 'Rejeté',
    suspended: 'Suspendu',
    draft: 'Brouillon'
  },
  af: {
    portal: 'STELLAR PORTAL',
    tagline: '’n Plaaslik-eerste navorsingsomgewing vir artikels, notas, hoogtepunte, grafieke en analise.',
    readThinkWrite: 'Lees. Dink. Skryf. Verbind.',
    wiki: 'Wiki',
    addons: 'Byvoegings',
    developers: 'Ontwikkelaars',
    pricing: 'Pryse',
    dashboard: 'Paneel',
    account: 'Rekening',
    login: 'Teken in',
    admin: 'Admin',
    safety: 'Veiligheid',
    changelog: 'Veranderingslog',
    about: 'Oor Stellar',
    github: 'GitHub',
    developerPlan: 'Developer Plan',
    submitAddon: 'Dien byvoeging in',
    reviewedAddons: 'Gekeurde byvoegings',
    officialWiki: 'Amptelike Wiki',
    localFirst: 'LOCAL-FIRST RESEARCH DESKTOP',
    coordinate: 'OBSERVATORY NODE / ARCHIVE ROOM 08-1014',
    loginHint: 'Ontvang ’n aanmeldskakel per e-pos.',
    noAddons: 'Nog geen publieke byvoegings nie.',
    pending: 'Wag op keuring',
    approved: 'Gepubliseer',
    needs_changes: 'Veranderinge nodig',
    rejected: 'Verwerp',
    suspended: 'Geskors',
    draft: 'Konsep'
  }
} as const;

export function t(lang: Lang, key: keyof typeof dict.en): string {
  return dict[lang]?.[key] ?? dict.en[key];
}

export function localizePath(pathname: string, lang: Lang): string {
  const parts = pathname.split('/').filter(Boolean);
  if (isLang(parts[0])) parts[0] = lang;
  else parts.unshift(lang);
  return '/' + parts.join('/');
}
