import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getAllCategories, getFeaturedArticle } from '@/lib/lobby'
import { siteConfig } from '@/content/config/site'
import { generatePageMetadata } from '@/lib/metadata'
import { LobbyHero } from '@/components/lobby/LobbyHero'
import { LobbyCategoryNav } from '@/components/lobby/LobbyCategoryNav'
import { LobbyArticleGrid } from '@/components/lobby/LobbyArticleGrid'
import { LobbyEditorialBreak } from '@/components/lobby/LobbyEditorialBreak'
import { LobbySecondaryFeature } from '@/components/lobby/LobbySecondaryFeature'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HorizontalContentRail } from '@/components/ui/HorizontalContentRail'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { getArticleImageMeta, getArticleDiscipline } from '@/components/lobby/LobbyArticleImage'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'The Lobby — Digital Architecture, Search Systems & Technical Intelligence',
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

  // 1. Primary asymmetric feature section: 3 articles (1 lead + 2 stacked)
  const primaryAsymmetricArticles = remaining.slice(0, 3)

  // 2. Curated Technical Guides: 4 deep-dive architectural teardowns
  const guideSlugs = [
    'when-to-rebuild-your-website',
    'protect-organic-traffic-website-migration',
    'applied-ai-without-hallucination',
    'nextjs-vs-wordpress-engineering-comparison',
    'bespoke-web-application-when-to-build',
    'core-web-vitals-ranking-reality',
  ]
  const technicalGuides = remaining.filter((a) => guideSlugs.includes(a.slug)).slice(0, 4)

  // 3. Secondary featured story
  const secondaryFeatured =
    remaining.find((a) => a.slug === 'the-end-of-the-agency-retainer') ||
    remaining.find((a) => a.slug === 'monolithic-cms-technical-debt') ||
    remaining[3] ||
    null

  // 4. Archive pool (all other articles not in primary asymmetric stage or secondary featured)
  const excludeSlugs = new Set([
    featured?.slug,
    secondaryFeatured?.slug,
    ...primaryAsymmetricArticles.map((a) => a.slug),
  ])
  const archiveArticles = remaining.filter((a) => !excludeSlugs.has(a.slug))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The Lobby — Avorria',
    description:
      'Editorial intelligence on digital systems, website architecture, search visibility, and emerging technology from Avorria.',
    url: `${siteConfig.url}/lobby`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasPart: articles.slice(0, 10).map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: `${siteConfig.url}/lobby/${a.slug}`,
      datePublished: a.publishedAt,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── 01. Lead Story Monumental Hero Plate ─────────────────────────────── */}
      <LobbyHero article={featured} />

      {/* ── 02. Sticky Publication Section Navigation ────────────────────────── */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md px-6 md:px-10 lg:px-[7vw] border-b border-[var(--color-border)]">
        <LobbyCategoryNav categories={categories} activeSlug="all" />
      </div>

      {/* ── 03. Chapter: Stone — Asymmetric Modular Feature Grid (Red Bull pattern) ─ */}
      {primaryAsymmetricArticles.length > 0 && (
        <section
          data-chapter="stone"
          style={{ backgroundColor: 'var(--color-stone)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24"
        >
          <LobbyArticleGrid
            articles={primaryAsymmetricArticles}
            title="Latest Intelligence"
            eyebrow="01 // LATEST INTELLIGENCE"
            variant="asymmetric"
          />
        </section>
      )}

      {/* ── 04. Chapter: Ivory — Technical Guides & Architecture Rail ────────── */}
      {technicalGuides.length > 0 && (
        <section
          data-chapter="ivory"
          style={{ backgroundColor: 'var(--color-ivory)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24 border-t border-[var(--color-border)]"
        >
          <SectionHeading
            number="02"
            eyebrow="ENGINEERING GUIDES & TEARDOWNS"
            accentEyebrow="rose"
            title="Technical frameworks"
            italicAccent="before you build."
            description="Diagnostic roadmaps, architectural comparisons, and migration playbooks authored from real production systems."
          />

          <HorizontalContentRail label="Technical guides rail" gap="md">
            {technicalGuides.map((guide) => {
              const imgMeta = getArticleImageMeta(guide)
              const discipline = getArticleDiscipline(guide)
              return (
                <div key={guide.slug} className="w-[300px] sm:w-[340px] md:w-[380px] shrink-0">
                  <EditorialCard
                    href={`/lobby/${guide.slug}`}
                    title={guide.title}
                    excerpt={guide.excerpt ?? guide.dek}
                    category={`${discipline.label} · ${guide.categoryName || guide.categoryLabel || guide.category}`}
                    categoryHref={`/lobby/category/${guide.categorySlug || guide.category || 'all'}`}
                    readTime={guide.readingTimeMinutes ?? guide.readTimeMinutes ?? 5}
                    date={
                      guide.publishedAt
                        ? new Date(guide.publishedAt).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          }).toUpperCase()
                        : undefined
                    }
                    image={imgMeta.src}
                    imageAlt={guide.title}
                    metric={discipline.badgeText}
                    size="standard"
                  />
                </div>
              )
            })}
          </HorizontalContentRail>
        </section>
      )}

      {/* ── 05. Chapter: Petrol — Full-Width Architectural Perspective ───────── */}
      <LobbyEditorialBreak />

      {/* ── 06. Chapter: Ivory — Secondary Editorial Feature ─────────────────── */}
      {secondaryFeatured && (
        <section
          data-chapter="ivory"
          style={{ backgroundColor: 'var(--color-ivory)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24 border-t border-[var(--color-border)]"
        >
          <LobbySecondaryFeature article={secondaryFeatured} />
        </section>
      )}

      {/* ── 07. Chapter: Stone — Comprehensive Dispatches Archive ────────────── */}
      {archiveArticles.length > 0 && (
        <section
          data-chapter="stone"
          style={{ backgroundColor: 'var(--color-stone)' }}
          className="w-full px-6 md:px-10 lg:px-[7vw] py-16 md:py-24 border-t border-[var(--color-border)]"
        >
          <LobbyArticleGrid
            articles={archiveArticles}
            title="Forensic Archive & Strategy"
            eyebrow="03 // FORENSIC RESEARCH ARCHIVE"
            variant="standard"
          />
        </section>
      )}

      {/* ── 08. Chapter: Wine — Commercial Conversion Banner ─────────────────── */}
      <CtaBanner
        eyebrow="COMMISSIONS OPEN // THE LOBBY"
        headline="Have something"
        italicAccent="worth building?"
        description="We collaborate directly with senior leaders on high-performance digital flagships, technical search architecture, and autonomous AI systems. No account managers."
        primaryCta={{ label: 'Start a Project', href: '/start-a-project' }}
        secondaryCta={{ label: 'Commission a Pre-Build Audit', href: '/digital-audit' }}
        theme="wine"
        watermark="LOBBY"
      />
    </>
  )
}
