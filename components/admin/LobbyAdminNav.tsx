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
    <nav className="flex flex-wrap items-center gap-1 border-b border-white/10 pb-4 text-xs font-mono">
      {lobbyAdminLinks.map((link) => {
        const isActive =
          link.href === '/admin/lobby'
            ? pathname === '/admin/lobby'
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 transition-colors ${
              isActive
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
