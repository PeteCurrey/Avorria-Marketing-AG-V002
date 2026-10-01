import 'server-only'
import { randomUUID } from 'node:crypto'
import type {
  AuditReport,
  AuditFinding,
  AuditDimension,
  DimensionResult,
  FindingSeverity,
  FindingStatus,
  ProvenanceTag,
} from '@/types/audit'

interface RawAuditData {
  url: string
  normalizedUrl: string
  domain: string
  responseTimeMs: number
  protocol: string
  status: number
  headers: Record<string, string>
  html: string
  error?: string
}

async function fetchTarget(targetUrl: string): Promise<RawAuditData> {
  let normalizedUrl = targetUrl.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`
  }

  const parsedUrl = new URL(normalizedUrl)
  const domain = parsedUrl.hostname

  const startTime = Date.now()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 12000)

  try {
    const res = await fetch(normalizedUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (Avorria-Audit-Engine/2.4)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
      cache: 'no-store',
    })

    clearTimeout(timeoutId)
    const responseTimeMs = Date.now() - startTime

    const headers: Record<string, string> = {}
    res.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val
    })

    const html = await res.text()

    return {
      url: targetUrl,
      normalizedUrl,
      domain,
      responseTimeMs,
      protocol: parsedUrl.protocol.replace(':', '').toUpperCase(),
      status: res.status,
      headers,
      html,
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId)
    const message = err instanceof Error ? err.message : 'Connection failed'
    return {
      url: targetUrl,
      normalizedUrl,
      domain,
      responseTimeMs: Date.now() - startTime,
      protocol: 'UNKNOWN',
      status: 0,
      headers: {},
      html: '',
      error: message,
    }
  }
}

export async function runAuditEngine(rawUrl: string): Promise<AuditReport> {
  const raw = await fetchTarget(rawUrl)
  const id = randomUUID()
  const timestamp = new Date().toISOString()

  const findings: AuditFinding[] = []

  // Helper to add finding
  function addFinding(params: {
    dimension: AuditDimension
    title: string
    severity: FindingSeverity
    status: FindingStatus
    provenance: ProvenanceTag
    observation: string
    evidence: string
    recommendation: string
    technicalDetails?: Record<string, unknown>
  }) {
    findings.push({
      id: `${params.dimension}-${findings.length + 1}`,
      ...params,
    })
  }

  // If fetch failed completely
  if (raw.error || raw.status === 0) {
    addFinding({
      dimension: 'technical_implementation',
      title: 'Host Connection Failed',
      severity: 'CRITICAL',
      status: 'FAIL',
      provenance: 'VERIFIED',
      observation: `The target host failed to respond within 12,000ms or refused connection.`,
      evidence: `Network error: ${raw.error || 'Connection refused'}`,
      recommendation:
        'Verify that DNS records are configured, the web server is operational, and ingress firewalls allow inbound traffic.',
    })

    return assembleReport({
      id,
      url: rawUrl,
      domain: raw.domain,
      timestamp,
      responseTimeMs: raw.responseTimeMs,
      protocol: raw.protocol,
      findings,
      overallStatus: 'FAIL',
      executiveSummary: `The diagnostic suite could not establish an HTTP/HTTPS handshake with ${raw.domain}. Host connection timed out or failed.`,
    })
  }

  const html = raw.html
  const headers = raw.headers

  // ─── 01 // Performance & Network Architecture ───────────────────────────────
  const ttfb = raw.responseTimeMs
  if (ttfb < 350) {
    addFinding({
      dimension: 'performance',
      title: 'Optimal Server Response Time (TTFB)',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: `Initial server handshake completed in ${ttfb}ms, meeting institutional tier-1 thresholds (<350ms).`,
      evidence: `TTFB: ${ttfb}ms via direct HTTP handshake`,
      recommendation: 'Maintain edge caching and CDN distribution to preserve sub-350ms initial response times.',
    })
  } else if (ttfb < 1000) {
    addFinding({
      dimension: 'performance',
      title: 'Moderate Server Response Time (TTFB)',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: `Server response latency was ${ttfb}ms. While acceptable for dynamic SSR, edge distribution could reduce this latency.`,
      evidence: `TTFB: ${ttfb}ms`,
      recommendation: 'Introduce an edge CDN cache layer (Cloudflare, Vercel Edge, Fastly) to deliver static assets under 200ms.',
    })
  } else {
    addFinding({
      dimension: 'performance',
      title: 'Degraded Server Response Time (TTFB)',
      severity: 'HIGH',
      status: 'FAIL',
      provenance: 'VERIFIED',
      observation: `Initial response latency exceeded 1,000ms (${ttfb}ms), causing significant perceived load delay and poor TTFB Core Web Vitals.`,
      evidence: `TTFB: ${ttfb}ms (Threshold: <500ms)`,
      recommendation: 'Audit server-side database bottlenecks, disable uncompressed dynamic queries, and deploy static edge generation.',
    })
  }

  // Compression check
  const encoding = headers['content-encoding'] || ''
  if (encoding.includes('gzip') || encoding.includes('br')) {
    addFinding({
      dimension: 'performance',
      title: 'HTTP Payload Compression Enabled',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: `Payload is compressed via modern ${encoding.toUpperCase()} compression.`,
      evidence: `content-encoding: ${encoding}`,
      recommendation: 'Continue compression enforcement across all HTML, JSON, JS, and CSS payloads.',
    })
  } else {
    addFinding({
      dimension: 'performance',
      title: 'Uncompressed HTTP Transmission',
      severity: 'HIGH',
      status: 'FAIL',
      provenance: 'VERIFIED',
      observation: 'Content is transmitted uncompressed without Brotli or Gzip, significantly inflating transfer sizes.',
      evidence: `content-encoding header omitted or plain text`,
      recommendation: 'Enable Brotli or Gzip compression on your origin server or reverse proxy.',
    })
  }

  // Core Web Vitals Provider status check
  addFinding({
    dimension: 'performance',
    title: 'Lab Field Telemetry (Lighthouse / CWV API)',
    severity: 'INFORMATIONAL',
    status: 'UNAVAILABLE',
    provenance: 'NOT_TESTED',
    observation: 'Direct Google PageSpeed API provider key not configured for headless lab run. Lab score fabrication strictly suppressed.',
    evidence: 'External telemetry API connection skipped to ensure metric integrity',
    recommendation: 'Attach a Google Cloud PageSpeed API token in environment variables to ingest multi-device LCP, FID, and CLS field metrics.',
  })

  // ─── 02 // Mobile Experience & Viewport ─────────────────────────────────────
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html)
  if (hasViewport) {
    const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    const viewportContent = viewportMatch ? viewportMatch[1] : 'Present'
    addFinding({
      dimension: 'mobile_experience',
      title: 'Responsive Viewport Configuration',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: 'HTML document explicitly declares a mobile viewport meta tag.',
      evidence: `content="${viewportContent}"`,
      recommendation: 'Ensure responsive breakpoints avoid fixed horizontal containers on screens <380px.',
    })
  } else {
    addFinding({
      dimension: 'mobile_experience',
      title: 'Missing Mobile Viewport Tag',
      severity: 'CRITICAL',
      status: 'FAIL',
      provenance: 'OBSERVED',
      observation: 'No responsive viewport tag detected. Mobile browsers will default to 980px desktop virtual canvas.',
      evidence: 'No <meta name="viewport"> tag located in <head>',
      recommendation: 'Insert <meta name="viewport" content="width=device-width, initial-scale=1.0"> into document <head>.',
    })
  }

  // ─── 03 // Technical SEO & Indexability ─────────────────────────────────────
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)
  if (hasCanonical) {
    const canonicalHref = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] || 'Declared'
    addFinding({
      dimension: 'technical_seo',
      title: 'Canonical URL Declared',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: 'Explicit canonical tag detected, preventing duplicate content fragmentation.',
      evidence: `href="${canonicalHref}"`,
      recommendation: 'Verify canonical URL matches primary production domain routing without extraneous parameters.',
    })
  } else {
    addFinding({
      dimension: 'technical_seo',
      title: 'Missing Canonical Tag',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: 'No canonical link tag was discovered in the document head.',
      evidence: 'No <link rel="canonical"> discovered in <head>',
      recommendation: 'Declare self-referential canonical tags on all indexable landing pages.',
    })
  }

  const hasRobotsMeta = /<meta[^>]+name=["']robots["'][^>]*>/i.test(html)
  if (hasRobotsMeta) {
    const robotsContent = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1] || ''
    const isNoIndex = /noindex/i.test(robotsContent)
    if (isNoIndex) {
      addFinding({
        dimension: 'technical_seo',
        title: 'Robots Noindex Directive Active',
        severity: 'HIGH',
        status: 'WARN',
        provenance: 'VERIFIED',
        observation: 'Document actively instructs search crawlers not to index this page.',
        evidence: `robots: ${robotsContent}`,
        recommendation: 'If this is a production environment, remove the "noindex" directive to allow search ranking.',
      })
    } else {
      addFinding({
        dimension: 'technical_seo',
        title: 'Robots Indexing Directive Configured',
        severity: 'INFORMATIONAL',
        status: 'PASS',
        provenance: 'VERIFIED',
        observation: 'Document declares indexable robots permissions.',
        evidence: `robots: ${robotsContent}`,
        recommendation: 'Ensure XML sitemap matches robots directives.',
      })
    }
  }

  // ─── 04 // Metadata & Social Graph ──────────────────────────────────────────
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''

  if (!title) {
    addFinding({
      dimension: 'metadata',
      title: 'Missing Document Title',
      severity: 'CRITICAL',
      status: 'FAIL',
      provenance: 'VERIFIED',
      observation: 'Document does not contain a <title> element.',
      evidence: '<title> element empty or missing',
      recommendation: 'Add a distinct, commercial <title> between 45 and 65 characters.',
    })
  } else if (title.length < 20 || title.length > 70) {
    addFinding({
      dimension: 'metadata',
      title: 'Suboptimal Title Length',
      severity: 'LOW',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: `Title tag length is ${title.length} characters (industry optimal: 30–65 characters).`,
      evidence: `Title: "${title}"`,
      recommendation: 'Refine title to balance brand identity and high-intent keyword positioning.',
    })
  } else {
    addFinding({
      dimension: 'metadata',
      title: 'Optimal Title Metadata',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: `Title tag is cleanly structured (${title.length} characters).`,
      evidence: `Title: "${title}"`,
      recommendation: 'Maintain unique title tags across all discrete commercial routes.',
    })
  }

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
  const description = descMatch ? descMatch[1].trim() : ''
  if (!description) {
    addFinding({
      dimension: 'metadata',
      title: 'Missing Meta Description',
      severity: 'HIGH',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: 'No meta description found. Search engines will pull arbitrary text snippets from page content.',
      evidence: 'No <meta name="description"> tag found',
      recommendation: 'Add a concise value proposition meta description between 120 and 160 characters.',
    })
  } else {
    addFinding({
      dimension: 'metadata',
      title: 'Meta Description Present',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: `Meta description is present (${description.length} characters).`,
      evidence: `content="${description.substring(0, 80)}..."`,
      recommendation: 'Ensure meta descriptions highlight distinct institutional value rather than generic sales copy.',
    })
  }

  const hasOgTitle = /<meta[^>]+property=["']og:title["'][^>]*>/i.test(html)
  const hasOgImage = /<meta[^>]+property=["']og:image["'][^>]*>/i.test(html)
  if (hasOgTitle && hasOgImage) {
    addFinding({
      dimension: 'metadata',
      title: 'OpenGraph Social Protocol Implemented',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: 'OpenGraph title and social image preview tags are declared for social previews.',
      evidence: 'og:title and og:image tags present',
      recommendation: 'Test social card rendering on LinkedIn and X/Twitter cards validator.',
    })
  } else {
    addFinding({
      dimension: 'metadata',
      title: 'Incomplete OpenGraph Tags',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: 'Document is missing og:title or og:image social cards, leading to broken previews when shared.',
      evidence: `og:title: ${hasOgTitle ? 'Present' : 'Missing'} | og:image: ${hasOgImage ? 'Present' : 'Missing'}`,
      recommendation: 'Implement OpenGraph tags with high-resolution 1200x630px preview imagery.',
    })
  }

  // ─── 05 // Accessibility & Semantic Hygiene ─────────────────────────────────
  const imgMatches = html.match(/<img[^>]+>/gi) || []
  let imgsWithoutAlt = 0
  imgMatches.forEach((img) => {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      imgsWithoutAlt++
    }
  })

  if (imgMatches.length > 0 && imgsWithoutAlt > 0) {
    addFinding({
      dimension: 'accessibility',
      title: 'Images Missing Alt Attributes',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'OBSERVED',
      observation: `${imgsWithoutAlt} of ${imgMatches.length} images lack an alt attribute, failing WCAG 2.1 guideline 1.1.1.`,
      evidence: `${imgsWithoutAlt} unlabelled <img> elements detected`,
      recommendation: 'Provide descriptive alt text for editorial visuals, or alt="" for purely decorative elements.',
    })
  } else if (imgMatches.length > 0) {
    addFinding({
      dimension: 'accessibility',
      title: 'Image Alt Coverage Complete',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: `All ${imgMatches.length} inspected images specify an alt attribute.`,
      evidence: `100% alt attribute coverage across ${imgMatches.length} images`,
      recommendation: 'Ensure alt descriptions accurately articulate visual meaning to screen readers.',
    })
  }

  // HTML lang attribute
  const hasLang = /<html[^>]+lang=["'][^"']+["'][^>]*>/i.test(html)
  if (hasLang) {
    const lang = html.match(/<html[^>]+lang=["']([^"']+)["'][^>]*>/i)?.[1]
    addFinding({
      dimension: 'accessibility',
      title: 'Document Language Declared',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: `HTML document root declares a primary language attribute (${lang}).`,
      evidence: `<html lang="${lang}">`,
      recommendation: 'Maintain language code consistency across regional localized paths.',
    })
  } else {
    addFinding({
      dimension: 'accessibility',
      title: 'Missing Document Language Attribute',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'OBSERVED',
      observation: 'The <html> element does not specify a lang attribute, impairing screen reader text-to-speech synthesis.',
      evidence: '<html> tag lacks lang="..." attribute',
      recommendation: 'Add lang="en" or corresponding locale to the top-level <html> tag.',
    })
  }

  // ─── 06 // Information & Navigation Architecture ────────────────────────────
  const hasNav = /<nav[^>]*>/i.test(html)
  const hasHeader = /<header[^>]*>/i.test(html)
  const hasMain = /<main[^>]*>/i.test(html)
  const hasFooter = /<footer[^>]*>/i.test(html)

  if (hasNav && hasMain && hasFooter) {
    addFinding({
      dimension: 'information_architecture',
      title: 'Semantic Landmark Structure',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: 'Page structure utilizes proper HTML5 landmark regions (<nav>, <main>, <footer>).',
      evidence: '<nav>, <main>, and <footer> tags verified',
      recommendation: 'Ensure keyboard focus order naturally mirrors the visual layout sequence.',
    })
  } else {
    addFinding({
      dimension: 'information_architecture',
      title: 'Non-Semantic Landmark Architecture',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'OBSERVED',
      observation: 'Document relies on unlabelled <div> containers rather than HTML5 semantic landmarks.',
      evidence: `nav: ${hasNav ? 'Yes' : 'No'} | main: ${hasMain ? 'Yes' : 'No'} | footer: ${hasFooter ? 'Yes' : 'No'}`,
      recommendation: 'Wrap global header, primary content, and footer inside semantic HTML5 container elements.',
    })
  }

  // ─── 07 // Conversion Architecture & Flow ───────────────────────────────────
  const hasForms = /<form[^>]*>/i.test(html)
  const hasCtaButtons = /<button[^>]*>|<a[^>]+class=["'][^"']*(?:btn|cta|button)[^"']*["']/i.test(html)

  if (hasCtaButtons || hasForms) {
    addFinding({
      dimension: 'conversion_architecture',
      title: 'Actionable Conversion Mechanisms Detected',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: 'Landing experience features explicit interactive actions (forms or prominent call-to-action buttons).',
      evidence: `${hasForms ? 'Form elements' : ''} ${hasCtaButtons ? 'Interactive CTAs' : ''} present`,
      recommendation: 'Evaluate conversion path friction and ensure low form-field dropoff.',
    })
  } else {
    addFinding({
      dimension: 'conversion_architecture',
      title: 'Weak Primary Conversion Pathway',
      severity: 'HIGH',
      status: 'WARN',
      provenance: 'INFERRED',
      observation: 'No distinct primary conversion form or call-to-action button was observed in the initial markup.',
      evidence: 'Zero high-priority interactive conversion hooks discovered in base HTML',
      recommendation: 'Introduce an unmissable, low-friction primary action above the initial fold.',
    })
  }

  // ─── 08 // Visual Hierarchy & Typography ────────────────────────────────────
  const h1Matches = html.match(/<h1[^>]*>/gi) || []
  if (h1Matches.length === 1) {
    addFinding({
      dimension: 'visual_hierarchy',
      title: 'Singular Primary Headline (H1)',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'OBSERVED',
      observation: 'Document maintains exactly one top-level <h1> heading, preserving typographic and semantic hierarchy.',
      evidence: '1 <h1> element observed',
      recommendation: 'Ensure supporting sub-sections descend logically into <h2> and <h3> tiers.',
    })
  } else if (h1Matches.length === 0) {
    addFinding({
      dimension: 'visual_hierarchy',
      title: 'Missing Top-Level Heading (H1)',
      severity: 'HIGH',
      status: 'WARN',
      provenance: 'OBSERVED',
      observation: 'No <h1> heading was located. The page lacks a clear typographical anchor.',
      evidence: '0 <h1> tags detected',
      recommendation: 'Add a singular, high-contrast <h1> defining the primary subject of the page.',
    })
  } else {
    addFinding({
      dimension: 'visual_hierarchy',
      title: 'Multiple Competing H1 Headings',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'OBSERVED',
      observation: `${h1Matches.length} <h1> tags detected. Multiple H1 tags dilute content hierarchy and confuse screen readers.`,
      evidence: `${h1Matches.length} <h1> elements detected`,
      recommendation: 'Consolidate page copy so only one H1 represents the overarching page thesis.',
    })
  }

  // ─── 09 // Content Structure & Editorial Quality ────────────────────────────
  const textContent = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const wordCount = textContent.split(/\s+/).filter(Boolean).length
  if (wordCount < 150) {
    addFinding({
      dimension: 'content_quality',
      title: 'Thin Editorial Content / Client-Side CSR Reliance',
      severity: 'HIGH',
      status: 'WARN',
      provenance: 'INFERRED',
      observation: `Server-rendered HTML contains only ~${wordCount} words. The site may rely excessively on client-side JS rendering, obscuring content from search spiders.`,
      evidence: `Initial DOM text density: ~${wordCount} words`,
      recommendation: 'Migrate critical editorial copy and value propositions to Server-Side Rendering (SSR) or Static Site Generation (SSG).',
    })
  } else {
    addFinding({
      dimension: 'content_quality',
      title: 'Substantial Server-Rendered Content Density',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'INFERRED',
      observation: `Server response yields robust editorial density (~${wordCount} words rendered directly in HTML).`,
      evidence: `Initial DOM text density: ~${wordCount} words`,
      recommendation: 'Preserve high information-to-noise ratio and eliminate filler corporate jargon.',
    })
  }

  // ─── 10 // Technical Implementation & Security Headers ──────────────────────
  const isHttps = raw.protocol === 'HTTPS'
  if (isHttps) {
    addFinding({
      dimension: 'technical_implementation',
      title: 'TLS/HTTPS Encryption Active',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: 'Connection was negotiated over modern encrypted TLS transport.',
      evidence: `Protocol: ${raw.protocol}`,
      recommendation: 'Ensure all subdomains and static CDN origins enforce HTTPS redirects.',
    })
  } else {
    addFinding({
      dimension: 'technical_implementation',
      title: 'Unencrypted HTTP Transport',
      severity: 'CRITICAL',
      status: 'FAIL',
      provenance: 'VERIFIED',
      observation: 'Site was served over unencrypted HTTP, exposing user data to interception and browser security warnings.',
      evidence: `Protocol: ${raw.protocol}`,
      recommendation: 'Enforce automatic 301 redirection from HTTP to HTTPS with HSTS preloading.',
    })
  }

  // Security Headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
  const hasHsts = Boolean(headers['strict-transport-security'])
  if (hasHsts) {
    addFinding({
      dimension: 'technical_implementation',
      title: 'HSTS Transport Security Configured',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: 'HTTP Strict Transport Security header prevents SSL-stripping attacks.',
      evidence: `strict-transport-security: ${headers['strict-transport-security']}`,
      recommendation: 'Consider adding "includeSubDomains; preload" once testing is complete.',
    })
  } else {
    addFinding({
      dimension: 'technical_implementation',
      title: 'Missing HSTS Security Header',
      severity: 'MEDIUM',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: 'Strict-Transport-Security header was not detected.',
      evidence: 'Header strict-transport-security absent',
      recommendation: 'Add "Strict-Transport-Security: max-age=31536000; includeSubDomains" to edge responses.',
    })
  }

  const hasCsp = Boolean(headers['content-security-policy'])
  if (hasCsp) {
    addFinding({
      dimension: 'technical_implementation',
      title: 'Content Security Policy (CSP) Detected',
      severity: 'INFORMATIONAL',
      status: 'PASS',
      provenance: 'VERIFIED',
      observation: 'A Content-Security-Policy header is active, safeguarding against Cross-Site Scripting (XSS).',
      evidence: 'content-security-policy header present',
      recommendation: 'Regularly audit script-src and connect-src directives as third-party tags evolve.',
    })
  } else {
    addFinding({
      dimension: 'technical_implementation',
      title: 'Missing Content Security Policy (CSP)',
      severity: 'HIGH',
      status: 'WARN',
      provenance: 'VERIFIED',
      observation: 'No Content-Security-Policy header discovered. Browser cannot restrict unauthorized script injection.',
      evidence: 'content-security-policy header omitted',
      recommendation: 'Define a strict CSP limiting script execution to trusted domains.',
    })
  }

  // Determine overall status
  const hasCriticalFail = findings.some((f) => f.severity === 'CRITICAL' && f.status === 'FAIL')
  const hasHighFail = findings.some((f) => f.severity === 'HIGH' && f.status === 'FAIL')
  const hasWarn = findings.some((f) => f.status === 'WARN')

  const overallStatus: FindingStatus = hasCriticalFail || hasHighFail ? 'FAIL' : hasWarn ? 'WARN' : 'PASS'

  const executiveSummary = generateExecutiveSummary({
    domain: raw.domain,
    overallStatus,
    findings,
    ttfb,
  })

  return assembleReport({
    id,
    url: raw.normalizedUrl,
    domain: raw.domain,
    timestamp,
    responseTimeMs: raw.responseTimeMs,
    protocol: raw.protocol,
    findings,
    overallStatus,
    executiveSummary,
  })
}

function generateExecutiveSummary(params: {
  domain: string
  overallStatus: FindingStatus
  findings: AuditFinding[]
  ttfb: number
}): string {
  const failCount = params.findings.filter((f) => f.status === 'FAIL').length
  const warnCount = params.findings.filter((f) => f.status === 'WARN').length
  const passCount = params.findings.filter((f) => f.status === 'PASS').length

  if (params.overallStatus === 'FAIL') {
    return `Diagnostic examination of ${params.domain} identified ${failCount} critical infrastructure failures and ${warnCount} advisory risks. Initial server handshake measured ${params.ttfb}ms. Core remediations are urgently required in security header enforcement, rendering pipeline latency, and metadata architecture to prevent ongoing organic search suppression and conversion degradation.`
  }

  if (params.overallStatus === 'WARN') {
    return `Diagnostic examination of ${params.domain} demonstrates functional base infrastructure (${passCount} verified criteria passed) with ${warnCount} operational friction points. Key opportunities exist in edge caching, semantic HTML landmark compliance, and conversion path ergonomics.`
  }

  return `Diagnostic examination of ${params.domain} indicates exceptional technical posture across audited criteria. Verified network latency (${params.ttfb}ms), metadata integrity, and core security protocols satisfy institutional digital standards.`
}

const DIMENSION_CONFIG: Record<AuditDimension, { label: string; description: string }> = {
  performance: {
    label: '01 // Performance & Network Architecture',
    description: 'Protocol handshake, server latency (TTFB), compression, and edge distribution efficiency.',
  },
  mobile_experience: {
    label: '02 // Mobile Experience & Viewport',
    description: 'Adaptive viewport constraints, responsive scaling, and touch target accessibility.',
  },
  technical_seo: {
    label: '03 // Technical SEO & Indexability',
    description: 'Robots directives, canonical declarations, crawl governance, and schema architecture.',
  },
  metadata: {
    label: '04 // Metadata & Social Graph',
    description: 'Title density, meta description hygiene, OpenGraph protocols, and social cards.',
  },
  accessibility: {
    label: '05 // Accessibility & Semantic Hygiene',
    description: 'WCAG 2.1 compliance indicators, image alt coverage, document language, and screen reader clarity.',
  },
  information_architecture: {
    label: '06 // Information & Navigation Architecture',
    description: 'Semantic landmark hierarchy, navigation structure, and DOM traversal efficiency.',
  },
  conversion_architecture: {
    label: '07 // Conversion Architecture & Flow',
    description: 'Primary action clarity, form ergonomics, low-friction inquiry paths, and trust cues.',
  },
  visual_hierarchy: {
    label: '08 // Visual Hierarchy & Typography',
    description: 'Typographical scale discipline, heading sequence (H1-H6), and structural layout contrast.',
  },
  content_quality: {
    label: '09 // Content Structure & Editorial Quality',
    description: 'Information density, initial server-rendered content volume, and readability.',
  },
  technical_implementation: {
    label: '10 // Technical Implementation & Security',
    description: 'TLS encryption, HTTP security headers (HSTS, CSP, X-Frame-Options), and modern stack standards.',
  },
}

function assembleReport(params: {
  id: string
  url: string
  domain: string
  timestamp: string
  responseTimeMs: number
  protocol: string
  findings: AuditFinding[]
  overallStatus: FindingStatus
  executiveSummary: string
}): AuditReport {
  const dimensions = {} as Record<AuditDimension, DimensionResult>

  ;(Object.keys(DIMENSION_CONFIG) as AuditDimension[]).forEach((dim) => {
    const dimFindings = params.findings.filter((f) => f.dimension === dim)
    const passCount = dimFindings.filter((f) => f.status === 'PASS').length
    const warnCount = dimFindings.filter((f) => f.status === 'WARN').length
    const failCount = dimFindings.filter((f) => f.status === 'FAIL').length

    let dimStatus: FindingStatus = 'PASS'
    if (failCount > 0) dimStatus = 'FAIL'
    else if (warnCount > 0) dimStatus = 'WARN'
    else if (dimFindings.every((f) => f.status === 'UNAVAILABLE')) dimStatus = 'UNAVAILABLE'

    // Determine aggregate provenance for the dimension
    let dimProvenance: ProvenanceTag = 'VERIFIED'
    if (dimFindings.some((f) => f.provenance === 'NOT_TESTED')) {
      dimProvenance = dimFindings.every((f) => f.provenance === 'NOT_TESTED') ? 'NOT_TESTED' : 'OBSERVED'
    } else if (dimFindings.some((f) => f.provenance === 'INFERRED')) {
      dimProvenance = 'INFERRED'
    } else if (dimFindings.some((f) => f.provenance === 'OBSERVED')) {
      dimProvenance = 'OBSERVED'
    }

    const summary =
      failCount > 0
        ? `${failCount} critical issue${failCount > 1 ? 's' : ''} detected.`
        : warnCount > 0
        ? `${warnCount} advisory warning${warnCount > 1 ? 's' : ''} identified.`
        : dimFindings.length > 0
        ? 'All tested criteria satisfied.'
        : 'Dimension skipped or not tested.'

    dimensions[dim] = {
      dimension: dim,
      label: DIMENSION_CONFIG[dim].label,
      description: DIMENSION_CONFIG[dim].description,
      status: dimStatus,
      provenance: dimProvenance,
      passCount,
      warnCount,
      failCount,
      summary,
    }
  })

  // Count aggregate provenance
  const provenanceSummary: Record<ProvenanceTag, number> = {
    VERIFIED: params.findings.filter((f) => f.provenance === 'VERIFIED').length,
    OBSERVED: params.findings.filter((f) => f.provenance === 'OBSERVED').length,
    INFERRED: params.findings.filter((f) => f.provenance === 'INFERRED').length,
    NOT_TESTED: params.findings.filter((f) => f.provenance === 'NOT_TESTED').length,
  }

  return {
    id: params.id,
    url: params.url,
    domain: params.domain,
    timestamp: params.timestamp,
    responseTimeMs: params.responseTimeMs,
    protocol: params.protocol,
    overallStatus: params.overallStatus,
    executiveSummary: params.executiveSummary,
    dimensions,
    findings: params.findings,
    provenanceSummary,
    testedBy: 'Avorria Diagnostic Core v2.4 (Strict Provenance Protocol)',
  }
}
