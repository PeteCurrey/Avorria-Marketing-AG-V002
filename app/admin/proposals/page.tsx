import type { Metadata } from 'next'
import Link from 'next/link'
import { listAllProposals } from '@/lib/proposals/tokens'
import type { ProposalStatus } from '@/lib/proposals/types'

export const metadata: Metadata = {
  title: 'Proposals & Digital Contracts // Admin // Avorria',
  robots: { index: false, follow: false },
}

const statusBadge: Record<ProposalStatus, { label: string; color: string }> = {
  DRAFT: { label: 'Draft', color: 'border-white/20 text-white/50' },
  SENT: { label: 'Sent // Reviewing', color: 'border-blue-500/40 text-blue-400 bg-blue-950/20' },
  VIEWED: { label: 'Viewed', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20' },
  ACCEPTED: { label: 'Digitally Signed', color: 'border-purple-500/40 text-purple-400 bg-purple-950/20' },
  DEPOSIT_PENDING: { label: 'Deposit Pending', color: 'border-amber-500/40 text-amber-400 bg-amber-950/20' },
  DEPOSIT_PAID: { label: 'Deposit Paid', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' },
  EXPIRED: { label: 'Expired', color: 'border-white/10 text-white/30' },
}

export default async function AdminProposalsPage() {
  const proposals = await listAllProposals()

  const totalPipeline = proposals.reduce((acc, p) => acc + p.totalInvestment, 0)
  const pendingDeposits = proposals
    .filter((p) => p.status === 'SENT' || p.status === 'ACCEPTED' || p.status === 'DEPOSIT_PENDING')
    .reduce((acc, p) => acc + p.depositAmount, 0)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Commercial Scope & Digital Signature Engine
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Commercial Proposals
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Immutable statements of work, cryptographic acceptance tokens, and automated Stripe deposit settlement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            TOKEN GENERATOR ACTIVE // RLS ENFORCED
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Total Active SOWs</p>
          <p className="text-2xl font-extralight text-white mt-1">£{totalPipeline.toLocaleString()}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">{proposals.length} issued contracts</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Pending Deposits</p>
          <p className="text-2xl font-extralight text-white mt-1">£{pendingDeposits.toLocaleString()}</p>
          <p className="text-[11px] font-light text-amber-400 mt-1">Held awaiting checkout</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Standard Deposit Terms</p>
          <p className="text-2xl font-extralight text-white mt-1">50%</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Due prior to sprint day 1</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Signature Verification</p>
          <p className="text-2xl font-extralight text-emerald-400 mt-1">SHA-256</p>
          <p className="text-[11px] font-light text-white/40 mt-1">IP + Timestampted</p>
        </div>
      </div>

      {/* Proposals Registry Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Active Proposals Registry
          </h2>
          <span className="text-[11px] font-mono text-white/40">
            {proposals.length} Records Loaded
          </span>
        </div>

        <div className="border border-white/10 bg-[#111] overflow-x-auto">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Client / Organisation</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Investment</th>
                <th className="py-3 px-4">Deposit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Valid Until</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {proposals.map((proposal) => {
                const badge = statusBadge[proposal.status] || { label: proposal.status, color: 'border-white/20 text-white/60' }
                return (
                  <tr key={proposal.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-white font-sans text-xs">{proposal.organisationName}</div>
                      <div className="text-white/40 text-[10px]">ID: {proposal.id} // {proposal.version}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-xs text-white/80 max-w-xs">
                      {proposal.projectTitle}
                    </td>
                    <td className="py-4 px-4 text-white">
                      £{proposal.totalInvestment.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-white/70">
                      £{proposal.depositAmount.toLocaleString()} ({proposal.depositPercentage}%)
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[9px] uppercase px-2 py-0.5 border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/40 text-[10px]">
                      {new Date(proposal.validUntil).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/client/proposals?token=${proposal.token}`}
                        target="_blank"
                        className="text-[10px] font-mono text-white/60 hover:text-white border border-white/20 px-2 py-1 transition-colors"
                      >
                        Client View ↗
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commercial Architecture Specification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
        <div className="border border-white/10 p-6 bg-[#111] space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Protocol 01</p>
          <h3 className="text-sm font-light text-white">Zero Scope Creep</h3>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            All statements of work specify explicit acceptance criteria per deliverable. Any adjustments outside criteria trigger a separate fixed Build Sprint.
          </p>
        </div>
        <div className="border border-white/10 p-6 bg-[#111] space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Protocol 02</p>
          <h3 className="text-sm font-light text-white">Cryptographic Nonce</h3>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            Proposal URLs use 192-bit cryptographic tokens. Acceptance records the client IP address, signer name, title, and timestamp into immutable audit logs.
          </p>
        </div>
        <div className="border border-white/10 p-6 bg-[#111] space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Protocol 03</p>
          <h3 className="text-sm font-light text-white">Sovereign Source Transfer</h3>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            Upon final delivery acceptance, full Git commit history, architecture assets, and cloud deployment pipelines are transferred to client-owned infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
