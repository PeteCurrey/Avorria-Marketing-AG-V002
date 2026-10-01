import { siteConfig } from '@/content/config/site'
import { getPublishedProjectSlugs } from '@/content/projects'
import { getPublishedServices } from '@/content/services'
import type { MetadataRoute } from 'next'

/**
 * Native Next.js sitemap — no next-sitemap dependency.
 * Only includes canonical, public, published pages.
 * Excludes: drafts, API routes, error pages, /client/*, /admin/*
 *
 * Phase 2A: /journal removed; /lobby added.
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
    { url: `${base}/lobby`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
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

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
