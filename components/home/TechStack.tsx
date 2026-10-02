import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TechItem {
  name: string
  category: string
  role: string
  metric?: string
}

const technologies: TechItem[] = [
  { name: 'Next.js 16', category: 'FRAMEWORK', role: 'Server-First App Router & Edge Runtime', metric: '0.6s LCP' },
  { name: 'TypeScript', category: 'LANGUAGE', role: 'End-to-End Strict Static Typings', metric: '100% Strict' },
  { name: 'PostgreSQL / PostGIS', category: 'DATABASE', role: 'Relational & Geospatial Boundary Tiles', metric: '25M+ Rows' },
  { name: 'Vanilla Three.js', category: '3D GRAPHICS', role: 'Low-Latency WebGL Geometry Stages', metric: '60 FPS' },
  { name: 'HTML5 Canvas API', category: 'TELEMETRY', role: 'Worker-Driven Isolated Tick Charting', metric: '5k Ticks/s' },
  { name: 'OpenAI / Anthropic', category: 'AI EVALUATION', role: 'Autonomous Assessment & Taxonomy Rubrics', metric: 'Zero Hallucination' },
  { name: 'Supabase Realtime', category: 'INFRASTRUCTURE', role: 'Binary WebSockets & Edge Event Subscriptions', metric: '<10ms PubSub' },
  { name: 'Tailwind CSS v4', category: 'DESIGN TOKENS', role: 'CSS-First Architectural Theme System', metric: 'Zero Runtime' },
]

export function TechStack() {
  return (
    <section
      className="section-y border-b border-[var(--color-border)]"
      aria-labelledby="tech-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-4">
              <RevealOnScroll>
                <Eyebrow>05 — Technology</Eyebrow>
                <h2 id="tech-heading" className="text-display-s mb-6">
                  An engineering stack, not a logo wall.
                </h2>
                <p className="text-secondary text-[var(--text-small)] font-light leading-relaxed mb-6">
                  We select technologies based on execution tolerances, memory stability, and server-side performance —
                  not whatever is trending on social platforms.
                </p>
                <div className="border-t border-[var(--color-border)] pt-4 text-[11px] font-mono text-[var(--color-graphite-muted)] uppercase">
                  <span>DEPLOYED PRODUCTION MATRIX</span>
                  <span className="block text-[var(--color-graphite)] font-light mt-1">
                    VERIFIED COMPATIBILITY
                  </span>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-8">
              <RevealOnScroll stagger delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[var(--color-border)]">
                  {technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="border-b md:even:border-l border-[var(--color-border)] p-6 hover:bg-black/[0.015] transition-colors"
                    >
                      <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-2 font-mono text-[10px]">
                        <span>{tech.category}</span>
                        {tech.metric && (
                          <span className="text-[var(--color-accent)]">{tech.metric}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-light text-[var(--color-graphite)] mb-1">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-[var(--color-graphite-mid)] font-light">
                        {tech.role}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
