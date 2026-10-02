'use client'
import React, { useState } from 'react'

export const Stage08Context = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    additionalContext: initialData.additionalContext || '',
    decisionProcess: initialData.decisionProcess || '',
    referralSource: initialData.referralSource || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">Anything Else</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Is there anything else that would be useful for us to know? (optional)</span>
          <textarea name="additionalContext" value={data.additionalContext} onChange={handleChange} rows={6} placeholder="Constraints, preferences, things you've tried before, technical concerns, stakeholder requirements, or anything that doesn't fit elsewhere." className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Who else is involved in making this decision? (optional)</span>
          <input type="text" name="decisionProcess" value={data.decisionProcess} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">How did you hear about Avorria? (optional)</span>
          <input type="text" name="referralSource" value={data.referralSource} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
      </div>
      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        REVIEW BRIEF →
      </button>
    </form>
  )
}
