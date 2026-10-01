'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { submitConsultationAction } from '@/lib/actions/consultation'
import type {
  ConsultationInput,
  ConsultationReceipt,
  ProjectType,
  TimelineOption,
  BudgetRangeOption,
} from '@/types/consultation'

const PROJECT_TYPES: { id: ProjectType; label: string; desc: string; horizon: string }[] = [
  {
    id: 'build-sprint',
    label: '01 // Fixed-Scope Build Sprint',
    desc: 'Rapid delivery of custom digital products, web applications, or flagship platforms.',
    horizon: '4 – 12 Weeks // £8k – £40k+',
  },
  {
    id: 'embedded-systems',
    label: '02 // Embedded Systems Retainer',
    desc: 'Dedicated engineering, continuous optimization, technical SEO governance, and AI workflows.',
    horizon: 'Quarterly Commitment // £4k – £12k+/mo',
  },
  {
    id: 'forensic-audit',
    label: '03 // Forensic Teardown & Audit',
    desc: 'Pre-flight technical architecture audit or independent agency teardown review.',
    horizon: '5 Business Days // £1.5k – £3.5k',
  },
  {
    id: 'architecture-consultation',
    label: '04 // Strategic Advisory & Scoping',
    desc: 'Technical consultation to define requirements, evaluate RFP bids, or architect roadmaps.',
    horizon: 'Scoping Dialogue // Variable',
  },
]

const TECH_REQUIREMENTS = [
  { id: 'nextjs-ssr', label: 'Next.js 16 / React 19 SSR Architecture' },
  { id: 'ai-pipelines', label: 'Autonomous AI Agents & LLM Workflows' },
  { id: 'telemetry-dashboards', label: 'Real-Time Financial / Telemetry Dashboards' },
  { id: 'supabase-rls', label: 'Multi-Tenant PostgreSQL & Row Level Security (RLS)' },
  { id: 'stripe-billing', label: 'Stripe Payments, Subscriptions & Deposits' },
  { id: 'seo-infrastructure', label: 'Technical SEO & Programmatic Routing' },
  { id: 'workflow-automation', label: 'Enterprise ERP/CRM Workflow Automation' },
  { id: 'mobile-webgl', label: 'High-Performance Mobile & WebGL Interfaces' },
]

const TIMELINES: { id: TimelineOption; label: string }[] = [
  { id: 'immediate', label: 'Critical / Within 4–6 Weeks' },
  { id: '1-3-months', label: 'Targeting 1–3 Months' },
  { id: '3-6-months', label: 'Targeting 3–6 Months' },
  { id: 'exploratory', label: 'Exploratory / Flexible Horizon' },
]

const BUDGET_RANGES: { id: BudgetRangeOption; label: string }[] = [
  { id: '10k-25k', label: '£10,000 – £25,000' },
  { id: '25k-50k', label: '£25,000 – £50,000' },
  { id: '50k-100k', label: '£50,000 – £100,000' },
  { id: 'over-100k', label: '£100,000+' },
  { id: 'tbd', label: 'To Be Determined via Audit' },
]

const DECISION_STRUCTURES = [
  'Founder / CEO Direct Mandate',
  'Executive Board Approval Required',
  'Technical Evaluation Committee',
  'Delegated Engineering Lead',
]

