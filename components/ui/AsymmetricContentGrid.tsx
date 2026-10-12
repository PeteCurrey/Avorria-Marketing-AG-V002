import { type ReactNode } from 'react'

export interface AsymmetricContentGridProps {
  children: ReactNode
  layout?: 'feature-right' | 'feature-left' | 'thirds' | 'balanced'
  className?: string
}

/**
 * AsymmetricContentGrid — Phase 2 Modular Editorial Layout System
 *
 * Implements editorial magazine asymmetry inspired by Red Bull's publication design:
 * - feature-right: 5 cols text/intro, 7 cols rich media/cards
 * - feature-left: 7 cols primary visual feature, 5 cols secondary narrative
 * - thirds: 4 cols / 8 cols or 8 cols / 4 cols
 * - balanced: 6 cols / 6 cols architectural split
 */
export function AsymmetricContentGrid({
  children,
  layout = 'feature-left',
  className = '',
}: AsymmetricContentGridProps) {
  const layoutClass = {
    'feature-left': 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start',
    'feature-right': 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start',
    'thirds': 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start',
    'balanced': 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start',
  }

  return (
    <div className={`w-full ${layoutClass[layout]} ${className}`}>
      {children}
    </div>
  )
}
