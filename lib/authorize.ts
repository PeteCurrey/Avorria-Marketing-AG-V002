/**
 * lib/authorize.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single typed authorization layer used by every mutation and data function.
 *
 * Design principles:
 * - Never returns false silently — always throws AuthorizationError on deny
 * - Called after authentication — user is already verified
 * - Resource-level checks enforce org scoping
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { hasRole } from '@/lib/auth'
import type { User } from '@/types/platform'

// ─── Actions ─────────────────────────────────────────────────────────────────

export type Action =
  // Projects
  | 'read:project'
  | 'write:project'
  | 'delete:project'
  // Enquiries (internal only — clients never access)
  | 'read:enquiry'
  | 'write:enquiry'
  | 'delete:enquiry'
  // Documents
  | 'read:document'
  | 'upload:document'
  | 'delete:document'
  // Deliverables
  | 'read:deliverable'
  | 'publish:deliverable'
  // Messages
  | 'read:message'
  | 'send:message'
  // Users
  | 'invite:user'
  | 'manage:user'
  // Admin-only
  | 'admin:*'

// ─── Resource context ─────────────────────────────────────────────────────────

export interface ResourceContext {
  organisationId?: string | null
}

// ─── Error ───────────────────────────────────────────────────────────────────

export class AuthorizationError extends Error {
  constructor(
    public readonly action: Action,
    public readonly reason: string,
  ) {
    super(`Authorization denied: ${action} — ${reason}`)
    this.name = 'AuthorizationError'
  }
}

// ─── Policy table ────────────────────────────────────────────────────────────

/**
 * authorize(user, action, resource?)
 *
 * Throws AuthorizationError if the action is not permitted.
 * Returns void on success — callers can proceed.
 *
 * Usage:
 *   authorize(user, 'read:project', { organisationId: project.organisationId })
 */
export function authorize(
  user: User,
  action: Action,
  resource?: ResourceContext,
): void {
  // ADMIN can do anything
  if (user.role === 'ADMIN') return

  // admin:* requires ADMIN
  if (action === 'admin:*') {
    throw new AuthorizationError(action, 'Requires ADMIN role')
  }

  // Enquiries: TEAM and ADMIN only
  if (action === 'read:enquiry' || action === 'write:enquiry' || action === 'delete:enquiry') {
    if (!hasRole(user, 'TEAM')) {
      throw new AuthorizationError(action, 'Clients cannot access enquiries')
    }
    return
  }

  // User management: ADMIN only (already handled above)
  if (action === 'invite:user' || action === 'manage:user') {
    throw new AuthorizationError(action, 'Requires ADMIN role')
  }

  // Destructive operations: TEAM or ADMIN
  if (action === 'delete:project' || action === 'delete:document') {
    if (!hasRole(user, 'TEAM')) {
      throw new AuthorizationError(action, 'Delete operations require TEAM or ADMIN')
    }
  }

  // Publishing: TEAM or ADMIN
  if (action === 'publish:deliverable') {
    if (!hasRole(user, 'TEAM')) {
      throw new AuthorizationError(action, 'Publishing requires TEAM or ADMIN')
    }
    return
  }

  // TEAM can do most things cross-org
  if (hasRole(user, 'TEAM')) return

  // CLIENT: must be within their organisation
  if (resource?.organisationId) {
    if (user.organisationId !== resource.organisationId) {
      throw new AuthorizationError(
        action,
        `Client ${user.id} cannot access org ${resource.organisationId}`
      )
    }
  }
}
