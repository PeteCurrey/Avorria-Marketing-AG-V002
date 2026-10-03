import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function LobbyCta() {
  return (
    <section
      aria-labelledby="lobby-cta-heading"
      className="w-full mt-16 sm:mt-24 pt-16 sm:pt-20 border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        {/* Left: Headline & Copy */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-graphite)]" aria-hidden="true" />
            <p className="text-[0.625rem] font-light tracking-[0.22em] uppercase text-[var(--color-graphite-muted)]">
              COMMERCIAL INTAKE // STUDIO CONVERSATIONS
            </p>
          </div>

          <h2
            id="lobby-cta-heading"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight tracking-[-0.025em] text-[var(--color-graphite)] leading-[1.08] mb-6 max-w-[24ch]"
          >
            GOOD DIGITAL WORK SHOULD MOVE THE BUSINESS.
          </h2>

          <p className="text-[1.0625rem] sm:text-[1.125rem] font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[54ch]">
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
            className="w-full justify-center !text-xs tracking-[0.14em]"
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

      {/* Baseline colophon */}
      <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.5625rem] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
        <span>THE LOBBY // AVORRIA DIGITAL STUDIO</span>
        <span>LONDON &amp; GLOBAL // PRINCIPAL DIRECT COMMISSIONS</span>
      </div>
    </section>
  )
}
