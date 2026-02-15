import ArtworkForm from "@/components/admin/ArtworkForm";

export default function NewArtworkPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        New Artwork
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <ArtworkForm />
      </div>
    </div>
  );
}
