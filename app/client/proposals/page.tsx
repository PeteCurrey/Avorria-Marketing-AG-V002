import type { Metadata } from 'next'
import { listAllProposals } from '@/lib/proposals/tokens'
import { ProposalSignOffCard } from '@/components/client/ProposalSignOffCard'

export const metadata: Metadata = {
  title: 'Client Portal // Proposals & Scope Schedules — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientProposalsPage() {
  const proposals = await listAllProposals()
  const activeProposal = proposals[0]

  return (
    <div className="p-8 md:p-12 max-w-5xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // COMMERCIAL SCHEDULES
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Proposals & Scope Agreements
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Review deliverables, commercial schedules, milestone criteria, and execute digital sign-offs.
        </p>
      </div>

      {activeProposal ? (
        <div className="space-y-8">
          {/* Main Proposal Card */}
          <div className="border border-black/10 bg-white p-8 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 pb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                  PROPOSAL {activeProposal.version} // {activeProposal.id.toUpperCase()}
                </span>
                <h2 className="text-xl md:text-2xl font-light text-neutral-900">
                  {activeProposal.projectTitle}
                </h2>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  CLIENT: {activeProposal.organisationName}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-2xl font-light text-neutral-900 block">
                  £{activeProposal.totalInvestment.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-neutral-500 block">
                  50% DEPOSIT: £{activeProposal.depositAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Scope Deliverables */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
                SCHEDULED DELIVERABLES ({activeProposal.deliverables.length} EPICS)
              </h3>

              <div className="divide-y divide-neutral-100">
                {activeProposal.deliverables.map((deliv) => (
                  <div key={deliv.code} className="py-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-neutral-400">{deliv.code}</span>
                      <span className="font-mono text-neutral-500">{deliv.timelineWeeks} WEEKS</span>
                    </div>
                    <h4 className="text-base font-light text-neutral-900">{deliv.title}</h4>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">{deliv.description}</p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                        Acceptance Criteria:
                      </span>
                      <ul className="list-disc list-inside text-xs text-neutral-500 space-y-0.5">
                        {deliv.acceptanceCriteria.map((crit, idx) => (
                          <li key={idx}>{crit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Terms */}
            <div className="border-t border-neutral-100 pt-6 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
                COMMERCIAL TERMS & IP SOVEREIGNTY
              </h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {activeProposal.termsAndConditions}
              </p>
            </div>
          </div>

          {/* Digital Sign-off Card */}
          <ProposalSignOffCard proposal={activeProposal} />
        </div>
      ) : (
        <div className="border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-500">
          No pending proposals found for your organisation.
        </div>
      )}

    </div>
  )
}
