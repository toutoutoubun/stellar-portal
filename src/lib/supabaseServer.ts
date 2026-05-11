import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { APIContext, AstroGlobal } from 'astro';
import { getEnv } from './env';

type RuntimeContext = APIContext | AstroGlobal;

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

export function createSupabaseServer(context: RuntimeContext) {
  const env = getEnv();

  return createServerClient(
    env.PUBLIC_SUPABASE_URL,
    env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.request.headers.get('cookie'));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options);
          });
        }
      }
    }
  );
}

export function createSupabaseAdmin() {
  const env = getEnv();

  if (!env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY === 'dev-placeholder') {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');
  }

  return createClient(
    env.PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
