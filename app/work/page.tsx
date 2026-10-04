import type { Metadata } from 'next'
import Link from 'next/link'
import { getVerifiedPublishedCaseStudies } from '@/lib/db/proof'
import { siteConfig } from '@/content/config/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Work — Verified Case Studies — Avorria',
  description:
    'Verified case studies in digital product engineering, platform architecture, and intelligent systems by Avorria.',
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    title: 'Work — Verified Case Studies — Avorria',
    description:
      'Verified case studies in digital product engineering, platform architecture, and intelligent systems by Avorria.',
    url: `${siteConfig.url}/work`,
    type: 'website',
  },
}

export default async function WorkPage() {
  const caseStudies = await getVerifiedPublishedCaseStudies()

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
        name: 'Work — Avorria',
        description:
          'Verified case studies in digital product engineering, platform architecture, and intelligent systems by Avorria.',
        url: `${siteConfig.url}/work`,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        hasPart: caseStudies.map((cs) => ({
          '@type': 'Article',
          headline: cs.headline_result,
          url: `${siteConfig.url}/work/${cs.slug}`,
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

      <main id="main" className="work-index">
        <div className="wrap">

          {/* Page heading */}
          <div className="work-index__header">
            <h1 className="work-index__title">Work</h1>
          </div>

          {/* List or Plain Empty-State Sentence */}
          {caseStudies.length === 0 ? (
            <div className="py-16">
              <p className="text-[var(--muted)] font-light text-[1.125rem]">
                No published case studies at this time.
              </p>
            </div>
          ) : (
            <ol className="work-index__list">
              {caseStudies.map((study) => (
                <li key={study.slug} className="work-index__row">
                  <Link href={`/work/${study.slug}`} className="work-index__link">
                    <span className="work-index__client">{study.clients?.name || 'Case Study'}</span>
                    <span className="work-index__summary">{study.headline_result}</span>
                    <span className="work-index__meta">
                      <span className="work-index__industry">{study.clients?.market || ''}</span>
                      <span className="work-index__year">{study.period || ''}</span>
                    </span>
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
