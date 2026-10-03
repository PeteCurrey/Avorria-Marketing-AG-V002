'use client'

/**
 * Positioning — Chapter 01: Warm Ivory
 *
 * Visual chapter: warm ivory ground (#F6F4EF), editorial image composition
 * with no apologetic fade-out — the image is a confident rectangular plate.
 * A single left-edge fade blends into the ivory ground (not white).
 *
 * Requirements:
 * - Chapter 01: Warm Ivory ground
 * - Oversized section numeral: 01 (Work Sans 200, watermark)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Large-format art-directed visual plate (16:9), never text alone
 * - Image composition: confident, not dissolved — left fade to ivory only
 */

import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function Positioning() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="positioning-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        01
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header with Tracked Label and Monumental Statement */}
        <div className="max-w-[1200px] mb-16 lg:mb-24">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                01 // POSITIONING &amp; MANIFESTO
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <h2
              id="positioning-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2rem,4.8vw,5rem)] max-w-[18ch]"
            >
              Technology should{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                solve
              </em>{' '}
              something.
            </h2>
          </RevealOnScroll>
        </div>

        {/* Two-column layout: Narrative left, Large-format art-directed plate right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
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
              {/* Image plate — confident composition, left-edge fade to ivory only */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src="/images/positioning/manifesto.jpg"
                  alt="Precision engineering geometry — high-tolerance mechanical machining"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 55vw, 680px"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  style={{ objectPosition: '50% 50%' }}
                />
                {/* Single left-edge fade to warm ivory — directional, not dissolve */}
                <div
                  className="absolute inset-y-0 left-0 w-[18%] pointer-events-none"
                  style={{ background: 'linear-gradient(to right, var(--color-ivory) 0%, rgba(246,244,239,0) 100%)' }}
                />
                {/* Bottom vignette — grounds the image */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)' }}
                />
              </div>

              {/* Editorial image caption */}
              <div className="flex items-center justify-between pt-3 text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                  <span>PRECISION ENGINEERING // HIGH-TOLERANCE GEOMETRY</span>
                </span>
                <span>REF. AV-2025-01</span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
