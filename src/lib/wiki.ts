import type { Lang } from './i18n';

export type WikiSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type WikiPage = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  updatedAt: string;
  sections: WikiSection[];
  related: string[];
};

const updatedAt = '2026-05-12';

const jaPages: WikiPage[] = [
  {
    slug: 'home',
    title: 'Stellar Wiki',
    summary: 'Stellarの導入、基本操作、研究機能、データ保全、開発参加を整理する公式Wikiの入口。',
    category: '概要',
    updatedAt,
    sections: [
      {
        heading: 'このWikiの役割',
        body: [
          'Stellar Wikiは、READMEよりも実用寄りに、導入、使い始め、困ったときの解決、開発参加の情報を整理する場所です。',
          'READMEはプロジェクトの入口、Wikiは継続的な利用と学習の拠点として役割を分けます。'
        ]
      },
      {
        heading: 'Stellarとは',
        body: [
          'Stellarは、文献管理、ノート、グラフビュー、質的分析、量的分析、エクスポートを1つにまとめた、人文・社会科学系研究者向けの研究支援デスクトップアプリです。'
        ],
        bullets: ['ローカルファースト', 'AIなし', 'サブスクリプションなし', 'macOS / Windows / Linux対応', '日本語 / English / Francais / Afrikaans対応', 'MITライセンス']
      },
      {
        heading: 'はじめての方へ',
        body: ['まずは導入、クイックスタート、基本画面の見方を読むと、ライブラリ、ノート、グラフの流れをつかみやすくなります。'],
        bullets: ['インストールと初回セットアップ', 'クイックスタート', '基本画面の見方', 'FAQとトラブルシューティング', 'クラウドバックアップとセキュリティ']
      }
    ],
    related: ['installation-setup', 'quick-start', 'faq-troubleshooting']
  },
  {
    slug: 'installation-setup',
    title: 'インストールと初回セットアップ',
    summary: 'GitHub ReleasesからOS別にStellarを導入し、最初のオンボーディングを完了する手順。',
    category: 'はじめて',
    updatedAt,
    sections: [
      {
        heading: 'ダウンロード',
        body: ['StellarはGitHub Releasesからダウンロードします。利用しているOSに合ったインストーラーを選びます。'],
        bullets: ['macOS: .dmg', 'Windows: .msi', 'Linux: .AppImage']
      },
      {
        heading: '初回起動',
        body: [
          '初回起動時には5ステップのオンボーディングがあります。言語、保存先、テーマなど、研究環境の基本設定を順に決めます。',
          '言語、保存先、テーマはあとから設定画面で変更できます。'
        ]
      },
      {
        heading: '公開前に確認すること',
        body: ['サポート対象OSはREADMEとアプリ設定で表記がずれないように統一します。macOSの最小バージョン表記は特に確認が必要です。']
      }
    ],
    related: ['quick-start', 'settings-customization', 'faq-troubleshooting']
  },
  {
    slug: 'quick-start',
    title: 'クイックスタート',
    summary: '論文追加、PDF添付、ハイライト、ノート作成、WikiLink、グラフ確認までの最短手順。',
    category: 'はじめて',
    updatedAt,
    sections: [
      {
        heading: '最短の使い始め方',
        body: ['最初からすべての分析機能を使う必要はありません。まずはライブラリ、ノート、グラフの3つをつなげると理解しやすくなります。'],
        bullets: ['ライブラリで論文を追加する', 'PDFを添付する', 'PDFを読んでハイライトする', 'ハイライトにコメントを付ける', 'ハイライトからノートを作る', '[[ノート名]]や[[論文タイトル]]でつなげる', 'グラフビューで関係を見る', '必要に応じて草稿モードやエクスポートを使う']
      },
      {
        heading: '最初の目標',
        body: ['1本の論文から1つのノートを作り、別のノートや論文にWikiLinkで接続するところまで進めます。グラフにノードが現れれば、基本の研究ループは動いています。']
      }
    ],
    related: ['literature-library', 'pdf-reader-highlights', 'notes-wikilinks']
  },
  {
    slug: 'interface-basics',
    title: '基本画面の見方',
    summary: 'サイドバー、メインペイン、コンテキストパネルの役割と、主要画面の移動方法。',
    category: 'はじめて',
    updatedAt,
    sections: [
      {
        heading: '画面構成',
        body: ['Stellarの基本画面は、移動のためのサイドバー、作業するメインペイン、選択中の対象を詳しく見るコンテキストパネルで構成されます。'],
        bullets: ['サイドバー: ライブラリ、ノート、グラフ、分析、設定へ移動', 'メインペイン: 文献、PDF、ノート、分析結果を操作', 'コンテキストパネル: メタデータ、関連ノート、引用ネットワークを確認']
      },
      {
        heading: '操作の考え方',
        body: ['場所、操作、結果の順に画面を理解します。たとえばライブラリを開き、論文を選ぶと、右側にメタデータや関連情報が表示されます。']
      }
    ],
    related: ['literature-library', 'notes-wikilinks', 'settings-customization']
  },
  {
    slug: 'literature-library',
    title: '文献ライブラリ',
    summary: '論文、書籍、資料を追加し、検索、タグ、読書ステータスで整理する画面。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: '管理できるもの',
        body: ['文献ライブラリでは、論文、書籍、史料、Web資料などを一か所に集めて管理します。'],
        bullets: ['PDFから追加', 'URLから追加', 'DOIから追加', '手入力で追加', 'Stellar Clipperから追加']
      },
      {
        heading: '整理と絞り込み',
        body: ['タグ、検索、発行年、PDF有無、読書ステータスで文献を絞り込めます。読書ステータスは未読、読書中、完了、再読を使います。']
      },
      {
        heading: '詳細パネル',
        body: ['文献を選ぶと、メタデータ、ハイライト、関連ノート、引用ネットワークを確認できます。']
      }
    ],
    related: ['pdf-reader-highlights', 'notes-wikilinks', 'browser-clipper']
  },
  {
    slug: 'pdf-reader-highlights',
    title: 'PDFリーダーとハイライト',
    summary: 'PDF閲覧、検索、4色ハイライト、コメント、ハイライトからのノート作成。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: 'PDFを読む',
        body: ['PDFリーダーは、PDF表示、ズーム、ページ移動、PDF内検索に対応します。ライブラリの文献とPDFを紐づけて読むことができます。']
      },
      {
        heading: 'ハイライトを残す',
        body: ['選択した範囲に4色のハイライトを付け、必要に応じてコメントを追加できます。選択したハイライトからノートを作成できます。'],
        bullets: ['黄色: 重要', '緑: 方法論', '青: 自分の論点', '赤: 疑問点']
      }
    ],
    related: ['literature-library', 'notes-wikilinks', 'quick-start']
  },
  {
    slug: 'notes-wikilinks',
    title: 'ノートとWikiLink',
    summary: 'Markdownエディタ、WikiLink、バックリンク、アウトライン、自動保存、フォーカスモード。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: 'ノートを書く',
        body: ['StellarのノートはMarkdownエディタで書きます。研究メモ、読書ノート、仮説、章の下書きなどを残せます。']
      },
      {
        heading: '書きながらつなげる',
        body: ['WikiLinkは、あとから整理するためだけでなく、書きながら関係を作る機能です。[[を入力するとノート名や論文タイトルの候補が表示されます。'],
        bullets: ['[[ノート名]]でノートへ接続', '[[論文タイトル]]で文献へ接続', 'バックリンクで参照元を確認', 'アウトラインで長いノートを移動', '自動保存とフォーカスモードで執筆を継続']
      }
    ],
    related: ['knowledge-graph-citation-network', 'draft-citations', 'pdf-reader-highlights']
  },
  {
    slug: 'draft-citations',
    title: '草稿モードと引用',
    summary: '長文執筆、章管理、インライン引用、引用スタイル、参考文献生成。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: '長文を書く',
        body: ['草稿モードは、レポート、論文、調査報告などの長文を書くためのモードです。章の追加、削除、並び替え、折りたたみに対応します。']
      },
      {
        heading: '引用を扱う',
        body: ['ライブラリの文献をインライン引用として挿入し、参考文献リストを生成できます。'],
        bullets: ['APA 7th', 'MLA 9th', 'Chicago 17th', '一橋スタイル']
      }
    ],
    related: ['notes-wikilinks', 'export-research-package', 'literature-library']
  },
  {
    slug: 'knowledge-graph-citation-network',
    title: 'ナレッジグラフと引用ネットワーク',
    summary: '論文とノートの関係可視化、引用・被引用関係、関連論文レコメンデーション。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: 'ナレッジグラフ',
        body: ['ナレッジグラフは、論文とノートの関係を可視化します。ノードクリック、ホバー、ダブルクリック、ズーム、パンで関係を探索します。']
      },
      {
        heading: '引用ネットワーク',
        body: ['引用ネットワークは外部学術APIから引用・被引用関係を取得します。オフライン時は外部APIが必要な機能が制限される場合があります。'],
        bullets: ['CrossRef: DOIと書誌情報', 'OpenAlex: 学術エンティティと引用関係', 'Semantic Scholar: 論文情報と関連論文']
      },
      {
        heading: '関連論文',
        body: ['関連論文レコメンデーションから、必要な文献をワンクリックでインポートできます。']
      }
    ],
    related: ['notes-wikilinks', 'literature-library', 'quick-start']
  },
  {
    slug: 'qualitative-analysis',
    title: '質的分析',
    summary: 'コードブック、ICR、史料批判、タイムライン、比較分析など、人文・社会科学向けの分析機能。',
    category: '分析',
    updatedAt,
    sections: [
      {
        heading: '質的分析とは',
        body: ['質的分析は、文献、史料、インタビュー、政策文書などを読み解き、コード、事象、アクター、因果仮説として整理するための機能群です。']
      },
      {
        heading: '11タブ構成',
        body: ['研究者向けには、使える分析手法と出力できるものを先に示すと探しやすくなります。'],
        bullets: ['ダッシュボード: プロジェクト概要と集計', 'コードブック: 階層型コード管理', 'コーディングマトリクス: コード x 論文の集計', 'ICR: Cohen\'s Kappaと一致率', '史料批判シート: 著者、年代、真正性、バイアス、信頼性', 'タイムライン: 事象を時系列で整理', 'アクターマップ: 国家、組織、個人の関係可視化', 'プロセストレーシング: 因果仮説と証拠の検証', '比較分析: MSSD / MDSD、ケース x 変数', 'フレーミング分析: Entmanの4要素', 'レポート: 分析結果の出力']
      }
    ],
    related: ['quantitative-analysis-data-studio', 'export-research-package', 'notes-wikilinks']
  },
  {
    slug: 'quantitative-analysis-data-studio',
    title: '量的分析 Data Studio',
    summary: 'CSV取り込み、変数型、分析ウィザード、統計分析、テキスト分析、チャート出力。',
    category: '分析',
    updatedAt,
    sections: [
      {
        heading: 'CSVから分析する',
        body: ['Data StudioはCSVを取り込んで簡易統計分析を行う画面です。変数型を設定し、分析ウィザードで手法、変数、結果を順に確認します。'],
        bullets: ['scale', 'nominal', 'ordinal', 'text', 'date']
      },
      {
        heading: '対応する分析',
        body: ['記述統計、頻度表、相関分析、t検定、カイ二乗検定、線形回帰に対応します。テキストではトークン頻度、TF-IDF、チャート出力を扱えます。']
      }
    ],
    related: ['qualitative-analysis', 'export-research-package', 'settings-customization']
  },
  {
    slug: 'export-research-package',
    title: 'エクスポートと研究パッケージ',
    summary: 'PDF/DOCX/静的サイト、JSON、BibTeX/RIS、.stellar研究パッケージの出力。',
    category: 'データ',
    updatedAt,
    sections: [
      {
        heading: '出力形式',
        body: ['ノートや研究データは、用途に応じて複数形式で出力できます。'],
        bullets: ['ノート: PDF / DOCX / 静的サイト', '全データ: JSON', '文献: BibTeX / RIS', '研究一式: .stellar研究パッケージ']
      },
      {
        heading: '.stellar研究パッケージ',
        body: ['研究パッケージは、論文、ノート、ハイライト、リンク、PDFをまとめて移動・保全するための形式です。'],
        bullets: ['manifest.json', 'papers.json', 'notes.json', 'highlights.json', 'links.json', 'pdfs/']
      }
    ],
    related: ['cloud-backup-security', 'draft-citations', 'literature-library']
  },
  {
    slug: 'cloud-backup-security',
    title: 'クラウドバックアップとセキュリティ',
    summary: 'AES-256-GCM、12桁リカバリーコード、E2E暗号化、オフライン時の暗号化済みバックアップ。',
    category: 'データ',
    updatedAt,
    sections: [
      {
        heading: 'バックアップの仕組み',
        body: ['バックアップはユーザーのPC上で暗号化され、サーバーには暗号文のみが保存されます。復号鍵はクライアント側にあります。'],
        bullets: ['暗号化方式: AES-256-GCM', '復元: 12桁のリカバリーコード', 'オフライン時の保存先: ~/.stellar/cloud_backups/']
      },
      {
        heading: '重要な注意',
        body: ['リカバリーコードを失うと、新しいPCでクラウドバックアップを復元できません。設定済みPCが手元にある間に、紙、パスワード管理ツール、安全なメモなどに保管してください。']
      }
    ],
    related: ['export-research-package', 'faq-troubleshooting', 'settings-customization']
  },
  {
    slug: 'browser-clipper',
    title: 'ブラウザ連携 Stellar Clipper',
    summary: 'ローカルHTTPサーバーとブラウザ拡張による論文メタデータ取り込み。',
    category: '機能',
    updatedAt,
    sections: [
      {
        heading: '接続の仕組み',
        body: ['Stellarは127.0.0.1:57321でローカルHTTPサーバーを起動します。ブラウザ拡張は論文メタデータをPOST /api/importへ送信します。']
      },
      {
        heading: '使えないとき',
        body: ['デスクトップアプリが起動していないと、拡張機能は接続できません。拡張機能、アプリ起動状態、設定画面のブラウザ連携を確認します。']
      }
    ],
    related: ['literature-library', 'faq-troubleshooting', 'settings-customization']
  },
  {
    slug: 'settings-customization',
    title: '設定とカスタマイズ',
    summary: 'テーマ、フォント、保存先、エクスポート、バックアップ、言語、ブラウザ連携の設定。',
    category: '設定',
    updatedAt,
    sections: [
      {
        heading: '表示設定',
        body: ['テーマ、フォントサイズ、行高さ、エディタフォントを変更できます。'],
        bullets: ['White', 'Ivory', 'Dark Blue', 'Black']
      },
      {
        heading: 'データ設定',
        body: ['保存先、エクスポート、バックアップ、研究パッケージ、ブラウザ連携、クラウドバックアップはデータタブにあります。']
      },
      {
        heading: '言語',
        body: ['表示言語は日本語、English、Francais、Afrikaansに対応します。一部の変更はアプリ再起動後に反映される場合があります。']
      }
    ],
    related: ['installation-setup', 'cloud-backup-security', 'shortcuts']
  },
  {
    slug: 'shortcuts',
    title: 'ショートカット一覧',
    summary: '検索、新規ノート、設定、主要画面、エディタ、PDF、グラフ操作のショートカット。',
    category: '設定',
    updatedAt,
    sections: [
      {
        heading: 'ナビゲーション',
        body: ['MacではCmd、Windows/LinuxではCtrlを使います。'],
        bullets: ['Ctrl/Cmd + K: グローバル検索', 'Ctrl/Cmd + N: 新規ノート作成', 'Ctrl/Cmd + ,: 設定', 'Ctrl/Cmd + 1: ライブラリ', 'Ctrl/Cmd + 2: ノート', 'Ctrl/Cmd + 3: グラフ']
      },
      {
        heading: 'エディタとPDF',
        body: ['執筆とPDF閲覧でよく使う操作です。'],
        bullets: ['Ctrl/Cmd + S: 保存', 'Ctrl/Cmd + B: 太字', 'Ctrl/Cmd + I: 斜体', '[[: WikiLink候補', 'Ctrl/Cmd + F: PDF内検索', '1-4: ハイライト色選択']
      },
      {
        heading: 'グラフ',
        body: ['マウスホイールでズーム、ドラッグでパン、ダブルクリックでノードを開きます。']
      }
    ],
    related: ['settings-customization', 'notes-wikilinks', 'knowledge-graph-citation-network']
  },
  {
    slug: 'faq-troubleshooting',
    title: 'FAQとトラブルシューティング',
    summary: 'PDFメタデータ、保存、グラフ、バックアップ、言語、Clipper、分析機能のよくある問題。',
    category: 'サポート',
    updatedAt,
    sections: [
      {
        heading: 'よくある質問',
        body: ['困ったときは、対象機能、操作、結果の順に確認します。'],
        bullets: ['PDFからタイトルが取れない: PDFメタデータが不十分な場合があります。手動修正が確実です。', '自動保存が不安: ステータスバーの保存済み表示を確認します。', 'グラフに何も出ない: WikiLink、論文紐づけ、フィルタ設定を確認します。', '言語変更が一部反映されない: アプリを再起動します。', '分析機能が難しい: 最初はライブラリ、ノート、グラフだけで十分です。']
      },
      {
        heading: 'データ保全',
        body: ['データ消失が心配な場合は、クラウドバックアップ、自動バックアップ、ローカルバックアップ、研究パッケージを確認します。リカバリーコードを失うと新しいPCで復元できません。']
      }
    ],
    related: ['cloud-backup-security', 'quick-start', 'browser-clipper']
  },
  {
    slug: 'developer-setup',
    title: '開発者向けセットアップ',
    summary: 'Node.js、Rust、Tauri、React、SQLite、開発コマンド、貢献前の確認事項。',
    category: '開発',
    updatedAt,
    sections: [
      {
        heading: '必要な環境',
        body: ['Stellarの開発にはNode.js、Rust、Tauri CLIが必要です。'],
        bullets: ['Node.js 22以降', 'Rust 1.75以降', 'Tauri CLI', 'React 19', 'Tauri 2.0', 'SQLite']
      },
      {
        heading: '基本コマンド',
        body: ['公開前にnpmとpnpmの推奨を統一します。現時点の参考コマンドは以下です。'],
        bullets: ['npm install', 'npm run tauri dev', 'npm run tauri build', 'npm run lint']
      },
      {
        heading: '開発方針',
        body: ['AI機能、クラウド依存、サブスク機構を追加しない原則を、貢献方針とWikiで矛盾なく説明します。']
      }
    ],
    related: ['translation-contribution', 'addons-plugins', 'home']
  },
  {
    slug: 'translation-contribution',
    title: '翻訳に参加する',
    summary: '日本語版を安定させてから多言語へ展開する翻訳方針と、言語追加時の確認事項。',
    category: '開発',
    updatedAt,
    sections: [
      {
        heading: '翻訳方針',
        body: ['翻訳Wikiを作る場合は、まず日本語版を安定させてから英語版に展開します。UI文言を変更したら、対応するWikiの手順も確認します。']
      },
      {
        heading: '対応言語',
        body: ['Stellarは日本語、English、Francais、Afrikaansに対応します。翻訳追加手順は現在のi18n構成と一致している必要があります。']
      }
    ],
    related: ['developer-setup', 'settings-customization', 'home']
  },
  {
    slug: 'addons-plugins',
    title: 'アドオン・プラグイン作成',
    summary: '分析アドオン、配布用プラグイン、manifest、安定したプラグインIDの考え方。',
    category: '開発',
    updatedAt,
    sections: [
      {
        heading: 'ローカルアドオン',
        body: ['リポジトリ内ローカルアドオンの入口はsrc/plugins/registerAnalysisAddons.tsです。質的分析タブ追加と量的分析手法追加の2系統があります。']
      },
      {
        heading: '配布用プラグイン',
        body: ['配布用プラグインはstellar-plugin.jsonとindex.jsを含むフォルダ、または.zip / .stellar-pluginとして扱います。プラグインIDは安定した英数字とハイフンにします。']
      },
      {
        heading: '公開前の確認',
        body: ['プラグイン機能は実装状況と公開状態を確認してからWikiに載せます。仕様ページでは実装済みと計画中を混ぜません。']
      }
    ],
    related: ['developer-setup', 'qualitative-analysis', 'quantitative-analysis-data-studio']
  }
];

