import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@prisma/client";
import { parseTechStack } from "@/lib/utils";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <p className="mt-4 text-muted">A selection of my recent work</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="relative h-48 bg-gradient-to-br from-accent/10 to-purple-500/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl font-bold text-accent/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {project.featured && (
                  <span className="absolute top-4 right-4 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-light">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-accent-light transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {parseTechStack(project.techStack).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-accent-light transition-colors hover:text-accent"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
