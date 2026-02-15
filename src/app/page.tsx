import PublicLayout from "@/components/layout/PublicLayout";
import DecorativeLayout from "@/components/decorations/DecorativeLayout";
import Mascot from "@/components/decorations/Mascot";
import Star from "@/components/decorations/Star";
import BookCard from "@/components/content/BookCard";
import PoemCard from "@/components/content/PoemCard";
import ArtworkCard from "@/components/content/ArtworkCard";
import VideoCard from "@/components/content/VideoCard";
import BlogCard from "@/components/content/BlogCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [books, poems, artworks, videos, blogPosts] = await Promise.all([
    prisma.book.findMany({
      where: { publishedAt: { not: null }, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.poem.findMany({
      where: { publishedAt: { not: null }, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.artwork.findMany({
      where: { publishedAt: { not: null }, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    prisma.video.findMany({
      where: { publishedAt: { not: null }, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 2,
    }),
    prisma.blogPost.findMany({
      where: { publishedAt: { not: null }, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <PublicLayout>
      <DecorativeLayout>
        {/* Hero */}
        <section className="text-center py-16 md:py-24">
          <div className="flex justify-center mb-6">
            <Mascot variant="waving" size="lg" className="animate-bounce-gentle" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-lavender-800 mb-4">
            Ella&apos;s Creative World
          </h1>
          <p className="text-xl text-lavender-600 max-w-2xl mx-auto mb-8">
            Welcome to my creative corner! I write books, poems, create artwork,
            make videos, and share my thoughts on my blog.
          </p>
          <div className="flex justify-center gap-3">
            <Star size="sm" delay="0s" />
            <Star size="md" delay="0.5s" />
            <Star size="sm" delay="1s" />
          </div>
        </section>

        {/* Featured Books */}
        {books.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-lavender-800">
                My Books
              </h2>
              <Link
                href="/books"
                className="text-sm text-lavender-600 hover:text-lavender-800 font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Poems */}
        {poems.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-lavender-800">
                Poems
              </h2>
              <Link
                href="/poems"
                className="text-sm text-lavender-600 hover:text-lavender-800 font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poems.map((poem) => (
                <PoemCard key={poem.id} {...poem} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Artwork */}
        {artworks.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-lavender-800">
                Artwork
              </h2>
              <Link
                href="/artwork"
                className="text-sm text-lavender-600 hover:text-lavender-800 font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Videos */}
        {videos.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-lavender-800">
                Videos
              </h2>
              <Link
                href="/videos"
                className="text-sm text-lavender-600 hover:text-lavender-800 font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Blog Posts */}
        {blogPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-lavender-800">
                Blog
              </h2>
              <Link
                href="/blog"
                className="text-sm text-lavender-600 hover:text-lavender-800 font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  {...post}
                  publishedAt={post.publishedAt!}
                />
              ))}
            </div>
          </section>
        )}
      </DecorativeLayout>
    </PublicLayout>
  );
}
