import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pre-Build Website & Architecture Audit // 5-Day Review — Avorria',
  description:
    'De-risk your next high-stakes web platform before committing capital. Comprehensive pre-build architectural, scope, and technical audits in 5 days.',
  path: '/digital-audit',
})

// ─── Schema.org JSON-LD ──────────────────────────────────────────────────────

const auditServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/digital-audit#service`,
  name: 'Avorria Project & Digital Audit',
  provider: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: 'Avorria',
  },
  description:
    'A fixed-fee, senior-led pre-build architectural audit. We review technical specifications, wireframes, and vendor proposals with forensic scrutiny — delivering a clear blueprint of what to build, what to avoid, and what it should legitimately cost.',
  url: `${siteConfig.url}/digital-audit`,
  serviceType: 'Digital Architecture Audit',
  areaServed: 'GB',
  offers: {
    '@type': 'Offer',
    name: 'Fixed-Fee Architecture Audit',
    description: 'Comprehensive pre-build diagnostic with 5 business day delivery.',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1500',
      maxPrice: '3500',
      priceCurrency: 'GBP',
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Digital Audit', item: `${siteConfig.url}/digital-audit` },
    ],
  },
}

// ─── Audit module content ────────────────────────────────────────────────────

const AUDIT_MODULES = [
  {
    index: '01',
    title: 'Architectural & Tech Stack Validation',
    deliverable: 'Technical Specification Document',
    description:
      'Independent evaluation of proposed databases, cloud infrastructure (AWS/Vercel/Cloudflare), front-end frameworks, and auth protocols. Eliminating architectural dead ends before a line of code is written.',
  },
  {
    index: '02',
    title: 'Scope De-Risking & Milestone Verification',
    deliverable: 'Fixed Sprint Breakdown Matrix',
    description:
      'Rigorous decomposition of feature requirements into discrete engineering epics — identifying hidden complexities, undocumented third-party API constraints, and integration liabilities before they become expensive project failures.',
  },
  {
    index: '03',
    title: 'Security, Compliance & Data Governance',
    deliverable: 'Security & RLS Ledger',
    description:
      'Row Level Security (RLS) policy review, session management, cryptographic hashing, and compliance posture (GDPR / SOC2). Reviewed by senior engineering staff who build production systems — not checklist consultants.',
  },
  {
    index: '04',
    title: 'Vendor & Agency Quote Evaluation',
    deliverable: 'Cost & Variance Assessment',
    description:
      'Objective forensic analysis of competitor agency bids, timeline estimates, and contractual ambiguities. We identify where quoted hours are padded, where deliverables are undefined, and what the work should realistically cost.',
  },
]

// ─── What you receive ────────────────────────────────────────────────────────

const DELIVERABLES = [
  {
    item: 'Architectural Recommendation Report',
    description:
      'A structured assessment of your proposed or existing technical stack with specific recommendations for databases, infrastructure, frameworks, and integration protocols.',
  },
  {
    item: 'Risk & Dependency Register',
    description:
      'A documented inventory of all identified technical risks, third-party dependencies, and unresolved scope ambiguities — each with a recommended resolution path.',
  },
  {
    item: 'Sprint Breakdown & Milestone Matrix',
    description:
      'Your feature list decomposed into discrete engineering epics with realistic delivery estimates and sequenced milestones for milestone-based billing.',
  },
  {
    item: 'Commercial Reality Assessment',
    description:
      'Honest assessment of what any existing agency quotes represent versus fair-market engineering rates — identifying inflated line items and undefined scope.',
  },
  {
    item: 'Executive Briefing Document',
    description:
      'A board-ready single-page summary of findings, recommended next actions, and key risk metrics — written for decision-makers, not engineers.',
  },
]

// ─── Who this is for ─────────────────────────────────────────────────────────

const WHO_THIS_IS_FOR = [
  'Founders preparing to commit significant capital to a digital platform build',
  'In-house teams evaluating a complex replatforming initiative',
  'Executives holding agency proposals they cannot independently validate',
  'Businesses that have received contradictory quotes and need an independent arbiter',
  'Technical leads who need a second opinion on architectural direction',
]

