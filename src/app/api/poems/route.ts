import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, handleApiError, generateUniqueSlug } from "@/lib/api-helpers";
import { poemSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");

    const where: Record<string, unknown> = {};
    if (!all) where.publishedAt = { not: null };
    if (featured === "true") where.featured = true;

    const poems = await prisma.poem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(poems);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = poemSchema.parse(body);
    const slug = await generateUniqueSlug(parsed.title, "poem");

    const poem = await prisma.poem.create({
      data: {
        ...parsed,
        slug,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      },
    });

    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
