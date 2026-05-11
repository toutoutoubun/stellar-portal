import { useState } from 'react';
import type { FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

type Props = {
  lang: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export default function LoginForm({
  lang,
  supabaseUrl,
  supabaseAnonKey
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        setStatus('error');
        setMessage('Supabase URL or anon key is missing.');
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/${lang}/auth/callback`
        }
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setStatus('sent');
      setMessage('ログインメールを送信しました。受信箱と迷惑メールを確認してください。');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : '送信に失敗しました。');
    }
  }

  return (
    <form onSubmit={onSubmit} className="terminal-panel grid gap-4 p-6">
      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[.22em] text-stellar-muted">
          Email
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
        {status === 'sending' ? 'Sending...' : 'Send login link'}
      </button>

      {message && (
        <p className={status === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </form>
  );
}
