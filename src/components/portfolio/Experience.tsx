import type { Experience } from "@prisma/client";
import { formatDate } from "@/lib/utils";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative mb-12 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2">
                <div className="h-2 w-2 rounded-full bg-accent" />
              </div>

              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/50">
                  <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light">
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate || "")}
                  </span>
                  <h3 className="mb-1 text-lg font-semibold">{exp.role}</h3>
                  <p className="mb-1 text-sm text-accent-light">
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
