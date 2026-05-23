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
        bullets: ['ローカルファースト', 'AIなし', 'サブスクリプションなし', 'macOS / Windows / Linux対応', '日本語・英語・フランス語・アフリカーンス語対応', 'MITライセンス']
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
        body: ['表示言語は日本語、英語、フランス語、アフリカーンス語に対応します。一部の変更はアプリ再起動後に反映される場合があります。']
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
        body: ['Stellarは日本語、英語、フランス語、アフリカーンス語に対応します。翻訳追加手順は現在のi18n構成と一致している必要があります。']
      }
    ],
    related: ['terminology-sotho-tswana', 'developer-setup', 'addons-plugins']
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
  },
  {
    slug: 'terminology-sotho-tswana',
    title: 'Sotho-Tswana系言語の用語集',
    summary: 'Setswana・Sesotho・Sepedi向けに、Stellarの主要概念とUI用語をどう訳すかの作業用ページ。',
    category: '開発',
    updatedAt: '2026-05-24',
    sections: [
      {
        heading: 'このページの目的',
        body: [
          'Sotho-Tswana系の3言語（Setswana, Sesotho, Sepedi）で、Stellarの主要概念とUI用語をどう表現するかをまとめる作業用ページです。',
          'ここで合意した訳語が、locale ファイル（tn / st / nso）、README翻訳、Wiki本体に反映されます。'
        ]
      },
      {
        heading: '担当',
        body: ['用語レビューと翻訳のリードは Phenyo Taukobong が担当しています。Setswanaがネイティブ、SesothoとSepediが流暢です。'],
        bullets: ['Setswana (tn): native', 'Sesotho (st): fluent', 'Sepedi / Northern Sotho (nso): fluent']
      },
      {
        heading: 'コア概念用語',
        body: ['Stellarの中で意味を持つ用語。これが自然に訳せれば、UI全体も自然になります。'],
        bullets: [
          'WikiLink: ノート間の[[link]]、デフォルトで双方向',
          'Bidirectional link: AからBにリンクするとBもAを認識する関係',
          'Backlink: 現在のノートを指している他ノートのリスト',
          'Citation: 外部資料への参照、WikiLinkとは区別',
          'Citation graph: 引用関係の可視化グラフ',
          'Library: ユーザーのローカル文献コレクション',
          'Focus mode: 集中モードのエディタ表示',
          'Local-first: データがユーザーのデバイスに残る原則',
          'Offline: ネット接続不要で動作'
        ]
      },
      {
        heading: '研究ワークフロー用語',
        body: ['質的分析や文献管理で頻出する用語。'],
        bullets: [
          'Annotation: 資料への注釈やコメント',
          'Tag: 短いラベル',
          'Theme: コードを束ねる上位カテゴリ',
          'Code (verb / noun): 質的コーディングの行為とラベル',
          'Codebook: 使用中のコードのリスト',
          'Source: 外部資料',
          'Archival source: 一次資料（手紙、口述、政府文書）',
          'Framing analysis: フレーミング分析',
          'Actor mapping: アクターマッピング'
        ]
      },
      {
        heading: 'UI用語',
        body: ['ボタンやメニューに使う短いラベル。自然な動詞・名詞の選択が重要。'],
        bullets: [
          'Import / Export / Search / Settings / Sidebar',
          'Sync / Backup / Project / Note',
          'Citation key (例: @suzman1993、コード部分は英語のまま)',
          'Markdown / MIT License (固有名詞、英語維持)'
        ]
      },
      {
        heading: 'レジスターとトーンの方針',
        body: ['用語ごとの訳語以前に、全体の語調をどう揃えるか。'],
        bullets: [
          '学術寄り or 日常寄り — Phenyo判断',
          '敬体 or 友達口調 — UIの2人称をどう扱うか',
          'Loanword の許容範囲 — Markdown / PDF / SQLite など',
          'ボタンの動詞形 — 命令形 / 不定詞 / 名詞',
          '長さの目安 — 英語の1.4倍以内（UIレイアウトを壊さないため）'
        ]
      },
      {
        heading: 'Phenyoへの確認事項',
        body: ['作業を始める前に方針を決めたい項目。'],
        bullets: [
          'Sotho-Tswana family — 3言語で1シート共有 or 言語ごとに独立',
          'WikiLink — 翻訳 / 音訳 / 英語のまま のどれが自然か',
          '@cite — Latin文字維持（パーサーがASCIIを探す）でOKか',
          'Citation graph のノード表記 — 西洋式の "Author, Year" でOKか',
          '数字・日付の慣例 — ISO 8601 と Arabic numeral のままでOKか'
        ]
      },
      {
        heading: '作業手順',
        body: ['訳語が決まったら、locale ファイルとREADME翻訳に反映する流れ。'],
        bullets: [
          '用語をひとつ選ぶ',
          '候補訳をこのページに追加（複数候補可）',
          'コンセンサスが取れたら locales/tn/, locales/st/, locales/nso/ に反映',
          'README とユーザーガイドの該当箇所も更新',
          '迷う場合は GitHub Discussions でセカンドオピニオンを求める'
        ]
      }
    ],
    related: ['translation-contribution', 'developer-setup', 'notes-wikilinks']
  }
];

