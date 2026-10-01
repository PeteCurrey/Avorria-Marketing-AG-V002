import type { Metadata } from 'next'
import { listOutreachProspects, OUTREACH_TEMPLATES } from '@/lib/outreach'
import type { OutreachStage } from '@/lib/outreach/types'

export const metadata: Metadata = {
  title: 'Outreach Pipeline // Admin // Avorria',
  robots: { index: false, follow: false },
}

const stageLabels: Record<OutreachStage, { label: string; color: string }> = {
  QUEUED: { label: 'Queued / Scouted', color: 'border-white/20 text-white/60' },
  INITIAL_TEARDOWN_SENT: { label: 'Teardown Sent', color: 'border-amber-500/30 text-amber-400 bg-amber-950/20' },
  FOLLOW_UP_SENT: { label: 'Follow-up Sent', color: 'border-blue-500/30 text-blue-400 bg-blue-950/20' },
  ENGAGED: { label: 'Engaged', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' },
  CALL_SCHEDULED: { label: 'Call Scheduled', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' },
  CONVERTED: { label: 'Converted', color: 'border-purple-500/30 text-purple-400 bg-purple-950/20' },
  UNSUBSCRIBED: { label: 'Unsubscribed', color: 'border-white/10 text-white/30' },
}

export default async function AdminOutreachPage() {
  const prospects = await listOutreachProspects()

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Targeted Business Development
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Outreach Sequences
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Controlled cold outreach based exclusively on objective diagnostic audits and verified infrastructure friction. Zero spam; 100% technical leverage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            RESEND DISPATCHER READY
          </span>
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Active Targets</p>
          <p className="text-2xl font-extralight text-white mt-1">14</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Qualified via Scout</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Teardowns Dispatched</p>
          <p className="text-2xl font-extralight text-white mt-1">28</p>
          <p className="text-[11px] font-light text-emerald-400 mt-1">100% deliverability</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Discovery Conversion</p>
          <p className="text-2xl font-extralight text-white mt-1">21.4%</p>
          <p className="text-[11px] font-light text-white/40 mt-1">6 calls scheduled</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Pipeline Pipeline ACV</p>
          <p className="text-2xl font-extralight text-white mt-1">£171,000</p>
          <p className="text-[11px] font-light text-white/40 mt-1">6 prospective sprints</p>
        </div>
      </div>

      {/* Prospect Queue Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Prospect Pipeline Queue
          </h2>
          <span className="text-[11px] font-mono text-white/40">
            {prospects.length} Active Records
          </span>
        </div>

        <div className="border border-white/10 bg-[#111] overflow-x-auto">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Company / Target</th>
                <th className="py-3 px-4">Decision Maker</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Friction / Notes</th>
                <th className="py-3 px-4 text-right">Last Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {prospects.map((prospect) => {
                const stageInfo = stageLabels[prospect.stage] || { label: prospect.stage, color: 'border-white/20 text-white/60' }
                return (
                  <tr key={prospect.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-white font-sans text-xs">{prospect.companyName}</div>
                      <div className="text-white/40 text-[10px]">{prospect.domain}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-xs">
                      <div className="text-white/80">{prospect.decisionMakerName}</div>
                      <div className="text-white/40 text-[10px]">{prospect.decisionMakerRole}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[9px] uppercase px-2 py-0.5 border ${stageInfo.color}`}>
                        {stageInfo.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-sans text-xs text-white/60 max-w-sm">
                      {prospect.notes}
                    </td>
                    <td className="py-4 px-4 text-right text-white/40 text-[10px]">
                      {prospect.lastContactedAt ? new Date(prospect.lastContactedAt).toLocaleDateString() : 'Pending'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sequence Templates Reference */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Sequence Protocol Templates
          </h2>
          <p className="text-xs font-light text-white/40 mt-1">
            Engineered, non-promotional correspondence dispatched by the system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(OUTREACH_TEMPLATES).map(([key, template]) => (
            <div key={key} className="border border-white/10 bg-[#111] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                  Template ID // {template.code}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  PLAIN TEXT / DIGNIFIED
                </span>
              </div>
              <div>
                <p className="text-[11px] font-mono text-white/40">Subject:</p>
                <p className="text-xs font-light text-white/90 mt-0.5 font-mono">{template.subject}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-white/40 mb-1">Body Prototype:</p>
                <pre className="text-[11px] font-mono text-white/60 bg-white/[0.02] p-4 border border-white/5 whitespace-pre-wrap leading-relaxed">
                  {template.bodyTemplate}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
