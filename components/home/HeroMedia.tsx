'use client'

/**
 * HeroMedia — Right-panel media for the Hero section.
 *
 * Slots:
 *   poster  = /public/hero/poster.webp  (LCP candidate, loaded eagerly)
 *   video   = /public/hero/hero.mp4     (optional; looping, muted, autoPlay)
 *
 * Until final assets land, renders a high-fidelity architectural placeholder:
 * tonal stone/graphite composition bleeding to top, right and bottom viewport edges.
 *
 * Motion:
 *   - Slow scale 1.04 → 1.0 over 1.4 s (CSS only, no JS)
 *   - prefers-reduced-motion: no scale animation
 *
 * Accessibility:
 *   - aria-hidden on the entire panel (decorative)
 *   - video: muted, playsinline, no controls
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroMediaProps {
  /** Path to poster image — served from /public, e.g. "/hero/poster.webp" */
  poster?: string
  /** Path to optional looping video — e.g. "/hero/hero.mp4" */
  video?: string
  /** Alt text for poster (if present) */
  alt?: string
}

export function HeroMedia({ poster, video, alt = 'Avorria — architectural detail' }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  // Attempt to play video after mount (respects reduced-motion via CSS)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      // Autoplay blocked — poster remains visible, no error thrown
    })
    const handleCanPlay = () => setVideoReady(true)
    v.addEventListener('canplay', handleCanPlay)
    return () => v.removeEventListener('canplay', handleCanPlay)
  }, [])

  return (
    <div
      className="relative w-full h-full overflow-hidden hero-media-panel"
      aria-hidden="true"
    >
      {/* ── Placeholder / Background field ────────────────────────────────── */}
      {/* Always rendered — acts as bg-color + structural composition when
          no real assets are present, and as a colour base beneath them. */}
      <div className="absolute inset-0 hero-media-bg">
        {/* Main tonal ground: seamless ivory in top-left behind navigation, deep architectural stone below & right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 90% at 0% 0%, #F7F5F0 0%, #EDE9E2 32%, #2E2B27 62%, #141311 100%)',
          }}
        />

        {/* Architectural structural lines — fine, low opacity */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Vertical rhythm lines */}
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#3A3835" strokeWidth="0.5" opacity="0.6" />
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#3A3835" strokeWidth="0.5" opacity="0.4" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#3A3835" strokeWidth="0.5" opacity="0.3" />

          {/* Horizontal datum */}
          <line x1="0" y1="38%" x2="100%" y2="38%" stroke="#3A3835" strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="72%" x2="100%" y2="72%" stroke="#3A3835" strokeWidth="0.5" opacity="0.35" />

          {/* Rose hairline accent */}
          <line x1="0" y1="55%" x2="100%" y2="55%" stroke="#B5616A" strokeWidth="0.75" opacity="0.25" />

          {/* Architectural block — large recessed rectangle */}
          <rect
            x="12%"
            y="18%"
            width="70%"
            height="52%"
            fill="none"
            stroke="#3A3835"
            strokeWidth="0.5"
            opacity="0.5"
          />

          {/* Corner registration ticks */}
          <line x1="12%" y1="18%" x2="15%" y2="18%" stroke="#4A4845" strokeWidth="1" />
          <line x1="12%" y1="18%" x2="12%" y2="22%" stroke="#4A4845" strokeWidth="1" />
          <line x1="82%" y1="18%" x2="79%" y2="18%" stroke="#4A4845" strokeWidth="1" />
          <line x1="82%" y1="18%" x2="82%" y2="22%" stroke="#4A4845" strokeWidth="1" />
          <line x1="12%" y1="70%" x2="15%" y2="70%" stroke="#4A4845" strokeWidth="1" />
          <line x1="12%" y1="70%" x2="12%" y2="66%" stroke="#4A4845" strokeWidth="1" />
          <line x1="82%" y1="70%" x2="79%" y2="70%" stroke="#4A4845" strokeWidth="1" />
          <line x1="82%" y1="70%" x2="82%" y2="66%" stroke="#4A4845" strokeWidth="1" />

          {/* Inner tonal plane — a warm lit slab */}
          <rect
            x="18%"
            y="26%"
            width="55%"
            height="36%"
            fill="#2A2724"
            stroke="#3A3835"
            strokeWidth="0.5"
            opacity="0.8"
          />

          {/* Circular form — references Aurora's sculptural ring motif */}
          <circle
            cx="55%"
            cy="44%"
            r="18%"
            fill="none"
            stroke="#4A4845"
            strokeWidth="0.75"
            opacity="0.5"
          />
          <circle
            cx="55%"
            cy="44%"
            r="12%"
            fill="none"
            stroke="#3A3835"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {/* Inner warm highlight arc */}
          <path
            d="M 55% 32% A 12% 12% 0 0 1 64% 44%"
            fill="none"
            stroke="#C8B89A"
            strokeWidth="0.75"
            opacity="0.3"
          />
        </svg>

        {/* Subtle vignette — darkens corners, keeps image "contained" */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(18,16,14,0.55) 100%)',
          }}
        />
      </div>

      {/* ── Poster image (if provided) ─────────────────────────────────────── */}
      {poster && (
        <Image
          src={poster}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className={[
            'object-cover hero-media-poster',
            videoReady ? 'opacity-0' : 'opacity-100',
            'transition-opacity duration-700',
          ].join(' ')}
          style={{ objectPosition: 'center center' }}
        />
      )}

      {/* ── Video (if provided) ────────────────────────────────────────────── */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          className={[
            'absolute inset-0 w-full h-full object-cover hero-media-video',
            videoReady ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-700',
          ].join(' ')}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
