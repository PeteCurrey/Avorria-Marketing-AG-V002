/**
 * lib/auth.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Authentication and authorisation utilities.
 *
 * Architecture:
 * - Session is stored in an HttpOnly secure cookie (no localStorage)
 * - All role checks are performed server-side
 * - Client components never receive raw session tokens
 * - Authorization is always re-validated on every server action / route handler
 *
 * Current implementation: cookie-based session with in-memory store (suitable
 * for single-instance development). For production, replace the session store
 * with a persistent backend (e.g. Supabase Auth, next-auth with adapter, etc.)
 *
 * The interface of this module is designed so that switching the underlying
 * auth provider requires only changing this file — not the route or component
 * layer.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { User, UserRole, Session } from '@/types/platform'

// ─── Session Cookie Configuration ─────────────────────────────────────────────

export const SESSION_COOKIE = 'avorria_session'

const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// ─── In-Memory Session Store ──────────────────────────────────────────────────
// ⚠ Development only. Replace with Redis / database sessions in production.
// Keyed by opaque session token.

type SessionStore = Map<string, { user: User; expiresAt: Date }>
const sessionStore: SessionStore = new Map()

// ─── Demo / Seed Users ────────────────────────────────────────────────────────
// Placeholder users for local development. Remove before connecting real auth.
// These users are never exposed to the browser.

const DEMO_USERS: User[] = [
  {
    id: 'user_admin_01',
    email: 'admin@avorria.com',
    name: 'Avorria Admin',
    role: 'ADMIN',
    organisationId: null,
    createdAt: '2026-01-01T00:00:00Z',
    lastSignInAt: null,
  },
  {
    id: 'user_team_01',
    email: 'team@avorria.com',
    name: 'Avorria Team',
    role: 'TEAM',
    organisationId: null,
    createdAt: '2026-01-01T00:00:00Z',
    lastSignInAt: null,
  },
  {
    id: 'user_client_01',
    email: 'client@example.com',
    name: 'Client User',
    role: 'CLIENT',
    organisationId: 'org_01',
    createdAt: '2026-01-01T00:00:00Z',
    lastSignInAt: null,
  },
]

// Credentials for demo login (development only)
// In production: hash + salt passwords, never store in code
const DEMO_CREDENTIALS: Record<string, string> = {
  'admin@avorria.com':   'admin-dev-2026',
  'team@avorria.com':    'team-dev-2026',
  'client@example.com':  'client-dev-2026',
}

// ─── Token Generation ─────────────────────────────────────────────────────────

function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('')
}

// ─── Session Retrieval ────────────────────────────────────────────────────────

/**
 * Returns the current session from the HttpOnly cookie, or null if not
 * authenticated / session expired.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const entry = sessionStore.get(token)
  if (!entry) return null

  if (entry.expiresAt < new Date()) {
    sessionStore.delete(token)
    return null
  }

  return {
    user: entry.user,
    expiresAt: entry.expiresAt.toISOString(),
  }
}

/**
 * Returns the current user, or null if not authenticated.
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
}

// ─── Authorization Guards ─────────────────────────────────────────────────────

/**
 * Requires an authenticated session.
 * Redirects to the login page if not authenticated.
 */
export async function requireAuth(loginPath = '/client/login'): Promise<User> {
  const user = await getCurrentUser()
  if (!user) redirect(loginPath)
  return user
}

/**
 * Requires a specific role (or higher).
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
 * Requires ADMIN role specifically.
 */
export async function requireAdmin(): Promise<User> {
  return requireRole('ADMIN', '/admin/login')
}

/**
 * Returns true if the user has at least the required role.
 */
export function hasRole(user: User, required: UserRole): boolean {
  const hierarchy: UserRole[] = ['CLIENT', 'TEAM', 'ADMIN']
  const userLevel = hierarchy.indexOf(user.role)
  const requiredLevel = hierarchy.indexOf(required)
  return userLevel >= requiredLevel
}

/**
 * Returns true if a CLIENT user owns a resource (i.e. it belongs to their org).
 * TEAM and ADMIN users always pass this check.
 */
export function canAccessOrganisation(user: User, organisationId: string): boolean {
  if (hasRole(user, 'TEAM')) return true
  return user.organisationId === organisationId
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export interface SignInResult {
  success: boolean
  error?: string
  redirectTo?: string
}

/**
 * Validates credentials and creates a session.
 * In production: replace credential lookup with database + bcrypt comparison.
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
  // Normalise email
  const normalisedEmail = email.trim().toLowerCase()

  // Lookup user
  const user = DEMO_USERS.find((u) => u.email === normalisedEmail)
  if (!user) {
    // Use a consistent error message — don't reveal whether email exists
    return { success: false, error: 'Invalid email or password.' }
  }

  // Validate credentials
  const expectedPassword = DEMO_CREDENTIALS[normalisedEmail]
  if (!expectedPassword || password !== expectedPassword) {
    return { success: false, error: 'Invalid email or password.' }
  }

  // Create session
  const token = generateToken()
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)
  sessionStore.set(token, { user: { ...user, lastSignInAt: new Date().toISOString() }, expiresAt })

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  // Determine redirect based on role
  const redirectTo = user.role === 'ADMIN' || user.role === 'TEAM'
    ? '/admin/dashboard'
    : '/client/dashboard'

  return { success: true, redirectTo }
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) sessionStore.delete(token)
  cookieStore.delete(SESSION_COOKIE)
}