const jaSupplementalSections: Record<string, WikiSection[]> = {
  home: [
    {
      heading: 'Wikiの読み進め方',
      body: [
        'はじめてStellarに触れる場合は、Homeから順番に読むよりも、目的に合わせて読むページを選ぶと早く理解できます。導入だけならインストール、最初の30分ならクイックスタート、研究データの保全が気になる場合はクラウドバックアップを先に確認します。',
        '研究に使う道具は、最初の印象だけでなく、数週間後に検索できるか、数か月後に引用できるか、別のPCに移しても復元できるかで価値が決まります。このWikiでは、操作手順とあわせて、その判断基準も残します。'
      ],
      bullets: ['まず動かす: インストール、クイックスタート、基本画面', '研究に入る: 文献ライブラリ、PDF、ノート、グラフ', '成果にする: 草稿、引用、エクスポート、研究パッケージ', '守る: バックアップ、復元、FAQ', '広げる: 開発者向け、翻訳、アドオン']
    },
    {
      heading: '公式Wikiで扱わないもの',
      body: [
        '公式Wikiは、Stellar本体の実装済み機能、公開済み仕様、ユーザーが再現できる手順を中心にします。構想段階のアイデア、未公開の画面、実装が揺れている機能は、Issueやロードマップに分けます。',
        '特にセキュリティ、バックアップ、データ移行、プラグイン公開に関する説明は、実装と違う文章を残すとユーザーの判断を誤らせます。仕様が変わったらWikiも同じリリースで更新します。'
      ]
    }
  ],
  'installation-setup': [
    {
      heading: 'OS別の確認ポイント',
      body: [
        'インストーラーを選ぶ前に、OSの種類、CPUアーキテクチャ、社用・学校管理端末の制限を確認します。macOSでは署名やGatekeeper、WindowsではSmartScreen、Linuxでは実行権限が初回起動時のつまずきになりやすい箇所です。',
        '学校や研究室の共有PCで使う場合は、保存先を個人領域に置けるか、バックアップの保存先が同期対象か、管理者権限なしで起動できるかを事前に確認します。'
      ],
      bullets: ['macOS: .dmgを開き、Applicationsへ移動してから起動する', 'Windows: .msiを実行し、SmartScreenが出た場合は発行元と入手元を確認する', 'Linux: .AppImageに実行権限を付けて起動する', '共有端末: vault保存先とバックアップ先を個人領域にする']
    },
    {
      heading: '初回セットアップで決めること',
      body: [
        '初回オンボーディングでは、後から変更できる設定と、最初に慎重に決めた方がよい設定を分けて考えます。テーマや言語は気軽に変更できますが、研究データの保存先はバックアップや同期の方針に関わります。',
        '保存先は、容量が十分にあり、誤って削除しにくく、バックアップ対象に含められる場所を選びます。PDFを多く扱う研究では、クラウド同期フォルダの容量制限にも注意します。'
      ]
    }
  ],
  'quick-start': [
    {
      heading: '30分で試すミニワークフロー',
      body: [
        '最初の30分では、完璧な分類体系を作らず、1本の論文を材料にStellarの流れを体験します。論文を追加し、PDFを開き、重要な一段落をハイライトし、そのハイライトからノートを作ります。',
        'ノートには、論文の要約ではなく、自分が後で使いたい問い、引用したい箇所、他の文献と比較したい観点を書きます。最後にWikiLinkを1つ作り、グラフに反映されることを確認します。'
      ],
      bullets: ['文献を1件だけ追加する', 'PDFの1ページを読む', '重要箇所を1つハイライトする', 'ハイライトに短いコメントを付ける', 'ノートを1つ作る', 'WikiLinkを1つ入れる', 'グラフを開いて接続を見る']
    },
    {
      heading: '最初にやりすぎないこと',
      body: [
        'タグ体系、引用スタイル、質的分析コード、量的分析データセットは、最初から全部決めなくてかまいません。研究初期は資料の種類や問いが変わりやすいため、細かい分類を先に作るとかえって使いにくくなります。',
        'まずはライブラリ、ノート、グラフがつながる感覚を作ります。その後、必要に応じて草稿モード、引用、分析、エクスポートへ広げます。'
      ]
    }
  ],
  'interface-basics': [
    {
      heading: '画面を迷わないための見方',
      body: [
        'Stellarでは、現在選んでいる対象を意識すると画面が読みやすくなります。ライブラリで文献を選んでいるのか、ノートを選んでいるのか、分析プロジェクトを選んでいるのかによって、右側の情報や使える操作が変わります。',
        '操作に迷ったら、まず左から右へ見ます。左で場所を選び、中央で作業し、右で詳細や関連情報を確認する、という順番です。'
      ],
      bullets: ['左: どの機能にいるか', '中央: いま編集・閲覧しているもの', '右: 選択中の対象に関する補助情報', '上部: 検索、フィルタ、作成、保存などの操作']
    },
    {
      heading: '初心者が見落としやすい状態表示',
      body: [
        '保存状態、同期状態、フィルタの有無、選択中のタグは、作業結果に直接影響します。特にグラフや検索結果が空に見える場合、データが消えたのではなくフィルタが効いているだけの場合があります。'
      ]
    }
  ],
  'literature-library': [
    {
      heading: '文献を追加するときの基準',
      body: [
        '文献ライブラリには、読んだ文献だけでなく、これから読む候補、授業やゼミで指定された資料、比較対象として残しておきたい資料も入れられます。ただし、何でも入れると検索ノイズが増えるため、研究テーマとの関係を短いメモで残します。',
        'DOIやURLから取得したメタデータは便利ですが、タイトル、著者、年、出版元が必ず正しいとは限りません。引用に使う文献は、早い段階で手動確認しておくと後の修正が減ります。'
      ],
      bullets: ['タイトルの表記揺れを確認する', '著者名の順序と姓・名を確認する', '発行年と版を確認する', 'PDFが正しい文献に紐づいているか確認する', '読書ステータスを更新する']
    },
    {
      heading: 'タグ運用のコツ',
      body: [
        'タグは細かく作りすぎるより、後から検索しやすい粒度にします。研究テーマ、方法、地域、時代、理論、授業名など、複数の軸を混ぜてもかまいませんが、同じ意味のタグを増やしすぎないようにします。',
        'たとえば「方法論」「method」「methods」を同時に使うと、検索時に漏れが出ます。タグ名は一度決めたら、定期的に統合します。'
      ]
    }
  ],
  'pdf-reader-highlights': [
    {
      heading: 'ハイライトの粒度',
      body: [
        'ハイライトは、後で自分が読み返すための目印です。ページ全体を塗るより、引用したい文、方法論の定義、議論の転換点、疑問が生じた箇所など、再利用できる単位で残します。',
        '長い段落をハイライトする場合は、コメントに「なぜ重要か」を一文で書きます。色だけでは、数週間後に意図を思い出せないことがあります。'
      ],
      bullets: ['黄色: 主張や結論', '緑: 方法、データ、史料', '青: 自分の研究との接点', '赤: 疑問、反論、要確認']
    },
    {
      heading: 'ハイライトからノートへ移すタイミング',
      body: [
        'すべてのハイライトをノート化する必要はありません。ノートにするのは、複数文献をまたいで比較したい点、草稿で引用する可能性が高い点、自分の問いに直結する点です。',
        'ノート化したら、元の文献、ページ、ハイライトに戻れるようにしておくと、引用確認や再読が楽になります。'
      ]
    }
  ],
  'notes-wikilinks': [
    {
      heading: 'ノートの種類を分ける',
      body: [
        'ノートは1種類に統一しなくてもかまいません。読書ノート、概念ノート、人物ノート、史料ノート、仮説ノート、草稿メモなど、目的別に書き方を変えると整理しやすくなります。',
        '重要なのは、ノート名を後から見ても意味が分かるようにすることです。「メモ1」よりも、「福祉国家_比較枠組み」や「A論文_方法論メモ」のように、対象と観点を入れると検索しやすくなります。'
      ],
      bullets: ['読書ノート: 文献ごとの要点とコメント', '概念ノート: 用語、理論、定義の整理', '比較ノート: 複数文献の共通点と違い', '仮説ノート: 自分の問いと暫定的な説明', '草稿メモ: 章や節へ移す前の材料']
    },
    {
      heading: 'WikiLinkの使い方',
      body: [
        'WikiLinkは、完成した分類を表すものではなく、思考の途中で関係を仮置きするための道具です。書きながら気になった概念や文献をリンクし、後でバックリンクから関係を見直します。',
        'リンク先がまだ存在しない場合でも、将来作るノートの名前として使えます。これは、あとで調べたい問いや未整理の概念を逃さないために有効です。'
      ]
    }
  ],
  'draft-citations': [
    {
      heading: '草稿を研究ノートから分ける理由',
      body: [
        '研究ノートは素材を集める場所、草稿モードは読者に向けて並べ直す場所です。ノートで見つけた関係を、そのまま文章構成にすると読みにくい場合があります。草稿では、問い、先行研究、方法、分析、結論の流れを意識します。',
        '章や節は最初から固定せず、書きながら並び替えます。折りたたみを使うと、長い文章でも全体構造を見失いにくくなります。'
      ]
    },
    {
      heading: '引用確認の習慣',
      body: [
        '引用を挿入したら、ページ番号、引用スタイル、参考文献リストの表記を確認します。自動生成は作業を助けますが、最終責任は執筆者にあります。',
        '提出前には、本文中の引用と参考文献リストが対応しているか、同じ文献が重複していないか、著者名や年の表記が揃っているかを確認します。'
      ]
    }
  ],
  'knowledge-graph-citation-network': [
    {
      heading: 'グラフを読むときの注意',
      body: [
        'グラフは研究全体の地図ですが、地図そのものが結論ではありません。ノードが多い文献や概念は重要に見えますが、それは単に多くリンクした結果かもしれません。リンクの理由をノート本文で確認します。',
        'グラフが複雑になったら、タグ、文献種別、時期、テーマで絞り込みます。全体を見る時間と、限定した関係を見る時間を分けると、探索と検証のバランスが取れます。'
      ]
    },
    {
      heading: '外部APIを使う機能',
      body: [
        'CrossRef、OpenAlex、Semantic Scholarを使う機能は、オンライン接続や外部サービスの応答に依存します。取得できない場合でも、ローカルに保存済みの文献、ノート、リンクは使えます。',
        '外部APIから得た関連論文は、候補として扱います。研究テーマとの関係、出版年、査読状況、引用文脈を確認してからライブラリに取り込みます。'
      ]
    }
  ],
  'qualitative-analysis': [
    {
      heading: '分析を始める前の準備',
      body: [
        '質的分析に入る前に、対象資料、研究問い、分析単位を決めます。資料全体を読むのか、発話単位で見るのか、政策文書の段落単位で見るのかによって、コードの付け方が変わります。',
        '最初のコードブックは粗くてかまいません。数件の資料に試しにコードを付け、重複、曖昧さ、階層の深さを見直してから本格的に進めます。'
      ],
      bullets: ['研究問いを一文で書く', '分析対象の範囲を決める', '分析単位を決める', '初期コードを少数作る', '数件で試し、コードブックを修正する']
    },
    {
      heading: 'タブの使い分け',
      body: [
        'コードブックとコーディングマトリクスは、資料の内容を整理するために使います。ICRは複数人でコーディングする場合の一致確認に使います。史料批判、タイムライン、アクターマップは、歴史研究や政策過程研究で文脈を確認するために役立ちます。',
        'プロセストレーシング、比較分析、フレーミング分析は、問いがある程度固まってから使うと効果的です。最初からすべてのタブを埋めようとしないことが大切です。'
      ]
    }
  ],
  'quantitative-analysis-data-studio': [
    {
      heading: 'CSVを入れる前に整えること',
      body: [
        'Data Studioに入れるCSVは、1行が1観測、1列が1変数になるように整えます。列名は短く、意味が分かり、記号や空白を使いすぎない名前にします。',
        '欠損値、日付形式、カテゴリ名の表記揺れは、分析前に確認します。たとえば「Japan」「JP」「日本」が同じカテゴリを意味するなら、事前に統一します。'
      ],
      bullets: ['1行1観測にする', '1列1変数にする', '列名を短く明確にする', '欠損値の表し方を統一する', 'カテゴリ名の表記揺れを直す']
    },
    {
      heading: '分析結果の読み方',
      body: [
        '統計結果は、数値だけで判断せず、データの作られ方、サンプル数、変数の意味、外れ値の有無と一緒に読みます。相関があることは、因果関係があることを意味しません。',
        'チャートは、読者に何を見せたいかを決めてから選びます。分布を見るならヒストグラム、カテゴリ比較なら棒グラフ、関係を見るなら散布図が基本です。'
      ]
    }
  ],
  'export-research-package': [
    {
      heading: '用途別の出力選択',
      body: [
        '提出用の文章にはPDFやDOCX、Webで共有する資料には静的サイト、別環境で再利用する研究データにはJSONや.stellar研究パッケージを使います。目的によって、読みやすさ、再編集しやすさ、再現性の優先順位が変わります。',
        '共同研究では、相手がStellarを使っているかどうかも考えます。Stellar同士なら研究パッケージ、一般的な文献管理ツールとの連携ならBibTeXやRISが向いています。'
      ],
      bullets: ['提出: PDF / DOCX', '公開: 静的サイト', '移行: JSON / .stellar', '文献共有: BibTeX / RIS', '共同研究: 相手の環境に合わせる']
    },
    {
      heading: 'エクスポート前の確認',
      body: [
        'エクスポート前には、文献メタデータ、引用、画像、PDF添付、リンク切れを確認します。特に研究パッケージは、移動先で再現するための単位なので、必要なPDFやリンクが含まれているかを確認します。'
      ]
    }
  ],
  'cloud-backup-security': [
    {
      heading: 'バックアップを複数持つ理由',
      body: [
        'クラウドバックアップは便利ですが、唯一のバックアップにしない方が安全です。ローカルバックアップ、自動バックアップ、研究パッケージを組み合わせると、PC故障、誤削除、同期ミス、アカウント問題に備えられます。',
        'バックアップは作るだけでなく、復元できることを確認して初めて意味があります。重要な研究プロジェクトでは、定期的に別の場所へ復元テストを行います。'
      ],
      bullets: ['クラウドバックアップ: PC故障に備える', 'ローカルバックアップ: 素早い復元に使う', '研究パッケージ: プロジェクト単位で移動する', '復元テスト: バックアップの実効性を確認する']
    },
    {
      heading: 'リカバリーコードの扱い',
      body: [
        '12桁のリカバリーコードは、クラウドバックアップを新しいPCで復元するための鍵です。スクリーンショットだけに頼ると、端末故障時に一緒に失われる可能性があります。',
        '紙、パスワード管理ツール、暗号化された安全なメモなど、少なくとも2種類の方法で保管します。共有PCや研究室PCの見える場所には置かないでください。'
      ]
    }
  ],
  'browser-clipper': [
    {
      heading: '取り込み時に確認すること',
      body: [
        'Stellar Clipperで取り込んだメタデータは、Webページ側の構造に左右されます。タイトル、著者、出版年、URL、DOIが正しく入ったかをライブラリで確認します。',
        'デスクトップアプリが起動していない場合、ブラウザ拡張はローカルHTTPサーバーに接続できません。取り込みに失敗したら、まずStellar本体が起動しているかを確認します。'
      ],
      bullets: ['タイトルが正しいか', '著者名が欠けていないか', 'DOIやURLが入っているか', '重複文献になっていないか', '必要ならタグを付ける']
    },
    {
      heading: 'プライバシー上の考え方',
      body: [
        'ClipperはローカルのStellarにデータを渡すための入口です。取り込む前に、対象ページが研究に必要なものか、個人情報や機密情報を含まないかを確認します。',
        'ブラウザ側の閲覧履歴すべてを取り込む機能ではなく、ユーザーが選んだ文献やページのメタデータを送るための機能として扱います。'
      ]
    }
  ],
  'settings-customization': [
    {
      heading: '研究環境に合わせる',
      body: [
        '設定は見た目を変えるだけでなく、長時間の読書と執筆を続けやすくするためのものです。画面の明るさ、文字サイズ、行高さ、エディタフォントは、疲れにくさに直結します。',
        '保存先やバックアップ設定は、研究データの安全性に関わります。見た目の設定とデータ設定を分けて、変更した内容を把握しておきます。'
      ],
      bullets: ['読書中心: 文字を大きめ、行間を広めにする', '執筆中心: エディタフォントとフォーカスモードを調整する', '共有PC: 保存先とバックアップ先を確認する', '多言語利用: 言語変更後に再起動が必要か確認する']
    },
    {
      heading: '設定変更後の確認',
      body: [
        '保存先、バックアップ、言語、ブラウザ連携などを変えた後は、実際に文献を開く、ノートを書く、バックアップを作る、Clipperで取り込むなど、関連する操作を一度試します。'
      ]
    }
  ],
  shortcuts: [
    {
      heading: '覚える順番',
      body: [
        '最初からすべてのショートカットを覚える必要はありません。まずは検索、新規ノート、保存、PDF内検索、グラフ操作だけで十分です。よく使う機能が決まってから、画面切り替えや装飾のショートカットを増やします。',
        'MacではCmd、Windows/LinuxではCtrlを使います。研究室や学校で複数OSを使う場合は、この違いを意識して案内します。'
      ],
      bullets: ['最初に覚える: Ctrl/Cmd + K, N, S, F', '執筆で覚える: B, I, [[', '画面移動で覚える: 1, 2, 3', 'グラフで覚える: ホイール、ドラッグ、ダブルクリック']
    },
    {
      heading: 'ショートカットが効かないとき',
      body: [
        '入力欄にフォーカスがある場合、ブラウザやOS側のショートカットが優先される場合、キーボード配列が違う場合は、期待通りに動かないことがあります。まず現在どの画面と入力欄にフォーカスがあるかを確認します。'
      ]
    }
  ],
  'faq-troubleshooting': [
    {
      heading: '切り分けの基本',
      body: [
        '問題が起きたら、データが失われたのか、表示されていないだけなのか、同期やフィルタの影響なのかを切り分けます。焦って再インストールや削除をする前に、バックアップと現在の保存先を確認します。',
        '再現手順を短く書き出すと、Issueを作る場合にも役立ちます。どの画面で、何を押し、何が起き、何を期待していたかを記録します。'
      ],
      bullets: ['まず保存先を確認する', 'フィルタや検索条件を解除する', 'アプリを再起動する', 'バックアップの有無を確認する', '再現手順をメモする']
    },
    {
      heading: '問い合わせ前に集める情報',
      body: [
        'サポートやIssueで相談する場合は、OS、Stellarのバージョン、対象機能、エラーメッセージ、再現手順、スクリーンショットを添えると調査が進みやすくなります。個人情報や未公開研究データは隠して共有します。'
      ]
    }
  ],
  'developer-setup': [
    {
      heading: '開発環境の考え方',
      body: [
        'Stellarはデスクトップアプリなので、フロントエンドだけでなくTauri、Rust、SQLite、OS固有の挙動も確認します。Webアプリよりも、ファイルアクセス、ウィンドウ、ローカル保存、ビルド成果物の差異に注意が必要です。',
        '依存関係を更新する場合は、開発環境だけでなく、各OSのビルド、既存データの互換性、プラグインやエクスポートへの影響も確認します。'
      ],
      bullets: ['Node.jsとRustのバージョンを固定する', 'Tauri CLIを確認する', 'SQLite migrationを確認する', 'lintとbuildを通す', 'OS別の動作差を記録する']
    },
    {
      heading: '貢献前の確認',
      body: [
        'Stellarの方針は、ローカルファースト、AI非依存、サブスクリプションなし、研究者の判断を尊重することです。新機能を提案する場合も、この方針と矛盾しない形で設計します。',
        '大きな変更は、実装前にIssueで目的、利用者、保存されるデータ、移行の有無、UIへの影響を整理します。'
      ]
    }
  ],
  'translation-contribution': [
    {
      heading: '翻訳で守ること',
      body: [
        '翻訳は直訳よりも、ユーザーが操作を再現できることを優先します。ただし、機能名、設定名、ボタン名はUIと一致させます。UIとWikiの表記がずれると、ユーザーが画面上で探せなくなります。',
        'まず日本語版を安定させ、英語、フランス語、アフリカーンス語へ展開します。機能追加時は、翻訳未対応のページに古い説明が残らないようにします。'
      ],
      bullets: ['UI文言と一致させる', '専門用語は一貫させる', '長い文は短く分ける', '危険な注意書きは弱めない', '翻訳後に画面で手順を確認する']
    },
    {
      heading: '翻訳レビューの観点',
      body: [
        '翻訳レビューでは、言葉の自然さだけでなく、手順の正確さ、警告の強さ、リンク先、ショートカット表記、OS別表記を確認します。特にセキュリティとバックアップは意味が変わらないように注意します。'
      ]
    }
  ],
  'addons-plugins': [
    {
      heading: 'アドオン設計の基本',
      body: [
        'アドオンやプラグインは、Stellar本体の研究データを扱うため、便利さだけでなく、権限、保存先、失敗時の挙動、ユーザーへの説明を設計します。分析アドオンは、入力データと出力データが分かるようにします。',
        '配布用プラグインでは、ID、バージョン、互換Stellarバージョン、必要な権限、ライセンス、更新履歴を明確にします。'
      ],
      bullets: ['安定したplugin IDを使う', '入力と出力を説明する', '必要な権限だけを要求する', '失敗時のメッセージを用意する', '互換バージョンを明記する']
    },
    {
      heading: '公開前のセルフチェック',
      body: [
        'プラグインを公開する前に、クリーンな環境でインストールできるか、サンプルデータで動くか、不要な外部通信がないか、エラー時に研究データを壊さないかを確認します。',
        '公式Wikiには、実装済みでユーザーが利用できる範囲だけを書きます。計画中のAPIや未公開の仕様は、実装と公開状態が揃ってから追加します。'
      ]
    }
  ]
};

