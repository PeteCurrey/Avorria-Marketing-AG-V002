export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-label-upper text-muted">Loading</span>
        <div className="w-16 h-px bg-[var(--color-border)] overflow-hidden relative">
          <div className="w-8 h-full bg-[var(--color-graphite-mid)] absolute animate-[shimmer_1s_infinite_linear]" />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[shimmer_1s_infinite_linear\\] {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  )
}
