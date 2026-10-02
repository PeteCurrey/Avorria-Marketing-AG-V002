/**
 * capture:showcase — Automated High-Fidelity Project Showcase Pipeline
 *
 * Captures real, verified interface views directly from Avorria's case study routes:
 *   - /work/alkota-bikes
 *   - /work/drawdown
 *   - /work/careeros
 *   - /work/nestiq
 *   - /work/entirefm
 *   - /work/one-great-northern
 *
 * Emits genuine, crisp .webp assets into:
 *   /public/images/projects/[slug]/hero.webp      (16:9 large plate)
 *   /public/images/projects/[slug]/thumbnail.webp (4:3 card showcase)
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.CAPTURE_URL || 'http://localhost:3000'
const PROJECTS_DIR = path.join(process.cwd(), 'public/images/projects')

const SLUGS = [
  'alkota-bikes',
  'drawdown',
  'careeros',
  'nestiq',
  'entirefm',
  'one-great-northern',
]

async function run() {
  console.log(`Starting showcase capture from ${BASE_URL}...`)

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  for (const slug of SLUGS) {
    const targetDir = path.join(PROJECTS_DIR, slug)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    const page = await browser.newPage()

    // 1. Desktop 16:9 plate capture
    await page.setViewportSize({ width: 1600, height: 900 })
    try {
      await page.goto(`${BASE_URL}/work/${slug}`, { waitUntil: 'networkidle', timeout: 15000 })
      // Scroll slightly down to frame the case study hero visual plate
      await page.evaluate(() => window.scrollTo(0, 140))
      await page.waitForTimeout(600)

      const heroPath = path.join(targetDir, 'hero.webp')
      await page.screenshot({ path: heroPath, type: 'webp', quality: 90 })
      console.log(`✓ [${slug}] Captured hero.webp (1600x900)`)
    } catch (err) {
      console.warn(`! [${slug}] Error capturing hero:`, err)
    }

    // 2. Card thumbnail 4:3 plate capture
    await page.setViewportSize({ width: 1200, height: 900 })
    try {
      await page.evaluate(() => window.scrollTo(0, 220))
      await page.waitForTimeout(400)

      const thumbPath = path.join(targetDir, 'thumbnail.webp')
      await page.screenshot({ path: thumbPath, type: 'webp', quality: 88 })
      console.log(`✓ [${slug}] Captured thumbnail.webp (1200x900)`)
    } catch (err) {
      console.warn(`! [${slug}] Error capturing thumbnail:`, err)
    }

    await page.close()
  }

  await browser.close()
  console.log('✓ Showcase asset capture completed successfully.')
}

run().catch((err) => {
  console.error('Fatal showcase capture error:', err)
  process.exit(1)
})
