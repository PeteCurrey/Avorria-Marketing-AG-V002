'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'

export type RevealDirection = 'bottom-to-top' | 'left-to-right' | 'right-to-left' | 'center-out'

export interface ImageRevealProps {
  /** Image source */
  src: string
  /** Accessible alt text */
  alt: string
  /** Responsive sizes attribute for Next.js Image */
  sizes?: string
  /** High-priority loading for above-the-fold viewport heroes */
  priority?: boolean
  /** Aspect ratio container class or Tailwind arbitrary aspect ratio e.g. 'aspect-[16/9]' */
  aspectRatio?: 'aspect-[16/9]' | 'aspect-[21/9]' | 'aspect-[16/10]' | 'aspect-[4/5]' | 'aspect-[3/2]' | 'aspect-[4/3]' | 'aspect-[2/3]' | 'aspect-square'
  /** Art-directed object position focal point e.g. '65% center' (Section 30.19) */
  objectPosition?: string
  /** Direction of clip mask reveal */
  direction?: RevealDirection
  /** Duration in ms (defaults to 950ms per Section 30.34) */
  durationMs?: number
  /** Delay in ms before reveal triggers */
  delayMs?: number
  /** Optional container className */
  className?: string
  /** Optional overlaid children (titles, badges) */
  children?: ReactNode
}

const CLIP_INITIAL: Record<RevealDirection, string> = {
  'bottom-to-top': 'inset(100% 0 0 0)',
  'left-to-right': 'inset(0 100% 0 0)',
  'right-to-left': 'inset(0 0 0 100%)',
  'center-out': 'inset(50% 50% 50% 50%)',
}

const CLIP_REVEALED = 'inset(0% 0% 0% 0%)'

/**
 * ImageReveal — Section 30.20
 *
 * Behavior:
 * 1. Image begins clipped
 * 2. Section enters viewport
 * 3. Clip expands over 700-1200ms
 * 4. Image subtly scales from 1.04 → 1.0 (camera movement)
 * 5. Respects prefers-reduced-motion unconditionally
 */
export function ImageReveal({
  src,
  alt,
  sizes = '(max-width: 1024px) 100vw, 1400px',
  priority = false,
  aspectRatio = 'aspect-[16/9]',
  objectPosition = '50% 50%',
  direction = 'bottom-to-top',
  durationMs = 950,
  delayMs = 0,
  className = '',
  children,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)

    const el = containerRef.current
    if (!el) return

    if (media.matches) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clipPath = reducedMotion || isInView ? CLIP_REVEALED : CLIP_INITIAL[direction]
  const imageScale = reducedMotion || isInView ? 'scale-100' : 'scale-[1.04]'
  const transitionStyle = reducedMotion
    ? 'none'
    : `clip-path ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden rounded-[var(--radius-card)] ${aspectRatio} ${className}`}
      style={{
        clipPath,
        transition: transitionStyle,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageScale} transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
        style={{ objectPosition }}
      />
      {children}
    </div>
  )
}
