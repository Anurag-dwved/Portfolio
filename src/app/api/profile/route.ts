import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

// GET profile
export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

// UPDATE profile
export async function PUT(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();

  const existing = await prisma.profile.findFirst();

  const profileData = {
    name: body.name,
    title: body.title,
    tagline: body.tagline,
    bio: body.bio,
    email: body.email,
    phone: body.phone,
    location: body.location,
    github: body.github,
    linkedin: body.linkedin,
    twitter: body.twitter,
    resumeUrl: body.resumeUrl,
    avatarUrl: body.avatarUrl,
  };

  if (!existing) {
    const profile = await prisma.profile.create({
      data: profileData,
    });

    return NextResponse.json(profile);
  }

  const profile = await prisma.profile.update({
    where: { id: existing.id },
    data: profileData,
  });

  return NextResponse.json(profile);
}