export type ProjectType =
  | 'build-sprint'
  | 'embedded-systems'
  | 'forensic-audit'
  | 'architecture-consultation'

export type TimelineOption = 'immediate' | '1-3-months' | '3-6-months' | 'exploratory'

export type BudgetRangeOption = '10k-25k' | '25k-50k' | '50k-100k' | 'over-100k' | 'tbd'

export type ChallengeType =
  | 'build-new'
  | 'replace-existing'
  | 'connect-systems'
  | 'fix-problems'
  | 'grow-scale'
  | 'not-sure'

export type ProjectCategory =
  | 'website'
  | 'web-application'
  | 'digital-platform'
  | 'ai-system'
  | 'search-seo'
  | 'digital-transformation'
  | 'other'

export type InitiationBudgetOption = '5k-10k' | '10k-25k' | '25k-50k' | '50k-plus' | 'not-sure'

export interface ProjectInitiationFormData {
  organisationName: string
  organisationUrl?: string
  contactName: string
  contactEmail: string
  contactRole?: string
  challengeType?: ChallengeType
  challengeDescription?: string
  projectCategories?: ProjectCategory[]
  budgetRange: InitiationBudgetOption
  timeline: TimelineOption
  additionalContext?: string
}

export interface ConsultationInput {
  organisationName: string
  organisationUrl?: string
  industry?: string
  projectType: ProjectType
  currentSituation: string
  desiredOutcome: string
  existingPlatform?: string
  technicalRequirements: string[]
  timeline: TimelineOption
  budgetRange: BudgetRangeOption
  decisionStructure: string
  relevantLinks?: string
  supportingNotes?: string
  contactName: string
  contactEmail: string
  contactRole?: string

  // Optional new initiation fields
  challengeType?: ChallengeType
  challengeDescription?: string
  projectCategories?: ProjectCategory[]
  additionalContext?: string
}

export interface ConsultationReceipt {
  reference: string
  organisationId: string
  projectId: string
  enquiryId: string
  pipelineStatus: 'QUEUED_FOR_TECHNICAL_TRIAGE'
  registeredAt: string
  slaCommitment: string
  summary: {
    organisation: string
    projectType: string
    timeline: string
    budget: string
  }
}
