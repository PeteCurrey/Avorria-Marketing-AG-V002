'use client'

import React, { useState } from 'react'
import type { ProjectBrief, CompletenessMatrix } from '@/types/discovery'

interface ReviewSection {
  id: string
  label: string
  content: string
}

interface Scene09ReviewProps {
  /** Accumulated answers across all stages */
  answers: Record<string, any>
  /** AI-generated brief, if available */
  clientBrief?: ProjectBrief | null
  completeness?: CompletenessMatrix | null
  isGeneratingBrief?: boolean
  onSubmit: () => void
  onBack: () => void
  onSaveCorrection: (field: string, text: string) => void
}

// Derive review sections from raw answers or AI brief
function buildSections(
  answers: Record<string, any>,
  brief: ProjectBrief | null | undefined
): ReviewSection[] {
  if (brief) {
    return [
      {
        id: 'business_summary',
        label: 'BUSINESS',
        content: brief.business_summary?.description || answers.businessDescription || '',
      },
      {
        id: 'problem_statement',
        label: 'PROBLEM',
        content: [brief.problem_statement?.what_is_happening, brief.problem_statement?.what_is_not_working]
          .filter(Boolean)
          .join('\n\n') || answers.problemStatement || '',
      },
      {
        id: 'objectives',
        label: 'DESIRED OUTCOME',
        content: brief.objectives_and_outcomes?.success_definition || answers.desiredOutcome || '',
      },
      {
        id: 'project_scope',
        label: 'PROJECT TYPE',
        content: [
          brief.project_scope?.category || answers.projectCategory,
          brief.project_scope?.indicated_needs?.join(', '),
        ]
          .filter(Boolean)
          .join('\n')
          .trim(),
      },
      {
        id: 'environment',
        label: 'EXISTING ENVIRONMENT',
        content: answers.existingSystems || '',
      },
      {
        id: 'materials',
        label: 'MATERIALS',
        content:
          answers.fileCount > 0
            ? `${answers.fileCount} file${answers.fileCount !== 1 ? 's' : ''} provided${answers.additionalContext ? '\n\n' + answers.additionalContext : ''}`
            : answers.additionalContext || 'No files submitted.',
      },
      {
        id: 'commercial_parameters',
        label: 'TIMING &amp; INVESTMENT',
        content: [
          answers.timeline ? `Timeline: ${answers.timeline}` : '',
          answers.budget ? `Budget: ${answers.budget}` : '',
          answers.budgetFlexibility ? `Note: ${answers.budgetFlexibility}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      },
      {
        id: 'open_context',
        label: 'ADDITIONAL CONTEXT',
        content: answers.openContext || '',
      },
    ].filter((s) => s.content.trim())
  }

  // Fallback: raw answers
  const sections: ReviewSection[] = []
  if (answers.companyName || answers.businessDescription) {
    sections.push({
      id: 'business',
      label: 'BUSINESS',
      content: [answers.companyName, answers.businessDescription].filter(Boolean).join('\n'),
    })
  }
  if (answers.problemStatement) {
    sections.push({ id: 'problem', label: 'PROBLEM', content: answers.problemStatement })
  }
  if (answers.desiredOutcome) {
    sections.push({ id: 'outcome', label: 'DESIRED OUTCOME', content: answers.desiredOutcome })
  }
  if (answers.projectCategory) {
    sections.push({ id: 'project', label: 'PROJECT TYPE', content: answers.projectCategory })
  }
  if (answers.existingSystems) {
    sections.push({ id: 'environment', label: 'ENVIRONMENT', content: answers.existingSystems })
  }
  if (answers.timeline || answers.budget) {
    sections.push({
      id: 'investment',
      label: 'TIMING &amp; INVESTMENT',
      content: [
        answers.timeline ? `Timeline: ${answers.timeline}` : '',
        answers.budget ? `Budget: ${answers.budget}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })
  }
  if (answers.openContext) {
    sections.push({ id: 'context', label: 'ADDITIONAL CONTEXT', content: answers.openContext })
  }
  return sections
}

export const Scene09Review: React.FC<Scene09ReviewProps> = ({
  answers,
  clientBrief,
  completeness,
  isGeneratingBrief,
  onSubmit,
  onBack,
  onSaveCorrection,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const sections = buildSections(answers, clientBrief)

  const handleEdit = (id: string, current: string) => {
    setEditingField(id)
    setEditValue(current)
  }

  const handleSave = () => {
    if (!editingField) return
    onSaveCorrection(editingField, editValue)
    setEditingField(null)
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await onSubmit()
    } catch {
      setSubmitError('Submission failed. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isGeneratingBrief) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 font-work-sans font-light">
          <div className="w-12 h-[1px] bg-[var(--color-border-strong)]" />
          <p className="text-xl md:text-2xl text-[var(--color-graphite)] font-[200] tracking-[0.08em] uppercase animate-pulse">
            ASSEMBLING YOUR BRIEF
          </p>
          <p className="text-xs uppercase tracking-widest text-[var(--color-graphite-muted)]">
            AI SYNTHESIS IN PROGRESS
          </p>
          <div className="w-12 h-[1px] bg-[var(--color-border-strong)]" />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-20">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Stage Label (2 Columns) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col justify-start pt-2">
          <div className="sticky top-24 flex flex-col gap-4 items-start">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 09 / 09
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-work-sans font-light leading-relaxed">
              PROJECT<br />DOSSIER
            </span>
          </div>
        </div>

        {/* Centre: The Editorial Dossier (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-0">
          <div className="mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
              HERE'S WHAT<br />
              WE UNDERSTAND.
            </h2>
            <p className="font-work-sans font-light text-base text-[var(--color-graphite-mid)] max-w-lg">
              Review your brief. Edit any section before submitting — nothing is locked until you confirm.
            </p>
          </div>

          {/* Dossier Header Bar */}
          <div className="flex items-center justify-between border-t border-b border-[var(--color-border)] py-3 mb-0">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-work-sans">
              PROJECT DISCOVERY BRIEF
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-work-sans">
              {answers.companyName || 'COMPANY TBC'} · {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
            </span>
          </div>

          {/* Section Rows */}
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {sections.map((section) => (
              <div key={section.id} className="group py-7 relative">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-work-sans font-light"
                    dangerouslySetInnerHTML={{ __html: section.label }}
                  />
                  {editingField !== section.id && section.content && (
                    <button
                      onClick={() => handleEdit(section.id, section.content)}
                      className="text-[9px] uppercase tracking-widest text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] opacity-0 group-hover:opacity-100 transition-opacity font-work-sans"
                    >
                      [EDIT]
                    </button>
                  )}
                </div>

                {editingField === section.id ? (
                  <div className="flex flex-col gap-3">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={5}
                      className="w-full bg-[#FAFAFA] border border-[var(--color-graphite)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] outline-none resize-y font-work-sans font-light"
                    />
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setEditingField(null)}
                        className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSave}
                        className="text-xs uppercase tracking-wider bg-[var(--color-graphite)] text-white px-5 py-2 hover:bg-[var(--color-rose-text)] transition-colors"
                      >
                        SAVE CORRECTION
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-base text-[var(--color-graphite)] whitespace-pre-wrap leading-relaxed font-work-sans font-light">
                    {section.content || (
                      <span className="text-[var(--color-graphite-muted)] italic text-sm">Not provided</span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Completeness Indicator */}
          {completeness && (
            <div className="border-t border-[var(--color-border)] pt-7 pb-4">
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-4 font-work-sans">
                BRIEF COMPLETENESS
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(completeness)
                  .filter(([key]) => key !== 'overall_score')
                  .map(([field, status]) => (
                    <span
                      key={field}
                      className={`text-[9px] uppercase tracking-wider px-3 py-1.5 border font-work-sans font-light ${
                        status === 'UNDERSTOOD'
                          ? 'border-[var(--color-graphite)] text-[var(--color-graphite)] bg-white'
                          : status === 'PARTIALLY_UNDERSTOOD'
                          ? 'border-[var(--color-graphite-mid)] text-[var(--color-graphite-mid)] bg-[#FAFAFA]'
                          : 'border-[var(--color-border)] text-[var(--color-graphite-muted)] bg-[#F5F5F3]'
                      }`}
                    >
                      {field.replace(/_/g, ' ')}
                      {status === 'UNDERSTOOD' ? ' ✓' : status === 'PARTIALLY_UNDERSTOOD' ? ' ~' : ' ?'}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Submission Row */}
          <div className="border-t border-[var(--color-border)] pt-8 mt-4 flex flex-col gap-4 items-start">
            {submitError && (
              <div className="w-full border border-[var(--color-rose-text)] bg-[#FDF2F0] px-5 py-4 rounded-[2px] font-work-sans font-light">
                <p className="text-sm text-[var(--color-rose-text)]">{submitError}</p>
              </div>
            )}

            <div className="flex items-center gap-6 flex-wrap">
              <button
                type="button"
                onClick={onBack}
                className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[var(--color-graphite)] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT PROJECT BRIEF →'}
              </button>
            </div>
            <p className="text-xs text-[var(--color-graphite-muted)] font-work-sans font-light">
              Your brief is reviewed by a principal at Avorria. We respond within one business day.
            </p>
          </div>
        </div>

        {/* Right Column (3 Columns) — subtle editorial note */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-start pt-2">
          <div className="sticky top-24 border border-[var(--color-border)] p-6 bg-[#FAFAFA] font-work-sans font-light">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-3">WHAT HAPPENS NEXT</p>
            <ol className="flex flex-col gap-4">
              {[
                { n: '01', text: 'Your brief is delivered to a principal strategist' },
                { n: '02', text: 'We analyse your context within one business day' },
                { n: '03', text: 'You receive a considered, specific response' },
                { n: '04', text: 'If appropriate, we arrange a working session' },
              ].map((item) => (
                <li key={item.n} className="flex items-start gap-3">
                  <span className="text-[10px] text-[var(--color-graphite-muted)] mt-0.5 flex-shrink-0">{item.n}</span>
                  <span className="text-xs text-[var(--color-graphite)] leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
