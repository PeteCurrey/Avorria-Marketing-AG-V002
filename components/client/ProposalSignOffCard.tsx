'use client'

import { useState, useTransition } from 'react'
import { acceptProposalAction } from '@/lib/proposals/acceptance'
import type { Proposal } from '@/lib/proposals/types'

interface ProposalSignOffCardProps {
  proposal: Proposal
}

export function ProposalSignOffCard({ proposal }: ProposalSignOffCardProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [attestation, setAttestation] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(proposal.status === 'ACCEPTED' || proposal.status === 'DEPOSIT_PAID')

  function handleSign(e: React.FormEvent) {
    e.preventDefault()
    if (!attestation) {
      setErrorMsg('You must attest to the scope terms.')
      return
    }

    startTransition(async () => {
      const res = await acceptProposalAction({
        token: proposal.token,
        signerName: name,
        signerRole: role,
        signerEmail: email,
        signatureAttestation: `Digitally signed by ${name} (${role}) on behalf of ${proposal.organisationName}`,
      })

      if (res.success) {
        setAccepted(true)
        if (res.depositUrl) {
          window.location.href = res.depositUrl
        }
      } else {
        setErrorMsg(res.error || 'Failed to record acceptance.')
      }
    })
  }

  if (accepted) {
    return (
      <div className="border border-emerald-500/30 bg-emerald-50/50 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800">
            PROPOSAL ACCEPTED & EXECUTED
          </span>
        </div>
        <p className="text-sm font-light text-neutral-800">
          This proposal has been digitally executed. The 50% commitment deposit has been scheduled for engineering capacity allocation.
        </p>
        {proposal.acceptedBy && (
          <p className="text-xs font-mono text-neutral-500">
            EXECUTED BY: {proposal.acceptedBy.name} ({proposal.acceptedBy.role}) // IP_HASH: {proposal.acceptedBy.ipHash.slice(0, 12)}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="border border-neutral-200 bg-neutral-50/60 p-6 md:p-8 space-y-6">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          DIGITAL ACCEPTANCE & MANDATE
        </span>
        <h4 className="text-lg font-light text-neutral-900">
          Execute Statement of Work ({proposal.version})
        </h4>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Digital execution registers a binding sprint commitment and initiates the 50% deposit checkout link (£{proposal.depositAmount.toLocaleString()}).
        </p>
      </div>

      {errorMsg && (
        <div className="border border-red-500/20 bg-red-50 p-3 text-xs text-red-600">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSign} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
              Authorized Signatory Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alistair Vance"
              className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs font-light text-neutral-900 focus:outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
              Signatory Role / Title *
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Managing Director"
              className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs font-light text-neutral-900 focus:outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
            Corporate Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="a.vance@company.com"
            className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs font-light text-neutral-900 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <label className="flex items-start gap-3 pt-2 cursor-pointer text-xs font-light text-neutral-700">
          <input
            type="checkbox"
            checked={attestation}
            onChange={(e) => setAttestation(e.target.checked)}
            className="mt-0.5"
            required
          />
          <span>
            I attest that I have the executive authority to execute this Statement of Work for {proposal.organisationName} and approve the 50% commitment deposit schedule.
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending || !attestation}
          className="w-full py-3 bg-neutral-900 text-white text-xs font-mono uppercase tracking-[0.2em] font-light hover:bg-neutral-800 transition-colors disabled:opacity-40"
        >
          {isPending ? 'Executing Digital Signature...' : 'Accept Proposal & Proceed to Deposit'}
        </button>
      </form>
    </div>
  )
}
