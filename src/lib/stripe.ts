import Stripe from 'stripe';
import type { APIContext, AstroGlobal } from 'astro';
import { getEnv } from './env';

export function createStripe(context: APIContext | AstroGlobal) {
  const env = getEnv(context);
  if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not configured.');
  return new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient()
  });
}

export function stripeCryptoProvider() {
  return Stripe.createSubtleCryptoProvider();
}
