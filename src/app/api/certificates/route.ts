import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const certificates = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(certificates);
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const certificate = await prisma.certificate.create({ data: body });
  return NextResponse.json(certificate, { status: 201 });
}
