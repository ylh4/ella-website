import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book) return { title: "Book Not Found" };
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await prisma.book.findUnique({
    where: { slug, publishedAt: { not: null } },
  });

  if (!book) notFound();

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto py-8">
        {book.coverImage && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-lavender-800 mb-4">
          {book.title}
        </h1>
        <p className="text-lg text-lavender-600 mb-8">{book.description}</p>
        {book.content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />
        )}
      </article>
    </PublicLayout>
  );
}
