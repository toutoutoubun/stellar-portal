import React, { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabaseClient';

type Props = { lang: string };

export default function LoginForm({ lang }: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const supabase = createSupabaseBrowser();
    const redirectTo = `${window.location.origin}/${lang}/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Login link sent. Check your email.');
  }

  return (
    <form onSubmit={onSubmit} className="terminal-panel grid gap-4 p-6">
      <label className="grid gap-2 font-mono text-sm">
        Email
        <input className="form-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <button className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send magic link'}</button>
      {message && <p className="text-sm text-stellar-muted">{message}</p>}
    </form>
  );
}
