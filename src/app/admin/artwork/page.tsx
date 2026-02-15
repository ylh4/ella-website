import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = 'force-dynamic';

export default async function AdminArtworkPage() {
  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-lavender-800">
          Artwork
        </h1>
        <Link href="/admin/artwork/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <ContentTable
        items={artworks.map((a) => ({
          ...a,
          publishedAt: a.publishedAt?.toISOString() ?? null,
          createdAt: a.createdAt.toISOString(),
        }))}
        section="artwork"
        apiPath="artwork"
      />
    </div>
  );
}
