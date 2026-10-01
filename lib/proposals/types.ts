export type ProposalStatus =
  | 'DRAFT'
  | 'SENT'
  | 'VIEWED'
  | 'ACCEPTED'
  | 'DEPOSIT_PENDING'
  | 'DEPOSIT_PAID'
  | 'EXPIRED'

export interface ScopeDeliverable {
  code: string
  title: string
  description: string
  timelineWeeks: number
  acceptanceCriteria: string[]
}

export interface Proposal {
  id: string
  token: string
  organisationId: string
  organisationName: string
  projectId?: string
  projectTitle: string
  version: string
  status: ProposalStatus
  totalInvestment: number
  depositAmount: number
  depositPercentage: number
  currency: 'GBP' | 'USD' | 'EUR'
  deliverables: ScopeDeliverable[]
  termsAndConditions: string
  validUntil: string
  createdAt: string
  viewedAt?: string
  acceptedAt?: string
  acceptedBy?: {
    name: string
    role: string
    email: string
    ipHash: string
    signatureAttestation: string
  }
  stripeSessionId?: string
}

export interface ProposalAcceptanceInput {
  token: string
  signerName: string
  signerRole: string
  signerEmail: string
  signatureAttestation: string
}
