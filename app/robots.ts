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
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/client/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
