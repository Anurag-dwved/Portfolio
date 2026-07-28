"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import type { Profile } from "@prisma/client";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <p className="mt-4 text-muted">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone || "—", href: profile.phone ? `tel:${profile.phone}` : undefined },
              { icon: MapPin, label: "Location", value: profile.location || "—" },
              { icon: Github, label: "GitHub", value: "View Profile", href: profile.github || undefined },
              { icon: Linkedin, label: "LinkedIn", value: "Connect", href: profile.linkedin || undefined },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <item.icon className="text-accent-light" size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-medium transition-colors hover:text-accent-light">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-2xl border border-border bg-surface-light p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const subject = encodeURIComponent(`Portfolio Contact from ${data.get("name")}`);
              const body = encodeURIComponent(String(data.get("message")));
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            }}
          >
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-light"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
