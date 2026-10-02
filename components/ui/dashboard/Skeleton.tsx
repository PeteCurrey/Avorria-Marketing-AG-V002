/**
 * components/ui/dashboard/Skeleton.tsx
 * Thin animated loading bars. No spinners.
 * Used in loading.tsx for every dashboard route.
 */

interface SkeletonProps {
  className?: string
  'aria-label'?: string
}

export function Skeleton({ className = '', 'aria-label': ariaLabel }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[var(--color-border)] rounded-[var(--radius-sm)] ${className}`}
      role="status"
      aria-label={ariaLabel ?? 'Loading…'}
      aria-busy="true"
    />
  )
}

/** Pre-built layout skeleton for a dashboard overview page */
export function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-10" aria-label="Loading dashboard…" role="status">
      {/* Page title */}
      <div className="space-y-2 pb-6 border-b border-[var(--color-border)]">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-64" />
      </div>
      {/* Rows */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-5/6" />
        </div>
      ))}
    </div>
  )
}

/** Table row skeleton */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <tr aria-hidden="true">
      {[...Array(cols)].map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton className="h-3.5 w-full" />
        </td>
      ))}
    </tr>
  )
}
