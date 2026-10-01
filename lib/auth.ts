/**
 * lib/auth.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Authentication and authorisation — Supabase Auth implementation.
 *
 * Architecture:
 * - Session stored in httpOnly Supabase Auth cookies (managed by @supabase/ssr)
 * - Role stored in auth.users.app_metadata (set by service-role only)
 * - All role checks server-side — client never receives raw tokens
 * - MFA: ADMIN and TEAM require aal2 (TOTP) enforced server-side
 * - Every route/action re-validates — proxy.ts is coarse-only
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { User, UserRole, Session } from '@/types/platform'

// ─── Internal: map Supabase user → platform User ─────────────────────────────

function mapSupabaseUser(supabaseUser: {
  id: string
  email?: string
  app_metadata?: Record<string, unknown>
  user_metadata?: Record<string, unknown>
  created_at?: string
  last_sign_in_at?: string | null
}): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name: (supabaseUser.user_metadata?.full_name as string | undefined) ?? supabaseUser.email ?? '',
    role: ((supabaseUser.app_metadata?.role as string | undefined) ?? 'CLIENT') as UserRole,
    organisationId: (supabaseUser.app_metadata?.organisation_id as string | undefined) ?? null,
    createdAt: supabaseUser.created_at ?? new Date().toISOString(),
    lastSignInAt: supabaseUser.last_sign_in_at ?? null,
  }
}

// ─── Session retrieval ────────────────────────────────────────────────────────

/**
 * Returns the current authenticated session, or null.
 * Validates the Supabase JWT server-side — never trusts client claims.
 */
export async function getSession(): Promise<Session | null> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null

  // Get session for expiry
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  return {
    user: mapSupabaseUser(user),
    expiresAt: new Date(session.expires_at! * 1000).toISOString(),
  }
}

/**
 * Returns the current authenticated user, or null.
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
}

// ─── MFA check ───────────────────────────────────────────────────────────────

/**
 * Checks if the current session satisfies aal2 (MFA).
 * ADMIN and TEAM always require aal2.
 */
export async function checkMfa(): Promise<{ satisfied: boolean; currentLevel: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (error || !data) return { satisfied: false, currentLevel: 'aal1' }

  return {
    satisfied: data.currentLevel === 'aal2',
    currentLevel: data.currentLevel ?? 'aal1',
  }
}

// ─── Authorization guards ─────────────────────────────────────────────────────

/**
 * Requires an authenticated session.
 * Redirects to loginPath if not authenticated.
 */
export async function requireAuth(loginPath = '/client/login'): Promise<User> {
  const user = await getCurrentUser()
  if (!user) redirect(loginPath)
  return user
}

/**
 * Requires a role >= requiredRole.
 * Role hierarchy: CLIENT < TEAM < ADMIN
 */
export async function requireRole(
  requiredRole: UserRole,
  loginPath = '/client/login',
): Promise<User> {
  const user = await requireAuth(loginPath)
  if (!hasRole(user, requiredRole)) redirect('/unauthorized')
  return user
}

/**
 * Requires ADMIN role + aal2 MFA.
 */
export async function requireAdmin(): Promise<User> {
  const user = await requireRole('ADMIN', '/admin/login')
  const mfa = await checkMfa()
  if (!mfa.satisfied) redirect('/admin/mfa')
  return user
}

/**
 * Requires TEAM or ADMIN role + aal2 MFA.
 */
export async function requireTeam(): Promise<User> {
  const user = await requireRole('TEAM', '/admin/login')
  const mfa = await checkMfa()
  if (!mfa.satisfied) redirect('/admin/mfa')
  return user
}

/**
 * Returns true if the user has at least the required role.
 */
export function hasRole(user: User, required: UserRole): boolean {
  const hierarchy: UserRole[] = ['CLIENT', 'TEAM', 'ADMIN']
  return hierarchy.indexOf(user.role) >= hierarchy.indexOf(required)
}

/**
 * Returns true if a CLIENT user can access an organisation's data.
 * TEAM and ADMIN users always pass.
 */
export function canAccessOrganisation(user: User, organisationId: string): boolean {
  if (hasRole(user, 'TEAM')) return true
  return user.organisationId === organisationId
}

// ─── Sign in ─────────────────────────────────────────────────────────────────

export interface SignInResult {
  success: boolean
  error?: string
  redirectTo?: string
  mfaRequired?: boolean
}

/**
 * Signs in with email + password via Supabase Auth.
 * Returns redirect path based on role.
 * ADMIN/TEAM are redirected to MFA challenge if not already aal2.
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error || !data.user) {
    return { success: false, error: 'Invalid email or password.' }
  }

  const user = mapSupabaseUser(data.user)
  const isStaff = user.role === 'ADMIN' || user.role === 'TEAM'

  if (isStaff) {
    // Check MFA assurance level
    const mfa = await checkMfa()
    if (!mfa.satisfied) {
      return {
        success: true,
        mfaRequired: true,
        redirectTo: '/admin/mfa',
      }
    }
    return { success: true, redirectTo: '/admin/dashboard' }
  }

  return { success: true, redirectTo: '/client/dashboard' }
}

// ─── Sign out ─────────────────────────────────────────────────────────────────

/**
 * Signs out from all sessions (global scope).
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut({ scope: 'global' })
}

// ─── Password reset ───────────────────────────────────────────────────────────

/**
 * Sends a password reset email.
 */
export async function sendPasswordReset(email: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avorria.com'

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${siteUrl}/client/reset-password` }
  )

  if (error) {
    // Don't reveal whether the email exists
    console.error('[Auth] Password reset error:', error.message)
  }

  // Always return success to prevent email enumeration
  return {}
}
