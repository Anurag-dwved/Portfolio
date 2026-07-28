import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    const profile = await prisma.profile.create({ data: body });
    return NextResponse.json(profile);
  }

  const profile = await prisma.profile.update({
    where: { id: existing.id },
    data: body,
  });

  return NextResponse.json(profile);
}
