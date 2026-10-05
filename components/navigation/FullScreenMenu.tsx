'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'

// ─── Destination Registry ────────────────────────────────────────────────────

interface Destination {
  id: string
  label: string
  href: string
  sublabel: string
  image: string
  imageCaption: string
  tag: string
}

const destinations: Destination[] = [
  {
    id: 'work',
    label: 'Work',
    href: '/work',
    sublabel: 'Seven verified production projects',
    image: '/images/cinematic/work-alkota.jpg',
    imageCaption: 'Alkota Bikes — 3D WebGL Titanium Configurator',
    tag: 'SELECTED WORK',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    sublabel: 'Build · Search · Systems · AI',
    image: '/images/cinematic/discipline-build.jpg',
    imageCaption: 'Engineering Disciplines & Systems Architecture',
    tag: 'CAPABILITIES',
  },
  {
    id: 'approach',
    label: 'Approach',
    href: '/process',
    sublabel: 'Seven-stage delivery protocol',
    image: '/images/positioning/manifesto.jpg',
    imageCaption: 'Precision Engineering Methodology',
    tag: 'METHODOLOGY',
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    sublabel: 'Engineers. Designers. Strategists.',
    image: '/images/cinematic/discipline-strategy.jpg',
    imageCaption: 'The Studio — Independent Digital Architecture',
    tag: 'THE STUDIO',
  },
  {
    id: 'lobby',
    label: 'The Lobby',
    href: '/lobby',
    sublabel: 'Editorial intelligence for modern operators',
    image: '/images/cinematic/work-tafm.jpg',
    imageCaption: 'Commercial Marketplace Infrastructure',
    tag: 'INTELLIGENCE',
  },
  {
    id: 'start',
    label: 'Start a Project',
    href: '/start-a-project',
    sublabel: 'Have something worth building?',
    image: '/images/hero/hero-bg.jpg',
    imageCaption: 'Avorria Architecture Studio & Commissioning',
    tag: 'COMMISSION',
  },
]

