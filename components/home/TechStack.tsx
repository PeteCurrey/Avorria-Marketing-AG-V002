import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const technologies = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Supabase', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Vercel', category: 'Infrastructure' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Anthropic', category: 'AI' },
]

export function TechStack() {
  return (
    <section
      className="section-y border-b border-[var(--color-border)]"
      aria-labelledby="tech-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

            <RevealOnScroll>
              <Eyebrow>05 — Technology</Eyebrow>
              <h2 id="tech-heading" className="text-display-s">
                An engineering stack, not a logo wall.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll stagger delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="border-l border-t border-[var(--color-border)] p-6 last-of-type:border-r"
                  >
                    <p className="text-label-upper text-[var(--color-graphite-mid)] mb-2">
                      {tech.category}
                    </p>
                    <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)]">
                      {tech.name}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </div>
    </section>
  )
}
