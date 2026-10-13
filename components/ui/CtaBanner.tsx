import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export interface CtaBannerProps {
  eyebrow?: string
  headline: string
  italicAccent?: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  theme?: 'wine' | 'petrol' | 'graphite' | 'ivory'
  watermark?: string
}

/**
 * CtaBanner — Red Bull Dark Conversion Banner
 *
 * Implements monumental statement typography, watermarking,
 * and Red Bull pill CTAs across all inner pages.
 */
export function CtaBanner({
  eyebrow = 'COMMISSIONS OPEN',
  headline,
  italicAccent,
  description,
  primaryCta,
  secondaryCta,
  watermark = 'AVORRIA',
}: CtaBannerProps) {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28 bg-[#000F1E] border-t border-white/10 text-white"
      data-chapter="hero"
      aria-label="Conversion banner"
    >
      {/* Background Watermark */}
      {watermark && (
        <div
          className="absolute bottom-2 right-[4vw] pointer-events-none select-none text-[clamp(6rem,18vw,16rem)] font-extralight uppercase opacity-[0.03] leading-none tracking-tight"
          aria-hidden="true"
        >
          {watermark}
        </div>
      )}

      <div className="relative z-10 w-full mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 5vw, 5rem)' }}>
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Eyebrow Pill */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt, #3157FF)]" aria-hidden="true" />
              <p className="text-[0.6875rem] tracking-[0.2em] uppercase font-light text-white/60">
                {eyebrow}
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-extralight uppercase leading-[1.0] tracking-[-0.03em] text-[clamp(2.5rem,5.5vw,5.5rem)] mb-6">
              {headline}{' '}
              {italicAccent && (
                <span className="text-[var(--color-cobalt, #3157FF)]">
                  {italicAccent}
                </span>
              )}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg font-light text-white/70 max-w-2xl mb-10 leading-relaxed">
              {description}
            </p>

            {/* Red Bull Pill CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href={primaryCta.href}
                className="rb-pill-btn rb-pill-btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.875rem' }}
              >
                {primaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rb-pill-btn rb-pill-btn-tertiary"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {/* Verification Line */}
            <div
              className="mt-16 pt-6 flex flex-wrap items-center justify-between gap-4 text-[0.6875rem] tracking-[0.16em] uppercase font-light text-white/40 border-t border-white/10"
            >
              <span>AVORRIA DIGITAL PLATFORM</span>
              <span>DIRECT PRINCIPAL ENGAGEMENT · ZERO PITCH THEATRE</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
