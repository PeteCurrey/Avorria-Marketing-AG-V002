/**
 * Shared empty, loading and error state components for dashboard views.
 * Truthful, calm, premium — never "Oops!", never fake data.
 */

import type { ReactNode } from 'react'

// ─── Empty State ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  label: string
  message: string
  action?: ReactNode
}

export function EmptyState({ label, message, action }: EmptyStateProps) {
  return (
    <div className="border border-[var(--color-border)] p-12 text-center max-w-[480px] mx-auto">
      <p className="text-[var(--text-label)] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-3">
        {label}
      </p>
      <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
        {message}
      </p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}

// ─── Dashboard Section Header ─────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string
  title?: string
  action?: ReactNode
}

export function SectionHeader({ label, title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between border-b border-[var(--color-border)] pb-4 mb-8">
      <div>
        <p className="text-[var(--text-label)] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-1">
          {label}
        </p>
        {title && (
          <h1 className="text-[var(--text-display-s)] font-extralight text-[var(--color-graphite)]">
            {title}
          </h1>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  label: string
  variant?: 'default' | 'active' | 'warning' | 'success' | 'muted'
}

const badgeVariants = {
  default: 'border-[var(--color-border)] text-[var(--color-graphite-muted)]',
  active:  'border-[var(--color-accent)] text-[var(--color-accent)]',
  warning: 'border-[#C49A3C] text-[#C49A3C]',
  success: 'border-[#5A8A6A] text-[#5A8A6A]',
  muted:   'border-[var(--color-border)] text-[var(--color-graphite-muted)] opacity-60',
}

export function StatusBadge({ label, variant = 'default' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[0.6rem] font-light tracking-[0.1em] uppercase ${badgeVariants[variant]}`}
    >
      {label}
    </span>
  )
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string
  value: string | number
  note?: string
}

export function MetricCard({ label, value, note }: MetricCardProps) {
  return (
    <div className="border border-[var(--color-border)] p-6">
      <p className="text-[var(--text-label)] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)] mb-3">
        {label}
      </p>
      <p className="text-[2.5rem] font-extralight text-[var(--color-graphite)] leading-none tabular-nums">
        {value}
      </p>
      {note && (
        <p className="text-[var(--text-label)] font-light text-[var(--color-graphite-muted)] mt-2">
          {note}
        </p>
      )}
    </div>
  )
}

// ─── Data Row / Table Row ─────────────────────────────────────────────────────

interface DataRowProps {
  children: ReactNode
  href?: string
  className?: string
}

export function DataRow({ children, className }: DataRowProps) {
  return (
    <div
      className={`flex items-center gap-4 py-4 border-b border-[var(--color-border)] last:border-b-0 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

// ─── Unauthorized State ───────────────────────────────────────────────────────

export function Unauthorized() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-[400px]">
        <p className="text-[var(--text-label)] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-3">
          Access restricted
        </p>
        <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  )
}
