import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getAuthors, getPublishedArticles } from '@/lib/lobby'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'

export const revalidate = 3600

const INDEX_THRESHOLD = 3

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return generatePageMetadata({
      title: 'Author Not Found — The Lobby',
      description: 'The requested author profile could not be found.',
      path: '/lobby',
    })
  }

  const allArticles = await getPublishedArticles()
  const authorArticles = allArticles.filter((a) => {
    if (typeof a.author === 'object' && 'slug' in a.author && a.author.slug === author.slug) return true
    if (a.leadAuthor?.name.toLowerCase().includes(author.name.toLowerCase())) return true
    return false
  })

  return {
    ...generatePageMetadata({
      title: `${author.name} — The Lobby — Avorria`,
      description: author.bio,
      path: `/lobby/author/${author.slug}`,
    }),
    robots: {
      index: authorArticles.length >= INDEX_THRESHOLD,
      follow: true,
    },
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function LobbyAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const allArticles = await getPublishedArticles()
  const authorArticles = allArticles.filter((a) => {
    if (typeof a.author === 'object' && 'slug' in a.author && a.author.slug === author.slug) return true
    if (a.leadAuthor?.name.toLowerCase().includes(author.name.toLowerCase())) return true
    return false
  })

  // Schema.org Person schema for real team authors only
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${siteConfig.url}/lobby/author/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
    },
    ...(author.socialLinks?.linkedin && { sameAs: [author.socialLinks.linkedin] }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

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
                {author.name}
              </li>
            </ol>
          </nav>

          {/* ── Author Header ───────────────────────────────────────────── */}
          <header className="border-b border-[var(--color-border)] pb-10 mb-12 max-w-[720px]">
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
              Editorial Contributor
            </p>
            <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.05] mb-3">
              {author.name}
            </h1>
            <p className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] mb-6">
              {author.role}
            </p>
            {author.bio && (
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                {author.bio}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] pt-4 border-t border-[var(--color-border)]">
              <span>{authorArticles.length} {authorArticles.length === 1 ? 'dispatch' : 'dispatches'}</span>
              {author.socialLinks?.linkedin && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-graphite)] transition-colors duration-200"
                  >
                    LinkedIn ↗
                  </a>
                </>
              )}
            </div>
          </header>

          {/* ── Author Articles ─────────────────────────────────────────── */}
          {authorArticles.length > 0 ? (
            <section aria-labelledby="author-articles-heading">
              <p id="author-articles-heading" className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-6">
                Dispatches by {author.name}
              </p>
              <ul role="list">
                {authorArticles.map((article) => (
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
                No dispatches published yet
              </p>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[360px] mx-auto leading-relaxed mb-6">
                Editorial dispatches authored by {author.name} will appear here once published.
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
    </>
  )
}
