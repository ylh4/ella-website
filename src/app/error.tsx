"use client";

import Button from "@/components/ui/Button";
import Mascot from "@/components/decorations/Mascot";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <Mascot variant="happy" size="lg" className="mb-6 opacity-60" />
      <h1 className="text-3xl font-bold font-display text-lavender-800 mb-2">
        Something went wrong!
      </h1>
      <p className="text-lavender-600 mb-8 max-w-md">
        Don&apos;t worry, it happens sometimes. Let&apos;s try again!
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
