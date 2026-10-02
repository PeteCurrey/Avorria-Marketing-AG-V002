'use client'

import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * FinalCta — Commission Intake & Closing
 *
 * Requirements:
 * - Work Sans only (no font-mono)
 * - Monumental display scale contrast
 * - High-contrast accessible buttons
 */

export function FinalCta() {
  return (
    <section
      className="section-y-large relative border-t border-[var(--color-border)] bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        <RevealOnScroll>
          {/* Architectural Frame Wrapper */}
          <div className="border border-[#2E2B27] bg-[#121110] text-[#EFECE6] p-8 md:p-16 lg:p-20 relative overflow-hidden">
            {/* Subtle architectural background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A4845" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
                <line x1="0" y1="100%" x2="100%" y2="0" stroke="#9A4A53" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>

            {/* Registration corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8A8784]" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#8A8784]" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#8A8784]" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8A8784]" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-[var(--color-rose-text)]" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-light text-[#A09D97]">
                  AVORRIA COMMISSIONS // INTAKE OPEN
                </p>
              </div>

              <h2
                id="final-cta-heading"
                className="font-extralight text-[#F7F5F0] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] mb-8 max-w-[18ch]"
              >
                Have something worth{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  building?
                </em>
              </h2>

              <p className="text-base md:text-lg font-light text-[#C8C4BE] max-w-xl mb-10 leading-relaxed">
                We partner with ambitious enterprises and founders who require bespoke digital flagships,
                low-latency web systems, and server-side intelligence engineered to exacting tolerances.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Button as="link" href="/start-a-project" variant="primary" size="lg">
                  Start a project <span className="btn-arrow" aria-hidden="true">↗</span>
                </Button>
                <Button
                  as="link"
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="border-[#4A4845] text-[#F7F5F0] hover:bg-[#1E1C1A]"
                >
                  Get in touch
                </Button>
              </div>

              <div className="mt-14 pt-6 border-t border-[#2A2724] flex flex-wrap items-center justify-between gap-4 text-[9px] tracking-[0.18em] uppercase font-light text-[#8A8784]">
                <span>ZERO PITCH THEATRE</span>
                <span>•</span>
                <span>DIRECT PRINCIPAL ENGAGEMENT</span>
                <span>•</span>
                <span>LONDON / GLOBAL</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
