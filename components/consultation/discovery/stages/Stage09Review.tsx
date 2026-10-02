'use client'
import React, { useState } from 'react'
import { ProjectBrief, CompletenessMatrix } from '@/types/discovery'
import { CompletenessDisplay } from '../shared/CompletenessDisplay'

interface Stage09ReviewProps {
  clientBrief: ProjectBrief | null
  completeness: CompletenessMatrix
  isGeneratingBrief: boolean
  onSubmit: () => void
  onSaveCorrection: (field: string, text: string) => void
}

export const Stage09Review: React.FC<Stage09ReviewProps> = ({ clientBrief, completeness, isGeneratingBrief, onSubmit, onSaveCorrection }) => {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleEditClick = (field: string, currentValue: string) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const handleSaveCorrection = () => {
    if (editingField) {
      onSaveCorrection(editingField, editValue)
      setEditingField(null)
    }
  }

  if (isGeneratingBrief || !clientBrief) {
    return (
      <div className="flex flex-col gap-6 font-work-sans font-light items-center justify-center min-h-[400px]">
        <div className="text-xl text-[var(--color-graphite)] font-[300] animate-pulse">PREPARING YOUR BRIEF...</div>
      </div>
    )
  }

  const renderSection = (label: string, field: string, content: string) => (
    <div className="flex flex-col gap-2 mb-8 relative group">
      <div className="flex justify-between items-center">
        <span className="text-[12px] uppercase tracking-widest text-[var(--color-graphite-muted)]">{label}</span>
        {editingField !== field && (
          <button onClick={() => handleEditClick(field, content)} className="text-[10px] text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            [Edit]
          </button>
        )}
      </div>
      
      {editingField === field ? (
        <div className="flex flex-col gap-2">
          <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={4} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y text-sm" />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditingField(null)} className="text-xs px-3 py-1 border border-[var(--color-border)] rounded-[2px] hover:bg-[#F8F7F5]">Cancel</button>
            <button onClick={handleSaveCorrection} className="text-xs px-3 py-1 bg-[var(--color-graphite)] text-white rounded-[2px] hover:bg-[#2A2926]">Save</button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[var(--color-graphite)] whitespace-pre-wrap leading-relaxed">{content}</p>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-10 font-work-sans font-light">
      <div>
        <h2 className="text-3xl text-[var(--color-graphite)] font-[200] mb-2">{clientBrief.title}</h2>
        <span className="text-xs text-[var(--color-graphite-muted)] uppercase tracking-wider bg-[#F8F7F5] px-2 py-1 rounded-[2px] border border-[var(--color-border)]">{clientBrief.status}</span>
      </div>

      <div className="border-t border-[var(--color-border)] pt-8">
        {renderSection('Business Summary', 'business_summary', clientBrief.business_summary.description)}
        {renderSection('Problem Statement', 'problem_statement', `${clientBrief.problem_statement.what_is_happening}\n\nNot working: ${clientBrief.problem_statement.what_is_not_working}`)}
        {renderSection('Objectives & Outcomes', 'objectives_and_outcomes', clientBrief.objectives_and_outcomes.success_definition)}
        {renderSection('Project Scope', 'project_scope', `${clientBrief.project_scope.category}\n\n${clientBrief.project_scope.indicated_needs.join(', ')}`)}
        {renderSection('Materials', 'materials_summary', `${clientBrief.materials_summary.file_count} files provided.`)}
        {renderSection('Commercial Parameters', 'commercial_parameters', `Timing: ${clientBrief.commercial_parameters.timing}\nBudget: ${clientBrief.commercial_parameters.budget_bracket}`)}
      </div>

      <div className="border-t border-[var(--color-border)] pt-8 pb-8">
        <h3 className="text-[12px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-4">COMPLETENESS REVIEW</h3>
        <CompletenessDisplay completeness={completeness} />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <button onClick={onSubmit} className="w-full md:w-auto bg-[var(--color-graphite)] text-white px-8 py-4 rounded-full hover:bg-[#2A2926] transition-colors">
          SUBMIT PROJECT BRIEF →
        </button>
        <p className="text-xs text-[var(--color-graphite-muted)] text-center md:text-left w-full md:w-auto">
          Your brief will be reviewed by a principal at Avorria.
        </p>
      </div>
    </div>
  )
}
