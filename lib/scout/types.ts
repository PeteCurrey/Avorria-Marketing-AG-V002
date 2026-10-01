export interface ScoutTarget {
  id: string
  domain: string
  url: string
  companyName: string
  sector?: string
  status: 'QUEUED' | 'ANALYZING' | 'COMPLETED' | 'FAILED'
  detectedStack: {
    framework?: string
    cms?: string
    cdn?: string
    hosting?: string
    analytics?: string[]
    fonts?: string[]
  }
  telemetry: {
    ttfbMs?: number
    httpVersion?: string
    hasHttps: boolean
    hasHsts: boolean
    hasCsp: boolean
    hasViewport: boolean
    isClientRendered: boolean
  }
  frictionSignals: string[]
  opportunityScore: number // 0-100 (higher = greater need for rebuild/teardown)
  lastScoutedAt: string
}

export interface ScoutScanResult {
  target: ScoutTarget
  auditId?: string
  dossierSummary: string
  recommendedIntervention: string
}