const localizedMeta: Record<Exclude<Lang, 'ja'>, Record<string, { title: string; summary: string; category: string }>> = {
  en: {
    home: { title: 'Stellar Wiki', summary: 'Official practical documentation for installing, learning, troubleshooting, and contributing to Stellar.', category: 'Overview' },
    'installation-setup': { title: 'Installation and first setup', summary: 'Download Stellar from GitHub Releases and complete the first onboarding flow.', category: 'Start' },
    'quick-start': { title: 'Quick start', summary: 'The shortest path from adding a paper to notes, WikiLinks, and the graph.', category: 'Start' },
    'interface-basics': { title: 'Interface basics', summary: 'How the sidebar, main pane, and context panel fit together.', category: 'Start' },
    'literature-library': { title: 'Literature library', summary: 'Add, search, tag, and track papers, books, and sources.', category: 'Features' },
    'pdf-reader-highlights': { title: 'PDF reader and highlights', summary: 'Read PDFs, search, highlight, comment, and create notes from highlights.', category: 'Features' },
    'notes-wikilinks': { title: 'Notes and WikiLinks', summary: 'Markdown notes, WikiLinks, backlinks, outlines, autosave, and focus mode.', category: 'Features' },
    'draft-citations': { title: 'Draft mode and citations', summary: 'Long-form writing, sections, inline citations, styles, and bibliography generation.', category: 'Features' },
    'knowledge-graph-citation-network': { title: 'Knowledge graph and citation network', summary: 'Visualize notes, papers, citations, and related-paper discovery.', category: 'Features' },
    'qualitative-analysis': { title: 'Qualitative analysis', summary: 'Codebooks, ICR, source criticism, timelines, actor maps, and comparative analysis.', category: 'Analysis' },
    'quantitative-analysis-data-studio': { title: 'Quantitative analysis Data Studio', summary: 'CSV import, variable types, statistics, text analysis, and charts.', category: 'Analysis' },
    'export-research-package': { title: 'Export and research packages', summary: 'PDF, DOCX, static site, JSON, BibTeX, RIS, and .stellar packages.', category: 'Data' },
    'cloud-backup-security': { title: 'Cloud backup and security', summary: 'AES-256-GCM, recovery codes, encrypted backups, and restore limits.', category: 'Data' },
    'browser-clipper': { title: 'Browser integration Stellar Clipper', summary: 'Local HTTP import from the browser extension into Stellar.', category: 'Features' },
    'settings-customization': { title: 'Settings and customization', summary: 'Themes, fonts, storage, export, backup, language, and browser integration.', category: 'Settings' },
    shortcuts: { title: 'Shortcuts', summary: 'Navigation, editor, PDF, and graph shortcuts.', category: 'Settings' },
    'faq-troubleshooting': { title: 'FAQ and troubleshooting', summary: 'Common fixes for metadata, autosave, graph, backup, language, and Clipper issues.', category: 'Support' },
    'developer-setup': { title: 'Developer setup', summary: 'Node.js, Rust, Tauri, React, SQLite, and development commands.', category: 'Development' },
    'translation-contribution': { title: 'Contributing translations', summary: 'Translation policy and language support notes.', category: 'Development' },
    'addons-plugins': { title: 'Creating addons and plugins', summary: 'Analysis addons, distributable plugins, manifests, and plugin IDs.', category: 'Development' }
  },
  fr: {
    home: { title: 'Wiki Stellar', summary: 'Documentation officielle pratique pour installer Stellar, apprendre les bases, resoudre les problemes et contribuer.', category: 'Vue d ensemble' },
    'installation-setup': { title: 'Installation et premier demarrage', summary: 'Telecharger Stellar depuis GitHub Releases et terminer le premier parcours de configuration.', category: 'Debut' },
    'quick-start': { title: 'Demarrage rapide', summary: 'Le chemin le plus court entre l ajout d un article, les notes, les WikiLinks et le graphe.', category: 'Debut' },
    'interface-basics': { title: 'Bases de l interface', summary: 'Comprendre la barre laterale, le panneau principal et le panneau de contexte.', category: 'Debut' },
    'literature-library': { title: 'Bibliotheque de references', summary: 'Ajouter, chercher, taguer et suivre articles, livres et sources.', category: 'Fonctions' },
    'pdf-reader-highlights': { title: 'Lecteur PDF et surlignages', summary: 'Lire, chercher, surligner, commenter et creer des notes depuis les surlignages.', category: 'Fonctions' },
    'notes-wikilinks': { title: 'Notes et WikiLinks', summary: 'Notes Markdown, WikiLinks, backlinks, plan, sauvegarde automatique et mode focus.', category: 'Fonctions' },
    'draft-citations': { title: 'Mode brouillon et citations', summary: 'Ecriture longue, sections, citations, styles bibliographiques et bibliographie.', category: 'Fonctions' },
    'knowledge-graph-citation-network': { title: 'Graphe de connaissances et reseau de citations', summary: 'Visualiser notes, articles, citations et recommandations de lectures.', category: 'Fonctions' },
    'qualitative-analysis': { title: 'Analyse qualitative', summary: 'Codebooks, ICR, critique des sources, timelines, cartes d acteurs et comparaison.', category: 'Analyse' },
    'quantitative-analysis-data-studio': { title: 'Analyse quantitative Data Studio', summary: 'Import CSV, types de variables, statistiques, analyse textuelle et graphiques.', category: 'Analyse' },
    'export-research-package': { title: 'Export et paquet de recherche', summary: 'PDF, DOCX, site statique, JSON, BibTeX, RIS et paquets .stellar.', category: 'Donnees' },
    'cloud-backup-security': { title: 'Sauvegarde cloud et securite', summary: 'AES-256-GCM, code de recuperation, sauvegardes chiffrees et limites de restauration.', category: 'Donnees' },
    'browser-clipper': { title: 'Integration navigateur Stellar Clipper', summary: 'Import local depuis l extension navigateur vers Stellar.', category: 'Fonctions' },
    'settings-customization': { title: 'Parametres et personnalisation', summary: 'Themes, polices, stockage, export, sauvegarde, langue et integration navigateur.', category: 'Parametres' },
    shortcuts: { title: 'Raccourcis', summary: 'Raccourcis de navigation, editeur, PDF et graphe.', category: 'Parametres' },
    'faq-troubleshooting': { title: 'FAQ et depannage', summary: 'Solutions pour metadata, autosave, graphe, sauvegarde, langue et Clipper.', category: 'Support' },
    'developer-setup': { title: 'Configuration developpeur', summary: 'Node.js, Rust, Tauri, React, SQLite et commandes de developpement.', category: 'Developpement' },
    'translation-contribution': { title: 'Contribuer aux traductions', summary: 'Politique de traduction et notes de prise en charge linguistique.', category: 'Developpement' },
    'addons-plugins': { title: 'Creer des addons et plugins', summary: 'Addons d analyse, plugins distribuables, manifests et identifiants de plugin.', category: 'Developpement' }
  },
  af: {
    home: { title: 'Stellar Wiki', summary: 'Amptelike praktiese dokumentasie vir installasie, leer, probleemoplossing en bydraes.', category: 'Oorsig' },
    'installation-setup': { title: 'Installasie en eerste opstelling', summary: 'Laai Stellar vanaf GitHub Releases af en voltooi die eerste opstelling.', category: 'Begin' },
    'quick-start': { title: 'Vinnige begin', summary: 'Die kortste roete van artikel byvoeg tot notas, WikiLinks en die grafiek.', category: 'Begin' },
    'interface-basics': { title: 'Basiese koppelvlak', summary: 'Verstaan die sybalk, hoofpaneel en konteks-paneel.', category: 'Begin' },
    'literature-library': { title: 'Literatuurbiblioteek', summary: 'Voeg artikels, boeke en bronne by, soek, merk en volg leesstatus.', category: 'Funksies' },
    'pdf-reader-highlights': { title: 'PDF-leser en hoogtepunte', summary: 'Lees PDF s, soek, merk, lewer kommentaar en skep notas uit hoogtepunte.', category: 'Funksies' },
    'notes-wikilinks': { title: 'Notas en WikiLinks', summary: 'Markdown-notas, WikiLinks, backlinks, buitelyn, outostoor en fokusmodus.', category: 'Funksies' },
    'draft-citations': { title: 'Konsepmodus en aanhalings', summary: 'Langvorm skryfwerk, afdelings, aanhalings, stylkeuses en bibliografie.', category: 'Funksies' },
    'knowledge-graph-citation-network': { title: 'Kennisgrafiek en aanhalingsnetwerk', summary: 'Visualiseer notas, artikels, aanhalings en verwante literatuur.', category: 'Funksies' },
    'qualitative-analysis': { title: 'Kwalitatiewe analise', summary: 'Kodeboeke, ICR, bronkritiek, tydlyne, akteurkaarte en vergelyking.', category: 'Analise' },
    'quantitative-analysis-data-studio': { title: 'Kwantitatiewe analise Data Studio', summary: 'CSV-invoer, veranderliketipes, statistiek, teksanalise en grafieke.', category: 'Analise' },
    'export-research-package': { title: 'Uitvoer en navorsingspakkette', summary: 'PDF, DOCX, statiese webwerf, JSON, BibTeX, RIS en .stellar-pakkette.', category: 'Data' },
    'cloud-backup-security': { title: 'Wolk-rugsteun en veiligheid', summary: 'AES-256-GCM, herstelkode, geënkripteerde rugsteun en herstelbeperkings.', category: 'Data' },
    'browser-clipper': { title: 'Blaaierintegrasie Stellar Clipper', summary: 'Plaaslike invoer vanaf die blaaieruitbreiding na Stellar.', category: 'Funksies' },
    'settings-customization': { title: 'Instellings en aanpassing', summary: 'Temas, lettertipes, stoorplek, uitvoer, rugsteun, taal en blaaierintegrasie.', category: 'Instellings' },
    shortcuts: { title: 'Kortpaaie', summary: 'Kortpaaie vir navigasie, redigeerder, PDF en grafiek.', category: 'Instellings' },
    'faq-troubleshooting': { title: 'FAQ en probleemoplossing', summary: 'Oplossings vir metadata, outostoor, grafiek, rugsteun, taal en Clipper.', category: 'Ondersteuning' },
    'developer-setup': { title: 'Ontwikkelaaropstelling', summary: 'Node.js, Rust, Tauri, React, SQLite en ontwikkelopdragte.', category: 'Ontwikkeling' },
    'translation-contribution': { title: 'Bydra tot vertalings', summary: 'Vertaalbeleid en notas oor taalondersteuning.', category: 'Ontwikkeling' },
    'addons-plugins': { title: 'Skep addons en plugins', summary: 'Analise-addons, verspreibare plugins, manifests en plugin-ID s.', category: 'Ontwikkeling' }
  }
};

