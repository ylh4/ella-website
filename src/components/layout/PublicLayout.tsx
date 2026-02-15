import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBakery from "@/components/decorations/FloatingBakery";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingBakery />
      <Navbar />
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
