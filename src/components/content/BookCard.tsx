import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import { truncateText } from "@/lib/utils";

interface BookCardProps {
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
}

export default function BookCard({
  title,
  slug,
  description,
  coverImage,
}: BookCardProps) {
  return (
    <Link href={`/books/${slug}`}>
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
          <div className="h-48 bg-gradient-to-br from-lavender-200 to-lavender-400 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <CardBody>
          <h3 className="font-display font-bold text-lg text-lavender-800 mb-2">
            {title}
          </h3>
          <p className="text-sm text-lavender-600">
            {truncateText(description, 120)}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}
