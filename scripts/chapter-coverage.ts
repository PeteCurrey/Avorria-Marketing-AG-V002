/**
 * scripts/chapter-coverage.ts
 *
 * Verifies sitewide chapter coverage targets:
 * - Neutral (Ivory + Stone): ~70%
 * - Deep chapters (Graphite + Petrol + Wine): ~25%
 * - Creative accent: < 5%
 */

import { chromium } from 'playwright'

const BASE_URL = process.env.CAPTURE_URL || 'http://localhost:3000'

async function checkCoverage() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

  const sections = await page.$$eval('[data-chapter]', (elements) => {
    return elements.map((el) => {
      const rect = el.getBoundingClientRect()
      const chapter = el.getAttribute('data-chapter')
      const tag = el.tagName.toLowerCase()
      const id = el.id || el.getAttribute('aria-labelledby') || ''
      return { chapter, height: rect.height, tag, id }
    })
  })

  const totalHeight = sections.reduce((acc, s) => acc + s.height, 0)
  const breakdown: Record<string, number> = {}

  for (const s of sections) {
    if (!s.chapter) continue
    breakdown[s.chapter] = (breakdown[s.chapter] || 0) + s.height
  }

  console.log('=== HOMEPAGE CHAPTER COVERAGE REPORT ===')
  console.log(`Total Scanned Section Height: ${Math.round(totalHeight)}px\n`)

  let neutralHeight = 0
  let deepHeight = 0

  for (const [chapter, height] of Object.entries(breakdown)) {
    const pct = ((height / totalHeight) * 100).toFixed(1)
    console.log(`  Chapter [${chapter.padEnd(12)}]: ${Math.round(height)}px (${pct}%)`)
    if (chapter === 'ivory' || chapter === 'stone') {
      neutralHeight += height
    } else if (chapter === 'graphite' || chapter === 'petrol' || chapter === 'wine') {
      deepHeight += height
    }
  }

  const neutralPct = ((neutralHeight / totalHeight) * 100).toFixed(1)
  const deepPct = ((deepHeight / totalHeight) * 100).toFixed(1)

  console.log('\n--- TARGET COMPARISON ---')
  console.log(`Neutral Chapters (Ivory + Stone):  ${neutralPct}% (Target: ~70%)`)
  console.log(`Deep Chapters (Graphite/Petrol/Wine): ${deepPct}% (Target: ~25%)`)

  await browser.close()
}

checkCoverage().catch((e) => {
  console.error(e)
  process.exit(1)
})
