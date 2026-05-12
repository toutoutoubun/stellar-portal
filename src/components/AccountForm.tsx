import React, { useState } from 'react';

type Props = { profile: { display_name: string | null; avatar_url: string | null; email: string | null; role: string; subscription_status: string } };

type Copy = {
  email: string;
  role: string;
  subscription: string;
  displayName: string;
  avatarUrl: string;
  save: string;
  saved: string;
  failed: string;
};

type AccountProps = Props & { copy?: Copy };

const defaultCopy: Copy = {
  email: 'Email',
  role: 'Role',
  subscription: 'Subscription',
  displayName: 'Display name',
  avatarUrl: 'Avatar URL',
  save: 'Save profile',
  saved: 'Saved.',
  failed: 'Failed.'
};

export default function AccountForm({ profile, copy = defaultCopy }: AccountProps) {
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
    setMessage(res.ok ? copy.saved : json.error ?? copy.failed);
  }

  return (
    <form onSubmit={save} className="terminal-panel grid gap-4 p-6">
      <div className="grid gap-1 font-mono text-xs text-stellar-muted">
        <span>{copy.email}: {profile.email}</span>
        <span>{copy.role}: {profile.role}</span>
        <span>{copy.subscription}: {profile.subscription_status}</span>
      </div>
      <label className="grid gap-2 font-mono text-sm">{copy.displayName}
        <input className="form-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </label>
      <label className="grid gap-2 font-mono text-sm">{copy.avatarUrl}
        <input className="form-input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
      </label>
      <button className="btn btn-primary">{copy.save}</button>
      {message && <p className="text-sm text-stellar-muted">{message}</p>}
    </form>
  );
}
