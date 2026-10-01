/**
 * Avorria — Digital Audit Type Definitions
 * 
 * Strict data provenance guarantees:
 * - VERIFIED: Directly measured via live protocol handshake, network response headers, or DOM extraction.
 * - OBSERVED: Directly inspected in client markup (e.g. meta tags, heading order, alt coverage).
 * - INFERRED: Computed heuristic based on structural architecture (e.g. hierarchy depth, conversion flow).
 * - NOT_TESTED: Skipped or third-party provider unavailable. Never fabricated.
 */

export type ProvenanceTag = 'VERIFIED' | 'OBSERVED' | 'INFERRED' | 'NOT_TESTED'

export type AuditDimension =
  | 'performance'
  | 'mobile_experience'
  | 'technical_seo'
  | 'metadata'
  | 'accessibility'
  | 'information_architecture'
  | 'conversion_architecture'
  | 'visual_hierarchy'
  | 'content_quality'
  | 'technical_implementation'

export type FindingSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL'

export type FindingStatus = 'PASS' | 'WARN' | 'FAIL' | 'UNAVAILABLE'

export interface AuditFinding {
  id: string
  dimension: AuditDimension
  title: string
  severity: FindingSeverity
  status: FindingStatus
  provenance: ProvenanceTag
  observation: string
  evidence: string
  recommendation: string
  technicalDetails?: Record<string, unknown>
}

export interface DimensionResult {
  dimension: AuditDimension
  label: string
  description: string
  status: FindingStatus
  provenance: ProvenanceTag
  passCount: number
  warnCount: number
  failCount: number
  summary: string
}

export interface AuditReport {
  id: string
  url: string
  domain: string
  timestamp: string
  responseTimeMs: number
  protocol: string
  overallStatus: FindingStatus
  executiveSummary: string
  dimensions: Record<AuditDimension, DimensionResult>
  findings: AuditFinding[]
  provenanceSummary: Record<ProvenanceTag, number>
  testedBy: string
}

export interface AuditLeadInput {
  auditId: string
  name: string
  email: string
  company?: string
  questions?: string
}
