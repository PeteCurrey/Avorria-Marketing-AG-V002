import type { Metadata } from 'next'
import { listEnquiries } from '@/lib/db/enquiry'

export const metadata: Metadata = {
  title: 'Enquiries Triage // Admin // Avorria',
  robots: { index: false, follow: false },
}

interface DemoEnquiry {
  id: string
  created_at: string
  name: string
  company: string | null
  email: string
  website: string | null
  what_building: string
  budget: string | null
  timeline: string | null
  status: string
}

const fallbackEnquiries: DemoEnquiry[] = [
  {
    id: 'enq-sample-01',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    name: 'Marcus Sterling',
    company: 'Sterling & Co Private Wealth',
    email: 'm.sterling@sterlingwealth.co.uk',
    website: 'https://sterlingwealth.co.uk',
    what_building: '[FLAGSHIP_APPLICATION] Replace legacy WordPress site with custom sovereign investor portfolio portal with real-time NAV calculations.',
    budget: '£30k - £50k',
    timeline: '3 - 6 months',
    status: 'NEW',
  },
  {
    id: 'enq-sample-02',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    name: 'Hannah Abbott',
    company: 'Kestrel Aero Components',
    email: 'hannah.a@kestrelaero.com',
    website: 'https://kestrelaero.com',
    what_building: '[TECHNICAL_AUDIT_REMEDIATION] PageSpeed is failing Core Web Vitals (INP 420ms). Need complete frontend engineering refactor.',
    budget: '£15k - £30k',
    timeline: 'Immediate (within 4 weeks)',
    status: 'QUALIFIED',
  },
]

export default async function AdminEnquiriesPage() {
  let enquiries: any[] = []
  try {
    enquiries = await listEnquiries({ limit: 50 })
  } catch {
    // If Supabase table is unreachable, render demo triage records
    enquiries = []
  }

  const displayList = enquiries.length > 0 ? enquiries : fallbackEnquiries

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Inbound Intake & Commercial Qualification
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Enquiries & Scoping Briefs
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Submissions received via the Start Project Consultation Wizard and Website Health Check audits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            TRIAGE DESK READY
          </span>
        </div>
      </div>

      {/* Triage Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Intake Inbox
          </h2>
          <span className="text-[11px] font-mono text-white/40">
            Showing {displayList.length} Inbound Submissions
          </span>
        </div>

        <div className="border border-white/10 bg-[#111] overflow-x-auto">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Contact / Organisation</th>
                <th className="py-3 px-4">Project Intent / Desired Outcome</th>
                <th className="py-3 px-4">Budget Range</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {displayList.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-white font-sans text-xs">{enq.name}</div>
                    <div className="text-white/60 text-[10px]">{enq.company || 'Private Entity'}</div>
                    <div className="text-white/40 text-[10px]">{enq.email}</div>
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-white/80 max-w-sm">
                    <p className="line-clamp-2">{enq.what_building}</p>
                    {enq.website && (
                      <span className="text-[10px] font-mono text-white/40 block mt-1">
                        Domain: {enq.website}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-white">
                    {enq.budget || 'Unspecified'}
                  </td>
                  <td className="py-4 px-4 text-white/60 text-[10px] font-sans">
                    {enq.timeline || 'Flexible'}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[9px] uppercase px-2 py-0.5 border ${
                        enq.status === 'QUALIFIED'
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                          : 'border-blue-500/40 text-blue-400 bg-blue-950/20'
                      }`}
                    >
                      {enq.status || 'NEW'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white/40 text-[10px]">
                    {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Today'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Qualification Criteria */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
          Qualification & Rejection Policy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light text-white/60">
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              Minimum Investment Baseline
            </span>
            Avorria accepts custom Build Sprints starting at £15,000. Low-budget template configurations (&lt;£10,000) are declined with courtesy recommendations to headless themes.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              Technical Decision Maker
            </span>
            We require direct access to executive or engineering leadership. Briefs through multiple intermediary marketing layers are screened out.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              48-Hour Response SLA
            </span>
            Qualified briefs receive an initial technical feasibility memo or Scout diagnostic audit within 48 hours. No boilerplates or generic pitches.
          </div>
        </div>
      </div>
    </div>
  )
}
