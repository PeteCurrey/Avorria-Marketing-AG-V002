'use client'

import { useState } from 'react'
import { computeFinancialScenario } from '@/lib/finance/scenarios'

interface PredefinedScenario {
  label: string
  desc: string
  sprints: number
  sprintFee: number
  retainers: number
  retainerFee: number
}

const scenarios: PredefinedScenario[] = [
  {
    label: 'Conservative',
    desc: '2 Build Sprints concurrent, 3 ongoing retainers',
    sprints: 2,
    sprintFee: 28500,
    retainers: 3,
    retainerFee: 3500,
  },
  {
    label: 'Current Target',
    desc: '3 Build Sprints concurrent, 5 high-assurance retainers',
    sprints: 3,
    sprintFee: 28500,
    retainers: 5,
    retainerFee: 4200,
  },
  {
    label: 'Scaled Studio',
    desc: '5 Build Sprints concurrent, 8 institutional retainers',
    sprints: 5,
    sprintFee: 34000,
    retainers: 8,
    retainerFee: 4800,
  },
]

export function FinanceScenarioPlanner() {
  const [selectedIdx, setSelectedIdx] = useState(1) // Default to Current Target
  const [sprints, setSprints] = useState(scenarios[1].sprints)
  const [sprintFee, setSprintFee] = useState(scenarios[1].sprintFee)
  const [retainers, setRetainers] = useState(scenarios[1].retainers)
  const [retainerFee, setRetainerFee] = useState(scenarios[1].retainerFee)

  const scenario = computeFinancialScenario({
    activeBuildSprints: sprints,
    averageSprintFee: sprintFee,
    activeRetainers: retainers,
    averageRetainerFee: retainerFee,
    directEngineeringCostRatio: 0.28,
  })

  function applyPreset(idx: number) {
    setSelectedIdx(idx)
    const p = scenarios[idx]
    setSprints(p.sprints)
    setSprintFee(p.sprintFee)
    setRetainers(p.retainers)
    setRetainerFee(p.retainerFee)
  }

  return (
    <div className="space-y-8">
      {/* Preset Scenario Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((sc, idx) => {
          const isSelected = selectedIdx === idx
          return (
            <button
              key={sc.label}
              type="button"
              onClick={() => applyPreset(idx)}
              className={`text-left p-5 border transition-all ${
                isSelected
                  ? 'border-white/40 bg-white/[0.05]'
                  : 'border-white/10 bg-[#111] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  {sc.label}
                </span>
                {isSelected && (
                  <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5">
                    Active Model
                  </span>
                )}
              </div>
              <p className="text-[11px] font-light text-white/50">{sc.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Interactive Controls & Live Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              Parametric Levers
            </h3>
            <p className="text-[11px] font-light text-white/40 mt-1">
              Adjust sprint volume and monthly retainer pricing.
            </p>
          </div>

          <div className="space-y-4 text-xs font-light">
            <div>
              <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                <span>Concurrent Build Sprints</span>
                <span className="text-white">{sprints} active</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={sprints}
                onChange={(e) => {
                  setSprints(Number(e.target.value))
                  setSelectedIdx(-1)
                }}
                className="w-full accent-white"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                <span>Avg Sprint Fee (£)</span>
                <span className="text-white">£{sprintFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={15000}
                max={50000}
                step={1000}
                value={sprintFee}
                onChange={(e) => {
                  setSprintFee(Number(e.target.value))
                  setSelectedIdx(-1)
                }}
                className="w-full accent-white"
              />
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                <span>Active Retainers</span>
                <span className="text-white">{retainers} clients</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={retainers}
                onChange={(e) => {
                  setRetainers(Number(e.target.value))
                  setSelectedIdx(-1)
                }}
                className="w-full accent-white"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                <span>Retainer Fee (£/mo)</span>
                <span className="text-white">£{retainerFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={10000}
                step={250}
                value={retainerFee}
                onChange={(e) => {
                  setRetainerFee(Number(e.target.value))
                  setSelectedIdx(-1)
                }}
                className="w-full accent-white"
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Output */}
        <div className="lg:col-span-2 border border-white/10 p-6 bg-[#111] space-y-6">
          <div className="border-b border-white/10 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
                P&L Projections & Cashflow
              </h3>
              <p className="text-[11px] font-light text-white/40 mt-0.5">
                Deterministic model based on 50% deposit intake and 28% direct cost envelope.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
              MARGIN: {scenario.netMarginPercentage}%
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Monthly Gross</span>
              <p className="text-xl font-extralight text-white mt-1">
                £{Math.round(scenario.monthlyGrossRevenue).toLocaleString()}
              </p>
              <span className="text-[10px] font-light text-white/40">Recurring + Sprints</span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-white/40 block">ARR Run-Rate</span>
              <p className="text-xl font-extralight text-emerald-400 mt-1">
                £{Math.round(scenario.annualizedRunRate).toLocaleString()}
              </p>
              <span className="text-[10px] font-light text-white/40">12mo projection</span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-white/40 block">30d Cash Inflow</span>
              <p className="text-xl font-extralight text-white mt-1">
                £{Math.round(scenario.cashflowProjection30d).toLocaleString()}
              </p>
              <span className="text-[10px] font-light text-white/40">Deposits + MRR</span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-white/40 block">90d Cash Inflow</span>
              <p className="text-xl font-extralight text-white mt-1">
                £{Math.round(scenario.cashflowProjection90d).toLocaleString()}
              </p>
              <span className="text-[10px] font-light text-white/40">Quarterly horizon</span>
            </div>
          </div>

          {/* Unit Cost Breakdown */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-white/60">
              Unit Economics Envelope
            </h4>
            <div className="border border-white/10 divide-y divide-white/5 font-mono text-xs">
              <div className="flex justify-between p-3 bg-white/[0.01]">
                <span className="text-white/60">Sprint Revenue Allocation (Monthly)</span>
                <span className="text-white">
                  £{Math.round((sprints * sprintFee) / 2).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white/[0.01]">
                <span className="text-white/60">Retainer MRR Base</span>
                <span className="text-white">
                  £{(retainers * retainerFee).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white/[0.01]">
                <span className="text-white/60">Direct Infrastructure & Compute (Vercel, Supabase, Cloudflare)</span>
                <span className="text-rose-400">
                  -£{Math.round(scenario.monthlyGrossRevenue * 0.06).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white/[0.01]">
                <span className="text-white/60">Senior Engineering Allocation (22%)</span>
                <span className="text-rose-400">
                  -£{Math.round(scenario.monthlyGrossRevenue * 0.22).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white/[0.03]">
                <span className="text-white font-light font-sans">Monthly Operating Profit (EBITDA)</span>
                <span className="text-emerald-400">
                  £{Math.round(scenario.monthlyGrossRevenue - scenario.estimatedDirectCosts).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
