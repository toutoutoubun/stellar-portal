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

const updatedAt = '2026-05-11';

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
  fr: {},
  af: {}
};

localizedMeta.fr = Object.fromEntries(
  Object.entries(localizedMeta.en).map(([slug, page]) => [
    slug,
    {
      title: page.title,
      summary: 'Version francaise synthetique. La version japonaise reste la source officielle pendant la stabilisation du Wiki.',
      category: page.category
    }
  ])
) as Record<string, { title: string; summary: string; category: string }>;

localizedMeta.af = Object.fromEntries(
  Object.entries(localizedMeta.en).map(([slug, page]) => [
    slug,
    {
      title: page.title,
      summary: 'Kort Afrikaanse weergawe. Die Japannese Wiki bly die amptelike bron terwyl vertalings voorberei word.',
      category: page.category
    }
  ])
) as Record<string, { title: string; summary: string; category: string }>;

function makeLocalizedPages(lang: Exclude<Lang, 'ja'>): WikiPage[] {
  const meta = localizedMeta[lang];
  const statusText = {
    en: 'This localized page is a concise outline while the Japanese official Wiki is stabilized. The project intentionally keeps the tone practical, local-first, AI-free, and subscription-free.',
    fr: 'Cette page localisee est un resume pendant la stabilisation du Wiki japonais officiel. Le projet reste pratique, local-first, sans IA et sans abonnement.',
    af: 'Hierdie gelokaliseerde bladsy is n kort oorsig terwyl die Japannese amptelike Wiki gestabiliseer word. Die projek bly prakties, plaaslik-eerste, sonder AI en sonder intekening.'
  }[lang];

  return jaPages.map((page) => {
    const localized = meta[page.slug] ?? localizedMeta.en[page.slug];
    return {
      ...page,
      title: localized.title,
      summary: localized.summary,
      category: localized.category,
      sections: [
        {
          heading: lang === 'en' ? 'Translation status' : lang === 'fr' ? 'Statut de traduction' : 'Vertaalstatus',
          body: [statusText]
        },
        {
          heading: lang === 'en' ? 'Japanese source summary' : lang === 'fr' ? 'Resume de la source japonaise' : 'Opsomming van die Japannese bron',
          body: [page.summary],
          bullets: page.sections.flatMap((section) => section.bullets ?? []).slice(0, 6)
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
