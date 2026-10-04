'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Avorria Smooth Scroll & Motion Provider
 *
 * 1. Lenis smooth scrolling driven by GSAP ticker.
 * 2. Initialised once, torn down cleanly on route change and unmount.
 * 3. Completely disabled under prefers-reduced-motion: reduce.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    // Batch reveals for [data-reveal]
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      end: 'top 40%',
      onEnter: (elements: Element[]) => {
        elements.forEach((el) => {
          const delay = parseFloat((el as HTMLElement).dataset.revealDelay ?? '0') / 1000
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay,
              ease: 'power3.out',
              overwrite: 'auto',
            },
          )
        })
      },
      once: true,
    })

    return () => {
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [pathname])

  return <>{children}</>
}
