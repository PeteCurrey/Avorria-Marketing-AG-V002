import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

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
 * CtaBanner — Phase 2 Reusable Conversion Banner
 *
 * Implements monumental architectural statement typography, watermarking,
 * and high-contrast dual CTA clusters across any chapter color theme.
 */
export function CtaBanner({
  eyebrow = 'COMMISSIONS OPEN',
  headline,
  italicAccent,
  description,
  primaryCta,
  secondaryCta,
  theme = 'wine',
  watermark = 'AVORRIA',
}: CtaBannerProps) {
  const isLight = theme === 'ivory'

  const themeStyles: Record<string, { bg: string; text: string; subtext: string; border: string }> = {
    wine: {
      bg: 'var(--color-wine)',
      text: 'var(--color-ivory)',
      subtext: 'rgba(247,245,240,0.75)',
      border: 'rgba(247,245,240,0.15)',
    },
    petrol: {
      bg: 'var(--color-petrol)',
      text: 'var(--color-ivory)',
      subtext: 'rgba(247,245,240,0.75)',
      border: 'rgba(247,245,240,0.15)',
    },
    graphite: {
      bg: 'var(--color-graphite)',
      text: 'var(--color-ivory)',
      subtext: 'rgba(247,245,240,0.75)',
      border: 'rgba(247,245,240,0.15)',
    },
    ivory: {
      bg: 'var(--color-ivory)',
      text: 'var(--color-graphite)',
      subtext: 'var(--color-graphite-mid)',
      border: 'var(--color-border)',
    },
  }

  const currentTheme = themeStyles[theme]

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      data-chapter={theme}
      aria-label="Conversion banner"
    >
      {/* Background Watermark */}
      {watermark && (
        <div
          className="absolute bottom-2 right-[4vw] pointer-events-none select-none text-[clamp(6rem,18vw,16rem)] font-extralight italic opacity-[0.03] leading-none tracking-tight"
          aria-hidden="true"
        >
          {watermark}
        </div>
      )}

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw]">
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
              <p className="text-[0.6875rem] tracking-[0.2em] uppercase font-light opacity-80">
                {eyebrow}
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-extralight leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.5rem)] mb-6">
              {headline}{' '}
              {italicAccent && (
                <em
                  className="not-italic italic font-extralight"
                  style={{
                    color: isLight ? 'var(--color-rose-text)' : 'var(--color-accent-light)',
                  }}
                >
                  {italicAccent}
                </em>
              )}
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg font-light max-w-2xl mb-10 leading-relaxed"
              style={{ color: currentTheme.subtext }}
            >
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                as="link"
                href={primaryCta.href}
                variant={isLight ? 'primary' : 'cobalt'}
                size="lg"
              >
                {primaryCta.label} <span aria-hidden="true">↗</span>
              </Button>
              {secondaryCta && (
                <Button
                  as="link"
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  className={!isLight ? 'btn-dark-outline' : ''}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>

            {/* Verification Line */}
            <div
              className="mt-16 pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase font-light opacity-60"
              style={{ borderTop: `1px solid ${currentTheme.border}` }}
            >
              <span>AVORRIA DIGITAL STUDIO</span>
              <span>ZERO SPECULATIVE PITCHING · DIRECT PRINCIPAL DELIVERY</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
