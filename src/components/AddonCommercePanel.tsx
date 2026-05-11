import { useState } from 'react';

type Props = {
  addonId: string;
  isPaid: boolean;
  priceJpy: number | null;
  canDownload: boolean;
};

export default function AddonCommercePanel({
  addonId,
  isPaid,
  priceJpy,
  canDownload
}: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function purchase() {
    setState('loading');
    setMessage('');

    try {
      const res = await fetch(`/api/addons/${addonId}/purchase`, {
        method: 'POST'
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Purchase failed: ${res.status}`);
        return;
      }

      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      setState('error');
      setMessage('Checkout URLが返されませんでした。');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '購入処理に失敗しました。');
    }
  }

  function download() {
    window.location.href = `/api/addons/${addonId}/download`;
  }

  return (
    <div className="terminal-panel grid gap-4 p-5">
      <p className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
        distribution
      </p>

      {isPaid ? (
        <p className="text-stellar-text">
          Paid addon: ¥{priceJpy ?? 0}
        </p>
      ) : (
        <p className="text-stellar-text">
          Free addon
        </p>
      )}

      {canDownload ? (
        <button className="btn btn-primary w-fit" onClick={download}>
          Download
        </button>
      ) : isPaid ? (
        <button className="btn btn-primary w-fit" onClick={purchase} disabled={state === 'loading'}>
          {state === 'loading' ? 'Opening checkout...' : 'Buy addon'}
        </button>
      ) : (
        <button className="btn btn-primary w-fit" onClick={download}>
          Download
        </button>
      )}

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