// ─── Props ───────────────────────────────────────────────────────────────────

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FullScreenMenu({ isOpen, onClose, triggerRef }: FullScreenMenuProps) {
  const [activeId, setActiveId] = useState<string>(destinations[0].id)
  const [imageKey, setImageKey] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const activeDestination = destinations.find((d) => d.id === activeId) ?? destinations[0]

  // Set image key to force crossfade on destination change
  function handleDestinationEnter(id: string) {
    if (id !== activeId) {
      setActiveId(id)
      setImageKey((k) => k + 1)
    }
  }

  // Focus trap
  useEffect(() => {
    if (!isOpen) return
    const overlay = overlayRef.current
    if (!overlay) return

    // Focus the close button on open
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        triggerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      if (!overlay) return

      const focusable = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isOpen, onClose, triggerRef])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset active destination when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveId(destinations[0].id)
      setImageKey(0)
    }
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      id="full-screen-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      className={[
        'fixed inset-0 z-[200] bg-white',
        'flex flex-col',
        'transition-[opacity,visibility] duration-[var(--duration-slow)] ease-out',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
      ].join(' ')}
    >
      {/* ── Mirrored Header Bar ── */}
      <div className="shrink-0 w-full px-6 md:px-10 lg:px-[7vw]">
        <div className="flex items-center justify-between h-16 md:h-20 border-b border-[var(--color-border)]">
          {/* Section label — changes with active destination */}
          <span className="text-[0.5625rem] tracking-[0.2em] font-light text-[var(--color-graphite-muted)] uppercase hidden md:block select-none">
            {activeDestination.tag}
          </span>

          {/* Wordmark (centred on mobile, left of centre on desktop) */}
          <Link
            href="/"
            onClick={onClose}
            className="shrink-0 link-hover"
            aria-label="Avorria — Home"
          >
            <span
              className="font-display text-[1.0625rem] tracking-[0.2em] font-extralight text-[var(--color-graphite)] uppercase leading-none"
              aria-label="Avorria"
            >
              AVORRIA
            </span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-5">
            <Link
              href="/lobby"
              onClick={onClose}
              className="hidden lg:block text-[0.6875rem] font-light tracking-[0.04em] text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-[var(--duration-base)] link-hover"
            >
              The Lobby
            </Link>

            {/* Close — precise × character, no pill */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="text-[1.375rem] font-extralight leading-none text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors duration-[var(--duration-base)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)] w-8 h-8 flex items-center justify-center"
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* ── Signature Hairline — draws on open ── */}
      <div
        className={[
          'shrink-0 h-px bg-[var(--color-border)] origin-left',
          isOpen ? 'menu-rule-draw' : '',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-6 md:px-10 lg:px-[7vw] py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* ── Left Column — Primary Destinations ── */}
            <nav
              className="lg:col-span-7"
              aria-label="Primary destinations"
            >
              {/* Eyebrow */}
              <p className="text-[0.5625rem] tracking-[0.2em] font-light text-[var(--color-graphite-muted)] uppercase mb-6 lg:mb-8">
                Navigation
              </p>

              <ul className="space-y-0" role="list">
                {destinations.map((dest, idx) => {
                  const isActive = dest.id === activeId
                  return (
                    <li
                      key={dest.id}
                      className={[
                        'border-b border-[var(--color-border)]',
                        isOpen ? 'menu-item-reveal' : 'opacity-0',
                      ].join(' ')}
                      style={isOpen ? { animationDelay: `${80 + idx * 45}ms` } : undefined}
                    >
                      <Link
                        href={dest.href}
                        onClick={() => {
                          track('menu_nav_click', { destination: dest.id })
                          onClose()
                        }}
                        onMouseEnter={() => handleDestinationEnter(dest.id)}
                        onFocus={() => handleDestinationEnter(dest.id)}
                        className={[
                          'group flex items-baseline justify-between gap-4 py-4 lg:py-5',
                          'transition-colors duration-[var(--duration-base)]',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]',
                          'focus-visible:rounded-[var(--radius-sm)]',
                        ].join(' ')}
                      >
                        {/* Destination label */}
                        <span
                          className={[
                            'font-display font-extralight tracking-[-0.02em] leading-none',
                            'text-[clamp(2rem,5.5vw,4.25rem)]',
                            'transition-colors duration-[var(--duration-base)]',
                            isActive
                              ? 'text-[var(--color-graphite)]'
                              : 'text-[var(--color-graphite-mid)] group-hover:text-[var(--color-graphite)]',
                          ].join(' ')}
                        >
                          {dest.label}
                        </span>

                        {/* Sublabel + arrow — fade in on hover */}
                        <span className="flex items-center gap-3 shrink-0">
                          <span
                            className={[
                              'hidden md:block text-[0.75rem] font-light tracking-[0.03em]',
                              'transition-[opacity,color] duration-[var(--duration-base)]',
                              isActive
                                ? 'opacity-100 text-[var(--color-graphite-mid)]'
                                : 'opacity-0 group-hover:opacity-100 text-[var(--color-graphite-muted)]',
                            ].join(' ')}
                          >
                            {dest.sublabel}
                          </span>
                          <span
                            className={[
                              'text-lg font-extralight leading-none',
                              'transition-[opacity,transform,color] duration-[var(--duration-base)]',
                              isActive
                                ? 'opacity-100 translate-x-0 text-[var(--color-graphite)]'
                                : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--color-graphite-mid)]',
                            ].join(' ')}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Mobile bottom CTAs */}
              <div className="lg:hidden pt-8 space-y-3">
                <Button
                  as="link"
                  href="/start-a-project"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => {
                    track('cta_click_start_project', { location: 'fullscreen-menu-mobile' })
                    onClose()
                  }}
                >
                  Start a project ↗
                </Button>
                <Button
                  as="link"
                  href="/lobby"
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => {
                    track('cta_click_lobby', { location: 'fullscreen-menu-mobile' })
                    onClose()
                  }}
                >
                  The Lobby
                </Button>
              </div>
            </nav>

            {/* ── Right Column — Visual Panel (desktop only) ── */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 sticky top-8">

              {/* Image frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#161513] rounded-[var(--radius-card)]">
                <Image
                  key={imageKey}
                  src={activeDestination.image}
                  alt={activeDestination.imageCaption}
                  fill
                  sizes="35vw"
                  priority
                  className="object-cover object-center menu-image-reveal"
                />
                {/* Vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                {/* Corner registration ticks — Avorria visual language */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" aria-hidden="true" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" aria-hidden="true" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" aria-hidden="true" />
              </div>

              {/* Image metadata */}
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.75rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  {activeDestination.imageCaption}
                </p>
                <span className="shrink-0 text-[0.5625rem] tracking-[0.14em] font-light text-[var(--color-graphite-muted)] uppercase">
                  {activeDestination.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="shrink-0 border-t border-[var(--color-border)]">
        <div className="w-full px-6 md:px-10 lg:px-[7vw]">
          <div className="flex items-center justify-between h-12">
            <p className="text-[0.5625rem] tracking-[0.2em] font-light text-[var(--color-graphite-muted)] uppercase">
              AVORRIA DIGITAL STUDIO · LONDON &amp; GLOBAL
            </p>
            <Link
              href="/start-a-project"
              onClick={() => {
                track('cta_click_start_project', { location: 'fullscreen-menu-bottom' })
                onClose()
              }}
              className="hidden lg:flex items-center gap-1.5 text-[0.5625rem] tracking-[0.18em] font-light text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] uppercase transition-colors duration-[var(--duration-base)]"
            >
              <span>START SOMETHING WORTH BUILDING</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
