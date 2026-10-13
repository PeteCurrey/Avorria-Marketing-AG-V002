'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * DisciplineRail — Red Bull "Energy Drinks" Shelf Exact Duplicate
 *
 * Duplicates Red Bull's product lineup carousel (`feed-cards-rail`):
 * - Dark Obsidian stage (#000F1E)
 * - Section Caption: "Our Disciplines" + "View all" pill button
 * - Tall product-style edition cards on Deep Navy surface (#00162B)
 * - Subtle glass borders (rgba(255, 255, 255, 0.08))
 * - Image zoom hover: cubic-bezier(0.35, 0, 0, 1) scale(1.06)
 * - Dynamic scroll progress track beneath the rail
 */

interface DisciplineEdition {
  edition: string
  name: string
  tagline: string
  deliverables: string
  image: string
  badge: string
  href: string
}

const EDITIONS: DisciplineEdition[] = [
  {
    edition: 'EDITION 01',
    name: 'Build',
    tagline: 'Digital Flagships & WebGL Engines',
    deliverables: 'Next.js 16 · WebGL · Micro-interactions · Zero layout shift',
    image: '/images/cinematic/discipline-build.jpg',
    badge: 'FLAGSHIP PLATFORMS',
    href: '/services/build',
  },
  {
    edition: 'EDITION 02',
    name: 'Search',
    tagline: 'Technical SEO & Information Architecture',
    deliverables: 'Multi-domain consolidation · Surgical schema · Algorithmic defense',
    image: '/images/cinematic/discipline-strategy.jpg',
    badge: 'TECHNICAL SEO',
    href: '/services/search',
  },
  {
    edition: 'EDITION 03',
    name: 'Systems',
    tagline: 'Agentic AI & Commercial Pipelines',
    deliverables: 'Autonomous lead routing · Supabase workflows · LLM evaluation',
    image: '/images/cinematic/discipline-systems.jpg',
    badge: 'AUTOMATION & AI',
    href: '/services/systems',
  },
  {
    edition: 'EDITION 04',
    name: 'The Lobby',
    tagline: 'Editorial Intelligence & Essays',
    deliverables: 'Original engineering research · Architecture deep dives',
    image: '/images/cinematic/work-alkota.jpg',
    badge: 'EDITORIAL RESEARCH',
    href: '/lobby',
  },
  {
    edition: 'EDITION 05',
    name: 'Teardowns',
    tagline: 'Forensic Audits & Performance Diagnostics',
    deliverables: 'CWV inspection · Tracking bloat autopsies · Structural refactors',
    image: '/images/cinematic/work-drawdown.jpg',
    badge: 'DIGITAL AUDIT',
    href: '/teardown',
  },
]

export function DisciplineRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const updateProgress = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max > 0) {
        setScrollProgress((el.scrollLeft / max) * 100)
      }
    }
    el.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => el.removeEventListener('scroll', updateProgress)
  }, [])

  function onMouseDown(e: React.MouseEvent) {
    if (!railRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - railRef.current.offsetLeft)
    setScrollLeft(railRef.current.scrollLeft)
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !railRef.current) return
    e.preventDefault()
    const x = e.pageX - railRef.current.offsetLeft
    railRef.current.scrollLeft = scrollLeft - (x - startX)
  }
  function onMouseUp() { setIsDragging(false) }

  return (
    <section
      className="w-full bg-[#000F1E] border-t border-white/10"
      aria-labelledby="discipline-rail-heading"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 6.5rem)' }}
    >
      <div className="mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Section Caption Header (panel-caption-rbx) ──────────── */}
        <div data-reveal="" className="panel-caption-rbx">
          <div className="flex items-baseline gap-4">
            <h2
              id="discipline-rail-heading"
              className="panel-caption-rbx__title"
            >
              Our Disciplines
            </h2>
            <span className="hidden sm:inline-block text-xs font-light text-white/40 tracking-[0.14em] uppercase">
              Production Editions
            </span>
          </div>

          <Link
            href="/services"
            className="rb-pill-btn rb-pill-btn-tertiary"
          >
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── Horizontal Snap Rail ─────────────────────────────────── */}
        <div
          ref={railRef}
          className="flex overflow-x-auto gap-5 pb-4 rb-scrollrail cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          role="list"
          aria-label="Avorria engineering disciplines"
        >
          {EDITIONS.map((ed, i) => (
            <Link
              key={ed.edition}
              href={ed.href}
              role="listitem"
              className="group flex-shrink-0 flex flex-col justify-between bg-[#00162B] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              style={{
                width: 'clamp(260px, 24vw, 320px)',
                scrollSnapAlign: 'start',
                animationDelay: `${i * 80}ms`,
              }}
              data-reveal=""
              draggable={false}
            >
              {/* Image Preview with Hover Zoom */}
              <div
                className="w-full overflow-hidden relative bg-[#001C39]"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src={ed.image}
                  alt={ed.name}
                  width={320}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.35,0,0,1)] group-hover:scale-105"
                  draggable={false}
                />

                {/* Edition Pill Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[0.625rem] font-light tracking-[0.14em] uppercase bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                    {ed.edition}
                  </span>
                </div>

                {/* Bottom Gradient Scrim */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, #00162B 0%, rgba(0, 22, 43, 0.4) 30%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    className="font-extralight text-white uppercase tracking-[-0.02em] group-hover:text-[var(--color-cobalt)] transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                  >
                    {ed.name}
                  </h3>
                  <p className="font-light text-white/70 text-xs sm:text-sm mt-1 leading-snug">
                    {ed.tagline}
                  </p>
                  <p className="font-light text-white/40 text-[0.75rem] mt-3 line-clamp-2">
                    {ed.deliverables}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[0.625rem] tracking-[0.14em] text-[var(--color-cobalt)] uppercase font-light">
                    {ed.badge}
                  </span>
                  <span className="text-white/40 group-hover:text-white transition-colors duration-200 text-sm">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Red Bull Bottom Scroll Progress Track ────────────────── */}
        <div className="mt-6 flex items-center gap-4 max-w-sm">
          <div className="rb-scroll-indicator flex-1">
            <div
              className="rb-scroll-indicator__bar"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[0.6875rem] font-light text-white/40 tracking-[0.12em] uppercase">
            Scroll Track
          </span>
        </div>

      </div>
    </section>
  )
}
