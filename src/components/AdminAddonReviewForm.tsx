import { useState } from 'react';

type Props = {
  addonId: string;
  initialReviewStatus: string;
  initialRiskLevel: string;
  initialOfficialStatus: string;
};

const reviewStatuses = [
  'pending',
  'needs_changes',
  'approved',
  'rejected',
  'suspended'
];

const riskLevels = [
  'low',
  'medium',
  'high',
  'unknown'
];

const officialStatuses = [
  'official',
  'reviewed',
  'community',
  'unreviewed'
];

export default function AdminAddonReviewForm({
  addonId,
  initialReviewStatus,
  initialRiskLevel,
  initialOfficialStatus
}: Props) {
  const [reviewStatus, setReviewStatus] = useState(initialReviewStatus);
  const [riskLevel, setRiskLevel] = useState(initialRiskLevel);
  const [officialStatus, setOfficialStatus] = useState(initialOfficialStatus);
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    setState('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/addons/${addonId}/review`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          review_status: reviewStatus,
          risk_level: riskLevel,
          official_status: officialStatus,
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
      setMessage('審査結果を保存しました。');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '保存に失敗しました。');
    }
  }

  return (
    <div className="terminal-panel grid gap-4 p-5">
      <p className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
        review console
      </p>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Review status
        </span>
        <select className="field" value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)}>
          {reviewStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Risk level
        </span>
        <select className="field" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          {riskLevels.map((risk) => (
            <option key={risk} value={risk}>{risk}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Official status
        </span>
        <select className="field" value={officialStatus} onChange={(e) => setOfficialStatus(e.target.value)}>
          {officialStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.18em] text-stellar-muted">
          Moderator note
        </span>
        <textarea
          className="field min-h-32"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="承認理由、差し戻し理由、危険性のメモなど"
        />
      </label>

      <button className="btn btn-primary w-fit" onClick={submit} disabled={state === 'saving'}>
        {state === 'saving' ? 'Saving...' : 'Save review'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
