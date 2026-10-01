'use client'

export function PrintReportButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-white/40 transition-colors font-light print:hidden"
    >
      <span>Print / Save PDF</span>
      <span className="text-white/40 font-mono">⌘P</span>
    </button>
  )
}
