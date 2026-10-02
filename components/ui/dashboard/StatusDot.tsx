/**
 * components/ui/dashboard/StatusDot.tsx
 * Rose dot · + uppercase label. Maps status enums to human labels.
 * Never coloured pills. Never bold.
 */
import type { ProjectStatus, EnquiryStatus } from '@/types/platform'

const PROJECT_LABELS: Record<string, string> = {
  ENQUIRY:     'Enquiry',
  DISCOVERY:   'Discovery',
  PLANNING:    'Planning',
  DESIGN:      'Design',
  DEVELOPMENT: 'Development',
  REVIEW:      'Review',
  LAUNCH:      'Launch',
  COMPLETED:   'Completed',
  ON_HOLD:     'On hold',
}

const ENQUIRY_LABELS: Record<string, string> = {
  NEW:       'New',
  REVIEWING: 'Reviewing',
  QUALIFIED: 'Qualified',
  REJECTED:  'Rejected',
  ARCHIVED:  'Archived',
}

const DELIVERABLE_LABELS: Record<string, string> = {
  DRAFT:          'Draft',
  AWAITING_REVIEW:'Awaiting review',
  APPROVED:       'Approved',
  REVISION:       'Revision',
}

interface StatusDotProps {
  status: string
  type?: 'project' | 'enquiry' | 'deliverable'
  className?: string
}

export function StatusDot({ status, type = 'project', className = '' }: StatusDotProps) {
  const map = type === 'enquiry'
    ? ENQUIRY_LABELS
    : type === 'deliverable'
    ? DELIVERABLE_LABELS
    : PROJECT_LABELS

  const label = map[status] ?? status

  // Rose dot always — hierarchy from status enum, not colour
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[var(--text-small)] font-light text-[var(--color-graphite)] ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
