import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import Mascot from "@/components/decorations/Mascot";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [bookCount, poemCount, artworkCount, videoCount, blogCount] =
    await Promise.all([
      prisma.book.count(),
      prisma.poem.count(),
      prisma.artwork.count(),
      prisma.video.count(),
      prisma.blogPost.count(),
    ]);

  const stats = [
    { label: "Books", count: bookCount, href: "/admin/books" },
    { label: "Poems", count: poemCount, href: "/admin/poems" },
    { label: "Artwork", count: artworkCount, href: "/admin/artwork" },
    { label: "Videos", count: videoCount, href: "/admin/videos" },
    { label: "Blog Posts", count: blogCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Mascot variant="waving" size="sm" />
        <div>
          <h1 className="text-2xl font-bold font-display text-lavender-800">
            Dashboard
          </h1>
          <p className="text-lavender-600">Welcome back, Ella!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardBody>
                <p className="text-3xl font-bold text-lavender-700">
                  {stat.count}
                </p>
                <p className="text-sm text-lavender-500 mt-1">{stat.label}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-bold font-display text-lavender-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "New Book", href: "/admin/books/new" },
          { label: "New Poem", href: "/admin/poems/new" },
          { label: "New Artwork", href: "/admin/artwork/new" },
          { label: "New Video", href: "/admin/videos/new" },
          { label: "New Blog Post", href: "/admin/blog/new" },
        ].map((action) => (
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
