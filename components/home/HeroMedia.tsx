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

export function HeroMedia({ poster = '/images/hero/hero-bg.jpg', video, alt = 'Avorria — marketing and AI' }: HeroMediaProps) {
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
      {/* ── Hero background image ──────────────────────────────────────────── */}
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

      {/* ── White left-edge fade — blends image into the white text column ── */}
      {/* Desktop: horizontal gradient from solid white → transparent */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: '22%',
          background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        }}
      />
      {/* Mobile: vertical gradient from solid white → transparent at the top */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none lg:hidden"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        }}
      />

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
