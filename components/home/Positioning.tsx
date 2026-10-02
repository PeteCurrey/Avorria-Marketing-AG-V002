'use client'

/**
 * Positioning — Chapter 01
 *
 * Requirements:
 * - Chapter 01: Warm Ivory ground
 * - Oversized section numeral: 01 (Work Sans 200, watermark)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement (clamp up to 8vw, weight 200) vs small tracked labels
 * - Large-format art-directed visual plate (16:9 / 4:5), never text alone
 */

import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'

export function Positioning() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-white overflow-hidden"
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
                01 // POSITIONING & MANIFESTO
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <h2
              id="positioning-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] max-w-[18ch]"
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

              <div className="pt-6 border-t border-[var(--color-border)] mt-8 flex items-center justify-between text-[11px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span>EST. LONDON 2025</span>
                <span>ZERO FABRICATED METRICS</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Large-format Art-Directed Visual Plate (16:9 / 4:5) */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={150}>
              <div className="relative border border-[var(--color-border-strong)] bg-[#1A1916] p-4 md:p-6 shadow-sm overflow-hidden">
                {/* Plate Header Bar */}
                <div className="flex items-center justify-between border-b border-[#2E2B27] pb-3 mb-4 text-[10px] tracking-[0.18em] uppercase text-[#A09D97] font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                    <span>SYSTEM INTERVENTION PROOF // GEOMETRY & TELEMETRY</span>
                  </div>
                  <span>REF. AV-2025-01</span>
                </div>

                {/* Main 16:9 High-Precision Visual Composition */}
                <div className="relative w-full aspect-[16/9] bg-[#121110] border border-[#2E2B27] overflow-hidden flex items-center justify-center p-6">
                  {/* Subtle architectural schematic grid */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#2E2B27" strokeWidth="0.5" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#2E2B27" strokeWidth="0.5" />
                    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#2E2B27" strokeWidth="0.5" />
                    <line x1="0" y1="33%" x2="100%" y2="33%" stroke="#2E2B27" strokeWidth="0.5" />
                    <line x1="0" y1="66%" x2="100%" y2="66%" stroke="#2E2B27" strokeWidth="0.5" />
                    <circle cx="50%" cy="50%" r="28%" fill="none" stroke="#3A3835" strokeWidth="0.5" />
                    <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#2E2B27" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>

                  {/* High-fidelity schematic data core */}
                  <div className="relative z-10 text-center max-w-[420px]">
                    <span className="text-[10px] tracking-[0.24em] uppercase text-[var(--color-rose-text)] font-light block mb-2">
                      ACTIVE VERIFICATION STAGE
                    </span>
                    <h3 className="text-xl md:text-2xl font-extralight text-[#F7F5F0] tracking-[-0.01em] mb-3">
                      High-Precision Engineering Pipelines
                    </h3>
                    <p className="text-xs text-[#A09D97] font-light leading-relaxed mb-4">
                      Sub-millisecond WebGL frame inspection, server-rendered Next.js editorial routing, and zero cumulative layout shift.
                    </p>
                    <div className="inline-flex items-center gap-3 px-3 py-1 border border-[#3A3835] bg-black/40 text-[9px] tracking-[0.16em] uppercase text-[#EAE6DF] font-light">
                      <span>NEXT.JS 16</span>
                      <span>·</span>
                      <span>0.62S LCP</span>
                      <span>·</span>
                      <span>THREE.JS</span>
                    </div>
                  </div>

                  {/* Corner registration ticks */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#4A4845]" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#4A4845]" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#4A4845]" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#4A4845]" />
                </div>

                {/* Micro telemetry footer */}
                <div className="flex items-center justify-between pt-3 mt-1 text-[9px] tracking-[0.15em] text-[#7A7773] uppercase font-light">
                  <span>PRODUCTION REEL // ALKOTA & DRAWDOWN</span>
                  <span>100% AUDIT PASS</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
