'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/analytics'
import { FullScreenMenu } from './FullScreenMenu'

/**
 * Navigation — Red Bull 1:1 Floating Glass Capsule Duplicate
 *
 * Replicates Red Bull's exact navigation header:
 * - Fixed 68px/56px container over dark media
 * - Left: AVORRIA wordmark
 * - Center: Floating Glass Pill Capsule (`header-navigation-links` with backdrop-filter: blur(20px))
 * - Right: Search trigger, Region Pill ("UK / EN"), and Pill CTA ("Start a Project")
 * - Mobile: Hamburger with sleek slide-in drawer
 */

function isActiveLink(pathname: string | null | undefined, href: string): boolean {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Build', href: '/services/build' },
  { label: 'Search', href: '/services/search' },
  { label: 'Systems', href: '/services/systems' },
  { label: 'The Lobby', href: '/lobby' },
]

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function openMenu() {
    setMenuOpen(true)
    track('nav_menu_open', {})
  }
  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-[#000F1E]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-transparent',
        ].join(' ')}
        role="banner"
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{
            height: 'clamp(56px, 5vw, 68px)',
            paddingInline: 'clamp(1.25rem, 4vw, 3rem)',
            maxWidth: '1920px',
          }}
        >
          {/* ── Left: Wordmark ────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0 flex items-center text-white focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label="Avorria — Homepage"
          >
            <span
              className="font-extralight tracking-[0.24em] uppercase text-white leading-none hover:text-[var(--color-cobalt)] transition-colors duration-200"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.05rem)' }}
            >
              AVORRIA
            </span>
          </Link>

          {/* ── Center: Red Bull Floating Glass Capsule Pill Nav ──────── */}
          <nav
            className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
            aria-label="Primary navigation"
          >
            <div className="header-navigation-links shadow-lg">
              {NAV_LINKS.map(({ label, href }) => {
                const active = isActiveLink(pathname, href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      'header-navigation-links__item',
                      active ? 'header-navigation-links__item--active' : '',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* ── Right: Utilities (Search, Region, CTA Pill) ────────────── */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <Link
              href="/lobby?q="
              aria-label="Search articles and case studies"
              className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            {/* Region / Locale Pill */}
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-[0.6875rem] font-light text-white/60 uppercase tracking-[0.1em] border border-white/10 rounded-full">
              GB / EN
            </span>

            {/* Red Bull Style Pill CTA */}
            <Link
              href="/start-a-project"
              onClick={closeMenu}
              className="hidden md:inline-flex rb-pill-btn rb-pill-btn-primary"
              style={{ fontSize: '0.75rem', padding: '0.45rem 1.15rem' }}
            >
              Start a Project
              <span aria-hidden="true">→</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={menuOpen ? closeMenu : openMenu}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="full-screen-menu"
              className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 text-white cursor-pointer"
            >
              <span className="block w-5 h-[1.5px] bg-current transition-all duration-300" />
              <span className="block w-5 h-[1.5px] bg-current transition-all duration-300" />
              <span
                className="block h-[1.5px] bg-current transition-all duration-300"
                style={{ width: menuOpen ? '1.25rem' : '0.875rem' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Slide-in Mobile Menu ────────────────────────────────────── */}
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        triggerRef={hamburgerRef}
      />
    </>
  )
}
