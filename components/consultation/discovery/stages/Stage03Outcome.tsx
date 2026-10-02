'use client'
import React, { useState } from 'react'

export const Stage03Outcome = ({ onNext, initialData = {} }: any) => {
  const [data, setData] = useState({
    successDefinition: initialData.successDefinition || '',
    goals: initialData.goals || [],
    otherGoal: initialData.otherGoal || ''
  })

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(data)
  }

  const handleChipClick = (goal: string) => {
    if (data.goals.includes(goal)) {
      setData({ ...data, goals: data.goals.filter((g: string) => g !== goal) })
    } else {
      setData({ ...data, goals: [...data.goals, goal] })
    }
  }

  const goalOptions = [
    'Better customer experience', 'Higher conversion / more enquiries',
    'Less internal friction', 'Faster operations', 'Competitive advantage',
    'New capability', 'Something else'
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">The Outcome</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">If this project worked exactly as you hoped, what would be different?</span>
          <textarea required name="successDefinition" value={data.successDefinition} onChange={handleChange} rows={6} className="border border-[var(--color-border)] p-3 rounded-[2px] resize-y" />
        </label>
        
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-sm">Goals (select all that apply)</span>
          <div className="flex flex-wrap gap-2">
            {goalOptions.map(goal => (
              <button type="button" key={goal} onClick={() => handleChipClick(goal)} className={`px-4 py-2 rounded-[2px] text-sm border transition-colors ${data.goals.includes(goal) ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]' : 'bg-white text-[var(--color-graphite)] border-[var(--color-border)] hover:bg-[#F8F7F5]'}`}>
                {goal}
              </button>
            ))}
          </div>
        </div>
        
        {data.goals.includes('Something else') && (
          <label className="flex flex-col gap-1 mt-2">
            <span className="text-sm">Please specify</span>
            <input type="text" name="otherGoal" value={data.otherGoal} onChange={handleChange} className="border border-[var(--color-border)] p-3 rounded-[2px]" />
          </label>
        )}
      </div>
      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        NEXT →
      </button>
    </form>
  )
}