const jaWikiPages = jaPages.map((page) => ({
  ...page,
  sections: [...page.sections, ...(jaSupplementalSections[page.slug] ?? [])]
}));

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
    'addons-plugins': { title: 'Creating addons and plugins', summary: 'Analysis addons, distributable plugins, manifests, and plugin IDs.', category: 'Development' },
    'terminology-sotho-tswana': {
      title: 'Terminology — Sotho-Tswana Family',
      summary: 'Working page for agreeing on how Stellar concepts and UI terms are expressed in Setswana, Sesotho, and Sepedi.',
      category: 'Development'
    }
  },
  fr: {
    home: { title: 'Wiki Stellar', summary: 'Documentation officielle pratique pour installer Stellar, apprendre les bases, résoudre les problèmes et contribuer.', category: 'Vue d’ensemble' },
    'installation-setup': { title: 'Installation et premier démarrage', summary: 'Télécharger Stellar depuis GitHub Releases et terminer le premier parcours de configuration.', category: 'Début' },
    'quick-start': { title: 'Démarrage rapide', summary: 'Le chemin le plus court entre l’ajout d’un article, les notes, les WikiLinks et le graphe.', category: 'Début' },
    'interface-basics': { title: 'Bases de l’interface', summary: 'Comprendre la barre latérale, le panneau principal et le panneau de contexte.', category: 'Début' },
    'literature-library': { title: 'Bibliothèque de références', summary: 'Ajouter, chercher, étiqueter et suivre articles, livres et sources.', category: 'Fonctions' },
    'pdf-reader-highlights': { title: 'Lecteur PDF et surlignages', summary: 'Lire, chercher, surligner, commenter et créer des notes depuis les surlignages.', category: 'Fonctions' },
    'notes-wikilinks': { title: 'Notes et WikiLinks', summary: 'Notes Markdown, WikiLinks, backlinks, plan, sauvegarde automatique et mode focus.', category: 'Fonctions' },
    'draft-citations': { title: 'Mode brouillon et citations', summary: 'Écriture longue, sections, citations, styles bibliographiques et bibliographie.', category: 'Fonctions' },
    'knowledge-graph-citation-network': { title: 'Graphe de connaissances et réseau de citations', summary: 'Visualiser notes, articles, citations et recommandations de lectures.', category: 'Fonctions' },
    'qualitative-analysis': { title: 'Analyse qualitative', summary: 'Codebooks, ICR, critique des sources, timelines, cartes d’acteurs et comparaison.', category: 'Analyse' },
    'quantitative-analysis-data-studio': { title: 'Analyse quantitative Data Studio', summary: 'Import CSV, types de variables, statistiques, analyse textuelle et graphiques.', category: 'Analyse' },
    'export-research-package': { title: 'Export et paquet de recherche', summary: 'PDF, DOCX, site statique, JSON, BibTeX, RIS et paquets .stellar.', category: 'Données' },
    'cloud-backup-security': { title: 'Sauvegarde cloud et sécurité', summary: 'AES-256-GCM, code de récupération, sauvegardes chiffrées et limites de restauration.', category: 'Données' },
    'browser-clipper': { title: 'Intégration navigateur Stellar Clipper', summary: 'Import local depuis l’extension navigateur vers Stellar.', category: 'Fonctions' },
    'settings-customization': { title: 'Paramètres et personnalisation', summary: 'Thèmes, polices, stockage, export, sauvegarde, langue et intégration navigateur.', category: 'Paramètres' },
    shortcuts: { title: 'Raccourcis', summary: 'Raccourcis de navigation, éditeur, PDF et graphe.', category: 'Paramètres' },
    'faq-troubleshooting': { title: 'FAQ et dépannage', summary: 'Solutions pour métadonnées, sauvegarde automatique, graphe, sauvegarde, langue et Clipper.', category: 'Support' },
    'developer-setup': { title: 'Configuration développeur', summary: 'Node.js, Rust, Tauri, React, SQLite et commandes de développement.', category: 'Développement' },
    'translation-contribution': { title: 'Contribuer aux traductions', summary: 'Politique de traduction et notes de prise en charge linguistique.', category: 'Développement' },
    'addons-plugins': { title: 'Créer des extensions et plugins', summary: 'Extensions d’analyse, plugins distribuables, manifests et identifiants de plugin.', category: 'Développement' },
    'terminology-sotho-tswana': {
      title: 'Terminologie — Famille Sotho-Tswana',
      summary: 'Page de travail pour s’accorder sur la traduction des concepts et termes d’interface de Stellar en Setswana, Sesotho et Sepedi.',
      category: 'Développement'
    }
  },
  af: {
    home: { title: 'Stellar Wiki', summary: 'Amptelike praktiese dokumentasie vir installasie, leer, probleemoplossing en bydraes.', category: 'Oorsig' },
    'installation-setup': { title: 'Installasie en eerste opstelling', summary: 'Laai Stellar vanaf GitHub Releases af en voltooi die eerste opstelling.', category: 'Begin' },
    'quick-start': { title: 'Vinnige begin', summary: 'Die kortste roete van artikel byvoeg tot notas, WikiLinks en die grafiek.', category: 'Begin' },
    'interface-basics': { title: 'Basiese koppelvlak', summary: 'Verstaan die sybalk, hoofpaneel en konteks-paneel.', category: 'Begin' },
    'literature-library': { title: 'Literatuurbiblioteek', summary: 'Voeg artikels, boeke en bronne by, soek, merk en volg leesstatus.', category: 'Funksies' },
    'pdf-reader-highlights': { title: 'PDF-leser en hoogtepunte', summary: 'Lees PDF’s, soek, merk, lewer kommentaar en skep notas uit hoogtepunte.', category: 'Funksies' },
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
    'addons-plugins': { title: 'Skep byvoegings en plugins', summary: 'Analise-byvoegings, verspreibare plugins, manifests en plugin-ID’s.', category: 'Ontwikkeling' },
    'terminology-sotho-tswana': {
      title: 'Terminologie — Sotho-Tswana-familie',
      summary: 'Werkblad om ooreen te kom oor hoe Stellar se konsepte en koppelvlak-terme in Setswana, Sesotho en Sepedi uitgedruk word.',
      category: 'Ontwikkeling'
    }
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
    'addons-plugins': ['Local analysis addons start at src/plugins/registerAnalysisAddons.ts.', 'There are qualitative tabs and quantitative method additions.', 'Distributed plugins include stellar-plugin.json and index.js.', 'Use stable alphanumeric and hyphenated plugin IDs.'],
    'terminology-sotho-tswana': [
      'Lead: Phenyo Taukobong (Setswana native, Sesotho and Sepedi fluent).',
      'Agreed terms propagate to locales/tn/, locales/st/, locales/nso/, the README translations, and the user guide.',
      'Mark candidate translations as draft; mark consensus translations as final.',
      'Use this page for terminology debate; use the GitHub repo for code changes.',
      'No deadline — pick the least painful term first and build from there.'
    ]
  },
  fr: {
    home: ['Utiliser le Wiki pour les procédures pratiques.', 'Stellar reste local, sans IA, sans abonnement et sous licence MIT.', 'Commencer par l’installation, le démarrage rapide, l’interface, la FAQ et les sauvegardes.'],
    'installation-setup': ['Télécharger depuis GitHub Releases.', 'Utiliser .dmg pour macOS, .msi pour Windows et .AppImage pour Linux.', 'Terminer l’accueil initial, puis modifier la langue, le dossier et le thème dans les paramètres.'],
    'quick-start': ['Ajouter un article dans la bibliothèque.', 'Attacher un PDF et créer des surlignages.', 'Créer une note depuis un surlignage.', 'Relier notes et articles avec [[WikiLinks]].', 'Ouvrir le graphe pour vérifier la boucle de recherche.'],
    'interface-basics': ['Utiliser la barre latérale pour naviguer.', 'Travailler dans le panneau principal.', 'Lire les métadonnées, les notes liées et le contexte de citation dans le panneau de contexte.'],
    'literature-library': ['Ajouter par PDF, URL, DOI, saisie manuelle ou Stellar Clipper.', 'Filtrer par étiquettes, recherche, année, présence du PDF et statut de lecture.', 'Utiliser non lu, en cours, terminé et à relire.'],
    'pdf-reader-highlights': ['Lire avec zoom, navigation et recherche.', 'Utiliser quatre couleurs de surlignage.', 'Ajouter des commentaires et créer des notes depuis les surlignages.'],
    'notes-wikilinks': ['Écrire en Markdown.', 'Taper [[ pour compléter les liens.', 'Utiliser backlinks et plan pour les notes longues.', 'Garder le mode focus pour l’écriture.'],
    'draft-citations': ['Créer, réordonner, replier et supprimer des sections.', 'Insérer des citations depuis la bibliothèque.', 'Générer la bibliographie en APA, MLA, Chicago ou style Hitotsubashi.'],
    'knowledge-graph-citation-network': ['Cliquer, survoler, double-cliquer, zoomer et déplacer les noeuds.', 'Utiliser CrossRef, OpenAlex et Semantic Scholar en ligne.', 'Importer les articles recommandés si utiles.'],
    'qualitative-analysis': ['Commencer par codebook et matrice de codage.', 'Utiliser ICR pour vérifier l’accord.', 'Employer critique des sources, timeline, acteurs, process tracing, comparaison, cadrage et rapports.'],
    'quantitative-analysis-data-studio': ['Importer des CSV.', 'Définir les variables scale, nominal, ordinal, text ou date.', 'Exécuter statistiques descriptives, fréquences, corrélations, tests, régression, fréquence de tokens, TF-IDF et graphiques.'],
    'export-research-package': ['Exporter les notes en PDF, DOCX ou site statique.', 'Exporter toutes les données en JSON.', 'Utiliser BibTeX ou RIS pour les références.', 'Regrouper articles, notes, surlignages, liens et PDF dans un paquet .stellar.'],
    'cloud-backup-security': ['Les sauvegardes sont chiffrées sur le poste utilisateur.', 'AES-256-GCM est utilisé.', 'Conserver le code de récupération à 12 chiffres.', 'Sans ce code, un nouveau PC ne peut pas restaurer la sauvegarde cloud.'],
    'browser-clipper': ['Stellar écoute sur 127.0.0.1:57321.', 'L’extension envoie les métadonnées vers POST /api/import.', 'L’application desktop doit être lancée.'],
    'settings-customization': ['Choisir White, Ivory, Dark Blue ou Black.', 'Régler taille, hauteur de ligne et police éditeur.', 'Utiliser l’onglet Données pour stockage, export, sauvegarde, paquets, navigateur et cloud.'],
    shortcuts: ['Ctrl/Cmd + K ouvre la recherche.', 'Ctrl/Cmd + N crée une note.', 'Ctrl/Cmd + , ouvre les paramètres.', 'Ctrl/Cmd + F cherche dans le PDF.', 'La molette zoome le graphe et le glisser déplace.'],
    'faq-troubleshooting': ['Corriger les titres PDF manuellement si les métadonnées sont pauvres.', 'Vérifier WikiLinks, liens d’articles et filtres si le graphe est vide.', 'Utiliser sauvegardes cloud, locales, automatiques et paquets de recherche.'],
    'developer-setup': ['Utiliser Node.js 22+, Rust 1.75+ et Tauri CLI.', 'Exécuter npm install, npm run tauri dev, npm run tauri build et npm run lint.', 'Garder la direction sans IA et locale.'],
    'translation-contribution': ['Stabiliser le japonais avant traduction.', 'Synchroniser textes UI et procédures Wiki.', 'Vérifier la structure i18n actuelle avant d’ajouter une langue.'],
    'addons-plugins': ['Les extensions locales commencent dans src/plugins/registerAnalysisAddons.ts.', 'Deux axes : onglets qualitatifs et méthodes quantitatives.', 'Les plugins distribués contiennent stellar-plugin.json et index.js.', 'Utiliser des IDs stables avec lettres, chiffres et tirets.'],
    'terminology-sotho-tswana': [
      'Responsable : Phenyo Taukobong (Setswana natif, Sesotho et Sepedi courants).',
      'Les termes validés sont propagés à locales/tn/, locales/st/, locales/nso/, aux traductions du README et au guide utilisateur.',
      'Marquer les candidats comme brouillon et les consensus comme finaux.',
      'Cette page sert au débat terminologique ; le code reste dans le repo GitHub.',
      'Pas d’échéance — commencer par le terme le moins difficile.'
    ]
  },
  af: {
    home: ['Gebruik die Wiki vir praktiese stappe.', 'Stellar bly plaaslik-eerste, sonder AI, sonder intekening en MIT-gelisensieer.', 'Begin met installasie, vinnige begin, koppelvlak, FAQ en rugsteun.'],
    'installation-setup': ['Laai af vanaf GitHub Releases.', 'Gebruik .dmg vir macOS, .msi vir Windows en .AppImage vir Linux.', 'Voltooi opstelling en verander later taal, stoorplek en tema in Instellings.'],
    'quick-start': ['Voeg een artikel by die biblioteek.', 'Heg ’n PDF aan en maak hoogtepunte.', 'Skep ’n nota uit ’n hoogtepunt.', 'Verbind notas en artikels met [[WikiLinks]].', 'Maak die grafiek oop om die navorsingslus te sien.'],
    'interface-basics': ['Gebruik die sybalk vir navigasie.', 'Werk in die hoofpaneel.', 'Lees metadata, gekoppelde notas en aanhalingskonteks in die konteks-paneel.'],
    'literature-library': ['Voeg bronne by met PDF, URL, DOI, handinvoer of Stellar Clipper.', 'Filter volgens tags, soek, jaar, PDF en leesstatus.', 'Gebruik ongelees, besig, voltooi en herlees.'],
    'pdf-reader-highlights': ['Lees PDF’s met zoom, bladsybeweging en soek.', 'Gebruik vier kleure vir verskillende leesdoeleindes.', 'Voeg kommentaar by en skep notas uit hoogtepunte.'],
    'notes-wikilinks': ['Skryf in Markdown.', 'Tik [[ om skakels te voltooi.', 'Gebruik backlinks en buitelyne vir lang notas.', 'Gebruik fokusmodus vir skryfwerk.'],
    'draft-citations': ['Skep, herrangskik, vou en verwyder afdelings.', 'Voeg aanhalings uit die biblioteek in.', 'Genereer bibliografieë in APA, MLA, Chicago of Hitotsubashi-styl.'],
    'knowledge-graph-citation-network': ['Klik, sweef, dubbelklik, zoom en pan nodusse.', 'Gebruik CrossRef, OpenAlex en Semantic Scholar wanneer aanlyn.', 'Voer aanbevole verwante artikels in wanneer nuttig.'],
    'qualitative-analysis': ['Begin met kodeboeke en kodematrikse.', 'Gebruik ICR vir ooreenstemming.', 'Gebruik bronkritiek, tydlyne, akteurkaarte, prosesnasporing, vergelyking, framing en verslae.'],
    'quantitative-analysis-data-studio': ['Voer CSV-lêers in.', 'Ken scale, nominal, ordinal, text of date veranderlikes toe.', 'Gebruik beskrywende statistiek, frekwensies, korrelasies, toetse, regressie, tokenfrekwensie, TF-IDF en grafieke.'],
    'export-research-package': ['Voer notas uit as PDF, DOCX of statiese webwerf.', 'Voer alle data as JSON uit.', 'Gebruik BibTeX of RIS vir verwysings.', 'Gebruik .stellar-pakkette vir artikels, notas, hoogtepunte, skakels en PDF’s.'],
    'cloud-backup-security': ['Rugsteun word op die gebruiker se toestel geënkripteer.', 'AES-256-GCM word gebruik.', 'Bewaar die 12-syfer herstelkode veilig.', 'Sonder die kode kan ’n nuwe rekenaar nie wolk-rugsteun herstel nie.'],
    'browser-clipper': ['Stellar luister op 127.0.0.1:57321.', 'Die uitbreiding stuur metadata na POST /api/import.', 'Die desktop-app moet loop voordat die uitbreiding kan koppel.'],
    'settings-customization': ['Kies White, Ivory, Dark Blue of Black.', 'Pas lettergrootte, lynhoogte en redigeerder-font aan.', 'Gebruik die Data-oortjie vir stoorplek, uitvoer, rugsteun, pakkette, blaaier en wolk.'],
    shortcuts: ['Ctrl/Cmd + K open globale soek.', 'Ctrl/Cmd + N skep ’n nota.', 'Ctrl/Cmd + , open instellings.', 'Ctrl/Cmd + F soek in PDF.', 'Muiswiel zoom die grafiek en sleep pan.'],
    'faq-troubleshooting': ['Wysig PDF-titels handmatig as metadata swak is.', 'Kontroleer WikiLinks, artikelskakels en filters as die grafiek leeg is.', 'Gebruik wolk-, plaaslike en outomatiese rugsteun plus navorsingspakkette.'],
    'developer-setup': ['Gebruik Node.js 22+, Rust 1.75+ en Tauri CLI.', 'Voer npm install, npm run tauri dev, npm run tauri build en npm run lint uit.', 'Hou ontwikkeling plaaslik-eerste en sonder AI.'],
    'translation-contribution': ['Stabiliseer Japanees eerste en vertaal dan.', 'Hou UI-teks en Wiki-stappe gesinchroniseer.', 'Kontroleer die huidige i18n-struktuur voordat tale bygevoeg word.'],
    'addons-plugins': ['Plaaslike byvoegings begin by src/plugins/registerAnalysisAddons.ts.', 'Daar is kwalitatiewe tabs en kwantitatiewe metode-byvoegings.', 'Verspreide plugins bevat stellar-plugin.json en index.js.', 'Gebruik stabiele alfanumeriese en koppelteken plugin-ID’s.'],
    'terminology-sotho-tswana': [
      'Lei: Phenyo Taukobong (Setswana moedertaal, Sesotho en Sepedi vlot).',
      'Aanvaarde terme word na locales/tn/, locales/st/, locales/nso/, README-vertalings en die gebruikersgids gestuur.',
      'Merk kandidate as konsep en konsensus-terme as finaal.',
      'Hierdie bladsy is vir terminologie-besprekings; kode-veranderings bly in die GitHub-repo.',
      'Geen sperdatum nie — begin met die maklikste term.'
    ]
  }
};

