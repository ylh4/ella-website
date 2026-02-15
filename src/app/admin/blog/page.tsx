import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-lavender-800">
          Blog Posts
        </h1>
        <Link href="/admin/blog/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <ContentTable
        items={posts.map((p) => ({
          ...p,
          publishedAt: p.publishedAt?.toISOString() ?? null,
          createdAt: p.createdAt.toISOString(),
        }))}
        section="blog"
        apiPath="blog"
      />
    </div>
  );
}
