import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || `Blog post by Ella: ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, publishedAt: { not: null } },
  });

  if (!post) notFound();

  const readingTime = calculateReadingTime(post.content);

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto py-8">
        {post.coverImage && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-lavender-500 mb-3">
          <span>{formatDate(post.publishedAt!)}</span>
          <span>&middot;</span>
          <span>{readingTime} min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-lavender-800 mb-4">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PublicLayout>
  );
}
