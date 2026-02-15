import Mascot from "@/components/decorations/Mascot";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Mascot variant="happy" size="lg" className="animate-bounce-gentle" />
      <p className="text-lavender-500 text-sm animate-pulse">Loading...</p>
    </div>
  );
}
