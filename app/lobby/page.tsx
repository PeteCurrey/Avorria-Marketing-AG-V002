import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getAllCategories, getFeaturedArticle } from '@/lib/lobby'
import { siteConfig } from '@/content/config/site'
import { generatePageMetadata } from '@/lib/metadata'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'The Lobby — What changed. What matters. What you should do about it.',
  description:
    'Editorial intelligence for small businesses: Google, Meta, websites, marketing, and growth — from Avorria as the knowledgeable operator.',
  path: '/lobby',
})

const CONTENT_TYPE_LABELS: Record<string, string> = {
  ARTICLE:      'Article',
  GUIDE:        'Guide',
  NEWS_UPDATE:  'News',
  RESOURCE:     'Resource',
  ANNOUNCEMENT: 'Announcement',
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function LobbyIndexPage() {
  const [articles, categories, featured] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getFeaturedArticle(),
  ])

  const secondaryArticles = featured
    ? articles.filter((a) => a.id !== featured.id).slice(0, 12)
    : articles.slice(0, 12)

  // Group by category for section rows
  const byCategory = categories.map((cat) => ({
    category: cat,
    articles: secondaryArticles.filter(
      (a) => a.category === cat.slug || a.categorySlug === cat.slug
    ).slice(0, 3),
  })).filter((g) => g.articles.length > 0)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The Lobby — Avorria',
    description: 'Editorial intelligence for small businesses from Avorria.',
    url: `${siteConfig.url}/lobby`,
    publisher: { '@type': 'Organization', name: 'Avorria', url: siteConfig.url },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-24">
        <div className="container-max container-content">

          {/* ── Masthead ─────────────────────────────────────────────────── */}
          <header className="border-b border-[var(--color-border)] pb-10 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  Editorial Intelligence — Avorria
                </p>
                <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.05]">
                  The Lobby
                </h1>
                <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] mt-3 max-w-[480px] leading-relaxed">
                  What changed. What matters. What you should do about it.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/lobby/search"
                  className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-mid)] border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                  aria-label="Search The Lobby"
                >
                  Search
                </Link>
                <Link
                  href="/lobby/rss.xml"
                  className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-mid)] border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                  aria-label="RSS feed for The Lobby"
                >
                  RSS
                </Link>
              </div>
            </div>

            {/* Category ticker */}
            <nav aria-label="Lobby categories" className="overflow-x-auto">
              <ul className="flex gap-0 min-w-max">
                <li>
                  <Link
                    href="/lobby"
                    className="block px-4 py-2 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite)] border-b-2 border-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    All
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/lobby/category/${cat.slug}`}
                      className="block px-4 py-2 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-mid)] border-b-2 border-transparent hover:text-[var(--color-graphite)] hover:border-[var(--color-border)] transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          {/* ── Featured Story ───────────────────────────────────────────── */}
          {featured ? (
            <section aria-labelledby="featured-heading" className="mb-16 pb-16 border-b border-[var(--color-border)]">
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">
                Featured
              </p>
              <Link
                href={`/lobby/${featured.slug}`}
                className="group block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
                  <div>
                    <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-3">
                      {featured.categoryName ?? featured.categoryLabel ?? featured.category}
                      {featured.contentType && ` · ${CONTENT_TYPE_LABELS[featured.contentType]}`}
                    </p>
                    <h2
                      id="featured-heading"
                      className="text-[2rem] sm:text-[2.5rem] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.1] group-hover:text-[var(--color-accent)] transition-colors duration-200 max-w-[720px] mb-4"
                    >
                      {featured.title}
                    </h2>
                    <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[560px] leading-relaxed mb-4">
                      {featured.excerpt ?? featured.dek}
                    </p>
                    <div className="flex items-center gap-4 text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                      <span>{fmt(featured.publishedAt)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featured.readingTimeMinutes ?? featured.readTimeMinutes ?? 5} min read</span>
                    </div>
                  </div>
                  <span
                    className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-200 text-xl hidden lg:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            </section>
          ) : null}

          {/* ── Latest Dispatches ────────────────────────────────────────── */}
          {secondaryArticles.length > 0 ? (
            <section aria-labelledby="latest-heading" className="mb-16">
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-6" id="latest-heading">
                Latest
              </p>
              <ul role="list">
                {secondaryArticles.map((article) => (
                  <li key={article.slug} className="border-t border-[var(--color-border)]">
                    <Link
                      href={`/lobby/${article.slug}`}
                      className="group flex items-center justify-between gap-8 py-4 hover:border-[var(--color-border-strong)] transition-colors duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 min-w-0">
                        <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] shrink-0 w-28 hidden sm:block">
                          {article.categoryName ?? article.category}
                        </p>
                        <h3 className="text-[var(--text-small)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-200 truncate">
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] hidden md:block">
                          {fmt(article.publishedAt)}
                        </span>
                        <span
                          className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-[var(--color-border)]" aria-hidden="true" />
              </ul>
            </section>
          ) : (
            <section className="mb-16 py-16 border-t border-[var(--color-border)] text-center">
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                No dispatches yet
              </p>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[360px] mx-auto leading-relaxed">
                The Lobby is being built. Editorial intelligence on Google, Meta, websites, and marketing will appear here.
              </p>
            </section>
          )}

          {/* ── Category Section Rows ────────────────────────────────────── */}
          {byCategory.map(({ category, articles: catArticles }) => (
            <section key={category.slug} aria-labelledby={`cat-${category.slug}`} className="mb-12 pb-12 border-b border-[var(--color-border)] last:border-0 last:pb-0">
              <div className="flex items-baseline justify-between mb-5">
                <p id={`cat-${category.slug}`} className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)]">
                  {category.name}
                </p>
                <Link
                  href={`/lobby/category/${category.slug}`}
                  className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] hover:underline underline-offset-4 transition-colors duration-200"
                >
                  All {category.name} →
                </Link>
              </div>
              <ul role="list">
                {catArticles.map((a) => (
                  <li key={a.slug} className="border-t border-[var(--color-border)]">
                    <Link
                      href={`/lobby/${a.slug}`}
                      className="group flex items-center justify-between gap-6 py-4"
                    >
                      <h3 className="text-[var(--text-small)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                        {a.title}
                      </h3>
                      <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] shrink-0 hidden sm:block">
                        {a.readingTimeMinutes ?? a.readTimeMinutes ?? 5} min
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-[var(--color-border)]" aria-hidden="true" />
              </ul>
            </section>
          ))}

          {/* ── Quiet CTA ────────────────────────────────────────────────── */}
          <div className="mt-20 pt-12 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                Working with Avorria
              </p>
              <h2 className="text-[var(--text-heading)] font-[200] text-[var(--color-graphite)] mb-4 max-w-[360px]">
                Have something worth building?
              </h2>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[360px]">
                We work with small businesses and growing firms on websites, digital infrastructure, and marketing systems.
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/start-a-project"
                className="text-[var(--text-small)] font-light text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
              >
                Start a project ↗
              </Link>
              <Link
                href="/services"
                className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] border-b border-[var(--color-border)] pb-0.5 hover:text-[var(--color-graphite)] transition-colors duration-200"
              >
                Our services →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
