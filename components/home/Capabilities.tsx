'use client'

/**
 * Capabilities — Chapter 02
 *
 * Requirements:
 * - Chapter 02: Warm Ivory ground
 * - Oversized section numeral: 02 (Work Sans 200)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Large-format interactive visual slot (art-directed 4:5 / 16:9), never text alone
 */

import { useState } from 'react'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface CapabilityData {
  index: string
  label: string
  title: string
  statement: string
  description: string
  href: string
  proofProject: string
  proofSector: string
  proofSpec: string
  badge: string
}

const capabilities: CapabilityData[] = [
  {
    index: '01',
    label: 'BUILD',
    title: 'Digital Flagships & Web Applications',
    statement: 'Engineered for sub-second LCP, surgical typography, and zero layout shift.',
    description:
      'High-performance web platforms, bespoke web software, and selective WebGL configurations. Built to represent engineering-first brands where sloppy execution damages market value.',
    href: '/services/build',
    proofProject: 'Alkota Bikes & One Great Northern',
    proofSector: 'Precision titanium frame telemetry & architectural monographs',
    proofSpec: 'NEXT.JS 16 // 0.62S LCP // THREE.JS',
    badge: 'FLAGSHIP PLATFORMS',
  },
  {
    index: '02',
    label: 'SEARCH',
    title: 'Technical Search & Migration Architecture',
    statement: 'Zero equity loss across complex multi-domain enterprise consolidations.',
    description:
      'Enterprise crawl budget engineering, high-risk migration safeguards, semantic entity graphs, and commercial keyword dominance. Protecting commercial rankings during structural redesigns.',
    href: '/services/search',
    proofProject: 'EntireFM Nationwide Consolidation',
    proofSector: '8 regional domains merged into single nationwide organic authority',
    proofSpec: '301 MIGRATION MAP // ZERO RANKING LOSS',
    badge: 'SEARCH ARCHITECTURE',
  },
  {
    index: '03',
    label: 'SYSTEMS',
    title: 'Commercial Systems & Data Pipelines',
    statement: 'Connecting real-time transactions, spatial cadastral tiles, and AI agents.',
    description:
      'Server-side attribution, Stripe payment infrastructure, autonomous scout engines, and real-time operational telemetry. Turning isolated web pages into compounding operating systems.',
    href: '/services/systems',
    proofProject: 'Drawdown.Trading & NestIQ Intelligence',
    proofSector: 'Sub-millisecond Canvas trading risk terminal & PostGIS vector tiles',
    proofSpec: '5,000 TICKS/SEC // 25M+ PROPERTY PARCELS',
    badge: 'OPERATING INFRASTRUCTURE',
  },
]

export function Capabilities() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeCap = capabilities[activeIdx]

  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        02
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-24">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                02 // CAPABILITIES & DISCIPLINES
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <h2
              id="capabilities-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)]"
            >
              What we{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                build.
              </em>
            </h2>
          </RevealOnScroll>
        </div>

        {/* Two-Column Interactive Layout: Rows left, Large 4:5 visual plate right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Capability Rows */}
          <div className="lg:col-span-7 divide-y divide-[var(--color-border)]">
            {capabilities.map((cap, i) => {
              const isActive = activeIdx === i
              return (
                <div
                  key={cap.index}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className={`py-8 md:py-10 transition-colors duration-[var(--duration-base)] ${
                    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <span className="text-[0.6875rem] tracking-[0.2em] font-light text-[var(--color-graphite-mid)] uppercase">
                      {cap.index} // {cap.label}
                    </span>
                    <span className="text-[9px] tracking-[0.18em] font-light text-[var(--color-graphite-muted)] uppercase border border-[var(--color-border)] px-2 py-0.5">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] mb-3">
                    <Link href={cap.href} className="link-hover">
                      {cap.title}
                    </Link>
                  </h3>

                  <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed mb-4 max-w-[54ch]">
                    {cap.statement}
                  </p>

                  <p className="text-xs font-light text-[var(--color-graphite-muted)] leading-relaxed max-w-[54ch] mb-4">
                    {cap.description}
                  </p>

                  <Link
                    href={cap.href}
                    className="inline-flex items-center gap-2 text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors"
                  >
                    <span>Explore {cap.label} Discipline</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Right Column: Large-format Art-Directed Visual Plate (4:5 Crop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative border border-[var(--color-border-strong)] bg-[#1A1916] p-4 md:p-6 shadow-sm overflow-hidden">
              {/* Plate Header Bar */}
              <div className="flex items-center justify-between border-b border-[#2E2B27] pb-3 mb-4 text-[10px] tracking-[0.18em] uppercase text-[#A09D97] font-light">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                  <span>ACTIVE APERTURE: {activeCap.label}</span>
                </span>
                <span>SEC. 02.{activeCap.index}</span>
              </div>

              {/* Main 4:5 Visual Frame */}
              <div className="relative w-full aspect-[4/5] bg-[#121110] border border-[#2E2B27] overflow-hidden flex flex-col justify-between p-6">
                {/* Background Architectural Grid Lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#3A3835" strokeWidth="0.5" />
                  <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#3A3835" strokeWidth="0.5" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#3A3835" strokeWidth="0.5" />
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#2E2B27" strokeWidth="0.5" />
                </svg>

                {/* Top Info */}
                <div className="relative z-10">
                  <span className="text-[9px] tracking-[0.22em] uppercase text-[var(--color-rose-text)] font-light block mb-2">
                    DISCIPLINE VERIFICATION
                  </span>
                  <h4 className="text-lg md:text-xl font-extralight text-[#F7F5F0] tracking-[-0.01em]">
                    {activeCap.title}
                  </h4>
                </div>

                {/* Center Schematic Blueprint */}
                <div className="relative z-10 my-auto py-6 border-y border-[#262421]">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#A09D97] mb-1 font-light">
                    PRIMARY VERIFIED PROOFS:
                  </p>
                  <p className="text-sm font-light text-[#EAE6DF] mb-3">
                    {activeCap.proofProject}
                  </p>
                  <p className="text-xs font-light text-[#8A8782] leading-relaxed">
                    {activeCap.proofSector}
                  </p>
                </div>

                {/* Bottom Spec Badge */}
                <div className="relative z-10 pt-4 border-t border-[#262421] flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.16em] uppercase text-[#7A7773] font-light">
                    {activeCap.proofSpec}
                  </span>
                  <span className="w-2 h-2 rounded-full border border-[#4A4845]" />
                </div>

                {/* Corner registration ticks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#4A4845]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#4A4845]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#4A4845]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#4A4845]" />
              </div>

              {/* Plate Footer */}
              <div className="flex items-center justify-between pt-3 mt-1 text-[9px] tracking-[0.15em] text-[#7A7773] uppercase font-light">
                <span>INTERACTION: HOVER ROW TO ROTATE APERTURE</span>
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
