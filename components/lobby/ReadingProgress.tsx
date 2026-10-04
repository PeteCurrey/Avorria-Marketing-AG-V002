'use client'

import { useEffect, useState } from 'react'

/**
 * ReadingProgress
 * Thin (2px) rose reading-progress line for long-form editorial articles.
 * Tracks viewport scroll progress and updates aria-valuenow.
 * Respects prefers-reduced-motion.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    function handleScroll() {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100))
      setProgress(pct)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
    >
      <div
        className="h-full bg-[var(--rose)] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
