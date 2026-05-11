import { env as cloudflareEnv } from 'cloudflare:workers';

function readEnv(name: string, fallback?: string) {
  const fromCloudflare = (cloudflareEnv as Record<string, string | undefined>)[name];
  const fromVite = import.meta.env[name] as string | undefined;
  return fromCloudflare ?? fromVite ?? fallback;
}

export function getEnv() {
  return {
    PUBLIC_SITE_URL: readEnv('PUBLIC_SITE_URL', 'http://localhost:4321'),
    PUBLIC_SUPABASE_URL: readEnv('PUBLIC_SUPABASE_URL', 'https://example.supabase.co'),
    PUBLIC_SUPABASE_ANON_KEY: readEnv('PUBLIC_SUPABASE_ANON_KEY', 'dev-placeholder'),
    PUBLIC_TURNSTILE_SITE_KEY: readEnv('PUBLIC_TURNSTILE_SITE_KEY'),
    SUPABASE_SERVICE_ROLE_KEY: readEnv('SUPABASE_SERVICE_ROLE_KEY', 'dev-placeholder'),
    STRIPE_SECRET_KEY: readEnv('STRIPE_SECRET_KEY', 'dev-placeholder'),
    STRIPE_WEBHOOK_SECRET: readEnv('STRIPE_WEBHOOK_SECRET', 'dev-placeholder'),
    STRIPE_DEVELOPER_PRICE_ID: readEnv('STRIPE_DEVELOPER_PRICE_ID', 'dev-placeholder')
  };
}
