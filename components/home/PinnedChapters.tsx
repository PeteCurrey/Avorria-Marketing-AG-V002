'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Chapter {
  tab: string
  heading: string
  description: string
}

const CHAPTERS: Chapter[] = [
  {
    tab: 'What we do',
    heading: 'Design, build and run your digital estate as one.',
    description: 'Websites, platforms and AI systems from a single team, held to a single standard.',
  },
  {
    tab: 'How it works',
    heading: 'One audit. One roadmap. One team.',
    description: 'We measure what you have first, then fix the highest-value problems in order.',
  },
  {
    tab: 'Proof',
    heading: 'Reported against your numbers.',
    description: 'Every project is tracked against targets agreed at the start, and shown to you plainly.',
  },
]

/**
 * Pinned Chapters Section (#method)
 *
 * Requirements:
 * - ScrollTrigger pin with scrub (height: 320vh)
 * - Three chapters crossfading by progress
 * - Clickable tab rail below
 * - On mobile (under 760px), no pin, chapters stack naturally
 */
export function PinnedChapters() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 760px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isMobile || prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = Math.max(0, Math.min(0.9999, self.progress))
        const step = Math.floor(p * CHAPTERS.length)
        setActiveIdx(step)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  const handleTabClick = (idx: number) => {
    const section = sectionRef.current
    if (!section) return
    const isMobile = window.matchMedia('(max-width: 760px)').matches
    if (isMobile) return

    const span = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: top + span * ((idx + 0.5) / CHAPTERS.length),
      behavior: 'smooth',
    })
  }

  return (
    <section className="chapters-section" id="method" ref={sectionRef} aria-label="How Avorria works">
      <div className="chapters-pin">
        <div className="wrap">
          <div className="chapters-stage">
            {CHAPTERS.map((ch, i) => (
              <article
                key={ch.tab}
                className={`chapter-item ${i === activeIdx ? 'on' : ''}`}
                data-i={i}
              >
                <h2>{ch.heading}</h2>
                <p>{ch.description}</p>
              </article>
            ))}
          </div>
          <div className="chapters-rail" role="tablist" aria-label="Method chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.tab}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                className={i === activeIdx ? 'on' : ''}
                onClick={() => handleTabClick(i)}
              >
                {ch.tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
