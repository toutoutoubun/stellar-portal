import { useState } from 'react';

type Props = {
  addonId: string;
  defaultVersion?: string;
};

export default function AddonAssetUpload({ addonId, defaultVersion = '0.1.0' }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState(defaultVersion);
  const [checksum, setChecksum] = useState('');
  const [state, setState] = useState<'idle' | 'presigning' | 'uploading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function upload() {
    if (!file) {
      setState('error');
      setMessage('ファイルを選択してください。');
      return;
    }

    if (!checksum.trim()) {
      setState('error');
      setMessage('checksumを入力してください。');
      return;
    }

    setState('presigning');
    setMessage('');

    try {
      const presignRes = await fetch(`/api/addons/${addonId}/assets/presign`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          file_name: file.name,
          content_type: file.type || 'application/octet-stream',
          byte_size: file.size,
          version,
          checksum
        })
      });

      const presign = await presignRes.json();

      if (!presignRes.ok) {
        setState('error');
        setMessage(presign.error ?? 'presignに失敗しました。');
        return;
      }

      setState('uploading');

      const uploadRes = await fetch(presign.upload_url, {
        method: 'PUT',
        headers: {
          'content-type': file.type || 'application/octet-stream'
        },
        body: file
      });

      if (!uploadRes.ok) {
        setState('error');
        setMessage(`R2 upload failed: ${uploadRes.status}`);
        return;
      }

      const completeRes = await fetch(`/api/addons/${addonId}/assets/complete`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          asset_id: presign.asset_id
        })
      });

      const complete = await completeRes.json().catch(() => null);

      if (!completeRes.ok) {
        setState('error');
        setMessage(complete?.error ?? 'completeに失敗しました。');
        return;
      }

      setState('done');
      setMessage('アップロードしました。管理者承認後に配布対象になります。');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'アップロードに失敗しました。');
    }
  }

  return (
    <div className="terminal-panel grid gap-4 p-5">
      <p className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
        upload asset
      </p>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Version
        </span>
        <input
          className="field"
          value={version}
          onChange={(event) => setVersion(event.target.value)}
          placeholder="0.1.0"
        />
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          File
        </span>
        <input
          className="field"
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Checksum
        </span>
        <input
          className="field"
          value={checksum}
          onChange={(event) => setChecksum(event.target.value)}
          placeholder="sha256:..."
        />
      </label>

      <button className="btn btn-primary w-fit" onClick={upload} disabled={state === 'presigning' || state === 'uploading'}>
        {state === 'presigning' ? 'Preparing...' : state === 'uploading' ? 'Uploading...' : 'Upload addon file'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
