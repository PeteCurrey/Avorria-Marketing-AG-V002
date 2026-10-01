import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { AuditRunner } from '@/components/audit/AuditRunner'
import { ChapterGate } from '@/components/creative/ChapterGate'

export const metadata: Metadata = generatePageMetadata({
  title: 'Website Health Check // Forensic Diagnostic',
  description:
    'Submit any enterprise or commercial web property for multi-dimensional diagnostic analysis. Strict provenance guarantees, zero score fabrication.',
  path: '/audit',
})

const PROVENANCE_LEVELS = [
  {
    tag: 'VERIFIED',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    title: 'Direct Measurement',
    description:
      'Captured via live server network handshake, HTTP response headers, SSL certificate chains, and server timings. Zero approximation.',
  },
  {
    tag: 'OBSERVED',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    title: 'DOM Markup Inspection',
    description:
      'Extracted directly from the server-rendered HTML document, including OpenGraph tags, semantic landmarks, alt attributes, and viewport directives.',
  },
  {
    tag: 'INFERRED',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    title: 'Architectural Heuristic',
    description:
      'Calculated based on semantic depth, layout sequence, and conversion path friction. Never presented as absolute laboratory truth.',
  },
  {
    tag: 'NOT_TESTED',
    border: 'border-white/20',
    text: 'text-white/40',
    title: 'Truthful Suppression',
    description:
      'If a third-party API is unreachable or environment tokens are withheld, the metric is explicitly marked as unavailable rather than simulated.',
  },
]

const AUDIT_DIMENSIONS = [
  {
    index: '01',
    name: 'Performance & Network Architecture',
    desc: 'Time to First Byte (TTFB), server handshake duration, compression mechanisms (Brotli/Gzip), and network transmission efficiency.',
  },
  {
    index: '02',
    name: 'Mobile Experience & Viewport',
    desc: 'Viewport tag integrity, responsive viewport scaling, and mobile document boundary compliance.',
  },
  {
    index: '03',
    name: 'Technical SEO & Indexability',
    desc: 'Canonical URL directives, robots.txt directives, indexation permission tags, and duplicate content mitigation.',
  },
  {
    index: '04',
    name: 'Metadata & Social Graph',
    desc: 'Title length and clarity, meta description density, OpenGraph tags, and Twitter Cards.',
  },
  {
    index: '05',
    name: 'Accessibility & Semantic Hygiene',
    desc: 'WCAG 2.1 compliance signals, image alt coverage, document language declarations, and screen reader clarity.',
  },
  {
    index: '06',
    name: 'Information & Navigation Architecture',
    desc: 'Semantic HTML5 landmark regions (<nav>, <main>, <header>, <footer>) and logical DOM hierarchy.',
  },
  {
    index: '07',
    name: 'Conversion Architecture & Flow',
    desc: 'Primary conversion hooks, interactive call-to-action discoverability, and initial user journey friction.',
  },
  {
    index: '08',
    name: 'Visual Hierarchy & Typography',
    desc: 'Heading hierarchy discipline (singular H1 enforcement, structured subheadings), and layout contrast balance.',
  },
  {
    index: '09',
    name: 'Content Structure & Editorial Quality',
    desc: 'Initial server-rendered copy density, information-to-noise ratio, and client-side rendering dependency.',
  },
  {
    index: '10',
    name: 'Technical Implementation & Security',
    desc: 'Transport Layer Security (TLS/HTTPS), Strict-Transport-Security (HSTS), and Content Security Policy (CSP) headers.',
  },
]

export default function AuditPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content space-y-24">
          {/* Header */}
          <div className="border-b border-white/10 pb-16">
            <p className="text-label-upper mb-4">[ DIAGNOSTIC CORE // HEALTH CHECK ]</p>
            <h1 className="text-display-l max-w-[800px] mb-6 font-light">
              Forensic Digital Health Check.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-[700px] leading-relaxed">
              Objective, multi-dimensional diagnostic analysis for commercial web properties. Grounded in network telemetry and semantic inspection. Zero fabricated scores.
            </p>
          </div>

          {/* Interactive Diagnostic Runner */}
          <section aria-label="Run Website Health Check">
            <AuditRunner />
          </section>

          {/* Section Interruption: Provenance Architecture */}
          <ChapterGate
            number="01"
            title="THE PROVENANCE PROTOCOL"
            statement="Generic audit tools fabricate scores to generate fear. Avorria classifies every finding with verifiable telemetry."
          />

          {/* Provenance Ledger */}
          <section className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-display-s font-light mb-4">Four Provenance Tiers.</h2>
              <p className="text-base text-white/60 font-light leading-relaxed">
                Before accepting recommendations on your digital architecture, you should know exactly how the data was gathered. We categorize every test into one of four immutable states:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROVENANCE_LEVELS.map((item) => (
                <div key={item.tag} className={`border ${item.border} bg-[#0c0c0c] p-6 space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono tracking-widest font-light ${item.text}`}>
                      [{item.tag}]
                    </span>
                  </div>
                  <h3 className="text-base text-white font-light">{item.title}</h3>
                  <p className="text-xs text-white/50 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Interruption: 10 Dimensions */}
          <ChapterGate
            number="02"
            title="TEN AUDIT DIMENSIONS"
            statement="Evaluating the entire digital surface: from wire-level protocol headers to semantic content hierarchy."
          />

          {/* Dimensional Breakdown */}
          <section className="space-y-6">
            <div className="border-t border-white/10 divide-y divide-white/10">
              {AUDIT_DIMENSIONS.map((dim) => (
                <div key={dim.index} className="py-6 grid grid-cols-1 md:grid-cols-[100px_1fr_2fr] gap-4 items-baseline">
                  <span className="text-xs font-mono text-white/30 font-light">{dim.index}</span>
                  <h3 className="text-base text-white font-light">{dim.name}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{dim.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Alternative Specialized Diagnostics */}
          <section className="border border-white/10 bg-[#0e0e0e] p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                  [ SPECIALIZED DIAGNOSTIC ]
                </p>
                <h3 className="text-2xl text-white font-light">The Agency Teardown.</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Evaluating an existing digital agency arrangement? Our diagnostic framework audits retainer efficiency, intellectual property ownership, and release velocity.
                </p>
                <Link
                  href="/teardown"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors pt-2 font-light"
                >
                  Explore Agency Teardown →
                </Link>
              </div>

              <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                  [ PRE-FLIGHT EVALUATION ]
                </p>
                <h3 className="text-2xl text-white font-light">Project & Digital Audit.</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Planning a major platform replatforming or custom web application build? De-risk architecture, scoping, and vendor dependencies prior to contracting.
                </p>
                <Link
                  href="/digital-audit"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors pt-2 font-light"
                >
                  Explore Digital Project Audit →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
