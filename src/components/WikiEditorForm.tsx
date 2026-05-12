import { useState } from 'react';

type WikiPageDraft = {
  slug: string;
  locale: string;
  title: string;
  body: string;
  status: string;
  updated_at?: string | null;
};

type Props = {
  lang: string;
  pages: WikiPageDraft[];
};

const locales = ['ja', 'en', 'fr', 'af'];
const statuses = ['published', 'draft', 'archived'];

export default function WikiEditorForm({ lang, pages }: Props) {
  const [slug, setSlug] = useState('');
  const [locale, setLocale] = useState(lang);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('published');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  function loadPage(page: WikiPageDraft) {
    setSlug(page.slug);
    setLocale(page.locale);
    setTitle(page.title);
    setBody(page.body);
    setStatus(page.status);
    setMessage('');
  }

  async function save(event: { preventDefault(): void }) {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    const response = await fetch('/api/wiki-pages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, locale, title, body, status })
    });

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? 'Wiki save failed.');
      return;
    }

    setSlug(result.page.slug);
    setLocale(result.page.locale);
    setStatus(result.page.status);
    setMessage('Wiki page saved.');
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <form className="terminal-panel grid gap-4 p-5" onSubmit={save}>
        <div className="grid gap-4 md:grid-cols-[1fr_160px_160px]">
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">slug</span>
            <input className="form-input" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="quick-start" />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">locale</span>
            <select className="form-input" value={locale} onChange={(event) => setLocale(event.target.value)}>
              {locales.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">status</span>
            <select className="form-input" value={status} onChange={(event) => setStatus(event.target.value)}>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">title</span>
          <input className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Wiki page title" />
        </label>

        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">body</span>
          <textarea
            className="form-input min-h-72"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="本文を段落ごとに空行で区切って入力してください。"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Wiki Page'}</button>
          {message && <p className="text-sm text-stellar-muted">{message}</p>}
        </div>
      </form>

      <aside className="terminal-panel h-fit p-5">
        <p className="mb-4 font-mono text-xs uppercase tracking-[.18em] text-stellar-accent">editable pages</p>
        <div className="grid gap-2">
          {pages.length ? pages.map((page) => (
            <button
              key={`${page.locale}:${page.slug}`}
              type="button"
              className="border border-stellar-border p-3 text-left hover:border-stellar-accent"
              onClick={() => loadPage(page)}
            >
              <span className="block font-mono text-xs uppercase tracking-[.12em] text-stellar-muted">{page.locale} / {page.status}</span>
              <span className="mt-1 block text-stellar-text">{page.title}</span>
              <span className="mt-1 block break-all font-mono text-xs text-stellar-muted">/{page.slug}</span>
            </button>
          )) : <p className="text-sm leading-6 text-stellar-muted">No editable DB-backed Wiki pages yet.</p>}
        </div>
      </aside>
    </div>
  );
}
