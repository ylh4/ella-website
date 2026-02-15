import PublicLayout from "@/components/layout/PublicLayout";
import PageHeader from "@/components/ui/PageHeader";
import VideoCard from "@/components/content/VideoCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Ella's YouTube videos.",
};

export default async function VideosPage() {
  let videos: Awaited<ReturnType<typeof prisma.video.findMany>> = [];
  try {
    videos = await prisma.video.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }

  return (
    <PublicLayout>
      <PageHeader
        title="My Videos"
        subtitle="Watch my creative adventures on YouTube"
      />
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lavender-500 py-12">
          No videos published yet. Check back soon!
        </p>
      )}
    </PublicLayout>
  );
}
