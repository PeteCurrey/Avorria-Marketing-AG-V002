import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuditReport } from '@/lib/audit/storage'
import { runAuditEngine } from '@/lib/audit/engine'
import { PrintReportButton } from '@/components/audit/PrintReportButton'
import { DiscussFindingsModal } from '@/components/audit/DiscussFindingsModal'
import type { FindingSeverity, FindingStatus, ProvenanceTag } from '@/types/audit'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  let report = await getAuditReport(id)
  const domain = report ? report.domain : 'Target Domain'
  return {
    title: `Digital Audit Report // ${domain} — Avorria`,
    description: `Forensic digital audit report and architectural recommendations for ${domain}. Strict provenance verified.`,
  }
}

const SEVERITY_COLORS: Record<FindingSeverity, { border: string; text: string }> = {
  CRITICAL: { border: 'border-red-500/40 bg-red-950/20', text: 'text-red-400' },
  HIGH: { border: 'border-amber-500/40 bg-amber-950/20', text: 'text-amber-400' },
  MEDIUM: { border: 'border-yellow-500/30 bg-yellow-950/10', text: 'text-yellow-400' },
  LOW: { border: 'border-blue-500/30 bg-blue-950/10', text: 'text-blue-400' },
  INFORMATIONAL: { border: 'border-white/10 bg-white/[0.02]', text: 'text-white/60' },
}

const STATUS_BADGES: Record<FindingStatus, { text: string; bg: string }> = {
  PASS: { text: 'text-emerald-400', bg: 'border-emerald-500/30 bg-emerald-950/20' },
  WARN: { text: 'text-amber-400', bg: 'border-amber-500/30 bg-amber-950/20' },
  FAIL: { text: 'text-red-400', bg: 'border-red-500/30 bg-red-950/20' },
  UNAVAILABLE: { text: 'text-white/40', bg: 'border-white/10 bg-white/5' },
}

const PROVENANCE_LABELS: Record<ProvenanceTag, { text: string; label: string }> = {
  VERIFIED: { text: 'text-emerald-400', label: 'VERIFIED' },
  OBSERVED: { text: 'text-cyan-400', label: 'OBSERVED' },
  INFERRED: { text: 'text-amber-400', label: 'INFERRED' },
  NOT_TESTED: { text: 'text-white/40', label: 'NOT_TESTED' },
}

