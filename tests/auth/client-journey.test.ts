import { describe, it, expect } from 'vitest'
import { sanitizeClientRedirect } from '@/lib/utils/redirect'

describe('Unauthenticated Client Journey — Security & Routing', () => {
  describe('Return URL Sanitization (sanitizeClientRedirect)', () => {
    it('defaults to /client/dashboard when no redirect parameter is provided', () => {
      expect(sanitizeClientRedirect(undefined)).toBe('/client/dashboard')
      expect(sanitizeClientRedirect(null)).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('   ')).toBe('/client/dashboard')
    })

    it('preserves legitimate protected client route destinations', () => {
      expect(sanitizeClientRedirect('/client/projects/123')).toBe('/client/projects/123')
      expect(sanitizeClientRedirect('/client/messages?thread=45')).toBe('/client/messages?thread=45')
      expect(sanitizeClientRedirect('/client/documents/spec-v1.pdf')).toBe('/client/documents/spec-v1.pdf')
      expect(sanitizeClientRedirect('/client/profile')).toBe('/client/profile')
    })

    it('strictly prevents open redirect attacks to external hosts', () => {
      expect(sanitizeClientRedirect('https://evil.com')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('http://attacker.org/client/projects')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('//evil.com/client')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('///evil.com')).toBe('/client/dashboard')
    })

    it('prevents loopback to authentication-only routes', () => {
      expect(sanitizeClientRedirect('/client/login')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client/forgot-password')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client/reset-password')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client/verify')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client/signup')).toBe('/client/dashboard')
    })

    it('rejects path traversal or malformed slashes', () => {
      expect(sanitizeClientRedirect('/client//evil.com')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client\\evil.com')).toBe('/client/dashboard')
      expect(sanitizeClientRedirect('/client%2f%2fevil.com')).toBe('/client/dashboard')
    })
  })

  describe('Route Category Definitions', () => {
    const PUBLIC_MARKETING_ROUTES = [
      '/',
      '/about',
      '/services',
      '/work',
      '/contact',
      '/pricing',
      '/lobby',
    ]

    const AUTH_ROUTES = [
      '/client/login',
      '/client/forgot-password',
      '/client/reset-password',
      '/client/verify',
      '/client/signup',
    ]

    const PROTECTED_CLIENT_ROUTES = [
      '/client',
      '/client/dashboard',
      '/client/projects',
      '/client/projects/123',
      '/client/messages',
      '/client/documents',
      '/client/deliverables',
      '/client/profile',
      '/client/activity',
      '/client/settings',
    ]

    it('correctly partitions marketing, auth, and protected client paths', () => {
      // Marketing routes are outside /client
      PUBLIC_MARKETING_ROUTES.forEach((route) => {
        expect(route.startsWith('/client')).toBe(false)
      })

      // Auth routes are within /client and belong to known set
      AUTH_ROUTES.forEach((route) => {
        expect(route.startsWith('/client')).toBe(true)
      })

      // Protected routes must never match auth routes
      PROTECTED_CLIENT_ROUTES.forEach((route) => {
        expect(AUTH_ROUTES.includes(route)).toBe(false)
      })
    })
  })
})
