import type { Metadata } from 'next'
import { getAllArticles, getAllCategories, getFeaturedArticle } from '@/lib/lobby'
import { siteConfig } from '@/content/config/site'
import { generatePageMetadata } from '@/lib/metadata'
import { LobbyHero } from '@/components/lobby/LobbyHero'
import { LobbyCategoryNav } from '@/components/lobby/LobbyCategoryNav'
import { LobbyFeaturedStory } from '@/components/lobby/LobbyFeaturedStory'
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

  // Determine main featured article
  const featured =
    featuredArticle ||
    articles.find((a) => a.slug === 'websites-we-would-fire') ||
    articles[0]

  // Filter out featured article from pool
  const remaining = articles.filter((a) => a.slug !== featured?.slug)

  // 1. First 3 articles for the initial 3-column editorial grid
  const primaryGridArticles = remaining.slice(0, 3)

  // 2. Secondary featured story (reverse layout: text left, image right)
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
    publisher: { '@type': 'Organization', name: 'Avorria', url: siteConfig.url },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── 1. Full-Screen Editorial Hero (100svh) ───────────────────────── */}
      <LobbyHero />

      {/* ── Publication Body Flow ────────────────────────────────────────── */}
      <div className="min-h-screen bg-[var(--color-ivory)] pb-24">
        
        {/* Sticky Publication Category Nav */}
        <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md px-6 md:px-10 lg:px-[7vw]">
          <LobbyCategoryNav categories={categories} activeSlug="all" />
        </div>

        {/* Content Stream with Architectural Rhythm */}
        <div className="w-full px-6 md:px-10 lg:px-[7vw] pt-12 md:pt-16 lg:pt-20 space-y-16 sm:space-y-24 lg:space-y-32">
          
          {/* ── 2. Primary Featured Story (Image Left / Text Right) ────────── */}
          {featured && (
            <LobbyFeaturedStory article={featured} />
          )}

          {/* ── 3. Latest Articles (3-Column Editorial Grid) ───────────────── */}
          {primaryGridArticles.length > 0 && (
            <LobbyArticleGrid
              articles={primaryGridArticles}
              title="Latest Intelligence"
              eyebrow="DISPATCHES // ISSUE 04"
            />
          )}

          {/* ── 4. Full-Width Visual Editorial Break ───────────────────────── */}
          <LobbyEditorialBreak />

          {/* ── 5. Secondary Editorial Feature (Text Left / Image Right) ────── */}
          {secondaryFeatured && (
            <LobbySecondaryFeature article={secondaryFeatured} />
          )}

          {/* ── 6. Additional Archive Grid (if further articles exist) ──────── */}
          {remainingAfterSecondary.length > 0 && (
            <LobbyArticleGrid
              articles={remainingAfterSecondary}
              title="Forensic Archive & Strategy"
              eyebrow="RESEARCH ARCHIVE // MONOGRAPHS"
            />
          )}

          {/* ── 7. Avorria Commercial Transition CTA ───────────────────────── */}
          <LobbyCta />

        </div>
      </div>
    </>
  )
}
