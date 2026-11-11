import "server-only";

/**
 * Small best-effort protections for public form endpoints.
 * In-memory, so limits apply per server instance. For stronger protection behind
 * heavy traffic, use a shared store (e.g. Upstash Redis) or a WAF rule.
 */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > limit;
}

export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/** Remembers recently processed webhook events so repeats are acknowledged without being processed twice. */
const seen = new Map<string, number>();
export function alreadyProcessed(id: string, ttlMs = 72 * 60 * 60 * 1000) {
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > ttlMs) seen.delete(k);
  if (seen.has(id)) return true;
  seen.set(id, now);
  return false;
}
/** Let a failed event be processed again when the provider retries it. */
export function forgetProcessed(id: string) {
  seen.delete(id);
}

/** Only accept JSON posted from this site (simple CSRF/abuse check). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}
