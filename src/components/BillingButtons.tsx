import React, { useState } from 'react';

type Props = {
  lang: string;
  mode: 'checkout' | 'portal';
};

export default function BillingButtons({ lang, mode }: Props) {
  const [loading, setLoading] = useState(false);

  const endpoint =
    mode === 'checkout'
      ? '/api/stripe/create-checkout-session'
      : '/api/stripe/create-billing-portal-session';

  const label =
    mode === 'checkout'
      ? 'Start Developer Plan'
      : 'Open Billing Portal';

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

      alert('Stripe URL was not returned.');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to open Stripe.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="btn btn-primary" onClick={open} disabled={loading}>
      {loading ? 'Opening...' : label}
    </button>
  );
}