const localizedGuidance: Record<Exclude<Lang, 'ja'>, Record<string, string[]>> = {
  en: {
    home: ['Use the Wiki for practical procedures, not project marketing.', 'Stellar is local-first, AI-free, subscription-free, and MIT licensed.', 'Start with installation, quick start, interface basics, FAQ, and backups.'],
    'installation-setup': ['Download from GitHub Releases.', 'Use .dmg for macOS, .msi for Windows, and .AppImage for Linux.', 'Complete onboarding, then adjust language, storage location, and theme later in Settings.'],
    'quick-start': ['Add one paper to the library.', 'Attach a PDF and create highlights.', 'Create a note from a highlight.', 'Connect notes and papers with [[WikiLinks]].', 'Open the graph to confirm the research loop.'],
    'interface-basics': ['Use the sidebar for major areas.', 'Work in the main pane.', 'Read metadata, linked notes, and citation context in the context panel.'],
    'literature-library': ['Add sources by PDF, URL, DOI, manual entry, or Stellar Clipper.', 'Filter by tags, search, year, PDF presence, and reading status.', 'Use unread, reading, completed, and reread statuses.'],
    'pdf-reader-highlights': ['Read PDFs with zoom, page navigation, and search.', 'Use four highlight colors for different reading roles.', 'Add comments and create notes from selected highlights.'],
    'notes-wikilinks': ['Write in Markdown.', 'Type [[ to complete note or paper links.', 'Use backlinks and outlines to navigate longer notes.', 'Keep focus mode for sustained writing.'],
    'draft-citations': ['Create, reorder, collapse, and remove sections.', 'Insert inline citations from the library.', 'Generate bibliographies in APA, MLA, Chicago, or Hitotsubashi style.'],
    'knowledge-graph-citation-network': ['Click, hover, double-click, zoom, and pan graph nodes.', 'Use CrossRef, OpenAlex, and Semantic Scholar when online.', 'Import recommended related papers when they are useful.'],
    'qualitative-analysis': ['Begin with codebooks and coding matrices.', 'Use ICR for agreement checks.', 'Use source criticism, timelines, actor maps, process tracing, comparison, framing, and reports as needed.'],
    'quantitative-analysis-data-studio': ['Import CSV files.', 'Assign scale, nominal, ordinal, text, or date variables.', 'Run descriptive statistics, frequency tables, correlations, tests, regression, token frequency, TF-IDF, and charts.'],
    'export-research-package': ['Export notes as PDF, DOCX, or a static site.', 'Export all data as JSON.', 'Use BibTeX or RIS for references.', 'Use .stellar packages to move papers, notes, highlights, links, and PDFs together.'],
    'cloud-backup-security': ['Backups are encrypted on the user device.', 'AES-256-GCM is used for encrypted backups.', 'Keep the 12-digit recovery code safe.', 'Without the recovery code, a new computer cannot restore cloud backups.'],
    'browser-clipper': ['Stellar listens on 127.0.0.1:57321.', 'The extension sends metadata to POST /api/import.', 'The desktop app must be running before the extension can connect.'],
    'settings-customization': ['Choose White, Ivory, Dark Blue, or Black themes.', 'Adjust font size, line height, and editor font.', 'Use the Data tab for storage, export, backup, research packages, browser integration, and cloud backup.'],
    shortcuts: ['Ctrl/Cmd + K opens global search.', 'Ctrl/Cmd + N creates a note.', 'Ctrl/Cmd + , opens settings.', 'Ctrl/Cmd + F searches inside PDFs.', 'Mouse wheel zooms the graph and drag pans it.'],
    'faq-troubleshooting': ['Fix missing PDF titles manually when metadata is poor.', 'Check WikiLinks, paper links, and filters when the graph is empty.', 'Use cloud backup, local backup, automatic backup, and research packages for data safety.'],
    'developer-setup': ['Use Node.js 22 or later, Rust 1.75 or later, and Tauri CLI.', 'Run npm install, npm run tauri dev, npm run tauri build, and npm run lint.', 'Keep development guidance aligned with the no-AI, local-first direction.'],
    'translation-contribution': ['Stabilize Japanese first, then translate.', 'Keep UI text and Wiki procedures in sync.', 'Check the current i18n structure before adding languages.'],
    'addons-plugins': ['Local analysis addons start at src/plugins/registerAnalysisAddons.ts.', 'There are qualitative tabs and quantitative method additions.', 'Distributed plugins include stellar-plugin.json and index.js.', 'Use stable alphanumeric and hyphenated plugin IDs.']
  },
  fr: {
    home: ['Utiliser le Wiki pour les procedures pratiques.', 'Stellar reste local-first, sans IA, sans abonnement et sous licence MIT.', 'Commencer par installation, demarrage rapide, interface, FAQ et sauvegardes.'],
    'installation-setup': ['Telecharger depuis GitHub Releases.', 'Utiliser .dmg pour macOS, .msi pour Windows et .AppImage pour Linux.', 'Finir l onboarding puis modifier langue, dossier et theme dans les parametres.'],
    'quick-start': ['Ajouter un article dans la bibliotheque.', 'Attacher un PDF et creer des surlignages.', 'Creer une note depuis un surlignage.', 'Relier notes et articles avec [[WikiLinks]].', 'Ouvrir le graphe pour verifier la boucle de recherche.'],
    'interface-basics': ['Utiliser la barre laterale pour naviguer.', 'Travailler dans le panneau principal.', 'Lire metadata, notes liees et contexte de citation dans le panneau de contexte.'],
    'literature-library': ['Ajouter par PDF, URL, DOI, saisie manuelle ou Stellar Clipper.', 'Filtrer par tags, recherche, annee, presence du PDF et statut de lecture.', 'Utiliser non lu, en cours, termine et a relire.'],
    'pdf-reader-highlights': ['Lire avec zoom, navigation et recherche.', 'Utiliser quatre couleurs de surlignage.', 'Ajouter des commentaires et creer des notes depuis les surlignages.'],
    'notes-wikilinks': ['Ecrire en Markdown.', 'Taper [[ pour completer les liens.', 'Utiliser backlinks et plan pour les notes longues.', 'Garder le mode focus pour l ecriture.'],
    'draft-citations': ['Creer, reordonner, replier et supprimer des sections.', 'Inserer des citations depuis la bibliotheque.', 'Generer la bibliographie en APA, MLA, Chicago ou style Hitotsubashi.'],
    'knowledge-graph-citation-network': ['Cliquer, survoler, double-cliquer, zoomer et deplacer les noeuds.', 'Utiliser CrossRef, OpenAlex et Semantic Scholar en ligne.', 'Importer les articles recommandes si utiles.'],
    'qualitative-analysis': ['Commencer par codebook et matrice de codage.', 'Utiliser ICR pour verifier l accord.', 'Employer critique des sources, timeline, acteurs, process tracing, comparaison, cadrage et rapports.'],
    'quantitative-analysis-data-studio': ['Importer des CSV.', 'Definir variables scale, nominal, ordinal, text ou date.', 'Executer statistiques descriptives, frequences, correlations, tests, regression, frequence de tokens, TF-IDF et graphiques.'],
    'export-research-package': ['Exporter les notes en PDF, DOCX ou site statique.', 'Exporter toutes les donnees en JSON.', 'Utiliser BibTeX ou RIS pour les references.', 'Regrouper articles, notes, surlignages, liens et PDF dans un paquet .stellar.'],
    'cloud-backup-security': ['Les sauvegardes sont chiffrees sur le poste utilisateur.', 'AES-256-GCM est utilise.', 'Conserver le code de recuperation a 12 chiffres.', 'Sans ce code, un nouveau PC ne peut pas restaurer la sauvegarde cloud.'],
    'browser-clipper': ['Stellar ecoute sur 127.0.0.1:57321.', 'L extension envoie les metadata vers POST /api/import.', 'L application desktop doit etre lancee.'],
    'settings-customization': ['Choisir White, Ivory, Dark Blue ou Black.', 'Regler taille, hauteur de ligne et police editeur.', 'Utiliser l onglet Donnees pour stockage, export, sauvegarde, paquets, navigateur et cloud.'],
    shortcuts: ['Ctrl/Cmd + K ouvre la recherche.', 'Ctrl/Cmd + N cree une note.', 'Ctrl/Cmd + , ouvre les parametres.', 'Ctrl/Cmd + F cherche dans le PDF.', 'La molette zoome le graphe et le glisser deplace.'],
    'faq-troubleshooting': ['Corriger les titres PDF manuellement si les metadata sont pauvres.', 'Verifier WikiLinks, liens d articles et filtres si le graphe est vide.', 'Utiliser sauvegardes cloud, locales, automatiques et paquets de recherche.'],
    'developer-setup': ['Utiliser Node.js 22+, Rust 1.75+ et Tauri CLI.', 'Executer npm install, npm run tauri dev, npm run tauri build et npm run lint.', 'Garder la direction sans IA et local-first.'],
    'translation-contribution': ['Stabiliser le japonais avant traduction.', 'Synchroniser textes UI et procedures Wiki.', 'Verifier la structure i18n actuelle avant d ajouter une langue.'],
    'addons-plugins': ['Les addons locaux commencent dans src/plugins/registerAnalysisAddons.ts.', 'Deux axes: onglets qualitatifs et methodes quantitatives.', 'Les plugins distribues contiennent stellar-plugin.json et index.js.', 'Utiliser des IDs stables avec lettres, chiffres et tirets.']
  },
  af: {
    home: ['Gebruik die Wiki vir praktiese stappe.', 'Stellar bly plaaslik-eerste, sonder AI, sonder intekening en MIT-gelisensieer.', 'Begin met installasie, vinnige begin, koppelvlak, FAQ en rugsteun.'],
    'installation-setup': ['Laai af vanaf GitHub Releases.', 'Gebruik .dmg vir macOS, .msi vir Windows en .AppImage vir Linux.', 'Voltooi opstelling en verander later taal, stoorplek en tema in Instellings.'],
    'quick-start': ['Voeg een artikel by die biblioteek.', 'Heg n PDF aan en maak hoogtepunte.', 'Skep n nota uit n hoogtepunt.', 'Verbind notas en artikels met [[WikiLinks]].', 'Maak die grafiek oop om die navorsingslus te sien.'],
    'interface-basics': ['Gebruik die sybalk vir navigasie.', 'Werk in die hoofpaneel.', 'Lees metadata, gekoppelde notas en aanhalingskonteks in die konteks-paneel.'],
    'literature-library': ['Voeg bronne by met PDF, URL, DOI, handinvoer of Stellar Clipper.', 'Filter volgens tags, soek, jaar, PDF en leesstatus.', 'Gebruik ongelees, besig, voltooi en herlees.'],
    'pdf-reader-highlights': ['Lees PDF s met zoom, bladsybeweging en soek.', 'Gebruik vier kleure vir verskillende leesdoeleindes.', 'Voeg kommentaar by en skep notas uit hoogtepunte.'],
    'notes-wikilinks': ['Skryf in Markdown.', 'Tik [[ om skakels te voltooi.', 'Gebruik backlinks en buitelyne vir lang notas.', 'Gebruik fokusmodus vir skryfwerk.'],
    'draft-citations': ['Skep, herrangskik, vou en verwyder afdelings.', 'Voeg aanhalings uit die biblioteek in.', 'Genereer bibliografiee in APA, MLA, Chicago of Hitotsubashi-styl.'],
    'knowledge-graph-citation-network': ['Klik, sweef, dubbelklik, zoom en pan nodusse.', 'Gebruik CrossRef, OpenAlex en Semantic Scholar wanneer aanlyn.', 'Voer aanbevole verwante artikels in wanneer nuttig.'],
    'qualitative-analysis': ['Begin met kodeboeke en kodematrikse.', 'Gebruik ICR vir ooreenstemming.', 'Gebruik bronkritiek, tydlyne, akteurkaarte, prosesnasporing, vergelyking, framing en verslae.'],
    'quantitative-analysis-data-studio': ['Voer CSV-lêers in.', 'Ken scale, nominal, ordinal, text of date veranderlikes toe.', 'Gebruik beskrywende statistiek, frekwensies, korrelasies, toetse, regressie, tokenfrekwensie, TF-IDF en grafieke.'],
    'export-research-package': ['Voer notas uit as PDF, DOCX of statiese webwerf.', 'Voer alle data as JSON uit.', 'Gebruik BibTeX of RIS vir verwysings.', 'Gebruik .stellar-pakkette vir artikels, notas, hoogtepunte, skakels en PDF s.'],
    'cloud-backup-security': ['Rugsteun word op die gebruiker se toestel geënkripteer.', 'AES-256-GCM word gebruik.', 'Bewaar die 12-syfer herstelkode veilig.', 'Sonder die kode kan n nuwe rekenaar nie wolk-rugsteun herstel nie.'],
    'browser-clipper': ['Stellar luister op 127.0.0.1:57321.', 'Die uitbreiding stuur metadata na POST /api/import.', 'Die desktop-app moet loop voordat die uitbreiding kan koppel.'],
    'settings-customization': ['Kies White, Ivory, Dark Blue of Black.', 'Pas lettergrootte, lynhoogte en redigeerder-font aan.', 'Gebruik die Data-oortjie vir stoorplek, uitvoer, rugsteun, pakkette, blaaier en wolk.'],
    shortcuts: ['Ctrl/Cmd + K open globale soek.', 'Ctrl/Cmd + N skep n nota.', 'Ctrl/Cmd + , open instellings.', 'Ctrl/Cmd + F soek in PDF.', 'Muiswiel zoom die grafiek en sleep pan.'],
    'faq-troubleshooting': ['Wysig PDF-titels handmatig as metadata swak is.', 'Kontroleer WikiLinks, artikelskakels en filters as die grafiek leeg is.', 'Gebruik wolk-, plaaslike en outomatiese rugsteun plus navorsingspakkette.'],
    'developer-setup': ['Gebruik Node.js 22+, Rust 1.75+ en Tauri CLI.', 'Voer npm install, npm run tauri dev, npm run tauri build en npm run lint uit.', 'Hou ontwikkeling plaaslik-eerste en sonder AI.'],
    'translation-contribution': ['Stabiliseer Japanees eerste en vertaal dan.', 'Hou UI-teks en Wiki-stappe gesinchroniseer.', 'Kontroleer die huidige i18n-struktuur voordat tale bygevoeg word.'],
    'addons-plugins': ['Plaaslike addons begin by src/plugins/registerAnalysisAddons.ts.', 'Daar is kwalitatiewe tabs en kwantitatiewe metode-byvoegings.', 'Verspreide plugins bevat stellar-plugin.json en index.js.', 'Gebruik stabiele alfanumeriese en koppelteken plugin-ID s.']
  }
};

