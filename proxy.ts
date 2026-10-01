/**
 * proxy.ts — Next.js 16 Middleware
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose:
 *   1. Session cookie refresh (Supabase SSR pattern)
 *   2. Coarse redirects for unauthenticated access to /client/* and /admin/*
 *
 * NOT a security boundary — every page, action, and data function re-validates
 * authorisation server-side. This is convenience UX only.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Refresh session cookie — must use the request/response cookie pattern
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  )

  // IMPORTANT: getUser() refreshes the session token if near expiry.
  // Do not use getSession() here — it does not validate the JWT server-side.
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // ─── Coarse redirect: /client/* → /client/login ──────────────────────────
  // Except the login page itself — avoid redirect loop.
  if (
    pathname.startsWith('/client/') &&
    !pathname.startsWith('/client/login') &&
    !pathname.startsWith('/client/reset-password') &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/client/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // ─── Coarse redirect: /admin/* → /admin/login ────────────────────────────
  if (
    pathname.startsWith('/admin/') &&
    !pathname.startsWith('/admin/login') &&
    !pathname.startsWith('/admin/mfa') &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // ─── X-Robots-Tag: noindex on /client/* and /admin/* always ─────────────
  if (pathname.startsWith('/client/') || pathname.startsWith('/admin/')) {
    supabaseResponse.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // ─── X-Robots-Tag: noindex on non-production deployments ─────────────────
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    supabaseResponse.headers.set('X-Robots-Tag', 'noindex')
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
