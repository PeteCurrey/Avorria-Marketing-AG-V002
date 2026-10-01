'use client'

import { useState, useTransition } from 'react'
import { submitAuditLeadAction } from '@/lib/actions/audit'

interface DiscussFindingsModalProps {
  auditId: string
  domain: string
}

export function DiscussFindingsModal({ auditId, domain }: DiscussFindingsModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [questions, setQuestions] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const res = await submitAuditLeadAction({
        auditId,
        name,
        email,
        company,
        questions,
      })

      if (res.success) {
        setStatus('success')
        setResponseMsg(res.message || 'Consultation request logged successfully.')
      } else {
        setStatus('error')
        setResponseMsg(res.error || 'Failed to submit request.')
      }
    })
  }

  return (
    <div className="w-full">
      {/* Trigger Block */}
      <div className="border border-white/10 bg-[#0e0e0e] p-8 md:p-12 relative print:hidden">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-4">
            [ NEXT INTERVENTION // CONSULTATION ]
          </p>
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
            Discuss These Findings with an Avorria Principal.
          </h3>
          <p className="text-sm font-light text-white/60 leading-relaxed mb-8">
            Automated diagnostics detect symptoms; engineering strategy solves root causes. Schedule a confidential 30-minute architectural review to walk through remediation priorities for {domain}.
          </p>

          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors"
            >
              Request Architecture Consultation
            </button>
          )}
        </div>

        {isOpen && (
          <div className="mt-8 pt-8 border-t border-white/10">
            {status === 'success' ? (
              <div className="border border-emerald-500/20 bg-emerald-950/20 p-6 text-sm font-light text-emerald-300">
                <p className="uppercase tracking-[0.15em] text-xs text-emerald-400 font-light mb-2">Request Confirmed</p>
                <p>{responseMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                {status === 'error' && (
                  <div className="border border-red-500/20 bg-red-950/20 p-4 text-xs font-light text-red-300">
                    {responseMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Holdings"
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-light mb-2">
                    Key Areas of Concern / Timeline
                  </label>
                  <textarea
                    rows={3}
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="Specific questions about this report, migration plans, or ongoing retainer teardown..."
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-light hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {isPending ? 'Logging Request...' : 'Confirm Review Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-white/50 font-light hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
