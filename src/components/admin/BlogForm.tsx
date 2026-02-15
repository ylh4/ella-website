"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import ImageUploader from "./ImageUploader";
import RichEditor from "./RichEditor";
import AdminForm from "./AdminForm";

interface BlogFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    tags: string[];
    featured: boolean;
    publishedAt: string | null;
  };
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || ""
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.slice(0, 16) || ""
  );

  const isEdit = !!initialData;

  return (
    <AdminForm
      apiPath={isEdit ? `/api/blog/${initialData.id}` : "/api/blog"}
      method={isEdit ? "PUT" : "POST"}
      redirectPath="/admin/blog"
      getData={() => ({
        title,
        content,
        excerpt: excerpt || undefined,
        coverImage: coverImage || undefined,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured,
        publishedAt: publishedAt || null,
      })}
    >
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog post title"
        required
      />
      <Input
        id="excerpt"
        label="Excerpt (optional)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Short summary for cards and previews"
      />
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Cover Image (optional)
        </label>
        <ImageUploader value={coverImage} onChange={setCoverImage} />
      </div>
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Content
        </label>
        <RichEditor content={content} onChange={setContent} />
      </div>
      <Input
        id="tags"
        label="Tags (comma separated)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="e.g., writing, art, tips"
      />
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded border-lavender-300 text-lavender-600 focus:ring-lavender-500"
          />
          <span className="text-sm text-lavender-700">Featured</span>
        </label>
        <Input
          id="publishedAt"
          label="Publish Date"
          type="datetime-local"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="max-w-xs"
        />
      </div>
    </AdminForm>
  );
}
