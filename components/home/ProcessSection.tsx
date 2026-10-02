'use client'

/**
 * ProcessSection — Chapter 05
 *
 * Requirements:
 * - Chapter 05: Warm Ivory ground
 * - Oversized section numeral: 05 (Work Sans 200)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Sticky left title column (desktop)
 * - Seven process steps cascading and revealing on scroll in right column
 */

import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

interface ProcessStep {
  index: string
  label: string
  statement: string
  description: string
  deliverable: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    label: 'Understand',
    statement: 'We diagnose the core commercial friction before drafting architecture.',
    description:
      'We interrogate the business model, unit economics, and operator workflows. Technology is only valuable if it resolves genuine commercial bottlenecks.',
    deliverable: 'DIAGNOSTIC MEMORANDUM // COMMERCIAL SCOPE',
  },
  {
    index: '02',
    label: 'Architect',
    statement: 'We design the system model before we design the screen.',
    description:
      'Database schemas, caching hierarchies, route boundaries, and third-party integrations are specified prior to interface styling. Structure precedes surface.',
    deliverable: 'SYSTEM TOPOLOGY // DATA SCHEMAS',
  },
  {
    index: '03',
    label: 'Design',
    statement: 'Purposeful, surgical design that serves the operator and customer.',
    description:
      'Editorial typography, restrained palette, zero decorative fluff. Every pixel, line-height, and interaction is engineered to convey credibility and precision.',
    deliverable: 'DESIGN TOKENS // INTERACTION PROTOTYPE',
  },
  {
    index: '04',
    label: 'Engineer',
    statement: 'Built to production grade with Next.js App Router and strict TypeScript.',
    description:
      'Server-first execution, strict static rendering, optimal Core Web Vitals, and strict accessibility. Zero monolithic themes or fragile plugin stacks.',
    deliverable: 'VERSIONED PRODUCTION REPOSITORY',
  },
  {
    index: '05',
    label: 'Validate',
    statement: 'Tested under adversarial real-world conditions.',
    description:
      'Rigorous automated contrast testing, sub-second latency verification, edge caching checks, and cross-device visual parity inspections.',
    deliverable: 'LIGHTHOUSE 100 // WCAG AAA AUDIT REPORT',
  },
  {
    index: '06',
    label: 'Launch',
    statement: 'Deliberate, monitored, zero-downtime deployment.',
    description:
      'Zero-equity-loss search redirect mapping, DNS cutover orchestration, and real-time observability telemetry on production traffic.',
    deliverable: 'ZERO-DOWNTIME CANARY DEPLOYMENT',
  },
  {
    index: '07',
    label: 'Improve',
    statement: 'Iterative optimization informed by real user telemetry.',
    description:
      'Continuous conversion telemetry, search dominance expansion, and performance monitoring to ensure systems compound in value over time.',
    deliverable: 'QUARTERLY PERFORMANCE & SCOUT ITERATION',
  },
]

export function ProcessSection() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        05
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Sticky Left Column: Title, Statement & Navigation ────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                  05 // PROCESS & METHODOLOGY
                </span>
                <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>

              <h2
                id="process-heading"
                className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] mb-8"
              >
                How we{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  work.
                </em>
              </h2>

              <p className="text-base md:text-lg font-light text-[var(--color-graphite-mid)] leading-relaxed mb-8 max-w-[36ch]">
                Our process is designed to engineer useful, reliable digital systems — not impressive-looking projects that fail to perform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button as="link" href="/process" variant="secondary" size="sm">
                  Read full methodology ↗
                </Button>
                <Button as="link" href="/start-a-project" variant="ghost" size="sm">
                  Initiate Stage 01
                </Button>
              </div>

              <div className="pt-8 border-t border-[var(--color-border)] mt-12 text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span>SEVEN-STAGE SYSTEMATIC DISCIPLINE</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── Right Column: Seven Cascading Steps ──────────────────────────── */}
          <div className="lg:col-span-7 space-y-12">
            {PROCESS_STEPS.map((step) => (
              <RevealOnScroll key={step.index}>
                <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 hover:border-[var(--color-border-strong)] transition-all duration-300">
                  {/* Step Header */}
                  <div className="flex items-baseline justify-between gap-4 pb-4 mb-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.2em] font-light text-[var(--color-rose-text)] uppercase">
                        STAGE {step.index}
                      </span>
                      <span className="text-[var(--color-graphite-muted)]">/</span>
                      <h3 className="text-lg md:text-xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em]">
                        {step.label}
                      </h3>
                    </div>
                    <span className="text-[9px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                      PROVENANCE PASS
                    </span>
                  </div>

                  {/* Core Statement */}
                  <p className="text-base md:text-lg font-light text-[var(--color-graphite)] leading-relaxed mb-3">
                    {step.statement}
                  </p>

                  {/* Description */}
                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Deliverable Badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-[9px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span>DELIVERABLE:</span>
                    <span className="text-[var(--color-graphite)]">{step.deliverable}</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