const localizedLabels = {
  en: {
    overview: 'Overview',
    guidance: 'Main guidance',
    workflow: 'Recommended workflow',
    quality: 'Checks before relying on this page',
    intro: 'Use this page as a practical checklist for the feature or workflow.',
    workflowIntro: 'Treat the steps below as a working rhythm. Start small, confirm the result, then expand the workflow only when it helps the research.',
    qualityIntro: 'Before treating the result as durable research material, check metadata, links, backups, and whether the page still matches the current implementation.',
    principle: 'Stellar keeps research data local-first and asks the researcher to stay in control.',
    qualityOne: 'Confirm that the relevant data is saved locally and can be found again.',
    qualityTwo: 'Check that links, citations, exports, or backups still point to the intended material.',
    qualityThree: 'When the workflow touches security or recovery, test the restore path before depending on it.'
  },
  fr: {
    overview: 'Vue d’ensemble',
    guidance: 'Guide principal',
    workflow: 'Flux recommandé',
    quality: 'Vérifications avant de s’appuyer sur cette page',
    intro: 'Utilisez cette page comme checklist pratique pour la fonction ou le flux.',
    workflowIntro: 'Utilisez ces étapes comme rythme de travail. Commencez petit, vérifiez le résultat, puis élargissez le flux seulement si cela aide la recherche.',
    qualityIntro: 'Avant de considérer le résultat comme durable, vérifiez les métadonnées, les liens, les sauvegardes et la cohérence avec l’implémentation actuelle.',
    principle: 'Stellar reste local et laisse le chercheur garder le contrôle.',
    qualityOne: 'Vérifier que les données utiles sont sauvegardées localement et retrouvables.',
    qualityTwo: 'Vérifier que liens, citations, exports ou sauvegardes pointent vers le bon matériel.',
    qualityThree: 'Pour la sécurité ou la restauration, tester le chemin de récupération avant d’en dépendre.'
  },
  af: {
    overview: 'Oorsig',
    guidance: 'Hoofriglyne',
    workflow: 'Aanbevole werkvloei',
    quality: 'Kontroles voordat jy hierop staatmaak',
    intro: 'Gebruik hierdie bladsy as ’n praktiese kontrolelys vir die funksie of vloei.',
    workflowIntro: 'Gebruik die stappe as ’n werkritme. Begin klein, bevestig die resultaat, en brei eers uit wanneer dit die navorsing help.',
    qualityIntro: 'Voordat jy die resultaat as duursame navorsingsmateriaal gebruik, kontroleer metadata, skakels, rugsteun en of die bladsy met die huidige implementering klop.',
    principle: 'Stellar hou navorsingsdata plaaslik-eerste en laat die navorser in beheer.',
    qualityOne: 'Bevestig dat die relevante data plaaslik gestoor is en weer gevind kan word.',
    qualityTwo: 'Kontroleer dat skakels, aanhalings, uitvoere of rugsteun na die regte materiaal wys.',
    qualityThree: 'Wanneer die werkvloei veiligheid of herstel raak, toets die herstelpad voordat jy daarop staatmaak.'
  }
} satisfies Record<Exclude<Lang, 'ja'>, Record<string, string>>;

