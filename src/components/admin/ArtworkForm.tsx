"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import ImageUploader from "./ImageUploader";
import AdminForm from "./AdminForm";

interface ArtworkFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    medium: string | null;
    featured: boolean;
    publishedAt: string | null;
  };
}

export default function ArtworkForm({ initialData }: ArtworkFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [medium, setMedium] = useState(initialData?.medium || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.slice(0, 16) || ""
  );

  const isEdit = !!initialData;

  return (
    <AdminForm
      apiPath={isEdit ? `/api/artwork/${initialData.id}` : "/api/artwork"}
      method={isEdit ? "PUT" : "POST"}
      redirectPath="/admin/artwork"
      getData={() => ({
        title,
        description: description || undefined,
        imageUrl,
        medium: medium || undefined,
        featured,
        publishedAt: publishedAt || null,
      })}
    >
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Artwork title"
        required
      />
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Image
        </label>
        <ImageUploader value={imageUrl} onChange={setImageUrl} />
      </div>
      <Textarea
        id="description"
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe this artwork"
      />
      <Input
        id="medium"
        label="Medium (optional)"
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
        placeholder="e.g., Watercolor, Acrylic, Colored Pencil"
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
