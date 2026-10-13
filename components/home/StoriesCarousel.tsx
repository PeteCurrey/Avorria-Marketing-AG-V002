'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * StoriesCarousel — Red Bull "Stories" Shelf Exact Duplicate
 *
 * Duplicates Red Bull's editorial story cards (`cosmos-story-card`):
 * - Dark Obsidian Stage (#000F1E)
 * - Section Caption with circular prev/next arrow buttons
 * - 16:9 Media Preview with scale(1.08) hover zoom
 * - Category pill badges in Cobalt
 * - Reading time tags ("6 min read", "8 min read")
 * - Dynamic card elevation (translateY(-6px))
 */

interface StoryCard {
  id: string
  title: string
  standfirst: string
  category: string
  readTime: string
  image: string
  href: string
  isLive?: boolean
}

const STORIES: StoryCard[] = [
  {
    id: 'alkota',
    title: 'Alkota Bikes: Sub-Second 3D Frame Geometry & Configuration Engine',
    standfirst: 'Replacing bloated tracking stacks with bespoke Next.js 16 WebGL inspection.',
    category: 'BUILD',
    readTime: '6 min read',
    image: '/images/cinematic/work-alkota.jpg',
    href: '/work/alkota-bikes',
    isLive: true,
  },
  {
    id: 'drawdown',
    title: 'Drawdown Terminal: 5,000 Ticks Per Second Macro Volatility Modeler',
    standfirst: 'Real-time financial risk modeling with sub-10ms canvas rendering.',
    category: 'SEARCH // RISK',
    readTime: '8 min read',
    image: '/images/cinematic/work-drawdown.jpg',
    href: '/work/drawdown',
    isLive: true,
  },
  {
    id: 'entirefm',
    title: 'EntireFM: 8 Domains Unified with Surgical Schema & Zero Traffic Loss',
    standfirst: 'Enterprise facilities management consolidation under unified search authority.',
    category: 'SEARCH',
    readTime: '5 min read',
    image: '/images/cinematic/work-entirefm.jpg',
    href: '/work/entirefm',
    isLive: true,
  },
  {
    id: 'careeros',
    title: 'CareerOS: Autonomous Talent Workflow Pipeline Powered by Agentic AI',
    standfirst: 'Automating multi-stage candidate scoring with custom evaluation heuristics.',
    category: 'SYSTEMS',
    readTime: '7 min read',
    image: '/images/cinematic/work-careeros.jpg',
    href: '/work/careeros',
    isLive: true,
  },
  {
    id: 'teardown',
    title: 'Websites We Would Fire: The Enterprise Redesign Epidemic',
    standfirst: 'A forensic audit of the 12 most expensive design blunders in commercial B2B.',
    category: 'TEARDOWNS',
    readTime: '12 min read',
    image: '/images/cinematic/work-nestiq.jpg',
    href: '/lobby/websites-we-would-fire',
    isLive: false,
  },
]

export function StoriesCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const SCROLL_STEP = 360

  function scrollPrev() {
    railRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' })
  }
  function scrollNext() {
    railRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' })
  }

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
      aria-labelledby="stories-heading"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 6.5rem)' }}
    >
      <div className="mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Section Caption + Circular Navigation Arrows ─────────── */}
        <div data-reveal="" className="panel-caption-rbx">
          <div className="flex items-baseline gap-4">
            <h2
              id="stories-heading"
              className="panel-caption-rbx__title"
            >
              Latest Work &amp; Intelligence
            </h2>
            <span className="hidden sm:inline-block text-xs font-light text-white/40 tracking-[0.14em] uppercase">
              Stories &amp; Case Studies
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous story cards"
              className="rb-arrow-btn"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next story cards"
              className="rb-arrow-btn"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* ── Horizontal Story Card Feed (cosmos-story-card) ───────── */}
        <div
          ref={railRef}
          className="flex overflow-x-auto gap-6 pb-6 rb-scrollrail cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          role="list"
          aria-label="Latest stories and case studies"
        >
          {STORIES.map((story, i) => (
            <Link
              key={story.id}
              href={story.href}
              role="listitem"
              className="group flex-shrink-0 flex flex-col justify-between bg-[#00162B] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{
                width: 'clamp(280px, 30vw, 380px)',
                scrollSnapAlign: 'start',
                animationDelay: `${i * 80}ms`,
              }}
              data-reveal=""
              draggable={false}
            >
              {/* 16:9 Thumbnail with Zoom */}
              <div
                className="w-full overflow-hidden relative bg-[#001C39]"
                style={{ aspectRatio: '16/9' }}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  width={380}
                  height={214}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.35,0,0,1)] group-hover:scale-108"
                  draggable={false}
                />

                {/* Category Pill Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[0.625rem] font-light tracking-[0.14em] uppercase text-white shadow-md"
                    style={{ backgroundColor: 'var(--color-cobalt, #3157FF)' }}
                  >
                    {story.category}
                  </span>
                </div>

                {/* Gradient Scrim */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, #00162B 0%, rgba(0, 22, 43, 0.4) 30%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    className="font-extralight text-white leading-snug group-hover:text-[var(--color-cobalt)] transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {story.title}
                  </h3>
                  <p className="font-light text-white/60 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
                    {story.standfirst}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {story.isLive && (
                      <span className="cosmos-live-icon-animated text-[var(--color-cobalt)]" aria-hidden="true">
                        <span className="cosmos-live-icon-animated__dot" />
                      </span>
                    )}
                    <span className="text-[0.6875rem] font-light text-white/50 tracking-[0.06em]">
                      {story.readTime}
                    </span>
                  </div>

                  <span className="text-white/40 group-hover:text-white transition-colors duration-200 text-sm">
                    Read Story →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
