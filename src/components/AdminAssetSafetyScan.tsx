import { useState } from 'react';

type Finding = {
  severity: 'info' | 'warning' | 'error';
  code: string;
  message: string;
  file?: string;
};

type ScanResult = {
  status: string;
  risk_level: string;
  summary: string;
  findings: Finding[];
};

type Props = {
  assetId: string;
  initialSafetyStatus: string;
  initialSafetySummary?: string | null;
};

export default function AdminAssetSafetyScan({
  assetId,
  initialSafetyStatus,
  initialSafetySummary
}: Props) {
  const [state, setState] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle');
  const [status, setStatus] = useState(initialSafetyStatus);
  const [summary, setSummary] = useState(initialSafetySummary ?? '');
  const [findings, setFindings] = useState<Finding[]>([]);
  const [message, setMessage] = useState('');

  async function scan() {
    setState('scanning');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/assets/${assetId}/scan`, {
        method: 'POST'
      });

      const json = await res.json().catch(() => null) as ScanResult | { error?: string } | null;

      if (!res.ok) {
        setState('error');
        setMessage((json as { error?: string })?.error ?? `Scan failed: ${res.status}`);
        return;
      }

      const result = json as ScanResult;

      setStatus(result.status);
      setSummary(result.summary);
      setFindings(result.findings ?? []);
      setState('done');
      setMessage('安全性チェックが完了しました。');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'スキャンに失敗しました。');
    }
  }

  return (
    <div className="grid gap-3 border border-stellar-border bg-stellar-panel2 p-3">
      <div>
        <p className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          safety check
        </p>
        <p className="mt-1 font-mono text-xs uppercase text-stellar-text">
          {status}
        </p>
        {summary && (
          <p className="mt-2 text-sm text-stellar-muted">
            {summary}
          </p>
        )}
      </div>

      <button className="btn w-fit" onClick={scan} disabled={state === 'scanning'}>
        {state === 'scanning' ? 'Scanning...' : 'Run safety check'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}

      {findings.length > 0 && (
        <div className="grid gap-2">
          {findings.map((finding, index) => (
            <div key={`${finding.code}-${index}`} className="border border-stellar-border p-2">
              <p className="font-mono text-xs uppercase text-stellar-accent">
                {finding.severity} / {finding.code}
              </p>
              <p className="mt-1 text-sm text-stellar-text">
                {finding.message}
              </p>
              {finding.file && (
                <p className="mt-1 break-all font-mono text-xs text-stellar-muted">
                  {finding.file}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