const localizedLabels = {
  en: {
    overview: 'Overview',
    guidance: 'Main guidance',
    intro: 'Use this page as a practical checklist for the feature or workflow.',
    principle: 'Stellar keeps research data local-first and asks the researcher to stay in control.'
  },
  fr: {
    overview: 'Vue d ensemble',
    guidance: 'Guide principal',
    intro: 'Utilisez cette page comme checklist pratique pour la fonction ou le flux.',
    principle: 'Stellar reste local-first et laisse le chercheur garder le controle.'
  },
  af: {
    overview: 'Oorsig',
    guidance: 'Hoofriglyne',
    intro: 'Gebruik hierdie bladsy as n praktiese kontrolelys vir die funksie of vloei.',
    principle: 'Stellar hou navorsingsdata plaaslik-eerste en laat die navorser in beheer.'
  }
} satisfies Record<Exclude<Lang, 'ja'>, Record<string, string>>;

function makeLocalizedPages(lang: Exclude<Lang, 'ja'>): WikiPage[] {
  const meta = localizedMeta[lang];
  const labels = localizedLabels[lang];
  const guidance = localizedGuidance[lang];

  return jaPages.map((page) => {
    const localized = meta[page.slug] ?? localizedMeta.en[page.slug];
    return {
      ...page,
      title: localized.title,
      summary: localized.summary,
      category: localized.category,
      sections: [
        {
          heading: labels.overview,
          body: [localized.summary, labels.principle]
        },
        {
          heading: labels.guidance,
          body: [labels.intro],
          bullets: guidance[page.slug] ?? []
        }
      ]
    };
  });
}

