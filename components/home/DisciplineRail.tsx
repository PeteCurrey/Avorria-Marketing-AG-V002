'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * DisciplineRail — Red Bull "Energy Drinks" Section Exact Duplicate
 *
 * Red Bull pattern from redbull.com/gb-en:
 * - Section header: "Energy Drinks" left + "View all" right
 * - Horizontal numbered snap-scroll carousel
 * - Each card: image top + number + name + tagline
 * - No visible scrollbar, pointer drag on desktop
 *
 * Avorria translation:
 * - "Our Disciplines" header + "View all" → /services
 * - Items: 01 BUILD, 02 SEARCH, 03 SYSTEMS, 04 THE LOBBY, 05 TEARDOWNS
 *
 * Animations:
 * - Section header: scroll reveal (opacity:0, translateY:20px → in-view, 700ms)
 * - Cards stagger on scroll: 80ms per card delay
 * - Card image hover: scale(1.0 → 1.08), 600ms cubic-bezier(0.25,1,0.5,1)
 * - Card text hover: translateY(0 → -4px), 400ms ease
 */

interface Discipline {
  number: string
  name: string
  tagline: string
  image: string
  href: string
}

const DISCIPLINES: Discipline[] = [
  {
    number: '01',
    name: 'Build',
    tagline: 'Digital flagships & WebGL configurators',
    image: '/images/cinematic/discipline-build.jpg',
    href: '/services/build',
  },
  {
    number: '02',
    name: 'Search',
    tagline: 'Technical SEO & search architecture',
    image: '/images/cinematic/discipline-strategy.jpg',
    href: '/services/search',
  },
  {
    number: '03',
    name: 'Systems',
    tagline: 'Agentic AI & automation pipelines',
    image: '/images/cinematic/discipline-systems.jpg',
    href: '/services/systems',
  },
  {
    number: '04',
    name: 'The Lobby',
    tagline: 'Editorial intelligence & teardowns',
    image: '/images/cinematic/work-alkota.jpg',
    href: '/lobby',
  },
  {
    number: '05',
    name: 'Teardowns',
    tagline: 'Verified site autopsies & competitor analysis',
    image: '/images/cinematic/work-drawdown.jpg',
    href: '/teardown',
  },
]

export function DisciplineRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Desktop drag-to-scroll
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
      aria-labelledby="discipline-rail-heading"
      style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
    >
      {/* ── Section Header: Red Bull "Energy Drinks" pattern ─────── */}
      <div
        data-reveal=""
        className="flex items-baseline justify-between mb-6 sm:mb-8"
        style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}
      >
        <h2
          id="discipline-rail-heading"
          className="font-extralight text-[var(--color-graphite)] uppercase tracking-[0.04em]"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.375rem)' }}
        >
          Our Disciplines
        </h2>
        <Link
          href="/services"
          className="font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-200"
          style={{ fontSize: '0.8125rem', letterSpacing: '0.04em' }}
        >
          View all →
        </Link>
      </div>

      {/* ── Horizontal Snap Rail ─────────────────────────────────── */}
      <div
        ref={railRef}
        className="flex overflow-x-auto gap-4 sm:gap-5 pb-6 rb-scrollrail"
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
        aria-label="Avorria disciplines"
      >
        {DISCIPLINES.map((disc, i) => (
          <Link
            key={disc.number}
            href={disc.href}
            role="listitem"
            className="group flex-shrink-0 rb-discipline-card"
            style={{
              width: 'clamp(220px, 22vw, 280px)',
              scrollSnapAlign: 'start',
              animationDelay: `${i * 80}ms`,
            }}
            data-reveal=""
            draggable={false}
          >
            {/* Image */}
            <div
              className="w-full overflow-hidden bg-[var(--color-stone)]"
              style={{
                aspectRatio: '3/4',
                borderRadius: '2px',
              }}
            >
              <Image
                src={disc.image}
                alt={disc.name}
                width={280}
                height={373}
                className="w-full h-full object-cover rb-card-image"
                draggable={false}
              />
            </div>

            {/* Text */}
            <div
              className="mt-3 rb-card-text"
              style={{ transition: 'transform 400ms cubic-bezier(0.25,1,0.5,1)' }}
            >
              <p
                className="font-light text-[var(--color-cobalt)] uppercase tracking-[0.18em] mb-1"
                style={{ fontSize: '0.6875rem' }}
              >
                {disc.number}
              </p>
              <p
                className="font-extralight text-[var(--color-graphite)] uppercase tracking-[-0.01em]"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.375rem)' }}
              >
                {disc.name}
              </p>
              <p
                className="font-light text-[var(--color-graphite-mid)] mt-1"
                style={{ fontSize: '0.8125rem' }}
              >
                {disc.tagline}
              </p>
            </div>
          </Link>
        ))}

        {/* ── "View all" end card — Red Bull pattern ── */}
        <Link
          href="/services"
          className="group flex-shrink-0 flex flex-col items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-cobalt)] transition-colors duration-300"
          style={{
            width: 'clamp(160px, 15vw, 200px)',
            aspectRatio: '3/4',
            scrollSnapAlign: 'start',
            borderRadius: '2px',
          }}
          aria-label="View all disciplines"
        >
          <span
            className="font-extralight text-[var(--color-graphite-mid)] group-hover:text-[var(--color-cobalt)] transition-colors duration-200 uppercase tracking-[0.06em] text-center"
            style={{ fontSize: '0.8125rem' }}
          >
            View all
          </span>
          <span
            className="text-2xl mt-2 text-[var(--color-graphite-mid)] group-hover:text-[var(--color-cobalt)] group-hover:translate-x-1 transition-all duration-200"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
