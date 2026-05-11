import { useState } from 'react';

type Props = {
  addonId: string;
  defaultVersion?: string;
};

async function readJsonResponse(res: Response) {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      error: `Expected JSON but received ${res.status} ${res.statusText}`,
      raw: text.slice(0, 300)
    };
  }
}

export default function AddonAssetUpload({ addonId, defaultVersion = '0.1.0' }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState(defaultVersion);
  const [checksum, setChecksum] = useState('');
  const [state, setState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
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

    setState('uploading');
    setMessage('');

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('version', version);
      form.append('checksum', checksum);

      const res = await fetch(`/api/addons/${addonId}/assets/upload`, {
        method: 'POST',
        body: form
      });

      const json = await readJsonResponse(res);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Upload failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('アップロードしました。安全性チェックと管理者承認後に配布対象になります。');
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
          ZIP file
        </span>
        <input
          className="field"
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
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

      <button className="btn btn-primary w-fit" onClick={upload} disabled={state === 'uploading'}>
        {state === 'uploading' ? 'Uploading...' : 'Upload addon file'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
