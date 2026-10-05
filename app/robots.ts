import type { MetadataRoute } from 'next'
import { siteConfig } from '@/content/config/site'

/**
 * Native Next.js robots.txt
 * Allows all crawlers on public routes.
 * Disallows internal/non-public paths.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/images/',
          '/og/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/admin-login',
          '/admin-mfa',
          '/client/',
          '/audit/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
