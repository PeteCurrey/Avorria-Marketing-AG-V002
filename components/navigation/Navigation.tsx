'use client'

import Link from 'next/link'

/**
 * Foundation Navigation
 *
 * Requirements:
 * - Wordmark left ("Avorria", Work Sans Light 300, 1.25rem, tracking 0.04em)
 * - Links right: Work, Method, Audit, The Lobby, Contact
 * - Light weight (Work Sans 300, never 500+)
 * - mix-blend-mode: difference over dark sections, text color #F4F1EB
 * - Collapses to wordmark plus Contact on mobile (screen < 640px)
 * - Safe area inset top respected
 */
export function Navigation() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 pt-[env(safe-area-inset-top,0px)] mix-blend-difference text-[#F4F1EB]"
      aria-label="Main"
    >
      <div className="wrap flex justify-between items-center h-[4.5rem]">
        <Link
          href="/"
          className="text-[1.25rem] font-light tracking-[0.04em]"
          aria-label="Avorria — Return to top"
        >
          Avorria
        </Link>
        <ul className="flex items-center gap-[clamp(1rem,3vw,2.5rem)] list-none m-0 p-0 text-[0.9375rem] font-light">
          <li className="hidden sm:block">
            <Link
              href="/work"
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              Work
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              href="/#method"
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              Method
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              href="/audit"
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              Audit
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              href="/lobby"
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              The Lobby
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
