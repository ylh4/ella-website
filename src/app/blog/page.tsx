import PublicLayout from "@/components/layout/PublicLayout";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/content/BlogCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog",
  description: "Read Ella's latest blog posts.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  return (
    <PublicLayout>
      <PageHeader
        title="My Blog"
        subtitle="Thoughts, stories, and creative adventures"
      />
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              publishedAt={post.publishedAt!}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lavender-500 py-12">
          No blog posts yet. Check back soon!
        </p>
      )}
    </PublicLayout>
  );
}
