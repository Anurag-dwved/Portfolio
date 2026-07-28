import type { Profile } from "@prisma/client";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20" />
            <div className="relative flex h-full items-center justify-center rounded-2xl border border-border bg-surface">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-accent/10 text-5xl font-bold text-accent-light">
                  {profile.name.charAt(0)}
                </div>
                <p className="text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">{profile.title}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-6 text-lg leading-relaxed text-muted">{profile.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Email", value: profile.email },
                { label: "Location", value: profile.location || "—" },
                { label: "Phone", value: profile.phone || "—" },
                { label: "Status", value: "Available for work" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-surface p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
