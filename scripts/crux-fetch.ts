/**
 * scripts/crux-fetch.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Google Chrome User Experience Report (CrUX) / PageSpeed Telemetry Ingestion
 *
 * Distinguishes strictly between:
 * 1. Real-User Field Data (CrUX 75th percentile origin measurements)
 * 2. Lab Diagnostics (Lighthouse synthetic simulation)
 *
 * Usage: pnpm exec tsx scripts/crux-fetch.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'fs'
import * as path from 'path'

interface CruxMetric {
  percentile?: number
  category?: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR'
  distributions?: Array<{ min: number; max?: number; proportion: number }>
}

interface CruxSnapshot {
  timestamp: string
  url: string
  connectionStatus: 'CONNECTED' | 'NOT CONNECTED' | 'NO_FIELD_DATA'
  message: string
  mobileFieldData?: {
    overallCategory?: string
    lcp?: CruxMetric
    inp?: CruxMetric
    cls?: CruxMetric
  }
  desktopFieldData?: {
    overallCategory?: string
    lcp?: CruxMetric
    inp?: CruxMetric
    cls?: CruxMetric
  }
}

async function fetchPageSpeed(url: string, strategy: 'mobile' | 'desktop', apiKey?: string) {
  const params = new URLSearchParams({
    url,
    strategy,
  })
  if (apiKey) params.append('key', apiKey)

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`
  const res = await fetch(endpoint)
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`PageSpeed API HTTP ${res.status}: ${errorText}`)
  }
  return res.json()
}

async function main() {
  console.log('─────────────────────────────────────────────────────────────────────────────')
  console.log('AVORRIA CHROME UX REPORT (CrUX) FIELD DATA INGESTION — PHASE 7')
  console.log('─────────────────────────────────────────────────────────────────────────────')

  const targetUrl = 'https://avorria.com'
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY

  const outDir = path.join(process.cwd(), 'scripts', 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const outFile = path.join(outDir, 'crux-performance-snapshot.json')

  console.log(`• Target Origin:    ${targetUrl}`)
  console.log(`• API Key Status:   ${apiKey ? 'CONFIGURED' : 'UNSET (Using Public Quota)'}`)

  try {
    const mobileData = await fetchPageSpeed(targetUrl, 'mobile', apiKey)
    const desktopData = await fetchPageSpeed(targetUrl, 'desktop', apiKey)

    const mobileLoadingExperience = mobileData.loadingExperience
    const desktopLoadingExperience = desktopData.loadingExperience

    const hasMobileCrUX =
      mobileLoadingExperience &&
      mobileLoadingExperience.metrics &&
      Object.keys(mobileLoadingExperience.metrics).length > 0

    const hasDesktopCrUX =
      desktopLoadingExperience &&
      desktopLoadingExperience.metrics &&
      Object.keys(desktopLoadingExperience.metrics).length > 0

    const snapshot: CruxSnapshot = {
      timestamp: new Date().toISOString(),
      url: targetUrl,
      connectionStatus: hasMobileCrUX || hasDesktopCrUX ? 'CONNECTED' : 'NO_FIELD_DATA',
      message:
        hasMobileCrUX || hasDesktopCrUX
          ? 'Live CrUX field telemetry retrieved successfully.'
          : 'Google CrUX has not yet aggregated sufficient real-user Chrome traffic for this origin (insufficient 28-day sample threshold).',
    }

    if (hasMobileCrUX) {
      snapshot.mobileFieldData = {
        overallCategory: mobileLoadingExperience.overall_category,
        lcp: mobileLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS,
        inp: mobileLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT,
        cls: mobileLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE,
      }
      console.log(`\n• Mobile CrUX Status: FIELD DATA AVAILABLE`)
      console.log(`  - LCP (75th percentile): ${snapshot.mobileFieldData.lcp?.percentile}ms`)
      console.log(`  - INP (75th percentile): ${snapshot.mobileFieldData.inp?.percentile}ms`)
      console.log(`  - CLS (75th percentile): ${snapshot.mobileFieldData.cls?.percentile}`)
    } else {
      console.log(`\n• Mobile CrUX Status: NO FIELD DATA (Under Google Chrome Traffic Threshold)`)
    }

    if (hasDesktopCrUX) {
      snapshot.desktopFieldData = {
        overallCategory: desktopLoadingExperience.overall_category,
        lcp: desktopLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS,
        inp: desktopLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT,
        cls: desktopLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE,
      }
      console.log(`\n• Desktop CrUX Status: FIELD DATA AVAILABLE`)
    } else {
      console.log(`• Desktop CrUX Status: NO FIELD DATA (Under Google Chrome Traffic Threshold)`)
    }

    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8')
    console.log(`\n✓ CrUX snapshot written to: ${outFile}`)
  } catch (err: any) {
    console.warn(`\n✖ CrUX Ingestion Notice: ${err.message}`)
    const snapshot: CruxSnapshot = {
      timestamp: new Date().toISOString(),
      url: targetUrl,
      connectionStatus: 'NOT CONNECTED',
      message: `Failed to poll PageSpeed API: ${err.message}`,
    }
    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8')
  }

  console.log('─────────────────────────────────────────────────────────────────────────────')
}

main().catch(console.error)
