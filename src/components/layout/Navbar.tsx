"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";
import Mascot from "@/components/decorations/Mascot";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-lavender-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Mascot variant="happy" size="sm" />
            <span className="font-display font-bold text-xl text-lavender-800">
              Ella&apos;s World
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-lavender-100 text-lavender-800"
                    : "text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-lavender-200 mx-1" />
            {session ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/admin"
                className="px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-lavender-600 hover:bg-lavender-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-lavender-100 text-lavender-800"
                    : "text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-lavender-100 my-2" />
            {session ? (
              <>
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="block w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
