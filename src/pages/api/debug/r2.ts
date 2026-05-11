import type { APIRoute } from 'astro';
import { getEnv } from '@/lib/env';

export const prerender = false;

export const GET: APIRoute = async () => {
  const env = getEnv();

  return Response.json({
    R2_ACCOUNT_ID: Boolean(env.R2_ACCOUNT_ID),
    R2_BUCKET_NAME: Boolean(env.R2_BUCKET_NAME),
    R2_ACCESS_KEY_ID: Boolean(env.R2_ACCESS_KEY_ID),
    R2_SECRET_ACCESS_KEY: Boolean(env.R2_SECRET_ACCESS_KEY)
  });
};
