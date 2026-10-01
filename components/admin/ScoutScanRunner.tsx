'use client'

import { useState, useTransition } from 'react'
import { runScoutAction } from '@/lib/actions/scout'
import type { ScoutScanResult } from '@/lib/scout/types'

export function ScoutScanRunner() {
  const [url, setUrl] = useState('')
  const [company, setCompany] = useState('')
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<ScoutScanResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setErrorMsg(null)
    setResult(null)

    startTransition(async () => {
      const res = await runScoutAction(url, company)
      if (res.success && res.result) {
        setResult(res.result)
      } else {
        setErrorMsg(res.error || 'Scout scan failed.')
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <form onSubmit={handleScan} className="border border-white/10 bg-[#111] p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1">
              Target Prospect Domain *
            </label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. competitor.com or prospect.co.uk"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Apex Holdings"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-300 font-mono">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] font-mono text-white/30">
            PROVENANCE ENFORCED // WIRE PROTOCOL INSPECTION
          </span>
          <button
            type="submit"
            disabled={isPending || !url.trim()}
            className="px-6 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-light hover:bg-white/90 transition-colors disabled:opacity-40"
          >
            {isPending ? 'Scouting Domain...' : 'Execute Scout Scan ⌖'}
          </button>
        </div>
      </form>

      {/* Scout Result Dossier */}
      {result && (
        <div className="border border-white/15 bg-[#111] p-8 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
                SCOUT INTELLIGENCE DOSSIER // {result.target.id}
              </span>
              <h3 className="text-2xl font-light text-white">
                {result.target.companyName} ({result.target.domain})
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Last Scouted: {new Date(result.target.lastScoutedAt).toUTCString()}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-3xl font-light text-emerald-400 block font-mono">
                {result.target.opportunityScore}/100
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                OPPORTUNITY INDEX
              </span>
            </div>
          </div>

          {/* Detected Tech Stack Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
              Detected Infrastructure & Stack
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-white/30 block mb-1">CMS / Core</span>
                <p className="text-white">{result.target.detectedStack.cms || 'Not Detected'}</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-white/30 block mb-1">Framework</span>
                <p className="text-white">{result.target.detectedStack.framework || 'Custom / SSR'}</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-white/30 block mb-1">CDN Edge</span>
                <p className="text-white">{result.target.detectedStack.cdn || 'Origin Server'}</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-white/30 block mb-1">Response TTFB</span>
                <p className="text-white">{result.target.telemetry.ttfbMs}ms</p>
              </div>
            </div>
          </div>

          {/* Friction Signals */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
              Identified Friction Signals ({result.target.frictionSignals.length})
            </h4>
            <div className="space-y-2">
              {result.target.frictionSignals.map((sig, idx) => (
                <div key={idx} className="border border-white/5 p-3 flex items-start gap-3 text-xs font-light text-white/80">
                  <span className="text-red-400 font-mono">!</span>
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Intervention */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-0.5">
                Strategic Recommendation
              </span>
              <p className="text-xs text-white/80 font-light">{result.recommendedIntervention}</p>
            </div>
            {result.auditId && (
              <a
                href={`/audit/${result.auditId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-colors shrink-0"
              >
                View Full Audit Dossier ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
