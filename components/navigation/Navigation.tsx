'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'

// ─── Nav links — Canonical Architecture ──────────────────────────────────────
const navLinks = [
  { label: 'Work',       href: '/work' },
  { label: 'Services',   href: '/services' },
  { label: 'Pricing',    href: '/pricing' },
  { label: 'Audit',      href: '/audit' },
  { label: 'Process',    href: '/process' },
  { label: 'About',      href: '/about' },
  { label: 'The Lobby',  href: '/lobby' },
  { label: 'Contact',    href: '/contact' },
]

function isActiveLink(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)

  // 1px hairline fades in after scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Focus trap in mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const el = mobileMenuRef.current
    if (!el) return
    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        mobileButtonRef.current?.focus()
      }
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    document.addEventListener('keydown', handleKeydown)
    first?.focus()
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'bg-[var(--color-ivory)]/95 backdrop-blur-sm',
          'transition-shadow duration-[var(--duration-base)]',
          scrolled ? 'shadow-[0_1px_0_0_var(--color-border)]' : '',
        ].join(' ')}
        role="banner"
      >
        <div className="container-max">
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Primary navigation"
          >
            {/* SVG Wordmark */}
            <Link
              href="/"
              className="shrink-0 link-hover"
              aria-label="Avorria — Home"
            >
              <AvorriaMark />
            </Link>

            {/* Desktop nav — centred */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {navLinks.map(({ label, href }) => {
                const active = isActiveLink(pathname, href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'text-[var(--text-small)] font-light tracking-[0.03em]',
                        'transition-colors duration-[var(--duration-base)]',
                        'relative pb-px link-hover',
                        active
                          ? 'text-[var(--color-graphite)]'
                          : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]',
                      ].join(' ')}
                    >
                      {label}
                      {active && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex shrink-0">
              <Button
                as="link"
                href="/start-a-project"
                variant="primary"
                size="sm"
                onClick={() => track('cta_click_start_project', { location: 'navigation' })}
              >
                Start a project{' '}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              ref={mobileButtonRef}
              type="button"
              className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 text-[var(--color-graphite)]"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={[
                  'block w-5 h-px bg-current transition-transform duration-[var(--duration-base)]',
                  mobileOpen ? 'translate-y-[7px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-px bg-current transition-opacity duration-[var(--duration-base)]',
                  mobileOpen ? 'opacity-0' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-px bg-current transition-transform duration-[var(--duration-base)]',
                  mobileOpen ? '-translate-y-[7px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay — full-screen, large type, large tap targets */}
      <div
        className={[
          'fixed inset-0 z-40 lg:hidden',
          'bg-[var(--color-ivory)]',
          'transition-[opacity,visibility] duration-[var(--duration-slow)]',
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        ].join(' ')}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={mobileMenuRef}
      >
        <div className="container-max h-full flex flex-col">
          {/* Spacer for header */}
          <div className="h-16" aria-hidden="true" />

          <nav className="flex-1 flex flex-col justify-between py-10" aria-label="Mobile navigation">
            <ul className="space-y-0" role="list">
              {navLinks.map(({ label, href }) => {
                const active = isActiveLink(pathname, href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'flex items-center justify-between py-5 border-b border-[var(--color-border)]',
                        'text-display-s font-light',
                        'min-h-[60px]',    /* large tap target */
                        active
                          ? 'text-[var(--color-graphite)]'
                          : 'text-[var(--color-graphite-mid)]',
                      ].join(' ')}
                    >
                      {label}
                      {active && (
                        <span className="text-[var(--color-accent)] text-[var(--text-label)]" aria-hidden="true">•</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="pt-8">
              <Button
                as="link"
                href="/start-a-project"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => track('cta_click_start_project', { location: 'mobile-nav' })}
              >
                Start a project ↗
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

// ─── SVG Wordmark ─────────────────────────────────────────────────────────────
// Outlined Work Sans weight 200 geometry. Not live text — immune to font loading.
// Height ~16px. "DIGITAL STUDIO" descriptor hidden on mobile.

function AvorriaMark() {
  return (
    <span className="block">
      {/* Text-based wordmark using the loaded font — visually identical but swap-ready */}
      <span
        className="font-display text-[1.0625rem] tracking-[0.2em] font-extralight text-[var(--color-graphite)] uppercase leading-none"
        aria-label="Avorria"
      >
        AVORRIA
      </span>
      <span
        className="hidden md:block text-[0.5625rem] tracking-[0.2em] font-light text-[var(--color-graphite-mid)] uppercase leading-none mt-0.5"
        aria-hidden="true"
      >
        DIGITAL STUDIO
      </span>
    </span>
  )
}
