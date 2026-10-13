import Link from 'next/link'
import { siteConfig } from '@/content/config/site'

const footerNav = {
  services: [
    { label: '01 // Build Flagships',  href: '/services/build' },
    { label: '02 // Search Architecture', href: '/services/search' },
    { label: '03 // Systems & AI',     href: '/services/systems' },
    { label: 'Commercial Pricing',     href: '/pricing' },
  ],
  diagnostic: [
    { label: 'Website Health Check',    href: '/audit' },
    { label: 'The Agency Teardown',     href: '/teardown' },
    { label: 'Project & Digital Audit', href: '/digital-audit' },
    { label: 'Websites We Would Fire',  href: '/lobby/websites-we-would-fire' },
  ],
  company: [
    { label: 'Verified Work',  href: '/work' },
    { label: 'Services',       href: '/services' },
    { label: 'The Process',    href: '/process' },
    { label: 'About Studio',   href: '/about' },
    { label: 'The Lobby',      href: '/lobby' },
    { label: 'Contact',        href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy',  href: '/cookies' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

/**
 * Footer — Red Bull Dark Obsidian Global Footer
 *
 * Full dark platform styling:
 * - Background: #000F1E
 * - Glass borders: rgba(255, 255, 255, 0.1)
 * - Pure white display branding + Cobalt accents
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-white/10 bg-[#000F1E] text-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Upper Band: Monumental Wordmark & Commission CTA ─────── */}
        <div className="py-12 sm:py-16 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="inline-block font-extralight text-2xl sm:text-3xl tracking-[0.24em] uppercase text-white hover:text-[var(--color-cobalt)] transition-colors duration-200"
              aria-label="Avorria — Home"
            >
              AVORRIA
            </Link>
            <p className="font-light text-white/50 text-sm mt-2 max-w-md">
              High-performance digital products, 3D web engines and autonomous AI systems.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/start-a-project"
              className="rb-pill-btn rb-pill-btn-primary"
            >
              <span>Commission an Audit</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/contact"
              className="rb-pill-btn rb-pill-btn-tertiary"
            >
              <span>Contact Studio</span>
            </Link>
          </div>
        </div>

        {/* ── Main Link Columns ────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 py-14 sm:py-16">

          {/* Disciplines */}
          <div>
            <p className="text-[0.6875rem] font-light text-white/40 tracking-[0.16em] uppercase mb-4">
              Disciplines
            </p>
            <ul className="space-y-2.5" role="list">
              {footerNav.services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm font-light text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostics */}
          <div>
            <p className="text-[0.6875rem] font-light text-white/40 tracking-[0.16em] uppercase mb-4">
              Diagnostics
            </p>
            <ul className="space-y-2.5" role="list">
              {footerNav.diagnostic.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm font-light text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[0.6875rem] font-light text-white/40 tracking-[0.16em] uppercase mb-4">
              Studio
            </p>
            <ul className="space-y-2.5" role="list">
              {footerNav.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm font-light text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Portal */}
          <div>
            <p className="text-[0.6875rem] font-light text-white/40 tracking-[0.16em] uppercase mb-4">
              Client Portal
            </p>
            <p className="text-xs text-white/50 font-light mb-3 leading-relaxed">
              Active clients can access live sprint boards, staging links and metrics.
            </p>
            <Link
              href="/client/login"
              className="inline-flex items-center gap-2 text-xs font-light text-[var(--color-cobalt)] hover:text-white transition-colors duration-200"
            >
              <span>Access Secure Portal</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Direct Line */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-[0.6875rem] font-light text-white/40 tracking-[0.16em] uppercase mb-4">
              Direct Contact
            </p>
            <p className="text-xs text-white/50 font-light mb-2">
              General Inquiries:
            </p>
            <a
              href={`mailto:${siteConfig.email.hello}`}
              className="text-xs sm:text-sm font-light text-white hover:text-[var(--color-cobalt)] transition-colors duration-200 block mb-4"
            >
              {siteConfig.email.hello}
            </a>
            <span className="inline-block px-2.5 py-1 rounded-full text-[0.625rem] font-light tracking-[0.1em] uppercase bg-white/5 text-white/60 border border-white/10">
              Response within 24h
            </span>
          </div>

        </div>

        {/* ── Lower Band: Region, Copyright, Legal ─────────────────── */}
        <div className="border-t border-white/10 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-light text-white/40">
            <span className="flex items-center gap-1.5 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
              United Kingdom / English
            </span>
            <span>·</span>
            <span>© {year} Avorria. All rights reserved.</span>
          </div>

          <ul className="flex flex-wrap gap-5 sm:gap-6 text-xs font-light text-white/40" role="list">
            {footerNav.legal.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  )
}
