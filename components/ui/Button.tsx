import Link from 'next/link'
import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'cobalt' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

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
    'group inline-flex items-center gap-2',
    'bg-[var(--color-graphite)] text-[var(--color-ivory)]',
    'border border-[var(--color-graphite)]',
    'hover:bg-[var(--color-cobalt)] hover:border-[var(--color-cobalt)] hover:text-white',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-cobalt)]',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-editorial)]',
    'font-light uppercase',
  ].join(' '),
  cobalt: [
    'btn-cobalt',
    'group inline-flex items-center gap-2',
    'bg-[var(--color-cobalt)] text-white',
    'border border-[var(--color-cobalt)]',
    'hover:bg-[var(--color-graphite)] hover:border-[var(--color-graphite)]',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-cobalt)]',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-editorial)]',
    'font-light uppercase',
  ].join(' '),
  secondary: [
    'btn-secondary',
    'group inline-flex items-center gap-2',
    'bg-transparent text-[var(--color-graphite)]',
    'border border-[var(--color-graphite)]',
    'hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)]',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-editorial)]',
    'font-light uppercase',
  ].join(' '),
  ghost: [
    'btn-ghost',
    'group inline-flex items-center gap-2',
    'bg-transparent text-[var(--color-graphite-mid)]',
    'border border-[var(--color-border)]',
    'hover:border-[var(--color-graphite)] hover:text-[var(--color-graphite)]',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-editorial)]',
    'font-light uppercase',
  ].join(' '),
  text: [
    'group inline-flex items-center gap-1.5',
    'text-[var(--color-graphite)]',
    'border-b border-transparent',
    'hover:border-[var(--color-cobalt)] hover:text-[var(--color-cobalt)]',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-editorial)]',
    'font-light text-[var(--text-small)]',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3.5 py-1.5 text-[0.6875rem] tracking-[0.14em]',
  sm: 'px-4 py-2 text-[var(--text-label)] tracking-[0.08em]',
  md: 'px-6 py-3 text-[var(--text-label)] tracking-[0.08em]',
  lg: 'px-8 py-4 text-[var(--text-label)] tracking-[0.08em]',
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
