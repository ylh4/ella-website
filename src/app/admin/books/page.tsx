import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = 'force-dynamic';

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-lavender-800">
          Books
        </h1>
        <Link href="/admin/books/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <ContentTable
        items={books.map((b) => ({
          ...b,
          publishedAt: b.publishedAt?.toISOString() ?? null,
          createdAt: b.createdAt.toISOString(),
        }))}
        section="books"
        apiPath="books"
      />
    </div>
  );
}
