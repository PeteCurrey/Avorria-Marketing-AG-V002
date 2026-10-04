'use client'

/**
 * RevealOnScroll — Phase 2A
 *
 * Dual-mode component:
 * 1. Used as a wrapper: <RevealOnScroll delay={80}>...</RevealOnScroll>
 *    → renders a div with data-reveal (+ delay via CSS var)
 * 2. Used standalone in layout: <RevealOnScroll />
 *    → registers the shared IntersectionObserver for all data-reveal elements
 *
 * The CSS animation system in globals.css handles the actual transitions.
 * This component provides the data-reveal attributes and the IO registration.
 *
 * @supports (animation-timeline: view()) skips the IO entirely in modern browsers.
 *
 * Content is always visible without JS (`.js` class gates all initial hidden states).
 */

import React, { useEffect, useRef, type ReactNode } from 'react'

// ─── Shared singleton observer ────────────────────────────────────────────────

let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          sharedObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  )
  return sharedObserver
}

// ─── Component ────────────────────────────────────────────────────────────────

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
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip if CSS animation-timeline: view() is supported
    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'view()')) return

    const observer = getObserver()
    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [])

  const dataAttr = image ? 'data-reveal-image' : stagger ? 'data-reveal-stagger' : 'data-reveal'
  const style = delay > 0 ? { '--reveal-delay': `${delay}ms` } as React.CSSProperties : undefined

  if (!children) {
    // Standalone mode — register global observer only (used in layout)
    return <GlobalObserverRegister />
  }

  return (
    <Tag
      ref={ref}
      {...{ [dataAttr]: '' }}
      style={style}
      className={className || undefined}
    >
      {children}
    </Tag>
  )
}

// ─── Global observer registration (standalone mode) ───────────────────────────

function GlobalObserverRegister() {
  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'view()')) return

    const observer = getObserver()
    const selector = '[data-reveal], [data-reveal-stagger], [data-reveal-image]'
    const elements = document.querySelectorAll<HTMLElement>(selector)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}
