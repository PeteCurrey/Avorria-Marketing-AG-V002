import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  badge?: string
  backHref?: string
  backLabel?: string
  children: ReactNode
  footerContent?: ReactNode
}

/**
 * Avorria Architectural Split-Screen Authentication Layout
 *
 * Left panel (42–45% viewport width on desktop):
 * - Foundation: #F6F4EF (Warm ivory)
 * - Understated "← Back to Avorria" home link
 * - Brand hierarchy: AVORRIA | CLIENT PORTAL
 * - Architectural typography (Work Sans 200/300)
 *
 * Right panel (55–58% viewport width on desktop):
 * - Edge-to-edge Chicago River architectural photography
 * - Editorial crop, reflections, modern skyscrapers, and bridges
 *
 * Mobile:
 * - Single-column layout prioritizing authentication first
 * - Grounding Chicago architectural image placed below the form
 */
export function AuthLayout({
  title,
  subtitle,
  badge = 'CLIENT PORTAL',
  backHref = '/',
  backLabel = 'Back to Avorria',
  children,
  footerContent,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#F6F4EF] flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden select-none sm:select-auto">
      {/* ─── LEFT: AUTHENTICATION PANEL (42–44% width desktop) ─── */}
      <section
        className="w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-12 xl:p-16 min-h-screen lg:min-h-0 lg:h-full lg:overflow-y-auto bg-[#F6F4EF] z-10 shrink-0"
        aria-label="Client Portal Authentication"
      >
        {/* Top: Understated Back to Home link */}
        <div className="w-full">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 text-[0.75rem] font-light tracking-[0.06em] text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-[var(--duration-base)] py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]"
            aria-label={`${backLabel} — Return to Avorria homepage`}
          >
            <span
              className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ←
            </span>
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Center: Main Form & Editorial Brand Header */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-10 lg:py-6">
          {/* Brand lockup */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="font-display text-[0.9375rem] tracking-[0.22em] font-extralight text-[var(--color-graphite)] uppercase leading-none">
                AVORRIA
              </span>
              <span
                className="inline-block w-px h-3 bg-[var(--color-border)]"
                aria-hidden="true"
              />
              <span className="text-[0.625rem] tracking-[0.18em] font-light text-[var(--color-graphite-muted)] uppercase">
                {badge}
              </span>
            </div>

            <h1 className="font-display text-[2rem] sm:text-[2.25rem] font-extralight text-[var(--color-graphite)] tracking-[-0.02em] leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2.5 text-[0.875rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Authentication Form & Inputs */}
          <div>{children}</div>

          {/* Optional Form Sub-footer */}
          {footerContent && (
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              {footerContent}
            </div>
          )}
        </div>

        {/* Bottom: Subtle System Verification */}
        <div className="w-full pt-6 border-t border-[var(--color-border)]/60 text-[0.6875rem] font-light tracking-[0.04em] text-[var(--color-graphite-muted)] flex flex-wrap items-center justify-between gap-2">
          <span>Encrypted Client Workspace</span>
          <span>© {new Date().getFullYear()} Avorria</span>
        </div>
      </section>

      {/* ─── RIGHT: CHICAGO RIVER ARCHITECTURAL IMAGE (56–58% width desktop) ─── */}
      <section
        className="w-full lg:w-[56%] xl:w-[58%] relative min-h-[360px] sm:min-h-[440px] lg:min-h-0 lg:h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[var(--color-border)]"
        aria-hidden="true"
      >
        <Image
          src="/images/auth/chicago-river.jpg"
          alt="Chicago River architectural cityscape featuring the DuSable Bridge and modern skyscrapers reflecting across the water"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[center_35%]"
        />

        {/* Subtle, neutral gradient transition near center divider on desktop */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F6F4EF]/25 to-transparent hidden lg:block"
          aria-hidden="true"
        />

        {/* Mobile subtle overlay vignette for balanced contrast */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/10 lg:hidden"
          aria-hidden="true"
        />
      </section>
    </div>
  )
}
