import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { getArticle, getPublishedArticleSlugs } from '@/content/journal'
import { siteConfig } from '@/content/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: { canonical: `${siteConfig.url}/journal/${slug}` },
    openGraph: {
      type: 'article',
      title: article.seo.title,
      description: article.seo.description,
      url: `${siteConfig.url}/journal/${slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
    },
    datePublished: article.publishedAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    url: `${siteConfig.url}/journal/${slug}`,
  }

  const categoryLabels: Record<string, string> = {
    'build-notes': 'Build Notes',
    ai: 'AI',
    web: 'Web',
    systems: 'Systems',
    insights: 'Insights',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="section-y-large">
        <div className="container-max">
          <div className="container-content">

            <Breadcrumb
              items={[
                { label: 'Journal', href: '/journal' },
                { label: article.title },
              ]}
              className="mb-12"
            />

            {/* Header */}
            <div className="border-b border-[var(--color-border)] pb-16 mb-16">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="text-label-upper text-muted">
                  {categoryLabels[article.category] ?? article.category}
                </span>
                <span className="text-label-upper text-muted">—</span>
                <span className="text-label-upper text-muted">
                  {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {article.readingTimeMinutes && (
                  <>
                    <span className="text-label-upper text-muted">—</span>
                    <span className="text-label-upper text-muted">
                      {article.readingTimeMinutes} min read
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-display-l max-w-[760px] mb-6">{article.title}</h1>
              <p className="text-body-l text-secondary max-w-[600px]">{article.excerpt}</p>
              <p className="text-label-upper text-muted mt-6">By {article.author.name}</p>
            </div>

            {/* Article content — rendered as HTML for CMS-readiness */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">
              <div
                className="prose-avorria max-w-[660px]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              {/* Sidebar */}
              <div className="lg:pt-1">
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-8">
                    <p className="text-label-upper mb-4">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-label-upper border border-[var(--color-border)] px-3 py-1.5 text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="border-t border-[var(--color-border)] pt-8">
                  <p className="text-label-upper mb-4">Have a project in mind?</p>
                  <Button as="link" href="/start-a-project" variant="primary" size="sm">
                    Start a project ↗
                  </Button>
                </div>
              </div>
            </div>

            {/* Internal links */}
            <div className="mt-16 border-t border-[var(--color-border)] pt-12 flex flex-wrap gap-4">
              <Button as="link" href="/journal" variant="ghost" size="sm">← All articles</Button>
              <Button as="link" href="/services" variant="ghost" size="sm">Our services →</Button>
              <Button as="link" href="/work" variant="ghost" size="sm">Our work →</Button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
