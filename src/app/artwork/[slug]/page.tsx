import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await prisma.artwork.findUnique({ where: { slug } });
  if (!artwork) return { title: "Artwork Not Found" };
  return {
    title: artwork.title,
    description: artwork.description || `Artwork by Ella: ${artwork.title}`,
  };
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await prisma.artwork.findUnique({
    where: { slug, publishedAt: { not: null } },
  });

  if (!artwork) notFound();

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto py-8">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-contain bg-lavender-50"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-lavender-800 mb-3">
          {artwork.title}
        </h1>
        {artwork.medium && (
          <Badge className="mb-4">{artwork.medium}</Badge>
        )}
        {artwork.description && (
          <p className="text-lg text-lavender-600 mt-4">
            {artwork.description}
          </p>
        )}
      </article>
    </PublicLayout>
  );
}
