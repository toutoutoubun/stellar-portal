import { useState } from 'react';
import type { FormEvent } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { isLang, type Lang } from '@/lib/i18n';

type Props = {
  lang: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

const copy = {
  ja: {
    email: 'メールアドレス',
    sending: '送信中...',
    submit: 'ログインリンクを送る',
    sent: 'ログインメールを送信しました。新しく届いたメールのリンクを開いてください。',
    missingConfig: 'Supabase URLまたはanon keyがありません。',
    failed: '送信に失敗しました。'
  },
  en: {
    email: 'Email',
    sending: 'Sending...',
    submit: 'Send login link',
    sent: 'Login email sent. Open the link in the newest email.',
    missingConfig: 'Supabase URL or anon key is missing.',
    failed: 'Failed to send.'
  },
  fr: {
    email: 'Email',
    sending: 'Envoi...',
    submit: 'Envoyer le lien de connexion',
    sent: 'Email de connexion envoyé. Ouvrez le lien du dernier email reçu.',
    missingConfig: 'L’URL Supabase ou la clé anon manque.',
    failed: 'Échec de l’envoi.'
  },
  af: {
    email: 'E-pos',
    sending: 'Stuur...',
    submit: 'Stuur aanmeldskakel',
    sent: 'Aanmeld-e-pos gestuur. Maak die skakel in die nuutste e-pos oop.',
    missingConfig: 'Supabase-URL of anon-sleutel ontbreek.',
    failed: 'Kon nie stuur nie.'
  }
} satisfies Record<Lang, Record<string, string>>;

export default function LoginForm({
  lang,
  supabaseUrl,
  supabaseAnonKey
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const text = copy[isLang(lang) ? lang : 'ja'];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        setStatus('error');
        setMessage(text.missingConfig);
        return;
      }

      const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

      const redirectTo = `${window.location.origin}/${lang}/auth/callback`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setStatus('sent');
      setMessage(text.sent);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : text.failed);
    }
  }

  return (
    <form onSubmit={onSubmit} className="terminal-panel grid gap-4 p-6">
      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
          {text.email}
        </span>
        <input
          className="field"
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <button className="btn btn-primary w-fit" disabled={status === 'sending'}>
        {status === 'sending' ? text.sending : text.submit}
      </button>

      {message && (
        <p className={status === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </form>
  );
}
