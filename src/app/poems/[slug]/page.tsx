import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Star from "@/components/decorations/Star";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const poem = await prisma.poem.findUnique({ where: { slug } });
  if (!poem) return { title: "Poem Not Found" };
  return {
    title: poem.title,
    description: `A poem by Ella: ${poem.title}`,
  };
}

export default async function PoemDetailPage({ params }: Props) {
  const { slug } = await params;
  const poem = await prisma.poem.findUnique({
    where: { slug, publishedAt: { not: null } },
  });

  if (!poem) notFound();

  return (
    <PublicLayout>
      <article className="max-w-2xl mx-auto py-8 text-center relative">
        <div className="absolute top-0 right-0 opacity-30">
          <Star size="lg" delay="0s" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-20">
          <Star size="md" delay="1s" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-lavender-800 mb-8">
          {poem.title}
        </h1>
        <div className="text-lg text-lavender-700 leading-relaxed italic whitespace-pre-line">
          {poem.content}
        </div>
      </article>
    </PublicLayout>
  );
}
