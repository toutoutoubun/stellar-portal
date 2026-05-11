-- Stellar Portal MVP schema
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.user_role as enum ('free_user', 'developer', 'reviewer', 'admin');
create type public.subscription_state as enum ('none', 'incomplete', 'trialing', 'active', 'past_due', 'canceled', 'unpaid');
create type public.risk_level as enum ('low', 'medium', 'high', 'unknown');
create type public.review_status as enum ('draft', 'pending', 'needs_changes', 'approved', 'rejected', 'suspended');
create type public.official_status as enum ('official', 'reviewed', 'community', 'unreviewed');
create type public.wiki_status as enum ('draft', 'published', 'archived');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  role public.user_role not null default 'free_user',
  stripe_customer_id text unique,
  subscription_status public.subscription_state not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.developer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9][a-z0-9_-]{2,31}$'),
  display_name text not null,
  bio text,
  website_url text,
  github_url text,
  bluesky_url text,
  x_url text,
  linkedin_url text,
  verified_status text not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  status public.subscription_state not null default 'none',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.addons (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  developer_profile_id uuid references public.developer_profiles(id) on delete set null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  short_description text not null,
  description text not null,
  default_locale text not null default 'en' check (default_locale in ('ja','en','fr','af')),
  repo_url text,
  release_url text not null,
  documentation_url text,
  license text not null,
  compatible_stellar_version text not null,
  current_version text not null,
  checksum text not null,
  permissions jsonb not null default '[]'::jsonb,
  risk_level public.risk_level not null default 'unknown',
  review_status public.review_status not null default 'pending',
  official_status public.official_status not null default 'unreviewed',
  screenshots jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table if not exists public.addon_translations (
  id uuid primary key default gen_random_uuid(),
  addon_id uuid not null references public.addons(id) on delete cascade,
  locale text not null check (locale in ('ja','en','fr','af')),
  name text not null,
  short_description text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(addon_id, locale)
);

create table if not exists public.addon_versions (
  id uuid primary key default gen_random_uuid(),
  addon_id uuid not null references public.addons(id) on delete cascade,
  version text not null,
  release_url text not null,
  changelog text,
  checksum text not null,
  compatible_stellar_version text not null,
  permissions jsonb not null default '[]'::jsonb,
  review_status public.review_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(addon_id, version)
);

create table if not exists public.wiki_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  locale text not null check (locale in ('ja','en','fr','af')),
  title text not null,
  body text not null,
  status public.wiki_status not null default 'draft',
  source_locale text check (source_locale in ('ja','en','fr','af')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  unique(slug, locale)
);

create table if not exists public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id uuid not null,
  moderator_id uuid references public.profiles(id) on delete set null,
  action text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id uuid not null,
  reporter_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists addons_public_idx on public.addons(review_status, official_status, updated_at desc);
create index if not exists addons_author_idx on public.addons(author_id, updated_at desc);
create index if not exists wiki_public_idx on public.wiki_pages(locale, status, slug);
create index if not exists moderation_target_idx on public.moderation_logs(target_type, target_id, created_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
drop trigger if exists developer_profiles_touch on public.developer_profiles;
create trigger developer_profiles_touch before update on public.developer_profiles for each row execute function public.touch_updated_at();
drop trigger if exists subscriptions_touch on public.subscriptions;
create trigger subscriptions_touch before update on public.subscriptions for each row execute function public.touch_updated_at();
drop trigger if exists addons_touch on public.addons;
create trigger addons_touch before update on public.addons for each row execute function public.touch_updated_at();
drop trigger if exists addon_translations_touch on public.addon_translations;
create trigger addon_translations_touch before update on public.addon_translations for each row execute function public.touch_updated_at();
drop trigger if exists addon_versions_touch on public.addon_versions;
create trigger addon_versions_touch before update on public.addon_versions for each row execute function public.touch_updated_at();
drop trigger if exists wiki_pages_touch on public.wiki_pages;
create trigger wiki_pages_touch before update on public.wiki_pages for each row execute function public.touch_updated_at();
drop trigger if exists reports_touch on public.reports;
create trigger reports_touch before update on public.reports for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns public.user_role language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'free_user'::public.user_role);
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select public.current_user_role() = 'admin'::public.user_role;
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select public.current_user_role() in ('reviewer'::public.user_role, 'admin'::public.user_role);
$$;

create or replace function public.has_active_developer_plan()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and (
        role in ('developer'::public.user_role, 'reviewer'::public.user_role, 'admin'::public.user_role)
        or subscription_status in ('active'::public.subscription_state, 'trialing'::public.subscription_state)
      )
  );
$$;

