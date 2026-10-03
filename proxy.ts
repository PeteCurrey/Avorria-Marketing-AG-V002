/**
 * proxy.ts — Next.js 16 Middleware
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose:
 *   1. Session cookie refresh (Supabase SSR pattern)
 *   2. Coarse redirects for unauthenticated access to /client/* and /admin/*
 *   3. Return URL preservation (?redirect=...)
 *   4. Session expiration detection (?error=session-expired)
 *   5. Already-authenticated user redirection (/client/login → /client/dashboard)
 *
 * NOT a security boundary — every page, action, and data function re-validates
 * authorisation server-side.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { sanitizeClientRedirect } from '@/lib/utils/redirect'

const CLIENT_AUTH_ROUTES = [
  '/client/login',
  '/client/forgot-password',
  '/client/reset-password',
  '/client/verify',
  '/client/signup',
]

function isClientAuthRoute(pathname: string): boolean {
  return CLIENT_AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const { pathname } = request.nextUrl

  // ─── X-Robots-Tag: noindex on /client/* and /admin/* always ─────────────
  if (pathname.startsWith('/client') || pathname.startsWith('/admin')) {
    supabaseResponse.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // ─── X-Robots-Tag: noindex on non-production deployments ─────────────────
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    supabaseResponse.headers.set('X-Robots-Tag', 'noindex')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase credentials are not configured, handle client/admin redirects safely without crashing
  if (!supabaseUrl || !supabaseKey) {
    if (pathname.startsWith('/client') && !isClientAuthRoute(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = '/client/login'
      const target = sanitizeClientRedirect(pathname + (request.nextUrl.search || ''))
      if (target && target !== '/client/dashboard') {
        url.searchParams.set('redirect', target)
      }
      return NextResponse.redirect(url)
    }
    if (
      pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin/login') &&
      !pathname.startsWith('/admin/mfa')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  try {
    // Refresh session cookie — must use the request/response cookie pattern
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    // IMPORTANT: getUser() refreshes the session token if near expiry.
    // Do not use getSession() here — it does not validate the JWT server-side.
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    // Detect session expiration: cookies exist but getUser failed
    const allCookies = request.cookies.getAll()
    const hasAuthCookie = allCookies.some(
      (c) => c.name.includes('sb-') || c.name.includes('auth-token')
    )
    const isSessionExpired = hasAuthCookie && (!user || Boolean(userError))

    // ─── Direct /client root URL handling ────────────────────────────────────
    if (pathname === '/client' || pathname === '/client/') {
      const url = request.nextUrl.clone()
      url.pathname = user ? '/client/dashboard' : '/client/login'
      url.search = ''
      return NextResponse.redirect(url)
    }

    // ─── Protected /client/* routes → redirect to /client/login if unauthenticated ──
    if (pathname.startsWith('/client') && !isClientAuthRoute(pathname)) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/client/login'
        const target = sanitizeClientRedirect(pathname + (request.nextUrl.search || ''))
        if (isSessionExpired) {
          url.searchParams.set('error', 'session-expired')
        }
        if (target && target !== '/client/dashboard') {
          url.searchParams.set('redirect', target)
        }
        return NextResponse.redirect(url)
      }
    }

    // ─── Auth routes (/client/login, etc.) → redirect to dashboard if ALREADY authenticated ──
    if (isClientAuthRoute(pathname) && user) {
      // Allow /client/reset-password if actively in recovery mode
      const isResetting = pathname.startsWith('/client/reset-password') && request.nextUrl.searchParams.has('code')
      if (!isResetting) {
        const url = request.nextUrl.clone()
        const userRole = (user.app_metadata?.role as string | undefined) ?? 'CLIENT'
        url.pathname = userRole === 'ADMIN' || userRole === 'TEAM' ? '/admin/dashboard' : '/client/dashboard'
        url.search = ''
        return NextResponse.redirect(url)
      }
    }

    // ─── Coarse redirect: /admin/* → /admin/login ────────────────────────────
    if (
      pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin/login') &&
      !pathname.startsWith('/admin/mfa') &&
      !user
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('[Middleware Error in proxy.ts]:', error)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Apply to client and admin routes, and non-static, non-Next internals
    '/client/:path*',
    '/admin/:path*',
    // Exclude static assets and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export default proxy
export const middleware = proxy