export function StrategicConsultationWizard() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<ConsultationReceipt | null>(null)

  // Form State
  const [formData, setFormData] = useState<ConsultationInput>({
    organisationName: '',
    organisationUrl: '',
    industry: '',
    projectType: 'build-sprint',
    currentSituation: '',
    desiredOutcome: '',
    existingPlatform: '',
    technicalRequirements: ['nextjs-ssr'],
    timeline: '1-3-months',
    budgetRange: '25k-50k',
    decisionStructure: 'Founder / CEO Direct Mandate',
    relevantLinks: '',
    supportingNotes: '',
    contactName: '',
    contactEmail: '',
    contactRole: '',
  })

  function toggleReq(id: string) {
    setFormData((prev) => {
      const exists = prev.technicalRequirements.includes(id)
      return {
        ...prev,
        technicalRequirements: exists
          ? prev.technicalRequirements.filter((r) => r !== id)
          : [...prev.technicalRequirements, id],
      }
    })
  }

  function handleNext() {
    setErrorMessage(null)
    if (stage === 1 && !formData.organisationName.trim()) {
      setErrorMessage('Please provide your organisation name to proceed.')
      return
    }
    if (stage === 2 && (!formData.currentSituation.trim() || !formData.desiredOutcome.trim())) {
      setErrorMessage('Please summarize your current situation and desired outcome.')
      return
    }
    if (stage < 5) {
      setStage((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5)
    }
  }

  function handleBack() {
    setErrorMessage(null)
    if (stage > 1) {
      setStage((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.contactName.trim() || !formData.contactEmail.trim()) {
      setErrorMessage('Contact name and work email are required.')
      return
    }

    startTransition(async () => {
      const res = await submitConsultationAction(formData)
      if (res.success && res.receipt) {
        setReceipt(res.receipt)
      } else {
        setErrorMessage(res.error || 'Submission failed. Please try again.')
      }
    })
  }

  // ─── Post-Submission State: Official Project Intake Docket ────────────────
  if (receipt) {
    return (
      <div className="border border-white/15 bg-[#0c0c0c] p-8 md:p-14 space-y-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-light mb-2">
              [ INTAKE DOCKET // REGISTERED ]
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white">
              Project Consultation Docket Logged.
            </h2>
            <p className="text-sm font-mono text-white/50 font-light mt-1">
              REF: {receipt.reference}
            </p>
          </div>

          <div className="space-y-1 text-xs font-mono font-light text-white/60 md:text-right">
            <span className="inline-block px-3 py-1 border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 text-[11px] mb-2 uppercase tracking-wider">
              {receipt.pipelineStatus}
            </span>
            <p>LOGGED: {new Date(receipt.registeredAt).toUTCString()}</p>
            <p>ORGANISATION_ID: {receipt.organisationId.slice(0, 14)}</p>
          </div>
        </div>

        {/* Scoping Summary Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-light">
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Organisation</span>
            <p className="text-base text-white">{receipt.summary.organisation}</p>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Engagement Track</span>
            <p className="text-base text-white">{receipt.summary.projectType}</p>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Target Timeline</span>
            <p className="text-base text-white capitalize">{receipt.summary.timeline}</p>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Investment Bracket</span>
            <p className="text-base text-white">{receipt.summary.budget}</p>
          </div>
        </div>

        {/* Truthful Review Protocol Notice */}
        <div className="border border-white/10 bg-[#0e0e0e] p-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
            [ VERIFIABLE NEXT STEPS // ENGINEERING SLA ]
          </p>
          <p className="text-sm font-light text-white/80 leading-relaxed">
            Your scoping parameters have been submitted directly to the Avorria technical pipeline. To maintain high standards, our briefs are evaluated directly by senior engineering principals rather than junior business development staff.
          </p>
          <p className="text-xs font-light text-white/50">
            SLA Commitment: An Avorria Principal will inspect your technical criteria and contact {formData.contactEmail} within <span className="text-white">one business day</span>.
          </p>
        </div>

        {/* NDA & Support Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-light text-white/50">
          <span>Mutual Non-Disclosure Agreements (NDA) available upon request.</span>
          <a href="mailto:hello@avorria.com" className="text-white hover:text-white/70 transition-colors font-mono">
            hello@avorria.com
          </a>
        </div>
      </div>
    )
  }

  // ─── Interactive Intake Wizard ─────────────────────────────────────────────
  return (
    <div className="w-full">
      <div className="border border-white/10 bg-[#0c0c0c] p-8 md:p-12">
        
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-light block mb-1">
              STAGE 0{stage} / 05
            </span>
            <h2 className="text-xl md:text-2xl font-light text-white">
              {stage === 1 && 'Mandate & Organisation'}
              {stage === 2 && 'Operational Context & Desired Horizon'}
              {stage === 3 && 'Technical Architecture & Constraints'}
              {stage === 4 && 'Commercial Governance & Milestones'}
              {stage === 5 && 'Executive Attestation & Contact'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-white/30 font-light">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`w-6 h-1 transition-colors ${
                  s === stage ? 'bg-white' : s < stage ? 'bg-white/40' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="border border-red-500/20 bg-red-950/20 p-4 text-xs font-light text-red-300 mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={stage === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          
          {/* ─── STAGE 01: Mandate & Context ─────────────────────────────── */}
          {stage === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Organisation Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organisationName}
                    onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                    placeholder="e.g. Alkota Systems Ltd"
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Primary Domain / URL
                  </label>
                  <input
                    type="text"
                    value={formData.organisationUrl}
                    onChange={(e) => setFormData({ ...formData, organisationUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-3">
                  Engagement Archetype *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((pt) => {
                    const isSelected = formData.projectType === pt.id
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: pt.id })}
                        className={`text-left p-5 border transition-all text-xs font-light flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-light text-white mb-1">{pt.label}</p>
                          <p className="text-xs text-white/50">{pt.desc}</p>
                        </div>
                        <span className="font-mono text-[11px] text-white/40 block border-t border-white/5 pt-2">
                          {pt.horizon}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── STAGE 02: Current State & Trajectory ─────────────────────── */}
          {stage === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                  Current Operational Situation / Friction *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.currentSituation}
                  onChange={(e) => setFormData({ ...formData, currentSituation: e.target.value })}
                  placeholder="What is failing, unscalable, or holding back your business today? (e.g. legacy monolith, slow rendering, agency bottleneck, unintegrated customer workflows)..."
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                  Desired Commercial & Technical Outcome *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.desiredOutcome}
                  onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
                  placeholder="What does tangible success look like upon completion? (e.g. sub-second headless platform, automated order intake, 100% sovereign codebase, self-hosted AI integration)..."
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                  Existing Platform & Hosting Setup (If applicable)
                </label>
                <input
                  type="text"
                  value={formData.existingPlatform}
                  onChange={(e) => setFormData({ ...formData, existingPlatform: e.target.value })}
                  placeholder="e.g. WordPress on WP Engine, custom Laravel stack on AWS, Webflow..."
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          )}

          {/* ─── STAGE 03: Architectural Constraints ─────────────────────── */}
          {stage === 3 && (
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
                Select Architectural Vectors Relevant to Your Scope
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TECH_REQUIREMENTS.map((req) => {
                  const checked = formData.technicalRequirements.includes(req.id)
                  return (
                    <button
                      key={req.id}
                      type="button"
                      onClick={() => toggleReq(req.id)}
                      className={`text-left p-4 border text-xs font-light flex items-center gap-3 transition-colors ${
                        checked
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${checked ? 'border-white bg-white text-black' : 'border-white/30'}`}>
                        {checked && '✓'}
                      </span>
                      <span>{req.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ─── STAGE 04: Commercial Governance & Milestones ────────────── */}
          {stage === 4 && (
            <div className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-3">
                  Approximate Investment Bracket *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {BUDGET_RANGES.map((b) => {
                    const isSelected = formData.budgetRange === b.id
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: b.id })}
                        className={`text-left p-4 border text-xs font-light transition-colors ${
                          isSelected
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {b.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-3">
                    Target Delivery Horizon *
                  </label>
                  <div className="space-y-2">
                    {TIMELINES.map((t) => {
                      const isSelected = formData.timeline === t.id
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`w-full text-left p-3.5 border text-xs font-light transition-colors ${
                            isSelected
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-3">
                    Decision-Making Structure *
                  </label>
                  <div className="space-y-2">
                    {DECISION_STRUCTURES.map((ds) => {
                      const isSelected = formData.decisionStructure === ds
                      return (
                        <button
                          key={ds}
                          type="button"
                          onClick={() => setFormData({ ...formData, decisionStructure: ds })}
                          className={`w-full text-left p-3.5 border text-xs font-light transition-colors ${
                            isSelected
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {ds}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STAGE 05: Executive Attestation & Contacts ──────────────── */}
          {stage === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Principal Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Corporate Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.contactRole}
                    onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                    placeholder="Founder, CTO, Managing Director..."
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Relevant Repos, Staging Links or Briefs
                  </label>
                  <input
                    type="text"
                    value={formData.relevantLinks}
                    onChange={(e) => setFormData({ ...formData, relevantLinks: e.target.value })}
                    placeholder="GitHub repo, Figma URL, Google Drive brief..."
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                  Additional Scoping Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.supportingNotes}
                  onChange={(e) => setFormData({ ...formData, supportingNotes: e.target.value })}
                  placeholder="Any non-standard requirements, security reviews, or compliance requirements..."
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/40"
                />
              </div>

              <p className="text-xs text-white/40 font-light pt-2">
                By submitting this intake docket, your information is routed directly to our private technical queue for scoping evaluation. We will never sell your details or subject you to aggressive telemarketing.
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-10">
            {stage > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 border border-white/20 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors font-light"
              >
                ← Back
              </button>
            ) : (
              <span className="text-xs font-mono text-white/30 font-light">
                STEP 01 OF 05
              </span>
            )}

            {stage < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
              >
                Proceed to Stage 0{stage + 1} →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {isPending ? 'Logging Scoping Docket...' : 'Submit Strategic Scoping Docket'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
