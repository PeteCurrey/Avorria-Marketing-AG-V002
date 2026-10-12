import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/lib/lobby'
import { LobbyBlockRenderer, extractToc } from '@/components/lobby/LobbyBlockRenderer'
import { LobbySourceCitations } from '@/components/lobby/LobbySourceCitations'
import { CinematicPlate } from '@/components/cinematic/CinematicPlate'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { Button } from '@/components/ui/Button'
import { ReadingProgress } from '@/components/lobby/ReadingProgress'
import { ShareArticlePill } from '@/components/lobby/ShareArticlePill'
import { getArticleImageMeta, getArticleDiscipline } from '@/components/lobby/LobbyArticleImage'
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
  const imgMeta = getArticleImageMeta(article)

  return {
    ...generatePageMetadata({
      title: `${article.seo?.title ?? article.title} — The Lobby — Avorria`,
      description: article.seo?.description ?? excerpt,
      path: `/lobby/${article.slug}`,
      ogImage: imgMeta.src,
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
  VERIFIED: 'Empirically Verified',
  SOURCE_LINKED: 'Source-linked',
  EDITORIAL_ANALYSIS: 'Editorial Analysis',
  OPINION: 'Opinion',
  DRAFT: 'Draft',
}

export default async function LobbyArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const categorySlug = article.categorySlug ?? article.category ?? 'marketing'
  const categoryName = article.categoryName ?? article.categoryLabel ?? 'Intelligence'
  const authorName =
    typeof article.author === 'object' && 'name' in article.author
      ? article.author.name
      : article.leadAuthor?.name ?? 'Peter Currey'
  const authorRole =
    typeof article.author === 'object' && 'role' in article.author
      ? article.author.role
      : article.leadAuthor?.role ?? 'Lead Principal // Avorria Studio'
  const authorSlug =
    typeof article.author === 'object' && 'slug' in article.author && article.author.slug
      ? article.author.slug
      : 'peter-currey'
  const provState =
    typeof article.provenance === 'object' && 'state' in article.provenance
      ? article.provenance.state
      : article.editorialStatus ?? 'EDITORIAL_ANALYSIS'
  const provRationale =
    typeof article.provenance === 'object' && 'rationale' in article.provenance
      ? article.provenance.rationale
      : article.provenanceRationale ?? ''
  const sources = article.sources ?? article.sourceReferences ?? []
  const readTime = article.readingTimeMinutes ?? article.readTimeMinutes ?? 5
  const excerpt = article.excerpt ?? article.dek ?? ''

  const discipline = getArticleDiscipline(article)
  const imageMeta = getArticleImageMeta(article)

  // Table of Contents (≥3 headings)
  const toc = extractToc(article.blocks, article.sections)
  const showToc = toc.length >= 3

  const related = await getRelatedArticles(article.slug, categorySlug, 2)

  const base = siteConfig.url
  const schemaType = article.schemaType ?? 'TechArticle'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: article.title,
    description: excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: imageMeta.src ? `${base}${imageMeta.src}` : undefined,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: siteConfig.name,
      url: base,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${base}/lobby/${article.slug}` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'The Lobby', item: `${base}/lobby` },
      { '@type': 'ListItem', position: 3, name: categoryName, item: `${base}/lobby/category/${categorySlug}` },
      { '@type': 'ListItem', position: 4, name: article.title, item: `${base}/lobby/${article.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <article className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-24">
        {/* ── 01. Breadcrumb Navigation ─────────────────────────────────── */}
        <div className="container-max container-content mb-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
              <li>
                <Link href="/lobby" className="hover:text-[var(--color-graphite)] transition-colors duration-200">
                  The Lobby
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link
                  href={`/lobby/category/${categorySlug}`}
                  className="hover:text-[var(--color-graphite)] transition-colors duration-200"
                >
                  {categoryName}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li className="text-[var(--color-graphite)] truncate max-w-[240px]" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* ── 02. Article Header ────────────────────────────────────────── */}
        <div className="container-max container-content mb-12">
          <header className="max-w-[880px]">
            {/* Discipline & Category Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: discipline.accentColor }}
                aria-hidden="true"
              />
              <span className="text-[0.6875rem] font-light tracking-[0.18em] uppercase text-[var(--color-graphite)]">
                {discipline.badgeText}
              </span>
              <span className="text-[var(--color-border-strong)]" aria-hidden="true">·</span>
              <span className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)]">
                {categoryName}
              </span>
              {article.issueNumber && (
                <>
                  <span className="text-[var(--color-border-strong)]" aria-hidden="true">·</span>
                  <span className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-rose-text)]">
                    {article.issueNumber}
                  </span>
                </>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-extralight tracking-[-0.025em] text-[var(--color-graphite)] leading-[1.05] mb-6">
              {article.title}
            </h1>

            {/* Excerpt / Dek */}
            {excerpt && (
              <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[var(--color-graphite-mid)] leading-[1.65] max-w-[660px] mb-8">
                {excerpt}
              </p>
            )}

            {/* Byline & Share Bar */}
            <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
                <span>
                  By{' '}
                  <Link
                    href={`/lobby/author/${authorSlug}`}
                    className="text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors duration-200"
                  >
                    {authorName}
                  </Link>
                </span>
                <span aria-hidden="true">·</span>
                <span>{fmt(article.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readTime} Min Read</span>
              </div>

              <ShareArticlePill title={article.title} url={`/lobby/${article.slug}`} />
            </div>
          </header>
        </div>

        {/* ── 03. Monumental Featured Media Plate ───────────────────────── */}
        <div className="w-full px-6 md:px-10 lg:px-[7vw] mb-16">
          <CinematicPlate
            src={imageMeta.src}
            alt={imageMeta.alt}
            aspectRatio="21/9"
            priority
            sizes="(min-width: 1024px) 86vw, 100vw"
            annotation={`${discipline.badgeText} // ${categoryName.toUpperCase()}`}
            metadata={`AVORRIA TECHNICAL INTELLIGENCE · ${fmt(article.publishedAt).toUpperCase()}`}
            accentColor={discipline.accentColor}
          />
        </div>

        {/* ── 04. Body Grid: Article Body + Interactive Aside ───────────── */}
        <div className="container-max container-content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
            {/* Main Reading Column */}
            <main className="min-w-0">
              {/* Provenance Badge */}
              {provState && (
                <div className="mb-10 pb-6 border-b border-[var(--color-border)] flex items-center gap-3">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: discipline.accentColor }}
                    aria-hidden="true"
                  />
                  <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                    <span className="text-[var(--color-graphite)]">{PROV_LABELS[provState] ?? provState}</span>
                    {provRationale && ` — ${provRationale}`}
                  </p>
                </div>
              )}

              {/* Article Content Blocks */}
              <div className="prose-editorial">
                <LobbyBlockRenderer blocks={article.blocks} sections={article.sections} />
              </div>

              {/* ── Contextual Discipline Service Bridge ────────────────── */}
              <section
                aria-label="Related studio service"
                className="my-14 p-8 border border-[var(--color-border)] bg-[var(--color-ivory-light)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: discipline.accentColor }}
                    aria-hidden="true"
                  />
                  <span className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)]">
                    AVORRIA CAPABILITY BRIDGE
                  </span>
                </div>
                <h2 className="text-xl font-light text-[var(--color-graphite)] mb-2">
                  {discipline.serviceTitle}
                </h2>
                <p className="text-xs md:text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6 max-w-[56ch]">
                  The principles and diagnostics discussed in this dispatch are deployed under strict TypeScript contracts in our {discipline.label.toLowerCase()} discipline.
                </p>
                <Link
                  href={discipline.serviceUrl}
                  className="inline-flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-rose-text)] hover:border-[var(--color-rose-text)] transition-colors duration-200"
                >
                  <span>{discipline.serviceCta}</span>
                </Link>
              </section>

              {/* Source Citations */}
              {sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                  <LobbySourceCitations sources={sources} />
                </div>
              )}

              {/* ── Related Intelligence Dispatches (Visual Grid) ──────── */}
              {related.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-16 pt-12 border-t border-[var(--color-border)]">
                  <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--color-border)]">
                    <p
                      id="related-heading"
                      className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)]"
                    >
                      RELATED INTELLIGENCE
                    </p>
                    <span className="text-[0.625rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                      {categoryName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {related.map((item) => {
                      const relImg = getArticleImageMeta(item)
                      const relDiscipline = getArticleDiscipline(item)
                      return (
                        <EditorialCard
                          key={item.slug}
                          href={`/lobby/${item.slug}`}
                          title={item.title}
                          category={`${relDiscipline.label} · ${item.categoryName || item.categoryLabel || item.category}`}
                          categoryHref={`/lobby/category/${item.categorySlug || item.category || 'all'}`}
                          readTime={item.readingTimeMinutes ?? item.readTimeMinutes ?? 5}
                          date={
                            item.publishedAt
                              ? new Date(item.publishedAt).toLocaleDateString('en-GB', {
                                  month: 'short',
                                  year: 'numeric',
                                }).toUpperCase()
                              : undefined
                          }
                          image={relImg.src}
                          imageAlt={item.title}
                          metric={relDiscipline.badgeText}
                          size="standard"
                        />
                      )
                    })}
                  </div>
                </section>
              )}

              {/* ── Closing Commercial Commissioning Strip ─────────────── */}
              <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
                <div className="p-8 border border-[var(--color-border)] bg-[var(--color-ivory-light)]">
                  <span className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-rose-text)] block mb-2">
                    COMMERCIAL ENGAGEMENT
                  </span>
                  <h2 className="text-2xl font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    Have a system or platform worth building?
                  </h2>
                  <p className="text-xs md:text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[50ch] mb-6">
                    We partner with operators who value technical precision and software sovereignty. All inquiries are evaluated by senior engineering principals.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button as="link" href="/start-a-project" variant="primary" size="md">
                      Start a Project ↗
                    </Button>
                    <Button as="link" href="/contact" variant="secondary" size="md">
                      Contact Studio
                    </Button>
                  </div>
                </div>
              </div>
            </main>

            {/* ── Aside Column: Table of Contents & Metadata ──────────── */}
            <aside className="space-y-8 lg:sticky lg:top-32" aria-label="Article navigation and metadata">
              {/* Table of Contents */}
              {showToc && (
                <nav aria-label="Table of contents" className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6">
                  <p className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-4">
                    DISPATCH CONTENTS
                  </p>
                  <ul className="space-y-2.5 border-l border-[var(--color-border)] pl-4">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block text-[0.8125rem] font-light leading-snug hover:text-[var(--color-rose-text)] transition-colors duration-200 ${
                            item.level === 3 ? 'pl-3 text-[var(--color-graphite-muted)]' : 'text-[var(--color-graphite)]'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Author Card */}
              <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6">
                <p className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  LEAD AUTHOR
                </p>
                <Link
                  href={`/lobby/author/${authorSlug}`}
                  className="text-base font-light text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors duration-200 block mb-1"
                >
                  {authorName}
                </Link>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  {authorRole}
                </p>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6">
                  <p className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                    INDEX TAXONOMY
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/lobby/tag/${tag.slug}`}
                        className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-mid)] border border-[var(--color-border)] px-2.5 py-1 hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiet Diagnostic Audit Link */}
              <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6">
                <p className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-rose-text)] mb-2">
                  PRE-FLIGHT DIAGNOSTIC
                </p>
                <Link
                  href="/digital-audit"
                  className="text-sm font-light text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] block mb-2"
                >
                  Commission a Project Audit ↗
                </Link>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  Fixed-fee architectural teardown before any development commitment.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
