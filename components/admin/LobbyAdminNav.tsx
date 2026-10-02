'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const lobbyAdminLinks = [
  { href: '/admin/lobby', label: 'Overview' },
  { href: '/admin/lobby/articles', label: 'Articles' },
  { href: '/admin/lobby/articles/new', label: '+ New Article' },
  { href: '/admin/lobby/categories', label: 'Categories' },
  { href: '/admin/lobby/tags', label: 'Tags' },
  { href: '/admin/lobby/authors', label: 'Authors' },
  { href: '/admin/lobby/settings', label: 'Settings' },
  { href: '/admin/lobby/analytics', label: 'Analytics' },
]

export function LobbyAdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] pb-4 mb-8" aria-label="Lobby admin subnavigation">
      {lobbyAdminLinks.map((link) => {
        const isActive =
          link.href === '/admin/lobby'
            ? pathname === '/admin/lobby'
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[0.6875rem] font-light tracking-[0.14em] uppercase px-3 py-1.5 transition-colors duration-200 ${
              isActive
                ? 'text-[var(--color-graphite)] bg-white border border-[var(--color-border)]'
                : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] hover:bg-white/50'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
