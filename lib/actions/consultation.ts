'use server'

import { z } from 'zod'
import { createConsultationRecord } from '@/lib/db/project-pipeline'
import { captureError } from '@/lib/monitoring'
import type { ConsultationInput, ConsultationReceipt } from '@/types/consultation'

const ConsultationSchema = z.object({
  organisationName: z.string().trim().min(1, 'Organisation name is required').max(150),
  organisationUrl: z.string().trim().optional(),
  industry: z.string().trim().optional(),
  projectType: z.enum([
    'build-sprint',
    'embedded-systems',
    'forensic-audit',
    'architecture-consultation',
  ]),
  currentSituation: z.string().trim().min(5, 'Please summarize your current situation').max(2500),
  desiredOutcome: z.string().trim().min(5, 'Please describe your target outcome').max(2500),
  existingPlatform: z.string().trim().optional(),
  technicalRequirements: z.array(z.string()).default([]),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', 'exploratory']),
  budgetRange: z.enum(['10k-25k', '25k-50k', '50k-100k', 'over-100k', 'tbd']),
  decisionStructure: z.string().trim().min(1, 'Decision structure is required'),
  relevantLinks: z.string().trim().optional(),
  supportingNotes: z.string().trim().optional(),
  contactName: z.string().trim().min(1, 'Contact name is required').max(100),
  contactEmail: z.string().trim().email('Valid work email is required'),
  contactRole: z.string().trim().optional(),
  _hp: z.string().max(0, 'Invalid submission').optional(),
})

export interface ConsultationActionResponse {
  success: boolean
  receipt?: ConsultationReceipt
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitConsultationAction(
  data: ConsultationInput & { _hp?: string }
): Promise<ConsultationActionResponse> {
  try {
    const parse = ConsultationSchema.safeParse(data)
    if (!parse.success) {
      return {
        success: false,
        error: 'Please verify the required consultation fields.',
        fieldErrors: parse.error.flatten().fieldErrors,
      }
    }

    const receipt = await createConsultationRecord(parse.data)

    return {
      success: true,
      receipt,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'submitConsultationAction', data })
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Consultation intake failed. Please contact hello@avorria.com.',
    }
  }
}
