import Link from 'next/link'
import { siteConfig } from '@/content/config/site'

const footerNav = {
  services: [
    { label: '01 // Build',   href: '/services/build' },
    { label: '02 // Search',  href: '/services/search' },
    { label: '03 // Systems', href: '/services/systems' },
    { label: 'Commercial Pricing', href: '/pricing' },
  ],
  diagnostic: [
    { label: 'Website Health Check', href: '/audit' },
    { label: 'The Agency Teardown', href: '/teardown' },
    { label: 'Project & Digital Audit', href: '/digital-audit' },
    { label: 'Websites We Would Fire', href: '/lobby/websites-we-would-fire' },
  ],
  company: [
    { label: 'Work',       href: '/work' },
    { label: 'Services',   href: '/services' },
    { label: 'Pricing',    href: '/pricing' },
    { label: 'Process',    href: '/process' },
    { label: 'About',      href: '/about' },
    { label: 'The Lobby',  href: '/lobby' },
    { label: 'Contact',    href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Terms', href: '/terms' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-ivory-dark)]"
      role="contentinfo"
    >
      <div className="container-max">
        <div className="container-content">

          {/* Upper footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 lg:py-20">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-block font-display text-[1.1rem] tracking-[0.16em] uppercase font-light text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] mb-4"
                aria-label="Avorria — Home"
              >
                AVORRIA
              </Link>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6 max-w-[220px]">
                Digital products, intelligent systems and high-performance websites.
              </p>
              <a
                href={`mailto:${siteConfig.email.hello}`}
                className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
                aria-label="Email Avorria"
              >
                {siteConfig.email.hello}
              </a>
            </div>

            {/* Services */}
            <div>
              <p className="text-label-upper mb-5">Services</p>
              <ul className="space-y-3" role="list">
                {footerNav.services.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-[var(--duration-base)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagnostics */}
            <div>
              <p className="text-label-upper mb-5">Diagnostics</p>
              <ul className="space-y-3" role="list">
                {footerNav.diagnostic.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-[var(--duration-base)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-label-upper mb-5">Company</p>
              <ul className="space-y-3" role="list">
                {footerNav.company.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-[var(--duration-base)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/client/login"
                    className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] flex items-center gap-1.5"
                  >
                    <span>Client Portal</span>
                    <span className="text-[var(--text-label)] border border-[var(--color-border)] px-1 text-[var(--color-graphite-mid)]">SECURE</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Start a project */}
            <div>
              <p className="text-label-upper mb-5">Start a project</p>
              <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                Have something worth building? We want to hear about it.
              </p>
              <Link
                href="/start-a-project"
                className="inline-flex items-center gap-2 text-[var(--text-small)] font-light text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
              >
                Start a project ↗
              </Link>
            </div>
          </div>

          {/* Lower footer */}
          <div className="border-t border-[var(--color-border)] py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[var(--text-label)] text-[var(--color-graphite-muted)] tracking-wider">
              © {year} Avorria. All rights reserved.
            </p>
            <ul className="flex gap-6" role="list">
              {footerNav.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[var(--text-label)] text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite-mid)] transition-colors duration-[var(--duration-base)] tracking-wider"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
