'use client'

import { useEffect, useRef } from 'react'

/**
 * RevealOnScroll — applies .in-view class when element enters viewport.
 * Works as the JavaScript fallback for browsers without scroll-driven animations.
 * In browsers WITH scroll-driven animation support, CSS handles it natively
 * and the IntersectionObserver is a no-op (class never triggers CSS transitions).
 *
 * Respects prefers-reduced-motion: no animation applied when user prefers no motion.
 */

interface RevealProps {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  threshold?: number
  delay?: number
}

export function RevealOnScroll({
  children,
  className = '',
  stagger = false,
  threshold = 0.15,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip if browser supports scroll-driven animations natively
    if (CSS.supports('animation-timeline', 'view()')) return

    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => entry.target.classList.add('in-view'), delay)
            } else {
              entry.target.classList.add('in-view')
            }
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay])

  return (
    <div ref={ref} className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}>
      {children}
    </div>
  )
}
