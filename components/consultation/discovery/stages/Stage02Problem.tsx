'use client'
import React, { useState } from 'react'

export const Stage02Problem = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    problemStatement: initialData.problemStatement || '',
    problemImpact: initialData.problemImpact || '',
    whyNow: initialData.whyNow || '',
    problemAreas: initialData.problemAreas || []
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  const handlePillClick = (pill: string) => {
    if (!data.problemAreas.includes(pill)) {
      setData({ ...data, problemAreas: [...data.problemAreas, pill] })
    } else {
      setData({ ...data, problemAreas: data.problemAreas.filter((p: string) => p !== pill) })
    }
  }

  const showHints = data.problemStatement.length > 50

  const hints = [
    'How it looks', 'How customers use it', 'How your team manages it',
    'How it performs', 'How it generates enquiries', 'Something else'
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">The Problem</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">What are you trying to change?</span>
          <textarea required name="problemStatement" value={data.problemStatement} onChange={handleChange} rows={6} placeholder="Describe the situation in your own words. What's not working, what feels wrong, or what opportunity are you trying to capture?" className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        
        {showHints && (
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs text-[var(--color-graphite-muted)] uppercase tracking-wider">What feels most important to improve?</span>
            <div className="flex flex-wrap gap-2">
              {hints.map(hint => (
                <button type="button" key={hint} onClick={() => handlePillClick(hint)} className={`px-3 py-1 rounded-full text-sm border transition-colors ${data.problemAreas.includes(hint) ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]' : 'bg-[#F8F7F5] text-[var(--color-graphite)] border-[var(--color-border)] hover:bg-white'}`}>
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col gap-1 mt-4">
          <span className="text-sm text-[var(--color-graphite-muted)]">What is this costing you? (optional)</span>
          <textarea name="problemImpact" value={data.problemImpact} onChange={handleChange} rows={3} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Why now? What's changed? (optional)</span>
          <input type="text" name="whyNow" value={data.whyNow} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
      </div>
      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        NEXT →
      </button>
    </form>
  )
}
