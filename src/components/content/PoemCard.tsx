import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { truncateText } from "@/lib/utils";
import Star from "@/components/decorations/Star";

interface PoemCardProps {
  title: string;
  slug: string;
  content: string;
}

export default function PoemCard({ title, slug, content }: PoemCardProps) {
  return (
    <Link href={`/poems/${slug}`}>
      <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-visible">
        <div className="absolute -top-2 -right-2 opacity-40">
          <Star size="sm" delay="0.3s" />
        </div>
        <CardBody className="pt-6">
          <h3 className="font-display font-bold text-lg text-lavender-800 mb-3">
            {title}
          </h3>
          <p className="text-sm text-lavender-600 italic whitespace-pre-line leading-relaxed">
            {truncateText(content, 150)}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}
