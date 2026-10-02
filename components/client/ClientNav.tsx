'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useActionState, useTransition } from 'react'
import { signOutAction } from '@/lib/actions/auth'
import type { User } from '@/types/platform'

interface ClientNavProps {
  user: User
  organisationName?: string
}

const clientLinks = [
  { label: 'Overview',     href: '/client/dashboard',     icon: '○' },
  { label: 'Projects',     href: '/client/projects',       icon: '◫' },
  { label: 'Messages',     href: '/client/messages',       icon: '□' },
  { label: 'Documents',    href: '/client/documents',      icon: '⊡' },
  { label: 'Deliverables', href: '/client/deliverables',   icon: '↗' },
  { label: 'Activity',     href: '/client/activity',       icon: '≡' },
  { label: 'Settings',     href: '/client/settings',       icon: '⊘' },
]

export function ClientNav({ user, organisationName }: ClientNavProps) {
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      await signOutAction()
    })
  }

  return (
    <aside className="w-[220px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-white)] flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <Link
          href="/"
          className="text-[0.75rem] font-light tracking-[0.18em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] block mb-4"
          aria-label="Avorria — Back to website"
        >
          AVORRIA
        </Link>
        {organisationName && (
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] truncate">
            {organisationName}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" aria-label="Client portal navigation">
        <ul className="space-y-0.5" role="list">
          {clientLinks.map(({ label, href, icon }) => {
            const isActive = pathname ? (pathname === href || (href !== '/client/dashboard' && pathname.startsWith(href))) : false
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'flex items-center gap-3 px-3 py-2.5 text-[var(--text-small)] font-light transition-colors duration-[var(--duration-fast)]',
                    isActive
                      ? 'text-[var(--color-graphite)] bg-[var(--color-ivory)]'
                      : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] hover:bg-[var(--color-ivory)]',
                  ].join(' ')}
                >
                  <span className="text-[0.8125rem] text-[var(--color-graphite-muted)]" aria-hidden="true">
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
      <div className="p-4 border-t border-[var(--color-border)]">
        <div className="px-3 mb-3">
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)] truncate">{user.name}</p>
          <p className="text-[var(--text-label)] text-[var(--color-graphite-muted)] truncate">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 text-[var(--text-small)] font-light text-[var(--color-graphite-muted)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-fast)]"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
