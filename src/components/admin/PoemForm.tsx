"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import ImageUploader from "./ImageUploader";
import AdminForm from "./AdminForm";

interface PoemFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    coverImage: string | null;
    featured: boolean;
    publishedAt: string | null;
  };
}

export default function PoemForm({ initialData }: PoemFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.slice(0, 16) || ""
  );

  const isEdit = !!initialData;

  return (
    <AdminForm
      apiPath={isEdit ? `/api/poems/${initialData.id}` : "/api/poems"}
      method={isEdit ? "PUT" : "POST"}
      redirectPath="/admin/poems"
      getData={() => ({
        title,
        content,
        coverImage: coverImage || undefined,
        featured,
        publishedAt: publishedAt || null,
      })}
    >
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Poem title"
        required
      />
      <Textarea
        id="content"
        label="Poem Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your poem here... (line breaks will be preserved)"
        className="min-h-[300px] font-serif italic"
        required
      />
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Cover Image (optional)
        </label>
        <ImageUploader value={coverImage} onChange={setCoverImage} />
      </div>
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
