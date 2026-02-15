import BookForm from "@/components/admin/BookForm";

export default function NewBookPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        New Book
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <BookForm />
      </div>
    </div>
  );
}
