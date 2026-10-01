/**
 * lib/db/rateLimit.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Postgres-backed rate limiting via the check_and_increment_rate_limit
 * SECURITY DEFINER function. Atomic upsert — safe under concurrent requests.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { captureError } from '@/lib/monitoring'
import { createHash } from 'crypto'

/**
 * Hash an IP address for storage — we store a SHA-256 hash, never raw IPs.
 */
function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex')
}

/**
 * Returns true if the request should be allowed, false if rate limited.
 * On DB error, defaults to ALLOW (fail open) to prevent blocking legitimate users.
 */
export async function checkRateLimit(
  ip: string,
  maxPerHour?: number,
): Promise<boolean> {
  const max = maxPerHour ?? Number(process.env.RATE_LIMIT_MAX ?? 3)
  const ipHash = hashIp(ip)

  try {
    const admin = createAdminClient()
    const { data, error } = await admin.rpc('check_and_increment_rate_limit', {
      p_ip_hash: ipHash,
      p_max_per_hour: max,
    })

    if (error) {
      captureError(error, { context: 'checkRateLimit', ip: 'redacted' })
      return true // fail open
    }

    return data === true
  } catch (err) {
    captureError(err, { context: 'checkRateLimit', ip: 'redacted' })
    return true // fail open
  }
}

export { hashIp }
