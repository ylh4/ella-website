import PublicLayout from "@/components/layout/PublicLayout";
import PageHeader from "@/components/ui/PageHeader";
import PoemCard from "@/components/content/PoemCard";
import Star from "@/components/decorations/Star";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Poems",
  description: "Read poems written by Ella.",
};

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <PublicLayout>
      <PageHeader
        title="My Poems"
        subtitle="Words from my heart"
        decoration={
          <div className="flex gap-2">
            <Star size="lg" delay="0s" />
            <Star size="sm" delay="0.5s" />
          </div>
        }
      />
      {poems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <PoemCard key={poem.id} {...poem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lavender-500 py-12">
          No poems published yet. Check back soon!
        </p>
      )}
    </PublicLayout>
  );
}
