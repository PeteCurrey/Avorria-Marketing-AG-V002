import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getAllCategories, getPublishedArticles } from '@/lib/lobby'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'

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
  const description = category.seoDescription || category.description || `Editorial intelligence and analysis on ${category.name}.`

  return generatePageMetadata({
    title,
    description,
    path: `/lobby/category/${category.slug}`,
  })
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
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
      { '@type': 'ListItem', position: 3, name: category.name, item: `${siteConfig.url}/lobby/category/${category.slug}` },
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
              Category
            </p>
            <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.05] mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[560px] leading-relaxed mb-6">
                {category.description}
              </p>
            )}

            {/* Sub-nav for categories */}
            <nav aria-label="All Lobby categories" className="overflow-x-auto pt-4 border-t border-[var(--color-border)]">
              <ul className="flex gap-0 min-w-max">
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

          {/* ── Dispatches List ─────────────────────────────────────────── */}
          {articles.length > 0 ? (
            <section aria-labelledby="category-articles-heading" className="space-y-0">
              <p id="category-articles-heading" className="sr-only">
                Articles in {category.name}
              </p>
              <ul role="list">
                {articles.map((article) => (
                  <li key={article.slug} className="border-t border-[var(--color-border)]">
                    <Link
                      href={`/lobby/${article.slug}`}
                      className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 py-6 hover:border-[var(--color-border-strong)] transition-colors duration-200"
                    >
                      <div className="max-w-[680px]">
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