function makeLocalizedPages(lang: Exclude<Lang, 'ja'>): WikiPage[] {
  const meta = localizedMeta[lang];
  const labels = localizedLabels[lang];
  const guidance = localizedGuidance[lang];

  return jaWikiPages.map((page) => {
    const localized = meta[page.slug] ?? localizedMeta.en[page.slug];
    const guidanceItems = guidance[page.slug] ?? [];
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
          bullets: guidanceItems
        },
        {
          heading: labels.workflow,
          body: [labels.workflowIntro],
          bullets: guidanceItems.slice(0, 5)
        },
        {
          heading: labels.quality,
          body: [labels.qualityIntro],
          bullets: [labels.qualityOne, labels.qualityTwo, labels.qualityThree]
        }
      ]
    };
  });
}

export const wikiPages: Record<Lang, WikiPage[]> = {
  ja: jaWikiPages,
  en: makeLocalizedPages('en'),
  fr: makeLocalizedPages('fr'),
  af: makeLocalizedPages('af')
};

export type WikiEditorFormCopy = {
  slugLabel: string;
  localeLabel: string;
  statusLabel: string;
  titleLabel: string;
  bodyLabel: string;
  titlePlaceholder: string;
  bodyPlaceholder: string;
  saveIdle: string;
  saveBusy: string;
  savedMessage: string;
  saveFailed: string;
  editablePages: string;
  emptyPages: string;
  locales: Record<string, string>;
  statuses: Record<string, string>;
};

