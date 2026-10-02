'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const HERO_PROJECT_SHOWCASE = [
  {
    title: 'Alkota Bikes',
    category: 'High-Performance Flagship',
    image: '/images/projects/alkota-bikes/hero.webp',
    year: '2025',
  },
  {
    title: 'Drawdown.Trading',
    category: 'Low-Latency Risk Engine',
    image: '/images/projects/drawdown/hero.png',
    year: '2024',
  },
  {
    title: 'CareerOS',
    category: 'Autonomous AI Orchestration',
    image: '/images/projects/careeros/hero.webp',
    year: '2025',
  },
  {
    title: 'NestIQ',
    category: 'Spatial Intelligence System',
    image: '/images/projects/nestiq/hero.webp',
    year: '2024',
  },
  {
    title: 'EntireFM',
    category: 'Enterprise Logistics & Search',
    image: '/images/projects/entirefm/hero.webp',
    year: '2024',
  },
  {
    title: 'One Great Northern',
    category: 'Architectural Digital Showcase',
    image: '/images/projects/one-great-northern/hero.webp',
    year: '2024',
  },
]

export function ProjectHero() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)

  const scrollToBrief = () => {
    const el = document.getElementById('initiation-wizard')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      className="relative -mt-16 md:-mt-20 pt-28 md:pt-36 pb-16 lg:pb-24 border-b border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="initiation-hero-heading"
    >
      <div className="container-max">
        {/* Top Eyebrow / System Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-12 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--color-rose-text)] animate-pulse" />
            <span className="text-[11px] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
              PROJECT INITIATION / AVORRIA
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono text-[var(--color-graphite-muted)] tracking-wider">
            <span>DIRECT PRINCIPAL CONSULTATION</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">24H SCOPING SLA</span>
          </div>
        </div>

        {/* Hero Main Grid: Text on Left, Cinematic Media on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Intake Trigger */}
          <div className="lg:col-span-6 space-y-8">
            <h1
              id="initiation-hero-heading"
              className="text-display-l font-extralight text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.04]"
            >
              Start something{' '}
              <em className="not-italic italic font-extralight text-[var(--color-rose-text)]">
                worth
              </em>{' '}
              building.
            </h1>

            <p className="text-body-l text-[var(--color-graphite-mid)] max-w-[520px] font-light leading-relaxed">
              Tell us what you&apos;re trying to change, build or solve. We&apos;ll work out the right
              digital architecture, technical scope, and engineering roadmap with you.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={scrollToBrief}
                className="btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.16em] uppercase font-light transition-all cursor-pointer group"
              >
                <span>Begin Project Brief</span>
                <span className="group-hover:translate-y-0.5 transition-transform" aria-hidden="true">
                  ↓
                </span>
              </button>

              <a
                href="mailto:hello@avorria.com"
                className="btn-secondary inline-flex items-center justify-center px-6 py-4 text-xs tracking-[0.14em] uppercase font-light text-[var(--color-graphite)] hover:text-black border border-[var(--color-border-strong)] transition-colors"
              >
                Direct: hello@avorria.com
              </a>
            </div>

            {/* Direct correspondence reassurance */}
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-light text-[var(--color-graphite-muted)]">
              <span>Prefer direct correspondence?</span>
              <a
                href="mailto:hello@avorria.com"
                className="text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] font-mono transition-colors"
              >
                hello@avorria.com
              </a>
            </div>
          </div>

          {/* Right Column: Large Cinematic Real-Work Composition */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full border border-[var(--color-border)] bg-[#141412] overflow-hidden group">
              {HERO_PROJECT_SHOWCASE.map((project, idx) => (
                <div
                  key={project.title}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    idx === activeProjectIdx ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — Verified Avorria engineering deliverable`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Overlay metadata badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white z-20">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] font-mono text-white/60 uppercase">
                        VERIFIED DELIVERABLE · {project.year}
                      </p>
                      <h2 className="text-lg md:text-xl font-extralight tracking-tight text-white mt-0.5">
                        {project.title}
                      </h2>
                    </div>
                    <span className="text-xs font-light text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 border border-white/15">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))}

              {/* Top hairline indicator */}
              <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  AVORRIA ARCHIVE // 0{activeProjectIdx + 1} OF 0{HERO_PROJECT_SHOWCASE.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/30">
                  REAL PRODUCTION MEDIA
                </span>
              </div>
            </div>

            {/* Thumbnail selector strip — allow cycling real Avorria projects */}
            <div className="grid grid-cols-6 gap-2">
              {HERO_PROJECT_SHOWCASE.map((project, idx) => {
                const isActive = idx === activeProjectIdx
                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`group relative text-left p-1.5 border transition-all duration-300 ${
                      isActive
                        ? 'border-[var(--color-graphite)] bg-[var(--color-ivory-dark)]'
                        : 'border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]'
                    }`}
                    aria-label={`View ${project.title} preview`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="120px"
                        className={`object-cover object-top transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                    <p
                      className={`text-[9px] font-mono truncate mt-1 ${
                        isActive
                          ? 'text-[var(--color-graphite)] font-light'
                          : 'text-[var(--color-graphite-muted)]'
                      }`}
                    >
                      {project.title.split('.')[0]}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
