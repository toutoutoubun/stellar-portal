import { useState } from 'react';

type Props = {
  addonId: string;
  initialIsPaid: boolean;
  initialPriceJpy: number | null;
  initialSalesStatus: string;
};

const statuses = ['not_for_sale', 'for_sale', 'paused'];

export default function AddonSalesSettings({
  addonId,
  initialIsPaid,
  initialPriceJpy,
  initialSalesStatus
}: Props) {
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [priceJpy, setPriceJpy] = useState(initialPriceJpy ? String(initialPriceJpy) : '');
  const [salesStatus, setSalesStatus] = useState(initialSalesStatus);
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function save() {
    setState('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/addons/${addonId}/sales`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          is_paid: isPaid,
          price_jpy: isPaid ? Number(priceJpy) : null,
          sales_status: isPaid ? salesStatus : 'not_for_sale'
        })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('販売設定を保存しました。');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '保存に失敗しました。');
    }
  }

  return (
    <div className="terminal-panel grid gap-4 p-5">
      <p className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
        sales settings
      </p>

      <label className="flex items-center gap-3 text-stellar-text">
        <input
          type="checkbox"
          checked={isPaid}
          onChange={(event) => setIsPaid(event.target.checked)}
        />
        有料アドオンにする
      </label>

      {isPaid && (
        <>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
              Price JPY
            </span>
            <input
              className="field"
              type="number"
              min="100"
              step="100"
              value={priceJpy}
              onChange={(event) => setPriceJpy(event.target.value)}
              placeholder="500"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
              Sales status
            </span>
            <select
              className="field"
              value={salesStatus}
              onChange={(event) => setSalesStatus(event.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      <p className="text-sm text-stellar-muted">
        初期版では売上はStellar Portal側に入ります。作者への自動分配はStripe Connect対応後に追加します。
      </p>

      <button className="btn btn-primary w-fit" onClick={save} disabled={state === 'saving'}>
        {state === 'saving' ? 'Saving...' : 'Save sales settings'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