create or replace function public.lock_profile_sensitive_fields()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' and not public.is_admin() then
    new.role := old.role;
    new.stripe_customer_id := old.stripe_customer_id;
    new.subscription_status := old.subscription_status;
    new.email := old.email;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_lock_sensitive on public.profiles;
create trigger profiles_lock_sensitive before update on public.profiles for each row execute function public.lock_profile_sensitive_fields();

create or replace function public.prepare_addon_insert()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null then
    new.author_id := auth.uid();
  end if;
  new.review_status := coalesce(new.review_status, 'pending'::public.review_status);
  if new.review_status not in ('draft'::public.review_status, 'pending'::public.review_status) then
    new.review_status := 'pending'::public.review_status;
  end if;
  new.official_status := 'unreviewed'::public.official_status;
  if coalesce(auth.role(), '') <> 'service_role' then
    new.risk_level := 'unknown'::public.risk_level;
  end if;
  new.published_at := null;
  return new;
end;
$$;

drop trigger if exists addons_prepare_insert on public.addons;
create trigger addons_prepare_insert before insert on public.addons for each row execute function public.prepare_addon_insert();

create or replace function public.lock_addon_review_fields()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' and not public.is_staff() then
    new.risk_level := old.risk_level;
    new.official_status := old.official_status;
    new.published_at := old.published_at;
    if old.review_status = 'approved'::public.review_status or old.review_status = 'suspended'::public.review_status then
      new.review_status := old.review_status;
    elsif new.review_status not in ('draft'::public.review_status, 'pending'::public.review_status, 'needs_changes'::public.review_status) then
      new.review_status := old.review_status;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists addons_lock_review on public.addons;
create trigger addons_lock_review before update on public.addons for each row execute function public.lock_addon_review_fields();

alter table public.profiles enable row level security;
alter table public.developer_profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.addons enable row level security;
alter table public.addon_translations enable row level security;
alter table public.addon_versions enable row level security;
alter table public.wiki_pages enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles: select own or staff" on public.profiles
  for select using (id = auth.uid() or public.is_staff());
create policy "profiles: update own basic fields" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "developer profiles: public read" on public.developer_profiles
  for select using (true);
create policy "developer profiles: active developers insert own" on public.developer_profiles
  for insert with check (user_id = auth.uid() and public.has_active_developer_plan());
create policy "developer profiles: owner update" on public.developer_profiles
  for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "subscriptions: select own or staff" on public.subscriptions
  for select using (user_id = auth.uid() or public.is_staff());

create policy "addons: public approved read" on public.addons
  for select using (review_status = 'approved'::public.review_status or author_id = auth.uid() or public.is_staff());
create policy "addons: active developers insert" on public.addons
  for insert with check (author_id = auth.uid() and public.has_active_developer_plan());
create policy "addons: owner can revise non-final" on public.addons
  for update using (author_id = auth.uid() or public.is_staff())
  with check (author_id = auth.uid() or public.is_staff());

create policy "addon translations: read if addon visible" on public.addon_translations
  for select using (exists (select 1 from public.addons a where a.id = addon_id and (a.review_status = 'approved'::public.review_status or a.author_id = auth.uid() or public.is_staff())));
create policy "addon translations: owner write" on public.addon_translations
  for all using (exists (select 1 from public.addons a where a.id = addon_id and (a.author_id = auth.uid() or public.is_staff())))
  with check (exists (select 1 from public.addons a where a.id = addon_id and (a.author_id = auth.uid() or public.is_staff())));

create policy "addon versions: read if addon visible" on public.addon_versions
  for select using (exists (select 1 from public.addons a where a.id = addon_id and (a.review_status = 'approved'::public.review_status or a.author_id = auth.uid() or public.is_staff())));
create policy "addon versions: owner insert" on public.addon_versions
  for insert with check (exists (select 1 from public.addons a where a.id = addon_id and a.author_id = auth.uid() and public.has_active_developer_plan()));

create policy "wiki: published read" on public.wiki_pages
  for select using (status = 'published'::public.wiki_status or public.is_staff());

create policy "moderation logs: staff read" on public.moderation_logs
  for select using (public.is_staff());
create policy "moderation logs: staff insert" on public.moderation_logs
  for insert with check (public.is_staff());

create policy "reports: authenticated insert" on public.reports
  for insert with check (auth.uid() is not null and reporter_id = auth.uid());
create policy "reports: own or staff read" on public.reports
  for select using (reporter_id = auth.uid() or public.is_staff());
create policy "reports: staff update" on public.reports
  for update using (public.is_staff()) with check (public.is_staff());

create policy "audit logs: admin read" on public.audit_logs
  for select using (public.is_admin());
create policy "audit logs: staff insert" on public.audit_logs
  for insert with check (public.is_staff());
