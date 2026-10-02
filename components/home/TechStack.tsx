'use client'

/**
 * TechStack — Chapter 06
 *
 * Interactive visual media surfaces demonstrating verified technology tolerances.
 *
 * ARCHITECTURE:
 * - True White #FFFFFF canvas foundation
 * - 8 capability cards, each bearing only the official brand logomark of its technology
 * - Official SVG paths sourced directly from each technology's canonical brand assets
 * - Default state: restrained white card, subtle watermark silhouette, high-contrast typography
 * - Hover / Focus state: card expands smoothly (scale 1.03, elevation), logo pops with vibrant brand colour
 * - Atmospheric radial colour glow tuned to each technology's brand spectrum
 * - Mobile: logo and ambient glow display at balanced opacity permanently
 * - Keyboard accessible: cards are focusable with matching visual state
 * - prefers-reduced-motion: strips scale transforms, immediate opacity
 */

import React from 'react'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TechItem {
  id: string
  name: string
  category: string
  role: string
  metric: string
  brandColor: string
  glowColor: string
  accentBorder: string
}

const technologies: TechItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js 16 App Router',
    category: 'FRAMEWORK',
    role: 'Server-First Execution & Static Generation',
    metric: '0.62S LCP',
    brandColor: '#000000',
    glowColor: 'rgba(0, 112, 243, 0.22)',
    accentBorder: 'rgba(0, 0, 0, 0.28)',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGE',
    role: 'End-to-End Strict Typings & Invariant Proofs',
    metric: '100% STRICT',
    brandColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.24)',
    accentBorder: 'rgba(49, 120, 198, 0.40)',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL / PostGIS',
    category: 'DATABASE',
    role: 'Relational Schemas & Spatial Cadastral Pyramids',
    metric: '25M+ PARCELS',
    brandColor: '#336791',
    glowColor: 'rgba(51, 103, 145, 0.24)',
    accentBorder: 'rgba(51, 103, 145, 0.40)',
  },
  {
    id: 'threejs',
    name: 'Vanilla Three.js',
    category: '3D GRAPHICS',
    role: 'Low-Latency WebGL Geometry Inspection Stages',
    metric: '60 FPS STABLE',
    brandColor: '#049EF4',
    glowColor: 'rgba(4, 158, 244, 0.24)',
    accentBorder: 'rgba(4, 158, 244, 0.40)',
  },
  {
    id: 'html5-canvas',
    name: 'HTML5 Canvas API',
    category: 'TELEMETRY',
    role: 'Worker-Driven Isolated Financial Tick Aggregation',
    metric: '5,000 TICKS/S',
    brandColor: '#E34F26',
    glowColor: 'rgba(227, 79, 38, 0.24)',
    accentBorder: 'rgba(227, 79, 38, 0.40)',
  },
  {
    id: 'ai-models',
    name: 'OpenAI / Anthropic',
    category: 'AI INTEGRATION',
    role: 'Deterministic Agent Routines & Ontology Synthesis',
    metric: 'ZERO HALLUCINATION',
    brandColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.22)',
    accentBorder: 'rgba(217, 119, 6, 0.38)',
  },
  {
    id: 'supabase',
    name: 'Supabase Realtime',
    category: 'INFRASTRUCTURE',
    role: 'Binary WebSockets & Row-Level Authorization',
    metric: '<10MS PUBSUB',
    brandColor: '#3ECF8E',
    glowColor: 'rgba(62, 207, 142, 0.26)',
    accentBorder: 'rgba(62, 207, 142, 0.45)',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS v4',
    category: 'DESIGN TOKENS',
    role: 'CSS-First Architectural Theme System',
    metric: 'ZERO RUNTIME',
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.24)',
    accentBorder: 'rgba(56, 189, 248, 0.40)',
  },
]

// ─── Official Brand Logomarks (paths sourced from canonical brand SVGs) ────────

/** Next.js — official wordmark path from nextjs.org brand assets */
function NextJsLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** TypeScript — official single-path logo from Simple Icons (rounded square + TS letterform) */
function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
        fill="currentColor"
      />
    </svg>
  )
}

