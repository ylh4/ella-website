import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

interface ArtworkCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  medium?: string | null;
}

export default function ArtworkCard({
  title,
  slug,
  imageUrl,
  medium,
}: ArtworkCardProps) {
  return (
    <Link href={`/artwork/${slug}`}>
      <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-display font-bold text-white text-lg">
              {title}
            </h3>
            {medium && (
              <Badge className="mt-1 bg-white/20 text-white border-none">
                {medium}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
