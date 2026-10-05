'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface ParallaxPlateProps {
  children: ReactNode
  /** Parallax intensity factor in percentage (default 8) */
  speed?: number
  className?: string
}

export function ParallaxPlate({
  children,
  speed = 8,
  className = '',
}: ParallaxPlateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    tl.fromTo(
      inner,
      { yPercent: -speed },
      { yPercent: speed, ease: 'none' }
    )

    return () => {
      tl.kill()
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
