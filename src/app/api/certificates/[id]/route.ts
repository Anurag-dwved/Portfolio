import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const certificate = await prisma.certificate.update({ where: { id }, data: body });
  return NextResponse.json(certificate);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.certificate.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
