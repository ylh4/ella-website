import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        New Blog Post
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <BlogForm />
      </div>
    </div>
  );
}
