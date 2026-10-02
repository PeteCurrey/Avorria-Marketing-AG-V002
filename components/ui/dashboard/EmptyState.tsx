/**
 * components/ui/dashboard/EmptyState.tsx
 * Calm, truthful empty state. Uppercase label + body copy. Zero decoration.
 */
interface EmptyStateProps {
  label: string       // e.g. "NO ACTIVE PROJECTS"
  body: string        // e.g. "Your active Avorria projects will appear here."
  className?: string
}

export function EmptyState({ label, body, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`py-16 px-6 text-center border-t border-[var(--color-border)] ${className}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
        {label}
      </p>
      <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[360px] mx-auto leading-relaxed">
        {body}
      </p>
    </div>
  )
}
