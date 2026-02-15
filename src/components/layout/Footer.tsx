import Mascot from "@/components/decorations/Mascot";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-lavender-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <Mascot variant="happy" size="sm" />
          <p className="text-sm text-lavender-600">
            Made with love by Ella &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
