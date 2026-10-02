/**
 * components/ui/dashboard/PageHeader.tsx
 * Page header: uppercase section label + H1 + optional right-side action slot.
 * H1 at Work Sans 200. Section label at 11px uppercase tracked.
 */
interface PageHeaderProps {
  label?: string       // e.g. "CLIENT PORTAL"
  title: string        // e.g. "Overview"
  action?: React.ReactNode
  className?: string
}

export function PageHeader({ label, title, action, className = '' }: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)] mb-10 ${className}`}
    >
      <div>
        {label && (
          <p className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-2">
            {label}
          </p>
        )}
        <h1 className="text-[var(--text-display-s)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.1]">
          {title}
        </h1>
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
