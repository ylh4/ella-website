import PublicLayout from "@/components/layout/PublicLayout";
import PageHeader from "@/components/ui/PageHeader";
import ArtworkCard from "@/components/content/ArtworkCard";
import Mascot from "@/components/decorations/Mascot";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Artwork",
  description: "Browse Ella's artwork gallery.",
};

export default async function ArtworkPage() {
  const artworks = await prisma.artwork.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <PublicLayout>
      <PageHeader
        title="My Artwork"
        subtitle="Colors, shapes, and imagination"
        decoration={<Mascot variant="painting" size="lg" />}
      />
      {artworks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} {...artwork} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lavender-500 py-12">
          No artwork published yet. Check back soon!
        </p>
      )}
    </PublicLayout>
  );
}
