import PoemForm from "@/components/admin/PoemForm";

export default function NewPoemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        New Poem
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <PoemForm />
      </div>
    </div>
  );
}
