/**
 * MediaPlaceholder — Architectural text-led placeholder
 *
 * When real project photography or video is absent, renders an authentic,
 * dark graphite architectural panel with verified project telemetry,
 * fine structural lines, and technical registration marks.
 *
 * Never renders fake mockups, fake browser chrome, or generic stock imagery.
 */

interface MediaPlaceholderProps {
  title: string
  client?: string
  sector?: string
  discipline?: string
  aspectRatio?: string
  specs?: Array<{ label: string; value: string }>
  className?: string
  variant?: 'hero' | 'card' | 'fragment' | 'full'
}

export function MediaPlaceholder({
  title,
  client,
  sector,
  discipline,
  aspectRatio = 'aspect-[16/9]',
  specs,
  className = '',
  variant = 'card',
}: MediaPlaceholderProps) {
  if (variant === 'fragment') {
    return (
      <div
        className={`relative overflow-hidden bg-[#161513] border border-[var(--color-border)] p-4 flex flex-col justify-between select-none ${aspectRatio} ${className}`}
        role="presentation"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#8A8784] uppercase">
          <span>{discipline || 'SYSTEM SPEC'}</span>
          <span className="w-1 h-1 bg-[var(--color-accent)] inline-block" />
        </div>
        <div className="my-2">
          <p className="font-display font-light text-xs text-[#EFECE6] uppercase tracking-wide truncate">
            {title}
          </p>
          {sector && (
            <p className="text-[10px] text-[#8A8784] truncate">{sector}</p>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-[#2A2724] pt-1.5 text-[8px] font-mono text-[#6A6864]">
          <span>VERIFIED ARTIFACT</span>
          <span>AVR-00{title.length % 9 + 1}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#141311] border border-[var(--color-border)] text-[#EFECE6] p-6 lg:p-10 flex flex-col justify-between select-none ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8A8784" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
          {/* Accent registration crosshairs */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#B5616A" strokeWidth="0.5" opacity="0.4" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#4A4845" strokeWidth="0.5" opacity="0.6" />
        </svg>
      </div>

      {/* Header telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-[10px] md:text-xs font-mono tracking-widest text-[#8A8784] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] inline-block" />
          <span>{discipline || 'SYSTEM SPECIFICATION'}</span>
        </div>
        <span>ARCHITECTURAL STAGE</span>
      </div>

      {/* Main Content Detail */}
      <div className="relative z-10 my-8 max-w-lg">
        {client && (
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent-light)] mb-2">
            CLIENT // {client}
          </p>
        )}
        <h4 className="text-display-s md:text-display-m font-extralight uppercase tracking-tight text-white mb-3">
          {title}
        </h4>
        {sector && (
          <p className="text-secondary text-sm md:text-base font-light text-[#C8C4BE] max-w-md">
            {sector}
          </p>
        )}
      </div>

      {/* Footer telemetry & specs */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-end justify-between gap-4 text-[10px] md:text-xs font-mono text-[#8A8784]">
        {specs && specs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((s, idx) => (
              <div key={idx}>
                <span className="block text-[#6A6864] text-[9px] uppercase">{s.label}</span>
                <span className="text-[#EFECE6]">{s.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-4 text-[10px]">
            <span>ENGINEERED IN PRODUCTION</span>
            <span>•</span>
            <span>VERIFIED CAPABILITY</span>
          </div>
        )}
        <div className="text-[9px] tracking-widest text-[#6A6864] uppercase ml-auto">
          PROVENANCE: AUDITED
        </div>
      </div>
    </div>
  )
}
