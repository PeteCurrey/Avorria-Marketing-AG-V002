'use client'

import { useState, useTransition, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { submitConsultationAction } from '@/lib/actions/consultation'
import type {
  ConsultationReceipt,
  ChallengeType,
  ProjectCategory,
  InitiationBudgetOption,
  TimelineOption,
  ProjectInitiationFormData,
} from '@/types/consultation'

// ─── Stage 02: Challenge Options ──────────────────────────────────────────────
const CHALLENGE_OPTIONS: { id: ChallengeType; label: string; desc: string }[] = [
  {
    id: 'build-new',
    label: 'BUILD SOMETHING NEW',
    desc: 'Creating a new digital product, platform or flagship digital presence from zero.',
  },
  {
    id: 'replace-existing',
    label: 'REPLACE SOMETHING',
    desc: 'Retiring a legacy platform, outdated architecture or fragmented agency build.',
  },
  {
    id: 'connect-systems',
    label: 'CONNECT SOMETHING',
    desc: 'Integrating disparate APIs, workflows, AI pipelines or enterprise data layers.',
  },
  {
    id: 'fix-problems',
    label: 'FIX SOMETHING',
    desc: 'Diagnosing critical latency, layout instability, rendering debt or conversion drop-off.',
  },
  {
    id: 'grow-scale',
    label: 'GROW SOMETHING',
    desc: 'Scaling traffic, commercial velocity, programmatic SEO or platform capacity.',
  },
  {
    id: 'not-sure',
    label: "I'M NOT SURE YET",
    desc: 'Exploring feasibility, technical roadmap options or strategic architectural guidance.',
  },
]

// ─── Stage 03: Project Categories & Real Project Visuals ──────────────────────
const PROJECT_CATEGORIES: {
  id: ProjectCategory
  label: string
  desc: string
  media: {
    src: string
    alt: string
    projectTitle: string
    caption: string
  }
}[] = [
  {
    id: 'website',
    label: 'WEBSITE',
    desc: 'High-performance flagship editorial websites and sovereign brand experiences.',
    media: {
      src: '/images/projects/alkota-bikes/hero.webp',
      alt: 'Alkota Bikes flagship web experience',
      projectTitle: 'Alkota Bikes',
      caption: 'Real Avorria deliverable: High-performance flagship web platform.',
    },
  },
  {
    id: 'web-application',
    label: 'WEB APPLICATION',
    desc: 'Sovereign web applications with real-time state, custom workflows, and deep APIs.',
    media: {
      src: '/images/projects/drawdown/hero.png',
      alt: 'Drawdown.Trading quantitative terminal interface',
      projectTitle: 'Drawdown.Trading',
      caption: 'Real Avorria deliverable: Low-latency web application.',
    },
  },
  {
    id: 'digital-platform',
    label: 'DIGITAL PLATFORM',
    desc: 'Multi-tenant software platforms, client portals, and institutional portals.',
    media: {
      src: '/images/projects/nestiq/hero.webp',
      alt: 'NestIQ spatial property intelligence platform',
      projectTitle: 'NestIQ',
      caption: 'Real Avorria deliverable: Institutional spatial data platform.',
    },
  },
  {
    id: 'ai-system',
    label: 'AI SYSTEM',
    desc: 'Autonomous agent pipelines, semantic embeddings, and LLM orchestration.',
    media: {
      src: '/images/projects/careeros/hero.webp',
      alt: 'CareerOS AI skill taxonomy graph',
      projectTitle: 'CareerOS',
      caption: 'Real Avorria deliverable: Autonomous AI orchestration system.',
    },
  },
  {
    id: 'search-seo',
    label: 'SEARCH / SEO',
    desc: 'Programmatic routing, high-authority technical SEO, and indexation dominance.',
    media: {
      src: '/images/projects/entirefm/hero.webp',
      alt: 'EntireFM commercial dispatch and technical SEO infrastructure',
      projectTitle: 'EntireFM',
      caption: 'Real Avorria deliverable: Nationwide programmatic search architecture.',
    },
  },
  {
    id: 'digital-transformation',
    label: 'DIGITAL TRANSFORMATION',
    desc: 'Comprehensive re-architecting of operational software, dispatch, and infrastructure.',
    media: {
      src: '/images/projects/one-great-northern/hero.webp',
      alt: 'One Great Northern architectural digital showcase',
      projectTitle: 'One Great Northern',
      caption: 'Real Avorria deliverable: Digital transformation & spatial showcase.',
    },
  },
  {
    id: 'other',
    label: 'OTHER',
    desc: 'Bespoke R&D, forensic technical audits, or non-standard architectural engagements.',
    media: {
      src: '/images/projects/alkota-bikes/thumbnail.webp',
      alt: 'Alkota Bikes titanium frame geometry interface',
      projectTitle: 'Alkota Bikes (Precision Engineering)',
      caption: 'Real Avorria deliverable: Custom engineering & telemetry.',
    },
  },
]

// ─── Stage 04: Budget Brackets ────────────────────────────────────────────────
const BUDGET_OPTIONS: { id: InitiationBudgetOption; label: string; desc: string }[] = [
  { id: '5k-10k', label: '£5–10K', desc: 'Targeted architectural sprints, focused audits, or discrete component builds.' },
  { id: '10k-25k', label: '£10–25K', desc: 'Custom flagship websites, high-performance web applications, or core platforms.' },
  { id: '25k-50k', label: '£25–50K', desc: 'Comprehensive digital products, multi-tenant systems, or custom AI engines.' },
  { id: '50k-plus', label: '£50K+', desc: 'Large-scale enterprise platforms, multi-phase systems, or dedicated retainers.' },
  { id: 'not-sure', label: 'NOT SURE YET', desc: "We'll work with you to define the appropriate scope and architectural milestones." },
]

// ─── Stage 05: Timing Options ─────────────────────────────────────────────────
const TIMING_OPTIONS: { id: TimelineOption; label: string; desc: string }[] = [
  { id: 'immediate', label: 'IMMEDIATELY', desc: 'Critical commercial timeline or immediate launch requirement.' },
  { id: '1-3-months', label: '1–3 MONTHS', desc: 'Standard production runway for high-performance builds.' },
  { id: '3-6-months', label: '3–6 MONTHS', desc: 'Structured timeline aligning with strategic product quarters.' },
  { id: 'exploratory', label: 'PLANNING AHEAD', desc: 'Future roadmap planning, exploratory R&D, or RFP evaluation.' },
]

export function ProjectInitiationWizard() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<ConsultationReceipt | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<ProjectCategory | null>(null)

  // Accessible IDs
  const orgNameId = useId()
  const orgUrlId = useId()
  const contactNameId = useId()
  const contactRoleId = useId()
  const contactEmailId = useId()
  const challengeDescId = useId()
  const finalBriefId = useId()

  // Form State
  const [formData, setFormData] = useState<ProjectInitiationFormData>({
    organisationName: '',
    organisationUrl: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    challengeType: 'build-new',
    challengeDescription: '',
    projectCategories: ['website'],
    budgetRange: '10k-25k',
    timeline: '1-3-months',
    additionalContext: '',
  })

  // Determine active media for dossier
  const activeCategory =
    hoveredCategory ||
    formData.projectCategories?.[0] ||
    'website'
  const activeMediaConfig =
    PROJECT_CATEGORIES.find((c) => c.id === activeCategory)?.media ||
    PROJECT_CATEGORIES[0].media

  // Category toggle for Stage 03
  const toggleCategory = (id: ProjectCategory) => {
    setFormData((prev) => {
      const current = prev.projectCategories || []
      const exists = current.includes(id)
      const updated = exists ? current.filter((c) => c !== id) : [...current, id]
      return {
        ...prev,
        projectCategories: updated.length > 0 ? updated : [id],
      }
    })
  }

  // Navigation handlers
  const handleNext = () => {
    setErrorMessage(null)
    if (stage === 1) {
      if (!formData.organisationName.trim()) {
        setErrorMessage('Please provide an organisation name.')
        return
      }
      if (!formData.contactName.trim()) {
        setErrorMessage('Please provide your name.')
        return
      }
      if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
        setErrorMessage('Please provide a valid work email address.')
        return
      }
    }
    if (stage === 2) {
      if (!formData.challengeType) {
        setErrorMessage('Please select what needs to change.')
        return
      }
    }
    if (stage === 3) {
      if (!formData.projectCategories || formData.projectCategories.length === 0) {
        setErrorMessage('Please select at least one project type.')
        return
      }
    }

    if (stage < 6) {
      setStage((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6)
      // Smooth scroll back to top of form container if scrolled down
      const formEl = document.getElementById('initiation-wizard')
      if (formEl) {
        const rect = formEl.getBoundingClientRect()
        if (rect.top < 0) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const handleBack = () => {
    setErrorMessage(null)
    if (stage > 1) {
      setStage((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.organisationName.trim() || !formData.contactEmail.trim()) {
      setErrorMessage('Please complete the required organisation and contact fields.')
      setStage(1)
      return
    }

    startTransition(async () => {
      const res = await submitConsultationAction(formData)
      if (res.success && res.receipt) {
        setReceipt(res.receipt)
        const topEl = document.getElementById('initiation-wizard')
        if (topEl) topEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        setErrorMessage(res.error || 'Submission failed. Please check your inputs or email hello@avorria.com.')
      }
    })
  }

  // ─── POST-SUBMISSION CONFIRMATION EXPERIENCE ──────────────────────────────
  if (receipt) {
    return (
      <div className="border border-[var(--color-border-strong)] bg-white p-8 md:p-14 space-y-12 animate-fade-in shadow-sm">
        {/* Header with Docket reference */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[var(--color-border)] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-[11px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-mid)]">
                PROJECT BRIEF TRANSMITTED // REGISTERED
              </p>
            </div>
            <h2 className="text-display-s md:text-display-m font-extralight text-[var(--color-graphite)] tracking-tight">
              Project Brief Received.
            </h2>
            <p className="text-sm font-mono text-[var(--color-graphite-muted)] mt-2">
              DOCKET REF: {receipt.reference}
            </p>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-[var(--color-graphite-mid)] md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[var(--color-rose-text)] pl-4 md:pl-0 md:pr-4">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] tracking-wider uppercase font-light">
              QUEUED FOR PRINCIPAL TRIAGE
            </span>
            <p>SLA: 24 BUSINESS HOURS</p>
            <p>CLIENT: {formData.organisationName}</p>
          </div>
        </div>

        {/* Narrative reassurance */}
        <div className="space-y-4 max-w-3xl">
          <p className="text-body-l font-light text-[var(--color-graphite)] leading-relaxed">
            Your brief is now with Avorria. We will review the opportunity, assess the appropriate
            architectural direction, and come back to <span className="font-mono text-[var(--color-rose-text)]">{formData.contactEmail}</span> with
            clear next steps.
          </p>
          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
            Every brief is evaluated directly by senior engineering principals rather than junior
            account managers or commission-driven sales staff.
          </p>
        </div>

        {/* 4-Step Next Protocol Grid */}
        <div className="border-t border-b border-[var(--color-border)] py-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] font-light mb-8">
            VERIFIED NEXT STEPS // ENGAGEMENT PIPELINE
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[var(--color-border)] bg-[var(--color-ivory-dark)] p-6 space-y-3">
              <span className="text-xs font-mono text-[var(--color-rose-text)] block">01</span>
              <h3 className="text-sm uppercase tracking-wider font-light text-[var(--color-graphite)]">
                REVIEW
              </h3>
              <p className="text-xs text-[var(--color-graphite-mid)] font-light leading-relaxed">
                A senior member of the technical team reviews your operational context, constraints, and objectives.
              </p>
            </div>

            <div className="border border-[var(--color-border)] bg-[var(--color-ivory-dark)] p-6 space-y-3">
              <span className="text-xs font-mono text-[var(--color-rose-text)] block">02</span>
              <h3 className="text-sm uppercase tracking-wider font-light text-[var(--color-graphite)]">
                DIRECTION
              </h3>
              <p className="text-xs text-[var(--color-graphite-mid)] font-light leading-relaxed">
                We determine the appropriate technological direction, feasibility parameters, and engagement shape.
              </p>
            </div>

            <div className="border border-[var(--color-border)] bg-[var(--color-ivory-dark)] p-6 space-y-3">
              <span className="text-xs font-mono text-[var(--color-rose-text)] block">03</span>
              <h3 className="text-sm uppercase tracking-wider font-light text-[var(--color-graphite)]">
                SCOPING
              </h3>
              <p className="text-xs text-[var(--color-graphite-mid)] font-light leading-relaxed">
                We discuss digital architecture, delivery milestones, timing horizons, and transparent commercial boundaries.
              </p>
            </div>

            <div className="border border-[var(--color-border)] bg-[var(--color-ivory-dark)] p-6 space-y-3">
              <span className="text-xs font-mono text-[var(--color-rose-text)] block">04</span>
              <h3 className="text-sm uppercase tracking-wider font-light text-[var(--color-graphite)]">
                BUILD
              </h3>
              <p className="text-xs text-[var(--color-graphite-mid)] font-light leading-relaxed">
                If there is mutual alignment, we lock the deliverable schedule and transition directly into engineering execution.
              </p>
            </div>
          </div>
        </div>

        {/* Real Avorria Project Media Anchor */}
        <div className="space-y-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] font-light">
            INSPIRATION // RECENT VERIFIED DELIVERABLE
          </p>
          <div className="relative aspect-[21/9] w-full border border-[var(--color-border)] overflow-hidden bg-black/5">
            <Image
              src="/images/projects/alkota-bikes/hero.webp"
              alt="Alkota Bikes flagship titanium platform"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                  VERIFIED DELIVERABLE · ALKOTA BIKES
                </p>
                <p className="text-base font-extralight tracking-tight">
                  High-Performance Digital Flagship & Custom Geometry Engine
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)]">
          <span className="text-xs font-light text-[var(--color-graphite-mid)]">
            Mutual Non-Disclosure Agreements (NDA) executed on request prior to sensitive architectural disclosure.
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/work"
              className="btn-secondary text-xs uppercase tracking-[0.14em] font-light px-6 py-3 border border-[var(--color-border-strong)]"
            >
              View Verified Work →
            </Link>
            <Link
              href="/"
              className="btn-primary text-xs uppercase tracking-[0.14em] font-light px-6 py-3"
            >
              Return Home →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── PROGRESSIVE PROJECT INITIATION FORM ──────────────────────────────────
  return (
    <div id="initiation-wizard" className="w-full">
      {/* 2-Column Responsive Layout: Progressive Form on Left, Dossier Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form Stage Container (7 Cols on Desktop) */}
        <div className="lg:col-span-7">
          <div className="border border-[var(--color-border)] bg-white p-6 sm:p-10 md:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            {/* Stage Progress Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-rose-text)] font-light">
                  0{stage} / 06
                </span>
                <span className="h-px w-6 bg-[var(--color-border-strong)]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-mid)]">
                  {stage === 1 && 'THE BUSINESS'}
                  {stage === 2 && 'THE CHALLENGE'}
                  {stage === 3 && 'THE PROJECT'}
                  {stage === 4 && 'THE AMBITION'}
                  {stage === 5 && 'THE TIMING'}
                  {stage === 6 && 'FINAL BRIEF'}
                </span>
              </div>

              {/* Step Dots Indicator */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <span
                    key={s}
                    className={`h-1.5 transition-all duration-300 ${
                      s === stage
                        ? 'w-6 bg-[var(--color-graphite)]'
                        : s < stage
                        ? 'w-2 bg-[var(--color-rose-text)]'
                        : 'w-2 bg-[var(--color-border)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-6 p-4 border border-rose-200 bg-rose-50/60 text-xs font-light text-rose-900 leading-relaxed flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-rose-500 hover:text-rose-800 ml-4 font-mono"
                  aria-label="Dismiss error"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={stage === 6 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {/* ─── STAGE 01: THE BUSINESS ─────────────────────────────────── */}
              {stage === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      Tell us who we&apos;re building for.
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)]">
                      Basic organisation parameters and principal contact details.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor={orgNameId}
                        className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                      >
                        Organisation Name *
                      </label>
                      <input
                        id={orgNameId}
                        type="text"
                        required
                        value={formData.organisationName}
                        onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                        placeholder="e.g. Alkota Systems Ltd"
                        className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={orgUrlId}
                        className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                      >
                        Primary Domain / URL
                      </label>
                      <input
                        id={orgUrlId}
                        type="url"
                        value={formData.organisationUrl}
                        onChange={(e) => setFormData({ ...formData, organisationUrl: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor={contactNameId}
                          className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                        >
                          Your Name *
                        </label>
                        <input
                          id={contactNameId}
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="e.g. Rachel Foster"
                          className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={contactRoleId}
                          className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                        >
                          Your Role
                        </label>
                        <input
                          id={contactRoleId}
                          type="text"
                          value={formData.contactRole}
                          onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                          placeholder="Founder, CTO, Managing Director..."
                          className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={contactEmailId}
                        className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                      >
                        Corporate Email *
                      </label>
                      <input
                        id={contactEmailId}
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="rachel@alkota.com"
                        className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STAGE 02: THE CHALLENGE ────────────────────────────────── */}
              {stage === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      What needs to change?
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)]">
                      Select the primary objective that captures what you are looking to achieve.
                    </p>
                  </div>

                  {/* Challenge Selection Tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {CHALLENGE_OPTIONS.map((opt) => {
                      const isSelected = formData.challengeType === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, challengeType: opt.id })}
                          className={`text-left p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white shadow-sm'
                              : 'border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[var(--color-graphite)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          <span className="text-xs uppercase tracking-[0.12em] font-light block mb-2">
                            {opt.label}
                          </span>
                          <span
                            className={`text-[12px] font-light leading-relaxed ${
                              isSelected ? 'text-white/70' : 'text-[var(--color-graphite-mid)]'
                            }`}
                          >
                            {opt.desc}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Challenge Narrative Free-Text */}
                  <div className="pt-2">
                    <label
                      htmlFor={challengeDescId}
                      className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                    >
                      Tell us about the challenge
                    </label>
                    <textarea
                      id={challengeDescId}
                      rows={4}
                      value={formData.challengeDescription}
                      onChange={(e) => setFormData({ ...formData, challengeDescription: e.target.value })}
                      placeholder="What is failing, unscalable, slow, or holding back your business today? We do not require technical jargon..."
                      className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors resize-y leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ─── STAGE 03: THE PROJECT ──────────────────────────────────── */}
              {stage === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      What are we building?
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)]">
                      Select one or multiple deliverables. Hover over an option to preview related verified work in the dossier.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {PROJECT_CATEGORIES.map((cat) => {
                      const isSelected = formData.projectCategories?.includes(cat.id)
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          onMouseEnter={() => setHoveredCategory(cat.id)}
                          onMouseLeave={() => setHoveredCategory(null)}
                          className={`text-left p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white shadow-sm'
                              : 'border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[var(--color-graphite)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <span className="text-xs uppercase tracking-[0.14em] font-light">
                              {cat.label}
                            </span>
                            <span
                              className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                                isSelected
                                  ? 'border-white bg-white text-black'
                                  : 'border-[var(--color-border-strong)]'
                              }`}
                            >
                              {isSelected && '✓'}
                            </span>
                          </div>
                          <span
                            className={`text-[12px] font-light leading-relaxed ${
                              isSelected ? 'text-white/70' : 'text-[var(--color-graphite-mid)]'
                            }`}
                          >
                            {cat.desc}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ─── STAGE 04: THE AMBITION ─────────────────────────────────── */}
              {stage === 4 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      What are you looking to invest?
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                      Establishing an appropriate commercial bracket helps us design the correct digital architecture, team density, and milestone roadmap.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {BUDGET_OPTIONS.map((b) => {
                      const isSelected = formData.budgetRange === b.id
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b.id })}
                          className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white shadow-sm'
                              : 'border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[var(--color-graphite)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          <span className="text-sm uppercase tracking-[0.12em] font-light font-mono">
                            {b.label}
                          </span>
                          <span
                            className={`text-xs font-light max-w-sm sm:text-right ${
                              isSelected ? 'text-white/70' : 'text-[var(--color-graphite-mid)]'
                            }`}
                          >
                            {b.desc}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="p-4 border border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    <span className="text-[var(--color-graphite)] font-light">Not sure yet? </span>
                    That is completely fine. We can help establish the appropriate scope and phased delivery trajectory following our initial technical review.
                  </div>
                </div>
              )}

              {/* ─── STAGE 05: THE TIMING ───────────────────────────────────── */}
              {stage === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      When does this need to move?
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)]">
                      When would you like work to commence or reach production launch?
                    </p>
                  </div>

                  <div className="space-y-3">
                    {TIMING_OPTIONS.map((t) => {
                      const isSelected = formData.timeline === t.id
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white shadow-sm'
                              : 'border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[var(--color-graphite)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          <span className="text-sm uppercase tracking-[0.12em] font-light font-mono">
                            {t.label}
                          </span>
                          <span
                            className={`text-xs font-light sm:text-right ${
                              isSelected ? 'text-white/70' : 'text-[var(--color-graphite-mid)]'
                            }`}
                          >
                            {t.desc}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ─── STAGE 06: FINAL BRIEF ──────────────────────────────────── */}
              {stage === 6 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
                      Tell us what matters.
                    </h2>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)]">
                      Tell us anything else that would help us understand the opportunity.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor={finalBriefId}
                      className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-graphite-mid)] font-light mb-2"
                    >
                      Additional Context / Links / Repositories
                    </label>
                    <textarea
                      id={finalBriefId}
                      rows={6}
                      value={formData.additionalContext}
                      onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                      placeholder="Share existing staging links, GitHub repositories, Figma prototypes, key performance targets, or specific technical constraints..."
                      className="w-full bg-[var(--color-ivory-dark)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] font-light placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  <div className="p-4 border-l-2 border-[var(--color-rose-text)] bg-[var(--color-ivory-dark)] text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    By submitting this brief, your specifications are routed directly to our private technical pipeline. We respect client confidentiality and will never share your information.
                  </div>
                </div>
              )}

              {/* Form Controls Bar */}
              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-8 mt-10">
                {stage > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3.5 border border-[var(--color-border-strong)] text-xs uppercase tracking-[0.16em] text-[var(--color-graphite)] hover:border-black transition-colors font-light cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-[var(--color-graphite-muted)] uppercase tracking-wider">
                    STAGE 01 OF 06
                  </span>
                )}

                {stage < 6 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-light cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Proceed to Stage 0{stage + 1}</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary px-8 py-4 text-xs uppercase tracking-[0.18em] font-light cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    <span>{isPending ? 'Transmitting Brief...' : 'SUBMIT PROJECT BRIEF →'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Live Project Dossier (5 Cols on Desktop, Sticky) */}
        <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="border border-[var(--color-border)] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Dossier Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-graphite-muted)] uppercase">
                  AVORRIA
                </p>
                <p className="text-xs uppercase tracking-[0.2em] font-light text-[var(--color-graphite)] mt-0.5">
                  PROJECT DOSSIER
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--color-rose-text)] font-light">
                0{stage} / 06
              </span>
            </div>

            {/* Dynamic Telemetry Matrix */}
            <dl className="space-y-4 text-xs font-light">
              <div className="border-b border-[var(--color-border)] pb-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  ORGANISATION
                </dt>
                <dd className="text-sm font-light text-[var(--color-graphite)] truncate">
                  {formData.organisationName.trim() || '—'}
                </dd>
              </div>

              <div className="border-b border-[var(--color-border)] pb-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  PROJECT
                </dt>
                <dd className="text-sm font-light text-[var(--color-graphite)]">
                  {formData.projectCategories && formData.projectCategories.length > 0
                    ? formData.projectCategories
                        .map((c) => PROJECT_CATEGORIES.find((pc) => pc.id === c)?.label)
                        .filter(Boolean)
                        .join(', ')
                    : 'Website'}
                </dd>
              </div>

              <div className="border-b border-[var(--color-border)] pb-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  OBJECTIVE
                </dt>
                <dd className="text-sm font-light text-[var(--color-graphite)]">
                  {CHALLENGE_OPTIONS.find((c) => c.id === formData.challengeType)?.label || '—'}
                </dd>
              </div>

              <div className="border-b border-[var(--color-border)] pb-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  INVESTMENT
                </dt>
                <dd className="text-sm font-mono font-light text-[var(--color-graphite)]">
                  {BUDGET_OPTIONS.find((b) => b.id === formData.budgetRange)?.label || '£10–25K'}
                </dd>
              </div>

              <div className="border-b border-[var(--color-border)] pb-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  TIMING
                </dt>
                <dd className="text-sm font-mono font-light text-[var(--color-graphite)]">
                  {TIMING_OPTIONS.find((t) => t.id === formData.timeline)?.label || '1–3 MONTHS'}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-graphite-muted)] block mb-1">
                  STATUS
                </dt>
                <dd className="flex items-center gap-2 text-xs font-mono text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{stage === 6 ? 'READY TO TRANSMIT' : 'BRIEF IN PROGRESS'}</span>
                </dd>
              </div>
            </dl>

            {/* Illustrative Dossier Media — Changes with Category */}
            <div className="pt-2 border-t border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-graphite-muted)] uppercase">
                <span>INSPIRATION MEDIA</span>
                <span className="text-[var(--color-rose-text)]">{activeMediaConfig.projectTitle}</span>
              </div>
              <div className="relative aspect-[16/10] w-full border border-[var(--color-border)] overflow-hidden bg-black/5">
                <Image
                  src={activeMediaConfig.src}
                  alt={activeMediaConfig.alt}
                  fill
                  sizes="400px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="text-[10px] font-light text-[var(--color-graphite-muted)] leading-tight italic">
                {activeMediaConfig.caption} Illustrative project inspiration only; not client solution.
              </p>
            </div>

            {/* Protocol Commitment */}
            <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] font-light text-[var(--color-graphite-muted)]">
                NEXT
              </p>
              <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                Avorria will review the brief and determine the appropriate direction, architectural scope, and next steps within 24 business hours.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
