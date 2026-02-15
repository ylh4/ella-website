"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import ImageUploader from "./ImageUploader";
import RichEditor from "./RichEditor";
import AdminForm from "./AdminForm";

interface BookFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content: string | null;
    coverImage: string | null;
    featured: boolean;
    publishedAt: string | null;
  };
}

export default function BookForm({ initialData }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.slice(0, 16) || ""
  );

  const isEdit = !!initialData;

  return (
    <AdminForm
      apiPath={isEdit ? `/api/books/${initialData.id}` : "/api/books"}
      method={isEdit ? "PUT" : "POST"}
      redirectPath="/admin/books"
      getData={() => ({
        title,
        description,
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
        placeholder="Book title"
        required
      />
      <Textarea
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description of the book"
        required
      />
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Cover Image
        </label>
        <ImageUploader value={coverImage} onChange={setCoverImage} />
      </div>
      <div>
        <label className="block text-sm font-medium text-lavender-800 mb-1">
          Content
        </label>
        <RichEditor content={content} onChange={setContent} />
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