export const wikiPages: Record<Lang, WikiPage[]> = {
  ja: jaPages,
  en: makeLocalizedPages('en'),
  fr: makeLocalizedPages('fr'),
  af: makeLocalizedPages('af')
};

export type WikiPageRecord = {
  slug: string;
  locale: Lang;
  title: string;
  body: string;
  updated_at?: string | null;
};

const dbSectionHeadings: Record<Lang, string> = {
  ja: '編集済み本文',
  en: 'Edited content',
  fr: 'Contenu modifie',
  af: 'Geredigeerde inhoud'
};

const dbCategories: Record<Lang, string> = {
  ja: '編集',
  en: 'Edited',
  fr: 'Modifie',
  af: 'Geredigeer'
};

export function wikiPageFromRecord(record: WikiPageRecord, lang: Lang, basePage?: WikiPage): WikiPage {
  const paragraphs = record.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const summary = paragraphs[0]?.slice(0, 180) ?? record.title;

  return {
    slug: record.slug,
    title: record.title,
    summary,
    category: basePage?.category ?? dbCategories[lang],
    updatedAt: record.updated_at?.slice(0, 10) ?? updatedAt,
    sections: [
      {
        heading: dbSectionHeadings[lang],
        body: paragraphs.length ? paragraphs : [record.body]
      }
    ],
    related: basePage?.related ?? []
  };
}

