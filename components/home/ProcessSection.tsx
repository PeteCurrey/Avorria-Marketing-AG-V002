'use client'

/**
 * ProcessSection — Chapter 05
 *
 * Sticky split-scroll editorial experience.
 *
 * ARCHITECTURE:
 * - CSS `position: sticky` on the left column (38% width on desktop)
 * - Seven process cards scroll in natural document flow on the right (62% width)
 * - Section IntersectionObserver activates a passive rAF scroll monitor
 * - Active card determined precisely by focal line (42% viewport height)
 * - Bi-directional: scrolls up and down with seamless stage transitions
 * - End condition: after Card 07 (Improve), left column releases naturally
 * - Mobile: stacks vertically without sticky positioning, natural scroll flow
 * - prefers-reduced-motion: strips transforms/opacity, keeps sticky layout
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'

// ─── Data ────────────────────────────────────────────────────────────────────

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
    statement: 'Iterative optimisation informed by real user telemetry.',
    description:
      'Continuous conversion telemetry, search dominance expansion, and performance monitoring to ensure systems compound in value over time.',
    deliverable: 'QUARTERLY PERFORMANCE & SCOUT ITERATION',
  },
]

// ─── Hook: track active step bi-directionally via focal line ──────────────────

function useActiveStep(
  sectionRef: React.RefObject<HTMLElement | null>,
  count: number,
) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardsRef = useRef<(HTMLElement | null)[]>(Array(count).fill(null))

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      cardsRef.current[i] = el
    },
    [],
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId: number | null = null
    let inView = false

    const evaluate = () => {
      if (!inView) return
      // Focal point: 42% down the viewport (where reading eye rests adjacent to sticky header)
      const focalY = window.innerHeight * 0.42

      let bestIndex = 0
      for (let i = 0; i < cardsRef.current.length; i++) {
        const el = cardsRef.current[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // If this card's top has reached or passed the focal line, it is active
        if (rect.top <= focalY) {
          bestIndex = i
        }
      }

      setActiveIndex(bestIndex)
    }

    const onScroll = () => {
      if (!inView) return
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        evaluate()
        rafId = null
      })
    }

    // Observer monitors when the Process section is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) {
          evaluate()
          window.addEventListener('scroll', onScroll, { passive: true })
          window.addEventListener('resize', onScroll, { passive: true })
        } else {
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onScroll)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [count, sectionRef])

  return { activeIndex, setRef }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { activeIndex, setRef } = useActiveStep(sectionRef, PROCESS_STEPS.length)

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)] bg-[var(--color-ivory)]"
      aria-labelledby="process-heading"
      // NO overflow:hidden — preserves CSS position:sticky on left column
    >
      {/* ── Background architectural numeral ───────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.035] leading-none"
        aria-hidden="true"
      >
        05
      </div>

      {/* ── Section Container ──────────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-10 lg:px-[7vw] pt-20 lg:pt-[7rem] pb-20 lg:pb-[7rem]">
        {/* Desktop: 38% left column, 62% right column with generous whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,38%)_1fr] gap-12 lg:gap-16 xl:gap-24 items-start">

          {/* ── LEFT — Sticky narrative column ─────────────────────────────── */}
          <div
            className="lg:sticky"
            style={{ top: 'clamp(6rem, 11vh, 8.5rem)' }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                05 // PROCESS &amp; METHODOLOGY
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            {/* Heading */}
            <h2
              id="process-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.5rem)] mb-8"
            >
              How we{' '}
              <em
                className="not-italic italic font-extralight"
                style={{ color: 'var(--color-rose-text)' }}
              >
                work.
              </em>
            </h2>

            {/* Intro */}
            <p className="text-base md:text-lg font-light text-[var(--color-graphite-mid)] leading-relaxed mb-10 max-w-[34ch]">
              Our process is designed to engineer useful, reliable digital systems —
              not impressive-looking projects that fail to perform.
            </p>

            {/* Active stage indicator — desktop editorial tracker */}
            <div
              className="hidden lg:block mb-10 process-stage-indicator"
              aria-hidden="true"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.625rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)]">
                  ACTIVE STAGE
                </span>
                <span className="text-[0.6875rem] tracking-[0.16em] uppercase font-light text-[var(--color-rose-text)]">
                  0{activeIndex + 1} / 0{PROCESS_STEPS.length}
                </span>
              </div>

              <p className="text-[var(--text-small)] font-extralight text-[var(--color-graphite)] tracking-[-0.01em] transition-all duration-300">
                {PROCESS_STEPS[activeIndex].label}
              </p>

              {/* Progress bar */}
              <div
                className="mt-3 h-px bg-[var(--color-border)] w-full relative overflow-hidden"
                role="progressbar"
                aria-valuenow={activeIndex + 1}
                aria-valuemin={1}
                aria-valuemax={PROCESS_STEPS.length}
                aria-label={`Stage ${activeIndex + 1} of ${PROCESS_STEPS.length}`}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-graphite)] transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / PROCESS_STEPS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Step indicator bars */}
              <div className="flex gap-2 mt-3">
                {PROCESS_STEPS.map((step, i) => (
                  <div
                    key={step.index}
                    className="h-[2px] flex-1 transition-all duration-400 ease-out"
                    style={{
                      backgroundColor:
                        i <= activeIndex
                          ? 'var(--color-graphite)'
                          : 'var(--color-border)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button as="link" href="/process" variant="secondary" size="sm">
                Read full methodology ↗
              </Button>
              <Button as="link" href="/start-a-project" variant="ghost" size="sm">
                Initiate Stage 01
              </Button>
            </div>

            {/* Footnote rule */}
            <div className="pt-8 border-t border-[var(--color-border)] mt-12 text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
              <span>SEVEN-STAGE SYSTEMATIC DISCIPLINE</span>
            </div>
          </div>

          {/* ── RIGHT — Scrolling cards column ────────────────────────────── */}
          {/*
            Cards in normal document flow. The section's total height dictates
            the natural scroll travel. No overflow containers, no scroll hijacking.
          */}
          <div className="pt-0">
            <div className="space-y-8 lg:space-y-12">
              {PROCESS_STEPS.map((step, i) => {
                const isActive = i === activeIndex
                return (
                  <article
                    key={step.index}
                    ref={setRef(i)}
                    data-step-index={i}
                    className="process-step-card"
                    data-active={isActive ? 'true' : 'false'}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Top indicator rule — animates out on active */}
                    <div className="process-step-rule" aria-hidden="true" />

                    <div className="process-step-inner p-8 md:p-10 lg:p-12">
                      {/* Card header */}
                      <div className="flex items-baseline justify-between gap-4 pb-5 mb-6 border-b border-[var(--color-border)]">
                        <div className="flex items-center gap-3">
                          <span className="process-step-stage-label text-[10px] tracking-[0.2em] font-light uppercase transition-colors duration-300">
                            STAGE {step.index}
                          </span>
                          <span className="text-[var(--color-border-strong)] text-sm">/</span>
                          <h3 className="process-step-title text-xl md:text-2xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] transition-all duration-300">
                            {step.label}
                          </h3>
                        </div>
                        <span className="process-step-number text-[clamp(1.5rem,3vw,2.5rem)] font-extralight leading-none tracking-tight transition-all duration-300 tabular-nums select-none">
                          {step.index}
                        </span>
                      </div>

                      {/* Main statement */}
                      <p className="process-step-statement text-lg md:text-xl font-extralight text-[var(--color-graphite)] leading-snug mb-5 transition-all duration-300">
                        {step.statement}
                      </p>

                      {/* Narrative description */}
                      <p className="process-step-description text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed mb-8 transition-all duration-300">
                        {step.description}
                      </p>

                      {/* Deliverable stamp */}
                      <div className="flex items-center justify-between pt-5 border-t border-[var(--color-border)]">
                        <span className="text-[9px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                          DELIVERABLE SPECIFICATION:
                        </span>
                        <span className="process-step-deliverable text-[9px] tracking-[0.14em] uppercase font-light transition-colors duration-300">
                          {step.deliverable}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Natural trailing spacer — ensures Card 07 has its full reading moment before unpinning */}
            <div className="h-[4rem] lg:h-[6rem]" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  )
}
