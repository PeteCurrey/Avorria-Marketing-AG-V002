import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTagBySlug, getTags, getPublishedArticles } from '@/lib/lobby'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'

export const revalidate = 3600

// Configurable threshold: tag archives are noindex until >= 3 articles
const INDEX_THRESHOLD = 3

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    return generatePageMetadata({
      title: 'Tag Not Found — The Lobby',
      description: 'The requested topic tag could not be found.',
      path: '/lobby',
    })
  }

  const allArticles = await getPublishedArticles()
  const matchCount = allArticles.filter((a) =>
    a.tags?.some((t) => t.slug === tag.slug) ||
    a.slug.includes(tag.slug)
  ).length

  return {
    ...generatePageMetadata({
      title: `${tag.name} — The Lobby — Avorria`,
      description: tag.description || `Editorial intelligence and analysis tagged under ${tag.name}.`,
      path: `/lobby/tag/${tag.slug}`,
    }),
    robots: {
      index: matchCount >= INDEX_THRESHOLD,
      follow: true,
    },
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function LobbyTagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const allArticles = await getPublishedArticles()
  const matchingArticles = allArticles.filter((article) => {
    const tagSlug = tag.slug.toLowerCase()
    const inTags = article.tags?.some((t) => t.slug === tagSlug)
    const inSlug = article.slug.includes(tagSlug)
    return inTags || inSlug
  })

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-24">
      <div className="container-max container-content">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
            <li>
              <Link href="/lobby" className="hover:text-[var(--color-graphite)] transition-colors duration-200">
                The Lobby
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-[var(--color-graphite)]" aria-current="page">
              #{tag.name}
            </li>
          </ol>
        </nav>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="border-b border-[var(--color-border)] pb-8 mb-10">
          <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
            Topic Tag
          </p>
          <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.05] mb-3">
            #{tag.name}
          </h1>
          {tag.description && (
            <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[560px] leading-relaxed">
              {tag.description}
            </p>
          )}
        </header>

        {/* ── Articles List ─────────────────────────────────────────── */}
        {matchingArticles.length > 0 ? (
          <section aria-labelledby="tag-articles-heading">
            <p id="tag-articles-heading" className="sr-only">
              Articles tagged with {tag.name}
            </p>
            <ul role="list">
              {matchingArticles.map((article) => (
                <li key={article.slug} className="border-t border-[var(--color-border)]">
                  <Link
                    href={`/lobby/${article.slug}`}
                    className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 py-6 hover:border-[var(--color-border-strong)] transition-colors duration-200"
                  >
                    <div className="max-w-[680px]">
                      <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-1">
                        {article.categoryName ?? article.category}
                      </p>
                      <h2 className="text-[var(--text-heading)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-2">
                        {article.title}
                      </h2>
                      <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] line-clamp-2 leading-relaxed">
                        {article.excerpt ?? article.dek}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                      <span>{fmt(article.publishedAt)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} min read</span>
                      <span
                        className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-200"
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
          <div className="py-20 border-t border-[var(--color-border)] text-center">
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
              No matching dispatches
            </p>
            <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[360px] mx-auto leading-relaxed mb-6">
              There are no published articles currently tagged under #{tag.name}.
            </p>
            <Link
              href="/lobby"
              className="text-[var(--text-small)] font-light text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
            >
              ← Return to all dispatches
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
