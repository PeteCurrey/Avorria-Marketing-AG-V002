'use client'

/**
 * SelectedWork — Chapter 03: Graphite Chapter
 *
 * Immersive dark chapter (#1A1916) establishing dramatic scale contrast.
 * High-contrast imagery, cinematic project showcases, and Ivory typography.
 */

import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { AnnotationLabel } from '@/components/art/AnnotationLabel'

export function SelectedWork() {
  return (
    <section
      className="relative section-y-large border-t border-[#2A2724] bg-[var(--color-graphite)] text-[var(--color-ivory)] overflow-hidden"
      data-chapter="graphite"
      aria-labelledby="work-heading"
    >
      {/* ── Background Architectural Numeral: Ivory on Dark Tone-on-Tone ── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-ivory)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        03
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-14 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-accent-light)] opacity-70">
                03 — SELECTED WORK
              </span>
              <span className="h-px w-12 bg-white/20" aria-hidden="true" />
            </div>

            <h2
              id="work-heading"
              className="font-extralight text-[var(--color-ivory)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)]"
            >
              Selected{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-accent)' }}>
                work.
              </em>
            </h2>
          </RevealOnScroll>
        </div>

        {/* ── 01. MONUMENTAL FEATURE: ALKOTA BIKES (CINEMATIC FULL-BLEED) ─────── */}
        <div className="mb-20 lg:mb-32">
          <RevealOnScroll>
            <article className="group">
              <Link
                href="/work/alkota-bikes"
                className="relative block w-full overflow-hidden border border-white/10"
                style={{ aspectRatio: '21/9' }}
                aria-label="View Alkota Bikes case study"
              >
                <Image
                  src="/images/projects/alkota-bikes/hero-screenshot.png"
                  alt="Alkota Bikes bespoke titanium 3D WebGL flagship platform"
                  fill
                  priority
                  sizes="(min-width: 1024px) 86vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Annotation label — top left */}
                <div className="absolute top-5 left-6 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-light text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
                  <span>CASE STUDY 01 · PRECISION CYCLING</span>
                </div>

                <div className="absolute top-5 right-6 text-[10px] tracking-[0.18em] uppercase font-light text-white/50">
                  FLAGSHIP BUILD
                </div>

                {/* Title overlay — bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 md:pb-8 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.16em] uppercase font-light text-white/70 mb-2">
                      Bespoke Titanium Flagship &amp; 3D Stage
                    </p>
                    <h3
                      className="font-extralight text-white leading-[1.0] tracking-[-0.02em] group-hover:opacity-90 transition-opacity"
                      style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
                    >
                      Alkota Bikes
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase text-white/80 group-hover:text-white border-b border-white/30 group-hover:border-white pb-1 transition-all self-end mb-1">
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            </article>
          </RevealOnScroll>
        </div>

        {/* ── 02. EDITORIAL DUO: TAFM (7 COLS) & DRAWDOWN.TRADING (5 COLS) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 lg:mb-32">
          {/* TAFM — 7 Cols */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={100}>
              <article className="group h-full flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
                  <span>COMMERCIAL MARKETPLACE</span>
                  <span>CASE STUDY 02</span>
                </div>

                <Link
                  href="/work/tafm"
                  className="relative block w-full aspect-[16/10] bg-[#121110] overflow-hidden mb-5 rounded-[var(--radius-card)] border border-white/10"
                >
                  <Image
                    src="/images/projects/tafm/hero-screenshot.png"
                    alt="TAFM — The Asset Finance Marketplace platform"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-ivory)] tracking-[-0.01em] group-hover:text-[var(--color-accent-light)] transition-colors mb-2">
                  TAFM Marketplace
                </h3>

                <p className="text-sm font-light text-white/70 leading-relaxed mb-5 grow">
                  Commercial asset finance platform connecting UK businesses, equipment suppliers, and specialist
                  finance providers through automated financing workflows.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-white/50">
                    Marketplace Infrastructure
                  </span>
                  <Link
                    href="/work/tafm"
                    className="text-xs font-light tracking-[0.08em] uppercase text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          {/* Drawdown.Trading — 5 Cols */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={200}>
              <article className="group h-full flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
                  <span>FINANCIAL INTELLIGENCE</span>
                  <span>CASE STUDY 03</span>
                </div>

                <Link
                  href="/work/drawdown"
                  className="relative block w-full aspect-[16/10] bg-[#121110] overflow-hidden mb-5 rounded-[var(--radius-card)] border border-white/10"
                >
                  <Image
                    src="/images/projects/drawdown/hero.png"
                    alt="Drawdown.Trading quantitative risk terminal"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-ivory)] tracking-[-0.01em] group-hover:text-[var(--color-accent-light)] transition-colors mb-2">
                  Drawdown.Trading
                </h3>

                <p className="text-sm font-light text-white/70 leading-relaxed mb-5 grow">
                  Sub-millisecond quantitative risk terminal and Canvas execution interface engineered for professional
                  proprietary trading teams.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-white/50">
                    Canvas API · Low Latency
                  </span>
                  <Link
                    href="/work/drawdown"
                    className="text-xs font-light tracking-[0.08em] uppercase text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── 03. EDITORIAL DUO: CAREEROS (5 COLS) & NESTIQ (7 COLS) ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-24">
          {/* CareerOS — 5 Cols */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={100}>
              <article className="group h-full flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
                  <span>AI SYSTEMS</span>
                  <span>CASE STUDY 04</span>
                </div>

                <Link
                  href="/work/careeros"
                  className="relative block w-full aspect-[16/10] bg-[#121110] overflow-hidden mb-5 rounded-[var(--radius-card)] border border-white/10"
                >
                  <Image
                    src="/images/projects/careeros/hero-screenshot.png"
                    alt="CareerOS AI skill taxonomy graph"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-ivory)] tracking-[-0.01em] group-hover:text-[var(--color-accent-light)] transition-colors mb-2">
                  CareerOS
                </h3>

                <p className="text-sm font-light text-white/70 leading-relaxed mb-5 grow">
                  Enterprise talent acceleration platform leveraging autonomous agent architectures, real-time skill
                  taxonomy graphs, and bespoke user interfaces.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-white/50">
                    Autonomous Agent Workflows
                  </span>
                  <Link
                    href="/work/careeros"
                    className="text-xs font-light tracking-[0.08em] uppercase text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          {/* NestIQ — 7 Cols */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={200}>
              <article className="group h-full flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
                  <span>SPATIAL DATA &amp; POSTGIS</span>
                  <span>CASE STUDY 05</span>
                </div>

                <Link
                  href="/work/nestiq"
                  className="relative block w-full aspect-[16/10] bg-[#121110] overflow-hidden mb-5 rounded-[var(--radius-card)] border border-white/10"
                >
                  <Image
                    src="/images/projects/nestiq/hero.webp"
                    alt="NestIQ spatial property intelligence platform"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-ivory)] tracking-[-0.01em] group-hover:text-[var(--color-accent-light)] transition-colors mb-2">
                  NestIQ Property Intelligence
                </h3>

                <p className="text-sm font-light text-white/70 leading-relaxed mb-5 grow">
                  Spatial analytics and cadastral data layers aggregating nationwide boundaries and automated valuation
                  models for institutional investors.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-white/50">
                    Vector Tiles · PostGIS
                  </span>
                  <Link
                    href="/work/nestiq"
                    className="text-xs font-light tracking-[0.08em] uppercase text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── Gallery Footer CTA ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-xs font-light text-white/50 tracking-[0.04em]">
            Every entry represents production architecture deployed for ambitious operators.
          </p>
          <Button as="link" href="/work" variant="secondary" size="md" className="btn-dark-outline">
            View All Verified Work ↗
          </Button>
        </div>
      </div>
    </section>
  )
}
