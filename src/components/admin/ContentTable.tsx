"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  publishedAt: string | null;
  featured: boolean;
  createdAt: string;
}

interface ContentTableProps {
  items: ContentItem[];
  section: string;
  apiPath: string;
}

export default function ContentTable({
  items,
  section,
  apiPath,
}: ContentTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/${apiPath}/${deleteId}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  return (
    <>
      <div className="bg-cream rounded-2xl shadow-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-lavender-100">
                <th className="text-left px-6 py-3 text-sm font-medium text-lavender-600">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-lavender-600">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-lavender-600">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-lavender-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-lavender-50 hover:bg-lavender-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lavender-800">
                        {item.title}
                      </span>
                      {item.featured && (
                        <Badge variant="filled">Featured</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={item.publishedAt ? "filled" : "outlined"}
                      className={
                        item.publishedAt
                          ? "bg-green-100 text-green-800"
                          : "border-yellow-300 text-yellow-700"
                      }
                    >
                      {item.publishedAt ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-lavender-600">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/${section}/${item.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteId(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-lavender-100">
          {items.map((item) => (
            <div key={item.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-lavender-800">
                  {item.title}
                </span>
                <Badge
                  variant={item.publishedAt ? "filled" : "outlined"}
                  className={
                    item.publishedAt
                      ? "bg-green-100 text-green-800"
                      : "border-yellow-300 text-yellow-700"
                  }
                >
                  {item.publishedAt ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/${section}/${item.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => setDeleteId(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-lavender-500">
            No items yet. Create your first one!
          </div>
        )}
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete"
      >
        <p className="text-lavender-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            loading={deleting}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
