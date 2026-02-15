import PublicLayout from "@/components/layout/PublicLayout";
import Mascot from "@/components/decorations/Mascot";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Mascot variant="happy" size="lg" className="mb-6 opacity-60" />
        <h1 className="text-6xl font-bold font-display text-lavender-300 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-display font-bold text-lavender-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-lavender-600 mb-8 max-w-md">
          Oops! The page you&apos;re looking for seems to have wandered off.
          Let&apos;s get you back home!
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </PublicLayout>
  );
}
