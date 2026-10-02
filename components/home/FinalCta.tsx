'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function FinalCta() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center bg-[#121110] text-[#EFECE6] overflow-hidden border-t border-[#2E2B27]"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Background Subtle Architectural Visual Layer (Echoing Hero) ─────── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden" aria-hidden="true">
        <Image
          src="/images/projects/alkota-bikes/hero-screenshot.png"
          alt="Architectural backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center scale-[1.04] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/80 to-[#121110]" />
      </div>

      {/* ── Watermark Studio Numeral ────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-[7vw] pointer-events-none select-none text-[clamp(8rem,20vw,16rem)] font-extralight text-white opacity-[0.02] leading-none"
        aria-hidden="true"
      >
        AV
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] py-24 lg:py-32">
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)] animate-pulse" />
              <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[#A09D97]">
                AVORRIA COMMISSIONS // INTAKE OPEN
              </p>
            </div>

            {/* Monumental Headline */}
            <h2
              id="final-cta-heading"
              className="font-extralight text-[#F7F5F0] leading-[1.02] tracking-[-0.03em] text-[clamp(2.75rem,7vw,7.5rem)] mb-8"
            >
              Have something worth{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                building?
              </em>
            </h2>

            {/* Supporting Copy */}
            <p className="text-lg md:text-xl font-light text-[#C8C4BE] max-w-2xl mb-12 leading-relaxed">
              We partner with ambitious enterprises and founders who require bespoke digital flagships,
              low-latency web systems, and server-side intelligence engineered to exacting tolerances.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button as="link" href="/start-a-project" variant="primary" size="lg">
                Start a project <span className="btn-arrow" aria-hidden="true">↗</span>
              </Button>
              <Button
                as="link"
                href="/contact"
                variant="secondary"
                size="lg"
                className="border-[#4A4845] text-[#F7F5F0] hover:bg-white hover:text-[#121110]"
              >
                Direct studio channel
              </Button>
            </div>

            {/* Architectural Footer Bar */}
            <div className="mt-20 pt-8 border-t border-[#262421] flex flex-wrap items-center justify-between gap-6 text-[10px] tracking-[0.2em] uppercase font-light text-[#8A8784]">
              <div className="flex items-center gap-4">
                <span>AVORRIA DIGITAL STUDIO</span>
                <span>//</span>
                <span>LONDON & GLOBAL</span>
              </div>
              <div className="flex items-center gap-4">
                <span>DIRECT PRINCIPAL ENGAGEMENT</span>
                <span>•</span>
                <span>ZERO PITCH THEATRE</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
