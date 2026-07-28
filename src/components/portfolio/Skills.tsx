import type { Skill } from "@prisma/client";

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <p className="mt-4 text-muted">Technologies and tools I work with</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="rounded-2xl border border-border bg-surface-light p-6">
              <h3 className="mb-6 text-lg font-semibold text-accent-light">{category}</h3>
              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <div key={skill.id}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
