import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate, truncateText } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt: Date | string;
  tags: string[];
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  tags,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {coverImage ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-lavender-100 to-lavender-300 flex items-center justify-center">
            <svg className="w-16 h-16 text-lavender-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        )}
        <CardBody>
          <p className="text-xs text-lavender-500 mb-1">
            {formatDate(publishedAt)}
          </p>
          <h3 className="font-display font-bold text-lg text-lavender-800 mb-2">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-lavender-600 mb-3">
              {truncateText(excerpt, 120)}
            </p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outlined">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}
