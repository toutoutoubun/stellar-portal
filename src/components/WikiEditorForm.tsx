import { useState } from 'react';
import type { WikiEditorFormCopy } from '@/lib/wiki';

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
  copy?: WikiEditorFormCopy;
};

const locales = ['ja', 'en', 'fr', 'af'];
const statuses = ['published', 'draft', 'archived'];

const defaultCopy: WikiEditorFormCopy = {
  slugLabel: 'slug',
  localeLabel: 'locale',
  statusLabel: 'status',
  titleLabel: 'title',
  bodyLabel: 'body',
  titlePlaceholder: 'Wiki page title',
  bodyPlaceholder: 'Separate body paragraphs with blank lines.',
  saveIdle: 'Save Wiki Page',
  saveBusy: 'Saving...',
  savedMessage: 'Wiki page saved.',
  saveFailed: 'Wiki save failed.',
  editablePages: 'editable pages',
  emptyPages: 'No editable DB-backed Wiki pages yet.',
  locales: { ja: 'Japanese', en: 'English', fr: 'French', af: 'Afrikaans' },
  statuses: { published: 'published', draft: 'draft', archived: 'archived' }
};

export default function WikiEditorForm({ lang, pages, copy = defaultCopy }: Props) {
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
      setMessage(result.error ?? copy.saveFailed);
      return;
    }

    setSlug(result.page.slug);
    setLocale(result.page.locale);
    setStatus(result.page.status);
    setMessage(copy.savedMessage);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <form className="terminal-panel grid gap-4 p-5" onSubmit={save}>
        <div className="grid gap-4 md:grid-cols-[1fr_160px_160px]">
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">{copy.slugLabel}</span>
            <input className="form-input" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="quick-start" />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">{copy.localeLabel}</span>
            <select className="form-input" value={locale} onChange={(event) => setLocale(event.target.value)}>
              {locales.map((item) => <option key={item} value={item}>{copy.locales[item] ?? item}</option>)}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">{copy.statusLabel}</span>
            <select className="form-input" value={status} onChange={(event) => setStatus(event.target.value)}>
              {statuses.map((item) => <option key={item} value={item}>{copy.statuses[item] ?? item}</option>)}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">{copy.titleLabel}</span>
          <input className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={copy.titlePlaceholder} />
        </label>

        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[.16em] text-stellar-muted">{copy.bodyLabel}</span>
          <textarea
            className="form-input min-h-72"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={copy.bodyPlaceholder}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? copy.saveBusy : copy.saveIdle}</button>
          {message && <p className="text-sm text-stellar-muted">{message}</p>}
        </div>
      </form>

      <aside className="terminal-panel h-fit p-5">
        <p className="mb-4 font-mono text-xs uppercase tracking-[.18em] text-stellar-accent">{copy.editablePages}</p>
        <div className="grid gap-2">
          {pages.length ? pages.map((page) => (
            <button
              key={`${page.locale}:${page.slug}`}
              type="button"
              className="border border-stellar-border p-3 text-left hover:border-stellar-accent"
              onClick={() => loadPage(page)}
            >
              <span className="block font-mono text-xs uppercase tracking-[.12em] text-stellar-muted">{copy.locales[page.locale] ?? page.locale} / {copy.statuses[page.status] ?? page.status}</span>
              <span className="mt-1 block text-stellar-text">{page.title}</span>
              <span className="mt-1 block break-all font-mono text-xs text-stellar-muted">/{page.slug}</span>
            </button>
          )) : <p className="text-sm leading-6 text-stellar-muted">{copy.emptyPages}</p>}
        </div>
      </aside>
    </div>
  );
}
