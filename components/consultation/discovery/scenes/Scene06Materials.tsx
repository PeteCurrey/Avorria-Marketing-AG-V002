'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  previewUrl?: string
  storagePath?: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

interface Scene06MaterialsProps {
  initialData?: Record<string, any>
  sessionToken?: string
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
]

const ALLOWED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png,.gif,.webp,.docx,.pptx,.zip'
const MAX_FILE_SIZE_MB = 25
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export const Scene06Materials: React.FC<Scene06MaterialsProps> = ({
  initialData = {},
  sessionToken,
  onNext,
  onBack,
  onSkip,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [notes, setNotes] = useState(initialData.additionalContext || '')
  const [errorBanner, setErrorBanner] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: File type not accepted. Use PDF, images, DOCX, PPTX, or ZIP.`
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `${file.name}: Exceeds ${MAX_FILE_SIZE_MB}MB limit.`
    }
    return null
  }

  const uploadFile = useCallback(
    async (uf: UploadedFile, rawFile: File) => {
      if (!sessionToken) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, status: 'error', error: 'No session — save progress first' } : f
          )
        )
        return
      }

      setFiles((prev) => prev.map((f) => (f.id === uf.id ? { ...f, status: 'uploading' } : f)))

      try {
        const res = await fetch('/api/discovery/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionToken,
            fileName: rawFile.name,
            fileSize: rawFile.size,
            mimeType: rawFile.type,
          }),
        })

        if (!res.ok) {
          const json = await res.json().catch(() => ({ error: 'Upload request failed' }))
          throw new Error(json.error || 'Upload request failed')
        }

        const { signedUrl, storagePath } = await res.json()

        const uploadRes = await fetch(signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': rawFile.type },
          body: rawFile,
        })

        if (!uploadRes.ok) throw new Error('Upload to storage failed')

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, status: 'done', storagePath } : f
          )
        )
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed'
        setFiles((prev) =>
          prev.map((f) => (f.id === uf.id ? { ...f, status: 'error', error: message } : f))
        )
      }
    },
    [sessionToken]
  )

  const processFiles = useCallback(
    (rawFiles: FileList | null) => {
      if (!rawFiles) return
      setErrorBanner(null)
      const incoming: { uf: UploadedFile; raw: File }[] = []
      const errors: string[] = []

      Array.from(rawFiles).forEach((raw) => {
        const err = validateFile(raw)
        if (err) {
          errors.push(err)
          return
        }
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
        const previewUrl = raw.type.startsWith('image/') ? URL.createObjectURL(raw) : undefined
        const uf: UploadedFile = {
          id,
          name: raw.name,
          size: raw.size,
          type: raw.type,
          previewUrl,
          status: 'pending',
        }
        incoming.push({ uf, raw })
      })

      if (errors.length > 0) setErrorBanner(errors.join('\n'))
      if (incoming.length === 0) return

      setFiles((prev) => [...prev, ...incoming.map((i) => i.uf)])
      incoming.forEach(({ uf, raw }) => uploadFile(uf, raw))
    },
    [uploadFile]
  )

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl)
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const doneFiles = files.filter((f) => f.status === 'done')
    onNext({
      uploadedFiles: doneFiles.map((f) => ({ storagePath: f.storagePath, name: f.name, size: f.size })),
      additionalContext: notes,
      fileCount: doneFiles.length,
    })
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column — Upload Area (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 06 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              SUPPORTING MATERIALS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHAT CAN<br />
            YOU SHOW US?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            References, briefs, brand guidelines, existing assets — anything that gives us a richer picture. Nothing is mandatory. More context is always useful.
          </p>

          {errorBanner && (
            <div className="w-full max-w-2xl mb-4 border border-[var(--color-rose-text)] bg-[#FDF2F0] px-5 py-4 rounded-[2px] font-work-sans font-light">
              <p className="text-sm text-[var(--color-rose-text)] whitespace-pre-line">{errorBanner}</p>
              <button
                type="button"
                onClick={() => setErrorBanner(null)}
                className="mt-1 text-xs uppercase tracking-wider text-[var(--color-rose-text)] hover:underline"
              >
                DISMISS
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 font-work-sans font-light">
            {/* Editorial File Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full max-w-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isDragOver
                  ? 'border-[var(--color-graphite)] bg-white'
                  : 'border-[var(--color-border)] bg-[#FAFAFA] hover:border-[var(--color-graphite-mid)] hover:bg-white'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_EXTENSIONS}
                className="sr-only"
                onChange={(e) => processFiles(e.target.files)}
                aria-label="Upload project materials"
              />

              <div className="flex flex-col items-center justify-center p-12 text-center min-h-[180px]">
                {/* Archive icon — no emoji */}
                <div className="mb-4 w-12 h-12 border border-[var(--color-border)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--color-graphite-muted)]">
                    <rect x="2" y="5" width="16" height="12" rx="0" stroke="currentColor" strokeWidth="1"/>
                    <path d="M2 8h16" stroke="currentColor" strokeWidth="1"/>
                    <path d="M7.5 11.5h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    <path d="M4 3h12" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-sm uppercase tracking-widest text-[var(--color-graphite-mid)] mb-1">
                  {isDragOver ? 'RELEASE TO ADD TO PROJECT BOARD' : 'DROP FILES HERE'}
                </p>
                <p className="text-xs text-[var(--color-graphite-muted)]">or click to browse</p>
                <p className="text-[10px] text-[var(--color-graphite-muted)] mt-3 uppercase tracking-wider">
                  PDF · Images · DOCX · PPTX · ZIP &nbsp;·&nbsp; Max {MAX_FILE_SIZE_MB}MB each
                </p>
              </div>
            </div>

            {/* Editorial Project Board — Files */}
            {files.length > 0 && (
              <div className="w-full max-w-2xl">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-3 font-work-sans">
                  PROJECT BOARD — {files.length} FILE{files.length !== 1 ? 'S' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={`border relative overflow-hidden group transition-colors duration-200 ${
                        file.status === 'error'
                          ? 'border-[var(--color-rose-text)] bg-[#FDF2F0]'
                          : file.status === 'done'
                          ? 'border-[var(--color-border)] bg-white'
                          : 'border-[var(--color-border)] bg-[#FAFAFA]'
                      }`}
                    >
                      {/* Image Preview or Abstract Icon */}
                      {file.previewUrl ? (
                        <div className="h-24 relative overflow-hidden bg-[#F5F5F5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={file.previewUrl}
                            alt={file.name}
                            className="w-full h-full object-cover filter grayscale"
                          />
                          {file.status === 'done' && (
                            <div className="absolute top-2 right-2 bg-white px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-[var(--color-graphite)] border border-[var(--color-border)]">
                              LOGGED
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-16 flex items-center justify-center bg-[#F8F7F5] border-b border-[var(--color-border)]">
                          <span className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)]">
                            {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                          </span>
                        </div>
                      )}

                      <div className="p-3">
                        <p className="text-[11px] text-[var(--color-graphite)] truncate mb-1" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-[10px] text-[var(--color-graphite-muted)] mb-2">
                          {formatBytes(file.size)}
                        </p>

                        {file.status === 'uploading' && (
                          <div className="text-[9px] uppercase tracking-widest text-[var(--color-graphite-muted)] animate-pulse">
                            UPLOADING...
                          </div>
                        )}
                        {file.status === 'done' && (
                          <div className="text-[9px] uppercase tracking-widest text-[var(--color-graphite)]">
                            ✓ RECEIVED
                          </div>
                        )}
                        {file.status === 'error' && (
                          <div className="text-[9px] uppercase tracking-widest text-[var(--color-rose-text)]" title={file.error}>
                            ! {file.error?.slice(0, 30) || 'FAILED'}
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id) }}
                        aria-label={`Remove ${file.name}`}
                        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-white border border-[var(--color-border)] text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {files.some((f) => f.status === 'done') && (
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mt-3">
                    ● AI EXTRACTION WILL BEGIN AFTER SUBMISSION
                  </p>
                )}
              </div>
            )}

            {/* Notes Field */}
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <label htmlFor="notes" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Anything Else You Want To Share (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Links to references, context that doesn't fit elsewhere, any important nuance..."
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] max-w-2xl">
              <button
                type="button"
                onClick={onBack}
                className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors py-2"
              >
                ← BACK
              </button>
              <div className="flex items-center gap-4">
                {onSkip && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors py-2"
                  >
                    SKIP FOR NOW
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Reference Visual (4 Columns) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="relative w-full h-[460px] border border-[var(--color-border)] overflow-hidden bg-[#FAFAFA]">
            <Image
              src="/images/projects/alkota-bikes/hero.webp"
              alt="Project materials context"
              fill
              sizes="25vw"
              className="object-cover filter grayscale opacity-50"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="bg-white/95 border border-[var(--color-border)] p-4">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-2">
                  AI EXTRACTION BADGE
                </p>
                <p className="text-xs text-[var(--color-graphite)] font-work-sans font-light leading-relaxed">
                  Uploaded documents are analysed for brand guidelines, technical specs, content inventory, and strategic context — extracted automatically after submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
