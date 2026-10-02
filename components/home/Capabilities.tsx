'use client'

/**
 * Capabilities — Interactive Capability to Visual Proof
 *
 * Information architecture preserved (01 BUILD / 02 SEARCH / 03 SYSTEMS).
 * Interactivity: Hovering or focusing a capability row reveals an authentic
 * visual preview / telemetry plate of actual work executed under that capability.
 */

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProjectMedia } from '@/components/ui/ProjectMedia'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'

interface CapabilityData {
  index: string
  label: string
  title: string
  description: string
  href: string
  proofProject: string
  proofSector: string
  proofSpec: string
  mediaSrc?: string
}

const capabilities: CapabilityData[] = [
  {
    index: '01',
    label: 'BUILD',
    title: 'Digital Flagships & Web Applications',
    description:
      'High-performance web platforms, bespoke web software, and selective WebGL configurations engineered with surgical typography and instant LCP.',
    href: '/services/build',
    proofProject: 'Alkota Bikes & One Great Northern',
    proofSector: 'High-precision titanium frame geometry & architectural monographs',
    proofSpec: 'NEXT.JS 16 // 0.62S LCP // THREE.JS',
    mediaSrc: undefined, // ready for /images/capabilities/build.webp
  },
  {
    index: '02',
    label: 'SEARCH',
    title: 'Technical Search & Migration Architecture',
    description:
      'Enterprise crawl budget engineering, high-risk migration safeguards, semantic entity graphs, and commercial keyword dominance.',
    href: '/services/search',
    proofProject: 'EntireFM Consolidation',
    proofSector: '8 regional domains merged into single nationwide organic authority',
    proofSpec: '301 MIGRATION MAP // ZERO EQUITY LOSS',
    mediaSrc: undefined, // ready for /images/capabilities/search.webp
  },
  {
    index: '03',
    label: 'SYSTEMS',
    title: 'Commercial Systems & Data Pipelines',
    description:
      'Server-side attribution, Stripe payment infrastructure, autonomous scout engines, and real-time operational telemetry.',
    href: '/services/systems',
    proofProject: 'Drawdown.Trading & NestIQ',
    proofSector: 'Sub-millisecond Canvas trading risk terminal & PostGIS vector tiles',
    proofSpec: '5,000 TICKS/SEC // 25M+ PROPERTY PARCELS',
    mediaSrc: undefined, // ready for /images/capabilities/systems.webp
  },
]

export function Capabilities() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeCap = capabilities[activeIdx]

  return (
    <section
      className="section-y-large border-b border-[var(--color-border)]"
      aria-labelledby="capabilities-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <RevealOnScroll>
            <Eyebrow>01 — Capabilities</Eyebrow>
            <h2 id="capabilities-heading" className="text-display-l mb-16 lg:mb-24 max-w-[600px]">
              What we build.
            </h2>
          </RevealOnScroll>

          {/* Grid layout: Left rows, Right interactive visual proof on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left 8 cols: Capability rows */}
            <div className="lg:col-span-8">
              {capabilities.map((cap, i) => (
                <RevealOnScroll key={cap.index} delay={i * 80}>
                  <Link
                    href={cap.href}
                    onMouseEnter={() => setActiveIdx(i)}
                    onFocus={() => setActiveIdx(i)}
                    className={`group block border-t border-[var(--color-border)] py-10 lg:py-12 transition-all duration-[var(--duration-base)] ${
                      activeIdx === i ? 'border-[var(--color-border-strong)] bg-black/[0.015]' : ''
                    }`}
                    aria-label={`${cap.title} — learn more`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-6 items-center">

                      {/* Index + label */}
                      <div className="flex items-center gap-4 md:block">
                        <span className={`text-label-upper transition-colors ${
                          activeIdx === i ? 'text-[var(--color-accent)]' : 'text-[var(--color-graphite-muted)]'
                        }`}>
                          {cap.index}
                        </span>
                        <span className="md:hidden text-label-upper ml-2">{cap.label}</span>
                      </div>

                      {/* Title & Description */}
                      <div className="pr-4">
                        <p className="hidden md:block text-label-upper mb-2">{cap.label}</p>
                        <h3 className={`text-display-s mb-3 transition-colors duration-[var(--duration-base)] ${
                          activeIdx === i ? 'text-[var(--color-accent)]' : 'text-[var(--color-graphite)]'
                        }`}>
                          {cap.title}
                        </h3>
                        <p className="text-secondary text-[var(--text-small)] lg:text-base leading-relaxed">
                          {cap.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="hidden md:flex justify-end pl-2">
                        <span
                          className={`text-[1.25rem] transition-all duration-[var(--duration-base)] ${
                            activeIdx === i
                              ? 'text-[var(--color-accent)] translate-x-1'
                              : 'text-[var(--color-graphite-muted)]'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>

                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
              <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
            </div>

            {/* Right 4 cols: Sticky capability visual proof plate (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28">
              <div className="border border-[var(--color-border)] bg-[#121110] p-6 text-[#EFECE6] min-h-[380px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#8A8784] uppercase border-b border-white/10 pb-3">
                  <span>CAPABILITY // PROOF</span>
                  <span className="text-[var(--color-accent)]">{activeCap.label}</span>
                </div>

                {activeCap.mediaSrc ? (
                  <div className="relative w-full aspect-[4/3] my-4 overflow-hidden border border-white/10">
                    <ProjectMedia
                      src={activeCap.mediaSrc}
                      alt={`${activeCap.title} proof visual`}
                      fill
                      sizes="350px"
                    />
                  </div>
                ) : (
                  <div className="my-6">
                    <div className="text-[11px] font-mono text-[var(--color-accent-light)] uppercase tracking-wider mb-2">
                      VERIFIED PRODUCTION BENCHMARK
                    </div>
                    <p className="font-display text-lg uppercase text-white font-light mb-2">
                      {activeCap.proofProject}
                    </p>
                    <p className="text-xs font-light text-[#C8C4BE] leading-relaxed mb-4">
                      {activeCap.proofSector}
                    </p>
                    <div className="border-t border-white/10 pt-3">
                      <span className="text-[9px] font-mono text-[#8A8784] block mb-1">SPECIFICATION</span>
                      <span className="text-[10px] font-mono text-[#EFECE6] tracking-wider">
                        {activeCap.proofSpec}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[9px] font-mono text-[#6A6864] pt-3 border-t border-white/10">
                  <span>DISCIPLINE VERIFIED</span>
                  <span>AVR-CAP-0{activeCap.index}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
