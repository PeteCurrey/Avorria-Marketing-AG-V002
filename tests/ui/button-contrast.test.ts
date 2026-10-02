/**
 * Button Contrast Audit — WCAG AA/AAA compliance check
 *
 * Tests that all Avorria button variants satisfy WCAG colour contrast ratios:
 *   - btn-primary (dark fill):   target ≥ 7:1 (AAA)
 *   - btn-secondary (outlined):  target ≥ 4.5:1 (AA)
 *   - btn-ghost (outlined):      target ≥ 4.5:1 (AA)
 *   - nav CTA (dark fill):       target ≥ 7:1 (AAA)
 *
 * Uses the WCAG 2.x relative luminance formula directly — no external deps.
 */

import { describe, it, expect } from 'vitest'

// ─── WCAG relative luminance (IEC 61966-2-1) ─────────────────────────────────

/** Linearise an 8-bit sRGB channel value [0–255] → [0–1] */
function linearise(c8bit: number): number {
  const c = c8bit / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/** Parse a hex colour string → [r, g, b] in 0–255 */
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

/** WCAG 2.x relative luminance from hex */
function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex)
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b)
}

/** WCAG contrast ratio between two hex colours */
function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ─── Design Tokens (from globals.css @theme) ──────────────────────────────────

const WHITE          = '#FFFFFF'
const GRAPHITE       = '#1A1916'
const GRAPHITE_MID   = '#4A4845'
const BORDER_STRONG  = '#C8C4BE'
const ACCENT         = '#B5616A'

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Button contrast — WCAG compliance', () => {

  // ── btn-primary ──────────────────────────────────────────────────────────────
  describe('btn-primary (dark fill)', () => {
    it('text (#FFFFFF) on background (#1A1916) achieves AAA (≥ 7:1)', () => {
      const ratio = contrastRatio(WHITE, GRAPHITE)
      console.log(`  btn-primary: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(7)
    })

    it('hover text (#FFFFFF) on hover background (#9A4A53) achieves AA (≥ 4.5:1)', () => {
      const ROSE_TEXT = '#9A4A53'
      const ratio = contrastRatio(WHITE, ROSE_TEXT)
      console.log(`  btn-primary:hover: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })
  })

  // ── btn-secondary ────────────────────────────────────────────────────────────
  describe('btn-secondary (outlined)', () => {
    it('text (#1A1916) on background (#FFFFFF) achieves AAA (≥ 7:1)', () => {
      const ratio = contrastRatio(GRAPHITE, WHITE)
      console.log(`  btn-secondary: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(7)
    })

    it('hover state (inverted: white text on graphite bg) achieves AAA (≥ 7:1)', () => {
      const ratio = contrastRatio(WHITE, GRAPHITE)
      console.log(`  btn-secondary:hover: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(7)
    })
  })

  // ── btn-ghost ────────────────────────────────────────────────────────────────
  describe('btn-ghost (outlined, muted text)', () => {
    it('text (#4A4845) on background (#FFFFFF) achieves AA (≥ 4.5:1)', () => {
      const ratio = contrastRatio(GRAPHITE_MID, WHITE)
      console.log(`  btn-ghost: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })

    it('hover text (#1A1916) on background (#FFFFFF) achieves AAA (≥ 7:1)', () => {
      const ratio = contrastRatio(GRAPHITE, WHITE)
      console.log(`  btn-ghost:hover: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(7)
    })
  })

  // ── Navigation CTA ──────────────────────────────────────────────────────────
  describe('Navigation "Start a project ↗" CTA', () => {
    it('white text on graphite pill achieves AAA (≥ 7:1)', () => {
      const ratio = contrastRatio(WHITE, GRAPHITE)
      console.log(`  nav CTA: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(7)
    })
  })

  // ── Rose text ────────────────────────────────────────────────────────────────
  describe('Hero italic rose accent (#9A4A53)', () => {
    it('rose-text on white achieves AA (≥ 4.5:1)', () => {
      const ROSE_TEXT = '#9A4A53'
      const ratio = contrastRatio(ROSE_TEXT, WHITE)
      console.log(`  rose-text: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })
  })

  // ── Scroll cue circle border (WCAG 1.4.11 non-text, ≥ 3:1) ─────────────────
  describe('Scroll cue circle border', () => {
    it('graphite-mid border (#4A4845) on white meets WCAG 1.4.11 non-text (≥ 3:1)', () => {
      const ratio = contrastRatio(GRAPHITE_MID, WHITE)
      console.log(`  scroll cue border: ${ratio.toFixed(2)}:1`)
      expect(ratio).toBeGreaterThanOrEqual(3)
    })
  })

})
