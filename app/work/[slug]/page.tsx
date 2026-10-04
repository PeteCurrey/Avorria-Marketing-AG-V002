import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getVerifiedPublishedCaseStudies,
  getVerifiedCaseStudyBySlug,
} from '@/lib/db/proof'
import { siteConfig } from '@/content/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const studies = await getVerifiedPublishedCaseStudies()
  return studies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getVerifiedCaseStudyBySlug(slug)
  if (!study) return {}

  const clientName = study.clients?.name || 'Case Study'
  const ogTitle = `${study.headline_result} — ${clientName} — Avorria`
  const ogDescription = study.narrative
    ? study.narrative.slice(0, 160)
    : `${study.headline_result}. A verified case study from Avorria.`

  return {
    title: ogTitle,
    description: ogDescription,
    alternates: { canonical: `${siteConfig.url}/work/${slug}` },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${siteConfig.url}/work/${slug}`,
      type: 'article',
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(study.headline_result)}&client=${encodeURIComponent(clientName)}`,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const study = await getVerifiedCaseStudyBySlug(slug)
  if (!study) notFound()

  const clientName = study.clients?.name || 'Case Study'
  const market = study.clients?.market
  const period = study.period

  // JSON-LD structured data: CaseStudy / Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.headline_result,
    name: `${clientName} — ${study.headline_result}`,
    description: study.narrative || study.headline_result,
    url: `${siteConfig.url}/work/${slug}`,
    datePublished: study.created_at,
    author: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.organization.logo,
      },
    },
    ...(study.metric_value
      ? {
          about: {
            '@type': 'Thing',
            name: study.metric_label || 'Key Metric',
            description: `${study.metric_value}${study.period ? ` — ${study.period}` : ''}`,
          },
        }
      : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${siteConfig.url}/work` },
      { '@type': 'ListItem', position: 3, name: clientName, item: `${siteConfig.url}/work/${slug}` },
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

      <main id="main" className="work-detail">
        {/* Film title open: large headline result sentence */}
        <div className="work-detail__title-block">
          <div className="wrap">
            <div className="work-detail__meta-row">
              <span className="work-detail__client">{clientName}</span>
              {market && (
                <>
                  <span className="work-detail__divider" aria-hidden="true">·</span>
                  <span className="work-detail__industry">{market}</span>
                </>
              )}
              {period && (
                <>
                  <span className="work-detail__divider" aria-hidden="true">·</span>
                  <span className="work-detail__year">{period}</span>
                </>
              )}
            </div>

            <h1 className="work-detail__headline">
              {study.headline_result}
            </h1>

            {/* Metric appears once, in the headline, sourced from the verified row */}
            {study.metric_value && (
              <div className="work-detail__metric">
                <span className="work-detail__metric-value">{study.metric_value}</span>
                {study.metric_label && (
                  <span className="work-detail__metric-label">{study.metric_label}</span>
                )}
                {study.period && (
                  <span className="work-detail__metric-period">{study.period}</span>
                )}
              </div>
            )}

            <div className="work-detail__back">
              <Link href="/work" className="link-rose">← All work</Link>
            </div>
          </div>
        </div>

        {/* Full-bleed imagery ONLY where client supplied it */}
        {study.clients?.logo_url && (
          <div className="work-detail__hero-image relative h-[50vh] w-full">
            <Image
              src={study.clients.logo_url}
              alt={clientName}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Narrative in a readable measure (max 68ch) */}
        <div className="wrap">
          <div className="work-detail__body max-w-[68ch]">
            {study.narrative && (
              <div className="work-detail__narrative">
                <p className="text-[1.25rem] leading-[1.82] text-[var(--color-graphite)] font-light">
                  {study.narrative}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Closing back link */}
        <div className="work-detail__footer">
          <div className="wrap">
            <Link href="/work" className="link-rose">← All work</Link>
          </div>
        </div>

      </main>
    </>
  )
}
