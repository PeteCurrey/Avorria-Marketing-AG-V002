'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface SystemNode {
  index: string
  label: string
  title: string
  description: string
  proof: string
  /** Path to the primary image shown in the right panel */
  image: string
  /** object-position value — lets us frame the most relevant part of each image */
  imagePosition: string
  /** Overlay gradient applied over the image for visual character */
  overlay: string
}

const SYSTEM_NODES: SystemNode[] = [
  {
    index: '01',
    label: 'Website',
    title: 'The Commercial Front-End',
    description: 'Fast, ranked, converting. Engineered for instant loading and zero layout shift.',
    proof: 'Alkota Bikes Flagship Platform',
    // Full e-commerce storefront — the most legible "website" read
    image: '/images/projects/alkota-bikes/hero-screenshot.png',
    imagePosition: 'top center',
    overlay: 'bg-gradient-to-t from-black/60 via-black/10 to-transparent',
  },
  {
    index: '02',
    label: 'Application',
    title: 'The Functional Engine',
    description: 'Session persistence, structured customer portals, and resilient state machines.',
    proof: 'TAFM Commercial Marketplace',
    // Dense UI grid — reads as a complex application, not a marketing page
    image: '/images/projects/tafm/hero-screenshot.png',
    imagePosition: 'center center',
    overlay: 'bg-gradient-to-br from-black/40 via-transparent to-black/60',
  },
  {
    index: '03',
    label: 'Data',
    title: 'Structured Intelligence',
    description: 'Relational PostgreSQL schemas, spatial PostGIS tiles, and unified reporting models.',
    proof: 'NestIQ Cadastral Spatial Data',
    // Map / spatial data view — immediately reads as structured geographic data
    image: '/images/projects/nestiq/hero.webp',
    imagePosition: 'center 30%',
    overlay: 'bg-gradient-to-t from-black/70 via-black/20 to-transparent',
  },
  {
    index: '04',
    label: 'APIs',
    title: 'Integrated Service Contracts',
    description: 'Secure, low-latency bridges between internal databases and financial gateways.',
    proof: 'Drawdown Real-Time Telemetry',
    // Drawdown's real-time financial dashboard — connective tissue between systems
    image: '/images/projects/drawdown/hero.webp',
    imagePosition: 'center top',
    overlay: 'bg-gradient-to-tl from-black/60 via-transparent to-black/30',
  },
  {
    index: '05',
    label: 'AI & Intelligence',
    title: 'Autonomous Domain Workflows',
    description: 'Domain-trained vector search, ontology graphs, and automated assistant routines.',
    proof: 'CareerOS Talent Orchestration',
    // CareerOS full-width hero — AI-powered talent interface, richest "AI" visual
    image: '/images/projects/careeros/hero.webp',
    imagePosition: 'center 20%',
    overlay: 'bg-gradient-to-b from-black/20 via-transparent to-black/70',
  },
  {
    index: '06',
    label: 'Automation',
    title: 'Background Operations',
    description: 'Scheduled worker queues, operational reconciliations, and dispatch systems.',
    proof: 'EntireFM National Dispatch',
    // EntireFM operations — field dispatch, scheduling, real infrastructure
    image: '/images/projects/entirefm/hero.webp',
    imagePosition: 'center center',
    overlay: 'bg-gradient-to-tr from-black/70 via-black/20 to-transparent',
  },
  {
    index: '07',
    label: 'Business',
    title: 'Compounding Commercial Asset',
    description: 'The ultimate objective: digital infrastructure that reliably earns its place.',
    proof: 'One Great Northern',
    // One Great Northern — brand/venue/commerce convergence; strong editorial read
    image: '/images/projects/one-great-northern/hero.webp',
    imagePosition: 'center 40%',
    overlay: 'bg-gradient-to-t from-black/80 via-black/30 to-transparent',
  },
]

export function SystemsDiagram() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onUpdate: (self) => {
        const step = Math.min(
          SYSTEM_NODES.length - 1,
          Math.floor(self.progress * SYSTEM_NODES.length)
        )
        setActiveStep(step)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const activeNode = SYSTEM_NODES[activeStep]

  return (
    <section
      ref={sectionRef}
      className="relative section-y-large bg-[#121110] text-[#EFECE6] overflow-hidden"
      aria-labelledby="systems-heading"
    >
      {/* ── Background Architectural Watermark ───────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-white opacity-[0.02] leading-none"
        aria-hidden="true"
      >
        04
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-14 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[#A09D97]">
                04 // DIGITAL SYSTEMS ARCHITECTURE
              </span>
              <span className="h-px w-12 bg-[#33302B]" aria-hidden="true" />
            </div>

            <h2
              id="systems-heading"
              className="font-extralight text-[#F7F5F0] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] max-w-[20ch]"
            >
              Digital products that{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                connect
              </em>{' '}
              to the business.
            </h2>
          </RevealOnScroll>
        </div>

        {/* Two-Column Layout: Progressing System Nodes Left, Real Architecture Plate Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Progressive Node Flow */}
          <div className="lg:col-span-6 space-y-3">
            {SYSTEM_NODES.map((node, idx) => {
              const isActive = idx === activeStep

              return (
                <div
                  key={node.label}
                  onClick={() => setActiveStep(idx)}
                  className={[
                    'p-5 border transition-all duration-300 cursor-pointer rounded-[var(--radius-sm)]',
                    isActive
                      ? 'border-[#4A4845] bg-[#1A1916] text-[#F7F5F0]'
                      : 'border-[#22201D] bg-transparent text-[#8A8782] hover:border-[#33302B]',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#7A7773]">
                      STAGE {node.index}
                    </span>
                    <span
                      className={[
                        'text-xs tracking-[0.1em] uppercase font-light transition-colors',
                        isActive ? 'text-[var(--color-rose-text)]' : 'text-transparent',
                      ].join(' ')}
                    >
                      Active Stage
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-extralight tracking-[-0.01em] mb-1 text-white">
                    {node.label} — {node.title}
                  </h3>

                  <p className="text-xs font-light text-[#A09D97] leading-relaxed max-w-[48ch]">
                    {node.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column: Sticky Verified Interface Evidence */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="border border-[#2E2B27] bg-[#181715] p-6 md:p-8">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#2A2724] text-[10px] tracking-[0.18em] uppercase text-[#8A8784] font-light">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                  <span>ACTIVE ECOSYSTEM PROOF</span>
                </span>
                <span>{activeNode.label}</span>
              </div>

              {/* Real Interface Visual */}
              <div className="relative w-full aspect-[16/10] bg-[#121110] border border-[#2E2B27] overflow-hidden mb-6">
                <Image
                  key={activeNode.image}
                  src={activeNode.image}
                  alt={activeNode.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-all duration-700 hover:scale-[1.02]"
                  style={{ objectPosition: activeNode.imagePosition }}
                />
                <div className={`absolute inset-0 pointer-events-none ${activeNode.overlay}`} />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-extralight text-white tracking-[-0.01em]">
                  {activeNode.title}
                </h4>
                <p className="text-xs font-light text-[#C0BCB4] leading-relaxed">
                  {activeNode.description} Every layer is built directly into production repositories with strict typing,
                  clear service contracts, and verified commercial utility.
                </p>

                <div className="pt-4 border-t border-[#2A2724] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[#8A8784]">
                    Deployed Proof: {activeNode.proof}
                  </span>
                  <Link
                    href="/services/systems"
                    className="text-xs font-light tracking-[0.08em] uppercase text-white hover:text-[var(--color-rose-text)] flex items-center gap-1 transition-colors"
                  >
                    <span>Explore Systems</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
