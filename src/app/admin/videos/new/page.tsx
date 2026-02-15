import VideoForm from "@/components/admin/VideoForm";

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-lavender-800 mb-6">
        New Video
      </h1>
      <div className="bg-cream rounded-2xl shadow-sm p-6">
        <VideoForm />
      </div>
    </div>
  );
}
