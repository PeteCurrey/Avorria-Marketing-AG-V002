'use client'
import React, { useState } from 'react'

export const Stage05Environment = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    existingSystems: initialData.existingSystems || '',
    systemsToKeep: initialData.systemsToKeep || '',
    systemsToRetire: initialData.systemsToRetire || '',
    technicalFrustrations: initialData.technicalFrustrations || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">Current Environment</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">What does your current setup look like?</span>
          <span className="text-xs text-[var(--color-graphite-muted)] mb-1">Any websites, platforms, software, databases or tools currently in use.</span>
          <textarea required name="existingSystems" value={data.existingSystems} onChange={handleChange} rows={4} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Are there systems this project needs to connect to or integrate with? (optional)</span>
          <textarea name="systemsToKeep" value={data.systemsToKeep} onChange={handleChange} rows={3} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Is there anything you're hoping to move away from? (optional)</span>
          <textarea name="systemsToRetire" value={data.systemsToRetire} onChange={handleChange} rows={3} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">What are the biggest technical frustrations right now? (optional)</span>
          <textarea name="technicalFrustrations" value={data.technicalFrustrations} onChange={handleChange} rows={3} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
      </div>
      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        NEXT →
      </button>
    </form>
  )
}
