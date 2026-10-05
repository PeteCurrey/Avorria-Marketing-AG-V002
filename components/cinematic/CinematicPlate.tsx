'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

export type AspectRatio = '16/9' | '21/9' | '16/10' | '4/5' | '3/2' | '4/3' | '1/1'
export type FadeTone = 'ivory' | 'stone' | 'graphite' | 'petrol' | 'wine'

export interface CinematicPlateProps {
  /** Source path for the image */
  src: string
  /** Accessible alt text */
  alt: string
  /** Aspect ratio of the frame */
  aspectRatio?: AspectRatio
  /** High priority loading for above-the-fold heroes */
  priority?: boolean
  /** Responsive sizes attribute for next/image */
  sizes?: string
  /** Optional directional/vignette edge fading into a section background tone */
  fadedEdges?: boolean | FadeTone
  /** Whether to apply an architectural hairline border */
  bordered?: boolean
  /** Object position for the image (default '50% 50%') */
  objectPosition?: string
  /** Editorial annotation label (e.g. 'PRECISION CYCLING') */
  annotation?: string
  /** Location or timestamp metadata (e.g. 'LONDON STUDIO') */
  metadata?: string
  /** Accent dot color */
  accentColor?: string
  /** Additional container class */
  className?: string
  /** Optional custom overlay content */
  children?: ReactNode
}

const ASPECT_MAP: Record<AspectRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '21/9': 'aspect-[21/9]',
  '16/10': 'aspect-[16/10]',
  '4/5': 'aspect-[4/5]',
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}

const TONE_COLOR_MAP: Record<FadeTone, string> = {
  ivory: 'var(--color-ivory)',
  stone: 'var(--color-stone)',
  graphite: 'var(--color-graphite)',
  petrol: 'var(--color-petrol)',
  wine: 'var(--color-wine)',
}

export function CinematicPlate({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 1200px',
  fadedEdges = false,
  bordered = true,
  objectPosition = '50% 50%',
  annotation,
  metadata,
  accentColor = 'var(--color-accent)',
  className = '',
  children,
}: CinematicPlateProps) {
  const fadeTone: FadeTone = typeof fadedEdges === 'string' ? fadedEdges : 'ivory'
  const fadeBg = TONE_COLOR_MAP[fadeTone]

  return (
    <div className={`group relative w-full ${className}`}>
      {/* ── Main Frame ── */}
      <div
        className={[
          'relative w-full overflow-hidden rounded-[var(--radius-card)]',
          ASPECT_MAP[aspectRatio],
          bordered && !fadedEdges ? 'border border-[var(--color-border)]' : '',
        ].join(' ')}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ objectPosition }}
        />

        {/* Optional 4-Way Gradient Fade */}
        {fadedEdges && (
          <>
            <div
              className="absolute inset-y-0 left-0 w-1/4 pointer-events-none z-10"
              style={{ background: `linear-gradient(to right, ${fadeBg} 0%, transparent 100%)` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 right-0 w-1/4 pointer-events-none z-10"
              style={{ background: `linear-gradient(to left, ${fadeBg} 0%, transparent 100%)` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-1/4 pointer-events-none z-10"
              style={{ background: `linear-gradient(to bottom, ${fadeBg} 0%, transparent 100%)` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none z-10"
              style={{ background: `linear-gradient(to top, ${fadeBg} 0%, transparent 100%)` }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Custom Overlaid Children (e.g. titles, tags) */}
        {children}
      </div>

      {/* ── Editorial Annotation Strip ── */}
      {(annotation || metadata) && (
        <div className="pt-3.5 flex items-center justify-between text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)]">
          {annotation ? (
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
              <span>{annotation}</span>
            </span>
          ) : (
            <span />
          )}

          {metadata && (
            <span className="font-light tracking-[0.14em] text-[var(--color-graphite-muted)]">
              {metadata}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
