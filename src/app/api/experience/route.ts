import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const experience = await prisma.experience.create({ data: body });
  return NextResponse.json(experience, { status: 201 });
}
