'use client'

import { useState } from 'react'

interface ShareArticlePillProps {
  title: string
  url: string
}

export function ShareArticlePill({ title, url }: ShareArticlePillProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (typeof window === 'undefined') return

    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        })
        return
      } catch {
        // Fall back to clipboard if user dismissed or share failed
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] border border-[var(--color-border)] hover:border-[var(--color-graphite)] px-3 py-1.5 transition-all duration-200"
      aria-label="Share this article"
    >
      <span aria-hidden="true">{copied ? '✓' : '↗'}</span>
      <span>{copied ? 'Link Copied' : 'Share Article'}</span>
    </button>
  )
}
