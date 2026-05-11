import { useState } from 'react';

type Props = {
  reportId: string;
  initialStatus: string;
};

const statuses = ['open', 'reviewing', 'resolved', 'dismissed'];

export default function ReportActions({ reportId, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function save() {
    setState('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          status,
          note
        })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('通報状態を更新しました。');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '更新に失敗しました。');
    }
  }

  return (
    <div className="grid gap-2">
      <select
        className="field"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <textarea
        className="field min-h-24"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="対応メモ"
      />

      <button className="btn w-fit" onClick={save} disabled={state === 'saving'}>
        {state === 'saving' ? 'Saving...' : 'Save report status'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
