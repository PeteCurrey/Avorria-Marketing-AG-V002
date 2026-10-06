'use client'

export interface LargeNumberProps {
  /** Numeral to display e.g. '01', '02', '03' */
  value: string
  /** Theme context: ivory ground (dark number) or dark chapter (light number) */
  theme?: 'ivory' | 'stone' | 'graphite' | 'petrol' | 'wine'
  /** Optional custom className */
  className?: string
  /** Background watermark or foreground architectural anchor */
  variant?: 'watermark' | 'inline'
}

/**
 * LargeNumber — Section 30.24
 *
 * Monumental numerical typography creating editorial anchors.
 * Always strictly rendered in Work Sans Extra Light (weight 200).
 */
export function LargeNumber({
  value,
  theme = 'ivory',
  className = '',
  variant = 'inline',
}: LargeNumberProps) {
  if (variant === 'watermark') {
    const opacityClass =
      theme === 'graphite' || theme === 'petrol' || theme === 'wine'
        ? 'text-[var(--color-ivory)] opacity-[0.04]'
        : 'text-[var(--color-graphite)] opacity-[0.04]'

    return (
      <div
        className={`absolute pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight leading-none ${opacityClass} ${className}`}
        aria-hidden="true"
      >
        {value}
      </div>
    )
  }

  const colorClass =
    theme === 'graphite' || theme === 'petrol' || theme === 'wine'
      ? 'text-[var(--color-ivory)] opacity-60'
      : 'text-[var(--color-graphite)] opacity-40'

  return (
    <span
      className={`font-extralight leading-none select-none text-[clamp(2.5rem,5vw,5rem)] ${colorClass} ${className}`}
      aria-hidden="true"
    >
      {value}
    </span>
  )
}
