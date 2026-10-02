'use client'

/**
 * SystemsDiagram — Chapter 04 (The Dark Chapter)
 *
 * Requirements:
 * - Chapter 04: Deep graphite #121110 ground (The Dark Chapter)
 * - Oversized section numeral: 04 (Work Sans 200)
 * - Thin full-width dark hairlines
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Scroll-scrubbed SVG line drawing:
 *   Website → Application → Data → APIs → AI → Automation → Business
 * - Fully accessible without JS; respects prefers-reduced-motion
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface SystemNode {
  index: string
  label: string
  spec: string
  description: string
  badge: string
}

const SYSTEM_NODES: SystemNode[] = [
  {
    index: '01',
    label: 'Website',
    spec: 'NEXT.JS 16 // 100/100 CWV',
    description: 'The commercial front-end. Fast, ranked, converting. Zero layout shift.',
    badge: 'STAGE 01',
  },
  {
    index: '02',
    label: 'Application',
    spec: 'POSTGRESQL // AUTH & RBAC',
    description: 'The functional layer. Session persistence, customer portals, state machines.',
    badge: 'STAGE 02',
  },
  {
    index: '03',
    label: 'Data',
    spec: 'POSTGIS // SPATIAL TILES',
    description: 'Structured cadastral information, analytics, and business intelligence.',
    badge: 'STAGE 03',
  },
  {
    index: '04',
    label: 'APIs',
    spec: 'REST // WEBSOCKETS // STRIPE',
    description: 'Sub-millisecond connections between internal engines and financial third parties.',
    badge: 'STAGE 04',
  },
  {
    index: '05',
    label: 'AI',
    spec: 'PGVECTOR // TAXONOMY GRAPH',
    description: 'Domain-trained vector embeddings, ontology discovery, and autonomous agent routines.',
    badge: 'STAGE 05',
  },
  {
    index: '06',
    label: 'Automation',
    spec: 'AUTONOMOUS PIPELINES',
    description: 'Background worker queues and scheduled operational reconciliation that run without human drag.',
    badge: 'STAGE 06',
  },
  {
    index: '07',
    label: 'Business',
    spec: 'VERIFIED COMMERCIAL RETURN',
    description: 'The commercial objective. Digital infrastructure that actually earns its place.',
    badge: 'STAGE 07',
  },
]

export function SystemsDiagram() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const offset = length - length * progress
        gsap.set(path, { strokeDashoffset: offset })

        // Activate step based on progress across the 7 nodes
        const currentStep = Math.min(
          SYSTEM_NODES.length - 1,
          Math.floor(progress * SYSTEM_NODES.length)
        )
        setActiveStep(currentStep)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative section-y-large border-t border-b border-[#2A2724] bg-[#121110] text-[#EFECE6] overflow-hidden"
      aria-labelledby="systems-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[#F7F5F0] opacity-[0.03] leading-none"
        aria-hidden="true"
      >
        04
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header with Monumental Scale Contrast */}
        <div className="max-w-[1200px] mb-16 lg:mb-24">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[#A09D97]">
                04 // DIGITAL SYSTEMS ARCHITECTURE
              </span>
              <span className="h-px w-12 bg-[#3A3835]" aria-hidden="true" />
            </div>

            <h2
              id="systems-heading"
              className="font-extralight text-[#F7F5F0] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] max-w-[20ch]"
            >
              A website is sometimes only the{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                beginning.
              </em>
            </h2>
            <p className="mt-8 text-base md:text-lg font-light text-[#A09D97] max-w-[48ch] leading-relaxed">
              When web, AI and systems engineering are designed together, they create something much more valuable than any one of them built in isolation.
            </p>
          </RevealOnScroll>
        </div>

        {/* ── Scroll-Scrubbed SVG Circuit Grid ───────────────────────────────── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Diagram Nodes */}
          <div className="lg:col-span-8 relative">
            {/* SVG Connecting Track Behind the Nodes */}
            <div className="absolute left-[15px] top-6 bottom-6 w-1 pointer-events-none hidden md:block" aria-hidden="true">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 1000">
                {/* Background base path */}
                <line x1="2" y1="0" x2="2" y2="1000" stroke="#262421" strokeWidth="2" />
                {/* Animated illuminated stroke path */}
                <path
                  ref={pathRef}
                  d="M 2 0 L 2 1000"
                  fill="none"
                  stroke="#9A4A53"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Seven Pipeline Stations */}
            <div className="space-y-6 md:space-y-8" role="list">
              {SYSTEM_NODES.map((node, i) => {
                const isActive = activeStep >= i
                return (
                  <div
                    key={node.label}
                    className={`relative md:pl-12 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-40'
                    }`}
                    role="listitem"
                  >
                    {/* Circuit Station Node Dot */}
                    <div
                      className={`absolute left-0 top-3 hidden md:flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 ${
                        isActive
                          ? 'border-[var(--color-rose-text)] bg-[#1A1916] text-[var(--color-rose-text)]'
                          : 'border-[#3A3835] bg-[#121110] text-[#7A7773]'
                      }`}
                      aria-hidden="true"
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Node Content Card */}
                    <div className="border border-[#262421] bg-[#161513] p-6 hover:border-[#3E3A35] transition-colors">
                      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] tracking-[0.2em] font-light text-[var(--color-rose-text)] uppercase">
                            {node.index} // {node.label}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-[0.16em] uppercase text-[#A09D97] border border-[#2E2B27] px-2 py-0.5 bg-black/30 font-light">
                          {node.spec}
                        </span>
                      </div>

                      <p className="text-sm font-light text-[#D0CDC6] leading-relaxed max-w-[54ch]">
                        {node.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Plate (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="border border-[#2A2724] bg-[#161513] p-6">
              <div className="flex items-center justify-between border-b border-[#2A2724] pb-3 mb-4 text-[10px] tracking-[0.2em] uppercase text-[#A09D97] font-light">
                <span>SYSTEM STATUS</span>
                <span className="text-[var(--color-rose-text)]">ACTIVE PIPELINE</span>
              </div>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between text-xs font-light text-[#D0CDC6] border-b border-[#22201D] pb-2">
                  <span className="text-[#7A7773] uppercase text-[10px] tracking-wider">ACTIVE LAYER</span>
                  <span className="text-[var(--color-rose-text)] uppercase font-light">
                    {SYSTEM_NODES[activeStep].label}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-light text-[#D0CDC6] border-b border-[#22201D] pb-2">
                  <span className="text-[#7A7773] uppercase text-[10px] tracking-wider">TELEMETRY</span>
                  <span className="font-light">{SYSTEM_NODES[activeStep].spec}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-light text-[#D0CDC6] border-b border-[#22201D] pb-2">
                  <span className="text-[#7A7773] uppercase text-[10px] tracking-wider">VERIFICATION</span>
                  <span className="text-[#00E599] text-[10px] uppercase font-light">PROVENANCE PASS</span>
                </div>

                <p className="text-xs text-[#8A8782] font-light leading-relaxed pt-2">
                  All layers deploy without fabricated metrics, simulated outcomes, or vanity dashboards. Production-tested across real enterprise workloads.
                </p>
              </div>

              {/* Corner registration ticks */}
              <div className="pt-4 border-t border-[#2A2724] text-[9px] tracking-[0.16em] uppercase text-[#6E6B66] flex justify-between font-light">
                <span>REF: SEC-04-SYSTEMS</span>
                <span>AVORRIA OS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
