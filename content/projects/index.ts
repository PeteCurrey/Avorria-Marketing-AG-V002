/**
 * Avorria — Project Content
 *
 * IMPORTANT: Only verified, factual project information.
 * No invented metrics, outcomes, statistics or testimonials.
 * Projects marked status: 'draft' will NOT appear on the site.
 * Each project must be reviewed and set to 'published' before going live.
 */

import type { Project } from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'drawdown',
    status: 'draft', // Set to 'published' after content review
    title: 'Drawdown',
    client: 'Avorria',
    year: 2024,
    industry: 'Financial Technology',
    services: ['web-development', 'digital-systems'],
    summary: 'A trading and financial data platform built by Avorria.',
    description:
      'Drawdown is a financial technology platform developed by Avorria. Further project details to be confirmed before publishing.',
    technology: ['Next.js', 'TypeScript', 'React', 'Supabase'],
    featured: false,
    seo: {
      title: 'Drawdown — Avorria',
      description: 'Financial technology platform developed by Avorria.',
    },
  },
  {
    slug: 'entire-uk',
    status: 'draft', // Set to 'published' after content review
    title: 'Entire UK',
    client: 'Entire UK',
    year: 2024,
    industry: 'To be confirmed',
    services: ['web-development'],
    summary: 'Project details to be confirmed.',
    description: 'Project details to be confirmed before publishing.',
    featured: false,
    seo: {
      title: 'Entire UK — Avorria Work',
      description: 'Project by Avorria. Details to be confirmed.',
    },
  },
  {
    slug: 'tafm',
    status: 'draft',
    title: 'TAFM',
    client: 'TAFM',
    year: 2024,
    industry: 'To be confirmed',
    services: ['web-development'],
    summary: 'Project details to be confirmed.',
    description: 'Project details to be confirmed before publishing.',
    featured: false,
    seo: {
      title: 'TAFM — Avorria Work',
      description: 'Project by Avorria. Details to be confirmed.',
    },
  },
  {
    slug: 'alkota',
    status: 'draft',
    title: 'Alkota',
    client: 'Alkota',
    year: 2024,
    industry: 'To be confirmed',
    services: ['web-development'],
    summary: 'Project details to be confirmed.',
    description: 'Project details to be confirmed before publishing.',
    featured: false,
    seo: {
      title: 'Alkota — Avorria Work',
      description: 'Project by Avorria. Details to be confirmed.',
    },
  },
  {
    slug: 'avorria-trades',
    status: 'draft',
    title: 'Avorria Trades',
    client: 'Avorria',
    year: 2024,
    industry: 'Financial Technology',
    services: ['web-development', 'digital-systems'],
    summary: 'Project details to be confirmed.',
    description: 'Project details to be confirmed before publishing.',
    featured: false,
    seo: {
      title: 'Avorria Trades — Avorria Work',
      description: 'Project by Avorria. Details to be confirmed.',
    },
  },
]

/** Returns only published projects */
export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.status === 'published')
}

/** Returns only published featured projects */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.status === 'published' && p.featured)
}

/** Returns a single published project by slug */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.status === 'published')
}

/** Returns slugs for all published projects (used in generateStaticParams) */
export function getPublishedProjectSlugs(): string[] {
  return projects.filter((p) => p.status === 'published').map((p) => p.slug)
}
