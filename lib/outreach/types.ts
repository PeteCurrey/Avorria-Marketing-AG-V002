export type OutreachStage =
  | 'QUEUED'
  | 'INITIAL_TEARDOWN_SENT'
  | 'FOLLOW_UP_SENT'
  | 'ENGAGED'
  | 'CALL_SCHEDULED'
  | 'CONVERTED'
  | 'UNSUBSCRIBED'

export interface OutreachProspect {
  id: string
  companyName: string
  domain: string
  decisionMakerName: string
  decisionMakerRole: string
  decisionMakerEmail: string
  auditId?: string
  stage: OutreachStage
  opportunityScore: number
  lastContactedAt?: string
  nextFollowUpAt?: string
  notes?: string
}

export interface OutreachTemplate {
  code: 'TEARDOWN_TEASER' | 'SCOUT_DOSSIER' | 'PROPOSAL_FOLLOWUP'
  subject: string
  headline: string
  bodyTemplate: string
}
