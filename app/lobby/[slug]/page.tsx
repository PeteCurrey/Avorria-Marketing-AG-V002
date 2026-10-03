import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/lib/lobby'
import { LobbyBlockRenderer, extractToc } from '@/components/lobby/LobbyBlockRenderer'
import { LobbyProvenanceBadge } from '@/components/lobby/LobbyProvenanceBadge'
import { LobbySourceCitations } from '@/components/lobby/LobbySourceCitations'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'

export const revalidate = 3600

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) {
    return generatePageMetadata({
      title: 'Article Not Found — The Lobby',
      description: 'The requested dispatch could not be found.',
      path: '/lobby',
    })
  }
  const excerpt = article.excerpt ?? article.dek ?? ''
  return {
    ...generatePageMetadata({
      title: `${article.seo?.title ?? article.title} — The Lobby — Avorria`,
      description: article.seo?.description ?? excerpt,
      path: `/lobby/${article.slug}`,
    }),
    robots: {
      index: !article.seo?.noIndex,
      follow: !article.seo?.noFollow,
    },
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const PROV_LABELS: Record<string, string> = {
  VERIFIED:           'Empirically Verified',
  SOURCE_LINKED:      'Source-linked',
  EDITORIAL_ANALYSIS: 'Editorial Analysis',
  OPINION:            'Opinion',
  DRAFT:              'Draft',
}

export default async function LobbyArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const categorySlug  = article.categorySlug ?? article.category ?? 'marketing'
  const categoryName  = article.categoryName ?? article.categoryLabel ?? 'Intelligence'
  const authorName    =
    typeof article.author === 'object' && 'name' in article.author
      ? article.author.name
      : article.leadAuthor?.name ?? 'Avorria Editorial Desk'
  const authorRole    =
    typeof article.author === 'object' && 'role' in article.author
      ? article.author.role
      : article.leadAuthor?.role ?? 'Editorial Intelligence'
  const authorSlug    =
    typeof article.author === 'object' && 'slug' in article.author && article.author.slug
      ? article.author.slug
      : 'editorial-desk'
  const provState     =
    typeof article.provenance === 'object' && 'state' in article.provenance
      ? article.provenance.state
      : article.editorialStatus ?? 'EDITORIAL_ANALYSIS'
  const provRationale =
    typeof article.provenance === 'object' && 'rationale' in article.provenance
      ? article.provenance.rationale
      : article.provenanceRationale ?? ''
  const sources       = article.sources ?? article.sourceReferences ?? []
  const readTime      = article.readingTimeMinutes ?? article.readTimeMinutes ?? 5
  const excerpt       = article.excerpt ?? article.dek ?? ''

  // Table of Contents (≥3 headings)
  const toc = extractToc(article.blocks, article.sections)
  const showToc = toc.length >= 3

  const related = await getRelatedArticles(article.slug, categorySlug, 2)

  const base = siteConfig.url
  const schemaType = article.schemaType ?? 'Article'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: article.title,
    description: excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avorria',
      url: base,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${base}/lobby/${article.slug}` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: base },
      { '@type': 'ListItem', position: 2, name: 'The Lobby',  item: `${base}/lobby` },
      { '@type': 'ListItem', position: 3, name: categoryName, item: `${base}/lobby/category/${categorySlug}` },
      { '@type': 'ListItem', position: 4, name: article.title, item: `${base}/lobby/${article.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-24">
        <div className="container-max container-content">

          {/* ── Breadcrumb ──────────────────────────────────────────────── */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
              <li><Link href="/lobby" className="hover:text-[var(--color-graphite)] transition-colors duration-200">The Lobby</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href={`/lobby/category/${categorySlug}`} className="hover:text-[var(--color-graphite)] transition-colors duration-200">{categoryName}</Link></li>
              <li aria-hidden="true">·</li>
              <li className="text-[var(--color-graphite)] truncate max-w-[200px]" aria-current="page">{article.title}</li>
            </ol>
          </nav>

          {/* ── Article Header ───────────────────────────────────────────── */}
          <header className="border-b border-[var(--color-border)] pb-10 mb-10 max-w-[800px]">
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                {categoryName}
              </p>
              {article.contentType && (
                <>
                  <span className="text-[var(--color-border-strong)]" aria-hidden="true">·</span>
                  <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                    {article.contentType.replace('_', ' ')}
                  </p>
                </>
              )}
            </div>

            <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.08] mb-5">
              {article.title}
            </h1>

            {excerpt && (
              <p className="text-[1.0625rem] font-light text-[var(--color-graphite-mid)] leading-[1.7] max-w-[620px] mb-6">
                {excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
              <span>
                <Link href={`/lobby/author/${authorSlug}`} className="hover:text-[var(--color-graphite)] transition-colors duration-200">
                  {authorName}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>{fmt(article.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readTime} min read</span>
            </div>
          </header>

          {/* ── Body grid: article + aside ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

            {/* Main reading column */}
            <main className="min-w-0">
              {/* Provenance badge */}
              {provState && (
                <div className="mb-8 flex items-center gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                  <p className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
                    {PROV_LABELS[provState] ?? provState}
                    {provRationale && ` — ${provRationale}`}
                  </p>
                </div>
              )}

              {/* Article body */}
              <LobbyBlockRenderer blocks={article.blocks} sections={article.sections} />

              {/* Source Citations */}
              {sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                  <LobbySourceCitations sources={sources} />
                </div>
              )}

              {/* Related items */}
              {related.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-14 pt-10 border-t border-[var(--color-border)]">
                  <p id="related-heading" className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-5">
                    Related
                  </p>
                  <ul role="list">
                    {related.map((item) => (
                      <li key={item.slug} className="border-t border-[var(--color-border)]">
                        <Link
                          href={`/lobby/${item.slug}`}
                          className="group flex items-center justify-between gap-6 py-4"
                        >
                          <h3 className="text-[var(--text-small)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                            {item.title}
                          </h3>
                          <span className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-200 shrink-0" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-[var(--color-border)]" aria-hidden="true" />
                  </ul>
                </section>
              )}

              {/* End-of-article CTA */}
              <div className="mt-14 pt-10 border-t border-[var(--color-border)]">
                <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  Working with Avorria
                </p>
                <h2 className="text-[var(--text-heading)] font-[200] text-[var(--color-graphite)] mb-3">
                  Have something worth building?
                </h2>
                <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] mb-6 leading-relaxed max-w-[400px]">
                  We work with small businesses on websites, marketing systems, and digital infrastructure.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/start-a-project"
                    className="text-[var(--text-small)] font-light text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
                  >
                    Start a project ↗
                  </Link>
                  <Link
                    href="/lobby"
                    className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                  >
                    ← Back to The Lobby
                  </Link>
                </div>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="space-y-8 lg:pt-1" aria-label="Article sidebar">

              {/* Table of Contents */}
              {showToc && (
                <nav aria-label="Table of contents">
                  <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-4">
                    Contents
                  </p>
                  <ul className="space-y-2 border-l border-[var(--color-border)] pl-4">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block text-[var(--text-small)] font-light leading-relaxed hover:text-[var(--color-accent)] transition-colors duration-200 ${
                            item.level === 3 ? 'pl-3 text-[var(--color-graphite-muted)]' : 'text-[var(--color-graphite-mid)]'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Article metadata */}
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  Author
                </p>
                <Link
                  href={`/lobby/author/${authorSlug}`}
                  className="text-[var(--text-small)] font-light text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-200 block mb-1"
                >
                  {authorName}
                </Link>
                <p className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)] leading-relaxed">
                  {authorRole}
                </p>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="border-t border-[var(--color-border)] pt-6">
                  <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/lobby/tag/${tag.slug}`}
                        className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-2 py-1 hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiet service CTA */}
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  Get help with this
                </p>
                <Link
                  href="/audit"
                  className="text-[var(--text-small)] font-light text-[var(--color-graphite)] hover:text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] transition-colors duration-200 block mb-2"
                >
                  Free website health check
                </Link>
                <Link
                  href="/start-a-project"
                  className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-200 block"
                >
                  Start a project →
                </Link>
              </div>

            </aside>
          </div>

        </div>
      </div>
    </>
  )
}
