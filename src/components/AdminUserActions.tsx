import { useState } from 'react';

type Props = {
  userId: string;
  initialRole: string;
  initialSubscriptionStatus: string;
};

const roles = ['free_user', 'developer', 'reviewer', 'admin'];
const subscriptionStatuses = ['none', 'trialing', 'active', 'past_due', 'canceled'];

export default function AdminUserActions({
  userId,
  initialRole,
  initialSubscriptionStatus
}: Props) {
  const [role, setRole] = useState(initialRole);
  const [subscriptionStatus, setSubscriptionStatus] = useState(initialSubscriptionStatus);
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function save() {
    setState('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          role,
          subscription_status: subscriptionStatus
        })
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setState('error');
        setMessage(json?.error ?? `Failed: ${res.status}`);
        return;
      }

      setState('done');
      setMessage('保存しました。');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '保存に失敗しました。');
    }
  }

  return (
    <div className="grid gap-2">
      <div className="grid gap-2 md:grid-cols-2">
        <select className="field" value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select
          className="field"
          value={subscriptionStatus}
          onChange={(e) => setSubscriptionStatus(e.target.value)}
        >
          {subscriptionStatuses.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <button className="btn w-fit" onClick={save} disabled={state === 'saving'}>
        {state === 'saving' ? 'Saving...' : 'Save'}
      </button>

      {message && (
        <p className={state === 'error' ? 'text-stellar-danger' : 'text-stellar-muted'}>
          {message}
        </p>
      )}
    </div>
  );
}
