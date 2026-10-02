import Link from 'next/link'
import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
}

interface ButtonAsButtonProps extends BaseButtonProps {
  as?: 'button'
  type?: 'button' | 'submit' | 'reset'
  href?: never
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link'
  href: string
  type?: never
  external?: boolean
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'btn-primary',
    'inline-flex items-center gap-2',
    'bg-[var(--color-graphite)] text-[var(--color-ivory)]',
    'border border-[var(--color-graphite)]',
    'hover:bg-[var(--color-rose-text)] hover:border-[var(--color-rose-text)]',
    'focus-visible:outline-2 focus-visible:outline-offset-3',
    'transition-colors duration-[var(--duration-base)]',
    'font-light tracking-[0.08em] uppercase text-[var(--text-label)]',
  ].join(' '),
  secondary: [
    'btn-secondary',
    'inline-flex items-center gap-2',
    'bg-transparent text-[var(--color-graphite)]',
    'border border-[var(--color-graphite)]',
    'hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)]',
    'transition-colors duration-[var(--duration-base)]',
    'font-light tracking-[0.08em] uppercase text-[var(--text-label)]',
  ].join(' '),
  ghost: [
    'btn-ghost',
    'inline-flex items-center gap-2',
    'bg-transparent text-[var(--color-graphite-mid)]',
    'border border-[var(--color-border)]',
    'hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)]',
    'transition-colors duration-[var(--duration-base)]',
    'font-light tracking-[0.08em] uppercase text-[var(--text-label)]',
  ].join(' '),
  text: [
    'inline-flex items-center gap-1.5',
    'text-[var(--color-graphite)]',
    'border-b border-transparent',
    'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
    'transition-colors duration-[var(--duration-base)]',
    'font-light text-[var(--text-small)]',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    disabled = false,
  } = props

  const classes = [
    variantStyles[variant],
    variant !== 'text' ? sizeStyles[size] : '',
    'rounded-[var(--radius-sm)]',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (props.as === 'link') {
    const externalProps = props.external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <Link
        href={props.href}
        className={classes}
        aria-label={props['aria-label']}
        onClick={props.onClick}
        {...externalProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
      aria-label={props['aria-label']}
    >
      {children}
    </button>
  )
}