export default function DigitalAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditServiceSchema) }}
      />

      <div className="bg-[#0c0c0c] text-white min-h-screen">

        {/* ── Page Header (dark) ───────────────────────────────────── */}
        <div className="border-b border-white/10">
          <div className="container-max py-20 md:py-28">
            <div className="container-content">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
                <div>
                  <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40 mb-6">
                    [ PRE-FLIGHT DIAGNOSTIC // PROJECT AUDIT ]
                  </p>
                  <h1 className="text-display-l font-extralight tracking-tight max-w-[800px] mb-8">
                    Project & Digital Audit.
                  </h1>
                  <p className="text-xl md:text-2xl text-white/60 font-light max-w-[660px] leading-relaxed">
                    De-risk your high-stakes platform before signing contracts or
                    committing capital. Independent architectural validation from
                    senior practitioners. Delivered in 5 business days.
                  </p>
                </div>

                <div className="shrink-0 space-y-3">
                  <div className="border border-white/10 bg-white/5 p-6 min-w-[220px]">
                    <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40 mb-2">
                      Investment
                    </p>
                    <p className="text-2xl text-white font-light mb-1">£1,500 – £3,500</p>
                    <p className="text-xs text-white/40 font-light">
                      Fixed-fee // 5 business day delivery
                    </p>
                  </div>
                  <Link
                    href="/start-a-project?track=audit"
                    className="flex items-center justify-center w-full px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
                  >
                    Commission Audit ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── The problem we solve ─────────────────────────────────── */}
        <div className="container-max">
          <div className="container-content">

            <section className="py-20 md:py-28 border-b border-white/10" aria-label="Why audits matter">
              <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 items-start">
                <div>
                  <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40 mb-4">
                    THE PROBLEM // CAPITAL RISK
                  </p>
                  <h2 className="text-[2rem] font-extralight text-white uppercase tracking-[0.04em] leading-tight">
                    Most expensive errors happen before a line of code.
                  </h2>
                </div>
                <div className="space-y-6 text-base md:text-lg font-light text-white/70 leading-relaxed">
                  <p>
                    Vague scopes, poor tech stack decisions, and unvetted third-party
                    API dependencies turn £50k builds into £150k rescue missions. These
                    failures are not discovered at launch — they are committed in the
                    planning phase.
                  </p>
                  <p className="text-white/50">
                    An Avorria Project Audit is a discrete, standalone advisory
                    engagement. We review your specifications, wireframes, or vendor
                    proposals with forensic scrutiny — delivering a clear blueprint
                    of what to build, what to avoid, and what it should legitimately
                    cost.
                  </p>
                  <p className="text-white/50">
                    The audit fee is credited against any subsequent Avorria
                    engagement. If we recommend a different build partner, the report
                    remains yours to use with them.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Four audit modules ───────────────────────────────── */}
            <section className="py-20 md:py-28 border-b border-white/10" aria-label="Audit modules">
              <div className="mb-16">
                <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40 mb-4">
                  AUDIT SCOPE // FOUR MODULES
                </p>
                <h2 className="text-[2rem] font-extralight text-white uppercase tracking-[0.04em]">
                  What we review.
                </h2>
              </div>

              <div className="border border-white/10 divide-y divide-white/10">
                {AUDIT_MODULES.map((mod) => (
                  <div
                    key={mod.index}
                    className="grid grid-cols-1 md:grid-cols-[80px_1fr_2fr] gap-0"
                  >
                    <div className="border-r-0 md:border-r border-white/10 p-6 md:p-8 flex items-start pt-8">
                      <span className="text-white/20 font-extralight text-[1.5rem] tracking-tight">
                        {mod.index}
                      </span>
                    </div>
                    <div className="border-r-0 md:border-r border-white/10 p-6 md:p-8">
                      <h3 className="text-sm font-light text-white mb-3 leading-snug">{mod.title}</h3>
                      <span className="text-[10px] font-light text-white/30 uppercase tracking-[0.18em] block">
                        DELIVERABLE: {mod.deliverable}
                      </span>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-sm font-light text-white/55 leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── What you receive ─────────────────────────────────── */}
            <section className="py-20 md:py-28 border-b border-white/10" aria-label="Deliverables">
              <div className="mb-16">
                <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40 mb-4">
                  DELIVERABLES // FIVE DOCUMENTS
                </p>
                <h2 className="text-[2rem] font-extralight text-white uppercase tracking-[0.04em]">
                  What you receive.
                </h2>
              </div>

              <div className="space-y-0 divide-y divide-white/10 border border-white/10">
                {DELIVERABLES.map((d, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
                    <div className="border-r-0 lg:border-r border-white/10 p-6 md:p-8">
                      <h3 className="text-sm font-light text-white">{d.item}</h3>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-sm font-light text-white/50 leading-relaxed">{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Who this is for ──────────────────────────────────── */}
            <section className="py-20 md:py-28 border-b border-white/10" aria-label="Who the audit is for">
              <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16">
                <div>
                  <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40 mb-4">
                    QUALIFICATION // WHO THIS IS FOR
                  </p>
                  <h2 className="text-[2rem] font-extralight text-white uppercase tracking-[0.04em] leading-tight">
                    Is this the right engagement?
                  </h2>
                </div>
                <div>
                  <ul className="space-y-4" role="list">
                    {WHO_THIS_IS_FOR.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm font-light text-white/60 leading-relaxed">
                        <span className="text-white/20 mt-[0.3em] shrink-0 text-[9px]">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 border-t border-white/10 pt-8">
                    <p className="text-sm font-light text-white/40">
                      The audit is <strong className="text-white/70 font-light">not</strong> suitable for businesses
                      that need brand strategy, content production, or paid media management.
                      We focus exclusively on technical architecture, engineering scope, and
                      commercial validation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="py-20 md:py-28" aria-label="Commission an audit">
              <div className="border border-white/10 bg-[#0e0e0e] p-8 md:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
                  <div className="max-w-2xl space-y-5">
                    <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/40">
                      [ FIXED-FEE ENGAGEMENT ]
                    </p>
                    <h3 className="text-2xl md:text-3xl font-extralight text-white uppercase tracking-[0.04em]">
                      Commission an architectural audit.
                    </h3>
                    <p className="text-sm font-light text-white/50 leading-relaxed">
                      Receive an actionable, senior-level technical advisory report before
                      entering into binding agency contracts or initiating development. Zero
                      sales pressure. Complete technical candor. The fee is credited against
                      any subsequent Avorria engagement.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                    <Link
                      href="/start-a-project?track=audit"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors whitespace-nowrap"
                    >
                      Commission Audit ↗
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white/60 text-xs uppercase tracking-[0.2em] font-light hover:border-white/40 hover:text-white/80 transition-colors whitespace-nowrap"
                    >
                      View all engagement models
                    </Link>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
