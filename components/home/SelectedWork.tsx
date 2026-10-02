'use client'

import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

export function SelectedWork() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="work-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.03] leading-none"
        aria-hidden="true"
      >
        03
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-14 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                03 // SELECTED WORK
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <h2
              id="work-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)]"
            >
              Selected{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                work.
              </em>
            </h2>
          </RevealOnScroll>
        </div>

        {/* ── 01. MONUMENTAL FEATURE: ALKOTA BIKES (FULL-BLEED MOMENT) ─────── */}
        <div className="mb-20 lg:mb-32">
          <RevealOnScroll>
            <article className="group border border-[var(--color-border)] bg-white p-6 md:p-10 transition-all duration-500 hover:border-[var(--color-graphite)]">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                  <span>FEATURED CASE STUDY // PRECISION CYCLING</span>
                </span>
                <span>PROJ. 01 / 2025</span>
              </div>

              {/* Monumental 16:9 Real-Image Plate */}
              <Link
                href="/work/alkota-bikes"
                className="relative block w-full aspect-[16/9] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-8"
              >
                <Image
                  src="/images/projects/alkota-bikes/hero-screenshot.png"
                  alt="Alkota Bikes bespoke titanium 3D WebGL flagship platform"
                  fill
                  priority
                  sizes="(min-width: 1024px) 86vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </Link>

              {/* Editorial Metadata & Description */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                <div className="lg:col-span-4">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-[var(--color-graphite)] tracking-[-0.02em] group-hover:text-[var(--color-rose-text)] transition-colors">
                    Alkota Bikes
                  </h3>
                  <p className="text-xs font-light text-[var(--color-graphite-mid)] mt-1.5 tracking-[0.06em] uppercase">
                    Bespoke Titanium Flagship & 3D Stage
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-base font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    A digital flagship engineered for titanium performance bicycles, combining surgical typography,
                    interactive WebGL frame configuration, and zero layout shift.
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end">
                  <Link
                    href="/work/alkota-bikes"
                    className="inline-flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-1 hover:text-[var(--color-rose-text)] hover:border-[var(--color-rose-text)] transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        </div>

        {/* ── 02. EDITORIAL DUO: TAFM (7 COLS) & DRAWDOWN.TRADING (5 COLS) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 lg:mb-32">
          {/* TAFM — 7 Cols */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={100}>
              <article className="group h-full flex flex-col justify-between border border-[var(--color-border)] bg-white p-6 md:p-8 transition-all duration-500 hover:border-[var(--color-graphite)]">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span>COMMERCIAL MARKETPLACE</span>
                    <span>PROJ. 02</span>
                  </div>

                  <Link
                    href="/work/tafm"
                    className="relative block w-full aspect-[16/10] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-6"
                  >
                    <Image
                      src="/images/projects/tafm/hero-screenshot.png"
                      alt="TAFM — The Asset Finance Marketplace platform"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </Link>

                  <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] group-hover:text-[var(--color-rose-text)] transition-colors mb-2">
                    TAFM Marketplace
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    Commercial asset finance platform connecting UK businesses, equipment suppliers, and specialist
                    finance providers through automated financing workflows.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite-muted)]">
                    Marketplace Infrastructure
                  </span>
                  <Link
                    href="/work/tafm"
                    className="text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] flex items-center gap-1 transition-colors"
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
              <article className="group h-full flex flex-col justify-between border border-[var(--color-border)] bg-white p-6 md:p-8 transition-all duration-500 hover:border-[var(--color-graphite)]">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span>FINANCIAL INTELLIGENCE</span>
                    <span>PROJ. 03</span>
                  </div>

                  <Link
                    href="/work/drawdown"
                    className="relative block w-full aspect-[16/10] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-6"
                  >
                    <Image
                      src="/images/projects/drawdown/hero.png"
                      alt="Drawdown.Trading quantitative risk terminal"
                      fill
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </Link>

                  <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] group-hover:text-[var(--color-rose-text)] transition-colors mb-2">
                    Drawdown.Trading
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    Sub-millisecond quantitative risk terminal and Canvas execution interface engineered for professional
                    proprietary trading teams.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite-muted)]">
                    Canvas API // Low Latency
                  </span>
                  <Link
                    href="/work/drawdown"
                    className="text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] flex items-center gap-1 transition-colors"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
          {/* CareerOS — 5 Cols */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={100}>
              <article className="group h-full flex flex-col justify-between border border-[var(--color-border)] bg-white p-6 md:p-8 transition-all duration-500 hover:border-[var(--color-graphite)]">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span>AI SYSTEMS</span>
                    <span>PROJ. 04</span>
                  </div>

                  <Link
                    href="/work/careeros"
                    className="relative block w-full aspect-[16/10] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-6"
                  >
                    <Image
                      src="/images/projects/careeros/hero-screenshot.png"
                      alt="CareerOS AI skill taxonomy graph"
                      fill
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </Link>

                  <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] group-hover:text-[var(--color-rose-text)] transition-colors mb-2">
                    CareerOS
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    Enterprise talent acceleration platform leveraging autonomous agent architectures, real-time skill
                    taxonomy graphs, and bespoke user interfaces.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite-muted)]">
                    Autonomous Agent Workflows
                  </span>
                  <Link
                    href="/work/careeros"
                    className="text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] flex items-center gap-1 transition-colors"
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
              <article className="group h-full flex flex-col justify-between border border-[var(--color-border)] bg-white p-6 md:p-8 transition-all duration-500 hover:border-[var(--color-graphite)]">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span>SPATIAL DATA & POSTGIS</span>
                    <span>PROJ. 05</span>
                  </div>

                  <Link
                    href="/work/nestiq"
                    className="relative block w-full aspect-[16/10] bg-[#121110] border border-[var(--color-border)] overflow-hidden mb-6"
                  >
                    <Image
                      src="/images/projects/nestiq/hero.webp"
                      alt="NestIQ spatial property intelligence platform"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </Link>

                  <h3 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] group-hover:text-[var(--color-rose-text)] transition-colors mb-2">
                    NestIQ Property Intelligence
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    Spatial analytics and cadastral data layers aggregating nationwide boundaries and automated valuation
                    models for institutional investors.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite-muted)]">
                    Vector Tiles // PostGIS
                  </span>
                  <Link
                    href="/work/nestiq"
                    className="text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] flex items-center gap-1 transition-colors"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[var(--color-border)] pt-8">
          <p className="text-xs font-light text-[var(--color-graphite-muted)] tracking-[0.04em]">
            Every entry represents production architecture deployed for ambitious operators.
          </p>
          <Button as="link" href="/work" variant="primary" size="md">
            View All Verified Work ↗
          </Button>
        </div>
      </div>
    </section>
  )
}
