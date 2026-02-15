import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, handleApiError, generateUniqueSlug } from "@/lib/api-helpers";
import { artworkSchema } from "@/lib/validations";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const artwork = await prisma.artwork.findUnique({ where: { id } });
    if (!artwork) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(artwork);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = artworkSchema.parse(body);
    const slug = await generateUniqueSlug(parsed.title, "artwork", id);

    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...parsed,
        slug,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      },
    });

    return NextResponse.json(artwork);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.artwork.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