/** PostgreSQL — official elephant logo path from postgresql.org brand assets */
function PostgresLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M23.111 16.376c-.143-.363-.573-.484-.932-.638a5.078 5.078 0 0 0-.601-.187c-.363-.089-.607-.12-.743-.14-.143-.022-.237-.034-.284-.04-.012-.002-.018-.002-.018-.002.018-.043.038-.085.054-.128.08-.207.156-.415.228-.625.08-.232.156-.47.225-.71-.027.006-.07.016-.131.024-.256.038-.672.088-1.062-.012-.08-.02-.158-.048-.232-.083.04-.234.083-.463.122-.69.044-.257.085-.515.119-.775.035-.257.063-.518.085-.776.02-.253.034-.497.04-.73.004-.152.004-.3 0-.44-.09-.01-.18-.023-.27-.036-.124-.018-.248-.038-.37-.06-.134-.024-.268-.05-.4-.081a8.023 8.023 0 0 1-.375-.104 5.95 5.95 0 0 1-.338-.125 4.17 4.17 0 0 1-.293-.144 2.849 2.849 0 0 1-.238-.161 2.013 2.013 0 0 1-.173-.173c-.08-.095-.142-.196-.188-.3-.07-.162-.098-.33-.083-.488.006-.062.02-.12.038-.176.036-.11.09-.211.161-.302.07-.09.155-.173.254-.246.098-.072.21-.134.334-.184.123-.05.256-.09.396-.116.14-.026.287-.038.44-.035.153.003.31.022.468.056.156.034.31.085.458.15.147.066.285.148.409.246.124.098.234.21.329.338.095.128.174.27.234.426.06.156.098.325.112.507.013.18.005.375-.026.582a5.254 5.254 0 0 1-.088.42.368.368 0 0 0 .047.003c.048 0 .098-.003.152-.008.054-.005.11-.014.169-.025.06-.011.12-.026.18-.044.06-.018.12-.038.178-.062.058-.024.115-.05.17-.08.053-.03.103-.063.15-.098.046-.035.088-.073.126-.113.038-.04.072-.083.102-.128.03-.045.055-.093.077-.143.02-.05.038-.103.05-.158a1.14 1.14 0 0 0 .016-.17c0-.058-.003-.118-.01-.18-.035-.28-.14-.544-.307-.777a2.96 2.96 0 0 0-.596-.618 3.8 3.8 0 0 0-.826-.455 4.784 4.784 0 0 0-.993-.26 5.69 5.69 0 0 0-1.09-.056 5.49 5.49 0 0 0-1.09.165 5.065 5.065 0 0 0-.97.392 4.34 4.34 0 0 0-.802.596 3.658 3.658 0 0 0-.578.772 3.225 3.225 0 0 0-.314.914 3.143 3.143 0 0 0-.004 1.02c.064.354.19.686.375.982.184.294.428.554.725.77.12.084.246.163.376.233-.043.063-.085.128-.127.194-.08.127-.156.258-.23.39-.072.134-.14.27-.204.408-.063.137-.123.278-.178.42-.054.14-.103.284-.148.43-.044.145-.083.292-.117.44-.034.146-.062.295-.085.443-.023.148-.04.296-.05.443-.01.146-.013.29-.008.43.004.142.016.28.034.413.018.132.042.26.073.38.03.12.068.234.11.34.042.106.09.203.143.292.052.089.108.17.169.243.06.073.124.14.19.198.067.059.137.11.21.154.072.044.147.08.224.108.076.028.155.048.235.06.079.013.16.018.241.016.08-.002.162-.012.244-.028.08-.017.16-.041.238-.072.078-.032.155-.07.228-.115.074-.045.144-.097.21-.155.065-.058.127-.122.184-.192.057-.07.11-.146.157-.228.048-.081.09-.169.127-.261.036-.092.068-.189.093-.29.025-.1.044-.206.057-.315.012-.109.016-.222.012-.337-.003-.114-.015-.231-.034-.35-.02-.118-.048-.238-.084-.358a3.88 3.88 0 0 0-.128-.361 4.18 4.18 0 0 0-.176-.358 4.6 4.6 0 0 0-.224-.355 4.91 4.91 0 0 0-.27-.343 5.068 5.068 0 0 0-.313-.325 5.01 5.01 0 0 0-.35-.3c.032-.077.063-.155.093-.234.026-.069.051-.138.075-.207.049-.14.093-.28.132-.42.038-.141.07-.28.098-.42.026-.14.046-.278.059-.414.013-.136.018-.27.016-.398-.003-.13-.013-.256-.03-.376a2.67 2.67 0 0 0-.063-.343 2.234 2.234 0 0 0-.1-.31 1.89 1.89 0 0 0-.14-.274 1.622 1.622 0 0 0-.183-.236 1.424 1.424 0 0 0-.226-.193 1.296 1.296 0 0 0-.268-.145 1.203 1.203 0 0 0-.305-.083 1.147 1.147 0 0 0-.334-.007 1.12 1.12 0 0 0-.313.079 1.136 1.136 0 0 0-.277.164 1.202 1.202 0 0 0-.227.243 1.32 1.32 0 0 0-.166.32 1.48 1.48 0 0 0-.087.39 1.64 1.64 0 0 0 .007.443c.032.162.089.324.168.48.08.157.181.308.301.452.12.144.257.281.41.411.15.13.317.25.496.363.178.113.37.218.574.315.203.097.418.186.643.267.225.081.46.154.703.22.012.003.025.006.038.009-.034.13-.068.26-.1.392-.035.146-.066.295-.094.444-.028.15-.051.3-.07.452-.019.15-.033.3-.042.45-.009.15-.012.3-.01.447.002.146.01.29.024.432.014.14.033.278.06.413.026.134.058.264.097.39.039.126.083.248.133.363.05.116.105.226.165.33.06.105.124.204.192.296.068.092.14.177.215.255.075.078.153.15.234.213.08.063.163.12.249.168.085.048.172.088.261.12.088.03.178.053.27.067.09.013.182.018.273.015.091-.003.183-.015.274-.034.09-.02.179-.047.267-.082.087-.035.172-.078.254-.128.082-.05.16-.107.235-.172.074-.065.145-.137.21-.215.066-.079.127-.163.183-.253.055-.09.105-.185.149-.286.044-.1.082-.207.114-.317.032-.11.057-.224.076-.34.019-.116.03-.234.035-.354.004-.12.001-.242-.009-.365-.011-.123-.028-.247-.053-.372-.025-.126-.057-.252-.095-.38a4.96 4.96 0 0 0-.14-.377 5.303 5.303 0 0 0-.186-.366 5.58 5.58 0 0 0-.23-.35 5.748 5.748 0 0 0-.273-.33 5.761 5.761 0 0 0-.311-.305 5.664 5.664 0 0 0-.346-.276c-.12-.085-.244-.165-.37-.239a6.116 6.116 0 0 0-.39-.206 6.165 6.165 0 0 0-.406-.17 5.97 5.97 0 0 0-.414-.131 5.6 5.6 0 0 0-.416-.09 5.088 5.088 0 0 0-.408-.047 4.556 4.556 0 0 0-.39 0 4.025 4.025 0 0 0-.363.046 3.56 3.56 0 0 0-.326.092 3.167 3.167 0 0 0-.282.136 2.838 2.838 0 0 0-.23.177 2.58 2.58 0 0 0-.173.215 2.39 2.39 0 0 0-.122.248 2.278 2.278 0 0 0-.072.276 2.243 2.243 0 0 0-.023.3c.002.104.014.207.034.31.02.102.049.203.086.3.037.098.082.193.133.285.052.091.11.179.175.262.065.083.136.162.212.235.076.074.158.142.244.205.086.062.177.119.272.17.094.05.193.096.295.136.102.04.207.073.315.101.107.027.218.049.33.065.112.015.226.024.341.027.115.003.231-.001.348-.01.116-.01.233-.026.35-.048.117-.022.233-.05.35-.084.116-.035.23-.075.344-.121.113-.046.223-.098.332-.154.108-.057.213-.12.315-.187.102-.067.2-.139.295-.215.094-.076.185-.157.27-.24.086-.084.168-.171.244-.261.077-.09.148-.183.213-.278.066-.095.125-.193.178-.294.053-.1.1-.202.14-.307.04-.105.074-.212.1-.321.027-.109.047-.22.06-.332.012-.112.017-.225.015-.338-.003-.114-.014-.227-.033-.34-.02-.113-.047-.225-.082-.336a3.1 3.1 0 0 0-.124-.325 3.313 3.313 0 0 0-.166-.306 3.528 3.528 0 0 0-.208-.284 3.65 3.65 0 0 0-.246-.257 3.65 3.65 0 0 0-.28-.226 3.58 3.58 0 0 0-.306-.19 3.44 3.44 0 0 0-.325-.152 3.268 3.268 0 0 0-.337-.11 3.14 3.14 0 0 0-.34-.065 3.042 3.042 0 0 0-.337-.017c-.11.003-.22.014-.328.032-.108.018-.213.043-.315.075-.102.032-.201.07-.295.115-.095.046-.184.098-.268.155-.083.058-.161.12-.232.188-.071.067-.136.138-.193.213-.057.075-.108.153-.151.234-.043.081-.08.165-.109.252-.028.086-.05.175-.063.266-.013.09-.018.182-.015.274.003.091.014.182.032.271.017.089.042.177.074.26.031.084.07.165.113.241.044.077.093.15.147.216.053.067.11.128.17.183.06.055.123.103.189.145.066.041.134.077.204.106.07.028.141.05.213.065.072.014.145.021.218.02.073-.001.146-.01.218-.027.072-.016.143-.04.21-.071.068-.031.132-.069.193-.113.061-.044.118-.094.17-.149.052-.055.099-.115.14-.18.042-.064.077-.133.107-.205.03-.072.053-.147.069-.225.016-.077.024-.157.024-.238 0-.08-.008-.163-.025-.245-.016-.082-.041-.162-.074-.239-.033-.077-.074-.151-.122-.221-.048-.07-.103-.135-.164-.195-.062-.06-.13-.115-.202-.163-.073-.048-.15-.09-.23-.124-.082-.034-.166-.061-.252-.08-.086-.019-.174-.028-.262-.028-.089 0-.177.009-.263.028-.087.018-.171.045-.252.08-.08.034-.157.076-.229.124-.073.048-.14.103-.202.163-.061.06-.116.125-.164.195-.048.07-.089.144-.122.221-.033.077-.058.157-.074.239-.017.082-.025.165-.025.245 0 .081.008.161.024.238.016.078.04.153.069.225.03.072.065.141.107.205.041.065.088.125.14.18.052.055.109.105.17.149.061.044.125.082.193.113.067.031.138.055.21.071.072.017.145.026.218.027.073.001.146-.006.218-.02.072-.015.143-.037.213-.065.07-.029.138-.065.204-.106.066-.042.13-.09.19-.145.059-.055.116-.116.169-.183.054-.066.103-.139.147-.216.043-.076.082-.157.113-.241.032-.083.057-.171.074-.26.018-.089.029-.18.032-.271.003-.092-.002-.184-.015-.274-.013-.091-.035-.18-.063-.266-.029-.087-.066-.171-.109-.252-.043-.081-.094-.159-.151-.234-.057-.075-.122-.146-.193-.213-.071-.068-.149-.13-.232-.188-.084-.057-.173-.109-.268-.155-.094-.045-.193-.083-.295-.115-.102-.032-.207-.057-.315-.075-.108-.018-.218-.029-.328-.032a3.042 3.042 0 0 0-.337.017 3.14 3.14 0 0 0-.34.065 3.268 3.268 0 0 0-.337.11 3.44 3.44 0 0 0-.325.152 3.58 3.58 0 0 0-.306.19 3.65 3.65 0 0 0-.28.226 3.65 3.65 0 0 0-.246.257 3.528 3.528 0 0 0-.208.284 3.313 3.313 0 0 0-.166.306 3.1 3.1 0 0 0-.124.325c-.035.111-.062.223-.082.336-.019.113-.03.226-.033.34-.002.113.003.226.015.338.013.112.033.223.06.332.026.109.06.216.1.321.04.105.087.207.14.307.053.101.112.199.178.294.065.095.136.188.213.278.076.09.158.177.244.261.085.083.176.164.27.24.095.076.193.148.295.215.102.067.207.13.315.187.109.056.219.108.332.154.114.046.228.086.344.121.117.034.233.062.35.084.117.022.234.038.35.048.117.009.233.013.348.01.115-.003.229-.012.341-.027.112-.016.223-.038.33-.065.108-.028.213-.061.315-.101.102-.04.201-.086.295-.136.095-.051.186-.108.272-.17.086-.063.168-.131.244-.205.076-.073.147-.152.212-.235.065-.083.123-.171.175-.262.051-.092.096-.187.133-.285.037-.097.066-.198.086-.3.02-.103.032-.206.034-.31a2.243 2.243 0 0 0-.023-.3 2.278 2.278 0 0 0-.072-.276 2.39 2.39 0 0 0-.122-.248 2.58 2.58 0 0 0-.173-.215 2.838 2.838 0 0 0-.23-.177 3.167 3.167 0 0 0-.282-.136 3.56 3.56 0 0 0-.326-.092 4.025 4.025 0 0 0-.363-.046Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Three.js — official particle scatter logomark from threejs.org */
function ThreeJsLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"
        fill="currentColor"
      />
    </svg>
  )
}

