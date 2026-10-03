import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function LobbyCta() {
  return (
    <section
      aria-labelledby="lobby-cta-heading"
      className="w-full mt-0 pt-20 pb-24 px-0"
      data-chapter="wine"
      style={{ backgroundColor: 'var(--color-wine)', color: 'var(--color-ivory)' }}
    >
      <div className="px-6 md:px-10 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Left: Headline & Copy */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
              <p className="text-[0.625rem] font-light tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent-light)', opacity: 0.7 }}>
                STUDIO CONVERSATIONS
              </p>
            </div>

            <h2
              id="lobby-cta-heading"
              className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight tracking-[-0.025em] leading-[1.08] mb-6 max-w-[24ch]"
              style={{ color: 'var(--color-ivory)' }}
            >
              Good digital work should move the business.
            </h2>

            <p
              className="text-[1.0625rem] sm:text-[1.125rem] font-light leading-relaxed max-w-[54ch]"
              style={{ color: 'var(--color-ivory)', opacity: 0.7 }}
            >
              Avorria designs and develops websites, digital platforms and intelligent systems
              for businesses that expect more from their digital presence.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Button
              as="link"
              href="/services"
              variant="secondary"
              size="lg"
              className="w-full justify-center !text-xs tracking-[0.14em] btn-dark-outline"
            >
              EXPLORE AVORRIA
            </Button>
            <Button
              as="link"
              href="/start-a-project"
              variant="primary"
              size="lg"
              className="w-full justify-center !text-xs tracking-[0.14em]"
            >
              START A PROJECT{' '}
              <span className="btn-arrow ml-1" aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>

        {/* Colophon */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.5625rem] tracking-[0.2em] uppercase font-light"
          style={{ borderTop: '1px solid rgba(247,245,240,0.12)', color: 'var(--color-ivory)', opacity: 0.4 }}
        >
          <span>THE LOBBY — AVORRIA DIGITAL STUDIO</span>
          <span>LONDON &amp; GLOBAL · PRINCIPAL DIRECT COMMISSIONS</span>
        </div>
      </div>
    </section>
  )
}
