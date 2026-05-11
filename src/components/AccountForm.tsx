import React, { useState } from 'react';

type Props = { profile: { display_name: string | null; avatar_url: string | null; email: string | null; role: string; subscription_status: string } };

export default function AccountForm({ profile }: Props) {
  const [displayName, setDisplayName] = useState(profile.display_name ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? '');
  const [message, setMessage] = useState('');

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ display_name: displayName, avatar_url: avatarUrl })
    });
    const json = await res.json();
    setMessage(res.ok ? 'Saved.' : json.error ?? 'Failed.');
  }

  return (
    <form onSubmit={save} className="terminal-panel grid gap-4 p-6">
      <div className="grid gap-1 font-mono text-xs text-stellar-muted">
        <span>Email: {profile.email}</span>
        <span>Role: {profile.role}</span>
        <span>Subscription: {profile.subscription_status}</span>
      </div>
      <label className="grid gap-2 font-mono text-sm">Display name
        <input className="form-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </label>
      <label className="grid gap-2 font-mono text-sm">Avatar URL
        <input className="form-input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
      </label>
      <button className="btn btn-primary">Save profile</button>
      {message && <p className="text-sm text-stellar-muted">{message}</p>}
    </form>
  );
}
