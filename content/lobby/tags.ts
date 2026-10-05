/**
 * content/lobby/tags.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Canonical topic tags for The Lobby secondary taxonomy.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { LobbyTag } from '@/types/lobby'

export const LOBBY_TAGS: LobbyTag[] = [
  {
    id: 'tag-core-web-vitals',
    name: 'Core Web Vitals',
    slug: 'core-web-vitals',
    description: 'Technical audits and engineering strategies for Google INP, LCP, and CLS performance metrics.',
    isActive: true,
  },
  {
    id: 'tag-google-algorithm',
    name: 'Google Algorithm',
    slug: 'google-algorithm',
    description: 'Analysis of search engine ranking updates, helpful content systems, and crawl efficiency.',
    isActive: true,
  },
  {
    id: 'tag-meta-advantage-plus',
    name: 'Meta Advantage+',
    slug: 'meta-advantage-plus',
    description: 'Algorithmic auction shifts, automated bidding realities, and creative infrastructure.',
    isActive: true,
  },
  {
    id: 'tag-headless-cms',
    name: 'Headless CMS',
    slug: 'headless-cms',
    description: 'Architectural comparisons of decoupled content systems versus legacy monolithic platforms.',
    isActive: true,
  },
  {
    id: 'tag-conversion-architecture',
    name: 'Conversion Architecture',
    slug: 'conversion-architecture',
    description: 'Information hierarchy, checkout friction elimination, and deterministic conversion funnels.',
    isActive: true,
  },
  {
    id: 'tag-ai-automation',
    name: 'Applied AI & Automation',
    slug: 'ai-automation',
    description: 'Deterministic agent pipelines, LLM operational workflows, and software integration.',
    isActive: true,
  },
  {
    id: 'tag-ux-friction',
    name: 'UX Friction',
    slug: 'ux-friction',
    description: 'Observable usability breakdowns, mobile navigation defects, and cognitive friction teardowns.',
    isActive: true,
  },
  {
    id: 'tag-technical-seo',
    name: 'Technical SEO',
    slug: 'technical-seo',
    description: 'Rendering pipelines, schema validation, indexation hygiene, and canonical structure.',
    isActive: true,
  },
  {
    id: 'tag-website-migration',
    name: 'Website Migration',
    slug: 'website-migration',
    description: 'Technical and SEO considerations when migrating or rebuilding a website without losing organic traffic.',
    isActive: true,
  },
  {
    id: 'tag-ai-agents',
    name: 'AI Agents',
    slug: 'ai-agents',
    description: 'Autonomous AI agent architectures, multi-step reasoning pipelines, and practical deployment patterns.',
    isActive: true,
  },
  {
    id: 'tag-ai-implementation',
    name: 'AI Implementation',
    slug: 'ai-implementation',
    description: 'Integrating AI capabilities into existing business systems, workflows, and software products.',
    isActive: true,
  },
  {
    id: 'tag-nextjs-development',
    name: 'Next.js Development',
    slug: 'nextjs-development',
    description: 'Server components, App Router architecture, edge rendering, and Next.js engineering patterns.',
    isActive: true,
  },
  {
    id: 'tag-web-application-development',
    name: 'Web Application Development',
    slug: 'web-application-development',
    description: 'Bespoke web application architecture, SaaS engineering, and custom platform development.',
    isActive: true,
  },
  {
    id: 'tag-seo-migration',
    name: 'SEO Migration',
    slug: 'seo-migration',
    description: 'Preserving and improving search rankings during URL restructuring, domain moves, and stack changes.',
    isActive: true,
  },
  {
    id: 'tag-website-redesign',
    name: 'Website Redesign',
    slug: 'website-redesign',
    description: 'When to rebuild versus redesign, commercial case evaluation, and stakeholder considerations.',
    isActive: true,
  },
]

export function getTagBySlug(slug: string): LobbyTag | undefined {
  return LOBBY_TAGS.find((t) => t.slug === slug && t.isActive)
}

export function getAllTags(): LobbyTag[] {
  return LOBBY_TAGS.filter((t) => t.isActive)
}
