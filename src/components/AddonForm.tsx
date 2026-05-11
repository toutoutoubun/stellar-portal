import React, { useState } from 'react';
import { allowedPermissions } from '@/lib/validators';

type Addon = {
  id?: string;
  name?: string;
  slug?: string;
  short_description?: string;
  description?: string;
  default_locale?: string;
  repo_url?: string;
  release_url?: string;
  documentation_url?: string;
  license?: string;
  compatible_stellar_version?: string;
  current_version?: string;
  checksum?: string;
  permissions?: string[];
};

type Props = { addon?: Addon | null; lang: string };

export default function AddonForm({ addon, lang }: Props) {
  const [form, setForm] = useState<Addon>({
    name: addon?.name ?? '',
    slug: addon?.slug ?? '',
    short_description: addon?.short_description ?? '',
    description: addon?.description ?? '',
    default_locale: addon?.default_locale ?? lang,
    repo_url: addon?.repo_url ?? '',
    release_url: addon?.release_url ?? '',
    documentation_url: addon?.documentation_url ?? '',
    license: addon?.license ?? 'MIT',
    compatible_stellar_version: addon?.compatible_stellar_version ?? '>=0.1.0',
    current_version: addon?.current_version ?? '0.1.0',
    checksum: addon?.checksum ?? '',
    permissions: addon?.permissions ?? []
  });
  const [message, setMessage] = useState('');

  function update(key: keyof Addon, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePermission(permission: string) {
    const current = new Set(form.permissions ?? []);
    current.has(permission) ? current.delete(permission) : current.add(permission);
    update('permissions', Array.from(current));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const url = addon?.id ? `/api/addons/${addon.id}` : '/api/addons';
    const res = await fetch(url, {
      method: addon?.id ? 'PATCH' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form)
    });
    const json = await res.json();
    if (res.ok) {
      setMessage(addon?.id ? 'Saved and returned to pending review.' : 'Submitted for review.');
      if (!addon?.id && json.id) window.location.href = `/${lang}/dashboard/addons`;
    } else {
      setMessage(json.error ?? (json.errors ? json.errors.join('\n') : 'Submission failed.'));
    }
  }

  return (
    <form onSubmit={submit} className="terminal-panel grid gap-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-mono text-sm">Name<input className="form-input" required value={form.name ?? ''} onChange={(e) => update('name', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">Slug<input className="form-input" value={form.slug ?? ''} onChange={(e) => update('slug', e.target.value)} placeholder="auto if blank" /></label>
      </div>
      <label className="grid gap-2 font-mono text-sm">Short description<input className="form-input" required value={form.short_description ?? ''} onChange={(e) => update('short_description', e.target.value)} /></label>
      <label className="grid gap-2 font-mono text-sm">Description<textarea className="form-input min-h-40" required value={form.description ?? ''} onChange={(e) => update('description', e.target.value)} /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-mono text-sm">Repo URL<input className="form-input" value={form.repo_url ?? ''} onChange={(e) => update('repo_url', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">Release URL<input className="form-input" required value={form.release_url ?? ''} onChange={(e) => update('release_url', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">Documentation URL<input className="form-input" value={form.documentation_url ?? ''} onChange={(e) => update('documentation_url', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">License<input className="form-input" required value={form.license ?? ''} onChange={(e) => update('license', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">Compatible Stellar version<input className="form-input" required value={form.compatible_stellar_version ?? ''} onChange={(e) => update('compatible_stellar_version', e.target.value)} /></label>
        <label className="grid gap-2 font-mono text-sm">Addon version<input className="form-input" required value={form.current_version ?? ''} onChange={(e) => update('current_version', e.target.value)} /></label>
      </div>
      <label className="grid gap-2 font-mono text-sm">Checksum<input className="form-input" required value={form.checksum ?? ''} onChange={(e) => update('checksum', e.target.value)} placeholder="sha256-..." /></label>
      <fieldset className="grid gap-3 border border-stellar-border p-4">
        <legend className="px-2 font-mono text-xs uppercase tracking-[.18em] text-stellar-accent">Permissions</legend>
        <div className="grid gap-2 md:grid-cols-2">
          {allowedPermissions.map((permission) => (
            <label key={permission} className="flex items-center gap-2 font-mono text-sm text-stellar-muted">
              <input type="checkbox" checked={(form.permissions ?? []).includes(permission)} onChange={() => togglePermission(permission)} />
              {permission}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="border border-stellar-border p-3 text-sm leading-7 text-stellar-muted">Submission creates or returns the addon to pending review. Developer registration gives submission rights, not publication rights.</p>
      <button className="btn btn-primary">Submit for review</button>
      {message && <pre className="whitespace-pre-wrap text-sm text-stellar-muted">{message}</pre>}
    </form>
  );
}
