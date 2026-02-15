import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  const message =
    error instanceof Error ? error.message : "Internal server error";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function generateUniqueSlug(
  title: string,
  model: "book" | "poem" | "artwork" | "video" | "blogPost",
  existingId?: string
) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let counter = 1;

  while (true) {
    const where: Record<string, unknown> = { slug };
    if (existingId) {
      where.id = { not: existingId };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (prisma[model] as any).findFirst({ where });
    if (!existing) break;
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}
