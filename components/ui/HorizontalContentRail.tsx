'use client'

import { useRef, type ReactNode } from 'react'

export interface HorizontalContentRailProps {
  children: ReactNode
  className?: string
  gap?: 'sm' | 'md' | 'lg'
  showControls?: boolean
  label?: string
}

/**
 * HorizontalContentRail — Phase 2 Reusable Horizontal Scroll Component
 *
 * Implements native CSS scroll-snap with smooth touch & drag behaviour.
 * Perfect for proof points, horizontal case studies, and article carousels.
 */
export function HorizontalContentRail({
  children,
  className = '',
  gap = 'md',
  showControls = true,
  label = 'Content carousel',
}: HorizontalContentRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  }

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = direction === 'left' ? -400 : 400
    scrollRef.current.scrollBy({ left: offset, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={`relative w-full ${className}`} aria-label={label}>
      {/* Scroll Controls (Desktop) */}
      {showControls && (
        <div className="hidden lg:flex items-center justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)] hover:bg-white transition-all text-xs"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)] hover:bg-white transition-all text-xs"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      )}

      {/* Snap Container */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar ${gapClasses[gap]}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
