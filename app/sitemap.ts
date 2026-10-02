import { siteConfig } from '@/content/config/site'
import { getPublishedProjectSlugs } from '@/content/projects'
import { getPublishedServices } from '@/content/services'
import type { MetadataRoute } from 'next'

/**
 * Native Next.js sitemap — no next-sitemap dependency.
 * Lobby items sourced from DB at build time (ISR-compatible).
 * Only includes canonical, public, PUBLISHED pages.
 * Excludes: drafts, API routes, error pages, /client/*, /admin/*,
 *           /lobby/search, /lobby/tag/* (noindex until meaningful content),
 *           /journal (301 redirects — not a canonical URL)
 */
export const revalidate = 3600 // Regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/work`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/services`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/process`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/lobby`,              lastModified: now, changeFrequency: 'daily',   priority: 0.85 },
    { url: `${base}/pricing`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/audit`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/start-a-project`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/cookies`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = getPublishedServices().map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const projectRoutes: MetadataRoute.Sitemap = getPublishedProjectSlugs().map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // The Lobby — articles and categories sourced from DB at build/ISR time
  let lobbyArticleRoutes: MetadataRoute.Sitemap = []
  let lobbyCategoryRoutes: MetadataRoute.Sitemap = []
  let lobbyAuthorRoutes: MetadataRoute.Sitemap = []

  try {
    // Dynamic import to keep sitemap async and server-only
    const { getPublishedArticles, getCategories, getAuthors } = await import('@/lib/lobby')

    const [articles, categories, authors] = await Promise.all([
      getPublishedArticles(),
      getCategories(),
      getAuthors(),
    ])

    lobbyArticleRoutes = articles
      .filter((a) => !a.seo?.noIndex)
      .map((a) => ({
        url: `${base}/lobby/${a.slug}`,
        lastModified: a.updatedAt || a.publishedAt || now,
        changeFrequency: 'monthly' as const,
        priority: a.isFeatured ? 0.85 : 0.75,
      }))

    // Only the 5 launch categories are indexed by default
    lobbyCategoryRoutes = categories
      .filter((c) => c.isActive)
      .map((c) => ({
        url: `${base}/lobby/category/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    // Real authors only (no fabricated contributors)
    lobbyAuthorRoutes = authors
      .filter((a) => a.isActive)
      .map((a) => ({
        url: `${base}/lobby/author/${a.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch {
    // Sitemap must not break build if DB is unavailable
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...lobbyArticleRoutes,
    ...lobbyCategoryRoutes,
    ...lobbyAuthorRoutes,
  ]
}
