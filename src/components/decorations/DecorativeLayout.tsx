import Star from "./Star";
import Cloud from "./Cloud";
import { ReactNode } from "react";

interface DecorativeLayoutProps {
  children: ReactNode;
}

export default function DecorativeLayout({
  children,
}: DecorativeLayoutProps) {
  return (
    <div className="relative">
      {/* Top-left decorations */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-30 hidden md:block">
        <Star size="sm" delay="0s" className="text-lavender-400" />
      </div>
      <div className="absolute top-12 left-16 pointer-events-none opacity-20 hidden md:block">
        <Star size="lg" delay="0.5s" className="text-lavender-300" />
      </div>

      {/* Top-right cloud */}
      <div className="absolute top-8 right-8 pointer-events-none opacity-40 hidden lg:block">
        <Cloud delay="1s" />
      </div>

      {/* Bottom-left cloud */}
      <div className="absolute bottom-16 left-4 pointer-events-none opacity-30 hidden lg:block">
        <Cloud delay="3s" />
      </div>

      {/* Bottom-right stars */}
      <div className="absolute bottom-8 right-12 pointer-events-none opacity-25 hidden md:block">
        <Star size="md" delay="1.5s" className="text-lavender-400" />
      </div>
      <div className="absolute bottom-20 right-4 pointer-events-none opacity-20 hidden md:block">
        <Star size="sm" delay="2s" className="text-lavender-300" />
      </div>

      {children}
    </div>
  );
}
