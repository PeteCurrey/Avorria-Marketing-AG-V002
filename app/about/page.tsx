import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { FounderSection } from '@/components/about/FounderSection'
import { TeamSection } from '@/components/about/TeamSection'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'About // Studio Charter, Engineering Principles & Operational Philosophy',
  description:
    'Avorria is an independent digital engineering studio. We combine architectural design, strict TypeScript engineering, and commercial systems for ambitious operators.',
  path: '/about',
})

const DISCIPLINES = [
  {
    title: '01 // Build',
    description: 'High-performance digital flagships, bespoke web software, and interactive platforms engineered with surgical typography and instant LCP.',
    href: '/services/build',
  },
  {
    title: '02 // Search',
    description: 'Enterprise technical search architecture, high-risk migration safeguards, semantic entity graphs, and organic market dominance.',
    href: '/services/search',
  },
  {
    title: '03 // Systems',
    description: 'Commercial data infrastructure, Stripe billing pipelines, autonomous scout engines, and real-time operational telemetry.',
    href: '/services/systems',
  },
]

const WHAT_WE_REFUSE = [
  {
    principle: 'NO THIRD-PARTY THEMES OR TEMPLATES',
    explanation: 'We do not build on bloated commercial themes, page builders, or fragile plugin ecosystems. Every line of markup and CSS is authored intentionally for the specific engagement.',
  },
  {
    principle: 'ZERO SYNTHETIC OR HALLUCINATED METRICS',
    explanation: 'We never fabricate commercial results, fake client logos, or exaggerate performance claims. Our portfolio consists exclusively of verified production deployments.',
  },
  {
    principle: 'NO UNNECESSARY CLIENT-SIDE JAVASCRIPT',
    explanation: 'We default to React Server Components and server-side execution. If an interaction does not genuinely require client state, it runs on the server with zero browser overhead.',
  },
  {
    principle: 'NO UNACCOUNTABLE RETAINER DRIFT',
    explanation: 'We do not sell vague monthly retainers that convert into passive maintenance invoices. Work is scoped in discrete, demonstrable engineering milestones with clear deliverables.',
  },
]

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteConfig.url}/about#webpage`,
        name: 'About Avorria',
        description: 'Studio charter, engineering principles, and operational philosophy of Avorria.',
        url: `${siteConfig.url}/about`,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        mainEntity: {
          '@id': `${siteConfig.url}/about#founder`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.url}/about` },
          ],
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/about#founder`,
        name: 'Peter Currey',
        jobTitle: 'Founder & Principal',
        worksFor: {
          '@id': `${siteConfig.url}/#organization`,
        },
        description:
          'Directs digital architecture and software engineering at Avorria. Specialises in high-concurrency web systems, technical SEO engineering, and forensic UX teardowns.',
        sameAs: [
          'https://linkedin.com/company/avorria',
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* ── 01 // Introduction: PageHero ──────────────────────────────────── */}
      <PageHero
        eyebrow="STUDIO / ABOUT"
        headline={[
          { before: 'An engineering studio' },
          { before: 'that', accent: 'builds things.' },
        ]}
        body="Avorria is an independent digital studio combining strategy, design, and technical engineering. We partner with operators who understand that digital surfaces directly reflect the calibre of their organisation."
        primaryCta={{ label: 'Start a project ↗', href: '/start-a-project' }}
        secondaryCta={{ label: 'View our work', href: '/work' }}
        image="/images/cinematic/discipline-strategy.jpg"
        imageAlt="Architectural drafting studio — precision engineering specifications and design systems"
        metaLeft="INDEPENDENT STUDIO // EST. LONDON 2025"
        metaRight="OWNER-LED — NO ACCOUNT MANAGERS"
      />

      {/* ── 02 Philosophy / Belief & 03 What We Build ─────────────────────── */}
      <div className="section-y-large bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* 02 // Philosophy / Belief: Two-Column Editorial Thesis */}
            <section className="mb-24 border-b border-[var(--color-border)] pb-20" aria-label="Studio philosophy">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <RevealOnScroll>
                  <SectionHeading
                    number="01"
                    eyebrow="PURPOSE & POSITIONING"
                    title="Technology must earn its place."
                    align="left"
                    className="mb-6"
                  />
                  <div className="space-y-6 text-secondary leading-relaxed font-light">
                    <p className="text-xl text-[var(--color-graphite)] font-light leading-relaxed">
                      Most digital agencies design to win portfolio awards rather than solve commercial problems. We take a different position: technology is only valuable when it improves a process, eliminates friction, or creates durable commercial leverage.
                    </p>
                    <p>
                      We operate without account managers, offshore handoffs, or junior delivery queues. When you partner with Avorria, you collaborate directly with senior practitioners who author both the architectural specification and the production code.
                    </p>
                    <p>
                      We build digital flagships, high-frequency trading terminals, geospatial intelligence platforms, and automated workflow engines. The common thread is technical precision and operational reliability.
                    </p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                  <SectionHeading
                    number="02"
                    eyebrow="ARCHITECTURAL CONVERGENCE"
                    title="One coherent digital apparatus."
                    align="left"
                    className="mb-6"
                  />
                  <div className="space-y-6 text-secondary leading-relaxed font-light">
                    <p className="text-xl text-[var(--color-graphite)] font-light leading-relaxed">
                      The boundaries between website, application, data, and AI have dissolved. Modern commercial success requires them to function as a singular, coherent digital apparatus.
                    </p>
                    <p>
                      A beautiful marketing website that fails to synchronize with back-office databases is an expensive brochure. An intelligent AI agent without strict deterministic boundaries is a liability.
                    </p>
                    <p>
                      By maintaining deep in-house mastery across front-end rendering engines (Next.js 16, Three.js), spatial relational databases (PostgreSQL/PostGIS), and deterministic AI models, we deliver systems that compound in value over time.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            {/* 03 // What We Build: Core Technical Disciplines */}
            <section className="mb-24" aria-label="Core technical disciplines">
              <SectionHeading
                number="03"
                eyebrow="WHAT WE BUILD"
                title="Three compounding disciplines."
                align="left"
                className="mb-8"
              />
              <div className="space-y-0">
                {DISCIPLINES.map((d, i) => (
                  <RevealOnScroll key={d.title} delay={i * 60}>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 border-t border-[var(--color-border)] py-8 items-center">
                      <h3 className="text-2xl font-extralight text-[var(--color-graphite)]">{d.title}</h3>
                      <p className="text-secondary font-light text-sm">{d.description}</p>
                      <Button as="link" href={d.href} variant="ghost" size="sm" className="shrink-0">
                        Explore Discipline →
                      </Button>
                    </div>
                  </RevealOnScroll>
                ))}
                <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── 04 // Founder: Peter Currey ─────────────────────────────────────── */}
      <FounderSection />

      {/* ── 05 // Meet The Team: The People Behind The Work ─────────────────── */}
      <TeamSection />

      {/* ── 06 // What We Refuse ─────────────────────────────────────────────── */}
      <div className="section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            <section aria-label="Operational boundaries">
              <SectionHeading
                number="06"
                eyebrow="OPERATIONAL BOUNDARIES"
                accentEyebrow="rose"
                title="What we deliberately"
                italicAccent="refuse."
                align="left"
                className="mb-10"
              />

              <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 md:p-12 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {WHAT_WE_REFUSE.map((item, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 60}>
                      <div className="border-l border-[var(--color-border-strong)] pl-4 space-y-2">
                        <span className="text-xs font-light text-[var(--color-graphite)] uppercase tracking-wider block">
                          {item.principle}
                        </span>
                        <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── 07 // Final CTA — CtaBanner wine ─────────────────────────────────── */}
      <CtaBanner
        eyebrow="COMMISSIONS OPEN // ABOUT"
        headline="Initiate an exploratory"
        italicAccent="discussion."
        description="Tell us about the digital system or platform you need to build. Avorria operates as an owner-led studio — no account managers, no offshore handoffs."
        primaryCta={{ label: 'Start a project', href: '/start-a-project' }}
        secondaryCta={{ label: 'Contact Studio', href: '/contact' }}
        theme="wine"
        watermark="STUDIO"
      />
    </>
  )
}
