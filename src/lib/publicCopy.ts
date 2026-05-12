import type { Lang } from './i18n';

export const publicCopy = {
  ja: {
    portalEyebrow: 'Stellarポータル',
    about: {
      title: 'Stellarについて',
      description: '論文、ノート、ハイライト、グラフ、分析のためのローカルファースト研究デスクトップ。',
      body: 'Stellarは、研究者が自分の資料と思考を手元で扱うためのデスクトップアプリです。文献、PDF、ノート、リンク、グラフ、分析をひとつの環境にまとめます。'
    },
    developers: {
      title: '開発者',
      description: '開発者登録により、審査対象のコミュニティアドオンを投稿できます。',
      body: '開発者登録は投稿権限を与えるものです。公開、順位付け、公式扱いを保証するものではありません。'
    },
    pricing: {
      title: '料金',
      description: '初期の有料プランは、アドオン投稿権限のためのプランです。',
      planTitle: '開発者プラン',
      body: '有料の開発者登録により、アドオンの投稿と更新依頼が可能になります。自動公開は行われず、すべての投稿はレビュー待ちになります。'
    },
    safety: {
      title: 'アドオンの安全性',
      description: '権限、レビュー、停止、公開ルールを明確に分けます。',
      body: [
        'アドオンは、権限、ライセンス、チェックサム、対応Stellarバージョン、リポジトリURL、リリースURLを明記する必要があります。network_access、external_command、database_access、ai_api_accessは追加確認の対象です。',
        '審査済み掲載は、Stellar本体の公式保守を意味しません。危険または誤解を招くアドオンは、管理者が停止できます。'
      ]
    },
    changelog: {
      title: '更新履歴',
      description: 'Stellarとポータルのリリースノート。',
      body: 'Stellar本体とポータルの変更を、リリース単位で記録します。'
    },
    addons: {
      title: 'アドオン',
      eyebrow: '審査済み登録所',
      description: '公式、審査済み、コミュニティアドオンを分けて表示します。MVPの配布はGitHub Releases URLを使います。',
      filters: { all: 'すべて', official: '公式', reviewed: '審査済み', community: 'コミュニティ', low: '低リスク', medium: '中リスク', high: '高リスク' }
    },
    addonDetail: {
      eyebrow: 'アドオン詳細',
      communityNotice: 'このアドオンはコミュニティ投稿です。掲載前審査は行われていますが、Stellar本体の公式保守対象ではありません。',
      labels: { author: '作者', unknown: '不明', version: 'バージョン', compatible: '対応版', license: 'ライセンス', checksum: 'チェックサム', permissions: '権限' },
      actions: { release: 'リリース', repository: 'リポジトリ', documentation: 'ドキュメント' }
    },
    login: {
      title: 'ログイン',
      eyebrow: 'アクセス端末',
      description: 'メールのマジックリンクでログインします。',
      supabaseMissing: 'Supabaseが設定されていません',
      supabaseMessage: 'PUBLIC_SUPABASE_URL または PUBLIC_SUPABASE_ANON_KEY が本番環境に設定されていません。'
    },
    legal: {
      eyebrow: '法務',
      commonDescription: 'MVP用の仮テキストです。公開前に、対象地域に合ったレビュー済み文面へ差し替えてください。',
      commonBody: 'これは公開前の仮テキストです。正式公開前に、法務レビュー済みの文面へ置き換えます。',
      reviewNotice: 'アドオン公開にはレビューがあります。開発者登録は、承認、順位付け、公式扱いを保証しません。',
      termsTitle: '利用規約',
      privacyTitle: 'プライバシーポリシー',
      addonPolicyTitle: 'アドオン投稿ポリシー'
    }
  },
  en: {
    portalEyebrow: 'Stellar portal',
    about: {
      title: 'About Stellar',
      description: 'A local-first research desktop for papers, notes, highlights, graphs, and analysis.',
      body: 'Stellar is a desktop app for researchers who want to keep their sources and thinking close at hand. It brings literature, PDFs, notes, links, graphs, and analysis into one environment.'
    },
    developers: {
      title: 'Developers',
      description: 'Developer registration grants submission rights for reviewed community addons.',
      body: 'Developer registration grants submission rights. It does not guarantee publication, ranking, or official status.'
    },
    pricing: {
      title: 'Pricing',
      description: 'The initial paid plan is for addon submission rights only.',
      planTitle: 'Developer Plan',
      body: 'Paid Developer registration enables addon submission and update requests. It does not grant automatic publication. All submissions enter pending review.'
    },
    safety: {
      title: 'Addon Safety',
      description: 'Safety, permissions, review, suspension, and publication rules.',
      body: [
        'Addons must declare permissions, license, checksum, compatible Stellar version, repository URL, and release URL. network_access, external_command, database_access, and ai_api_access require extra attention.',
        'Reviewed listing is not the same as official maintenance. Admins can suspend dangerous or misleading addons.'
      ]
    },
    changelog: {
      title: 'Changelog',
      description: 'Stellar and Portal release notes.',
      body: 'Release notes for Stellar and the Portal are tracked by release.'
    },
    addons: {
      title: 'Addons',
      eyebrow: 'reviewed registry',
      description: 'Official, reviewed, and community addons are separated. MVP distribution uses GitHub Releases URLs.',
      filters: { all: 'all', official: 'official', reviewed: 'reviewed', community: 'community', low: 'low', medium: 'medium', high: 'high' }
    },
    addonDetail: {
      eyebrow: 'addon detail',
      communityNotice: 'This addon is community-submitted and reviewed for listing, but not officially maintained by the Stellar core project.',
      labels: { author: 'Author', unknown: 'Unknown', version: 'Version', compatible: 'Compatible', license: 'License', checksum: 'Checksum', permissions: 'Permissions' },
      actions: { release: 'Release', repository: 'Repository', documentation: 'Documentation' }
    },
    login: {
      title: 'Login',
      eyebrow: 'access terminal',
      description: 'Sign in with an email magic link.',
      supabaseMissing: 'Supabase is not configured',
      supabaseMessage: 'PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY is not set in production.'
    },
    legal: {
      eyebrow: 'legal',
      commonDescription: 'MVP placeholder. Replace with reviewed legal text before public launch.',
      commonBody: 'This is a placeholder. Before launch, replace this page with jurisdiction-appropriate legal text.',
      reviewNotice: 'Addon publication is reviewed. Developer registration does not guarantee approval, ranking, or official status.',
      termsTitle: 'Terms of Service',
      privacyTitle: 'Privacy Policy',
      addonPolicyTitle: 'Addon Submission Policy'
    }
  },
  fr: {
    portalEyebrow: 'Portail Stellar',
    about: {
      title: 'À propos de Stellar',
      description: 'Un poste de recherche local pour articles, notes, surlignages, graphes et analyses.',
      body: 'Stellar est une application desktop pour les chercheurs qui veulent garder leurs sources et leur pensée près d’eux. Elle réunit références, PDF, notes, liens, graphes et analyse dans un seul environnement.'
    },
    developers: {
      title: 'Développeurs',
      description: 'L’inscription développeur donne le droit de soumettre des extensions communautaires à la revue.',
      body: 'L’inscription développeur donne un droit de soumission. Elle ne garantit ni publication, ni classement, ni statut officiel.'
    },
    pricing: {
      title: 'Tarifs',
      description: 'Le premier plan payant sert uniquement aux droits de soumission d’extensions.',
      planTitle: 'Plan développeur',
      body: 'L’inscription payante permet de soumettre des extensions et des demandes de mise à jour. Elle ne donne pas de publication automatique : chaque soumission entre en revue.'
    },
    safety: {
      title: 'Sécurité des extensions',
      description: 'Règles de sécurité, permissions, revue, suspension et publication.',
      body: [
        'Les extensions doivent déclarer permissions, licence, checksum, version Stellar compatible, URL du dépôt et URL de version. network_access, external_command, database_access et ai_api_access demandent une attention supplémentaire.',
        'Une extension examinée n’est pas forcément maintenue officiellement. Les admins peuvent suspendre les extensions dangereuses ou trompeuses.'
      ]
    },
    changelog: {
      title: 'Journal',
      description: 'Notes de version de Stellar et du Portail.',
      body: 'Les changements de Stellar et du Portail sont suivis par version.'
    },
    addons: {
      title: 'Extensions',
      eyebrow: 'registre examiné',
      description: 'Les extensions officielles, examinées et communautaires restent séparées. Le MVP distribue via des URL GitHub Releases.',
      filters: { all: 'tout', official: 'officiel', reviewed: 'examiné', community: 'communauté', low: 'faible', medium: 'moyen', high: 'élevé' }
    },
    addonDetail: {
      eyebrow: 'détail de l’extension',
      communityNotice: 'Cette extension vient de la communauté et a été examinée pour l’index, mais elle n’est pas maintenue officiellement par le coeur de Stellar.',
      labels: { author: 'Auteur', unknown: 'Inconnu', version: 'Version', compatible: 'Compatible', license: 'Licence', checksum: 'Checksum', permissions: 'Permissions' },
      actions: { release: 'Version', repository: 'Dépôt', documentation: 'Documentation' }
    },
    login: {
      title: 'Connexion',
      eyebrow: 'terminal d’accès',
      description: 'Connectez-vous avec un lien magique envoyé par email.',
      supabaseMissing: 'Supabase n’est pas configuré',
      supabaseMessage: 'PUBLIC_SUPABASE_URL ou PUBLIC_SUPABASE_ANON_KEY n’est pas défini en production.'
    },
    legal: {
      eyebrow: 'juridique',
      commonDescription: 'Texte provisoire du MVP. Remplacez-le par un texte juridique validé avant le lancement public.',
      commonBody: 'Ceci est un texte provisoire. Avant le lancement, remplacez cette page par un texte adapté à la juridiction concernée.',
      reviewNotice: 'La publication des extensions est examinée. L’inscription développeur ne garantit ni approbation, ni classement, ni statut officiel.',
      termsTitle: 'Conditions d’utilisation',
      privacyTitle: 'Politique de confidentialité',
      addonPolicyTitle: 'Politique de soumission des extensions'
    }
  },
  af: {
    portalEyebrow: 'Stellar-portaal',
    about: {
      title: 'Oor Stellar',
      description: '’n Plaaslike navorsingswerkplek vir artikels, notas, hoogtepunte, grafieke en analise.',
      body: 'Stellar is ’n desktop-app vir navorsers wat hul bronne en denke naby wil hou. Dit bring literatuur, PDF’s, notas, skakels, grafieke en analise in een omgewing saam.'
    },
    developers: {
      title: 'Ontwikkelaars',
      description: 'Ontwikkelaarregistrasie gee indieningsregte vir gekeurde gemeenskapsbyvoegings.',
      body: 'Ontwikkelaarregistrasie gee indieningsregte. Dit waarborg nie publikasie, rangorde of amptelike status nie.'
    },
    pricing: {
      title: 'Pryse',
      description: 'Die eerste betaalde plan is slegs vir byvoeging-indieningsregte.',
      planTitle: 'Ontwikkelaarsplan',
      body: 'Betaalde ontwikkelaarregistrasie maak byvoeging-indienings en opdateringsversoeke moontlik. Dit gee nie outomatiese publikasie nie. Alle indienings gaan na keuring.'
    },
    safety: {
      title: 'Byvoegingveiligheid',
      description: 'Reëls vir veiligheid, toestemmings, keuring, skorsing en publikasie.',
      body: [
        'Byvoegings moet toestemmings, lisensie, checksum, versoenbare Stellar-weergawe, repository-URL en vrystelling-URL verklaar. network_access, external_command, database_access en ai_api_access vra ekstra aandag.',
        '’n Gekeurde lysinskrywing beteken nie amptelike instandhouding nie. Admins kan gevaarlike of misleidende byvoegings skors.'
      ]
    },
    changelog: {
      title: 'Veranderingslog',
      description: 'Vrystellingsnotas vir Stellar en die Portaal.',
      body: 'Veranderinge aan Stellar en die Portaal word per vrystelling gevolg.'
    },
    addons: {
      title: 'Byvoegings',
      eyebrow: 'gekeurde register',
      description: 'Amptelike, gekeurde en gemeenskapsbyvoegings bly apart. Die MVP versprei via GitHub Releases-URL’s.',
      filters: { all: 'alles', official: 'amptelik', reviewed: 'gekeur', community: 'gemeenskap', low: 'laag', medium: 'medium', high: 'hoog' }
    },
    addonDetail: {
      eyebrow: 'byvoegingdetail',
      communityNotice: 'Hierdie byvoeging is deur die gemeenskap ingedien en vir lysinskrywing gekeur, maar word nie amptelik deur die Stellar-kernprojek onderhou nie.',
      labels: { author: 'Outeur', unknown: 'Onbekend', version: 'Weergawe', compatible: 'Versoenbaar', license: 'Lisensie', checksum: 'Checksum', permissions: 'Toestemmings' },
      actions: { release: 'Vrystelling', repository: 'Repository', documentation: 'Dokumentasie' }
    },
    login: {
      title: 'Teken in',
      eyebrow: 'toegangsterminaal',
      description: 'Meld aan met ’n magiese skakel per e-pos.',
      supabaseMissing: 'Supabase is nie gekonfigureer nie',
      supabaseMessage: 'PUBLIC_SUPABASE_URL of PUBLIC_SUPABASE_ANON_KEY is nie in produksie gestel nie.'
    },
    legal: {
      eyebrow: 'regsake',
      commonDescription: 'MVP-plekhouer. Vervang dit met nagegane regsteks voor openbare bekendstelling.',
      commonBody: 'Dit is ’n plekhouer. Voor bekendstelling moet hierdie bladsy met jurisdiksiegeskikte regsteks vervang word.',
      reviewNotice: 'Byvoegingpublikasie word gekeur. Ontwikkelaarregistrasie waarborg nie goedkeuring, rangorde of amptelike status nie.',
      termsTitle: 'Diensbepalings',
      privacyTitle: 'Privaatheidsbeleid',
      addonPolicyTitle: 'Byvoeging-indieningsbeleid'
    }
  }
} as const satisfies Record<Lang, object>;

export function getPublicCopy(lang: Lang) {
  return publicCopy[lang] ?? publicCopy.ja;
}
