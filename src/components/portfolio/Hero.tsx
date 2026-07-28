import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Profile } from "@prisma/client";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-light animate-fade-in-up">
          Hello, I&apos;m
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {profile.name}
        </h1>
        <h2 className="mb-6 text-2xl font-medium text-muted sm:text-3xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {profile.title}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {profile.tagline}
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#contact"
            className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="rounded-full border border-border px-8 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent-light"
          >
            View My Work
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {profile.location && (
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {profile.location}
            </span>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail size={16} /> {profile.email}
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
              <Github size={16} /> GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted">
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
