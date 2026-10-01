import 'server-only'
import type { AuditReport } from '@/types/audit'

// Server-side in-memory repository for audit reports (with TTL and capacity bounds)
const reportStore = new Map<string, { report: AuditReport; expiresAt: number }>()

const MAX_STORED_REPORTS = 500
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

export async function saveAuditReport(report: AuditReport): Promise<void> {
  // Prune if capacity exceeded
  if (reportStore.size >= MAX_STORED_REPORTS) {
    const oldestKey = reportStore.keys().next().value
    if (oldestKey) {
      reportStore.delete(oldestKey)
    }
  }

  reportStore.set(report.id, {
    report,
    expiresAt: Date.now() + DEFAULT_TTL_MS,
  })
}

export async function getAuditReport(id: string): Promise<AuditReport | null> {
  const entry = reportStore.get(id)
  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    reportStore.delete(id)
    return null
  }

  return entry.report
}
