'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// ─── Data ────────────────────────────────────────────────────────────────────

interface ProcessStep {
  index: string
  label: string
  statement: string
  description: string
  deliverable: string
  image: string
  imageCaption: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    label: 'Understand',
    statement: 'We diagnose the core commercial friction before drafting architecture.',
    description:
      'We interrogate the business model, unit economics, and operator workflows. Technology is only valuable if it resolves genuine commercial bottlenecks.',
    deliverable: 'Commercial Diagnostic & Strategic Scope',
    image: '/images/process/01-understand.svg',
    imageCaption: 'Phase 01 Artifact: Operational friction diagnosis & unit economic scoping',
  },
  {
    index: '02',
    label: 'Architect',
    statement: 'We design the system model before we design the screen.',
    description:
      'Database schemas, caching hierarchies, route boundaries, and third-party integrations are specified prior to interface styling. Structure precedes surface.',
    deliverable: 'System Topology & Relational Data Schemas',
    image: '/images/process/02-architect.svg',
    imageCaption: 'Phase 02 Artifact: Service topology & relational schema specification',
  },
  {
    index: '03',
    label: 'Design',
    statement: 'Purposeful, surgical design that serves the operator and customer.',
    description:
      'Editorial typography, restrained palette, zero decorative fluff. Every pixel, line-height, and interaction is engineered to convey credibility and precision.',
    deliverable: 'Design Tokens & Interactive Prototype',
    image: '/images/process/03-design.svg',
    imageCaption: 'Phase 03 Artifact: Typography tokens, spatial grid & accessibility audit',
  },
  {
    index: '04',
    label: 'Engineer',
    statement: 'Built to production grade with Next.js App Router and strict TypeScript.',
    description:
      'Server-first execution, strict static rendering, optimal Core Web Vitals, and strict accessibility. Zero monolithic themes or fragile plugin stacks.',
    deliverable: 'Versioned Production Repository',
    image: '/images/process/04-engineer.svg',
    imageCaption: 'Phase 04 Artifact: Full-stack repository & strict TypeScript contracts',
  },
  {
    index: '05',
    label: 'Validate',
    statement: 'Tested under adversarial real-world conditions.',
    description:
      'Rigorous automated contrast testing, sub-second latency verification, edge caching checks, and cross-device visual parity inspections.',
    deliverable: 'Lighthouse 100 & WCAG AAA Compliance Audit',
    image: '/images/process/05-validate.svg',
    imageCaption: 'Phase 05 Artifact: Lighthouse 100 benchmark & adversarial contrast audit',
  },
  {
    index: '06',
    label: 'Launch',
    statement: 'Deliberate, monitored, zero-downtime deployment.',
    description:
      'Zero-equity-loss search redirect mapping, DNS cutover orchestration, and real-time observability telemetry on production traffic.',
    deliverable: 'Zero-Downtime Production Cutover',
    image: '/images/process/06-launch.svg',
    imageCaption: 'Phase 06 Artifact: Zero-downtime cutover & edge observability telemetry',
  },
  {
    index: '07',
    label: 'Improve',
    statement: 'Iterative optimisation informed by real user telemetry.',
    description:
      'Continuous conversion telemetry, search dominance expansion, and performance monitoring to ensure systems compound in value over time.',
    deliverable: 'Quarterly Telemetry & Conversion Iteration',
    image: '/images/process/07-improve.svg',
    imageCaption: 'Phase 07 Artifact: Compounding conversion yield & quarterly iteration cycle',
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
    (index: number) => (el: HTMLElement | null) => {
      cardsRef.current[index] = el
    },
    [],
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId: number | null = null
    let isIntersecting = false

    function computeActiveStep() {
      if (!isIntersecting) return

      const focalY = window.innerHeight * 0.42
      let closestIdx = 0
      let closestDist = Infinity

      cardsRef.current.forEach((card, idx) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height * 0.45
        const dist = Math.abs(cardCenter - focalY)

        if (dist < closestDist) {
          closestDist = dist
          closestIdx = idx
        }
      })

      setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev))
    }

    function onScroll() {
      if (!isIntersecting) return
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(computeActiveStep)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting) {
          computeActiveStep()
          window.addEventListener('scroll', onScroll, { passive: true })
        } else {
          window.removeEventListener('scroll', onScroll)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [sectionRef])

  return { activeIndex, setRef }
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { activeIndex, setRef } = useActiveStep(sectionRef, PROCESS_STEPS.length)

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)] bg-white"
      aria-labelledby="process-heading"
    >
      {/* ── Background architectural numeral ───────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.035] leading-none"
        aria-hidden="true"
      >
        05
      </div>

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
                05 // PROCESS & METHODOLOGY
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
              Our methodology is engineered to deliver reliable, high-performance digital systems —
              grounded in commercial reality, not agency pitch theatre.
            </p>

            {/* Active stage indicator — desktop editorial tracker */}
            <div
              className="hidden lg:block mb-10 process-stage-indicator"
              aria-hidden="true"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.625rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)]">
                  ACTIVE METHODOLOGY PHASE
                </span>
                <span className="text-[0.6875rem] tracking-[0.16em] uppercase font-light text-[var(--color-rose-text)]">
                  0{activeIndex + 1} / 0{PROCESS_STEPS.length}
                </span>
              </div>

              <p className="text-xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] transition-all duration-300">
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

            {/* CTA */}
            <div className="hidden lg:block">
              <Button as="link" href="/process" variant="secondary" size="md">
                View Full Methodology Spec ↗
              </Button>
            </div>
          </div>

          {/* ── RIGHT — Scrolling cards column with Visual Artifacts ───────── */}
          <div className="pt-0">
            <div className="space-y-10 lg:space-y-14">
              {PROCESS_STEPS.map((step, i) => {
                const isActive = i === activeIndex
                return (
                  <article
                    key={step.index}
                    ref={setRef(i)}
                    data-step-index={i}
                    className={[
                      'border transition-all duration-500 rounded-[var(--radius-sm)] p-8 md:p-10 lg:p-12',
                      isActive
                        ? 'border-[var(--color-graphite)] bg-white shadow-md'
                        : 'border-[var(--color-border)] bg-transparent opacity-85',
                    ].join(' ')}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Card header */}
                    <div className="flex items-baseline justify-between gap-4 pb-5 mb-6 border-b border-[var(--color-border)]">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.2em] font-light uppercase text-[var(--color-graphite-muted)]">
                          PHASE {step.index}
                        </span>
                        <span className="text-[var(--color-border-strong)] text-sm">/</span>
                        <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em]">
                          {step.label}
                        </h3>
                      </div>
                      <span className="text-2xl font-extralight text-[var(--color-graphite-muted)] tabular-nums">
                        {step.index}
                      </span>
                    </div>

                    {/* Main statement */}
                    <p className="text-lg md:text-xl font-extralight text-[var(--color-graphite)] leading-snug mb-4">
                      {step.statement}
                    </p>

                    {/* Narrative description */}
                    <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Visual Artifact Preview */}
                    <div className="relative w-full aspect-[16/9] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-6">
                      <Image
                        src={step.image}
                        alt={step.imageCaption}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 right-4 text-[9px] tracking-[0.14em] uppercase font-light text-white/80">
                        {step.imageCaption}
                      </div>
                    </div>

                    {/* Deliverable detail */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                      <span>VERIFIED DELIVERABLE:</span>
                      <span className="text-[var(--color-graphite)] font-light">
                        {step.deliverable}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="h-[4rem] lg:h-[6rem]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
