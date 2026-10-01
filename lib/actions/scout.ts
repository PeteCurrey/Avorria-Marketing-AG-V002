'use server'

import { runScoutScan } from '@/lib/scout'
import type { ScoutScanResult } from '@/lib/scout/types'

interface ScoutActionResult {
  success: boolean
  result?: ScoutScanResult
  error?: string
}

export async function runScoutAction(
  rawUrl: string,
  companyName?: string
): Promise<ScoutActionResult> {
  try {
    if (!rawUrl || typeof rawUrl !== 'string') {
      return { success: false, error: 'A target URL or domain must be provided.' }
    }

    const trimmed = rawUrl.trim()
    if (trimmed.length < 3) {
      return { success: false, error: 'Target URL is too short to be valid.' }
    }

    const scanResult = await runScoutScan(trimmed, companyName?.trim() || undefined)
    return {
      success: true,
      result: scanResult,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Scout inspection failure.'
    return {
      success: false,
      error: message,
    }
  }
}
