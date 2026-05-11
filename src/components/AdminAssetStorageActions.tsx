import { useState } from 'react';

type Props = {
  assetId: string;
  storageStatus: string;
};

export default function AdminAssetStorageActions({
  assetId,
  storageStatus
}: Props) {
  const [reason, setReason] = useState('');
  const [state, setState] = useState<'idle' | 'deleting' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function deleteAsset() {
    const ok = window.confirm('R2上のファイルを削除します。元には戻せません。続行しますか？');

    if (!ok) return;

    setState('deleting');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/assets/${assetId}/delete`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          reason
        })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('アセットを削除しました。');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '削除に失敗しました。');
    }
  }

  if (storageStatus === 'deleted') {
    return (
      <div className="border border-stellar-danger/60 bg-stellar-danger/10 p-3 text-stellar-danger">
        deleted from storage
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <textarea
        className="field min-h-20"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="削除理由"
      />

      <button
        className="btn w-fit border-stellar-danger text-stellar-danger hover:border-stellar-danger"
        onClick={deleteAsset}
        disabled={state === 'deleting'}
      >
        {state === 'deleting' ? 'Deleting...' : 'Delete asset from R2'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
