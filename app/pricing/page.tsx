import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PRICING_MODELS, COST_DRIVERS } from '@/content/pricing'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Commercial Engagement & Project Economics',
  description:
    'Transparent milestone billing, project scoping, and commercial models for digital flagship builds, systems retainers, and pre-build architecture audits.',
  path: '/pricing',
})

// ─── Schema.org JSON-LD ──────────────────────────────────────────────────────

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/pricing#service`,
  name: 'Avorria Commercial Engagement Models',
  provider: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: 'Avorria',
  },
  description:
    'Transparent milestone billing and project economics for digital product builds, embedded engineering retainers, and pre-build architectural audits.',
  url: `${siteConfig.url}/pricing`,
  areaServed: 'GB',
  serviceType: 'Digital Product Development',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Avorria Engagement Models',
    itemListElement: PRICING_MODELS.map((model, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: model.name,
      description: model.summary,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'GBP',
        description: model.investment,
      },
    })),
  },
}

// ─── What drives investment — editorial narrative ─────────────────────────────

const INVESTMENT_PRINCIPLES = [
  {
    title: 'Scope & technical complexity',
    body: 'The number of discrete engineering systems required — authentication, data synchronisation, API integrations, realtime pipelines — is the primary driver of investment.',
  },
  {
    title: 'Risk profile & timeline',
    body: 'Compressed delivery windows, undefined content requirements, or active third-party dependencies add engineering risk that is priced transparently at scope stage.',
  },
  {
    title: 'Quality floor, not ceiling',
    body: 'Every engagement carries the same 100/100 Core Web Vitals SLA, zero-layout-shift requirement, and full production handover. Quality does not scale with budget.',
  },
  {
    title: 'No hidden retainer drift',
    body: 'Billing is milestone-structured. Each payment aligns with a verified deliverable. We do not charge hourly across ambiguous agency months.',
  },
]

// ─── What is always included / always excluded ──────────────────────────────

const ALWAYS_INCLUDED = [
  '100/100 Core Web Vitals contractual standard',
  'Zero-layout-shift and cumulative performance baseline',
  'Full IP and code ownership transferred on completion',
  'No proprietary CMS lock-in — standard tooling always',
  'Senior practitioner delivery, not delegated juniors',
  'Structured handover documentation and deployment notes',
]

