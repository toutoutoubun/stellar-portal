import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { APIContext, AstroGlobal } from 'astro';
import { getEnv } from './env';

type RuntimeContext = APIContext | AstroGlobal;

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return [];

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const eqIndex = part.indexOf('=');

      if (eqIndex === -1) {
        return {
          name: decodeURIComponent(part),
          value: ''
        };
      }

      const name = part.slice(0, eqIndex).trim();
      const value = part.slice(eqIndex + 1).trim();

      return {
        name: decodeURIComponent(name),
        value: decodeURIComponent(value)
      };
    })
    .filter((cookie) => cookie.name.length > 0);
}

function assertConfigured(value: string, name: string) {
  if (!value || value === 'dev-placeholder') {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export function createSupabaseServer(context: RuntimeContext) {
  const env = getEnv();

  const supabaseUrl = assertConfigured(env.PUBLIC_SUPABASE_URL, 'PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = assertConfigured(env.PUBLIC_SUPABASE_ANON_KEY, 'PUBLIC_SUPABASE_ANON_KEY');

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.request.headers.get('cookie'));
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options as Parameters<typeof context.cookies.set>[2]);
          });
        }
      }
    }
  );
}

export function createSupabaseAdmin(_context?: unknown) {
  const env = getEnv();

  const supabaseUrl = assertConfigured(env.PUBLIC_SUPABASE_URL, 'PUBLIC_SUPABASE_URL');
  const serviceRoleKey = assertConfigured(env.SUPABASE_SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY');

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
