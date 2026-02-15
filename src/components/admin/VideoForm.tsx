"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import AdminForm from "./AdminForm";

interface VideoFormProps {
  initialData?: {
    id: string;
    title: string;
    youtubeUrl: string;
    description: string | null;
    category: string | null;
    featured: boolean;
    publishedAt: string | null;
  };
}

export default function VideoForm({ initialData }: VideoFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.slice(0, 16) || ""
  );

  const isEdit = !!initialData;

  return (
    <AdminForm
      apiPath={isEdit ? `/api/videos/${initialData.id}` : "/api/videos"}
      method={isEdit ? "PUT" : "POST"}
      redirectPath="/admin/videos"
      getData={() => ({
        title,
        youtubeUrl,
        description: description || undefined,
        category: category || undefined,
        featured,
        publishedAt: publishedAt || null,
      })}
    >
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Video title"
        required
      />
      <Input
        id="youtubeUrl"
        label="YouTube URL"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        required
      />
      <Textarea
        id="description"
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe this video"
      />
      <Input
        id="category"
        label="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="e.g., Writing, Art, Vlog"
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
