'use client'

/**
 * Positioning — Chapter 01: Warm Ivory
 *
 * Visual chapter: warm ivory ground (#F7F5F0), confident rectangular plate
 * with no dissolve gradient fade. Stone on Ivory tone-on-tone sculptural numeral.
 */

import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnnotationLabel } from '@/components/art/AnnotationLabel'

export function Positioning() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] overflow-hidden"
      data-chapter="ivory"
      aria-labelledby="positioning-heading"
    >
      {/* ── Background Architectural Numeral: Stone on Ivory Tone-on-Tone ── */}
      <div
        className="absolute top-8 right-[7vw] numeral-stone-on-ivory opacity-60"
        aria-hidden="true"
      >
        01
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Label */}
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-10 lg:mb-14">
            <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
              01 — POSITIONING &amp; MANIFESTO
            </span>
            <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
          </div>
        </RevealOnScroll>

        {/* Two-column layout: Narrative left, Large-format art-directed plate right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Headline + Editorial Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <RevealOnScroll>
              <h2
                id="positioning-heading"
                className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.5rem)] max-w-[20ch]"
              >
                Technology should{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  solve
                </em>{' '}
                something.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <p className="text-[1.125rem] lg:text-[1.25rem] font-light text-[var(--color-graphite)] leading-relaxed">
                Too many digital projects are built to look impressive rather
                than to do something useful. We take a different position.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="text-[var(--color-graphite-mid)] font-light leading-relaxed">
                Avorria combines strategy, design and engineering to create
                digital products and systems that are precise, performant and
                purposeful. We work with businesses that want technology to
                actually do something — to improve a process, open a market,
                reduce friction or create something new.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <p className="text-[var(--color-graphite-mid)] font-light leading-relaxed">
                We build websites, web applications, AI implementations and
                connected digital systems. Often, the most valuable outcome
                is all three working together.
              </p>

              <div className="pt-6 border-t border-[var(--color-border)] mt-8 flex items-center text-[11px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span>EST. LONDON 2025</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Large-format Art-Directed Visual Plate */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={150}>
              {/* Art-Directed Visual Plate with faded gradient edges */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src="/images/positioning/manifesto.jpg"
                  alt="Precision engineering geometry"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 55vw, 680px"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  style={{ objectPosition: '50% 50%' }}
                />
                {/* Left fade */}
                <div
                  className="absolute inset-y-0 left-0 w-1/4 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to right, var(--color-ivory) 0%, transparent 100%)' }}
                  aria-hidden="true"
                />
                {/* Right fade */}
                <div
                  className="absolute inset-y-0 right-0 w-1/4 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to left, var(--color-ivory) 0%, transparent 100%)' }}
                  aria-hidden="true"
                />
                {/* Top fade */}
                <div
                  className="absolute inset-x-0 top-0 h-1/4 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to bottom, var(--color-ivory) 0%, transparent 100%)' }}
                  aria-hidden="true"
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to top, var(--color-ivory) 0%, transparent 100%)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Editorial Image Annotation */}
              <div className="pt-4 flex items-center justify-between">
                <AnnotationLabel accent="rose">
                  Precision Engineering Geometry
                </AnnotationLabel>
                <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                  LONDON STUDIO
                </span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
