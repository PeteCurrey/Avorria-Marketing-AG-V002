import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { StrategicConsultationWizard } from '@/components/consultation/StrategicConsultationWizard'

export const metadata: Metadata = generatePageMetadata({
  title: 'Start a Project // Strategic Consultation & Intake',
  description:
    'Initiate a strategic scoping consultation with Avorria. High-performance bespoke platforms, embedded engineering retainers, and forensic architectural audits.',
  path: '/start-a-project',
})

export default function StartAProjectPage() {
  return (
    <div className="bg-[#080808] text-white min-h-screen section-y-large">
      <div className="container-max">
        <div className="container-content space-y-16">

          {/* Masthead */}
          <div className="border-b border-white/10 pb-16">
            <p className="text-label-upper mb-4">[ COMMERCIAL INTAKE // STRATEGIC SCOPING ]</p>
            <h1 className="text-display-l max-w-[800px] mb-6 font-light">
              Initiate Strategic Scoping.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-[700px] leading-relaxed">
              We design and engineer bespoke software platforms, high-performance websites, and intelligent systems for ambitious enterprises. Direct collaboration with senior principals.
            </p>
          </div>

          {/* Consultation Wizard Container */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-start">
            
            {/* Sidebar Principles */}
            <aside className="space-y-8 lg:sticky lg:top-28">
              <div className="border border-white/10 bg-[#0c0c0c] p-6 space-y-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                  [ COMMITMENT PROTOCOL ]
                </p>

                <ol className="space-y-4 text-xs font-light text-white/60">
                  <li className="flex gap-3">
                    <span className="font-mono text-white/30">01</span>
                    <div>
                      <p className="text-white">Senior Principal Triage</p>
                      <p className="text-white/40 text-[11px] mt-0.5">Every brief is scoped directly by senior engineers, never passed to junior account managers.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-white/30">02</span>
                    <div>
                      <p className="text-white">Mutual NDA Protection</p>
                      <p className="text-white/40 text-[11px] mt-0.5">Executed mutual non-disclosure agreements available prior to sensitive architectural disclosure.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-white/30">03</span>
                    <div>
                      <p className="text-white">Guaranteed Response SLA</p>
                      <p className="text-white/40 text-[11px] mt-0.5">Formal scoping feedback provided within one business day.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-white/30">04</span>
                    <div>
                      <p className="text-white">Fixed-Deliverable Clarity</p>
                      <p className="text-white/40 text-[11px] mt-0.5">Unambiguous milestones, transparent pricing, and zero scope creep.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="border border-white/5 p-6 space-y-2 text-xs font-light text-white/40">
                <p className="text-white/70">Prefer Direct Correspondence?</p>
                <p>For urgent RFPs or strategic partnership briefs:</p>
                <a
                  href="mailto:hello@avorria.com"
                  className="block text-white hover:text-white/70 transition-colors font-mono pt-1 text-sm"
                >
                  hello@avorria.com
                </a>
              </div>
            </aside>

            {/* Strategic Consultation Intake Wizard */}
            <div>
              <StrategicConsultationWizard />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
