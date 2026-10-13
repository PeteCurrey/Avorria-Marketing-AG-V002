'use client'

import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * FinalCta — Red Bull Dark Platform Commission Chapter
 *
 * Immersive deep navy/obsidian closing chapter with monumental typography,
 * pill action triggers, and verified performance guarantees.
 */
export function FinalCta() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#000F1E] border-t border-white/10 text-white"
      data-chapter="hero"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Monumental Watermark Typography: "AVORRIA" ── */}
      <div
        className="absolute bottom-4 right-[4vw] pointer-events-none select-none text-[clamp(8rem,22vw,20rem)] font-extralight uppercase text-white/[0.03] leading-none tracking-tight"
        aria-hidden="true"
      >
        AVORRIA
      </div>

      <div
        className="relative z-10 w-full mx-auto max-w-[1920px] py-24 lg:py-32"
        style={{ paddingInline: 'clamp(1.25rem, 5vw, 5rem)' }}
      >
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Eyebrow with Cobalt Pill */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-cobalt, #3157FF)]" aria-hidden="true" />
              <p className="text-[0.6875rem] tracking-[0.2em] uppercase font-light text-white/60">
                AVORRIA COMMISSIONS · ACTIVE INTAKE
              </p>
            </div>

            {/* Monumental Headline */}
            <h2
              id="final-cta-heading"
              className="font-extralight leading-[1.0] tracking-[-0.035em] text-[clamp(2.75rem,7vw,7rem)] uppercase mb-6"
            >
              Have something worth{' '}
              <span className="text-[var(--color-cobalt, #3157FF)]">
                building?
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl font-light text-white/70 max-w-2xl mb-10 leading-relaxed">
              We partner with forward-looking enterprises and founders who require custom digital flagships, high-frequency web systems, and autonomous AI pipelines engineered to exacting tolerances.
            </p>

            {/* Red Bull Pill CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/start-a-project"
                className="rb-pill-btn rb-pill-btn-primary"
                style={{ padding: '0.75rem 1.8rem', fontSize: '0.875rem' }}
              >
                Start a Project
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/contact"
                className="rb-pill-btn rb-pill-btn-tertiary"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.875rem' }}
              >
                Contact Studio
              </Link>
            </div>

            {/* Bottom Proof Band */}
            <div
              className="mt-16 pt-8 flex flex-wrap items-center justify-between gap-6 text-[0.6875rem] tracking-[0.16em] uppercase font-light text-white/40 border-t border-white/10"
            >
              <div className="flex items-center gap-4">
                <span>AVORRIA DIGITAL PLATFORM</span>
                <span>·</span>
                <span>LONDON &amp; GLOBAL</span>
              </div>
              <div className="flex items-center gap-4">
                <span>DIRECT PRINCIPAL ENGAGEMENT</span>
                <span>·</span>
                <span>ZERO PITCH THEATRE</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
