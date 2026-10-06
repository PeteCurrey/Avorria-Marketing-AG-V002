/**
 * scripts/gsc-fetch.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Google Search Console CLI Ingestion & Performance Snapshot Engine
 *
 * Safe execution:
 * 1. Checks least-privilege credentials
 * 2. If configured: retrieves site-level, query-level, and page-level metrics
 * 3. If credentials missing: outputs structured diagnostic instructions and writes
 *    a clean "NOT_CONNECTED" performance manifest (Zero fabrication guaranteed).
 *
 * Usage: pnpm exec tsx scripts/gsc-fetch.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { getGscConnectionStatus, querySearchConsole, GscResponse } from '../lib/seo/gsc'
import * as fs from 'fs'
import * as path from 'path'

interface SearchConsoleSnapshot {
  timestamp: string
  property: string
  connectionStatus: 'CONNECTED' | 'NOT CONNECTED'
  message: string
  prerequisites: string[]
  siteLevel?: {
    dateRange: { start: string; end: string }
    clicks: number
    impressions: number
    ctr: number
    position: number
  }
  topQueries?: Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  topPages?: Array<{
    page: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
}

async function main() {
  console.log('─────────────────────────────────────────────────────────────────────────────')
  console.log('AVORRIA GOOGLE SEARCH CONSOLE INGESTION ENGINE — PHASE 7')
  console.log('─────────────────────────────────────────────────────────────────────────────')

  const status = getGscConnectionStatus()
  const outDir = path.join(process.cwd(), 'scripts', 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const outFile = path.join(outDir, 'gsc-performance-snapshot.json')

  if (!status.connected) {
    console.log(`\n• Target Property:    ${status.property}`)
    console.log(`• Status:             NOT CONNECTED (Credentials Pending)`)
    console.log(`• Error Details:      ${status.error}`)
    console.log(`\nPrerequisites to connect:`)
    status.prerequisites.forEach((p) => console.log(`  ${p}`))

    const snapshot: SearchConsoleSnapshot = {
      timestamp: new Date().toISOString(),
      property: status.property,
      connectionStatus: 'NOT CONNECTED',
      message: status.error || 'Credentials not found in environment.',
      prerequisites: status.prerequisites,
    }

    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8')
    console.log(`\n✓ Diagnostic status recorded at: ${outFile}`)
    console.log('─────────────────────────────────────────────────────────────────────────────')
    return
  }

  console.log(`\n• Target Property:    ${status.property}`)
  console.log(`• Service Account:    ${status.clientEmail}`)
  console.log(`• Status:             AUTHENTICATING...`)

  // Define date window: trailing 28 days
  const now = new Date()
  const endDateObj = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // GSC typically has 2-day lag
  const startDateObj = new Date(endDateObj.getTime() - 28 * 24 * 60 * 60 * 1000)

  const startDate = startDateObj.toISOString().split('T')[0]
  const endDate = endDateObj.toISOString().split('T')[0]

  console.log(`• Query Window:       ${startDate} to ${endDate}`)

  try {
    // 1. Site-level overall query
    const siteResponse: GscResponse = await querySearchConsole({
      startDate,
      endDate,
      dimensions: [],
    })

    const siteRow = siteResponse.rows?.[0]
    const siteMetrics = siteRow
      ? {
          dateRange: { start: startDate, end: endDate },
          clicks: siteRow.clicks,
          impressions: siteRow.impressions,
          ctr: siteRow.ctr,
          position: siteRow.position,
        }
      : {
          dateRange: { start: startDate, end: endDate },
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
        }

    // 2. Query level
    const queryResponse = await querySearchConsole({
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 25,
    })

    const topQueries = (queryResponse.rows || []).map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }))

    // 3. Page level
    const pageResponse = await querySearchConsole({
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 25,
    })

    const topPages = (pageResponse.rows || []).map((r) => ({
      page: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }))

    const snapshot: SearchConsoleSnapshot = {
      timestamp: new Date().toISOString(),
      property: status.property,
      connectionStatus: 'CONNECTED',
      message: 'Successfully ingested live Search Analytics data.',
      prerequisites: status.prerequisites,
      siteLevel: siteMetrics,
      topQueries,
      topPages,
    }

    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8')
    console.log(`\n✓ Ingested ${topQueries.length} queries and ${topPages.length} pages.`)
    console.log(`✓ Performance snapshot saved to: ${outFile}`)
  } catch (err: any) {
    console.error(`\n✖ Query failed: ${err.message}`)
    const snapshot: SearchConsoleSnapshot = {
      timestamp: new Date().toISOString(),
      property: status.property,
      connectionStatus: 'NOT CONNECTED',
      message: `API Query Error: ${err.message}`,
      prerequisites: status.prerequisites,
    }
    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8')
  }

  console.log('─────────────────────────────────────────────────────────────────────────────')
}

main().catch(console.error)
