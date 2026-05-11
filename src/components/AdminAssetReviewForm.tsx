import { useState } from 'react';

type Props = {
  assetId: string;
  initialStatus: string;
};

const statuses = ['pending', 'approved', 'rejected', 'suspended'];

export default function AdminAssetReviewForm({
  assetId,
  initialStatus
}: Props) {
  const [reviewStatus, setReviewStatus] = useState(initialStatus);
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function save() {
    setState('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/assets/${assetId}/review`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          review_status: reviewStatus,
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
      setMessage('アセット審査結果を保存しました。');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '保存に失敗しました。');
    }
  }

  return (
    <div className="grid gap-2">
      <select
        className="field"
        value={reviewStatus}
        onChange={(event) => setReviewStatus(event.target.value)}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <textarea
        className="field min-h-20"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="承認理由、却下理由、危険性メモ"
      />

      <button className="btn w-fit" onClick={save} disabled={state === 'saving'}>
        {state === 'saving' ? 'Saving...' : 'Save asset review'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
