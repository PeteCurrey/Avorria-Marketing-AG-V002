'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  label: string
  description: string
  options: {
    label: string
    risk: 'LOW' | 'MEDIUM' | 'HIGH'
    explanation: string
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'ownership',
    label: '01 // Repository & Infrastructure Ownership',
    description: 'Who controls the source code, hosting environment, and DNS records?',
    options: [
      {
        label: 'Our company owns the GitHub org, cloud accounts, and DNS directly.',
        risk: 'LOW',
        explanation: 'Zero vendor lock-in. Full institutional sovereignty over digital assets.',
      },
      {
        label: 'Shared or managed under agency credentials, but we can request access.',
        risk: 'MEDIUM',
        explanation: 'Operational vulnerability. Agency disputes or bankruptcy could jeopardize deployment access.',
      },
      {
        label: 'Agency hosts on proprietary infrastructure; we do not have root code access.',
        risk: 'HIGH',
        explanation: 'Severe IP risk. The agency holds your digital business hostage through hostage hosting.',
      },
    ],
  },
  {
    id: 'retainer_output',
    label: '02 // Monthly Retainer Value & Velocity',
    description: 'How is monthly retainer expenditure allocated and verified?',
    options: [
      {
        label: 'Clear engineering deliverables shipped in fixed bi-weekly production sprints.',
        risk: 'LOW',
        explanation: 'High capital efficiency. Retainer translates directly into platform equity.',
      },
      {
        label: 'Vague time-and-materials logs with substantial "project management" overhead.',
        risk: 'MEDIUM',
        explanation: 'Margin leak. Up to 40% of expenditure pays for meetings rather than engineering.',
      },
      {
        label: 'Fixed monthly fee with recurring rollover hours and minimal visible output.',
        risk: 'HIGH',
        explanation: 'The classic agency retainer trap: passive recurring revenue for the agency, zero velocity for you.',
      },
    ],
  },
  {
    id: 'staffing',
    label: '03 // Senior Engineering vs Junior Delegation',
    description: 'Who actually executes the design and engineering on your account?',
    options: [
      {
        label: 'Direct collaboration with senior principals and staff engineers.',
        risk: 'LOW',
        explanation: 'Zero knowledge dilution. Fast decision loops and pristine code craftsmanship.',
      },
      {
        label: 'A senior lead reviews, but day-to-day work is executed by mid-level juniors.',
        risk: 'MEDIUM',
        explanation: 'Standard agency model. Quality is variable and refactoring costs compound over time.',
      },
      {
        label: 'A revolving door of junior account managers and undisclosed offshore contractors.',
        risk: 'HIGH',
        explanation: 'Acute technical debt. Fragile architecture requiring complete teardowns within 24 months.',
      },
    ],
  },
  {
    id: 'stack',
    label: '04 // Technology Modernity & Portability',
    description: 'What underlying technology stack powers your primary customer-facing platform?',
    options: [
      {
        label: 'Modern headless stack (Next.js, React 19, TypeScript, PostgreSQL / Supabase).',
        risk: 'LOW',
        explanation: 'Future-proof, performant, and easily staffed by elite engineers anywhere in the world.',
      },
      {
        label: 'Custom CMS theme or monolithic PHP/WordPress with extensive plugin dependencies.',
        risk: 'MEDIUM',
        explanation: 'Fragile maintenance requirements, frequent security patching, and slow Core Web Vitals.',
      },
      {
        label: 'Proprietary closed agency framework or legacy page-builder system.',
        risk: 'HIGH',
        explanation: 'Complete technological dead end. Cannot scale or integrate modern AI or custom workflows.',
      },
    ],
  },
  {
    id: 'portability',
    label: '05 // Migration Feasibility & Portability',
    description: 'How quickly could a new engineering team take over and deploy a critical hotfix?',
    options: [
      {
        label: 'Under 24 hours. Automated CI/CD, documented architecture, and clean git history.',
        risk: 'LOW',
        explanation: 'Institutional grade. Complete resilience against vendor disruption.',
      },
      {
        label: '1 to 2 weeks. Requires agency handover meetings and reverse-engineering undocumented code.',
        risk: 'MEDIUM',
        explanation: 'Moderate transition friction, but manageable with senior architectural audit.',
      },
      {
        label: 'Impossible without a total platform rebuild from scratch.',
        risk: 'HIGH',
        explanation: 'Catastrophic dependency. You do not own a digital product; you rent an agency bottleneck.',
      },
    ],
  },
]

