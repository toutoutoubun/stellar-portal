insert into public.wiki_pages (slug, locale, title, body, status, published_at) values
('home', 'ja', 'Stellar Wiki', $$Stellar Wikiは、READMEよりも実用寄りに、導入、使い始め、困ったときの解決、開発参加の情報を整理する場所です。

Stellarは、文献管理、ノート、グラフビュー、質的分析、量的分析、エクスポートを1つにまとめた、人文・社会科学系研究者向けの研究支援デスクトップアプリです。

基本方針は、ローカルファースト、AIなし、サブスクリプションなし、macOS / Windows / Linux対応、MITライセンスです。$$, 'published', now()),
('installation-setup', 'ja', 'インストールと初回セットアップ', $$StellarはGitHub Releasesからダウンロードします。

macOSは.dmg、Windowsは.msi、Linuxは.AppImageを選びます。初回起動時には5ステップのオンボーディングがあり、言語、保存先、テーマなどを設定します。

言語、保存先、テーマはあとから設定画面で変更できます。$$, 'published', now()),
('quick-start', 'ja', 'クイックスタート', $$最初からすべての分析機能を使う必要はありません。まずはライブラリ、ノート、グラフの3つをつなげます。

ライブラリで論文を追加し、PDFを添付し、PDFを読んでハイライトします。ハイライトにコメントを付け、ハイライトからノートを作り、[[ノート名]]や[[論文タイトル]]でつなげます。

グラフビューにノードが現れれば、基本の研究ループは動いています。$$, 'published', now()),
('interface-basics', 'ja', '基本画面の見方', $$Stellarの基本画面は、移動のためのサイドバー、作業するメインペイン、選択中の対象を詳しく見るコンテキストパネルで構成されます。

サイドバーからライブラリ、ノート、グラフ、分析、設定へ移動します。メインペインで文献、PDF、ノート、分析結果を操作し、コンテキストパネルでメタデータや関連情報を確認します。$$, 'published', now()),
('literature-library', 'ja', '文献ライブラリ', $$文献ライブラリでは、論文、書籍、史料、Web資料などを一か所に集めて管理します。

追加方法はPDF、URL、DOI、手入力、Stellar Clipperです。タグ、検索、発行年、PDF有無、読書ステータスで絞り込めます。

詳細パネルではメタデータ、ハイライト、関連ノート、引用ネットワークを確認できます。$$, 'published', now()),
('pdf-reader-highlights', 'ja', 'PDFリーダーとハイライト', $$PDFリーダーは、PDF表示、ズーム、ページ移動、PDF内検索に対応します。

4色のハイライトを使い、必要に応じてコメントを追加できます。選択したハイライトからノートを作成できます。

色の使い分け例は、黄色=重要、緑=方法論、青=自分の論点、赤=疑問点です。$$, 'published', now()),
('notes-wikilinks', 'ja', 'ノートとWikiLink', $$StellarのノートはMarkdownエディタで書きます。

[[ノート名]]と[[論文タイトル]]によるWikiLinkに対応し、[[入力時には候補が表示されます。WikiLinkは、あとから整理するためだけでなく、書きながら関係を作る機能です。

バックリンク、アウトライン、自動保存、フォーカスモードも利用できます。$$, 'published', now()),
('draft-citations', 'ja', '草稿モードと引用', $$草稿モードは、レポート、論文、調査報告などの長文を書くためのモードです。

章の追加、削除、並び替え、折りたたみに対応します。ライブラリの文献をインライン引用として挿入し、参考文献リストを生成できます。

引用スタイルはAPA 7th、MLA 9th、Chicago 17th、一橋スタイルに対応します。$$, 'published', now()),
('knowledge-graph-citation-network', 'ja', 'ナレッジグラフと引用ネットワーク', $$ナレッジグラフは、論文とノートの関係を可視化します。

ノードクリック、ホバー、ダブルクリック、ズーム、パンで関係を探索できます。引用ネットワークは外部学術APIから引用・被引用関係を取得します。

CrossRef、OpenAlex、Semantic Scholarを利用する機能は、オフライン時に制限される場合があります。$$, 'published', now()),
('qualitative-analysis', 'ja', '質的分析', $$質的分析は、文献、史料、インタビュー、政策文書などを読み解き、コード、事象、アクター、因果仮説として整理するための機能群です。

ダッシュボード、コードブック、コーディングマトリクス、ICR、史料批判シート、タイムライン、アクターマップ、プロセストレーシング、比較分析、フレーミング分析、レポートの11タブで構成されます。$$, 'published', now()),
('quantitative-analysis-data-studio', 'ja', '量的分析 Data Studio', $$Data StudioはCSVを取り込んで簡易統計分析を行う画面です。

変数型はscale、nominal、ordinal、text、dateです。分析ウィザードは手法選択、変数指定、結果表示の3ステップです。

記述統計、頻度表、相関分析、t検定、カイ二乗検定、線形回帰、トークン頻度、TF-IDF、チャート出力に対応します。$$, 'published', now()),
('export-research-package', 'ja', 'エクスポートと研究パッケージ', $$ノートはPDF、DOCX、静的サイトに出力できます。全データのJSONエクスポート、BibTeX / RISエクスポートにも対応します。

.stellar研究パッケージでは、論文、ノート、ハイライト、リンク、PDFをまとめられます。

構造はmanifest.json、papers.json、notes.json、highlights.json、links.json、pdfs/です。$$, 'published', now()),
('cloud-backup-security', 'ja', 'クラウドバックアップとセキュリティ', $$バックアップはユーザーのPC上で暗号化されます。暗号化方式はAES-256-GCMです。

復元には12桁のリカバリーコードを使います。サーバーには暗号文のみが保存され、復号鍵はクライアント側にあります。オフライン時は~/.stellar/cloud_backups/に暗号化済みバックアップが保存されます。

重要: リカバリーコードを失うと、新しいPCでクラウドバックアップを復元できません。$$, 'published', now()),
('browser-clipper', 'ja', 'ブラウザ連携 Stellar Clipper', $$Stellarは127.0.0.1:57321でローカルHTTPサーバーを起動します。

ブラウザ拡張は論文メタデータをPOST /api/importへ送信します。デスクトップアプリが起動していないと、拡張機能は接続できません。

接続できない場合は、アプリ起動状態、拡張機能、設定画面のブラウザ連携を確認します。$$, 'published', now()),
('settings-customization', 'ja', '設定とカスタマイズ', $$設定画面では、テーマ、フォントサイズ、行高さ、エディタフォントを変更できます。

テーマはWhite、Ivory、Dark Blue、Blackです。保存先、エクスポート、バックアップ、研究パッケージ、ブラウザ連携、クラウドバックアップはデータタブにあります。

言語は日本語、English、Francais、Afrikaansに対応します。$$, 'published', now()),
('shortcuts', 'ja', 'ショートカット一覧', $$MacではCmd、Windows/LinuxではCtrlを使います。

Ctrl/Cmd + Kはグローバル検索、Ctrl/Cmd + Nは新規ノート作成、Ctrl/Cmd + ,は設定、Ctrl/Cmd + 1はライブラリ、Ctrl/Cmd + 2はノート、Ctrl/Cmd + 3はグラフです。

エディタではCtrl/Cmd + S、B、I、PDFではCtrl/Cmd + F、1-4のハイライト色選択、グラフではホイール、ドラッグ、ダブルクリックを使います。$$, 'published', now()),
('faq-troubleshooting', 'ja', 'FAQとトラブルシューティング', $$PDFからタイトルが取れない場合は、PDFメタデータが不十分な場合があります。手動修正が確実です。

グラフに何も出ない場合は、WikiLink、論文紐づけ、フィルタ設定を確認します。データ消失が心配な場合は、クラウドバックアップ、自動バックアップ、ローカルバックアップ、研究パッケージを確認します。

分析機能が難しい場合は、最初はライブラリ、ノート、グラフだけで十分です。$$, 'published', now()),
('developer-setup', 'ja', '開発者向けセットアップ', $$Stellarの開発には、Node.js 22以降、Rust 1.75以降、Tauri CLIが必要です。

フロントエンドはReact 19、デスクトップはTauri 2.0、バックエンドはRust、DBはSQLiteです。

基本コマンドはnpm install、npm run tauri dev、npm run tauri build、npm run lintです。npmとpnpmの推奨は公開前に統一します。$$, 'published', now()),
('translation-contribution', 'ja', '翻訳に参加する', $$翻訳Wikiを作る場合は、まず日本語版を安定させてから英語版に展開します。

Stellarは日本語、English、Francais、Afrikaansに対応します。UI文言を変更したら、対応するWikiの手順も確認します。

翻訳追加手順は現在のi18n構成と一致している必要があります。$$, 'published', now()),
('addons-plugins', 'ja', 'アドオン・プラグイン作成', $$リポジトリ内ローカルアドオンの入口はsrc/plugins/registerAnalysisAddons.tsです。

質的分析タブ追加と量的分析手法追加の2系統があります。配布用プラグインはstellar-plugin.jsonとindex.jsを含むフォルダ、または.zip / .stellar-pluginとして扱います。

プラグインIDは安定した英数字とハイフンにします。プラグイン機能は実装状況と公開状態を確認してからWikiに載せます。$$, 'published', now())
on conflict (slug, locale) do update set
  title = excluded.title,
  body = excluded.body,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = now();
