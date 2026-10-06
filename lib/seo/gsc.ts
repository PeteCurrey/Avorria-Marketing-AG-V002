/**
 * lib/seo/gsc.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Google Search Console API Client — Read-Only Least-Privilege Integration
 *
 * Implements server-side Google OAuth 2.0 Service Account JWT authentication
 * to query Search Analytics without heavy external dependencies.
 *
 * Target Property: sc-domain:avorria.com
 * Scope: https://www.googleapis.com/auth/webmasters.readonly
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as crypto from 'crypto'

export interface GscQueryOptions {
  startDate: string
  endDate: string
  dimensions?: Array<'query' | 'page' | 'country' | 'device' | 'date'>
  dimensionFilterGroups?: Array<{
    filters: Array<{
      dimension: string
      operator: 'contains' | 'equals' | 'notEquals' | 'notContains'
      expression: string
    }>
  }>
  rowLimit?: number
  startRow?: number
}

export interface GscRow {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GscResponse {
  rows?: GscRow[]
  responseAggregationType?: string
}

export interface GscConnectionStatus {
  connected: boolean
  property: string
  clientEmail?: string
  error?: string
  prerequisites: string[]
}

/** Check configuration presence safely without leaking secret values */
export function getGscConnectionStatus(): GscConnectionStatus {
  const email = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
  const key = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
  const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || 'sc-domain:avorria.com'

  const prerequisites = [
    '1. Google Search Console domain ownership verified for sc-domain:avorria.com',
    '2. Google Cloud Service Account created with Search Console API enabled',
    '3. Service Account email granted "Viewer" (Read-Only) permissions on sc-domain:avorria.com',
    '4. GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL environment variable set',
    '5. GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY environment variable set',
  ]

  if (!email || !key) {
    return {
      connected: false,
      property,
      error: 'Missing GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL or GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY environment variables.',
      prerequisites,
    }
  }

  return {
    connected: true,
    property,
    clientEmail: email,
    prerequisites,
  }
}

/** Generates a signed Google Service Account JWT and exchanges it for a short-lived bearer token */
async function getGoogleAccessToken(clientEmail: string, privateKeyRaw: string): Promise<string> {
  // Normalize escaped newlines from environment strings
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')
  const now = Math.floor(Date.now() / 1000)
  const exp = now + 3600

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }

  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp,
    iat: now,
  }

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url')
  const base64Claims = Buffer.from(JSON.stringify(claimSet)).toString('base64url')
  const signatureInput = `${base64Header}.${base64Claims}`

  const signer = crypto.createSign('RSA-SHA256')
  signer.update(signatureInput)
  signer.end()
  const signature = signer.sign(privateKey, 'base64url')

  const jwt = `${signatureInput}.${signature}`

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Google OAuth2 token exchange failed (${tokenResponse.status}): ${errorText}`)
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string }
  return tokenData.access_token
}

/** Query Search Analytics API */
export async function querySearchConsole(
  options: GscQueryOptions,
  customProperty?: string
): Promise<GscResponse> {
  const email = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
  const key = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
  const property = customProperty || process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || 'sc-domain:avorria.com'

  if (!email || !key) {
    throw new Error('Google Search Console credentials not configured in environment.')
  }

  const accessToken = await getGoogleAccessToken(email, key)
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`

  const bodyPayload: Record<string, unknown> = {
    startDate: options.startDate,
    endDate: options.endDate,
    dimensions: options.dimensions || ['query'],
    rowLimit: options.rowLimit || 100,
  }

  if (options.dimensionFilterGroups) {
    bodyPayload.dimensionFilterGroups = options.dimensionFilterGroups
  }
  if (options.startRow) {
    bodyPayload.startRow = options.startRow
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyPayload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GSC API Query failed (${response.status}): ${errorText}`)
  }

  return (await response.json()) as GscResponse
}