export type WikiUi = {
  title: string;
  layoutDescription: string;
  eyebrow: string;
  description: string;
  transmission: string;
  status: string;
  categoryHeading: string;
  docsLabel: string;
  readDocument: string;
  indexLink: string;
  updatedLabel: string;
  relatedDocs: string;
  sectionLabel: string;
  editor: {
    eyebrow: string;
    title: string;
    description: string;
    authNotConnected: string;
    loginRequired: string;
    loginAction: string;
    planRequired: string;
    planMessage: string;
    pricingAction: string;
    form: WikiEditorFormCopy;
  };
};

export const wikiUi = {
  ja: {
    title: 'Wiki',
    layoutDescription: 'Stellar公式Wiki。導入、研究ワークフロー、分析、データ保全、トラブル対応、貢献方法をまとめます。',
    eyebrow: '公式ドキュメント',
    description: '導入、使い方、困ったときの対応、開発参加を整理したStellarの公式Wikiです。',
    transmission: '記録 02 / 2026 / 公式文書',
    status: '全システム静穏',
    categoryHeading: '分類',
    docsLabel: '件',
    readDocument: '読む',
    indexLink: 'Wiki一覧',
    updatedLabel: '更新日',
    relatedDocs: '関連ページ',
    sectionLabel: '節',
    editor: {
      eyebrow: '開発者コンソール',
      title: 'Wiki編集',
      description: '課金ユーザーは、4言語それぞれのWikiページを作成・更新できます。',
      authNotConnected: '認証に接続できません',
      loginRequired: 'Wiki編集にはログインが必要です。',
      loginAction: 'ログイン',
      planRequired: '開発者プランが必要です',
      planMessage: '課金状態が有効または試用中のユーザー、または開発者・レビュアー・管理者ロールのユーザーだけがWikiを編集できます。',
      pricingAction: '料金を見る',
      form: {
        slugLabel: 'スラッグ',
        localeLabel: '言語',
        statusLabel: '状態',
        titleLabel: 'タイトル',
        bodyLabel: '本文',
        titlePlaceholder: 'Wikiページのタイトル',
        bodyPlaceholder: '本文を段落ごとに空行で区切って入力してください。',
        saveIdle: 'Wikiページを保存',
        saveBusy: '保存中...',
        savedMessage: 'Wikiページを保存しました。',
        saveFailed: 'Wikiの保存に失敗しました。',
        editablePages: '編集できるページ',
        emptyPages: 'DBで編集されたWikiページはまだありません。',
        locales: { ja: '日本語', en: '英語', fr: 'フランス語', af: 'アフリカーンス語' },
        statuses: { published: '公開', draft: '下書き', archived: 'アーカイブ' }
      }
    }
  },
  en: {
    title: 'Wiki',
    layoutDescription: 'Official Stellar Wiki for installation, research workflows, analysis, data safety, troubleshooting, and contribution.',
    eyebrow: 'official documentation',
    description: 'Official Stellar documentation for installing, learning, troubleshooting, and contributing to the local-first desktop app.',
    transmission: 'VOL. 02 / 2026 / DOCUMENTATION',
    status: 'ALL SYSTEMS QUIET',
    categoryHeading: 'Categories',
    docsLabel: 'docs',
    readDocument: 'Read document',
    indexLink: 'Wiki index',
    updatedLabel: 'Updated',
    relatedDocs: 'Related docs',
    sectionLabel: 'Section',
    editor: {
      eyebrow: 'developer console',
      title: 'Wiki Editor',
      description: 'Active paid users can create and update Wiki pages for each of the four locales.',
      authNotConnected: 'auth not connected',
      loginRequired: 'Login is required to edit the Wiki.',
      loginAction: 'Login',
      planRequired: 'Developer Plan required',
      planMessage: 'Only users with an active or trialing subscription, or a Developer, Reviewer, or Admin role, can edit the Wiki.',
      pricingAction: 'Open pricing',
      form: {
        slugLabel: 'slug',
        localeLabel: 'locale',
        statusLabel: 'status',
        titleLabel: 'title',
        bodyLabel: 'body',
        titlePlaceholder: 'Wiki page title',
        bodyPlaceholder: 'Separate body paragraphs with blank lines.',
        saveIdle: 'Save Wiki Page',
        saveBusy: 'Saving...',
        savedMessage: 'Wiki page saved.',
        saveFailed: 'Wiki save failed.',
        editablePages: 'editable pages',
        emptyPages: 'No editable DB-backed Wiki pages yet.',
        locales: { ja: 'Japanese', en: 'English', fr: 'French', af: 'Afrikaans' },
        statuses: { published: 'published', draft: 'draft', archived: 'archived' }
      }
    }
  },
  fr: {
    title: 'Wiki',
    layoutDescription: 'Wiki officiel de Stellar pour l’installation, les flux de recherche, l’analyse, la sécurité des données, le dépannage et la contribution.',
    eyebrow: 'documentation officielle',
    description: 'Documentation officielle de Stellar pour installer, apprendre, dépanner et contribuer à l’application desktop locale.',
    transmission: 'VOL. 02 / 2026 / DOCUMENTATION',
    status: 'TOUS LES SYSTÈMES CALMES',
    categoryHeading: 'Catégories',
    docsLabel: 'pages',
    readDocument: 'Lire',
    indexLink: 'Index du Wiki',
    updatedLabel: 'Mis à jour',
    relatedDocs: 'Pages liées',
    sectionLabel: 'Section',
    editor: {
      eyebrow: 'console développeur',
      title: 'Édition du Wiki',
      description: 'Les utilisateurs payants actifs peuvent créer et mettre à jour les pages Wiki pour chacune des quatre langues.',
      authNotConnected: 'authentification non connectée',
      loginRequired: 'La connexion est requise pour éditer le Wiki.',
      loginAction: 'Connexion',
      planRequired: 'Plan développeur requis',
      planMessage: 'Seuls les utilisateurs avec un abonnement actif ou en essai, ou un rôle Développeur, Reviewer ou Admin, peuvent éditer le Wiki.',
      pricingAction: 'Voir les tarifs',
      form: {
        slugLabel: 'slug',
        localeLabel: 'langue',
        statusLabel: 'statut',
        titleLabel: 'titre',
        bodyLabel: 'corps',
        titlePlaceholder: 'Titre de la page Wiki',
        bodyPlaceholder: 'Séparez les paragraphes par des lignes vides.',
        saveIdle: 'Enregistrer la page Wiki',
        saveBusy: 'Enregistrement...',
        savedMessage: 'Page Wiki enregistrée.',
        saveFailed: 'Échec de l’enregistrement du Wiki.',
        editablePages: 'pages éditables',
        emptyPages: 'Aucune page Wiki éditable en base pour le moment.',
        locales: { ja: 'Japonais', en: 'Anglais', fr: 'Français', af: 'Afrikaans' },
        statuses: { published: 'publié', draft: 'brouillon', archived: 'archivé' }
      }
    }
  },
  af: {
    title: 'Wiki',
    layoutDescription: 'Amptelike Stellar Wiki vir installasie, navorsingsvloei, analise, dataveiligheid, probleemoplossing en bydraes.',
    eyebrow: 'amptelike dokumentasie',
    description: 'Amptelike Stellar-dokumentasie vir installasie, leer, probleemoplossing en bydraes tot die plaaslik-eerste desktop-app.',
    transmission: 'VOL. 02 / 2026 / DOKUMENTASIE',
    status: 'ALLE STELSELS STIL',
    categoryHeading: 'Kategorieë',
    docsLabel: 'bladsye',
    readDocument: 'Lees',
    indexLink: 'Wiki-indeks',
    updatedLabel: 'Bygewerk',
    relatedDocs: 'Verwante bladsye',
    sectionLabel: 'Afdeling',
    editor: {
      eyebrow: 'ontwikkelaarskonsole',
      title: 'Wiki-redigeerder',
      description: 'Aktiewe betalende gebruikers kan Wiki-bladsye vir al vier tale skep en opdateer.',
      authNotConnected: 'verifikasie nie gekoppel nie',
      loginRequired: 'Aanmelding is nodig om die Wiki te redigeer.',
      loginAction: 'Teken in',
      planRequired: 'Ontwikkelaarsplan vereis',
      planMessage: 'Slegs gebruikers met ’n aktiewe of proefintekening, of ’n Ontwikkelaar-, Reviewer- of Admin-rol, kan die Wiki redigeer.',
      pricingAction: 'Maak pryse oop',
      form: {
        slugLabel: 'slug',
        localeLabel: 'taal',
        statusLabel: 'status',
        titleLabel: 'titel',
        bodyLabel: 'inhoud',
        titlePlaceholder: 'Wiki-bladsytitel',
        bodyPlaceholder: 'Skei inhoudsparagrawe met leë reëls.',
        saveIdle: 'Stoor Wiki-bladsy',
        saveBusy: 'Stoor...',
        savedMessage: 'Wiki-bladsy gestoor.',
        saveFailed: 'Wiki kon nie gestoor word nie.',
        editablePages: 'redigeerbare bladsye',
        emptyPages: 'Nog geen redigeerbare DB-gesteunde Wiki-bladsye nie.',
        locales: { ja: 'Japannees', en: 'Engels', fr: 'Frans', af: 'Afrikaans' },
        statuses: { published: 'gepubliseer', draft: 'konsep', archived: 'geargiveer' }
      }
    }
  }
} satisfies Record<Lang, WikiUi>;

export function getWikiUi(lang: Lang): WikiUi {
  return wikiUi[lang] ?? wikiUi.ja;
}

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
  fr: 'Contenu modifié',
  af: 'Geredigeerde inhoud'
};

const dbCategories: Record<Lang, string> = {
  ja: '編集',
  en: 'Edited',
  fr: 'Modifié',
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
