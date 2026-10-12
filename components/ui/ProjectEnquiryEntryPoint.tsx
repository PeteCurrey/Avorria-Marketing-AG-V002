import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

export interface ProjectEnquiryEntryPointProps {
  className?: string
}

/**
 * ProjectEnquiryEntryPoint — Phase 2 Dedicated Project Intake Strip
 *
 * Provides a streamlined, high-trust project scoping interface with clear
 * process expectations, turnaround times, and direct action triggers.
 */
export function ProjectEnquiryEntryPoint({ className = '' }: ProjectEnquiryEntryPointProps) {
  return (
    <section
      className={`w-full py-16 bg-white border-y border-[var(--color-border)] ${className}`}
      aria-labelledby="intake-heading"
    >
      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Statement */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-mid)]">
                  COMMISSION INTAKE &amp; SCOPING
                </span>
              </div>
              <h3
                id="intake-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-[var(--color-graphite)] tracking-[-0.02em] leading-tight mb-3"
              >
                Have something worth{' '}
                <em className="not-italic italic font-extralight text-[var(--color-rose-text)]">
                  building?
                </em>
              </h3>
              <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-xl">
                We accept a limited number of comprehensive flagship builds, search architectures, and data systems each quarter. Scoping responses delivered within 24 hours.
              </p>
            </div>

            {/* Right Fast-Track Buttons */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:items-end">
              <Button
                as="link"
                href="/start-a-project"
                variant="cobalt"
                size="md"
                className="w-full sm:w-auto text-center justify-center"
              >
                <span>Start a Project Scoping Flow</span>
                <span aria-hidden="true">↗</span>
              </Button>
              <div className="flex items-center gap-4 text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] justify-center sm:justify-start lg:justify-end">
                <span>Direct Partner Intake</span>
                <span>·</span>
                <span>NDA Protected</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
