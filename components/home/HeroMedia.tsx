'use client'

/**
 * HeroMedia — Right-panel media for the Hero section.
 *
 * The image arrives as a confident editorial composition.
 * No white-fade bleed — instead, a subtle shadow/vignette at the left
 * edge creates depth without apologising for the image being there.
 *
 * Desktop: hard architectural edge where text column meets media panel.
 *          A thin graphite rule (1px) separates the two columns.
 * Mobile:  top-edge dark vignette (image sits below text, naturally separated).
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroMediaProps {
  /** Path to poster image — served from /public */
  poster?: string
  /** Path to optional looping video */
  video?: string
  /** Alt text for poster */
  alt?: string
}

export function HeroMedia({
  poster = '/images/hero/hero-bg.jpg',
  video,
  alt = 'Avorria — Chicago river architectural twilight skyline',
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  // Attempt to play video if provided (respects reduced-motion via CSS)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      // Autoplay blocked — poster remains visible
    })
    const handleCanPlay = () => setVideoReady(true)
    v.addEventListener('canplay', handleCanPlay)
    return () => v.removeEventListener('canplay', handleCanPlay)
  }, [])

  return (
    <div
      className="relative w-full h-full overflow-hidden hero-media-panel select-none"
      aria-hidden="true"
    >
      {/* ── Architectural photograph — confident, no apology ───────────────── */}
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

      {/* ── Left edge: subtle shadow vignette (depth, not bleed-to-white) ── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: '12%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Bottom vignette — grounds the image ────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Mobile: dark top vignette — separates from text column ──────────── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none lg:hidden"
        style={{
          height: '20%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Optional Video ────────────────────────────────────────────────── */}
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
