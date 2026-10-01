import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb — visible navigation aid for deeper pages.
 * Also renders BreadcrumbList structured data inline.
 * Used on: /work/[slug], /services/*, /journal/[slug]
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const fullItems = [{ label: 'Home', href: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://avorria.com${item.href}` }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className="flex items-center gap-2 text-[var(--text-label)] text-[var(--color-graphite-muted)] tracking-wider"
          role="list"
        >
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[var(--color-border-strong)]">
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-graphite-mid)] transition-colors duration-[var(--duration-base)]"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-[var(--color-graphite-mid)]' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label.toUpperCase()}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
