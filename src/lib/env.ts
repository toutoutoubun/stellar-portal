import { env as cloudflareEnv } from 'cloudflare:workers';

type EnvMap = Record<string, string | undefined>;

export type AppEnv = {
  PUBLIC_SITE_URL: string;
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  PUBLIC_TURNSTILE_SITE_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_DEVELOPER_PRICE_ID: string;
  R2_ACCOUNT_ID: string;
  R2_BUCKET_NAME: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
};

function readEnv(name: string, fallback = ''): string {
  const fromCloudflare = (cloudflareEnv as EnvMap)[name];
  const fromVite = import.meta.env[name] as string | undefined;
  return fromCloudflare ?? fromVite ?? fallback;
}

export function getEnv(_context?: unknown): AppEnv {
  return {
    PUBLIC_SITE_URL: readEnv('PUBLIC_SITE_URL', 'http://localhost:4321'),
    PUBLIC_SUPABASE_URL: readEnv('PUBLIC_SUPABASE_URL'),
    PUBLIC_SUPABASE_ANON_KEY: readEnv('PUBLIC_SUPABASE_ANON_KEY'),
    PUBLIC_TURNSTILE_SITE_KEY: readEnv('PUBLIC_TURNSTILE_SITE_KEY'),
    SUPABASE_SERVICE_ROLE_KEY: readEnv('SUPABASE_SERVICE_ROLE_KEY'),
    STRIPE_SECRET_KEY: readEnv('STRIPE_SECRET_KEY'),
    STRIPE_WEBHOOK_SECRET: readEnv('STRIPE_WEBHOOK_SECRET'),
    STRIPE_DEVELOPER_PRICE_ID: readEnv('STRIPE_DEVELOPER_PRICE_ID'),
    R2_ACCOUNT_ID: readEnv('R2_ACCOUNT_ID'),
    R2_BUCKET_NAME: readEnv('R2_BUCKET_NAME', 'stellar-addon-assets'),
    R2_ACCESS_KEY_ID: readEnv('R2_ACCESS_KEY_ID'),
    R2_SECRET_ACCESS_KEY: readEnv('R2_SECRET_ACCESS_KEY')
  };
}
