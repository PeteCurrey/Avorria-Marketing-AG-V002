'use server'

import { createHash } from 'node:crypto'
import { getProposalByToken, saveProposal } from '@/lib/proposals/tokens'
import { writeAuditEvent } from '@/lib/db/audit'
import { createDepositCheckoutSession } from '@/lib/finance/stripe'
import type { ProposalAcceptanceInput } from '@/lib/proposals/types'

export interface AcceptanceResult {
  success: boolean
  error?: string
  depositUrl?: string
  proposalStatus?: string
  reference?: string
}

export async function acceptProposalAction(
  input: ProposalAcceptanceInput,
  rawIp: string = '127.0.0.1'
): Promise<AcceptanceResult> {
  const proposal = await getProposalByToken(input.token)
  if (!proposal) {
    return { success: false, error: 'Proposal token is invalid or expired.' }
  }

  if (proposal.status === 'ACCEPTED' || proposal.status === 'DEPOSIT_PAID') {
    return { success: false, error: 'Proposal has already been accepted.' }
  }

  const ipHash = createHash('sha256').update(rawIp).digest('hex')

  proposal.status = 'ACCEPTED'
  proposal.acceptedAt = new Date().toISOString()
  proposal.acceptedBy = {
    name: input.signerName,
    role: input.signerRole,
    email: input.signerEmail,
    ipHash,
    signatureAttestation: input.signatureAttestation,
  }

  // Create Stripe deposit payment session for the 50% commitment fee
  const depositSession = await createDepositCheckoutSession({
    proposalId: proposal.id,
    organisationName: proposal.organisationName,
    projectTitle: proposal.projectTitle,
    depositAmount: proposal.depositAmount,
    currency: proposal.currency,
    clientEmail: input.signerEmail,
  })

  if (depositSession.success && depositSession.checkoutUrl) {
    proposal.status = 'DEPOSIT_PENDING'
    proposal.stripeSessionId = depositSession.sessionId
  }

  await saveProposal(proposal)

  // Audit event
  await writeAuditEvent({
    action: 'PROPOSAL_DIGITALLY_ACCEPTED',
    resourceType: 'proposal',
    resourceId: proposal.id,
    organisationId: proposal.organisationId,
    metadata: {
      signerName: input.signerName,
      signerRole: input.signerRole,
      signerEmail: input.signerEmail,
      depositAmount: proposal.depositAmount,
      currency: proposal.currency,
      stripeSessionId: depositSession.sessionId,
    },
    ipAddress: ipHash,
  }).catch(() => {})

  return {
    success: true,
    proposalStatus: proposal.status,
    depositUrl: depositSession.checkoutUrl,
    reference: `ACCEPT-${proposal.id.toUpperCase()}`,
  }
}
