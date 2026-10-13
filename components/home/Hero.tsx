'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Hero — Red Bull "Panoptikum" Flagship Stage: Avorria Marketing & AI
 *
 * Rebuilt to focus on Avorria Marketing & Technology Studio:
 * - Edge-to-edge 100dvh media stage
 * - Ambient Ken Burns zoom animation (`hero-kb-image`)
 * - Deep multi-layer dark gradient scrim (transparent -> #000F1E)
 * - Bottom-left anchored editorial layout:
 *   - Category Pill Tag: "AVORRIA MARKETING · DIGITAL PRODUCTS · AI SYSTEMS"
 *   - Display Title: Work Sans 200 uppercase monumental clamp
 *     "Websites & AI Systems // Built for Market Growth."
 *   - Standfirst Summary: Direct commercial agency positioning
 *   - Red Bull Pill CTA Buttons: "Start a Project →" and "Explore Disciplines"
 * - Bottom slide / discipline progress bar
 */
export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#000F1E]"
      style={{
        minHeight: '100dvh',
        marginTop: 'calc(-1 * var(--nav-height, 68px))',
      }}
      data-chapter="hero"
      aria-labelledby="hero-heading"
    >
      {/* ── Background Media: Ken Burns Ambient Scale Zoom ───────── */}
      <div
        className="absolute inset-0 hero-kb-image overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/images/hero/avorria-marketing-ai.jpg"
          alt="Avorria Marketing & AI — Digital Flagships and Intelligent Web Systems"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(0.65) contrast(1.12)' }}
        />
      </div>

      {/* ── Radial Vignette + Dark Scrim Layering ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(0, 15, 30, 0.1) 0%, rgba(0, 15, 30, 0.65) 70%, #000F1E 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, #000F1E 0%, rgba(0, 15, 30, 0.88) 30%, rgba(0, 15, 30, 0.45) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to right, rgba(0, 15, 30, 0.85) 0%, rgba(0, 15, 30, 0.4) 55%, transparent 100%)',
        }}
      />

      {/* ── Bottom-Left Content Container (Red Bull Layout) ──────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-[1920px]"
        style={{
          paddingInline: 'clamp(1.25rem, 5vw, 5rem)',
          paddingBottom: 'clamp(2.5rem, 6vh, 5rem)',
        }}
      >
        <div className="max-w-4xl">
          {/* Category Pill Tag */}
          <div className="hero-badge mb-4 sm:mb-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] uppercase tracking-[0.16em] font-light text-white shadow-lg"
              style={{ backgroundColor: 'var(--color-cobalt, #3157FF)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-white/90 shrink-0"
                aria-hidden="true"
              />
              AVORRIA MARKETING · DIGITAL PRODUCTS · AI SYSTEMS
            </span>
          </div>

          {/* Monumental Title — Work Sans 200, Uppercase, Fluid */}
          <h1
            id="hero-heading"
            className="font-extralight text-white uppercase leading-[0.95] mb-4 sm:mb-5"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)',
              letterSpacing: '-0.035em',
            }}
          >
            <span className="hero-line-mask block overflow-hidden pb-[0.06em]">
              <span className="hero-line-inner-1 block">
                Websites &amp; AI Systems
              </span>
            </span>
            <span className="hero-line-mask block overflow-hidden pb-[0.06em]">
              <span className="hero-line-inner-2 block text-white/90">
                Built for Market Growth.
              </span>
            </span>
          </h1>

          {/* Standfirst Summary Clamped — Avorria Marketing Core Mission */}
          <p
            className="font-light text-white/75 text-base sm:text-lg max-w-2xl mb-6 sm:mb-8 leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)' }}
          >
            Avorria is a bespoke digital marketing and technology studio. We engineer high-converting digital flagships, technical search architecture, and autonomous AI systems for companies operating across borders.
          </p>

          {/* Red Bull Pill Button CTAs */}
          <div className="hero-cta-link flex flex-wrap items-center gap-4">
            <Link
              href="/start-a-project"
              className="rb-pill-btn rb-pill-btn-primary group"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.875rem' }}
            >
              Start a Project
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              href="/services"
              className="rb-pill-btn rb-pill-btn-tertiary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}
            >
              Explore Disciplines
            </Link>
          </div>
        </div>

        {/* ── Red Bull Bottom Scroll / Discipline Indicator ─────────── */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 max-w-md">
          <div className="rb-scroll-indicator flex-1">
            <div className="rb-scroll-indicator__bar" style={{ width: '33%' }} />
          </div>
          <div className="flex items-center gap-3 text-[0.6875rem] font-light text-white/40 tracking-[0.1em] uppercase">
            <span className="text-white/80">01 // BUILD</span>
            <span>·</span>
            <span>02 // SEARCH</span>
            <span>·</span>
            <span>03 // SYSTEMS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
