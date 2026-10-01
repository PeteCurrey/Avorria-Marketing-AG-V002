import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { ChapterGate } from '@/components/creative/ChapterGate'
import { AgencyAssessmentRunner } from '@/components/teardown/AgencyAssessmentRunner'
import { AnalyticalLedger } from '@/components/creative/AnalyticalLedger'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Agency Teardown // Diagnostic Framework',
  description:
    'An objective diagnostic framework for leadership teams evaluating digital agency arrangements. Audit retainer efficiency, IP ownership, and engineering velocity.',
  path: '/teardown',
})

const COMPARISON_ROWS = [
  {
    key: 'ownership',
    label: 'Code & Repo Sovereignty',
    value: '100% Client Sovereign',
    subtext: 'Client owns GitHub organization, AWS/Vercel root, and DNS directly vs. agency lock-in.',
  },
  {
    key: 'seniority',
    label: 'Engineering Seniority',
    value: 'Staff & Principal Only',
    subtext: 'Zero delegation to junior account managers or undisclosed offshore contractors.',
  },
  {
    key: 'retainer',
    label: 'Commercial Retainer Model',
    value: 'Fixed Sprint Deliverables',
    subtext: 'Bi-weekly production sprints with zero passive rollover retainers.',
  },
  {
    key: 'stack',
    label: 'Technology Architecture',
    value: 'Modern Headless Stack',
    subtext: 'Next.js 16, TypeScript, Supabase, Tailwind v4 vs. legacy WordPress/CMS bloat.',
  },
  {
    key: 'portability',
    label: 'Exit & Portability Velocity',
    value: '<24h Portability',
    subtext: 'Automated CI/CD, documented architecture, and day-one migration readiness.',
  },
]

export default function TeardownPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content space-y-24">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-16">
            <p className="text-label-upper mb-4">[ DIAGNOSTIC CORE // AGENCY TEARDOWN ]</p>
            <h1 className="text-display-l max-w-[800px] mb-6 font-light">
              The Agency Teardown.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-[700px] leading-relaxed">
              An objective diagnostic for leadership teams evaluating their digital agency relationship. Auditing retainer efficiency, intellectual property ownership, and technical velocity.
            </p>
          </div>

          {/* Interactive Diagnostic */}
          <section aria-label="Interactive Agency Teardown Diagnostic">
            <div className="max-w-2xl mb-8">
              <h2 className="text-display-s font-light mb-4">Agency Friction Index.</h2>
              <p className="text-base text-white/60 font-light leading-relaxed">
                Answer five objective questions about your current setup to quantify vendor lock-in, margin leak, and migration risk.
              </p>
            </div>
            <AgencyAssessmentRunner />
          </section>

          {/* Section Interruption */}
          <ChapterGate
            number="01"
            title="THE SOVEREIGNTY PRINCIPLE"
            statement="Ambitious enterprises should own their digital infrastructure. Not rent an agency bottleneck."
          />

          {/* Comparison Ledger */}
          <section className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-display-s font-light mb-4">Structural Comparison.</h2>
              <p className="text-base text-white/60 font-light leading-relaxed">
                How Avorria's sovereign engineering framework compares with traditional agency retainer economics:
              </p>
            </div>

            <AnalyticalLedger
              title="AGENCY ECONOMICS // INFRASTRUCTURE & IP COMPARISON"
              items={COMPARISON_ROWS}
            />
          </section>

          {/* Callout Action */}
          <section className="border border-white/10 bg-[#0e0e0e] p-8 md:p-12">
            <div className="max-w-2xl space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                [ ENGAGEMENT // CONFIDENTIAL REVIEW ]
              </p>
              <h3 className="text-2xl md:text-3xl font-light text-white">
                Request a Confidential Agency Transition Teardown.
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                If you suspect your agency arrangement is bleeding margin or holding back your technology roadmap, we conduct private, NDA-backed code and commercial audits. Fixed deliverable. Complete discretion.
              </p>
              <div className="pt-2">
                <Link
                  href="/start-a-project?track=teardown"
                  className="inline-flex px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
                >
                  Initiate Confidential Teardown
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
