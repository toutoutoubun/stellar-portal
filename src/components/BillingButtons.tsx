import React, { useState } from 'react';
import { isLang, type Lang } from '@/lib/i18n';

type Props = {
  lang: string;
  mode: 'checkout' | 'portal';
};

const copy = {
  ja: {
    checkout: '開発者プランを始める',
    portal: '請求ポータルを開く',
    opening: '開いています...',
    missingUrl: 'Stripe URLが返されませんでした。',
    failed: 'Stripeを開けませんでした。'
  },
  en: {
    checkout: 'Start Developer Plan',
    portal: 'Open Billing Portal',
    opening: 'Opening...',
    missingUrl: 'Stripe URL was not returned.',
    failed: 'Failed to open Stripe.'
  },
  fr: {
    checkout: 'Démarrer le plan développeur',
    portal: 'Ouvrir le portail de facturation',
    opening: 'Ouverture...',
    missingUrl: 'L’URL Stripe n’a pas été retournée.',
    failed: 'Impossible d’ouvrir Stripe.'
  },
  af: {
    checkout: 'Begin ontwikkelaarsplan',
    portal: 'Maak faktuurportaal oop',
    opening: 'Maak oop...',
    missingUrl: 'Stripe-URL is nie teruggestuur nie.',
    failed: 'Kon Stripe nie oopmaak nie.'
  }
} satisfies Record<Lang, Record<string, string>>;

export default function BillingButtons({ lang, mode }: Props) {
  const [loading, setLoading] = useState(false);
  const text = copy[isLang(lang) ? lang : 'ja'];

  const endpoint =
    mode === 'checkout'
      ? '/api/stripe/create-checkout-session'
      : '/api/stripe/create-billing-portal-session';

  const label =
    mode === 'checkout'
      ? text.checkout
      : text.portal;

  async function open() {
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ lang })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        alert(json?.error ?? `Stripe request failed: ${res.status}`);
        return;
      }

      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      alert(text.missingUrl);
    } catch (error) {
      alert(error instanceof Error ? error.message : text.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="btn btn-primary" onClick={open} disabled={loading}>
      {loading ? text.opening : label}
    </button>
  );
}
