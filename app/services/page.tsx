import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/components/ui/PageHero'
import { Button } from '@/components/ui/Button'
import { getPublishedServices } from '@/content/services'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Services // Engineering Disciplines & Technical Capabilities',
  description:
    'Avorria operates across three core disciplines: Build (digital flagships & web software), Search (technical SEO architecture & migrations), and Systems (commercial data & autonomous pipelines).',
  path: '/services',
})

const DISCIPLINE_VISUALS: Record<string, { image: string; alt: string; relatedCase: { title: string; slug: string; metric: string } }> = {
  build: {
    image: '/images/projects/alkota-bikes/hero.webp',
    alt: 'Alkota Bikes titanium frame configurator interface representing the Build discipline',
    relatedCase: { title: 'Alkota Bikes', slug: 'alkota-bikes', metric: '0.62s LCP // Zero Shift' },
  },
  search: {
    image: '/images/projects/one-great-northern/hero.webp',
    alt: 'One Great Northern enterprise search architecture and property monograph',
    relatedCase: { title: 'One Great Northern', slug: 'one-great-northern', metric: 'Zero Organic Equity Loss' },
  },
  systems: {
    image: '/images/projects/drawdown/hero.png',
    alt: 'Drawdown.Trading quantitative risk terminal and Canvas worker telemetry',
    relatedCase: { title: 'Drawdown.Trading', slug: 'drawdown', metric: '5,000 Ticks/Sec // 60 FPS' },
  },
}

export default function ServicesPage() {
  const services = getPublishedServices()

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Engineering & Architectural Web Development',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Disciplines',
      itemListElement: services.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <PageHero
        eyebrow="SERVICES / ENGINEERING DISCIPLINES"
        headline={[
          { before: 'Three disciplines.' },
          { accent: 'One studio.' },
        ]}
        body="Avorria operates across three core disciplines — Build, Search, and Systems. They are designed to compound in commercial value when deployed as an integrated digital architecture."
        primaryCta={{ label: 'Start a project ↗', href: '/start-a-project' }}
        secondaryCta={{ label: 'View our work', href: '/work' }}
        image="/images/projects/drawdown/hero.webp"
        imageAlt="Drawdown.Trading quantitative risk terminal and real-time Canvas worker telemetry"
        metaLeft="BUILD · SEARCH · SYSTEMS"
        metaRight="THREE COMPOUNDING DISCIPLINES"
      />

      <div className="section-y-large bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* In-Depth Disciplines Breakdown with Visual Proofs */}
            <div className="space-y-24">
              {services.map((service, i) => {
                const visual = DISCIPLINE_VISUALS[service.slug]
                return (
                  <RevealOnScroll key={service.slug}>
                    <section
                      id={service.slug}
                      className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 md:p-12 hover:border-[var(--color-border-strong)] transition-all duration-300"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-[var(--color-border)] text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                        <span className="text-[var(--color-rose-text)]">DISCIPLINE 0{i + 1}</span>
                        <span>ENTERPRISE SPECIFICATION</span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
                        {/* Left Details */}
                        <div className="lg:col-span-6 space-y-6">
                          <h2 className="text-display-m font-extralight text-[var(--color-graphite)]">
                            {service.title}
                          </h2>
                          <p className="text-lg font-light text-[var(--color-graphite-mid)] leading-relaxed">
                            {service.headline}
                          </p>
                          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                            {service.description}
                          </p>

                          {/* Capabilities Grid */}
                          <div className="pt-6 border-t border-[var(--color-border)]">
                            <span className="text-[10px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] block mb-4">
                              VERIFIED CAPABILITIES
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {service.capabilities.map((cap) => (
                                <div key={cap.title} className="border-l border-[var(--color-border-strong)] pl-3">
                                  <h3 className="text-xs font-light text-[var(--color-graphite)] uppercase tracking-wider mb-1">
                                    {cap.title}
                                  </h3>
                                  <p className="text-[11px] font-light text-[var(--color-graphite-mid)] leading-relaxed">
                                    {cap.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 flex flex-wrap gap-4 items-center">
                            <Button as="link" href={`/services/${service.slug}`} variant="secondary" size="sm">
                              Explore {service.title} Detail ↗
                            </Button>
                            {visual && (
                              <Button as="link" href={`/work/${visual.relatedCase.slug}`} variant="ghost" size="sm">
                                View Case Study: {visual.relatedCase.title}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Right Visual Exhibit Plate */}
                        {visual && (
                          <div className="lg:col-span-6 space-y-4">
                            <div className="relative w-full aspect-[16/10] bg-[#121110] overflow-hidden border border-[var(--color-border)]">
                              <Image
                                src={visual.image}
                                alt={visual.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 600px"
                                className="object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                            <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] px-1">
                              <span>VERIFIED PROOF // {visual.relatedCase.title}</span>
                              <span className="text-[var(--color-rose-text)]">{visual.relatedCase.metric}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Footer */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border)]">
                        {(service.technology ?? []).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] font-light border border-[var(--color-border)] px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>
                  </RevealOnScroll>
                )
              })}
            </div>

            {/* Bottom Closing CTA */}
            <div className="mt-24 border-t border-[var(--color-border)] pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-display-s mb-4 font-extralight">Ready to initiate an engagement?</h2>
                  <p className="text-secondary font-light mb-8 max-w-md">
                    Tell us about your digital infrastructure requirements and we will review feasibility within one business day.
                  </p>
                  <Button as="link" href="/start-a-project" variant="primary" size="md">
                    Start a project ↗
                  </Button>
                </div>
                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)]">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)] block mb-2">
                    DEPLOYMENT GUARANTEE
                  </span>
                  <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    We never deploy untested templates or offshore code. All architecture is authored in-house under strict TypeScript and validated against Core Web Vitals standards.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
