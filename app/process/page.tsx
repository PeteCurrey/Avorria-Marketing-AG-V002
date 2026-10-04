import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Process // Seven-Stage Engineering & Delivery Methodology',
  description:
    'Avorria’s seven-stage systematic engineering discipline: Understand, Architect, Design, Engineer, Validate, Launch, and Improve. Engineered for useful, durable outcomes.',
  path: '/process',
})

interface ProcessStage {
  index: string
  title: string
  headline: string
  description: string
  deliverable: string
  decisionPoint: string
  clientInvolvement: string
  spec: string
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    index: '01',
    title: 'Understand',
    headline: 'We diagnose the core commercial friction before drafting architecture.',
    description:
      'Every engagement begins with interrogating business model economics, operator workflows, and customer friction points. We do not accept assumptions about what technology is needed; we uncover what outcome is required.',
    deliverable: 'Diagnostic Memorandum // Commercial Scope Boundaries',
    decisionPoint: 'Proceed to architecture or refine commercial objectives',
    clientInvolvement: 'Executive stakeholder interview (90 mins) & metric access',
    spec: 'DIAGNOSTIC SCOPE PASS',
  },
  {
    index: '02',
    title: 'Architect',
    headline: 'We design the system model before we design the screen.',
    description:
      'Database schemas, caching hierarchies, route boundaries, API integrations, and auth protocols are modeled in code. Defining system topology first prevents compounding technical debt.',
    deliverable: 'Technical Specification Document // Data Schemas & API Contracts',
    decisionPoint: 'Approval of system boundaries, infrastructure stack, and security posture',
    clientInvolvement: 'Technical lead alignment & third-party service credential review',
    spec: 'SYSTEM TOPOLOGY PASS',
  },
  {
    index: '03',
    title: 'Design',
    headline: 'Purposeful editorial design engineered for conversion, not decoration.',
    description:
      'We design interfaces that respect user intelligence. Surgical typography, high-contrast readability, calm spatial rhythm, and tactile micro-states that reinforce institutional credibility.',
    deliverable: 'Interactive Figma Workspace // Design Token System (CSS variables)',
    decisionPoint: 'Sign-off on visual hierarchy, typography scale, and key user flows',
    clientInvolvement: 'Design review session & prototype walk-through',
    spec: 'EDITORIAL APERTURE PASS',
  },
  {
    index: '04',
    title: 'Engineer',
    headline: 'Production-grade code written under strict TypeScript invariants.',
    description:
      'Authoring clean Next.js 16 App Router code with server components, server actions, and strict type safety. Zero third-party script bloat, zero unnecessary client-side bundle weight.',
    deliverable: 'Git Repository Deployments // Staging Environment Preview',
    decisionPoint: 'Sprint milestone demonstration on live staging URLs',
    clientInvolvement: 'Asynchronous review of staging builds on real devices',
    spec: 'STRICT TYPESCRIPT PASS',
  },
  {
    index: '05',
    title: 'Validate',
    headline: 'Forensic automated testing across performance, security, and accessibility.',
    description:
      'We run automated Core Web Vitals sweeps, Playwright end-to-end tests, WCAG contrast proofs, and database Row Level Security policy penetration runs before touching production.',
    deliverable: 'Validation Ledger // CWV Audit Report & Contrast Verification',
    decisionPoint: 'Formal release candidate authorization based on verified test passing',
    clientInvolvement: 'Final acceptance sign-off on staging environment',
    spec: 'INVARIANT VERIFICATION PASS',
  },
  {
    index: '06',
    title: 'Launch',
    headline: 'Controlled zero-downtime deployment with live telemetry observation.',
    description:
      'Production DNS cutover, SSL provisioning, edge cache warming, Google Search Console indexing requests, and real-time error logging via Sentry. Launch is a disciplined procedure.',
    deliverable: 'Production Deployment // Live Telemetry & Monitoring Active',
    decisionPoint: 'Live verification in production environment and DNS propagation check',
    clientInvolvement: 'DNS authorization & live production smoke testing',
    spec: 'EDGE PROVISIONING PASS',
  },
  {
    index: '07',
    title: 'Improve',
    headline: 'Post-launch performance auditing and iterative compounding.',
    description:
      'Digital products require ongoing observation as commercial conditions evolve. We monitor conversion drop-offs, search crawl health, and server-side latency to iterate deliberately.',
    deliverable: 'Quarterly Diagnostic Teardowns // Iterative Optimization Epics',
    decisionPoint: 'Prioritization of next-phase feature roadmap and optimization targets',
    clientInvolvement: 'Quarterly review of commercial telemetry and user behavior',
    spec: 'CONTINUOUS COMPOUNDING PASS',
  },
]