export default async function AuditReportPage({ params }: PageProps) {
  const { id } = await params
  let report = await getAuditReport(id)

  // If report not in transient memory (e.g. direct link or fresh boot), generate a sample live audit for avorria.com
  if (!report) {
    if (id === 'sample' || id.startsWith('avorria')) {
      report = await runAuditEngine('https://avorria.com')
    } else {
      notFound()
    }
  }

  const {
    url,
    domain,
    timestamp,
    responseTimeMs,
    protocol,
    overallStatus,
    executiveSummary,
    dimensions,
    findings,
    provenanceSummary,
  } = report

  // Sort findings by severity
  const severityOrder: Record<FindingSeverity, number> = {
    CRITICAL: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
    INFORMATIONAL: 5,
  }
  const sortedFindings = [...findings].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  return (
    <div className="section-y-large print:section-y-none print:py-8">
      <div className="container-max">
        <div className="container-content space-y-16 print:space-y-8">
          
          {/* Back Nav & Print Controls */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 print:hidden">
            <Link
              href="/audit"
              className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors font-light"
            >
              ← Back to Diagnostic Engine
            </Link>
            <PrintReportButton />
          </div>

          {/* Consultancy Document Masthead */}
          <header className="border border-white/15 bg-[#0b0b0b] p-8 md:p-12 relative print:border-black print:bg-white print:p-0">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-8 mb-8 print:border-black/20">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-light mb-2 print:text-black/60">
                  AVORRIA // STRATEGIC TECHNICAL ADVISORY
                </p>
                <h1 className="text-display-s md:text-display-m font-light text-white print:text-black">
                  Digital Audit Report
                </h1>
                <p className="text-sm font-mono text-white/50 font-light mt-1 print:text-black/60">
                  TARGET: {domain}
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono font-light text-white/60 md:text-right print:text-black/70">
                <p>DOC_ID: {id.slice(0, 18)}</p>
                <p>DATE: {new Date(timestamp).toUTCString()}</p>
                <p>NETWORK: {protocol} // TTFB: {responseTimeMs}ms</p>
                <p className="text-white/40 print:text-black/50">CONFIDENTIAL // AUDIT TELEMETRY</p>
              </div>
            </div>

            {/* Overall Verdict & Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-light block print:text-black/60">
                  OVERALL ASSESSMENT
                </span>
                <div className={`inline-flex items-center gap-3 px-4 py-2 border text-xs font-mono uppercase tracking-widest ${STATUS_BADGES[overallStatus].bg} ${STATUS_BADGES[overallStatus].text}`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  STATUS: {overallStatus}
                </div>
                <p className="text-xs text-white/40 font-light print:text-black/50">
                  Computed across 10 architectural vectors with zero metric fabrication.
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-light block mb-2 print:text-black/60">
                  EXECUTIVE SUMMARY
                </span>
                <p className="text-base md:text-lg font-light text-white/90 leading-relaxed print:text-black">
                  {executiveSummary}
                </p>
              </div>
            </div>
          </header>

          {/* Section: Provenance Breakdown */}
          <section className="border border-white/10 bg-[#0c0c0c] p-6 md:p-8 print:border-black/20 print:bg-transparent">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6 print:border-black/10">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/70 font-light print:text-black">
                DATA PROVENANCE DISTRIBUTION
              </h2>
              <span className="text-xs text-white/40 font-light print:text-black/50">
                Every test is categorized to guarantee scientific transparency.
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="border border-white/5 bg-white/[0.02] p-4">
                <span className="text-2xl font-light text-emerald-400 block">{provenanceSummary.VERIFIED}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80">VERIFIED</span>
                <p className="text-[10px] text-white/30 mt-1">Live wire handshake</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-4">
                <span className="text-2xl font-light text-cyan-400 block">{provenanceSummary.OBSERVED}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400/80">OBSERVED</span>
                <p className="text-[10px] text-white/30 mt-1">DOM markup inspection</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-4">
                <span className="text-2xl font-light text-amber-400 block">{provenanceSummary.INFERRED}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">INFERRED</span>
                <p className="text-[10px] text-white/30 mt-1">Architectural heuristics</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-4">
                <span className="text-2xl font-light text-white/40 block">{provenanceSummary.NOT_TESTED}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-white/40">NOT_TESTED</span>
                <p className="text-[10px] text-white/30 mt-1">Provider withheld</p>
              </div>
            </div>
          </section>

          {/* Section: 10 Dimensions Scorecard */}
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-light print:text-black">
              [ DIMENSION SCORECARD // 10 VECTORS ]
            </h2>

            <div className="border border-white/10 divide-y divide-white/10 print:border-black/20 print:divide-black/10">
              {Object.values(dimensions).map((dim) => (
                <div key={dim.dimension} className="p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center">
                  <div>
                    <h3 className="text-sm font-light text-white print:text-black">{dim.label}</h3>
                    <p className="text-xs text-white/40 font-light mt-1 print:text-black/60">{dim.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-[11px] font-mono border ${STATUS_BADGES[dim.status].bg} ${STATUS_BADGES[dim.status].text}`}>
                      {dim.status}
                    </span>
                    <span className={`text-[11px] font-mono ${PROVENANCE_LABELS[dim.provenance].text}`}>
                      [{dim.provenance}]
                    </span>
                  </div>
                  <div className="text-xs text-white/60 font-light md:text-right print:text-black/70">
                    {dim.summary}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Detailed Findings & Evidence Ledger */}
          <section className="space-y-6 print:break-before-page">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 print:border-black/20">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-light print:text-black">
                [ DETAILED FINDINGS & CORRECTIVE RECOMMENDATIONS ]
              </h2>
              <span className="text-xs text-white/40 font-light font-mono print:text-black/50">
                TOTAL FINDINGS: {findings.length}
              </span>
            </div>

            <div className="space-y-6">
              {sortedFindings.map((finding) => {
                const sevStyle = SEVERITY_COLORS[finding.severity]
                const statusStyle = STATUS_BADGES[finding.status]
                const prov = PROVENANCE_LABELS[finding.provenance]

                return (
                  <article
                    key={finding.id}
                    className="border border-white/10 bg-[#0c0c0c] p-6 md:p-8 space-y-4 print:border-black/20 print:bg-white print:p-6"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3 print:border-black/10">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`px-2 py-0.5 border ${sevStyle.border} ${sevStyle.text}`}>
                          {finding.severity}
                        </span>
                        <span className={`px-2 py-0.5 border ${statusStyle.bg} ${statusStyle.text}`}>
                          {finding.status}
                        </span>
                        <span className={`px-1.5 py-0.5 ${prov.text}`}>
                          [{finding.provenance}]
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/30 font-light print:text-black/40">
                        {finding.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-light text-white print:text-black">
                      {finding.title}
                    </h3>

                    {/* Observation */}
                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-white/40 font-light block mb-1 print:text-black/60">
                        Diagnostic Observation
                      </span>
                      <p className="text-sm font-light text-white/80 leading-relaxed print:text-black">
                        {finding.observation}
                      </p>
                    </div>

                    {/* Evidence Snippet */}
                    {finding.evidence && (
                      <div className="border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/60 overflow-x-auto print:border-black/10 print:bg-neutral-50 print:text-black/80">
                        <span className="text-[10px] uppercase text-white/30 block mb-1 font-sans">Observed Telemetry</span>
                        {finding.evidence}
                      </div>
                    )}

                    {/* Corrective Recommendation */}
                    <div className="pt-2 border-t border-white/5 print:border-black/10">
                      <span className="text-xs uppercase tracking-[0.15em] text-emerald-400/80 font-light block mb-1 print:text-black/80">
                        Recommended Intervention
                      </span>
                      <p className="text-sm font-light text-white/70 leading-relaxed print:text-black/90">
                        {finding.recommendation}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* Section: Consultative Engagement Next Step ("Discuss the Findings") */}
          <section>
            <DiscussFindingsModal auditId={id} domain={domain} />
          </section>

          {/* Document Footer Sign-off */}
          <footer className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-light text-white/40 print:border-black/20 print:text-black/60">
            <div>
              <p>Certified by Avorria Strategic Advisory & Diagnostic Core</p>
              <p className="font-mono text-[10px] text-white/20 mt-0.5 print:text-black/40">ENGINE_VERSION: 2.4.0 // PROVENANCE_HASH: {id.slice(0, 8)}</p>
            </div>
            <div>
              <a href="mailto:hello@avorria.com" className="hover:text-white transition-colors">
                hello@avorria.com
              </a>
            </div>
          </footer>

        </div>
      </div>
    </div>
  )
}
