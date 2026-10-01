import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer'
}

export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`container-max ${className}`}>
      <div className="container-content">
        {children}
      </div>
    </Tag>
  )
}

interface ContainerFluidProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer'
}

/** Container with no inner content-width constraint */
export function ContainerFluid({ children, className = '', as: Tag = 'div' }: ContainerFluidProps) {
  return (
    <Tag className={`container-max ${className}`}>
      {children}
    </Tag>
  )
}
