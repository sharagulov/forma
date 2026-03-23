/**
 * In-memory sliding-window rate limiter per client key (e.g. IP).
 * SEC-002: mitigates abuse; note: not shared across serverless instances — use
 * Redis/Upstash/KV in production for strict limits.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

type Entry = { count: number; windowStart: number };

const store = new Map<string, Entry>();

function prune(now: number) {
  for (const [key, entry] of store) {
    if (now - entry.windowStart > WINDOW_MS * 2) {
      store.delete(key);
    }
  }
}

export function checkContactRateLimit(clientKey: string): boolean {
  const now = Date.now();
  if (store.size > 10_000) prune(now);

  const current = store.get(clientKey);
  if (!current) {
    store.set(clientKey, { count: 1, windowStart: now });
    return true;
  }

  if (now - current.windowStart > WINDOW_MS) {
    current.count = 1;
    current.windowStart = now;
    return true;
  }

  current.count += 1;
  return current.count <= MAX_PER_WINDOW;
}
