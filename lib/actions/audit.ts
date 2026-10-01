'use server'

import { z } from 'zod'
import { runAuditEngine } from '@/lib/audit/engine'
import { saveAuditReport, getAuditReport } from '@/lib/audit/storage'
import { writeAuditEvent } from '@/lib/db/audit'
import { insertEnquiry } from '@/lib/db/enquiry'
import { captureError } from '@/lib/monitoring'
import type { AuditReport, AuditLeadInput } from '@/types/audit'

const UrlSchema = z.string().trim().min(3, 'Please enter a website URL').max(2048)

export interface AuditActionResponse {
  success: boolean
  error?: string
  reportId?: string
  report?: AuditReport
}

export async function runAuditAction(rawUrl: string): Promise<AuditActionResponse> {
  try {
    const parse = UrlSchema.safeParse(rawUrl)
    if (!parse.success) {
      return { success: false, error: parse.error.issues[0]?.message || 'Invalid URL' }
    }

    const report = await runAuditEngine(parse.data)
    await saveAuditReport(report)

    // Fire-and-forget audit event log
    writeAuditEvent({
      action: 'WEBSITE_AUDIT_EXECUTED',
      resourceType: 'audit_report',
      resourceId: report.id,
      metadata: {
        domain: report.domain,
        overallStatus: report.overallStatus,
        provenanceSummary: report.provenanceSummary,
      },
    }).catch(() => {})

    return {
      success: true,
      reportId: report.id,
      report,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'runAuditAction', url: rawUrl })
    const message = err instanceof Error ? err.message : 'Diagnostic execution failed'
    return { success: false, error: message }
  }
}

export async function fetchReportAction(reportId: string): Promise<AuditReport | null> {
  return await getAuditReport(reportId)
}

const AuditLeadSchema = z.object({
  auditId: z.string().min(1),
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Valid work email required'),
  company: z.string().trim().max(150).optional(),
  questions: z.string().trim().max(2000).optional(),
})

export interface LeadActionResponse {
  success: boolean
  error?: string
  message?: string
}

export async function submitAuditLeadAction(input: AuditLeadInput): Promise<LeadActionResponse> {
  try {
    const parsed = AuditLeadSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid details' }
    }

    const report = await getAuditReport(parsed.data.auditId)
    const domain = report ? report.domain : 'Unknown'

    // Persist as a formal consultative enquiry
    await insertEnquiry({
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      website: report ? report.url : null,
      whatBuilding: `Diagnostic Consultation Request for ${domain} (Report ID: ${parsed.data.auditId})`,
      problemSolving: parsed.data.questions || 'Requested 30-minute review of automated audit findings.',
      services: ['digital-system'],
      budget: 'not-sure',
      timeline: 'asap',
      additional: `Automated Audit Findings Summary: Status=${report?.overallStatus || 'N/A'}, ResponseTime=${report?.responseTimeMs || 0}ms`,
    })

    writeAuditEvent({
      action: 'AUDIT_CONSULTATION_REQUESTED',
      resourceType: 'audit_lead',
      resourceId: parsed.data.auditId,
      metadata: {
        domain,
        email: parsed.data.email,
        company: parsed.data.company,
      },
    }).catch(() => {})

    return {
      success: true,
      message: 'Consultation request received. An Avorria principal will review your diagnostic telemetry and contact you within one business day.',
    }
  } catch (err: unknown) {
    captureError(err, { context: 'submitAuditLeadAction', input })
    return {
      success: false,
      error: 'Unable to register consultation request. Please contact hello@avorria.com directly.',
    }
  }
}
