"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import Badge from "@/components/ui/Badge";
import { extractYouTubeId } from "@/lib/utils";
import { useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoData {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string | null;
  category: string | null;
}

export default function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug }) => {
      fetch(`/api/videos?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setVideo(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="animate-pulse bg-lavender-200/60 aspect-video rounded-2xl mb-6" />
          <div className="animate-pulse bg-lavender-200/60 h-8 w-1/2 rounded mb-4" />
          <div className="animate-pulse bg-lavender-200/60 h-4 w-3/4 rounded" />
        </div>
      </PublicLayout>
    );
  }

  if (!video) {
    return (
      <PublicLayout>
        <div className="text-center py-16">
          <p className="text-lavender-500">Video not found.</p>
        </div>
      </PublicLayout>
    );
  }

  const videoId = extractYouTubeId(video.youtubeUrl);

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto py-8">
        {videoId && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <LiteYouTubeEmbed id={videoId} title={video.title} />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-lavender-800 mb-3">
          {video.title}
        </h1>
        {video.category && (
          <Badge className="mb-4">{video.category}</Badge>
        )}
        {video.description && (
          <p className="text-lg text-lavender-600 mt-4 leading-relaxed">
            {video.description}
          </p>
        )}
      </article>
    </PublicLayout>
  );
}
