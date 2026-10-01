'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { signOutAction } from '@/lib/actions/auth'
import type { User } from '@/types/platform'

interface AdminNavProps {
  user: User
}

const adminLinks = [
  { label: 'Overview',     href: '/admin/dashboard',     icon: '○' },
  { label: 'Clients',      href: '/admin/clients',        icon: '◫' },
  { label: 'Projects',     href: '/admin/projects',       icon: '⬡' },
  { label: 'Enquiries',    href: '/admin/enquiries',      icon: '◻' },
  { label: 'Messages',     href: '/admin/messages',       icon: '□' },
  { label: 'Documents',    href: '/admin/documents',      icon: '⊡' },
  { label: 'Deliverables', href: '/admin/deliverables',   icon: '↗' },
  { label: 'Activity',     href: '/admin/activity',       icon: '≡' },
  { label: 'Settings',     href: '/admin/settings',       icon: '⊘' },
]

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      await signOutAction()
    })
  }

  return (
    <aside className="w-[220px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-graphite)] flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
        <Link
          href="/"
          className="text-[0.7rem] font-light tracking-[0.2em] uppercase text-[var(--color-ivory)] hover:text-[var(--color-accent-light)] transition-colors duration-[var(--duration-base)] block mb-1"
          aria-label="Avorria — Back to website"
        >
          AVORRIA
        </Link>
        <p className="text-[var(--text-label)] tracking-[0.06em] text-[var(--color-graphite-muted)] uppercase">
          Admin
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" aria-label="Admin navigation">
        <ul className="space-y-0.5" role="list">
          {adminLinks.map(({ label, href, icon }) => {
            const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'flex items-center gap-3 px-3 py-2.5 text-[var(--text-small)] font-light transition-colors duration-[var(--duration-fast)]',
                    isActive
                      ? 'text-[var(--color-ivory)] bg-[rgba(255,255,255,0.08)]'
                      : 'text-[var(--color-graphite-muted)] hover:text-[var(--color-ivory)] hover:bg-[rgba(255,255,255,0.05)]',
                  ].join(' ')}
                >
                  <span className="text-[0.75rem] opacity-60" aria-hidden="true">
                    {icon}
                  </span>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <div className="px-3 mb-3">
          <p className="text-[var(--text-small)] font-light text-[var(--color-ivory)] truncate">{user.name}</p>
          <p className="text-[var(--text-label)] text-[var(--color-graphite-muted)] truncate">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 text-[var(--text-small)] font-light text-[var(--color-graphite-muted)] hover:text-[var(--color-accent-light)] transition-colors duration-[var(--duration-fast)]"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
