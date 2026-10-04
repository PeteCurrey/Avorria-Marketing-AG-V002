import type { Metadata } from 'next'
import Link from 'next/link'
import { getLobbyArticles } from '@/lib/db/lobby'
import { siteConfig } from '@/content/config/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Lobby — Editorial Intelligence — Avorria',
  description:
    'Essays and investigations on digital systems, website architecture, search visibility, and engineering reality from Avorria.',
  alternates: { canonical: `${siteConfig.url}/lobby` },
  openGraph: {
    title: 'The Lobby — Editorial Intelligence — Avorria',
    description:
      'Essays and investigations on digital systems, website architecture, search visibility, and engineering reality from Avorria.',
    url: `${siteConfig.url}/lobby`,
    type: 'website',
  },
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function LobbyIndexPage() {
  const { articles, error } = await getLobbyArticles()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.organization.name,
        url: siteConfig.organization.url,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.organization.logo,
        },
        description: siteConfig.organization.description,
      },
      {
        '@type': 'CollectionPage',
        name: 'The Lobby — Avorria',
        description:
          'Editorial intelligence on digital systems, website architecture, search visibility, and emerging technology from Avorria.',
        url: `${siteConfig.url}/lobby`,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        hasPart: articles.map((a) => ({
          '@type': 'Article',
          headline: a.title,
          url: `${siteConfig.url}/lobby/${a.slug}`,
          datePublished: a.published_at,
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="main" className="lobby-page">
        <div className="wrap">

          {/* Heading */}
          <header className="lobby-page__header">
            <h1 className="lobby-page__title">The Lobby</h1>
            <p className="lobby-page__dek">
              Essays, teardowns, and engineering dispatches from the studio.
            </p>
          </header>

          {/* Database Error State vs Empty State vs Article List */}
          {error ? (
            <div className="py-16">
              <p className="text-[var(--color-rose)] font-light text-[1.125rem]" role="alert">
                Unable to load dispatches due to a database service error: {error}
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="lobby-page__empty">
              <p className="lobby-page__empty-text">
                No dispatches have been published to The Lobby yet.
              </p>
            </div>
          ) : (
            <ol className="lobby-page__list">
              {articles.map((article) => (
                <li key={article.slug} className="lobby-page__row">
                  <Link href={`/lobby/${article.slug}`} className="lobby-page__link">
                    <h2 className="lobby-page__item-title">{article.title}</h2>
                    <div className="lobby-page__item-meta">
                      <span>{article.reading_time_minutes || 5} min read</span>
                      <span>·</span>
                      <time dateTime={article.published_at || undefined}>
                        {formatDate(article.published_at)}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}

        </div>
      </main>
    </>
  )
}
