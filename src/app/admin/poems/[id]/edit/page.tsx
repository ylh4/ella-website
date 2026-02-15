"use client";

import { useEffect, useState } from "react";
import PoemForm from "@/components/admin/PoemForm";
import { use } from "react";

export default function EditPoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/poems/${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-lavender-200/60 rounded w-1/3" />
        <div className="h-64 bg-lavender-200/60 rounded-2xl" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        Edit Poem
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <PoemForm initialData={data!} />
      </div>
    </div>
  );
}
