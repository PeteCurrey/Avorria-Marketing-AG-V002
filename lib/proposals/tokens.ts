import 'server-only'
import { randomBytes } from 'node:crypto'
import type { Proposal } from '@/lib/proposals/types'

// Active proposal registry
const proposalTokenMap = new Map<string, Proposal>()
const proposalIdMap = new Map<string, Proposal>()

export function generateProposalToken(): string {
  return randomBytes(24).toString('hex')
}

export async function saveProposal(proposal: Proposal): Promise<void> {
  proposalTokenMap.set(proposal.token, proposal)
  proposalIdMap.set(proposal.id, proposal)
}

export async function getProposalByToken(token: string): Promise<Proposal | null> {
  const proposal = proposalTokenMap.get(token)
  if (!proposal) return null

  // Check expiry
  if (new Date(proposal.validUntil) < new Date() && proposal.status !== 'ACCEPTED' && proposal.status !== 'DEPOSIT_PAID') {
    proposal.status = 'EXPIRED'
  }

  return proposal
}

export async function getProposalById(id: string): Promise<Proposal | null> {
  return proposalIdMap.get(id) || null
}

export async function listAllProposals(): Promise<Proposal[]> {
  return Array.from(proposalIdMap.values())
}

// Seed initial demo proposal for preview / testing
const demoToken = 'avr-prop-sample-2026'
const demoProposal: Proposal = {
  id: 'prop-demo-01',
  token: demoToken,
  organisationId: 'org-demo-alkota',
  organisationName: 'Alkota Titanium Cycles Ltd',
  projectTitle: 'Bespoke Parametric Configurator & Headless Commerce Architecture',
  version: 'v1.2',
  status: 'SENT',
  totalInvestment: 24000,
  depositAmount: 12000,
  depositPercentage: 50,
  currency: 'GBP',
  deliverables: [
    {
      code: 'DELIV-01',
      title: 'Parametric Geometry Engine & UI',
      description: 'Real-time Canvas/WebGL frame geometry calculations with millimeter-accurate tube mitering exports.',
      timelineWeeks: 4,
      acceptanceCriteria: ['Sub-16ms geometry update loop', 'Mobile gesture zoom & pan', 'Exportable SVG and JSON schematics'],
    },
    {
      code: 'DELIV-02',
      title: 'Headless Commerce & Checkout Pipeline',
      description: 'Next.js 16 storefront, Stripe Elements multi-currency deposit checkout, and automated PDF build sheets.',
      timelineWeeks: 3,
      acceptanceCriteria: ['Lighthouse Performance score >95', 'Webhook-verified Stripe deposit capture', 'Automated email dispatch'],
    },
    {
      code: 'DELIV-03',
      title: 'CMS & Workshop Operational Portal',
      description: 'Supabase-backed technician order dashboard with live queue tracking and automated customer notifications.',
      timelineWeeks: 3,
      acceptanceCriteria: ['Role-based access control (RLS)', 'Audit log for build status updates', '24h hotfix warranty'],
    },
  ],
  termsAndConditions: 'Fixed-deliverable scope. 50% initial commitment deposit prior to sprint commencement; 50% upon final acceptance testing sign-off. Source code transfer and full GitHub sovereignty delivered upon completion.',
  validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  createdAt: new Date().toISOString(),
}
saveProposal(demoProposal)
