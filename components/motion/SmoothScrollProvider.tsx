'use client'

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Avorria Smooth Scroll & Motion Provider
 * Harmonizes Lenis smooth scrolling with GSAP ScrollTrigger ticker.
 * Strict prefers-reduced-motion adherence.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect user motion preferences immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean decelerated exponential curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP ticker for unified frame execution
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <>{children}</>
}
