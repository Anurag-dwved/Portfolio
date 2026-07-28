import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [profile, skills, projects, certificates, experiences] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
  ]);

  return NextResponse.json({
    profile,
    skills,
    projects,
    certificates,
    experiences,
  });
}
