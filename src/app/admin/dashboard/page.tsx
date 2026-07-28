import { prisma } from "@/lib/db";
import Link from "next/link";
import { Award, Briefcase, ExternalLink, FolderKanban, Wrench } from "lucide-react";

async function getStats() {
  const [projects, certificates, skills, experiences] = await Promise.all([
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.skill.count(),
    prisma.experience.count(),
  ]);
  return { projects, certificates, skills, experiences };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Projects", count: stats.projects, href: "/admin/projects", icon: FolderKanban, color: "text-blue-400" },
    { label: "Certificates", count: stats.certificates, href: "/admin/certificates", icon: Award, color: "text-green-400" },
    { label: "Skills", count: stats.skills, href: "/admin/skills", icon: Wrench, color: "text-purple-400" },
    { label: "Experience", count: stats.experiences, href: "/admin/experience", icon: Briefcase, color: "text-orange-400" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted">Manage your portfolio content</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-accent lg:flex"
        >
          <ExternalLink size={16} /> View Portfolio
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <card.icon className={card.color} size={24} />
              <span className="text-3xl font-bold">{card.count}</span>
            </div>
            <p className="text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light">
            Add Project
          </Link>
          <Link href="/admin/certificates" className="rounded-lg border border-border px-4 py-2 text-sm hover:border-accent">
            Add Certificate
          </Link>
          <Link href="/admin/profile" className="rounded-lg border border-border px-4 py-2 text-sm hover:border-accent">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
