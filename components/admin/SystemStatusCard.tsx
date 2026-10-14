'use client';

import { useEffect, useState } from 'react';

type HealthPayload = {
  status: 'ok' | 'error';
  latencyMs: number;
  timestamp: string;
  database: string;
};

export function SystemStatusCard() {
  const [state, setState] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchHealth = async () => {
      try {
        const response = await fetch('/api/health/db', { cache: 'no-store' });
        const payload = (await response.json()) as HealthPayload;
        if (!active) {
          return;
        }

        if (!response.ok) {
          setError('Unavailable');
          setState(payload);
          return;
        }

        setState(payload);
      } catch {
        if (active) {
          setError('Unavailable');
        }
      }
    };

    void fetchHealth();

    return () => {
      active = false;
    };
  }, []);

  const healthy = state?.status === 'ok' && !error;

  return (
    <article className="admin-card system-card" aria-live="polite">
      <h3>System status</h3>
      <p className={`status-dot ${healthy ? 'healthy' : 'unhealthy'}`}>
        {healthy ? 'Online' : 'Offline'}
      </p>
      <p>Latency: {state?.latencyMs ?? '...'} ms</p>
      <p>Database: {state?.database ?? 'neon'}</p>
    </article>
  );
}
