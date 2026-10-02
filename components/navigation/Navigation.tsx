'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'
import { MegaMenu } from './MegaMenu'
import { megaMenuTabs, type MegaMenuTab } from './megaMenuData'

// ─── Primary Navigation Structure ────────────────────────────────────────────
interface NavLinkItem {
  id: 'work' | 'services' | 'approach' | 'insights' | 'about'
  label: string
  href: string
}

const desktopNavLinks: NavLinkItem[] = [
  { id: 'work',     label: 'Work',     href: '/work' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'approach', label: 'Approach', href: '/process' },
  { id: 'insights', label: 'Insights', href: '/lobby' },
  { id: 'about',    label: 'About',    href: '/about' },
]

function isActiveLink(pathname: string | null | undefined, href: string): boolean {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Mega Menu State (Desktop)
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile Accordion State
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)

  // 1px hairline fades in after scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setMegaMenuOpen(false)
    setActiveTabId(null)
  }, [pathname])

  // Clear close timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Mega Menu Hover Intent Handlers
  const handleNavMouseEnter = (tabId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveTabId(tabId)
    setMegaMenuOpen(true)
  }

  const handleNavMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
      setActiveTabId(null)
    }, 180)
  }

  const handleMegaMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleMegaMenuMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
      setActiveTabId(null)
    }, 180)
  }

  const closeMegaMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setMegaMenuOpen(false)
    setActiveTabId(null)
  }, [])

  // Keyboard navigation: Escape key closes mega menu or mobile menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (megaMenuOpen) {
          closeMegaMenu()
        }
        if (mobileOpen) {
          setMobileOpen(false)
          mobileButtonRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [megaMenuOpen, mobileOpen, closeMegaMenu])

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
    function handleMobileKeydown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
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
    }
    document.addEventListener('keydown', handleMobileKeydown)
    first?.focus()
    return () => document.removeEventListener('keydown', handleMobileKeydown)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const activeTab = megaMenuTabs.find((t) => t.id === activeTabId) || null

  return (
    <>
      <header
        ref={navContainerRef}
        className={[
          'fixed top-0 left-0 right-0 z-50',
          scrolled || megaMenuOpen
            ? 'bg-white shadow-[0_1px_0_0_var(--color-border)]'
            : 'bg-transparent',
          'transition-all duration-[var(--duration-base)]',
        ].join(' ')}
        role="banner"
        onMouseLeave={handleNavMouseLeave}
      >
        <div className="w-full px-6 md:px-10 lg:px-[7vw]">
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Primary navigation"
          >
            {/* SVG Wordmark */}
            <Link
              href="/"
              className="shrink-0 link-hover"
              aria-label="Avorria — Home"
              onClick={closeMegaMenu}
            >
              <AvorriaMark />
            </Link>

            {/* Desktop Nav — Centred with Mega Menu Triggers */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {desktopNavLinks.map(({ id, label, href }) => {
                const active = isActiveLink(pathname, href)
                const isTabOpen = megaMenuOpen && activeTabId === id

                return (
                  <li
                    key={id}
                    onMouseEnter={() => handleNavMouseEnter(id)}
                    className="relative py-4"
                  >
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      aria-expanded={isTabOpen}
                      aria-haspopup="true"
                      aria-controls={`mega-menu-${id}`}
                      onFocus={() => handleNavMouseEnter(id)}
                      className={[
                        'text-[0.6875rem] font-light tracking-[0.03em]',
                        'transition-colors duration-[var(--duration-base)]',
                        'relative pb-1 link-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]',
                        active || isTabOpen
                          ? 'text-[var(--color-graphite)]'
                          : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]',
                      ].join(' ')}
                    >
                      {label}
                      {(active || isTabOpen) && (
                        <span
                          className={[
                            'absolute bottom-0 left-0 right-0 h-px',
                            isTabOpen ? 'bg-[var(--color-graphite)]' : 'bg-[var(--color-accent)]',
                            'transition-colors duration-200',
                          ].join(' ')}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTAs — Matched Architectural Set */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button
                as="link"
                href="/lobby"
                variant="secondary"
                size="xs"
                className={
                  isActiveLink(pathname, '/lobby')
                    ? '!border-[var(--color-graphite)] !text-[var(--color-graphite)] bg-[var(--color-graphite)]/[0.04]'
                    : ''
                }
                onClick={() => {
                  closeMegaMenu()
                  track('cta_click_lobby', { location: 'navigation' })
                }}
              >
                The Lobby
              </Button>

              <Button
                as="link"
                href="/start-a-project"
                variant="primary"
                size="xs"
                onClick={() => {
                  closeMegaMenu()
                  track('cta_click_start_project', { location: 'navigation' })
                }}
              >
                Start a project{' '}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              ref={mobileButtonRef}
              type="button"
              className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 text-[var(--color-graphite)] focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={[
                  'block w-5 h-px bg-current transition-transform duration-[var(--duration-base)]',
                  mobileOpen ? 'translate-y-[6px] rotate-45' : '',
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
                  mobileOpen ? '-translate-y-[6px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </nav>
        </div>

        {/* ── Desktop Mega Menu Dropdown ── */}
        <div
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <MegaMenu
            activeTab={activeTab}
            isOpen={megaMenuOpen}
            onClose={closeMegaMenu}
            onItemNavigate={closeMegaMenu}
          />
        </div>
      </header>

      {/* ── Subtle Desktop Backdrop Curtain when Mega Menu is Open ── */}
      {megaMenuOpen && (
        <div
          className="hidden lg:block fixed inset-0 top-16 md:top-20 z-30 bg-black/15 backdrop-blur-[2px] transition-opacity duration-300"
          aria-hidden="true"
          onClick={closeMegaMenu}
        />
      )}

      {/* ── Mobile Menu Overlay — Editorial Accordion System ── */}
      <div
        className={[
          'fixed inset-0 z-40 lg:hidden',
          'bg-white overflow-y-auto',
          'transition-[opacity,visibility] duration-[var(--duration-slow)]',
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        ].join(' ')}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={mobileMenuRef}
      >
        <div className="w-full px-6 min-h-full flex flex-col justify-between pt-24 pb-10">
          <nav aria-label="Mobile navigation" className="space-y-1">
            {megaMenuTabs.map((tab) => {
              const isExpanded = expandedMobileSection === tab.id
              const active = isActiveLink(pathname, tab.href)

              return (
                <div key={tab.id} className="border-b border-[var(--color-border)] py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={tab.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'text-xl font-light tracking-[-0.01em] py-3.5',
                        active ? 'text-[var(--color-graphite)]' : 'text-[var(--color-graphite-mid)]',
                      ].join(' ')}
                    >
                      {tab.label}
                    </Link>

                    {/* Expand/Collapse Toggle */}
                    <button
                      type="button"
                      onClick={() => setExpandedMobileSection(isExpanded ? null : tab.id)}
                      className="p-3 text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] text-lg font-light focus:outline-none"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${tab.label} sub-items`}
                    >
                      <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                    </button>
                  </div>

                  {/* Expandable Sub-items */}
                  {isExpanded && (
                    <div className="pb-4 pl-3 space-y-4 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {tab.sections.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-2.5">
                          <p className="text-[0.625rem] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
                            {section.title}
                          </p>
                          <ul className="space-y-2 pl-1" role="list">
                            {section.items.map((item, iIdx) => (
                              <li key={iIdx}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1 text-sm font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]"
                                >
                                  <span>{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="pt-8 space-y-3 border-t border-[var(--color-border)] mt-8">
            <Button
              as="link"
              href="/start-a-project"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileOpen(false)
                track('cta_click_start_project', { location: 'mobile-nav' })
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
                setMobileOpen(false)
                track('cta_click_lobby', { location: 'mobile-nav' })
              }}
            >
              The Lobby
            </Button>

            <p className="text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] text-center pt-3">
              AVORRIA DIGITAL STUDIO // LONDON & GLOBAL
            </p>
          </div>
        </div>
      </div>
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