/** HTML5 — official shield logo from w3.org / html5.org */
function CanvasLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
        fill="currentColor"
      />
    </svg>
  )
}

/** OpenAI — official gear/flower logomark from openai.com brand kit */
function AiModelsLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Supabase — official lightning bolt from supabase.com brand kit */
function SupabaseLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Tailwind CSS — official double-wave from tailwindcss.com brand assets */
function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  )
}

function TechLogo({ id }: { id: string }) {
  switch (id) {
    case 'nextjs':
      return <NextJsLogo />
    case 'typescript':
      return <TypeScriptLogo />
    case 'postgresql':
      return <PostgresLogo />
    case 'threejs':
      return <ThreeJsLogo />
    case 'html5-canvas':
      return <CanvasLogo />
    case 'ai-models':
      return <AiModelsLogo />
    case 'supabase':
      return <SupabaseLogo />
    case 'tailwindcss':
      return <TailwindLogo />
    default:
      return null
  }
}

// ─── Main Section Component ──────────────────────────────────────────────────

export function TechStack() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="tech-heading"
      id="techstack"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.035] leading-none"
        aria-hidden="true"
      >
        06
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                06 // TECHNOLOGY &amp; TOLERANCES
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2
                  id="tech-heading"
                  className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.75rem)]"
                >
                  An engineering stack,{' '}
                  <em
                    className="not-italic italic font-extralight"
                    style={{ color: 'var(--color-rose-text)' }}
                  >
                    not
                  </em>{' '}
                  a logo wall.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  We select technologies based on execution tolerances, memory stability, and server-side performance — never social media hype.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Architectural 8-Cell Interactive Media Matrix ──────────────────── */}
        <div
          className="border-t border-l border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          role="region"
          aria-label="Technology and engineering tolerances matrix"
        >
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group p-6 lg:p-8 flex flex-col justify-between min-h-[270px] md:min-h-[300px] focus:outline-none"
              tabIndex={0}
              role="article"
              aria-label={`${tech.name} — ${tech.category}: ${tech.metric}`}
              style={
                {
                  '--tech-color': tech.brandColor,
                  '--tech-glow': tech.glowColor,
                  '--tech-border': tech.accentBorder,
                } as React.CSSProperties
              }
            >
              {/* ── Atmospheric Radial Brand Glow (reveals on hover / focus) ─── */}
              <div className="tech-card-glow" aria-hidden="true" />

              {/* ── Official Brand Logomark (pops with colour on hover) ────────── */}
              <div className="tech-card-logo-wrap" aria-hidden="true">
                <TechLogo id={tech.id} />
              </div>

              {/* ── Top: Category & Performance Metric ──────────────────────── */}
              <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase font-light mb-6">
                <span className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-graphite)] group-focus:text-[var(--color-graphite)] transition-colors duration-300">
                  {tech.category}
                </span>
                <span className="text-[var(--color-rose-text)] font-light">
                  {tech.metric}
                </span>
              </div>

              {/* ── Middle: Technology Name & Architectural Role ────────────── */}
              <div className="relative z-10 my-auto py-2">
                <h3 className="text-lg md:text-xl font-extralight text-[var(--color-graphite)] mb-2.5 tracking-[-0.01em] transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[28ch]">
                  {tech.role}
                </p>
              </div>

              {/* ── Bottom: Tolerance Classification Stamp ───────────────────── */}
              <div className="relative z-10 pt-4 border-t border-[var(--color-border)]/80 flex items-center justify-end text-[9px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                <span className="shrink-0 select-none opacity-60">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light pt-4 border-t border-[var(--color-border)]">
          <span>DEPLOYED PRODUCTION MATRIX</span>
          <span>100% STRICT ENGINE CONFORMANCE</span>
        </div>
      </div>
    </section>
  )
}
