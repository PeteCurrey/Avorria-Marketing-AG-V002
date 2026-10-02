/**
 * components/ui/dashboard/SectionLabel.tsx
 * 11px uppercase tracked label — all dashboard section headings.
 */
interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'span'
}

export function SectionLabel({ children, className = '', as: Tag = 'p' }: SectionLabelProps) {
  return (
    <Tag
      className={`text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-mid)] ${className}`}
    >
      {children}
    </Tag>
  )
}
