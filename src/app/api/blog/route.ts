import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, handleApiError, generateUniqueSlug } from "@/lib/api-helpers";
import { blogPostSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");

    const where: Record<string, unknown> = {};
    if (!all) where.publishedAt = { not: null };
    if (featured === "true") where.featured = true;

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
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
    const parsed = blogPostSchema.parse(body);
    const slug = await generateUniqueSlug(parsed.title, "blogPost");

    const post = await prisma.blogPost.create({
      data: {
        ...parsed,
        slug,
        tags: parsed.tags || [],
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
