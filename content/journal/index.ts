/**
 * Avorria — Journal Content
 * All articles start as drafts. Set status to 'published' after editorial review.
 */

import type { JournalArticle } from '@/types/content'

export const articles: JournalArticle[] = [
  // Journal will be populated with genuine editorial content.
  // No placeholder or AI-generated articles.
  // Add verified, authored articles here before publishing.
]

/** Returns only published articles, ordered by date descending */
export function getPublishedArticles(): JournalArticle[] {
  return articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

/** Returns a single published article by slug */
export function getArticle(slug: string): JournalArticle | undefined {
  return articles.find((a) => a.slug === slug && a.status === 'published')
}

/** Returns slugs for all published articles (used in generateStaticParams) */
export function getPublishedArticleSlugs(): string[] {
  return articles.filter((a) => a.status === 'published').map((a) => a.slug)
}

/** Returns published articles by category */
export function getArticlesByCategory(category: JournalArticle['category']): JournalArticle[] {
  return articles.filter((a) => a.status === 'published' && a.category === category)
}
