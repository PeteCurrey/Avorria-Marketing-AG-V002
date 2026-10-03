import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.CAPTURE_URL || 'http://localhost:3000'
const stage = process.argv[2] || 'before'
const OUTPUT_DIR = path.join(process.cwd(), 'screenshots', stage)

async function run() {
  console.log(`Starting capture (${stage}) from ${BASE_URL}...`)

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  const targets = [
    { name: 'home', path: '/' },
    { name: 'lobby', path: '/lobby' },
  ]

  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '390', width: 390, height: 844 },
  ]

  for (const target of targets) {
    for (const vp of viewports) {
      const page = await browser.newPage()
      await page.setViewportSize({ width: vp.width, height: vp.height })

      try {
        console.log(`Navigating to ${BASE_URL}${target.path} (${vp.width}x${vp.height})...`)
        await page.goto(`${BASE_URL}${target.path}`, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(1000)

        // Viewport screenshot
        const vpFile = path.join(OUTPUT_DIR, `${target.name}-${vp.name}-above.png`)
        await page.screenshot({ path: vpFile, fullPage: false })
        console.log(`✓ Saved ${vpFile}`)

        // Full page screenshot
        const fullFile = path.join(OUTPUT_DIR, `${target.name}-${vp.name}-full.png`)
        await page.screenshot({ path: fullFile, fullPage: true })
        console.log(`✓ Saved ${fullFile}`)
      } catch (err) {
        console.error(`Error capturing ${target.name} at ${vp.name}:`, err)
      } finally {
        await page.close()
      }
    }
  }

  await browser.close()
  console.log(`✓ Finished capturing ${stage} screenshots.`)
}

run().catch((err) => {
  console.error('Fatal capture error:', err)
  process.exit(1)
})
