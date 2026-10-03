/**
 * scripts/squint-test.ts
 *
 * Simulates the 12px blur squint test on screenshots to verify:
 * - Page structure is instantly readable
 * - Tone-on-tone large numbers and confident color blocks stand out
 * - No "grey soup"
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.CAPTURE_URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(process.cwd(), 'screenshots', 'squint')

async function runSquint() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })

  for (const route of ['/', '/lobby']) {
    const name = route === '/' ? 'home' : 'lobby'
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' })

    // Apply 12px blur CSS filter
    await page.addStyleTag({
      content: `
        body {
          filter: blur(12px) !important;
        }
      `,
    })
    await page.waitForTimeout(500)

    const vpFile = path.join(OUTPUT_DIR, `${name}-squint-1440.png`)
    await page.screenshot({ path: vpFile, fullPage: false })
    console.log(`✓ Saved ${vpFile}`)
  }

  await browser.close()
  console.log('✓ Squint test completed.')
}

runSquint().catch((e) => {
  console.error(e)
  process.exit(1)
})
