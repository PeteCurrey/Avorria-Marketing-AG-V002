import Link from 'next/link'
import type { ReactNode } from 'react'

export interface AnimatedLinkProps {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
  accent?: 'cobalt' | 'coral' | 'graphite'
}

/**
 * AnimatedLink — Section 30.27
 *
 * Engineered editorial text link:
 * - Arrow shifts 4-6px on hover
 * - Fast, crisp 200-300ms transition
 * - Work Sans Light, no bolding
 */
export function AnimatedLink({
  href,
  children,
  external = false,
  className = '',
  accent = 'cobalt',
}: AnimatedLinkProps) {
  const hoverClass =
    accent === 'cobalt'
      ? 'hover:text-[var(--color-cobalt)]'
      : accent === 'coral'
      ? 'hover:text-[var(--color-coral)]'
      : 'hover:text-[var(--color-graphite)]'

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] ${hoverClass} transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      {...externalProps}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  )
}