const NEVER_INCLUDED = [
  'Arbitrary hourly markup on agency staff time',
  'Generic AI-generated content or stock imagery',
  'Third-party software licences resold at margin',
  'Brand strategy, naming, or identity design',
  'Paid media management or social content production',
  'Ongoing hosting fees (clients hold their own accounts)',
]

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="bg-[var(--color-ivory)] min-h-screen">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="border-b border-[var(--color-border)]">
          <div className="container-max py-20 md:py-28">
            <div className="container-content">
              <p className="text-label-upper text-[var(--color-graphite-mid)] mb-6 font-light">
                COMMERCIAL MODELS // ECONOMICS
              </p>
              <h1 className="text-display-l max-w-[820px] font-extralight tracking-tight mb-8">
                Predictable engineering economics.
              </h1>
              <p className="text-body-l text-secondary font-light max-w-[640px] leading-relaxed">
                We operate on milestone billing with fixed-fee diagnostics. No
                sliding monthly retainer ambiguity. No hourly rate padding. Every
                invoice reflects a verified deliverable.
              </p>
            </div>
          </div>
        </div>

        <div className="container-max">
          <div className="container-content">

            {/* ── Engagement Models ────────────────────────────────── */}
            <section className="py-20 md:py-28" aria-label="Engagement Models">
              <div className="border-b border-[var(--color-border)] pb-10 mb-16 flex items-end justify-between gap-8">
                <div>
                  <p className="text-label-upper text-[var(--color-graphite-mid)] mb-3 font-light">
                    ENGAGEMENT FRAMEWORKS // 03 MODELS
                  </p>
                  <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase">
                    How we engage.
                  </h2>
                </div>
              </div>

              <div className="space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {PRICING_MODELS.map((model) => (
                  <div key={model.id} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">

                    {/* Left — model identity */}
                    <div className="border-r-0 lg:border-r border-[var(--color-border)] p-8 md:p-10 flex flex-col justify-between gap-8">
                      <div>
                        <p className="text-[10px] font-light uppercase tracking-[0.22em] text-[var(--color-graphite-mid)] mb-5">
                          {model.sequence}
                        </p>
                        <h3 className="text-[1.35rem] font-extralight text-[var(--color-graphite)] uppercase tracking-[0.06em] leading-tight mb-4">
                          {model.name}
                        </h3>
                        <p className="text-[1.15rem] font-light text-[var(--color-accent)] mb-3">
                          {model.investment}
                        </p>
                        <p className="text-[var(--text-label)] text-[var(--color-graphite-mid)] font-light uppercase tracking-[0.14em]">
                          {model.billingStructure}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite-mid)]">
                          Ideal for
                        </p>
                        <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
                          {model.idealFor}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Button
                          as="link"
                          href={model.id === 'agency-teardown' ? '/contact?inquiry=teardown' : '/start-a-project'}
                          variant={model.id === 'agency-teardown' ? 'secondary' : 'primary'}
                          size="md"
                        >
                          {model.id === 'agency-teardown'
                            ? 'Request Teardown Audit'
                            : model.id === 'embedded-systems'
                            ? 'Explore Retainer Partnership'
                            : 'Scope This Engagement'}
                        </Button>
                      </div>
                    </div>

                    {/* Right — deliverables + timeline */}
                    <div className="p-8 md:p-10 flex flex-col gap-8">
                      <p className="text-[var(--text-small)] font-light text-secondary leading-relaxed">
                        {model.summary}
                      </p>

                      <div>
                        <p className="text-[var(--text-label)] uppercase tracking-[0.14em] font-light text-[var(--color-graphite-mid)] mb-4">
                          Deliverables
                        </p>
                        <ul className="space-y-3" role="list">
                          {model.deliverables.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)]"
                            >
                              <span className="text-[var(--color-border-strong)] mt-[0.3em] shrink-0 text-[9px]">
                                ◆
                              </span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[var(--color-border)] pt-6 flex items-center gap-4">
                        <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite-mid)]">
                          Timeline
                        </p>
                        <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)]">
                          {model.timeline}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── What drives investment ───────────────────────────── */}
            <section className="border-t border-[var(--color-border)] py-20 md:py-28" aria-label="Investment Drivers">
              <div className="mb-16">
                <p className="text-label-upper text-[var(--color-graphite-mid)] mb-3 font-light">
                  TRANSPARENCY // COST DRIVERS
                </p>
                <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase max-w-[640px]">
                  What influences project investment.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--color-border)] divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
                {INVESTMENT_PRINCIPLES.map((p, i) => (
                  <div key={i} className="p-8 md:p-10">
                    <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite)] mb-4">
                      {p.title}
                    </p>
                    <p className="text-[var(--text-small)] font-light text-secondary leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Complexity factors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="border border-[var(--color-border)] p-8">
                  <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite)] mb-5">
                    ↑ Factors increasing scope
                  </p>
                  <ul className="space-y-3" role="list">
                    {COST_DRIVERS.increasesComplexity.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-small)] font-light text-secondary">
                        <span className="text-[var(--color-border-strong)] mt-[0.3em] shrink-0 text-[9px]">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[var(--color-border)] p-8">
                  <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite)] mb-5">
                    ↓ Factors reducing scope
                  </p>
                  <ul className="space-y-3" role="list">
                    {COST_DRIVERS.reducesComplexity.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-small)] font-light text-secondary">
                        <span className="text-[var(--color-border-strong)] mt-[0.3em] shrink-0 text-[9px]">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Always included / never included ────────────────── */}
            <section className="border-t border-[var(--color-border)] py-20 md:py-28" aria-label="Scope Boundaries">
              <div className="mb-16">
                <p className="text-label-upper text-[var(--color-graphite-mid)] mb-3 font-light">
                  SCOPE BOUNDARIES // TRANSPARENCY
                </p>
                <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase max-w-[640px]">
                  What every engagement includes.
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--color-border)] divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">
                <div className="p-8 md:p-10">
                  <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite)] mb-6">
                    Always included
                  </p>
                  <ul className="space-y-4" role="list">
                    {ALWAYS_INCLUDED.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-small)] font-light text-secondary">
                        <span className="text-[var(--color-accent)] mt-[0.3em] shrink-0 text-[9px]">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 md:p-10 bg-[var(--color-ivory-dark)]">
                  <p className="text-[var(--text-label)] font-light uppercase tracking-[0.14em] text-[var(--color-graphite)] mb-6">
                    Never included
                  </p>
                  <ul className="space-y-4" role="list">
                    {NEVER_INCLUDED.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-small)] font-light text-secondary">
                        <span className="text-[var(--color-graphite-mid)] mt-[0.3em] shrink-0 text-[9px]">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="border-t border-[var(--color-border)] py-20 md:py-28" aria-label="Next step">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
                <div>
                  <p className="text-label-upper text-[var(--color-graphite-mid)] mb-6 font-light">
                    NEXT STEP // SCOPE YOUR PROJECT
                  </p>
                  <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase max-w-[600px] mb-6">
                    Ready to scope an engagement?
                  </h2>
                  <p className="text-[var(--text-body)] font-light text-secondary leading-relaxed max-w-[560px]">
                    The best starting point is our project intake form — it takes 4
                    minutes and gives us the context to respond meaningfully. No
                    sales calls before we understand your project.
                  </p>
                </div>
                <div className="flex flex-col gap-4 shrink-0">
                  <Button as="link" href="/start-a-project" variant="primary" size="lg">
                    Scope a project ↗
                  </Button>
                  <Button as="link" href="/contact" variant="ghost" size="md">
                    Ask a question first
                  </Button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
