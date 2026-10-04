import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = {
  title: 'Audit — Slate, Onyx & Obsidian — Avorria',
  description:
    'Forensic digital platform and architectural diagnostics. Choose how deep the audit goes: Slate, Onyx, or Obsidian.',
  alternates: { canonical: `${siteConfig.url}/audit` },
  openGraph: {
    title: 'Audit — Slate, Onyx & Obsidian — Avorria',
    description:
      'Forensic digital platform and architectural diagnostics. Choose how deep the audit goes: Slate, Onyx, or Obsidian.',
    url: `${siteConfig.url}/audit`,
    type: 'website',
  },
}

const TIERS = [
  {
    name: 'Slate',
    outcome: 'Where your site and systems stand today—a baseline forensic diagnostic.',
    deliverables: [
      '10-dimension forensic architecture and Core Web Vitals audit',
      'Tracking, tag integrity, and attribution leakage check',
      'Executive diagnostic report with verified provenance grading',
      'Fixed fee diagnostic delivered in 5 business days',
    ],
  },
  {
    name: 'Onyx',
    outcome: 'The baseline, plus a prioritised 90-day technical roadmap you can act on.',
    deliverables: [
      'Everything in Slate forensic diagnostic and telemetry check',
      'Agency invoice and vendor quote teardown to eliminate padding',
      'Prioritised 90-day remediation matrix (commercial ROI vs complexity)',
      'Architecture blueprint, sprint epics, and board-ready briefing',
      'Fixed fee advisory sprint delivered in 7 business days',
    ],
  },
  {
    name: 'Obsidian',
    outcome: 'The roadmap, with our senior engineering team delivering it alongside yours.',
    deliverables: [
      'Everything in Onyx diagnostic, vendor teardown, and roadmap',
      'Production engineering and code remediation by senior Avorria staff',
      'Server-side tracking, pipeline automation, and zero-shift guarantees',
      'Direct engineering channel and full code repository handover',
      'Dedicated Build Sprint or Embedded Retainer (4–12 weeks)',
    ],
  },
]

export default function AuditPage() {
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
        '@type': 'Service',
        name: 'Avorria Architectural & System Audit',
        description:
          'Forensic digital platform, crawl health, and technical architecture diagnostics across three progressive tiers: Slate, Onyx, and Obsidian.',
        url: `${siteConfig.url}/audit`,
        provider: {
          '@id': `${siteConfig.url}/#organization`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Audit Tiers',
          itemListElement: TIERS.map((tier) => ({
            '@type': 'Offer',
            name: tier.name,
            description: tier.outcome,
          })),
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="main" className="audit-page">
        <div className="wrap">

          {/* Header */}
          <header className="audit-page__header">
            <h1 className="audit-page__title">
              Choose how deep the audit goes.
            </h1>
            <p className="audit-page__intro">
              Forensic diagnostics for high-stakes digital platforms. We evaluate what is working, what is broken, and what should legitimately be built.
            </p>
          </header>

          {/* Three columns divided by hairlines (no cards) */}
          <div className="audit-page__tiers">
            {TIERS.map((tier, idx) => (
              <div key={tier.name} className="audit-page__tier">
                <div className="audit-page__tier-head">
                  <span className="audit-page__tier-num">0{idx + 1}</span>
                  <h2 className="audit-page__tier-name">{tier.name}</h2>
                </div>
                <p className="audit-page__tier-outcome">{tier.outcome}</p>
                <ul className="audit-page__tier-list">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="audit-page__tier-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* One Call to Action */}
          <div className="audit-page__cta">
            <div className="audit-page__cta-inner">
              <div>
                <h2 className="audit-page__cta-title">Ready to commission an audit?</h2>
                <p className="audit-page__cta-body">
                  All audit fees are credited toward any subsequent build or engineering sprint.
                </p>
              </div>
              <Link href="/start-a-project?track=audit" className="link-rose text-[1.125rem]">
                Commission Audit
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
