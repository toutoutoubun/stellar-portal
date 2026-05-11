import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type Props = {
  lang: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export default function AuthCallbackClient({
  lang,
  supabaseUrl,
  supabaseAnonKey
}: Props) {
  const [message, setMessage] = useState('Completing login...');

  useEffect(() => {
    async function completeLogin() {
      try {
        const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.session) {
          window.location.replace(`/${lang}/dashboard`);
          return;
        }

        setMessage('ログイン情報を確認できませんでした。新しいログインメールを送ってください。');
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Login callback failed.');
      }
    }

    completeLogin();
  }, [lang, supabaseUrl, supabaseAnonKey]);

  return (
    <div className="mt-6 border border-stellar-border bg-stellar-panel2 p-4 text-stellar-muted">
      {message}
    </div>
  );
}
