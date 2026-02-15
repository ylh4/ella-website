import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

export const poemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

export const artworkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Image is required"),
  medium: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeUrl: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});
