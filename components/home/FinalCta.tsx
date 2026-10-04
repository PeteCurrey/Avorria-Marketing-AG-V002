'use client'

/**
 * FinalCta — Chapter 08: Wine Chapter (#4A1F27)
 *
 * Immersive deep Wine chapter grounding the homepage with quiet confidence.
 * Monumental typography in Ivory, Rose Light emphasis, Rose architectural hairline.
 */

import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function FinalCta() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-wine)', color: 'var(--color-ivory)' }}
      data-chapter="wine"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] py-24 lg:py-32">
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Rose architectural accent rule */}
            <div
              className="w-20 h-[2px] mb-8"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            />

            {/* Monumental Headline */}
            <h2
              id="final-cta-heading"
              className="font-extralight leading-[1.02] tracking-[-0.03em] text-[clamp(2.75rem,7vw,7.5rem)] mb-8"
              style={{ color: 'var(--color-ivory)' }}
            >
              Have something worth{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-accent-light)' }}>
                building?
              </em>
            </h2>

            {/* Supporting Copy */}
            <p className="text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed" style={{ color: 'var(--color-ivory)', opacity: 0.8 }}>
              We partner with ambitious enterprises and founders who require bespoke digital flagships,
              low-latency web systems, and server-side intelligence engineered to exacting tolerances.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button as="link" href="/start-a-project" variant="primary" size="lg" className="!bg-[var(--color-ivory)] !text-[var(--color-graphite)] hover:!bg-white">
                Start a project <span className="btn-arrow" aria-hidden="true">↗</span>
              </Button>
              <Button
                as="link"
                href="/contact"
                variant="secondary"
                size="lg"
                className="btn-dark-outline"
              >
                Direct studio channel
              </Button>
            </div>

            {/* Architectural Footer Bar */}
            <div
              className="mt-20 pt-8 flex flex-wrap items-center justify-between gap-6 text-[10px] tracking-[0.2em] font-light"
              style={{ borderTop: '1px solid rgba(247,245,240,0.15)', color: 'var(--color-ivory)', opacity: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <span>Avorria digital studio</span>
                <span>·</span>
                <span>London &amp; global</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Direct principal engagement</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
