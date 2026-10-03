'use client'

/**
 * TeamSection — Meet the Team / Specialist Capability
 *
 * Communicates:
 * - Peter founded Avorria, but delivery is powered by a collective of senior specialists.
 * - Avorria is not a one-person operation, nor a traditional bloated agency.
 * - Direct senior practitioner engagement — no junior queues, no account managers.
 * - Does not invent fictional team members; communicates real specialist disciplines.
 */

import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TeamDiscipline {
  index: string
  title: string
  role: string
  statement: string
  deliverables: string[]
}

const DISCIPLINES: TeamDiscipline[] = [
  {
    index: '01',
    title: 'Technical Architecture & Cloud Engineering',
    role: 'Systems Architecture',
    statement:
      'Server-first Next.js 16 App Router engineering, distributed database models, and resilient edge deployments engineered for sub-second execution.',
    deliverables: [
      'Strict TypeScript contracts',
      'PostgreSQL & PostGIS spatial models',
      'Zero-downtime Blue/Green pipelines',
      '100/100 Core Web Vitals compliance',
    ],
  },
  {
    index: '02',
    title: 'Digital Product & Editorial Design',
    role: 'Visual & Interaction Direction',
    statement:
      'Architectural visual systems, surgical typography, and tactile interaction design that communicate institutional authority without decorative excess.',
    deliverables: [
      'Design token architectures (CSS variables)',
      'High-contrast editorial typography',
      'Interactive prototyping & micro-states',
      'WCAG AAA accessible colour hierarchies',
    ],
  },
  {
    index: '03',
    title: 'Commercial Systems & Data Telemetry',
    role: 'Infrastructure & Integration',
    statement:
      'Financial infrastructure, server-side attribution pipelines, and automated background routines that transform isolated websites into connected operating assets.',
    deliverables: [
      'Stripe commercial payment infrastructure',
      'PostGIS cadastral & GIS data pipelines',
      'Autonomous worker queues & scheduled jobs',
      'Real-time Canvas & WebGL risk terminals',
    ],
  },
  {
    index: '04',
    title: 'Technical Search & Systematic Governance',
    role: 'Search Architecture',
    statement:
      'Enterprise crawl budget engineering, Schema.org semantic entity graphs, and high-risk migration safeguards that protect and expand organic revenue.',
    deliverables: [
      'Zero-loss 301 migration ledgers',
      'Entity graph & knowledge panel mapping',
      'Automated schema generation pipelines',
      'Multi-domain consolidation architecture',
    ],
  },
]

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)]"
      aria-labelledby="team-heading"
    >
      {/* ── Background Numeral Watermark ────────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.03] leading-none"
        aria-hidden="true"
      >
        05
      </div>

      <div className="container-max">
        <div className="container-content">
          {/* Section Header */}
          <div className="max-w-[1200px] mb-16 lg:mb-20">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                  05 // THE PEOPLE BEHIND THE WORK
                </span>
                <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>

              <h2
                id="team-heading"
                className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.5rem)] mb-8"
              >
                MEET THE{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  TEAM.
                </em>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-6 border-t border-[var(--color-border)]">
                <div className="lg:col-span-6">
                  <p className="text-xl font-light text-[var(--color-graphite)] leading-relaxed">
                    Peter founded Avorria with a conviction that digital systems should solve real
                    commercial problems. Delivering high-stakes flagships, geospatial platforms, and
                    autonomous systems requires dedicated specialist disciplines.
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    Avorria is powered by a trusted collective of senior practitioners across systems
                    architecture, interaction design, data infrastructure, and technical search.
                    We deliberately operate without account managers, offshore handoffs, or junior
                    delivery queues. Every client collaborates directly with the senior specialist
                    who authors both the architecture and the production code.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Specialist Practice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
            {DISCIPLINES.map((d, i) => (
              <RevealOnScroll key={d.index} delay={i * 80}>
                <div className="border border-[var(--color-border)] bg-white p-8 md:p-10 hover:border-[var(--color-border-strong)] transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Discipline Telemetry Header */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)] text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                        <span>DISCIPLINE {d.index}</span>
                      </span>
                      <span>{d.role}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extralight text-[var(--color-graphite)] tracking-tight mb-4">
                      {d.title}
                    </h3>

                    <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                      {d.statement}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-border)]">
                    <span className="text-[10px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] block mb-3">
                      CORE CAPABILITIES
                    </span>
                    <ul className="space-y-2">
                      {d.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs font-light text-[var(--color-graphite-mid)] flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Delivery Standard Banner */}
          <RevealOnScroll delay={200}>
            <div className="border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-rose-text)] block mb-1">
                  DELIVERY INTEGRITY STANDARD
                </span>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] max-w-[68ch] leading-relaxed">
                  Every engagement is staffed exclusively by senior practitioners with deep domain
                  mastery. We do not use account managers, project coordinators, or delegated junior
                  queues. The people who scope your architecture are the people who engineer it.
                </p>
              </div>
              <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] shrink-0 border border-[var(--color-border)] px-3 py-1.5 self-start md:self-auto">
                SENIOR PRACTITIONERS ONLY
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
