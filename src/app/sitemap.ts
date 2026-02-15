import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ella-website-azure.vercel.app";

  let books: { slug: string; updatedAt: Date }[] = [];
  let poems: { slug: string; updatedAt: Date }[] = [];
  let artworks: { slug: string; updatedAt: Date }[] = [];
  let videos: { slug: string; updatedAt: Date }[] = [];
  let blogPosts: { slug: string; updatedAt: Date }[] = [];

  try {
    [books, poems, artworks, videos, blogPosts] = await Promise.all([
      prisma.book.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.poem.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.artwork.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.video.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch (error) {
    console.error("Failed to fetch sitemap data:", error);
  }

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/books`, lastModified: new Date() },
    { url: `${baseUrl}/poems`, lastModified: new Date() },
    { url: `${baseUrl}/artwork`, lastModified: new Date() },
    { url: `${baseUrl}/videos`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];

  const dynamicPages = [
    ...books.map((b) => ({
      url: `${baseUrl}/books/${b.slug}`,
      lastModified: b.updatedAt,
    })),
    ...poems.map((p) => ({
      url: `${baseUrl}/poems/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...artworks.map((a) => ({
      url: `${baseUrl}/artwork/${a.slug}`,
      lastModified: a.updatedAt,
    })),
    ...videos.map((v) => ({
      url: `${baseUrl}/videos/${v.slug}`,
      lastModified: v.updatedAt,
    })),
    ...blogPosts.map((bp) => ({
      url: `${baseUrl}/blog/${bp.slug}`,
      lastModified: bp.updatedAt,
    })),
  ];

  return [...staticPages, ...dynamicPages];
}
