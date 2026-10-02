'use client'

/**
 * HeroMedia — Right-panel media for the Hero section.
 *
 * Uses the Chicago river architectural photograph with soft left-edge fade
 * on desktop and top-edge fade on mobile to blend seamlessly into the white ground.
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
      {/* ── Chicago River architectural photograph ─────────────────────────── */}
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

      {/* ── White left-edge fade — blends image into white text column (Desktop) ── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: '24%',
          background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── White top-edge fade (Mobile) ──────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none lg:hidden"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)',
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
