'use client'

/**
 * RevealOnScroll — GSAP era
 *
 * This component is now a thin attribute-setter only.
 * It adds data-reveal (or data-reveal-image / data-reveal-stagger) to its child wrapper.
 * Actual scroll-driven animation is registered in SmoothScrollProvider via GSAP ScrollTrigger.
 *
 * Without JS: elements are always at their final visual state (never opacity:0).
 * With reduced-motion: GSAP skips the animation entirely (see SmoothScrollProvider).
 * No IntersectionObserver. No CSS animation-timeline. No in-view class toggling.
 */

import React, { type ReactNode } from 'react'

interface RevealOnScrollProps {
  children?: ReactNode
  delay?: number
  stagger?: boolean
  image?: boolean
  className?: string
  as?: React.ElementType
}

export function RevealOnScroll({
  children,
  delay = 0,
  stagger = false,
  image = false,
  className = '',
  as: Tag = 'div',
}: RevealOnScrollProps) {
  if (!children) {
    // Standalone mode was used to register the shared IO observer.
    // With GSAP taking over, this renders nothing.
    return null
  }

  const dataAttr = image ? 'data-reveal-image' : stagger ? 'data-reveal-stagger' : 'data-reveal'
  // Delay stored as a data attribute so GSAP can read it per-element
  const delayAttr = delay > 0 ? { 'data-reveal-delay': String(delay) } : {}

  return (
    <Tag
      {...{ [dataAttr]: '' }}
      {...delayAttr}
      className={className || undefined}
    >
      {children}
    </Tag>
  )
}
