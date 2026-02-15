import PublicLayout from "@/components/layout/PublicLayout";
import Mascot from "@/components/decorations/Mascot";
import Star from "@/components/decorations/Star";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Ella (Elnatan Lemma), young author and creator.",
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto py-12 relative">
        <div className="absolute top-0 right-0 opacity-30 hidden md:block">
          <Star size="lg" delay="0s" />
        </div>

        <div className="text-center mb-12">
          <Mascot variant="waving" size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-display text-lavender-800 mb-4">
            About Me
          </h1>
          <p className="text-lg text-lavender-600">
            Hi! I&apos;m Ella (Elnatan Lemma)
          </p>
        </div>

        <div className="space-y-6 text-lavender-700 leading-relaxed">
          <p className="text-lg">
            I&apos;m an 11-year-old creator who loves writing books, composing poems,
            creating artwork, making YouTube videos, and sharing my thoughts on my
            blog. Welcome to my creative world!
          </p>

          <p>
            I started writing stories when I was 7 years old, and since then, I
            haven&apos;t stopped! My favorite things to write about are magical
            adventures, friendship, and the wonders of nature.
          </p>

          <p>
            When I&apos;m not writing, you can find me painting with watercolors,
            filming creative videos, or reading my favorite books. I believe
            that everyone has a story to tell, and I love sharing mine with the
            world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Favorite Color", value: "Purple" },
            { label: "Favorite Book", value: "Matilda" },
            { label: "Dream Job", value: "Author" },
            { label: "Fun Fact", value: "I have a cat!" },
          ].map((fact) => (
            <div
              key={fact.label}
              className="bg-cream rounded-2xl p-4 text-center shadow-sm"
            >
              <p className="text-xs text-lavender-500 mb-1">{fact.label}</p>
              <p className="font-display font-bold text-lavender-800">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