export function mergeWikiPages(basePages: WikiPage[], editedPages: WikiPage[]): WikiPage[] {
  const pagesBySlug = new Map(basePages.map((page) => [page.slug, page]));

  for (const editedPage of editedPages) {
    pagesBySlug.set(editedPage.slug, editedPage);
  }

  return Array.from(pagesBySlug.values());
}

const slugAliases: Record<string, string> = {
  'getting-started': 'quick-start',
  'research-workflow': 'quick-start',
  'addon-registry': 'addons-plugins',
  'addon-safety': 'addons-plugins',
  'developer-publishing': 'developer-setup',
  'billing-access': 'cloud-backup-security',
  'admin-review': 'faq-troubleshooting',
  'portal-architecture': 'developer-setup'
};

export function getWikiPages(lang: Lang): WikiPage[] {
  return wikiPages[lang] ?? wikiPages.ja;
}

export function getWikiPage(lang: Lang, slug: string): WikiPage | undefined {
  const normalizedSlug = slugAliases[slug] ?? slug;
  return getWikiPages(lang).find((page) => page.slug === normalizedSlug) ?? wikiPages.ja.find((page) => page.slug === normalizedSlug);
}

export function getRelatedWikiPages(lang: Lang, slugs: string[]): WikiPage[] {
  return slugs
    .map((slug) => getWikiPage(lang, slug))
    .filter((page): page is WikiPage => Boolean(page));
}

export function getFeaturedWikiPages(lang: Lang, count = 3): WikiPage[] {
  const priority = ['installation-setup', 'quick-start', 'cloud-backup-security'];
  const pages = getWikiPages(lang);
  const featured = priority
    .map((slug) => pages.find((page) => page.slug === slug))
    .filter((page): page is WikiPage => Boolean(page));
  return featured.slice(0, count);
}
