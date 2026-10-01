/**
 * lib/db/audit.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Append-only audit event writer. Uses service-role via SECURITY DEFINER
 * function — bypasses RLS safely. No client can call this.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { captureError } from '@/lib/monitoring'

export interface AuditEventInput {
  actorId?: string | null
  action: string
  resourceType: string
  resourceId?: string | null
  organisationId?: string | null
  metadata?: Record<string, unknown>
  ipAddress?: string | null
  userAgent?: string | null
}

/**
 * Writes an audit event via the service-role SECURITY DEFINER function.
 * Silently swallows errors — audit failure must never break the main flow.
 */
export async function writeAuditEvent(input: AuditEventInput): Promise<void> {
  try {
    const admin = createAdminClient()
    const { error } = await admin.rpc('write_audit_event', {
      p_actor_id:        input.actorId ?? null,
      p_action:          input.action,
      p_resource_type:   input.resourceType,
      p_resource_id:     input.resourceId ?? null,
      p_organisation_id: input.organisationId ?? null,
      p_metadata:        input.metadata ?? {},
      p_ip_address:      input.ipAddress ?? null,
      p_user_agent:      input.userAgent ?? null,
    })
    if (error) {
      captureError(error, { context: 'writeAuditEvent', action: input.action })
    }
  } catch (err) {
    // Audit failure must never surface to users
    captureError(err, { context: 'writeAuditEvent', action: input.action })
  }
}
