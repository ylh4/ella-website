import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { extractYouTubeId } from "@/lib/utils";

interface VideoCardProps {
  title: string;
  slug: string;
  youtubeUrl: string;
  category?: string | null;
}

export default function VideoCard({
  title,
  slug,
  youtubeUrl,
  category,
}: VideoCardProps) {
  const videoId = extractYouTubeId(youtubeUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <Link href={`/videos/${slug}`}>
      <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-lavender-300 to-lavender-500" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-lavender-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <CardBody>
          <h3 className="font-display font-bold text-lg text-lavender-800 mb-2">
            {title}
          </h3>
          {category && <Badge>{category}</Badge>}
        </CardBody>
      </Card>
    </Link>
  );
}
