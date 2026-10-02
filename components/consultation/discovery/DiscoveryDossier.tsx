'use client'

import React, { useState } from 'react'
import { CompletenessMatrix, UnderstandingLevel } from '@/types/discovery'

interface DiscoveryDossierProps {
  completeness: CompletenessMatrix
  answers: Record<string, Record<string, any>>
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  isMobileCollapsed?: boolean
  onToggleMobile?: () => void
}

export const DiscoveryDossier: React.FC<DiscoveryDossierProps> = ({ completeness, answers, saveStatus, isMobileCollapsed = true, onToggleMobile }) => {
  const [collapsed, setCollapsed] = useState(isMobileCollapsed)

  const toggle = () => {
    setCollapsed(!collapsed)
    if (onToggleMobile) onToggleMobile()
  }

  // Extract common fields
  const companyName = answers['stage-01']?.companyName || '—'
  const successDefinition = answers['stage-03']?.successDefinition || '—'
  const problemStatement = answers['stage-02']?.problemStatement || '—'
  const projectCategory = answers['stage-04']?.projectCategory || '—'
  const timeline = answers['stage-07']?.timeline || '—'
  const budgetRange = answers['stage-07']?.budgetRange || '—'
  
  // Materials count (we don't have file count natively in answers, maybe in stage-06)
  const filesCount = answers['stage-06']?.files?.length || 0

  const getStatusIcon = (level: UnderstandingLevel) => {
    if (level === 'UNDERSTOOD') return '✓'
    if (level === 'PARTIALLY_UNDERSTOOD') return '◑'
    return '—'
  }

  return (
    <div className="font-work-sans font-light text-sm text-[var(--color-graphite)] bg-white border border-[var(--color-border)] rounded md:rounded-none md:border-l md:border-y-0 md:border-r-0 h-full p-6 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center cursor-pointer md:cursor-default" onClick={() => window.innerWidth < 768 && toggle()}>
        <span className="uppercase tracking-widest text-[11px] font-work-sans text-[var(--color-graphite-muted)]">PROJECT DOSSIER</span>
        <span className="md:hidden">{collapsed ? '+' : '-'}</span>
      </div>

      <div className={`flex-col gap-6 ${collapsed ? 'hidden md:flex' : 'flex'}`}>
        <div>
          <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">STATUS</span>
          <span className="text-[var(--color-graphite)] bg-[#F8F7F5] px-2 py-1 rounded text-xs border border-[var(--color-border)]">DISCOVERY IN PROGRESS</span>
        </div>

        <hr className="border-[var(--color-border)] border-t" />

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">BUSINESS</span>
            <div className="line-clamp-2">{companyName}</div>
          </div>
          <div>
            <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">OBJECTIVE</span>
            <div className="line-clamp-3">{successDefinition}</div>
          </div>
          <div>
            <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">CURRENT CHALLENGE</span>
            <div className="line-clamp-3">{problemStatement}</div>
          </div>
          <div>
            <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">PROJECT TYPE</span>
            <div>{projectCategory}</div>
          </div>
          <div>
            <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">MATERIALS</span>
            <div>{filesCount} files received</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">TIMING</span>
              <div>{timeline}</div>
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-1">BUDGET</span>
              <div>{budgetRange}</div>
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-border)] border-t" />

        <div>
          <span className="text-[10px] text-[var(--color-graphite-muted)] uppercase tracking-wider block mb-3">UNDERSTANDING</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Business</span>
              <span>{getStatusIcon(completeness.business)}</span>
            </div>
            <div className="flex justify-between">
              <span>Problem</span>
              <span>{getStatusIcon(completeness.problem)}</span>
            </div>
            <div className="flex justify-between">
              <span>Objective</span>
              <span>{getStatusIcon(completeness.objective)}</span>
            </div>
            <div className="flex justify-between">
              <span>Audience</span>
              <span>{getStatusIcon(completeness.audience)}</span>
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-border)] border-t" />

        <div className="text-[11px] uppercase tracking-wider text-[var(--color-graphite-muted)]">
          {saveStatus === 'saving' && 'SAVING...'}
          {saveStatus === 'saved' && 'DRAFT SAVED'}
          {saveStatus === 'idle' && 'DRAFT SAVED'}
          {saveStatus === 'error' && <span className="text-[var(--color-rose)]">ERROR SAVING</span>}
        </div>
      </div>
    </div>
  )
}
