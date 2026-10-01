/**
 * HeroVisual — Phase 2A placeholder
 *
 * A restrained geometric composition of stone/graphite planes, fine structural
 * rules, and a single rose hairline highlight. Architectural, physical, precise.
 *
 * Built as a next/image-compatible component with a clear swap interface:
 * When the final art-directed photograph is supplied to /public/images/hero/,
 * replace the SVG placeholder with the <picture> block below (currently commented).
 *
 * NO: spheres, blobs, networks, nodes, neural nets, particle effects, dashboards.
 * NO: font-weight > 300 in SVG text.
 * NO: Inter or any font other than Work Sans in SVG inline styles.
 */

// Uncomment this block and remove the SVG placeholder when final image is ready:
// import Image from 'next/image'
// export function HeroVisual() {
//   return (
//     <picture className="block w-full h-full">
//       {/* Desktop: 3:2 crop */}
//       <source
//         media="(min-width: 1024px)"
//         srcSet="/images/hero/hero-desktop.avif 1800w, /images/hero/hero-desktop.webp 1800w"
//         type="image/avif"
//       />
//       {/* Tablet + mobile: 4:5 crop */}
//       <source
//         srcSet="/images/hero/hero-mobile.avif 900w, /images/hero/hero-mobile.webp 900w"
//         type="image/avif"
//       />
//       <Image
//         src="/images/hero/hero-desktop.webp"
//         alt=""
//         fill
//         priority
//         fetchPriority="high"
//         placeholder="blur"
//         blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // replace with real blur hash
//         sizes="(min-width: 1024px) 55vw, 100vw"
//         className="object-cover object-center"
//         aria-hidden="true"
//       />
//     </picture>
//   )
// }

export function HeroVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[var(--color-ivory-dark)] ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Background plane — warm ivory-dark ── */}
        <rect width="800" height="900" fill="#EFECE6" />

        {/* ── Large structural plane — upper left quadrant, graphite ── */}
        <rect x="0" y="0" width="520" height="540" fill="#1A1916" />

        {/* ── Inset plane — warm mid-tone ── */}
        <rect x="60" y="60" width="400" height="360" fill="#2A2724" />

        {/* ── Floating plane — lower right ── */}
        <rect x="380" y="480" width="420" height="420" fill="#F7F5F0" />

        {/* ── Small accent plane — lower left ── */}
        <rect x="0" y="620" width="320" height="280" fill="#EFECE6" />

        {/* ── Fine structural rules — 1px, precise ── */}
        {/* Horizontal divisions on dark plane */}
        <line x1="60" y1="200" x2="460" y2="200" stroke="#4A4845" strokeWidth="0.5" />
        <line x1="60" y1="320" x2="460" y2="320" stroke="#4A4845" strokeWidth="0.5" />

        {/* Vertical divisions */}
        <line x1="200" y1="60" x2="200" y2="420" stroke="#4A4845" strokeWidth="0.5" />
        <line x1="340" y1="60" x2="340" y2="420" stroke="#4A4845" strokeWidth="0.5" />

        {/* Boundary rule between planes */}
        <line x1="520" y1="0" x2="520" y2="540" stroke="#C8C4BE" strokeWidth="1" />
        <line x1="0" y1="540" x2="800" y2="540" stroke="#C8C4BE" strokeWidth="1" />

        {/* Grid overlay on light plane */}
        <line x1="380" y1="560" x2="800" y2="560" stroke="#E2DED8" strokeWidth="0.5" />
        <line x1="380" y1="640" x2="800" y2="640" stroke="#E2DED8" strokeWidth="0.5" />
        <line x1="380" y1="720" x2="800" y2="720" stroke="#E2DED8" strokeWidth="0.5" />
        <line x1="380" y1="800" x2="800" y2="800" stroke="#E2DED8" strokeWidth="0.5" />
        <line x1="500" y1="480" x2="500" y2="900" stroke="#E2DED8" strokeWidth="0.5" />
        <line x1="640" y1="480" x2="640" y2="900" stroke="#E2DED8" strokeWidth="0.5" />

        {/* ── Rose hairline — single accent ── */}
        <line x1="60" y1="420" x2="460" y2="420" stroke="#B5616A" strokeWidth="1.5" />

        {/* ── Corner marks — architectural registration ── */}
        {/* Top-left of dark inset */}
        <path d="M60 80 L60 60 L80 60" stroke="#8A8784" strokeWidth="0.75" />
        {/* Bottom-right of dark inset */}
        <path d="M440 400 L460 400 L460 420" stroke="#8A8784" strokeWidth="0.75" />
        {/* Top-left of light plane */}
        <path d="M400 500 L380 500 L380 480" stroke="#C8C4BE" strokeWidth="0.75" />
        {/* Bottom-right of canvas */}
        <path d="M760 880 L800 880 L800 900" stroke="#C8C4BE" strokeWidth="0.75" />

        {/* ── Dimension ticks ── */}
        <line x1="60" y1="454" x2="60" y2="470" stroke="#8A8784" strokeWidth="0.5" />
        <line x1="200" y1="454" x2="200" y2="470" stroke="#8A8784" strokeWidth="0.5" />
        <line x1="340" y1="454" x2="340" y2="470" stroke="#8A8784" strokeWidth="0.5" />
        <line x1="460" y1="454" x2="460" y2="470" stroke="#8A8784" strokeWidth="0.5" />

        {/* ── Technical labels — Work Sans 300, small ── */}
        <text
          x="66"
          y="193"
          fontFamily="var(--font-work-sans, 'Work Sans', system-ui, sans-serif)"
          fontSize="7"
          fontWeight="300"
          letterSpacing="0.1em"
          fill="#8A8784"
          textAnchor="start"
        >
          01
        </text>
        <text
          x="66"
          y="313"
          fontFamily="var(--font-work-sans, 'Work Sans', system-ui, sans-serif)"
          fontSize="7"
          fontWeight="300"
          letterSpacing="0.1em"
          fill="#8A8784"
          textAnchor="start"
        >
          02
        </text>
        <text
          x="390"
          y="555"
          fontFamily="var(--font-work-sans, 'Work Sans', system-ui, sans-serif)"
          fontSize="7"
          fontWeight="300"
          letterSpacing="0.1em"
          fill="#4A4845"
          textAnchor="start"
        >
          03
        </text>
      </svg>
    </div>
  )
}
