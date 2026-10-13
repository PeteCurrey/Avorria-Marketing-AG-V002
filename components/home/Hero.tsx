'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Hero — Red Bull Faithful Duplication
 *
 * Exact Red Bull pattern from redbull.com/gb-en:
 * - ONE single full-bleed story occupying 100dvh
 * - Content anchored BOTTOM-LEFT over the image
 * - Category discipline pill badge
 * - Large Work Sans 200 headline (mask reveal animation)
 * - Single "Read Case Study →" text CTA
 * - No interactive ticker, no button cluster, no telemetry pills
 *
 * Animations:
 * - Background: Ken Burns slow scale 1.06 → 1.0 over 8s ease-out
 * - Dark gradient: always visible (no animation), ensures AAA contrast
 * - Category pill: translateY(12px) + opacity:0 → in, 500ms, delay 300ms
 * - Headline line 1: mask reveal (translateY(108%) → 0), 900ms, delay 500ms
 * - Headline line 2: same, delay 620ms
 * - CTA link: opacity:0, translateY(8px) → in, 500ms, delay 900ms
 */
export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{
        minHeight: '100dvh',
        marginTop: 'calc(-1 * var(--nav-height, 60px))',
      }}
      data-chapter="hero"
      aria-labelledby="hero-heading"
    >
      {/* ── Background: Full-bleed cinematic image with Ken Burns ─── */}
      <div
        className="absolute inset-0 hero-kb-image"
        aria-hidden="true"
      >
        <Image
          src="/images/cinematic/work-alkota.jpg"
          alt="Alkota Bikes — titanium frame engineering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(0.72) contrast(1.05)' }}
        />
      </div>

      {/* ── Gradient scrims: bottom-heavy for text legibility ──────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.08) 70%, transparent 100%)',
        }}
      />
      {/* Subtle left edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 60%)',
        }}
      />

      {/* ── Content: anchored bottom-left ────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)' }}
      >
        {/* Category Discipline Badge */}
        <div className="hero-badge mb-5 sm:mb-6">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] uppercase tracking-[0.18em] font-light text-white"
            style={{ backgroundColor: 'var(--color-cobalt)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0"
              aria-hidden="true"
            />
            01 // BUILD
          </span>
        </div>

        {/* Headline — two-line mask reveal, Work Sans 200 */}
        <h1
          id="hero-heading"
          className="font-extralight text-white uppercase leading-none mb-6 sm:mb-8 max-w-4xl"
          style={{
            fontSize: 'clamp(2.4rem, 6.5vw, 7rem)',
            letterSpacing: '-0.035em',
            lineHeight: 0.95,
          }}
        >
          <span className="hero-line-mask block overflow-hidden pb-[0.06em]">
            <span className="hero-line-inner-1 block">
              Alkota Bikes:
            </span>
          </span>
          <span className="hero-line-mask block overflow-hidden pb-[0.06em]">
            <span className="hero-line-inner-2 block">
              Titanium Frame{' '}
              <em
                className="not-italic italic"
                style={{ color: 'var(--color-coral)' }}
              >
                Engineering.
              </em>
            </span>
          </span>
        </h1>

        {/* CTA — Red Bull "Read Story" text-link pattern */}
        <div className="hero-cta-link">
          <Link
            href="/work/alkota-bikes"
            className="group inline-flex items-center gap-2.5 text-white font-light hover:text-white/80 transition-colors duration-200"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
          >
            <span className="border-b border-white/60 pb-0.5 group-hover:border-white transition-colors duration-200">
              Read Case Study
            </span>
            <span
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
