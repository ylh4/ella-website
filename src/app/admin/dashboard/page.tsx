import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import Mascot from "@/components/decorations/Mascot";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let bookCount = 0, poemCount = 0, artworkCount = 0, videoCount = 0, blogCount = 0;

  try {
    [bookCount, poemCount, artworkCount, videoCount, blogCount] =
      await Promise.all([
        prisma.book.count(),
        prisma.poem.count(),
        prisma.artwork.count(),
        prisma.video.count(),
        prisma.blogPost.count(),
      ]);
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
  }

  const stats = [
    { label: "Books", count: bookCount, href: "/admin/books", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { label: "Poems", count: poemCount, href: "/admin/poems", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
    { label: "Artwork", count: artworkCount, href: "/admin/artwork", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Videos", count: videoCount, href: "/admin/videos", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { label: "Blog Posts", count: blogCount, href: "/admin/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  ];

  const quickActions = [
    { label: "New Book", href: "/admin/books/new" },
    { label: "New Poem", href: "/admin/poems/new" },
    { label: "New Artwork", href: "/admin/artwork/new" },
    { label: "New Video", href: "/admin/videos/new" },
    { label: "New Blog Post", href: "/admin/blog/new" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Mascot variant="waving" size="sm" />
        <div>
          <h1 className="text-2xl font-bold font-display text-lavender-800">
            Dashboard
          </h1>
          <p className="text-lavender-600">Welcome back!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="text-center hover:shadow-lg transition-shadow group">
              <CardBody className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center text-lavender-500 group-hover:bg-lavender-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-lavender-700">
                  {stat.count}
                </p>
                <p className="text-sm text-lavender-500">{stat.label}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-bold font-display text-lavender-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardBody className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center text-lavender-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="font-medium text-lavender-800">
                  {action.label}
                </span>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
