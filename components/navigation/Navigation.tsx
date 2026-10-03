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

// ─── Navigation ──────────────────────────────────────────────────────────────

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Hairline fades in after scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
              ? 'bg-white shadow-[0_1px_0_0_var(--color-border)]'
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
              <AvorriaMark />
            </Link>

            {/* Right cluster: The Lobby link + hamburger */}
            <div className="flex items-center gap-5">
              <Link
                href="/lobby"
                onClick={closeMenu}
                className={[
                  'hidden lg:block text-[0.6875rem] font-light tracking-[0.04em]',
                  'transition-colors duration-[var(--duration-base)] link-hover',
                  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]',
                  isActiveLink(pathname, '/lobby')
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
                  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]',
                  menuOpen
                    ? 'text-[var(--color-graphite)] opacity-0 pointer-events-none'
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
function AvorriaMark() {
  return (
    <span className="block">
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
