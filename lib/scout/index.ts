import 'server-only'
import { randomUUID } from 'node:crypto'
import { runAuditEngine } from '@/lib/audit/engine'
import type { ScoutTarget, ScoutScanResult } from '@/lib/scout/types'

export async function runScoutScan(rawUrl: string, companyName?: string): Promise<ScoutScanResult> {
  let targetUrl = rawUrl.trim()
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://${targetUrl}`
  }

  const parsedUrl = new URL(targetUrl)
  const domain = parsedUrl.hostname
  const inferredCompanyName = companyName || domain.replace(/^www\./, '').split('.')[0].toUpperCase()

  // Run the core truthful audit engine
  const audit = await runAuditEngine(targetUrl)
  const findings = audit.findings

  // Detect tech stack from raw audit evidence and headers
  const detectedStack: ScoutTarget['detectedStack'] = {
    analytics: [],
    fonts: [],
  }

  const allEvidence = findings.map((f) => `${f.title} ${f.observation} ${f.evidence}`).join(' ')

  // Framework / CMS Detection heuristics
  if (/wp-content|wordpress/i.test(allEvidence)) {
    detectedStack.cms = 'WordPress (Monolithic)'
  } else if (/webflow/i.test(allEvidence)) {
    detectedStack.cms = 'Webflow'
  } else if (/shopify|myshopify/i.test(allEvidence)) {
    detectedStack.cms = 'Shopify'
  } else if (/next\.js|__next/i.test(allEvidence)) {
    detectedStack.framework = 'Next.js'
  } else if (/nuxt|vue/i.test(allEvidence)) {
    detectedStack.framework = 'Vue / Nuxt'
  }

  if (/cloudflare/i.test(allEvidence)) {
    detectedStack.cdn = 'Cloudflare Edge'
  } else if (/vercel/i.test(allEvidence)) {
    detectedStack.hosting = 'Vercel'
  } else if (/aws|amazon/i.test(allEvidence)) {
    detectedStack.hosting = 'AWS'
  }

  // Friction signals
  const frictionSignals: string[] = []
  if (audit.responseTimeMs > 700) {
    frictionSignals.push(`Severe server response latency (${audit.responseTimeMs}ms TTFB).`)
  }
  if (findings.some((f) => f.title.includes('Missing Content Security Policy'))) {
    frictionSignals.push('Unprotected against XSS: Content-Security-Policy omitted.')
  }
  if (findings.some((f) => f.title.includes('Missing HSTS'))) {
    frictionSignals.push('Insecure protocol transport: HSTS preloading not configured.')
  }
  if (findings.some((f) => f.title.includes('Thin Editorial Content'))) {
    frictionSignals.push('Client-side JS dependency obscuring initial SSR markup.')
  }
  if (findings.some((f) => f.title.includes('Multiple Competing H1'))) {
    frictionSignals.push('Broken typographic hierarchy: Multiple conflicting H1 headings.')
  }

  // Opportunity Score (0-100): Weighted formula based on actionable friction
  const failCount = findings.filter((f) => f.status === 'FAIL').length
  const warnCount = findings.filter((f) => f.status === 'WARN').length
  let opportunityScore = Math.min(100, Math.max(15, failCount * 22 + warnCount * 9))
  if (detectedStack.cms === 'WordPress (Monolithic)') opportunityScore = Math.min(100, opportunityScore + 15)

  const target: ScoutTarget = {
    id: `scout-${randomUUID().slice(0, 8)}`,
    domain,
    url: targetUrl,
    companyName: inferredCompanyName,
    sector: 'Commercial / Enterprise',
    status: 'COMPLETED',
    detectedStack,
    telemetry: {
      ttfbMs: audit.responseTimeMs,
      httpVersion: audit.protocol,
      hasHttps: audit.protocol === 'HTTPS',
      hasHsts: !findings.some((f) => f.title.includes('Missing HSTS')),
      hasCsp: !findings.some((f) => f.title.includes('Missing Content Security Policy')),
      hasViewport: !findings.some((f) => f.title.includes('Missing Mobile Viewport')),
      isClientRendered: findings.some((f) => f.title.includes('Thin Editorial Content')),
    },
    frictionSignals,
    opportunityScore,
    lastScoutedAt: new Date().toISOString(),
  }

  const dossierSummary = `${inferredCompanyName} (${domain}) operates on ${
    detectedStack.cms || detectedStack.framework || 'unidentified legacy infrastructure'
  }. Diagnostic identified ${frictionSignals.length} high-value commercial friction vectors. Rebuild opportunity scored at ${opportunityScore}/100.`

  const recommendedIntervention =
    opportunityScore > 65
      ? 'High-priority prospect for Fixed-Scope Build Sprint (£18k–£40k) replatforming.'
      : opportunityScore > 40
      ? 'Candidate for Forensic Teardown Audit (£1,500) and Technical SEO restructuring.'
      : 'Maintain on monitoring queue for quarterly infrastructure drift.'

  return {
    target,
    auditId: audit.id,
    dossierSummary,
    recommendedIntervention,
  }
}