export function AgencyAssessmentRunner() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const answeredCount = Object.keys(answers).length
  const totalCount = QUESTIONS.length

  function handleSelect(questionId: string, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }))
  }

  function handleCalculate() {
    if (answeredCount === totalCount) {
      setIsCompleted(true)
    }
  }

  // Calculate risk profile
  const riskCounts = { LOW: 0, MEDIUM: 0, HIGH: 0 }
  Object.entries(answers).forEach(([qId, optIdx]) => {
    const q = QUESTIONS.find((item) => item.id === qId)
    if (q) {
      const opt = q.options[optIdx]
      riskCounts[opt.risk]++
    }
  })

  const primaryRisk =
    riskCounts.HIGH >= 2 ? 'HIGH' : riskCounts.HIGH === 1 || riskCounts.MEDIUM >= 2 ? 'MEDIUM' : 'LOW'

  return (
    <div className="w-full space-y-12">
      {/* Questionnaire */}
      <div className="space-y-8">
        {QUESTIONS.map((q) => {
          const selectedIdx = answers[q.id]

          return (
            <div
              key={q.id}
              className="border border-white/10 bg-[#0c0c0c] p-6 md:p-8 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-3">
                <h3 className="text-sm font-light text-white tracking-wide">{q.label}</h3>
                <span className="text-xs text-white/40 font-light">{q.description}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedIdx === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(q.id, idx)}
                      className={`text-left p-4 border transition-all text-xs font-light leading-relaxed flex items-start gap-4 ${
                        isSelected
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full border mt-0.5 shrink-0 ${isSelected ? 'border-white bg-white' : 'border-white/30'}`} />
                      <div className="space-y-1">
                        <p className="text-sm font-light text-white">{opt.label}</p>
                        <p className="text-xs text-white/40">{opt.explanation}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Action / Trigger */}
      {!isCompleted && (
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-xs font-mono text-white/40 font-light">
            COMPLETED: {answeredCount} / {totalCount} CRITERIA
          </span>
          <button
            type="button"
            disabled={answeredCount < totalCount}
            onClick={handleCalculate}
            className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Calculate Agency Risk Profile
          </button>
        </div>
      )}

      {/* Results Teardown Summary */}
      {isCompleted && (
        <div className="border border-white/15 bg-[#0e0e0e] p-8 md:p-12 space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                [ DIAGNOSTIC ASSESSMENT // AGENCY RISK PROFILE ]
              </p>
              <h3 className="text-2xl md:text-3xl font-light text-white">
                {primaryRisk === 'HIGH'
                  ? 'Severe Commercial Dependency & Vendor Lock-In'
                  : primaryRisk === 'MEDIUM'
                  ? 'Moderate Margin Inefficiency & Technical Friction'
                  : 'Sound Asset Sovereignty & Controlled Engagement'}
              </h3>
            </div>
            <div className="shrink-0">
              <span
                className={`px-4 py-2 border text-xs font-mono uppercase tracking-widest ${
                  primaryRisk === 'HIGH'
                    ? 'border-red-500/40 text-red-400 bg-red-950/20'
                    : primaryRisk === 'MEDIUM'
                    ? 'border-amber-500/40 text-amber-400 bg-amber-950/20'
                    : 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                }`}
              >
                EXPOSURE: {primaryRisk} RISK
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light">
            <div className="border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xl font-light text-emerald-400 block">{riskCounts.LOW}</span>
              <span className="text-white/60 uppercase tracking-wider">Low Risk Dimensions</span>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xl font-light text-amber-400 block">{riskCounts.MEDIUM}</span>
              <span className="text-white/60 uppercase tracking-wider">Moderate Inefficiencies</span>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xl font-light text-red-400 block">{riskCounts.HIGH}</span>
              <span className="text-white/60 uppercase tracking-wider">Critical Vulnerabilities</span>
            </div>
          </div>

          <div className="text-sm font-light text-white/70 leading-relaxed max-w-3xl space-y-4">
            <p>
              {primaryRisk === 'HIGH'
                ? 'Your current digital agency arrangement exhibits significant commercial vulnerabilities. Lack of direct code ownership, combined with proprietary platform lock-in, leaves your business exposed to inflated maintenance fees and migration paralysis. An immediate code extraction and sovereignty handover is recommended.'
                : primaryRisk === 'MEDIUM'
                ? 'Your agency relationship contains classic retainer inefficiencies. While catastrophic failure is unlikely, you are incurring substantial margin leak on non-engineering overhead, and technical debt will impede future product evolution.'
                : 'Your organization maintains healthy control over primary infrastructure and source code repositories. Continued governance should focus on maintaining modern CI/CD automation and sub-second performance thresholds.'}
            </p>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 font-light">Next Recommended Step</p>
              <p className="text-sm font-light text-white">Confidential Agency Transition Audit (£1,500 – £3,500 fixed deliverable)</p>
            </div>
            <Link
              href="/start-a-project?track=teardown"
              className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
            >
              Discuss Agency Transition
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
