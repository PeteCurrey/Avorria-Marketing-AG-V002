import type { NextConfig } from 'next'

// ─── Content Security Policy ──────────────────────────────────────────────────
// 'unsafe-inline' in style-src is required for Tailwind CSS-in-JS and next/font.
// frame-ancestors 'none' supersedes X-Frame-Options but both are set for compat.
// connect-src includes *.supabase.co for Auth, REST, Realtime, and Storage.

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self';
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  media-src 'self' https://*.supabase.co;
  object-src 'none';
  frame-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim()

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avorria.com').replace(/^http:\/\//i, 'https://'),
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      // ─── Global security headers ─────────────────────────────────────────
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy',   value: ContentSecurityPolicy },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Noindex on non-production deployments
          ...(!isProduction
            ? [{ key: 'X-Robots-Tag', value: 'noindex' }]
            : []
          ),
        ],
      },
      // ─── Client portal: always noindex ──────────────────────────────────
      {
        source: '/client/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      // ─── Admin portal: always noindex ────────────────────────────────────
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },

  // ─── 301 Permanent Redirects: /journal → /lobby ───────────────────────────
  async redirects() {
    return [
      {
        source: '/journal',
        destination: '/lobby',
        permanent: true,
      },
      {
        source: '/journal/:slug*',
        destination: '/lobby/:slug*',
        permanent: true,
      },
    ]
  },

  trailingSlash: false,
}

export default nextConfig
