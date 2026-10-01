import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function FinalCta() {
  return (
    <section
      className="section-y-large"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <RevealOnScroll>
            <div className="border-t border-[var(--color-border)] pt-16 lg:pt-24">
              <p className="text-label-upper mb-8">Start a project</p>
              <h2
                id="final-cta-heading"
                className="text-display-xl mb-10 max-w-[700px]"
              >
                Have something worth building?
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button as="link" href="/start-a-project" variant="primary" size="lg">
                  Start a project ↗
                </Button>
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Get in touch
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
