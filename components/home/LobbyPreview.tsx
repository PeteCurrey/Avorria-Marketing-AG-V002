import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { Button } from '@/components/ui/Button'
import { getAllArticles } from '@/lib/lobby'

/**
 * LobbyPreview — Phase 3 Flagship Editorial Content Discovery (Red Bull Pattern)
 *
 * Replaces the old text-list format with a media-rich 3-card magazine grid:
 * - 1 Primary feature card (16:9 / 21:9 visual dominance)
 * - 2 High-density secondary cards
 * - Real articles with direct read-time, category links, and contrast scrims
 */
export async function LobbyPreview() {
  const articles = await getAllArticles()
  
  // Select top 3 articles
  const leadArticle = articles[0]
  const secondaryArticles = articles.slice(1, 3)

  if (!leadArticle) return null

  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] overflow-hidden"
      style={{ backgroundColor: 'var(--color-stone)' }}
      data-chapter="stone"
      aria-labelledby="lobby-heading"
    >
      {/* ── Background Architectural Numeral ── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-ivory)] opacity-40 leading-none"
        aria-hidden="true"
      >
        07
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Heading Component */}
        <SectionHeading
          number="07"
          eyebrow="THE LOBBY · EDITORIAL INTELLIGENCE"
          accentEyebrow="rose"
          title="What changed."
          italicAccent="What matters."
          description="Critical dispatches on search algorithms, platform changes, and digital infrastructure for ambitious operators."
          action={
            <Button
              as="link"
              href="/lobby"
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex bg-white/70"
            >
              Enter The Lobby ↗
            </Button>
          }
        />

        {/* ── Red Bull Editorial Discovery Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Main Lead Story (7 cols) */}
          <div className="lg:col-span-7">
            <EditorialCard
              size="feature"
              href={`/lobby/${leadArticle.slug}`}
              title={leadArticle.title}
              excerpt={leadArticle.excerpt ?? leadArticle.dek}
              category={leadArticle.categoryName ?? leadArticle.categoryLabel ?? leadArticle.category ?? 'INTELLIGENCE'}
              categoryHref={`/lobby/category/${leadArticle.categorySlug ?? leadArticle.category ?? 'all'}`}
              readTime={leadArticle.readingTimeMinutes ?? leadArticle.readTimeMinutes ?? 5}
              date={leadArticle.publishedAt ? new Date(leadArticle.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase() : undefined}
              image={leadArticle.heroMedia?.url ?? '/images/cinematic/work-drawdown.jpg'}
              imageAlt={leadArticle.title}
              metric="LEAD STORY"
            />
          </div>

          {/* Secondary 2-Up Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryArticles.map((article, idx) => (
              <EditorialCard
                key={article.slug}
                size="standard"
                href={`/lobby/${article.slug}`}
                title={article.title}
                category={article.categoryName ?? article.categoryLabel ?? article.category ?? 'INTELLIGENCE'}
                categoryHref={`/lobby/category/${article.categorySlug ?? article.category ?? 'all'}`}
                readTime={article.readingTimeMinutes ?? article.readTimeMinutes ?? 4}
                image={
                  article.heroMedia?.url ??
                  (idx === 0
                    ? '/images/cinematic/work-careeros.jpg'
                    : '/images/cinematic/discipline-strategy.jpg')
                }
                imageAlt={article.title}
                revealDelay={idx * 100}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden text-center">
          <Button as="link" href="/lobby" variant="secondary" size="md" className="w-full justify-center bg-white/70">
            Enter The Lobby ↗
          </Button>
        </div>
      </div>
    </section>
  )
}
