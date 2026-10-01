'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { runAuditAction } from '@/lib/actions/audit'

const AUDIT_STAGES = [
  'Establishing secure TLS/HTTPS handshake...',
  'Inspecting HTTP/2 response headers & security policies...',
  'Evaluating semantic DOM landmarks and accessibility hygiene...',
  'Validating OpenGraph, canonical, and technical SEO directives...',
  'Computing architectural provenance and synthesizing findings...',
]

export function AuditRunner() {
  const [url, setUrl] = useState('')
  const [isPending, startTransition] = useTransition()
  const [currentStage, setCurrentStage] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setErrorMessage(null)
    setCurrentStage(0)

    // Cycle through telemetry steps during pending execution
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < AUDIT_STAGES.length - 1) return prev + 1
        return prev
      })
    }, 1800)

    startTransition(async () => {
      try {
        const res = await runAuditAction(url)
        clearInterval(interval)

        if (!res.success || !res.reportId) {
          setErrorMessage(res.error || 'Diagnostic engine encountered an unhandled exception.')
          return
        }

        router.push(`/audit/${res.reportId}`)
      } catch (err: unknown) {
        clearInterval(interval)
        setErrorMessage(err instanceof Error ? err.message : 'Execution failed')
      }
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Diagnostic Terminal Container */}
      <div className="border border-white/10 bg-[#0c0c0c] p-8 md:p-12 relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-light">
                Diagnostic Core Active // v2.4
              </span>
            </div>
            <div className="text-xs font-mono text-white/30 font-light hidden sm:block">
              [PROVENANCE-ENFORCED]
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="audit-url-input" className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-3">
                Target Domain or Protocol Endpoint
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="audit-url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isPending}
                  placeholder="https://example.com"
                  className="flex-1 bg-white/[0.03] border border-white/15 px-5 py-4 text-white placeholder-white/20 text-sm md:text-base font-light focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isPending || !url.trim()}
                  className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {isPending ? 'Diagnosing...' : 'Execute Diagnostic'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="border border-red-500/20 bg-red-950/20 p-4 text-xs font-light text-red-300">
                <span className="uppercase tracking-[0.15em] text-red-400 font-light block mb-1">Execution Aborted:</span>
                {errorMessage}
              </div>
            )}

            {/* Live Telemetry Progress */}
            {isPending && (
              <div className="border border-white/10 bg-black/40 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-white/40 font-light border-b border-white/5 pb-2">
                  <span>SYSTEM_TELEMETRY</span>
                  <span>PHASE 0{currentStage + 1} / 05</span>
                </div>
                <div className="space-y-2 text-xs font-mono font-light">
                  {AUDIT_STAGES.map((stage, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 transition-opacity duration-300 ${
                        idx === currentStage
                          ? 'text-white'
                          : idx < currentStage
                          ? 'text-white/30'
                          : 'text-white/10'
                      }`}
                    >
                      <span>{idx < currentStage ? '✓' : idx === currentStage ? '→' : '·'}</span>
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standards & Provenance Notice */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40 font-light">
              <span>Zero metric fabrication. Truthful protocol testing.</span>
              <span className="font-mono text-white/20">RFC-9110 // WCAG 2.1 AA // HTTP/2</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
