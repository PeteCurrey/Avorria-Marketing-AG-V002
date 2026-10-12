import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

export interface FullBleedMediaHeroProps {
  eyebrow: string
  title: string
  italicAccent?: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image: string
  imageAlt: string
  metadata?: Array<{ label: string; value: string }>
  theme?: 'graphite' | 'petrol' | 'wine'
}

/**
 * FullBleedMediaHero — Phase 2 Reusable Media-First Hero
 *
 * Implements Red Bull's signature full-viewport photographic lead
 * with deep architectural contrast, monumental typography, and action triggers.
 */
export function FullBleedMediaHero({
  eyebrow,
  title,
  italicAccent,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  metadata,
  theme = 'graphite',
}: FullBleedMediaHeroProps) {
  const themeBg = {
    graphite: 'var(--color-graphite)',
    petrol: 'var(--color-petrol)',
    wine: 'var(--color-wine)',
  }[theme]

  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col justify-end min-h-[92svh] lg:min-h-[96svh] w-full overflow-hidden"
      style={{ backgroundColor: themeBg }}
      data-chapter={theme}
      aria-label="Lead Story and Capabilities"
    >
      {/* ── Photographic Plate Background ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.04]"
        />
        {/* Multistage contrast gradient guaranteeing WCAG AAA text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(24,24,24,0.95) 0%, rgba(24,24,24,0.65) 45%, rgba(24,24,24,0.2) 80%, rgba(24,24,24,0.45) 100%)',
          }}
        />
      </div>

      {/* ── Content Foreground ── */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] pt-32 pb-14 md:pb-20">
        <RevealOnScroll>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
              <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-accent-light)] opacity-90">
                {eyebrow}
              </p>
            </div>

            {/* Monumental Title */}
            <h1 className="text-[clamp(2.75rem,7vw,7rem)] font-extralight tracking-[-0.03em] leading-[1.0] text-[var(--color-ivory)] mb-6">
              {title}{' '}
              {italicAccent && (
                <em
                  className="not-italic italic font-extralight"
                  style={{ color: 'var(--color-accent-light)' }}
                >
                  {italicAccent}
                </em>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl text-white/80 mb-8">
              {description}
            </p>

            {/* Actions Cluster */}
            <div className="flex flex-wrap items-center gap-4">
              <Button as="link" href={primaryCta.href} variant="cobalt" size="lg">
                {primaryCta.label} <span aria-hidden="true">↗</span>
              </Button>
              {secondaryCta && (
                <Button
                  as="link"
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  className="btn-dark-outline"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>

            {/* Bottom Metadata Registration */}
            {metadata && metadata.length > 0 && (
              <div className="mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-[10px] tracking-[0.2em] uppercase font-light text-white/60">
                <div className="flex items-center gap-6">
                  {metadata.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="opacity-60">{item.label}:</span>
                      <span className="text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/40">
                  <span>ALL SYSTEMS VERIFIED</span>
                  <span>·</span>
                  <span>LONDON HQ</span>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
