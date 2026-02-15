import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = 'force-dynamic';

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-lavender-800">
          Videos
        </h1>
        <Link href="/admin/videos/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <ContentTable
        items={videos.map((v) => ({
          ...v,
          publishedAt: v.publishedAt?.toISOString() ?? null,
          createdAt: v.createdAt.toISOString(),
        }))}
        section="videos"
        apiPath="videos"
      />
    </div>
  );
}
