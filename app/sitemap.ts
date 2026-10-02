import { siteConfig } from '@/content/config/site'
import { getPublishedProjectSlugs } from '@/content/projects'
import { getPublishedServices } from '@/content/services'
import { LOBBY_ARTICLES } from '@/content/lobby/articles'
import { LOBBY_CATEGORIES } from '@/content/lobby/categories'
import { LOBBY_AUTHORS } from '@/content/lobby/authors'
import type { MetadataRoute } from 'next'

/**
 * Native Next.js sitemap — no next-sitemap dependency.
 * Only includes canonical, public, published pages.
 * Excludes: drafts, API routes, error pages, /client/*, /admin/*, /lobby/search, /lobby/tag/*
 */
export default function sitemap(): MetadataRoute.Sitemap {
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

  // The Lobby Published Articles (excluding any noIndex)
  const lobbyArticleRoutes: MetadataRoute.Sitemap = LOBBY_ARTICLES
    .filter((a) => (a.status || 'PUBLISHED') === 'PUBLISHED' && !a.seo?.noIndex)
    .map((a) => ({
      url: `${base}/lobby/${a.slug}`,
      lastModified: a.updatedAt || a.publishedAt || now,
      changeFrequency: 'monthly' as const,
      priority: a.isFeatured ? 0.85 : 0.75,
    }))

  // The Lobby Categories
  const lobbyCategoryRoutes: MetadataRoute.Sitemap = LOBBY_CATEGORIES
    .filter((c) => c.isActive)
    .map((c) => ({
      url: `${base}/lobby/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // The Lobby Verified Authors
  const lobbyAuthorRoutes: MetadataRoute.Sitemap = LOBBY_AUTHORS
    .filter((a) => a.isActive)
    .map((a) => ({
      url: `${base}/lobby/author/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...lobbyArticleRoutes,
    ...lobbyCategoryRoutes,
    ...lobbyAuthorRoutes,
  ]
}
