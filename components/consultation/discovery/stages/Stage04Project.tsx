'use client'
import React, { useState } from 'react'

export const Stage04Project = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    projectCategory: initialData.projectCategory || '',
    projectDescription: initialData.projectDescription || '',
    technicalRequirements: initialData.technicalRequirements || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  const handleCategoryClick = (category: string) => {
    setData({ ...data, projectCategory: category })
  }

  const categories = [
    'New website', 'Rebuild existing website', 'Web application',
    'AI system or automation', 'Digital platform', 'Internal tool or dashboard',
    'Something else', "I'm not sure yet"
  ]

  const showMore = data.projectCategory && data.projectCategory !== "I'm not sure yet"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">The Project</h2>
      <div className="flex flex-col gap-4">
        <span className="text-sm">What kind of project is this?</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map(category => (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`p-4 border rounded-[2px] cursor-pointer transition-colors ${data.projectCategory === category ? 'border-[var(--color-graphite)] bg-[#F8F7F5]' : 'border-[var(--color-border)] hover:bg-[#F8F7F5]'}`}
            >
              <span className="text-sm">{category}</span>
            </div>
          ))}
        </div>
        
        {showMore && (
          <>
            <label className="flex flex-col gap-1 mt-4">
              <span className="text-sm">Tell us more about what this project involves (optional)</span>
              <textarea name="projectDescription" value={data.projectDescription} onChange={handleChange} rows={4} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Are there any specific technical needs you're aware of? (optional)</span>
              <span className="text-xs text-[var(--color-graphite-muted)] mb-1">Note: 'not sure' is perfectly fine.</span>
              <textarea name="technicalRequirements" value={data.technicalRequirements} onChange={handleChange} rows={4} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
            </label>
          </>
        )}
      </div>
      <button type="submit" disabled={!data.projectCategory} className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors disabled:opacity-50">
        NEXT →
      </button>
    </form>
  )
}