export default function ProcessPage() {
  const processSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Avorria Seven-Stage Digital Engineering Process',
    description: 'Systematic delivery methodology for high-performance websites and digital systems.',
    step: PROCESS_STAGES.map((step) => ({
      '@type': 'HowToStep',
      name: `Stage ${step.index}: ${step.title}`,
      text: step.description,
      position: parseInt(step.index, 10),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
      />
      <PageHero
        eyebrow="PROCESS / SEVEN-STAGE METHODOLOGY"
        headline={[
          { before: 'Method is the' },
          { accent: 'product.' },
        ]}
        body="Every Avorria engagement follows a systematic seven-stage discipline. Not communicated after the fact — it is the mechanism through which quality is produced and maintained."
        primaryCta={{ label: 'Start a project ↗', href: '/start-a-project' }}
        secondaryCta={{ label: 'View our work', href: '/work' }}
        image="/images/projects/careeros/hero.webp"
        imageAlt="CareerOS autonomous skill taxonomy and document synthesis system"
        metaLeft="UNDERSTAND · ARCHITECT · DESIGN · ENGINEER · VALIDATE · LAUNCH · IMPROVE"
        metaRight="SEVEN STAGES"
        theme="petrol"
      />

      <div className="section-y-large bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* Stages Detailed Breakdown */}
            <div className="space-y-16">
              {PROCESS_STAGES.map((stage) => (
                <RevealOnScroll key={stage.index}>
                  <article className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 md:p-12 hover:border-[var(--color-border-strong)] transition-all duration-300">
                    {/* Stage Header */}
                    <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-8 border-b border-[var(--color-border)]">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] tracking-[0.2em] font-light text-[var(--color-rose-text)] uppercase">
                          STAGE {stage.index}
                        </span>
                        <span className="text-[var(--color-border-strong)]" aria-hidden="true">/</span>
                        <h2 className="text-2xl md:text-3xl font-extralight text-[var(--color-graphite)] tracking-tight">
                          {stage.title}
                        </h2>
                      </div>
                      <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-2.5 py-1">
                        {stage.spec}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-lg font-light text-[var(--color-graphite)] leading-relaxed">
                          {stage.headline}
                        </p>
                        <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                          {stage.description}
                        </p>
                      </div>

                      {/* Technical Execution Matrix */}
                      <div className="lg:col-span-5 border border-[var(--color-border)] p-6 bg-[var(--color-ivory)] space-y-4">
                        <div>
                          <span className="text-[9px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] block mb-1">
                            PRIMARY DELIVERABLE
                          </span>
                          <span className="text-xs font-light text-[var(--color-graphite)] block">
                            {stage.deliverable}
                          </span>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-3">
                          <span className="text-[9px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] block mb-1">
                            DECISION GATE
                          </span>
                          <span className="text-xs font-light text-[var(--color-graphite)] block">
                            {stage.decisionPoint}
                          </span>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-3">
                          <span className="text-[9px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] block mb-1">
                            CLIENT INVOLVEMENT
                          </span>
                          <span className="text-xs font-light text-[var(--color-graphite-mid)] block">
                            {stage.clientInvolvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            {/* Bottom Closing CTA */}
            <div className="mt-24 border-t border-[var(--color-border)] pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-display-s mb-4 font-extralight">Apply this methodology to your project</h2>
                  <p className="text-secondary font-light mb-8 max-w-md">
                    Tell us about your technical requirements and we will review how these seven stages configure around your release goals.
                  </p>
                  <Button as="link" href="/start-a-project" variant="primary" size="md">
                    Initiate Stage 01 ↗
                  </Button>
                </div>
                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)]">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)] block mb-2">
                    GOVERNANCE STANDARD
                  </span>
                  <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    Every stage features an explicit binary decision gate. Capital is never committed to subsequent phases until deliverables for the active milestone pass technical review.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
