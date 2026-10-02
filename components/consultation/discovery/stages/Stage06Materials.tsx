'use client'
import React, { useState, useRef } from 'react'

export const Stage06Materials = ({ onNext, initialData = {}, sessionToken }: any) => {
  const [files, setFiles] = useState<any[]>(initialData.files || [])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true)
    else if (e.type === 'dragleave') setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = async (newFiles: File[]) => {
    for (const file of newFiles) {
      if (file.size > 25 * 1024 * 1024) {
        alert(`${file.name} exceeds 25MB limit.`)
        continue
      }
      
      const fileObj = { name: file.name, status: 'UPLOADING', id: Math.random().toString(36).substr(2, 9) }
      setFiles(prev => [...prev, fileObj])
      
      try {
        const res = await fetch('/api/discovery/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionToken,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type || 'application/octet-stream'
          })
        })
        
        if (!res.ok) throw new Error('Failed to get upload URL')
        const { signedUrl } = await res.json()
        
        const uploadRes = await fetch(signedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type || 'application/octet-stream' }
        })
        
        if (!uploadRes.ok) throw new Error('Upload failed')
        
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'UPLOADED ✓' } : f))
      } catch (err) {
        console.error(err)
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'FAILED' } : f))
      }
    }
  }

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext({ files })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-work-sans font-light">
      <h2 className="text-2xl text-[var(--color-graphite)] font-[300]">Your Materials</h2>
      
      <div 
        className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${isDragging ? 'border-[var(--color-graphite)] bg-[#F8F7F5]' : 'border-[var(--color-border)] hover:bg-[#F8F7F5]'}`}
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-sm">Drag and drop files here, or click to browse.</span>
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))} 
        />
      </div>
      
      <span className="text-xs text-[var(--color-graphite-muted)]">Project briefs · Brand guidelines · Screenshots · Wireframes · Spreadsheets · Technical documents · Presentations</span>
      
      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {files.map(f => (
            <div key={f.id} className="flex justify-between border border-[var(--color-border)] p-3 text-sm">
              <span>{f.name}</span>
              <div className="flex gap-4">
                <span className={f.status === 'FAILED' ? 'text-[var(--color-rose)]' : f.status === 'UPLOADING' ? 'animate-pulse' : ''}>{f.status}</span>
                <button type="button" onClick={() => removeFile(f.id)} className="text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)]">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="submit" className="self-start bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full mt-4 hover:bg-[#2A2926] transition-colors">
        NEXT →
      </button>
    </form>
  )
}
