/**
 * Avorria Hero — Art-directed architectural composition
 *
 * Visual concept: A precision-engineered grid of connected vertical and
 * horizontal lines with deliberate nodes — suggesting a schematic or
 * structural plan. Not a network diagram. Not AI imagery.
 * Reads as architectural drawing / technical blueprint.
 *
 * Rendered entirely in SVG/CSS. No images, no external dependencies.
 * Subtle CSS animation on nodes and connectors.
 * Respects prefers-reduced-motion.
 */
export function HeroVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full select-none ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full hero-visual"
        preserveAspectRatio="xMidYMid meet"
      >
        <style>{`
          .hero-visual .grid-line {
            stroke: #C8C4BE;
            stroke-width: 0.5;
            opacity: 0;
            animation: line-draw 0.8s var(--ease-out) forwards;
          }
          .hero-visual .node {
            opacity: 0;
            animation: node-appear 0.4s var(--ease-out) forwards;
          }
          .hero-visual .node-fill {
            fill: #F7F5F0;
            stroke: #4A4845;
            stroke-width: 1;
          }
          .hero-visual .node-accent {
            fill: #B5616A;
            stroke: none;
          }
          .hero-visual .connector {
            stroke: #4A4845;
            stroke-width: 0.75;
            opacity: 0;
            animation: line-draw 1s var(--ease-out) forwards;
          }
          .hero-visual .label {
            fill: #8A8784;
            font-family: 'Inter', sans-serif;
            font-size: 7px;
            font-weight: 500;
            letter-spacing: 0.08em;
            opacity: 0;
            animation: node-appear 0.5s var(--ease-out) forwards;
          }
          .hero-visual .dimension-line {
            stroke: #C8C4BE;
            stroke-width: 0.4;
            stroke-dasharray: 3 2;
            opacity: 0;
            animation: line-draw 1.2s var(--ease-out) forwards;
          }

          @keyframes line-draw {
            from { opacity: 0; stroke-dashoffset: 200; }
            to   { opacity: 1; stroke-dashoffset: 0; }
          }
          @keyframes node-appear {
            from { opacity: 0; transform: scale(0.6); }
            to   { opacity: 1; transform: scale(1); }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-visual * {
              animation: none !important;
              opacity: 1 !important;
            }
          }

          /* Stagger delays */
          .hero-visual .d1 { animation-delay: 0.1s; }
          .hero-visual .d2 { animation-delay: 0.2s; }
          .hero-visual .d3 { animation-delay: 0.35s; }
          .hero-visual .d4 { animation-delay: 0.5s; }
          .hero-visual .d5 { animation-delay: 0.65s; }
          .hero-visual .d6 { animation-delay: 0.8s; }
          .hero-visual .d7 { animation-delay: 0.95s; }
          .hero-visual .d8 { animation-delay: 1.1s; }
          .hero-visual .d9 { animation-delay: 1.3s; }
          .hero-visual .d10 { animation-delay: 1.5s; }
        `}</style>

        {/* Background subtle grid */}
        <line className="grid-line d1" x1="100" y1="40" x2="100" y2="460" strokeDasharray="200" />
        <line className="grid-line d1" x1="200" y1="40" x2="200" y2="460" strokeDasharray="200" />
        <line className="grid-line d1" x1="300" y1="40" x2="300" y2="460" strokeDasharray="200" />
        <line className="grid-line d1" x1="400" y1="40" x2="400" y2="460" strokeDasharray="200" />
        <line className="grid-line d1" x1="500" y1="40" x2="500" y2="460" strokeDasharray="200" />
        <line className="grid-line d2" x1="60" y1="120" x2="540" y2="120" strokeDasharray="500" />
        <line className="grid-line d2" x1="60" y1="240" x2="540" y2="240" strokeDasharray="500" />
        <line className="grid-line d2" x1="60" y1="360" x2="540" y2="360" strokeDasharray="500" />

        {/* Primary structural connectors */}
        <line className="connector d3" x1="100" y1="120" x2="300" y2="120" strokeDasharray="300" />
        <line className="connector d3" x1="300" y1="120" x2="500" y2="240" strokeDasharray="300" />
        <line className="connector d4" x1="100" y1="240" x2="300" y2="240" strokeDasharray="300" />
        <line className="connector d4" x1="300" y1="240" x2="400" y2="360" strokeDasharray="300" />
        <line className="connector d5" x1="100" y1="120" x2="100" y2="360" strokeDasharray="300" />
        <line className="connector d5" x1="200" y1="120" x2="200" y2="360" strokeDasharray="300" />
        <line className="connector d6" x1="400" y1="120" x2="400" y2="360" strokeDasharray="300" />
        <line className="connector d7" x1="200" y1="240" x2="400" y2="240" strokeDasharray="300" />

        {/* Dimension lines */}
        <line className="dimension-line d8" x1="60" y1="120" x2="60" y2="360" strokeDasharray="300" />
        <line className="dimension-line d8" x1="55" y1="120" x2="65" y2="120" />
        <line className="dimension-line d8" x1="55" y1="360" x2="65" y2="360" />
        <line className="dimension-line d8" x1="100" y1="90" x2="500" y2="90" strokeDasharray="500" />
        <line className="dimension-line d8" x1="100" y1="85" x2="100" y2="95" />
        <line className="dimension-line d8" x1="500" y1="85" x2="500" y2="95" />

        {/* Nodes — primary intersections */}
        <g className="node node-fill d4" transform="translate(100,120)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d4" transform="translate(300,120)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d4" transform="translate(500,240)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d5" transform="translate(100,240)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d5" transform="translate(200,120)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d5" transform="translate(200,240)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d6" transform="translate(400,120)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d6" transform="translate(400,240)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d6" transform="translate(300,240)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d7" transform="translate(400,360)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d7" transform="translate(100,360)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>
        <g className="node node-fill d7" transform="translate(200,360)">
          <rect x="-5" y="-5" width="10" height="10" className="node-fill" />
        </g>

        {/* Accent nodes — key points */}
        <circle className="node node-accent d8" cx="300" cy="240" r="5" />
        <circle className="node node-accent d9" cx="500" cy="120" r="3.5" />
        <circle className="node node-accent d9" cx="100" cy="120" r="3.5" />

        {/* Technical labels */}
        <text className="label d9" x="306" y="244">01</text>
        <text className="label d10" x="108" y="114">A</text>
        <text className="label d10" x="208" y="114">B</text>
        <text className="label d10" x="308" y="114">C</text>
        <text className="label d10" x="408" y="114">D</text>
        <text className="label d10" x="508" y="244">E</text>

        {/* Corner marks */}
        <path className="connector d9" d="M540 40 L560 40 L560 60" stroke="#C8C4BE" strokeWidth="0.5" strokeDasharray="50" />
        <path className="connector d9" d="M40 460 L40 440 L60 440" stroke="#C8C4BE" strokeWidth="0.5" strokeDasharray="50" />
      </svg>
    </div>
  )
}
