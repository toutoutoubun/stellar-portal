import { useState } from 'react';

type Props = {
  addonId: string;
};

const exampleManifest = `{
  "id": "citation-cleaner",
  "name": "Citation Cleaner",
  "version": "0.1.0",
  "description": "Clean and normalize citation metadata.",
  "author": "example",
  "compatibleStellarVersion": ">=0.1.0",
  "permissions": [
    "local_file_read",
    "local_file_write"
  ],
  "entry": "index.js",
  "license": "MIT",
  "category": "citation"
}`;

export default function AddonManifestImport({ addonId }: Props) {
  const [manifest, setManifest] = useState(exampleManifest);
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function importManifest() {
    setState('saving');
    setMessage('');

    try {
      const parsed = JSON.parse(manifest);

      const res = await fetch(`/api/addons/${addonId}/manifest`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          manifest: parsed
        })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('manifest.jsonを読み取りました。変更内容は審査待ちになります。');
      window.setTimeout(() => window.location.reload(), 900);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'manifestの読み取りに失敗しました。');
    }
  }

  return (
    <div className="terminal-panel grid gap-4 p-5">
      <p className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
        manifest import
      </p>

      <p className="text-sm text-stellar-muted">
        manifest.jsonを貼り付けると、名前・説明・バージョン・権限・互換性情報をアドオン情報へ反映します。
      </p>

      <textarea
        className="field min-h-72 font-mono text-xs"
        value={manifest}
        onChange={(event) => setManifest(event.target.value)}
      />

      <button className="btn w-fit" onClick={importManifest} disabled={state === 'saving'}>
        {state === 'saving' ? 'Importing...' : 'Import manifest'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
