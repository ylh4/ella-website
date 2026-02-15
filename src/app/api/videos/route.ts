import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, handleApiError, generateUniqueSlug } from "@/lib/api-helpers";
import { videoSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");
    const slug = searchParams.get("slug");

    if (slug) {
      const video = await prisma.video.findUnique({
        where: { slug, publishedAt: { not: null } },
      });
      if (!video) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(video);
    }

    const where: Record<string, unknown> = {};
    if (!all) where.publishedAt = { not: null };
    if (featured === "true") where.featured = true;

    const videos = await prisma.video.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
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
    const parsed = videoSchema.parse(body);
    const slug = await generateUniqueSlug(parsed.title, "video");

    const video = await prisma.video.create({
      data: {
        ...parsed,
        slug,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
