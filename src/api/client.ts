const BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) || ''
).replace(/\/$/, '');

/**
 * POSTs JSON to VITE_API_URL.
 * With no backend configured it simulates a successful call.
 */
export async function post<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  if (!BASE) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true } as T;
  }

  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  return res.json() as Promise<T>;
}