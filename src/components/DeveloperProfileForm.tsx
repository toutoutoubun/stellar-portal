import React, { useState } from 'react';

type Profile = {
  handle?: string | null;
  display_name?: string | null;
  bio?: string | null;
  website_url?: string | null;
  github_url?: string | null;
  bluesky_url?: string | null;
  x_url?: string | null;
  linkedin_url?: string | null;
};

type Props = { profile?: Profile | null };

export default function DeveloperProfileForm({ profile }: Props) {
  const [form, setForm] = useState<Profile>({
    handle: profile?.handle ?? '',
    display_name: profile?.display_name ?? '',
    bio: profile?.bio ?? '',
    website_url: profile?.website_url ?? '',
    github_url: profile?.github_url ?? '',
    bluesky_url: profile?.bluesky_url ?? '',
    x_url: profile?.x_url ?? '',
    linkedin_url: profile?.linkedin_url ?? ''
  });
  const [message, setMessage] = useState('');

  function update(key: keyof Profile, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch('/api/developer-profile', {
      method: profile ? 'PATCH' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form)
    });
    const json = await res.json();
    setMessage(res.ok ? 'Saved.' : json.error ?? 'Failed.');
  }

  return (
    <form onSubmit={save} className="terminal-panel grid gap-4 p-6">
      <label className="grid gap-2 font-mono text-sm">Handle
        <input className="form-input" required pattern="[a-z0-9][a-z0-9_-]{2,31}" value={form.handle ?? ''} onChange={(e) => update('handle', e.target.value)} />
      </label>
      <label className="grid gap-2 font-mono text-sm">Display name
        <input className="form-input" required value={form.display_name ?? ''} onChange={(e) => update('display_name', e.target.value)} />
      </label>
      <label className="grid gap-2 font-mono text-sm">Bio
        <textarea className="form-input min-h-28" value={form.bio ?? ''} onChange={(e) => update('bio', e.target.value)} />
      </label>
      {(['website_url','github_url','bluesky_url','x_url','linkedin_url'] as const).map((key) => (
        <label className="grid gap-2 font-mono text-sm" key={key}>{key}
          <input className="form-input" value={form[key] ?? ''} onChange={(e) => update(key, e.target.value)} />
        </label>
      ))}
      <button className="btn btn-primary">Save developer profile</button>
      {message && <p className="text-sm text-stellar-muted">{message}</p>}
    </form>
  );
}
