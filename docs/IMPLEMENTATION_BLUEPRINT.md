# Stellar Portal Phase 1-5 Implementation Blueprint

## 1. 全体アーキテクチャ図

```mermaid
flowchart TB
  A[Visitor / Authenticated user] --> B[Cloudflare Pages]
  B --> C[Astro SSR routes]
  C --> D[React Islands for forms]
  C --> E[Supabase Auth]
  C --> F[(Supabase Postgres + RLS)]
  C --> G[Stripe Checkout / Billing Portal]
  G --> H[/api/stripe/webhook]
  H --> F
  I[Developer Dashboard] --> J[addons: pending]
  K[Admin Review] --> L[addons: approved / needs_changes / rejected / suspended]
```

## 2. ディレクトリ構成

- `src/pages/[lang]`: 多言語公開ページ、認証ページ、Dashboard、Admin
- `src/pages/api`: Supabase/Stripe/API操作
- `src/components`: Astro UI部品とReact Islands
- `src/lib`: i18n、認証、Stripe、Supabase、validator
- `supabase/schema.sql`: schema, RLS, trigger
- `supabase/seed.sql`: Wiki seed

## 3. ルーティング設計

- `/:lang`
- `/:lang/wiki`, `/:lang/wiki/:slug`
- `/:lang/addons`, `/:lang/addons/:slug`
- `/:lang/login`, `/:lang/auth/callback`, `/:lang/account`, `/:lang/billing`
- `/:lang/dashboard`, `/:lang/dashboard/addons`, `/:lang/dashboard/addons/new`, `/:lang/dashboard/addons/:id/edit`, `/:lang/dashboard/profile`, `/:lang/dashboard/subscription`
- `/:lang/admin`, `/:lang/admin/review`, `/:lang/admin/addons/:id`, `/:lang/admin/users`, `/:lang/admin/reports`

## 4. DBスキーマ案

`profiles`, `developer_profiles`, `subscriptions`, `addons`, `addon_translations`, `addon_versions`, `wiki_pages`, `moderation_logs`, `reports`, `audit_logs`。

## 5. RLS方針

- published Wiki: 誰でも閲覧
- approved addons: 誰でも閲覧
- profile: 本人とstaffのみ閲覧・本人更新。ただしrole/subscription/stripe_customer_idはtriggerで保護
- developer_profiles: 誰でも閲覧、有効Developerのみ作成・本人更新
- addons: approvedは公開、本人とstaffは全状態閲覧。有効Developerのみ投稿
- moderation_logs: reviewer/adminのみ
- audit_logs: adminのみ

## 6. 認証・課金フロー

1. Email Magic Link
2. Supabase session cookie
3. PricingからStripe Checkout
4. Stripe Webhookで`subscriptions`と`profiles.subscription_status`を同期
5. active/trialingならdeveloper扱い

## 7. アドオン投稿・審査フロー

1. Developer Profile作成
2. AddonFormからGitHub Releases URLを登録
3. APIがURL、checksum、license、permissionsを検証
4. `review_status=pending`
5. Admin Reviewで承認・差し戻し・却下・停止
6. approvedのみ公開ページに出る

## 8. UIコンポーネント一覧

- `Header`, `Footer`, `LanguageSwitcher`
- `ConsoleHero`, `PageHeader`
- `AddonCard`, `StatusBadge`, `RiskBadge`
- `LoginForm`, `AccountForm`, `DeveloperProfileForm`
- `BillingButtons`
- `AddonForm`
- `ReviewPanel`
- `ShareButtons`

## 9. 実装順序

1. Astro/Cloudflare基盤
2. i18n routes
3. Supabase schema/RLS
4. Auth/account
5. Stripe Checkout/Webhook
6. Dashboard/addon submission
7. Admin review
8. OGP/SNS/SEO
9. Turnstile/report/audit enhancement

## 10. MVPで削るべきもの

- 有料Addon販売
- Stripe Connect
- ファイルアップロード
- Review/star/ranking
- Wiki編集UI
- Manifest自動取込
- 組織アカウント
- Stellar本体からのインストールAPI

## 11. 将来拡張のために今から入れる設計

- `addon_versions`でバージョン単位の審査を可能にする
- `addon_translations`で翻訳提案ワークフローに備える
- `official_status`で公式・審査済み・コミュニティを分離する
- `moderation_logs`と`audit_logs`で責任追跡性を残す
- `release_url`方式を抽象化して、後にR2/Supabase Storageへ移行できるようにする

## 12. 実装用の初期コード方針

- Cloudflare Pages SSRで動かすため`@astrojs/cloudflare` adapterを使う
- Supabase Authは`@supabase/ssr`でcookie連携
- Stripe Webhookは`constructEventAsync` + Web Crypto provider
- API routeではログインユーザーを確認し、必要な操作だけservice roleで実行
- UIはSaaS風の丸いカードではなく、細い罫線・暗い背景・monospace・文献目録風の密度にする
