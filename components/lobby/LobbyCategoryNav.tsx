import Link from 'next/link'
import type { LobbyCategory } from '@/types/lobby'

interface LobbyCategoryNavProps {
  categories: LobbyCategory[]
  activeSlug?: string
}

export function LobbyCategoryNav({ categories, activeSlug = 'all' }: LobbyCategoryNavProps) {
  // Primary editorial topics
  const primarySlugs = [
    { label: 'ALL', slug: 'all', href: '/lobby' },
    { label: 'SEARCH', slug: 'google-search', href: '/lobby/category/google-search' },
    { label: 'PLATFORMS', slug: 'meta-social', href: '/lobby/category/meta-social' },
    { label: 'WEBSITES', slug: 'websites', href: '/lobby/category/websites' },
    { label: 'MARKETING', slug: 'marketing', href: '/lobby/category/marketing' },
    { label: 'AVORRIA', slug: 'avorria', href: '/lobby/category/avorria' },
  ]

  // Additional dossiers available
  const additionalCategories = categories.filter(
    (c) => !['google-search', 'meta-social', 'websites', 'marketing', 'avorria'].includes(c.slug)
  )

  return (
    <nav
      aria-label="Publication sections"
      className="w-full border-b border-[var(--color-border)] py-4 overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center justify-between gap-8 min-w-max">
        {/* Editorial Section Tabs */}
        <ul className="flex items-center gap-1 sm:gap-2" role="list">
          {primarySlugs.map((item) => {
            const isActive = activeSlug === item.slug
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={[
                    'relative px-3 sm:px-4 py-2 block text-[0.6875rem] font-light tracking-[0.16em] uppercase transition-colors duration-200',
                    isActive
                      ? 'text-[var(--color-graphite)]'
                      : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]',
                  ].join(' ')}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[1.5px] bg-[var(--color-graphite)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Additional Dossiers / Teardowns direct links */}
        {additionalCategories.length > 0 && (
          <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-[var(--color-border)]">
            <span className="text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)]">
              SPECIAL DOSSIERS:
            </span>
            <div className="flex items-center gap-3">
              {additionalCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/lobby/category/${c.slug}`}
                  className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-200"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
