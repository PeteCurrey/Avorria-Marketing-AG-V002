import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { generatePageMetadata } from '@/lib/metadata'
import { getService, getPublishedServices } from '@/content/services'
import { getVerifiedCaseStudyBySlug } from '@/content/case-studies/registry'
import { siteConfig } from '@/content/config/site'

/** Cinematic asset override — project slug → editorial image */
const CINEMATIC_MAP: Record<string, string> = {
  'alkota-bikes': '/images/cinematic/work-alkota.jpg',
  tafm: '/images/cinematic/work-tafm.jpg',
  drawdown: '/images/cinematic/work-drawdown.jpg',
  careeros: '/images/cinematic/work-careeros.jpg',
  nestiq: '/images/cinematic/work-nestiq.jpg',
  entirefm: '/images/cinematic/work-entirefm.jpg',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = getPublishedServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return generatePageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${slug}`,
    ogImage: service.heroImage,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  // Retrieve case studies verified for this service
  const relatedCaseStudies = (service.caseStudySlugs ?? [])
    .map((s) => getVerifiedCaseStudyBySlug(s))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs))

  // Determine hero chapter theme based on discipline
  const heroTheme = slug === 'systems' ? 'petrol' : slug === 'search' ? 'graphite' : 'graphite'

  // Service JSON-LD Schema
  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/services/${slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/services/${slug}`,
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    ],
  }

  // FAQPage JSON-LD Schema if FAQs exist
  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${siteConfig.url}/services/${slug}#faq`,
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── 01 // Hero: Full-Screen PageHero ──────────────────────────────── */}
      <PageHero
        eyebrow={service.disciplineEyebrow ?? `DISCIPLINE // ${service.title.toUpperCase()}`}
        headline={
          service.heroHeadline ?? [
            { before: service.title.split('// ')[1] ?? service.title, accent: 'Architecture.' },
          ]
        }
        body={service.description}
        primaryCta={{ label: 'Initiate a Project ↗', href: '/start-a-project' }}
        secondaryCta={{ label: 'Explore Verified Work', href: '/work' }}
        image={service.heroImage ?? '/images/positioning/manifesto.jpg'}
        imageAlt={service.heroAlt ?? `${service.title} engineering showcase`}
        metaLeft={service.metaLeft ?? `AVORRIA // ${service.title.toUpperCase()}`}
        metaRight={service.metaRight ?? 'ENTERPRISE SPECIFICATION · UNITED KINGDOM'}
        theme={heroTheme}
      />

      <div className="section-y-large bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* Breadcrumb Navigation */}
            <Breadcrumb
              items={[
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
              className="mb-16"
            />

            {/* ── 02 // The Problem & Operational Friction ─────────────────────── */}
            {service.problemStatement && (
              <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Commercial problem statement">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-rose-text)]">
                    01 // COMMERCIAL PROBLEM
                  </span>
                  <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <h2 className="text-display-m font-extralight text-[var(--color-graphite)] tracking-tight">
                      {service.problemTitle ?? 'The hidden liabilities of standard delivery.'}
                    </h2>
                    <p className="text-lg font-light text-[var(--color-graphite)] leading-relaxed">
                      {service.problemStatement}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6 text-secondary font-light leading-relaxed">
                    {(service.problemDetail ?? []).map((paragraph, idx) => (
                      <p key={idx} className="text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── 03 // Methodology & Approach Lifecycle ──────────────────────── */}
            {service.approachSteps && service.approachSteps.length > 0 && (
              <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Engineering approach">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                    02 // METHODOLOGY &amp; DELIVERY
                  </span>
                  <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
                </div>

                <div className="max-w-2xl mb-12">
                  <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    {service.approachTitle ?? 'Systematic execution framework.'}
                  </h2>
                  <p className="text-sm md:text-base font-light text-secondary leading-relaxed">
                    {service.approachStatement ?? 'Discrete engineering milestones with zero speculative ambiguity.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[var(--color-border)] bg-[var(--color-ivory-light)]">
                  {service.approachSteps.map((step, idx) => (
                    <RevealOnScroll key={step.step} delay={idx * 60}>
                      <div className="p-8 border-b md:border-b-0 border-r border-[var(--color-border)] h-full flex flex-col justify-between space-y-6 hover:bg-white transition-colors duration-200">
                        <div>
                          <span className="text-xs font-light text-[var(--color-rose-text)] tracking-[0.2em] uppercase block mb-3">
                            PHASE {step.step}
                          </span>
                          <h3 className="text-base font-light text-[var(--color-graphite)] mb-3">
                            {step.title}
                          </h3>
                          <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>
            )}

            {/* ── 04 // Verified Capabilities Grid ────────────────────────────── */}
            <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Core capabilities">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                  03 // VERIFIED CAPABILITIES
                </span>
                <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>

              <div className="max-w-2xl mb-12">
                <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                  Scope of technical execution.
                </h2>
                <p className="text-sm font-light text-secondary">
                  Specialist capabilities delivered in-house under strict engineering contracts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.capabilities.map((cap, i) => (
                  <RevealOnScroll key={i} delay={i * 50}>
                    <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 hover:border-[var(--color-border-strong)] hover:bg-white transition-all duration-300 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
                          <span>SPECIFICATION 0{i + 1}</span>
                          <span className="text-[var(--color-rose-text)]">IN-HOUSE</span>
                        </div>
                        <h3 className="text-base font-light text-[var(--color-graphite)] mb-2">
                          {cap.title}
                        </h3>
                        <p className="text-xs md:text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>

            {/* ── 05 // Case Study Evidence & Verified Deployments ──────────────── */}
            {relatedCaseStudies.length > 0 && (
              <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Related case studies">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                    04 // VERIFIED PROOF
                  </span>
                  <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
                </div>

                <div className="max-w-2xl mb-12">
                  <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    Demonstrable production work.
                  </h2>
                  <p className="text-sm font-light text-secondary">
                    Grounded in real production deployments. Zero simulated benchmarks or fabricated metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {relatedCaseStudies.map((cs) => {
                    const heroImg =
                      CINEMATIC_MAP[cs.slug] ??
                      `/images/projects/${cs.slug}/hero.webp`

                    return (
                      <RevealOnScroll key={cs.slug}>
                        <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] overflow-hidden group hover:border-[var(--color-border-strong)] transition-all duration-300">
                          <div className="relative w-full aspect-[16/10] bg-[#121110] overflow-hidden">
                            <Image
                              src={heroImg}
                              alt={`${cs.title} case study inspection`}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-light text-white/80">
                              <span>{cs.client}</span>
                              <span className="text-[var(--color-accent-light)]">{cs.year}</span>
                            </div>
                          </div>

                          <div className="p-8 space-y-4">
                            <div className="text-[10px] tracking-[0.18em] uppercase font-light text-[var(--color-rose-text)]">
                              {cs.sector}
                            </div>
                            <h3 className="text-xl font-light text-[var(--color-graphite)]">
                              {cs.title}
                            </h3>
                            <p className="text-xs md:text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                              {cs.executiveSummary}
                            </p>
                            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                              <Link
                                href={`/work/${cs.slug}`}
                                className="inline-flex items-center gap-2 text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors"
                              >
                                <span>Read Case Study Investigation</span>
                                <span aria-hidden="true">→</span>
                              </Link>
                              <span className="text-[9px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                                VERIFIED
                              </span>
                            </div>
                          </div>
                        </div>
                      </RevealOnScroll>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── 06 // Technology Ecosystem ───────────────────────────────────── */}
            {service.technology && service.technology.length > 0 && (
              <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Technology foundation">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                    05 // TECHNOLOGY FOUNDATION
                  </span>
                  <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
                </div>

                <div className="max-w-2xl mb-8">
                  <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    Modern, resilient stack.
                  </h2>
                  <p className="text-sm font-light text-secondary">
                    Selected for extreme stability, sub-second latency, and long-term maintainability.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {service.technology.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs tracking-[0.1em] uppercase font-light border border-[var(--color-border)] bg-[var(--color-ivory-light)] px-4 py-2.5 text-[var(--color-graphite)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* ── 07 // FAQ & Clarification Ledger ────────────────────────────── */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="mb-28 border-b border-[var(--color-border)] pb-20" aria-label="Frequently asked questions">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                    06 // QUESTIONS &amp; SPECIFICATIONS
                  </span>
                  <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
                </div>

                <div className="max-w-2xl mb-12">
                  <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    {service.faqTitle ?? 'Frequently answered questions.'}
                  </h2>
                  <p className="text-sm font-light text-secondary">
                    Clear technical answers to common commercial scoping inquiries.
                  </p>
                </div>

                <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)] bg-[var(--color-ivory-light)]">
                  {service.faqs.map((faq, i) => (
                    <RevealOnScroll key={i} delay={i * 40}>
                      <div className="p-8 space-y-3">
                        <h3 className="text-base font-light text-[var(--color-graphite)] leading-snug">
                          {faq.question}
                        </h3>
                        <p className="text-xs md:text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[80ch]">
                          {faq.answer}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>
            )}

            {/* ── 08 // Cross-Discipline Internal Discovery ───────────────────── */}
            <section className="mb-20" aria-label="Related studio capabilities">
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--color-border)] text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                <span>STUDIO DISCOVERY</span>
                <span>INTEGRATED ARCHITECTURE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/services"
                  className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)] hover:bg-white hover:border-[var(--color-graphite)] transition-all duration-200"
                >
                  <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] block mb-1">
                    SERVICES HUB
                  </span>
                  <span className="text-sm font-light text-[var(--color-graphite)]">
                    All Three Disciplines →
                  </span>
                </Link>
                <Link
                  href="/work"
                  className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)] hover:bg-white hover:border-[var(--color-graphite)] transition-all duration-200"
                >
                  <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] block mb-1">
                    PRODUCTION WORK
                  </span>
                  <span className="text-sm font-light text-[var(--color-graphite)]">
                    Verified Portfolio →
                  </span>
                </Link>
                <Link
                  href="/digital-audit"
                  className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)] hover:bg-white hover:border-[var(--color-graphite)] transition-all duration-200"
                >
                  <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-rose-text)] block mb-1">
                    PRE-FLIGHT DIAGNOSTIC
                  </span>
                  <span className="text-sm font-light text-[var(--color-graphite)]">
                    Project &amp; Digital Audit ↗
                  </span>
                </Link>
              </div>
            </section>

            {/* ── 09 // Closing Commercial CTA ────────────────────────────────── */}
            <div className="border-t border-[var(--color-border)] pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-display-s mb-4 font-extralight text-[var(--color-graphite)]">
                    Ready to initiate {service.title.split('// ')[1] ?? 'your project'}?
                  </h2>
                  <p className="text-secondary font-light mb-8 max-w-md text-sm md:text-base leading-relaxed">
                    Tell us what you are building. All inquiries are evaluated directly by senior engineering principals within one business day.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button as="link" href="/start-a-project" variant="primary" size="md">
                      Start a Project ↗
                    </Button>
                    <Button as="link" href="/contact" variant="secondary" size="md">
                      Contact Studio
                    </Button>
                  </div>
                </div>

                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)]">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)] block mb-2">
                    SOVEREIGN ENGINEERING COMMITMENT
                  </span>
                  <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    We do not outsource delivery, deploy unvetted third-party templates, or bill passive retainers. All architecture is authored in-house under strict TypeScript and delivered with complete intellectual property sovereignty.
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
