import { siteConfig } from '@/content/config/site'
import { getPublishedServices } from '@/content/services'
import type { MetadataRoute } from 'next'

/**
 * Native Next.js sitemap — no next-sitemap dependency.
 * Lobby items and case studies sourced strictly from DB at build/ISR time.
 * Only includes canonical, public, PUBLISHED and VERIFIED pages.
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

  // Work — verified and published case studies sourced from Supabase
  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const { getVerifiedPublishedCaseStudies } = await import('@/lib/db/proof')
    const caseStudies = await getVerifiedPublishedCaseStudies()
    projectRoutes = caseStudies.map((cs) => ({
      url: `${base}/work/${cs.slug}`,
      lastModified: cs.updated_at || cs.created_at || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {
    // Sitemap must not break build if DB is unavailable
  }

  // The Lobby — articles sourced from Supabase at build/ISR time
  let lobbyArticleRoutes: MetadataRoute.Sitemap = []
  try {
    const { getLobbyArticles } = await import('@/lib/db/lobby')
    const { articles } = await getLobbyArticles()

    lobbyArticleRoutes = articles.map((a) => ({
      url: `${base}/lobby/${a.slug}`,
      lastModified: a.updated_at || a.published_at || now,
      changeFrequency: 'monthly' as const,
      priority: a.featured ? 0.85 : 0.75,
    }))
  } catch {
    // Sitemap must not break build if DB is unavailable
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...lobbyArticleRoutes,
  ]
}
