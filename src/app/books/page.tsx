import PublicLayout from "@/components/layout/PublicLayout";
import PageHeader from "@/components/ui/PageHeader";
import BookCard from "@/components/content/BookCard";
import Mascot from "@/components/decorations/Mascot";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Books",
  description: "Browse all books written by Ella.",
};

export default async function BooksPage() {
  let books: Awaited<ReturnType<typeof prisma.book.findMany>> = [];
  try {
    books = await prisma.book.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  return (
    <PublicLayout>
      <PageHeader
        title="My Books"
        subtitle="Stories and adventures from my imagination"
        decoration={<Mascot variant="reading" size="lg" />}
      />
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lavender-500 py-12">
          No books published yet. Check back soon!
        </p>
      )}
    </PublicLayout>
  );
}
