import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { CinematicPlate } from '@/components/cinematic/CinematicPlate'
import { generatePageMetadata } from '@/lib/metadata'
import { getService, getPublishedServices } from '@/content/services'
import { getVerifiedCaseStudyBySlug } from '@/content/case-studies/registry'
import { getArticleBySlug } from '@/lib/lobby'
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

/** Per-discipline configuration: cinematic image, accent strip, mid-page plate */
const DISCIPLINE_CONFIG: Record<
  string,
  {
    heroImage: string
    heroAlt: string
    heroTheme: 'graphite' | 'petrol'
    accentStripText: string
    accentRule: string // CSS color for the approach-step accent rule
    midPlateSlug: string // which CINEMATIC_MAP key to use for mid-page plate
    midPlateAnnotation: string
    midPlateMetadata: string
    ctaHeadline: string
    ctaItalic: string
    ctaDescription: string
    ctaBanner: 'wine' | 'petrol' | 'graphite'
    watermark: string
  }
> = {
  build: {
    heroImage: '/images/cinematic/discipline-build.jpg',
    heroAlt: 'Structural steel and precision engineering — the visual language of digital craftsmanship',
    heroTheme: 'graphite',
    accentStripText:
      'BESPOKE WEB ENGINEERING — Zero templates. Zero speculative delivery. Architectured from foundation to production in strict TypeScript.',
    accentRule: 'var(--color-cobalt)',
    midPlateSlug: 'alkota-bikes',
    midPlateAnnotation: 'ALKOTA BIKES // PRECISION TITANIUM FLAGSHIP',
    midPlateMetadata: 'VERIFIED BUILD DEPLOYMENT · UNITED KINGDOM',
    ctaHeadline: 'Ready to commission',
    ctaItalic: 'a digital flagship?',
    ctaDescription:
      'Tell us what you are building. All BUILD enquiries are reviewed directly by senior engineering principals within one business day.',
    ctaBanner: 'wine',
    watermark: 'BUILD',
  },
  search: {
    heroImage: '/images/cinematic/discipline-strategy.jpg',
    heroAlt: 'Architectural planning studio — the methodical rigour of search architecture',
    heroTheme: 'graphite',
    accentStripText:
      'SEARCH ARCHITECTURE — Forensic crawl engineering. High-risk migration safeguards. Semantic entity graphs that compound commercial authority over time.',
    accentRule: 'var(--color-graphite-mid)',
    midPlateSlug: 'entirefm',
    midPlateAnnotation: 'ENTIREFM // NATIONWIDE MULTI-DOMAIN CONSOLIDATION',
    midPlateMetadata: 'VERIFIED SEARCH DEPLOYMENT · UNITED KINGDOM',
    ctaHeadline: 'Commission a search',
    ctaItalic: 'architecture audit.',
    ctaDescription:
      'Forensic inspection of your current indexation, crawl budget, and migration risk profile. Reviewed by a senior practitioner within one business day.',
    ctaBanner: 'graphite',
    watermark: 'SEARCH',
  },
  systems: {
    heroImage: '/images/cinematic/discipline-systems.jpg',
    heroAlt: 'Server hardware and telemetry systems — the infrastructure layer of autonomous AI workflows',
    heroTheme: 'petrol',
    accentStripText:
      'AUTONOMOUS SYSTEMS — Deterministic AI agents. Stripe billing pipelines. PostgreSQL data infrastructure engineered to eliminate operational bottlenecks at scale.',
    accentRule: 'var(--color-petrol)',
    midPlateSlug: 'drawdown',
    midPlateAnnotation: 'DRAWDOWN TRADING // REAL-TIME QUANTITATIVE TERMINAL',
    midPlateMetadata: 'VERIFIED SYSTEMS DEPLOYMENT · UNITED KINGDOM',
    ctaHeadline: 'Commission an intelligent',
    ctaItalic: 'system architecture.',
    ctaDescription:
      'Describe the workflow you need to automate. All SYSTEMS enquiries are reviewed by a senior practitioner with deep AI and data infrastructure expertise.',
    ctaBanner: 'petrol',
    watermark: 'SYSTEMS',
  },
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
    ogImage: DISCIPLINE_CONFIG[slug]?.heroImage ?? service.heroImage,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const config = DISCIPLINE_CONFIG[slug]

  // Retrieve case studies verified for this service
  const relatedCaseStudies = (service.caseStudySlugs ?? [])
    .map((s) => getVerifiedCaseStudyBySlug(s))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs))

  // Retrieve related Lobby articles for this service
  const relatedArticles = service.relatedLobbySlugs
    ? (await Promise.all(service.relatedLobbySlugs.map((s) => getArticleBySlug(s))))
        .filter((a): a is NonNullable<typeof a> => Boolean(a))
    : []

  // Mid-page plate image
  const midPlateImage = config
    ? (CINEMATIC_MAP[config.midPlateSlug] ?? `/images/projects/${config.midPlateSlug}/hero.webp`)
    : null

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
        image={config?.heroImage ?? service.heroImage ?? '/images/positioning/manifesto.jpg'}
        imageAlt={config?.heroAlt ?? service.heroAlt ?? `${service.title} engineering showcase`}
        metaLeft={service.metaLeft ?? `AVORRIA // ${service.title.toUpperCase()}`}
        metaRight={service.metaRight ?? 'ENTERPRISE SPECIFICATION · UNITED KINGDOM'}
        theme={config?.heroTheme ?? 'graphite'}
      />

      {/* ── 01a // Discipline Accent Strip ───────────────────────────────── */}
      {config && (
        <div
          className="w-full bg-[var(--color-graphite)] border-b border-white/10"
          aria-hidden="true"
        >
          <div className="w-full px-6 md:px-10 lg:px-[7vw] py-5 flex items-center gap-5">
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ backgroundColor: config.accentRule }}
            />
            <p className="text-[0.6875rem] tracking-[0.18em] uppercase font-light text-white/50 leading-relaxed">
              {config.accentStripText}
            </p>
          </div>
        </div>
      )}

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

                <SectionHeading
                  number="01"
                  eyebrow="COMMERCIAL PROBLEM"
                  accentEyebrow="rose"
                  title={service.problemTitle ?? 'The hidden liabilities of standard delivery.'}
                  description={service.problemStatement}
                  align="left"
                  className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  <div className="lg:col-start-7 lg:col-span-6 space-y-6 text-secondary font-light leading-relaxed">
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

                <SectionHeading
                  number="02"
                  eyebrow="METHODOLOGY & DELIVERY"
                  title={service.approachTitle ?? 'Systematic execution framework.'}
                  italicAccent="Precisely."
                  description={service.approachStatement ?? 'Discrete engineering milestones with zero speculative ambiguity.'}
                  align="left"
                  className="mb-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[var(--color-border)] bg-[var(--color-ivory-light)]">
                  {service.approachSteps.map((step, idx) => (
                    <RevealOnScroll key={step.step} delay={idx * 60}>
                      <div className="p-8 border-b md:border-b-0 border-r border-[var(--color-border)] h-full flex flex-col justify-between space-y-6 hover:bg-white transition-colors duration-200">
                        <div>
                          <span
                            className="block h-px w-8 mb-4"
                            style={{ backgroundColor: config?.accentRule ?? 'var(--color-rose-text)' }}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-light text-[var(--color-graphite-muted)] tracking-[0.2em] uppercase block mb-3">
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

              <SectionHeading
                number="03"
                eyebrow="VERIFIED CAPABILITIES"
                title="Scope of technical execution."
                description="Specialist capabilities delivered in-house under strict engineering contracts."
                align="left"
                className="mb-10"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.capabilities.map((cap, i) => (
                  <RevealOnScroll key={i} delay={i * 50}>
                    <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 hover:border-[var(--color-border-strong)] hover:bg-white transition-all duration-300 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
                          <span>SPECIFICATION 0{i + 1}</span>
                          <span
                            style={{ color: config?.accentRule ?? 'var(--color-rose-text)' }}
                          >
                            IN-HOUSE
                          </span>
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

          </div>
        </div>
      </div>

      {/* ── 04a // Mid-Page Cinematic Evidence Plate ─────────────────────────── */}
      {midPlateImage && config && (
        <div className="w-full px-6 md:px-10 lg:px-[7vw] bg-[var(--color-ivory)] pb-20">
          <RevealOnScroll>
            <CinematicPlate
              src={midPlateImage}
              alt={config.midPlateAnnotation}
              aspectRatio="21/9"
              sizes="(min-width: 1024px) 86vw, 100vw"
              annotation={config.midPlateAnnotation}
              metadata={config.midPlateMetadata}
              accentColor={config.accentRule}
            />
          </RevealOnScroll>
        </div>
      )}

      <div className="bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* ── 05 // Case Study Evidence & Verified Deployments ──────────────── */}
            {relatedCaseStudies.length > 0 && (
              <section className="py-20 mb-8 border-b border-[var(--color-border)]" aria-label="Related case studies">

                <SectionHeading
                  number="04"
                  eyebrow="VERIFIED PROOF"
                  title="Demonstrable production work."
                  description="Grounded in real production deployments. Zero simulated benchmarks or fabricated metrics."
                  align="left"
                  className="mb-10"
                />

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

            {/* ── 05a // Related Technical Intelligence — The Lobby ──────────────── */}
            {relatedArticles.length > 0 && (
              <section className="py-20 mb-8 border-b border-[var(--color-border)]" aria-label="Technical intelligence from The Lobby">

                <SectionHeading
                  number="05"
                  eyebrow="TECHNICAL INTELLIGENCE"
                  title="Engineering methodology behind the work."
                  description="Technical teardowns, diagnostic frameworks, and architectural essays from The Lobby — the thinking that informs how we build."
                  align="left"
                  className="mb-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((article, i) => (
                    <RevealOnScroll key={article.slug} delay={i * 60}>
                      <Link
                        href={`/lobby/${article.slug}`}
                        className="group border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6 hover:border-[var(--color-graphite)] transition-all duration-200 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] mb-3">
                            <span className="text-[var(--color-rose-text)]">{article.categoryLabel}</span>
                            <span>{article.readTimeMinutes} min read</span>
                          </div>
                          <h3 className="text-base font-light text-[var(--color-graphite)] mb-2 group-hover:text-[var(--color-rose-text)] transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed mb-4">
                            {article.dek}
                          </p>
                        </div>
                        <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite)] inline-flex items-center gap-1.5 pt-3 border-t border-[var(--color-border)]">
                          Read Analysis <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>
            )}

            {/* ── 06 // Technology Ecosystem ───────────────────────────────────── */}
            {service.technology && service.technology.length > 0 && (
              <section className="py-20 mb-8 border-b border-[var(--color-border)]" aria-label="Technology foundation">

                <SectionHeading
                  number="06"
                  eyebrow="TECHNOLOGY FOUNDATION"
                  title="Modern, resilient stack."
                  description="Selected for extreme stability, sub-second latency, and long-term maintainability."
                  align="left"
                  className="mb-8"
                />

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
              <section className="py-20 mb-8 border-b border-[var(--color-border)]" aria-label="Frequently asked questions">

                <SectionHeading
                  number="07"
                  eyebrow="QUESTIONS & SPECIFICATIONS"
                  title={service.faqTitle ?? 'Frequently answered questions.'}
                  description="Clear technical answers to common commercial scoping inquiries."
                  align="left"
                  className="mb-10"
                />

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
            <section className="py-16 mb-8" aria-label="Related studio capabilities">
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

          </div>
        </div>
      </div>

      {/* ── 09 // Closing Commercial CTA — CtaBanner ────────────────────────── */}
      <CtaBanner
        eyebrow={`COMMISSIONS OPEN // ${(service.title.split('// ')[1] ?? 'STUDIO').toUpperCase()}`}
        headline={config?.ctaHeadline ?? `Ready to initiate ${service.title.split('// ')[1] ?? 'your project'}?`}
        italicAccent={config?.ctaItalic}
        description={
          config?.ctaDescription ??
          'Tell us what you are building. All inquiries are evaluated directly by senior engineering principals within one business day.'
        }
        primaryCta={{ label: 'Start a Project', href: '/start-a-project' }}
        secondaryCta={{ label: 'Contact Studio', href: '/contact' }}
        theme={config?.ctaBanner ?? 'wine'}
        watermark={config?.watermark ?? 'AVORRIA'}
      />
    </>
  )
}
