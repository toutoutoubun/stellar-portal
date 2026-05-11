# Stellar Portal MVP / Phase 1-5

Cloudflare Pages にデプロイできる、Astro + React Islands + Supabase + Stripe Billing の最小構成です。

対象範囲:

- Phase 1: 4言語ルーティング、トップ、Wiki雛形、Addons一覧、デザインシステム
- Phase 2: Supabase Auth / Email Magic Link、profiles、account
- Phase 3: Stripe Billing、Developer Plan登録、Webhook同期、billing
- Phase 4: Developer Dashboard、アドオン投稿フォーム、自分の投稿一覧
- Phase 5: Admin Review、review_status変更、moderation_logs、公開制御

未実装だが設計済み:

- 有料アドオン販売
- Stripe Connect 売上分配
- R2/Supabase Storage アップロード
- Turnstile実装
- 通報UIの本実装
- スター、レビュー、ランキング
- manifest.json 自動読み取り

## アーキテクチャ図

```mermaid
flowchart LR
  Visitor[Visitor / User] --> CF[Cloudflare Pages + Astro SSR]
  CF --> AstroRoutes[Astro pages + API routes]
  AstroRoutes --> SupaAuth[Supabase Auth]
  AstroRoutes --> SupaDB[(Supabase Postgres + RLS)]
  AstroRoutes --> Stripe[Stripe Billing]
  Stripe --> Webhook[/api/stripe/webhook]
  Webhook --> SupaDB
  Dev[Developer] --> Dashboard[Developer Dashboard]
  Dashboard --> Addons[(addons pending)]
  Admin[Reviewer/Admin] --> Review[Admin Review]
  Review --> Published[(approved addons)]
```

## ディレクトリ構成

```txt
src/
  components/       UI部品とReact Islands
  layouts/          共通レイアウト
  lib/              i18n, Supabase, Stripe, access, validation
  pages/            Astro pages + API routes
  styles/           Tailwind global styles
supabase/
  schema.sql        DBスキーマ、RLS、trigger、seedに必要な土台
  seed.sql          初期Wiki/サンプルAddon
```

## セットアップ

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Supabase SQL Editor で `supabase/schema.sql` を実行し、その後必要に応じて `supabase/seed.sql` を実行してください。

## Cloudflare Pages

Build command:

```bash
pnpm build
```

Build output:

```txt
dist
```

Cloudflare Pages の環境変数に `.env.example` の値を登録してください。Cloudflare のAstro SSRは `@astrojs/cloudflare` adapter を使います。

## Stripe Webhook

Stripe DashboardでWebhook Endpointを追加します。

```txt
https://YOUR_DOMAIN/api/stripe/webhook
```

購読同期に使うイベント:

- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted

Cloudflare Workers/Pages RuntimeではWebhook署名検証に `constructEventAsync` と Web Crypto provider を使っています。

## 権限モデル

- free_user: ログイン、プロフィール編集のみ
- developer: 有料Developer Plan、投稿申請可能
- reviewer: 審査可能
- admin: 全権限

Developer Plan は「投稿申請権限」であり、即公開権限ではありません。

## MVPで削っているもの

1. ファイル直接アップロード
2. 有料アドオン販売
3. 作者への売上分配
4. レビュー、スター、ランキング
5. 自動マルウェアスキャン
6. manifest.json 自動読み取り
7. 組織アカウント
8. APIキー/CLIアップロード
9. Wiki編集UI
10. 翻訳提案ワークフロー

## 将来拡張のために残した設計

- `addon_versions`: バージョン別審査、互換性、将来の署名検証
- `addon_translations`: 言語別タイトル/説明/本文
- `official_status`: official / reviewed / community / unreviewed をDBで分離
- `subscriptions`: Stripe Connect前の購読状態同期
- `moderation_logs` / `audit_logs`: 審査・停止・監査の履歴
- URLは最初から `/:lang/...`
