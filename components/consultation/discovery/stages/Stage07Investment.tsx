'use client'
import React, { useState } from 'react'

export const Stage07Investment = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    timeline: initialData.timeline || '',
    urgency: initialData.urgency || '',
    budgetRange: initialData.budgetRange || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })
  const handleTimelineClick = (t: string) => setData({ ...data, timeline: t })
  const handleBudgetClick = (b: string) => setData({ ...data, budgetRange: b })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  const timelines = ['As soon as possible', 'Within 1–3 months', '3–6 months', 'Over 6 months', 'No fixed deadline', "I'm not sure"]
  const budgets = ['Under £10,000', '£10,000 – £25,000', '£25,000 – £50,000', '£50,000 – £100,000', 'Over £100,000', "I'd rather discuss this", 'Not sure']

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">Time & Investment</h2>
      
      <div className="flex flex-col gap-4">
        <span className="text-sm">When do you need this completed?</span>
        <div className="flex flex-col gap-2">
          {timelines.map(t => (
            <label key={t} className="flex items-center gap-3 cursor-pointer p-3 border border-[var(--color-border)] rounded-[2px] transition-colors hover:bg-[#F8F7F5]">
              <input type="radio" name="timeline" checked={data.timeline === t} onChange={() => handleTimelineClick(t)} className="accent-[var(--color-graphite)]" />
              <span className="text-sm">{t}</span>
            </label>
          ))}
        </div>

        <label className="flex flex-col gap-1 mt-4">
          <span className="text-sm text-[var(--color-graphite-muted)]">Is there a hard deadline or event driving this? (optional)</span>
          <input type="text" name="urgency" value={data.urgency} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>

        <span className="text-sm mt-6">What is the approximate budget for this project?</span>
        <div className="flex flex-col gap-2">
          {budgets.map(b => (
            <label key={b} className="flex items-center gap-3 cursor-pointer p-3 border border-[var(--color-border)] rounded-[2px] transition-colors hover:bg-[#F8F7F5]">
              <input type="radio" name="budgetRange" checked={data.budgetRange === b} onChange={() => handleBudgetClick(b)} className="accent-[var(--color-graphite)]" />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={!data.timeline || !data.budgetRange} className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors disabled:opacity-50">
        NEXT →
      </button>
    </form>
  )
}
