'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/analytics'
import { FullScreenMenu } from './FullScreenMenu'

// ─── Helper ──────────────────────────────────────────────────────────────────

function isActiveLink(pathname: string | null | undefined, href: string): boolean {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

const DARK_CHAPTERS = new Set(['graphite', 'wine', 'petrol'])

// ─── Navigation ──────────────────────────────────────────────────────────────

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkChapter, setIsDarkChapter] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Header scroll & dark-chapter inversion detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      // Find section currently beneath the header (around y = 50px)
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
    handleScroll() // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Close on route change
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
      {/* ── Fixed Header Bar ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          menuOpen
            ? 'bg-transparent'
            : scrolled
              ? isDarkChapter
                ? 'bg-[#1A1916]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(247,245,240,0.12)]'
                : 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]'
              : 'bg-transparent',
          'transition-all duration-[var(--duration-base)]',
        ].join(' ')}
        role="banner"
      >
        <div className="w-full px-6 md:px-10 lg:px-[7vw]">
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Primary navigation"
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="shrink-0 link-hover"
              aria-label="Avorria — Home"
              onClick={closeMenu}
            >
              <AvorriaMark inverted={isDarkChapter && !menuOpen} />
            </Link>

            {/* Right cluster: The Lobby link + hamburger */}
            <div className="flex items-center gap-5">
              <Link
                href="/lobby"
                onClick={closeMenu}
                className={[
                  'hidden lg:block text-[0.6875rem] font-light tracking-[0.04em]',
                  'transition-colors duration-[var(--duration-base)] link-hover',
                  'focus-visible:outline-2 focus-visible:outline-offset-4',
                  isDarkChapter && !menuOpen
                    ? isActiveLink(pathname, '/lobby')
                      ? 'text-[var(--color-ivory)]'
                      : 'text-[var(--color-accent-light)] hover:text-[var(--color-ivory)]'
                    : isActiveLink(pathname, '/lobby')
                      ? 'text-[var(--color-graphite)]'
                      : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]',
                ].join(' ')}
                aria-current={isActiveLink(pathname, '/lobby') ? 'page' : undefined}
              >
                The Lobby
              </Link>

              {/* Hamburger — precise, no pill, no background */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={menuOpen ? closeMenu : openMenu}
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={menuOpen}
                aria-controls="full-screen-menu"
                className={[
                  'text-[1.375rem] font-extralight leading-none',
                  'transition-colors duration-[var(--duration-base)]',
                  'w-8 h-8 flex items-center justify-center',
                  'focus-visible:outline-2 focus-visible:outline-offset-4',
                  menuOpen
                    ? 'text-[var(--color-graphite)] opacity-0 pointer-events-none'
                    : isDarkChapter
                      ? 'text-[var(--color-ivory)] hover:text-[var(--color-accent-light)]'
                      : 'text-[var(--color-graphite)] hover:text-[var(--color-rose-text)]',
                ].join(' ')}
              >
                {/* Three-line icon — CSS animated */}
                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                  <span className="block w-5 h-px bg-current" />
                  <span className="block w-5 h-px bg-current" />
                  <span className="block w-3.5 h-px bg-current self-end" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Full-Screen Editorial Menu ── */}
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        triggerRef={hamburgerRef}
      />
    </>
  )
}

// ─── SVG Wordmark ─────────────────────────────────────────────────────────────
function AvorriaMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="block">
      <span
        className={[
          'font-display text-[1.0625rem] tracking-[0.2em] font-extralight uppercase leading-none transition-colors duration-200',
          inverted ? 'text-[var(--color-ivory)]' : 'text-[var(--color-graphite)]',
        ].join(' ')}
        aria-label="Avorria"
      >
        AVORRIA
      </span>
      <span
        className={[
          'hidden md:block text-[0.5625rem] tracking-[0.2em] font-light uppercase leading-none mt-0.5 transition-colors duration-200',
          inverted ? 'text-[var(--color-accent-light)] opacity-70' : 'text-[var(--color-graphite-mid)]',
        ].join(' ')}
        aria-hidden="true"
      >
        DIGITAL STUDIO
      </span>
    </span>
  )
}
