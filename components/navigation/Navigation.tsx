'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/analytics'
import { FullScreenMenu } from './FullScreenMenu'

/**
 * Navigation — Red Bull Faithful Duplication
 *
 * Exact Red Bull layout from redbull.com/gb-en:
 * - THREE-ZONE: Logo left · Category links center · Search right
 * - Fully transparent over hero (no background)
 * - On scroll > 10px: rgba(0,0,0,0.75) + backdrop-blur(12px) 
 * - Always white text (hero is always dark)
 * - Nav links: underline draws from left on hover (scaleX 0→1)
 * - On non-hero light pages: switches to dark text on ivory bg
 *
 * Animations:
 * - Logo: opacity:0 → 1, delay 100ms, 400ms ease
 * - Links: staggered opacity:0 → 1, 50ms per item from 200ms
 * - Link hover: ::after underline scaleX(0→1), 300ms cubic-bezier(0.25,1,0.5,1)
 * - Scroll bg: transition background 300ms ease
 * - Mobile menu: slide-in from top, 350ms ease-out
 */

function isActiveLink(pathname: string | null | undefined, href: string): boolean {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

// Pages where the hero is dark (nav always white)
const ALWAYS_WHITE_PATHS = new Set(['/'])
// Chapters that are dark-bg (nav text inverts to white)
const DARK_CHAPTERS = new Set(['graphite', 'wine', 'petrol', 'hero'])

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
  const [isDarkChapter, setIsDarkChapter] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Always white on homepage (hero is always dark)
  const isHomepage = pathname === '/'
  const useWhiteText = isHomepage || isDarkChapter

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 10)

      if (isHomepage) return // homepage always white

      // Dark chapter detection for other pages
      const headerY = 50
      const chapterSections = document.querySelectorAll<HTMLElement>('[data-chapter]')
      let currentDark = false
      for (const section of chapterSections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= headerY && rect.bottom >= headerY) {
          const chapter = section.getAttribute('data-chapter')
          if (chapter && DARK_CHAPTERS.has(chapter)) {
            currentDark = true
          }
          break
        }
      }
      setIsDarkChapter(currentDark)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isHomepage])

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

  // Background: transparent on unscrolled hero, dark glass on scroll
  const navBg = menuOpen
    ? 'bg-transparent'
    : scrolled
      ? useWhiteText
        ? 'bg-black/75 backdrop-blur-xl'
        : 'bg-white/90 backdrop-blur-xl border-b border-black/5'
      : 'bg-transparent'

  const textColor = useWhiteText && !menuOpen
    ? 'text-white'
    : 'text-[var(--color-graphite)]'

  return (
    <>
      {/* ── Fixed Header ──────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          navBg,
        ].join(' ')}
        role="banner"
      >
        {/* 3-zone layout: logo · links · actions */}
        <div
          className="flex items-center justify-between"
          style={{
            height: 'clamp(52px, 5vw, 68px)',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
          }}
        >
          {/* ── Left: Wordmark ──────────────────────────────────────── */}
          <Link
            href="/"
            onClick={closeMenu}
            className={['shrink-0 nav-wordmark', textColor].join(' ')}
            aria-label="Avorria — Home"
          >
            <span
              className="font-extralight tracking-[0.22em] uppercase leading-none"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
            >
              AVORRIA
            </span>
          </Link>

          {/* ── Center: Primary Category Links ─────────────────────── */}
          <nav
            className="hidden lg:flex items-center"
            style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, href }, i) => {
              const active = isActiveLink(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={[
                    'rb-nav-link relative font-light uppercase',
                    'transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4',
                    active
                      ? useWhiteText ? 'text-white' : 'text-[var(--color-graphite)]'
                      : useWhiteText
                        ? 'text-white/80 hover:text-white'
                        : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]',
                  ].join(' ')}
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.05em',
                    animationDelay: `${200 + i * 50}ms`,
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                  {/* Underline draw from left on hover */}
                  <span
                    className={[
                      'rb-nav-underline',
                      active ? 'opacity-100 scale-x-100' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Right: Search + Hamburger ───────────────────────────── */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search icon — Red Bull pattern */}
            <Link
              href="/lobby?q="
              aria-label="Search"
              className={[
                'hidden sm:flex items-center justify-center w-8 h-8',
                'transition-opacity duration-200 hover:opacity-70',
                textColor,
              ].join(' ')}
            >
              <svg
                width="18"
                height="18"
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

            {/* Start a project — subtle text link (not a pill) */}
            <Link
              href="/start-a-project"
              onClick={closeMenu}
              className={[
                'hidden md:inline-flex items-center gap-1.5 font-light uppercase tracking-[0.1em] transition-colors duration-200',
                useWhiteText && !menuOpen
                  ? 'text-white/80 hover:text-white border border-white/30 hover:border-white/70'
                  : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] border border-[var(--color-border-strong)]',
              ].join(' ')}
              style={{
                fontSize: '0.75rem',
                padding: '0.5rem 1rem',
                borderRadius: '2px',
              }}
            >
              Start a Project
              <span aria-hidden="true">↗</span>
            </Link>

            {/* Hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={menuOpen ? closeMenu : openMenu}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="full-screen-menu"
              className={[
                'flex flex-col justify-center items-end gap-[5px] w-8 h-8',
                'transition-colors duration-200 cursor-pointer',
                menuOpen
                  ? 'text-[var(--color-graphite)]'
                  : useWhiteText
                    ? 'text-white'
                    : 'text-[var(--color-graphite)]',
              ].join(' ')}
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

      {/* ── Full-Screen Menu ──────────────────────────────────────────── */}
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        triggerRef={hamburgerRef}
      />
    </>
  )
}
