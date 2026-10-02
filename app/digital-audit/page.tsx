import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { ChapterGate } from '@/components/creative/ChapterGate'
import { FineLineDiagram } from '@/components/creative/FineLineDiagram'
import { TechnicalAnnotation } from '@/components/creative/TechnicalAnnotation'

export const metadata: Metadata = generatePageMetadata({
  title: 'Project & Digital Audit // Pre-Build Architecture Review',
  description:
    'De-risk your next high-stakes digital platform before committing capital. Comprehensive pre-build architectural, scope, and technical audits by Avorria.',
  path: '/digital-audit',
})

const AUDIT_MODULES = [
  {
    index: '01',
    title: 'Architectural & Tech Stack Validation',
    deliverable: 'Technical Specification Document',
    description:
      'Independent evaluation of proposed databases, cloud infrastructure (AWS/Vercel/Cloudflare), front-end frameworks, and auth protocols. Eliminating architectural dead ends before coding begins.',
  },
  {
    index: '02',
    title: 'Scope De-Risking & Milestone Verification',
    deliverable: 'Fixed Sprint Breakdown Matrix',
    description:
      'Rigorous decomposition of feature requests into discrete engineering epics. Identifying hidden complexities, third-party API rate limits, and integration liabilities.',
  },
  {
    index: '03',
    title: 'Security, Compliance & Data Governance',
    deliverable: 'Security & RLS Ledger',
    description:
      'Row Level Security (RLS) policies, session management, cryptographic hashing, and compliance posture (GDPR/SOC2) reviewed by senior engineering staff.',
  },
  {
    index: '04',
    title: 'Vendor & Agency Quote Evaluation',
    deliverable: 'Cost & Variance Assessment',
    description:
      'Objective forensic analysis of competitor agency bids, hourly estimates, and contractual ambiguities to ensure fair market pricing and realistic timelines.',
  },
]

export default function DigitalAuditPage() {
  return (
    <div className="bg-[#080808] text-white min-h-screen section-y-large">
      <div className="container-max">
        <div className="container-content space-y-24">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-16">
            <p className="text-label-upper mb-4">[ PRE-FLIGHT DIAGNOSTIC // PROJECT AUDIT ]</p>
            <h1 className="text-display-l max-w-[800px] mb-6 font-light">
              Project & Digital Audit.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-[700px] leading-relaxed">
              De-risk your high-stakes platform or replatforming initiative before signing contracts or committing capital. Independent architectural validation from senior practitioners.
            </p>
          </div>

          {/* Core Philosophy Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="space-y-4">
              <TechnicalAnnotation
                coordinate="REF: AUD-PREFLIGHT-01"
                label="CAPITAL RISK MITIGATION"
              />
              <div className="border border-white/10 bg-[#0c0c0c] p-6 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">Investment</p>
                <p className="text-2xl text-white font-light">£1,500 – £3,500</p>
                <p className="text-xs text-white/50 font-light">Fixed-fee deliverable // 5 business day turnaround</p>
              </div>
            </div>

            <div className="space-y-6 text-base md:text-lg font-light text-white/80 leading-relaxed">
              <p>
                The most expensive engineering errors are committed before a single line of code is written. Vague scopes, poor tech stack decisions, and unvetted third-party APIs turn £50k builds into £150k rescue missions.
              </p>
              <p className="text-white/60 text-base">
                An Avorria Project Audit is a discrete, standalone advisory engagement. We review your specifications, wireframes, or vendor proposals with forensic scrutiny, delivering a clear blueprint of what to build, what to avoid, and what it should legitimately cost.
              </p>
            </div>
          </div>

          {/* FineLine Pipeline Diagram */}
          <section className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                [ ARCHITECTURAL PRE-FLIGHT PIPELINE ]
              </h2>
            </div>
            <FineLineDiagram />
          </section>

          {/* Section Interruption */}
          <ChapterGate
            number="01"
            title="FOUR AUDIT MODULES"
            statement="Comprehensive scrutiny across architecture, scope, compliance, and commercial realism."
          />

          {/* Modules List */}
          <section className="space-y-6">
            <div className="border-t border-white/10 divide-y divide-white/10">
              {AUDIT_MODULES.map((mod) => (
                <div key={mod.index} className="py-8 grid grid-cols-1 md:grid-cols-[80px_1fr_2fr] gap-6 items-baseline">
                  <span className="text-xs font-mono text-white/30 font-light">{mod.index}</span>
                  <div>
                    <h3 className="text-base text-white font-light">{mod.title}</h3>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-wider block mt-1">
                      DELIVERABLE: {mod.deliverable}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{mod.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Engagement CTA */}
          <section className="border border-white/10 bg-[#0e0e0e] p-8 md:p-12">
            <div className="max-w-2xl space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                [ FIXED-FEE ENGAGEMENT ]
              </p>
              <h3 className="text-2xl md:text-3xl font-light text-white">
                Commission an Architectural Audit.
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Receive an actionable, senior-level technical advisory report before entering into binding agency contracts or initiating development. Zero sales pressure. Complete technical candor.
              </p>
              <div className="pt-2">
                <Link
                  href="/start-a-project?track=audit"
                  className="inline-flex px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
                >
                  Commission Project Audit
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
