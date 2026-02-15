import { SkeletonCard } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        <div className="animate-pulse bg-lavender-200/60 h-10 w-48 mx-auto rounded-xl mb-3" />
        <div className="animate-pulse bg-lavender-200/60 h-5 w-80 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
