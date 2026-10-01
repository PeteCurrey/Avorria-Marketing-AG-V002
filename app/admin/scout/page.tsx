import type { Metadata } from 'next'
import { ScoutScanRunner } from '@/components/admin/ScoutScanRunner'

export const metadata: Metadata = {
  title: 'Scout Intelligence // Admin // Avorria',
  robots: { index: false, follow: false },
}

interface HistoricalScan {
  domain: string
  company: string
  score: number
  stack: string
  friction: string
  scannedAt: string
  status: 'AUDITED' | 'ENQUEUED' | 'CONVERTED'
}

const historicalScans: HistoricalScan[] = [
  {
    domain: 'alkota-cycles.co.uk',
    company: 'Alkota Titanium Cycles Ltd',
    score: 84,
    stack: 'WordPress / WooCommerce / Cloudflare',
    friction: '1.2s TTFB, uncompressed hero video, unescaped legacy checkout',
    scannedAt: '2026-09-28 14:22',
    status: 'CONVERTED',
  },
  {
    domain: 'velox-capital.com',
    company: 'Velox Capital Partners',
    score: 72,
    stack: 'Webflow / Hubspot Forms',
    friction: 'High script payload (4.2MB), missing CSP, poor mobile tap targets',
    scannedAt: '2026-09-30 09:15',
    status: 'AUDITED',
  },
  {
    domain: 'apex-logistics.io',
    company: 'Apex Logistics Group',
    score: 91,
    stack: 'Legacy Drupal 8 / Apache 2.4',
    friction: 'Critical security headers absent, slow database queries (890ms)',
    scannedAt: '2026-10-01 11:40',
    status: 'ENQUEUED',
  },
  {
    domain: 'elysium-health.co.uk',
    company: 'Elysium BioLabs',
    score: 68,
    stack: 'Shopify Plus / Klaviyo',
    friction: '32 tracking beacons, CLS layout shifting on dynamic pricing tags',
    scannedAt: '2026-10-01 16:05',
    status: 'AUDITED',
  },
]

export default function AdminScoutPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
          Automated Prospect Reconnaissance
        </p>
        <h1 className="text-3xl font-extralight text-white tracking-tight">
          Scout Engine
        </h1>
        <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
          Conduct deep truthful domain analysis, detect legacy architecture friction, and extract verifiable engineering leverage for cold outreach teardowns.
        </p>
      </div>

      {/* Live Scanner Tool */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Target Domain Inspector
          </h2>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5">
            ENGINE READY // HTTP/2 AUDITOR ACTIVE
          </span>
        </div>
        <ScoutScanRunner />
      </div>

      {/* Historical Intelligence Log */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              Recent Prospect Intelligence
            </h2>
            <p className="text-xs font-light text-white/40 mt-1">
              Historical audits and stack signatures captured by the Scout pipeline.
            </p>
          </div>
          <span className="text-[11px] font-mono text-white/40">
            Showing {historicalScans.length} records
          </span>
        </div>

        <div className="border border-white/10 overflow-x-auto bg-[#111]">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Domain / Company</th>
                <th className="py-3 px-4">Opportunity</th>
                <th className="py-3 px-4">Detected Architecture</th>
                <th className="py-3 px-4">Primary Friction Signal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Captured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {historicalScans.map((scan) => (
                <tr key={scan.domain} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="text-white font-light text-xs font-sans">{scan.company}</div>
                    <div className="text-white/40 text-[10px]">{scan.domain}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block text-white px-2 py-0.5 text-[10px] border border-white/20">
                      {scan.score}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-white/70 font-sans text-xs">
                    {scan.stack}
                  </td>
                  <td className="py-3.5 px-4 text-white/50 font-sans text-xs max-w-xs truncate">
                    {scan.friction}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                        scan.status === 'CONVERTED'
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                          : scan.status === 'ENQUEUED'
                          ? 'border-amber-500/40 text-amber-400 bg-amber-950/20'
                          : 'border-white/20 text-white/60 bg-white/[0.02]'
                      }`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-white/40 text-[10px]">
                    {scan.scannedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
