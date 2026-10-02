'use client'
import React, { useState } from 'react'

export const Stage01Business = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    contactName: initialData.contactName || '',
    contactEmail: initialData.contactEmail || '',
    contactRole: initialData.contactRole || '',
    companyName: initialData.companyName || '',
    companyWebsite: initialData.companyWebsite || '',
    businessDescription: initialData.businessDescription || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">You & Your Business</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Your name</span>
          <input required type="text" name="contactName" value={data.contactName} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Your email address</span>
          <input required type="email" name="contactEmail" value={data.contactEmail} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Your role (optional)</span>
          <input type="text" name="contactRole" value={data.contactRole} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Company or organisation name</span>
          <input required type="text" name="companyName" value={data.companyName} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-graphite-muted)]">Website, if you have one (optional)</span>
          <input type="url" name="companyWebsite" value={data.companyWebsite} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">What does your business do, and who are your customers?</span>
          <textarea required name="businessDescription" value={data.businessDescription} onChange={handleChange} rows={5} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
      </div>
      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        NEXT →
      </button>
    </form>
  )
}
