const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type AttemptRecord = {
  count: number;
  resetAt: number;
};

const store = globalThis as unknown as { loginAttempts?: Map<string, AttemptRecord> };

if (!store.loginAttempts) {
  store.loginAttempts = new Map<string, AttemptRecord>();
}

export function checkRateLimit(key: string) {
  const attempts = store.loginAttempts!;
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  attempts.set(key, current);
  return { allowed: true, remaining: MAX_ATTEMPTS - current.count };
}
