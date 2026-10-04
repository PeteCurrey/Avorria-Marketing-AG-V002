import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLobbyArticleBySlug, getRelatedLobbyArticles, getLobbyArticles } from '@/lib/db/lobby'
import { ReadingProgress } from '@/components/lobby/ReadingProgress'
import { ArticleBody } from '@/components/lobby/ArticleBody'
import { siteConfig } from '@/content/config/site'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const { articles } = await getLobbyArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getLobbyArticleBySlug(slug)
  if (!article) return {}

  const title = `${article.title} — The Lobby — Avorria`
  const description = article.excerpt || 'Editorial intelligence and platform investigation from Avorria.'

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/lobby/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/lobby/${slug}`,
      type: 'article',
      publishedTime: article.published_at || undefined,
      authors: [article.author_name || 'Peter Currey'],
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(article.title)}&client=${encodeURIComponent('The Lobby')}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function LobbyArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getLobbyArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedLobbyArticles(slug, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    name: article.title,
    description: article.excerpt || article.title,
    url: `${siteConfig.url}/lobby/${slug}`,
    datePublished: article.published_at,
    author: {
      '@type': 'Person',
      name: article.author_name || 'Peter Currey',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'The Lobby', item: `${siteConfig.url}/lobby` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${siteConfig.url}/lobby/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Thin reading progress line */}
      <ReadingProgress />

      <main id="main" className="lobby-article">
        <div className="wrap">

          {/* Article Header */}
          <header className="lobby-article__header">
            <div className="lobby-article__meta">
              <span>{article.author_name || 'Peter Currey'}</span>
              <span>·</span>
              <time dateTime={article.published_at || undefined}>
                {formatDate(article.published_at)}
              </time>
              <span>·</span>
              <span>{article.reading_time_minutes || 5} min read</span>
            </div>

            <h1 className="lobby-article__title">{article.title}</h1>

            {article.excerpt && (
              <p className="lobby-article__dek">{article.excerpt}</p>
            )}
          </header>

          {/* Single Column Body at 62ch–68ch with Generous Leading */}
          <div className="lobby-article__content">
            <ArticleBody content={article.body || ''} />
          </div>

          {/* Related Pieces (Max 3) */}
          {related.length > 0 && (
            <section className="lobby-article__related" aria-label="Related dispatches">
              <h2 className="lobby-article__related-title">Related Dispatches</h2>
              <ul className="lobby-article__related-list">
                {related.map((rel) => (
                  <li key={rel.slug} className="lobby-article__related-item">
                    <Link href={`/lobby/${rel.slug}`} className="lobby-article__related-link">
                      <span className="lobby-article__related-item-title">{rel.title}</span>
                      <span className="lobby-article__related-item-read">
                        {rel.reading_time_minutes || 5} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Back link */}
          <div className="py-12 border-t border-[var(--line)]">
            <Link href="/lobby" className="link-rose">
              ← Return to The Lobby
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
