'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface ImageRevealProps {
  src: string
  alt: string
  aspectRatio?: '21/9' | '16/9' | '4/3' | '1/1' | '4/5'
  priority?: boolean
  className?: string
  caption?: string
  sizes?: string
}

/**
 * ImageReveal — Phase 2 Reusable Media Reveal Component
 *
 * Provides progressive visual loading, hover scale transition,
 * architectural boundary borders, and graceful fallback.
 */
export function ImageReveal({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  className = '',
  caption,
  sizes = '(min-width: 1024px) 60vw, 100vw',
}: ImageRevealProps) {
  const [loaded, setLoaded] = useState(false)

  const aspectClasses = {
    '21/9': 'aspect-[21/9]',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '4/5': 'aspect-[4/5]',
  }

  return (
    <figure className={`group relative w-full overflow-hidden ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-stone)] border border-[var(--color-border)] ${aspectClasses[aspectRatio]}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={`object-cover object-center transition-all duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03] ${
            loaded ? 'opacity-100 filter-none' : 'opacity-0 filter blur-sm'
          }`}
        />
        {/* Subtle vignette layer */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {caption && (
        <figcaption className="mt-2.5 flex items-center justify-between text-[11px] font-light text-[var(--color-graphite-muted)] tracking-wide">
          <span>{caption}</span>
          <span className="text-[9px] tracking-[0.16em] uppercase opacity-70">ARCHIVE RECORD</span>
        </figcaption>
      )}
    </figure>
  )
}
