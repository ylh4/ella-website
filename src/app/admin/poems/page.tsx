import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = 'force-dynamic';

export default async function AdminPoemsPage() {
  const poems = await prisma.poem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-lavender-800">
          Poems
        </h1>
        <Link href="/admin/poems/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <ContentTable
        items={poems.map((p) => ({
          ...p,
          publishedAt: p.publishedAt?.toISOString() ?? null,
          createdAt: p.createdAt.toISOString(),
        }))}
        section="poems"
        apiPath="poems"
      />
    </div>
  );
}
