'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * StoriesCarousel — Red Bull "Stories" Section Exact Duplicate
 *
 * Red Bull pattern from redbull.com/gb-en (confirmed from source):
 * Stories: GTA 5 (Games, 8 min), Soapbox Race (2 min), Edinburgh Fringe (2 min),
 * Fisher interview (MC Battle, 10 min), Neymar (Football, 3 min)
 *
 * Each card:
 * - 16:9 image with hover zoom (scale 1.08)
 * - Small category pill badge (cobalt for Avorria)
 * - Headline (Work Sans 200, ~18-20px)
 * - "N min read" badge bottom
 *
 * Circular prev/next arrow buttons on section header RIGHT side
 *
 * Animations:
 * - Section header: scroll reveal
 * - Cards: stagger reveal (80ms per card)
 * - Image hover: scale(1.0 → 1.08), 600ms cubic-bezier(0.25,1,0.5,1)
 * - Card hover lift: translateY(-6px), 400ms ease
 * - Arrow click: smooth horizontal scroll
 * - Arrow hover: bg fill + color invert, 200ms ease
 */

interface Story {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  href: string
}

const STORIES: Story[] = [
  {
    id: 'alkota',
    title: 'Alkota Bikes: Sub-Second 3D Frame Configurator for Titanium Engineering',
    excerpt: 'How a custom Next.js 16 WebGL platform replaced £6,000 off-the-shelf flows.',
    category: 'BUILD',
    readTime: '6 min read',
    image: '/images/cinematic/work-alkota.jpg',
    href: '/work/alkota-bikes',
  },
  {
    id: 'drawdown',
    title: 'Drawdown: 5,000 Ticks Per Second — High-Frequency Macro Risk Terminal',
    excerpt: 'Real-time volatility modeling with sub-10ms canvas rendering at scale.',
    category: 'SEARCH',
    readTime: '8 min read',
    image: '/images/cinematic/work-drawdown.jpg',
    href: '/work/drawdown',
  },
  {
    id: 'entirefm',
    title: 'EntireFM: 8 Domains Unified. Zero Traffic Loss. Surgical Search Architecture.',
    excerpt: 'Multi-brand enterprise search consolidation with zero cannibalisation.',
    category: 'SEARCH',
    readTime: '5 min read',
    image: '/images/cinematic/work-entirefm.jpg',
    href: '/work/entirefm',
  },
  {
    id: 'careeros',
    title: 'CareerOS: Autonomous Talent Pipeline Powered by Agentic AI',
    excerpt: 'End-to-end recruitment automation removing 80% of screening overhead.',
    category: 'SYSTEMS',
    readTime: '7 min read',
    image: '/images/cinematic/work-careeros.jpg',
    href: '/work/careeros',
  },
  {
    id: 'teardown',
    title: 'Websites We Would Fire: The Enterprise Redesign Epidemic',
    excerpt: 'A forensic audit of the 12 most expensive website mistakes in B2B.',
    category: 'TEARDOWN',
    readTime: '12 min read',
    image: '/images/cinematic/work-nestiq.jpg',
    href: '/lobby/websites-we-would-fire',
  },
]

export function StoriesCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const SCROLL_AMOUNT = 340

  function scrollPrev() {
    railRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
  }
  function scrollNext() {
    railRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })
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
      className="w-full bg-[var(--color-ivory)] border-t border-[var(--color-border)]"
      aria-labelledby="stories-carousel-heading"
      style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
    >
      {/* ── Section Header: title left + circular arrows right ─────── */}
      <div
        data-reveal=""
        className="flex items-center justify-between mb-6 sm:mb-8"
        style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}
      >
        <h2
          id="stories-carousel-heading"
          className="font-extralight text-[var(--color-graphite)] uppercase tracking-[0.04em]"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.375rem)' }}
        >
          Latest Work &amp; Intelligence
        </h2>

        {/* Circular Arrow Buttons — exact Red Bull pattern */}
        <div className="flex items-center gap-2" aria-label="Carousel navigation">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous stories"
            className="rb-arrow-btn group"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next stories"
            className="rb-arrow-btn group"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* ── Horizontal Card Rail ──────────────────────────────────── */}
      <div
        ref={railRef}
        className="flex overflow-x-auto gap-5 pb-6 rb-scrollrail"
        style={{
          paddingInline: 'clamp(1.25rem, 4vw, 3rem)',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        role="list"
        aria-label="Latest work and editorial stories"
      >
        {STORIES.map((story, i) => (
          <Link
            key={story.id}
            href={story.href}
            role="listitem"
            className="group flex-shrink-0 rb-story-card"
            style={{
              width: 'clamp(280px, 28vw, 340px)',
              scrollSnapAlign: 'start',
              animationDelay: `${i * 80}ms`,
            }}
            data-reveal=""
            draggable={false}
          >
            {/* 16:9 Image with zoom hover */}
            <div
              className="w-full overflow-hidden bg-[var(--color-stone)]"
              style={{ aspectRatio: '16/9', borderRadius: '2px' }}
            >
              <Image
                src={story.image}
                alt={story.title}
                width={340}
                height={191}
                className="w-full h-full object-cover rb-card-image"
                draggable={false}
              />
            </div>

            {/* Card body */}
            <div className="mt-3">
              {/* Category pill — Red Bull colored badge pattern */}
              <span
                className="inline-flex items-center px-2.5 py-0.5 text-[0.625rem] font-light uppercase tracking-[0.14em] text-white mb-2.5"
                style={{
                  backgroundColor: 'var(--color-cobalt)',
                  borderRadius: '100px',
                }}
              >
                {story.category}
              </span>

              {/* Headline */}
              <h3
                className="font-extralight text-[var(--color-graphite)] leading-snug"
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {story.title}
              </h3>

              {/* Read time — Red Bull "N min read" pattern */}
              <p
                className="font-light text-[var(--color-graphite-muted)] mt-2"
                style={{ fontSize: '0.75rem' }}
              >
                {story.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
