import React, { useState } from 'react';

type Props = { addonId: string; currentStatus: string; currentRisk: string; currentOfficial: string };

export default function ReviewPanel({ addonId, currentStatus, currentRisk, currentOfficial }: Props) {
  const [reviewStatus, setReviewStatus] = useState(currentStatus);
  const [riskLevel, setRiskLevel] = useState(currentRisk);
  const [officialStatus, setOfficialStatus] = useState(currentOfficial);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  async function submit(action: string) {
    const res = await fetch(`/api/admin/addons/${addonId}/review`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, review_status: reviewStatus, risk_level: riskLevel, official_status: officialStatus, note })
    });
    const json = await res.json();
    setMessage(res.ok ? 'Review saved.' : json.error ?? 'Failed.');
  }

  return (
    <section className="terminal-panel grid gap-4 p-6">
      <h2 className="font-mono text-xl tracking-[.08em]">Review console</h2>
      <label className="grid gap-2 font-mono text-sm">Review status
        <select className="form-input" value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)}>
          {['pending','needs_changes','approved','rejected','suspended'].map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="grid gap-2 font-mono text-sm">Risk level
        <select className="form-input" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          {['low','medium','high','unknown'].map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="grid gap-2 font-mono text-sm">Official status
        <select className="form-input" value={officialStatus} onChange={(e) => setOfficialStatus(e.target.value)}>
          {['official','reviewed','community','unreviewed'].map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="grid gap-2 font-mono text-sm">Moderator note
        <textarea className="form-input min-h-32" value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => submit('approve')}>Save / Approve</button>
        <button className="btn" onClick={() => { setReviewStatus('needs_changes'); submit('needs_changes'); }}>Request changes</button>
        <button className="btn" onClick={() => { setReviewStatus('rejected'); submit('reject'); }}>Reject</button>
        <button className="btn btn-danger" onClick={() => { setReviewStatus('suspended'); submit('suspend'); }}>Suspend</button>
      </div>
      {message && <p className="text-sm text-stellar-muted">{message}</p>}
    </section>
  );
}
