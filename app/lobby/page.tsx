import type { Metadata } from 'next'
import { getAllArticles, getAllCategories, getFeaturedArticle } from '@/lib/lobby'
import { siteConfig } from '@/content/config/site'
import { generatePageMetadata } from '@/lib/metadata'
import { LobbyHero } from '@/components/lobby/LobbyHero'
import { LobbyCategoryNav } from '@/components/lobby/LobbyCategoryNav'
import { LobbyArticleGrid } from '@/components/lobby/LobbyArticleGrid'
import { LobbyEditorialBreak } from '@/components/lobby/LobbyEditorialBreak'
import { LobbySecondaryFeature } from '@/components/lobby/LobbySecondaryFeature'
import { LobbyCta } from '@/components/lobby/LobbyCta'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'The Lobby — What changed. What matters. What you should do about it.',
  description:
    'Editorial intelligence on digital systems, website architecture, search visibility, and emerging technology from Avorria.',
  path: '/lobby',
})

export default async function LobbyIndexPage() {
  const [articles, categories, featuredArticle] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getFeaturedArticle(),
  ])

  // Determine main featured article for the cinematic hero plate
  const featured =
    featuredArticle ||
    articles.find((a) => a.slug === 'websites-we-would-fire') ||
    articles[0]

  // Filter out featured article from remaining pool
  const remaining = articles.filter((a) => a.slug !== featured?.slug)

  // 1. Primary grid: 3 articles
  const primaryGridArticles = remaining.slice(0, 3)

  // 2. Secondary featured story
  const secondaryFeatured =
    remaining.find((a) => a.slug === 'the-end-of-the-agency-retainer') ||
    remaining[3] ||
    null

  // 3. Further articles after secondary feature
  const remainingAfterSecondary = remaining.filter(
    (a) => a.slug !== secondaryFeatured?.slug && !primaryGridArticles.some((p) => p.slug === a.slug)
  )

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The Lobby — Avorria',
    description: 'Editorial intelligence on digital systems, website architecture, search visibility, and emerging technology from Avorria.',
    url: `${siteConfig.url}/lobby`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── 1. Featured Story Hero: Large art-directed plate with title overlaid ── */}
      <LobbyHero article={featured} />

      {/* Sticky Publication Category Nav */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md px-6 md:px-10 lg:px-[7vw] border-b border-[var(--color-border)]">
        <LobbyCategoryNav categories={categories} activeSlug="all" />
      </div>

      {/* ── Alternating Chapter Flow ────────────────────────────────────────── */}

      {/* Chapter: Stone — Primary 3-Column Article Grid */}
      {primaryGridArticles.length > 0 && (
        <section
          data-chapter="stone"
          style={{ backgroundColor: 'var(--color-stone)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24"
        >
          <LobbyArticleGrid
            articles={primaryGridArticles}
            title="Latest Intelligence"
            eyebrow="LATEST INTELLIGENCE"
          />
        </section>
      )}

      {/* Chapter: Petrol — Full-Width Visual Break */}
      <LobbyEditorialBreak />

      {/* Chapter: Ivory — Secondary Editorial Feature */}
      {secondaryFeatured && (
        <section
          data-chapter="ivory"
          style={{ backgroundColor: 'var(--color-ivory)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24"
        >
          <LobbySecondaryFeature article={secondaryFeatured} />
        </section>
      )}

      {/* Chapter: Stone — Additional Archive Grid */}
      {remainingAfterSecondary.length > 0 && (
        <section
          data-chapter="stone"
          style={{ backgroundColor: 'var(--color-stone)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24 border-t border-[var(--color-border)]"
        >
          <LobbyArticleGrid
            articles={remainingAfterSecondary}
            title="Forensic Archive & Strategy"
            eyebrow="RESEARCH ARCHIVE"
          />
        </section>
      )}

      {/* Chapter: Wine — Commercial Conversion CTA */}
      <LobbyCta />
    </>
  )
}
