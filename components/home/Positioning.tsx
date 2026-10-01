import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Positioning() {
  return (
    <section
      className="section-y border-b border-[var(--color-border)]"
      aria-labelledby="positioning-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <RevealOnScroll>
              <Eyebrow>About Avorria</Eyebrow>
              <h2
                id="positioning-heading"
                className="text-display-m"
              >
                Technology should solve something.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <p className="text-body-l text-secondary mb-6">
                Too many digital projects are built to look impressive rather
                than to do something useful. We take a different position.
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                Avorria combines strategy, design and engineering to create
                digital products and systems that are precise, performant and
                purposeful. We work with businesses that want technology to
                actually do something — to improve a process, open a market,
                reduce friction or create something new.
              </p>
              <p className="text-secondary leading-relaxed">
                We build websites, web applications, AI implementations and
                connected digital systems. Often, the most valuable outcome
                is all three working together.
              </p>
            </RevealOnScroll>

          </div>
        </div>
      </div>
    </section>
  )
}
