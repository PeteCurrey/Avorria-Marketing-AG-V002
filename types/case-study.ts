/**
 * Avorria — Case Study & Work Architecture Types
 *
 * Grounded in editorial investigation principles.
 * Rigorous provenance tracking: verified | partially verified | draft | internal.
 */

export type DataProvenanceState =
  | 'verified'           // Fully audited, publicly deliverable, verifiable facts only
  | 'partially_verified' // Preliminary facts confirmed, awaiting final commercial sign-off
  | 'draft'              // Internal draft, not displayed publicly
  | 'internal'           // Internal proprietary engineering, restricted view

export type ChapterType =
  | 'CONTEXT'
  | 'PROBLEM'
  | 'INTERVENTION'
  | 'SYSTEM'
  | 'DESIGN'
  | 'TECHNOLOGY'
  | 'OUTCOME'
  | 'EVIDENCE'
  | 'SPLIT'
  | 'INTERFACE'
  | 'PROCESS'

export interface CaseStudyMedia {
  id: string
  type: 'IMAGE' | 'INTERFACE' | 'SCHEMATIC' | 'DIAGRAM'
  src?: string
  alt: string
  caption?: string
  aspectRatio?: '21/9' | '16/9' | '4/3' | '1/1' | '16/5'
  figureNumber?: string
  spec?: string
}

export interface QualitativeEvidence {
  id: string
  category:
    | 'SYSTEM_REBUILT'
    | 'WORKFLOW_AUTOMATED'
    | 'PLATFORM_LAUNCHED'
    | 'INFRASTRUCTURE_CONSOLIDATED'
    | 'JOURNEY_REDESIGNED'
    | 'INTERNAL_TOOLING'
    | 'PERFORMANCE_VERIFIED'
  statement: string
  verificationMethod: string
  verifiableMetric?: {
    value: string
    context: string
  }
}

export interface CaseStudyChapter {
  id: string
  type: ChapterType
  sequence: string
  eyebrow: string
  title: string
  statement?: string
  paragraphs: string[]
  media?: CaseStudyMedia
  evidence?: QualitativeEvidence[]
  technicalSpecs?: Array<{
    label: string
    value: string
    detail?: string
  }>
}

export interface DetailedCaseStudy {
  slug: string
  provenance: DataProvenanceState
  sequenceNumber: string
  title: string
  client: string
  year: number
  sector: string
  discipline: '01 // BUILD' | '02 // SEARCH' | '03 // SYSTEMS'
  executiveSummary: string
  context: string
  problemStatement: string
  interventionSummary: string
  technologyStack: string[]
  chapters: CaseStudyChapter[]
  qualitativeEvidence: QualitativeEvidence[]
  seo: {
    title: string
    description: string
  }
}
