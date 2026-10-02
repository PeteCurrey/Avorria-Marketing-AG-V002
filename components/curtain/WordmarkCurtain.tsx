'use client'

/**
 * WordmarkCurtain — First-visit architectural entrance curtain.
 *
 * Requirements:
 * - Displays on first visit per session only (via sessionStorage)
 * - Wordmark centered in Work Sans 200 with subtle tracking
 * - Smooth upward slide reveal (GSAP / CSS cubic-bezier)
 * - Instant bypass if prefers-reduced-motion: reduce
 * - Completely unmounted when animation finishes
 * - Invisible if JS is disabled (never traps non-JS users)
 */

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'avorria_curtain_seen'

export function WordmarkCurtain() {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  const [destroyed, setDestroyed] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDestroyed(true)
      return
    }

    // Check session storage — show on first visit only
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setDestroyed(true)
        return
      }
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // If sessionStorage is unavailable or throws, bypass
      setDestroyed(true)
      return
    }

    setMounted(true)

    // Hold wordmark briefly, then trigger graceful upward slide
    const holdTimer = setTimeout(() => {
      setClosing(true)
    }, 600)

    // Remove completely from DOM after transition completes
    const removeTimer = setTimeout(() => {
      setDestroyed(true)
    }, 1500)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (destroyed || !mounted) return null

  return (
    <aside
      aria-hidden="true"
      className={[
        'fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12',
        'bg-[var(--color-ivory)] border-b border-[var(--color-border)] pointer-events-none',
        'transition-transform duration-[850ms]',
        closing ? '-translate-y-full ease-[cubic-bezier(0.76,0,0.24,1)]' : 'translate-y-0',
      ].join(' ')}
    >
      {/* Top telemetry registration */}
      <div className="flex items-center justify-between text-[11px] tracking-[0.2em] font-light text-[var(--color-graphite-muted)] uppercase">
        <span>AVORRIA / STUDIO</span>
        <span>LONDON · GLOBAL</span>
      </div>

      {/* Centered Wordmark */}
      <div className="my-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.25em] text-[var(--color-graphite)] uppercase select-none">
          AVORRIA
        </h1>
        <div className="flex items-center justify-center gap-3 mt-4 text-[10px] tracking-[0.22em] text-[var(--color-graphite-mid)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span>DIGITAL PRODUCTS · SYSTEMS · INTELLIGENCE</span>
        </div>
      </div>

      {/* Bottom datum */}
      <div className="flex items-center justify-between text-[10px] tracking-[0.18em] font-light text-[var(--color-graphite-muted)] uppercase border-t border-[var(--color-border)] pt-4">
        <span>EST. 2025</span>
        <span>ALL SYSTEMS VERIFIED</span>
      </div>
    </aside>
  )
}
