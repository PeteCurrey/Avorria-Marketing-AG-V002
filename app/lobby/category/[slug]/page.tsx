import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getAllCategories, getPublishedArticles } from '@/lib/lobby'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { getArticleImageMeta, getArticleDiscipline } from '@/components/lobby/LobbyArticleImage'

export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return generatePageMetadata({
      title: 'Category Not Found — The Lobby',
      description: 'The requested intelligence category could not be found.',
      path: '/lobby',
    })
  }

  const title = category.seoTitle || `${category.name} — The Lobby — Avorria`
  const description =
    category.seoDescription || category.description || `Editorial intelligence and analysis on ${category.name}.`

  return generatePageMetadata({
    title,
    description,
    path: `/lobby/category/${category.slug}`,
  })
}

export default async function LobbyCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getPublishedArticles({ categorySlug: category.slug }),
  ])

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'The Lobby', item: `${siteConfig.url}/lobby` },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/lobby/category/${category.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                {category.name}
              </li>
            </ol>
          </nav>

          {/* ── Category Header ─────────────────────────────────────────── */}
          <header className="border-b border-[var(--color-border)] pb-10 mb-12">
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
              EDITORIAL DOSSIER
            </p>
            <h1 className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-extralight tracking-tight text-[var(--color-graphite)] leading-[1.05] mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[1.0625rem] font-light text-[var(--color-graphite-mid)] max-w-[620px] leading-relaxed mb-8">
                {category.description}
              </p>
            )}

            {/* Sub-nav for categories */}
            <nav aria-label="All Lobby categories" className="overflow-x-auto pt-4 border-t border-[var(--color-border)]">
              <ul className="flex gap-0 min-w-max" role="list">
                <li>
                  <Link
                    href="/lobby"
                    className="block px-4 py-2 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-mid)] border-b-2 border-transparent hover:text-[var(--color-graphite)] hover:border-[var(--color-border)] transition-colors duration-200"
                  >
                    All
                  </Link>
                </li>
                {categories.map((cat) => {
                  const isActive = cat.slug === category.slug
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={`/lobby/category/${cat.slug}`}
                        className={`block px-4 py-2 text-[0.6875rem] font-light tracking-[0.14em] uppercase transition-colors duration-200 ${
                          isActive
                            ? 'text-[var(--color-graphite)] border-b-2 border-[var(--color-graphite)]'
                            : 'text-[var(--color-graphite-mid)] border-b-2 border-transparent hover:text-[var(--color-graphite)] hover:border-[var(--color-border)]'
                        }`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </header>

          {/* ── Dispatches Grid ─────────────────────────────────────────── */}
          {articles.length > 0 ? (
            <section aria-labelledby="category-articles-heading">
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--color-border)] text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)]">
                <span id="category-articles-heading">{articles.length} DISPATCHES PUBLISHED</span>
                <span>VERIFIED INTELLIGENCE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => {
                  const imgMeta = getArticleImageMeta(article)
                  const discipline = getArticleDiscipline(article)
                  return (
                    <EditorialCard
                      key={article.slug}
                      href={`/lobby/${article.slug}`}
                      title={article.title}
                      excerpt={article.excerpt ?? article.dek}
                      category={`${discipline.label} · ${category.name}`}
                      categoryHref={`/lobby/category/${category.slug}`}
                      readTime={article.readingTimeMinutes ?? article.readTimeMinutes ?? 5}
                      date={
                        article.publishedAt
                          ? new Date(article.publishedAt)
                              .toLocaleDateString('en-GB', {
                                month: 'short',
                                year: 'numeric',
                              })
                              .toUpperCase()
                          : undefined
                      }
                      image={imgMeta.src}
                      imageAlt={article.title}
                      metric={discipline.badgeText}
                      size="standard"
                    />
                  )
                })}
              </div>
            </section>
          ) : (
            <div className="py-20 border-t border-[var(--color-border)] text-center">
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                No dispatches published yet
              </p>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[360px] mx-auto leading-relaxed mb-6">
                Editorial dispatches in {category.name} will appear here as they are published.
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
