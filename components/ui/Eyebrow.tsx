import { type ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

/**
 * Eyebrow label — uppercase micro-text used above headlines.
 * Example: "01 — CAPABILITIES" or "WEB / AI / SYSTEMS"
 */
export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p className={`text-label-upper mb-4 ${className}`} aria-hidden="false">
      {children}
    </p>
  )
}
