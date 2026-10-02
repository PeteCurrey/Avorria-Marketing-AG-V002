'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { MegaMenuTab, VisualPreview } from './megaMenuData'

interface MegaMenuProps {
  activeTab: MegaMenuTab | null
  isOpen: boolean
  onClose: () => void
  onItemNavigate: () => void
}

export function MegaMenu({
  activeTab,
  isOpen,
  onClose,
  onItemNavigate,
}: MegaMenuProps) {
  const [activePreview, setActivePreview] = useState<VisualPreview | null>(null)

  // Sync default preview when active tab changes
  useEffect(() => {
    if (activeTab) {
      setActivePreview(activeTab.defaultPreview)
    }
  }, [activeTab])

  if (!isOpen || !activeTab) {
    return null
  }

  const currentPreview = activePreview || activeTab.defaultPreview

  return (
    <div
      id={`mega-menu-${activeTab.id}`}
      role="region"
      aria-label={`${activeTab.label} directory`}
      className={[
        'absolute left-0 right-0 top-full z-40',
        'bg-white border-b border-[var(--color-border)]',
        'shadow-[0_32px_64px_-16px_rgba(26,25,22,0.08)]',
        'transition-all duration-300 ease-out',
        'animate-in fade-in-0 slide-in-from-top-1 duration-200',
      ].join(' ')}
      onMouseLeave={() => {
        // Reset to default tab preview on mouse leave of the panel
        setActivePreview(activeTab.defaultPreview)
      }}
    >
      <div className="w-full px-6 md:px-10 lg:px-[7vw] py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left Columns: Editorial Navigation Lists (7 cols) ── */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {activeTab.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-6">
                {/* Column Eyebrow */}
                <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" aria-hidden="true" />
                  <h3 className="text-[0.6875rem] tracking-[0.2em] font-light text-[var(--color-graphite-mid)] uppercase">
                    {section.title}
                  </h3>
                </div>

                {/* Items List */}
                <ul className="space-y-4" role="list">
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx}>
                      <Link
                        href={item.href}
                        onClick={onItemNavigate}
                        onMouseEnter={() => setActivePreview(item.preview)}
                        onFocus={() => setActivePreview(item.preview)}
                        className="group block rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]"
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="text-[0.9375rem] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors duration-200">
                            {item.label}
                          </span>
                          {item.tag && (
                            <span className="text-[0.625rem] tracking-[0.12em] uppercase font-light text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-1.5 py-0.5 rounded-[var(--radius-sm)] shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-1">
                          {item.sublabel}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Optional View All Section Link */}
                {section.viewAllLink && (
                  <div className="pt-2">
                    <Link
                      href={section.viewAllLink.href}
                      onClick={onItemNavigate}
                      className="inline-flex items-center gap-1.5 text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors duration-200"
                    >
                      <span>{section.viewAllLink.label}</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Right Column: Dynamic Visual Aperture (5 cols) ── */}
          <div className="lg:col-span-5 border-l border-[var(--color-border)] pl-0 lg:pl-10">
            <div className="space-y-4">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] border-b border-[var(--color-border)] pb-2.5">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-graphite)]" aria-hidden="true" />
                  <span>{currentPreview.tag}</span>
                </span>
                <span>VERIFIED ASSET</span>
              </div>

              {/* Dynamic Image Container (16:10 aspect ratio) */}
              <Link
                href={currentPreview.href}
                onClick={onItemNavigate}
                className="group relative block w-full aspect-[16/10] overflow-hidden bg-[#161513] border border-[var(--color-border)]"
                tabIndex={0}
                aria-label={`View ${currentPreview.title}`}
              >
                <Image
                  key={currentPreview.image}
                  src={currentPreview.image}
                  alt={currentPreview.title}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] opacity-100"
                  priority
                />

                {/* Subtle vignette and bottom tint */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Corner registration ticks */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40" aria-hidden="true" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40" aria-hidden="true" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40" aria-hidden="true" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40" aria-hidden="true" />
              </Link>

              {/* Preview Details & CTA */}
              <div className="space-y-2 pt-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-lg font-extralight text-[var(--color-graphite)] tracking-[-0.01em]">
                    {currentPreview.title}
                  </h4>
                  <Link
                    href={currentPreview.href}
                    onClick={onItemNavigate}
                    className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] shrink-0 inline-flex items-center gap-1 transition-colors duration-200"
                  >
                    <span>{currentPreview.ctaText || 'Explore'}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[48ch]">
                  {currentPreview.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Micro-Telemetry Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-[var(--color-border)] text-[0.625rem] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
          <div className="flex items-center gap-4">
            <span>AVORRIA DIGITAL STUDIO</span>
            <span>//</span>
            <span>LONDON & GLOBAL</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span>STRICT TYPESCRIPT</span>
            <span>•</span>
            <span>SUB-SECOND LCP</span>
            <span>•</span>
            <span>WCAG AAA</span>
          </div>

          <div>
            <Link
              href="/start-a-project"
              onClick={onItemNavigate}
              className="text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors duration-200 flex items-center gap-1 font-light"
            >
              <span>START SOMETHING WORTH BUILDING</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
