'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * 2px Rose Scroll-Progress Line
 *
 * Driven by GSAP ScrollTrigger with scrub.
 * Fixed at top (height: 2px, z-index: 50, background: var(--rose)).
 * Disabled under prefers-reduced-motion: reduce.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const el = barRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        el.style.transform = `scaleX(${self.progress})`
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="progress"
      id="scroll-progress"
      aria-hidden="true"
    />
  )
}
