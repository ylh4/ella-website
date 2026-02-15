"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { adminNavLinks } from "@/lib/constants";
import Mascot from "@/components/decorations/Mascot";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-cream border-b border-lavender-100 sticky top-0 z-40">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-lavender-600 hover:bg-lavender-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Mascot variant="happy" size="sm" />
            <span className="font-display font-bold text-lg text-lavender-800">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-lavender-100 text-lavender-700 hover:bg-lavender-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Desktop tabs */}
      <nav className="hidden lg:flex px-4 lg:px-6 gap-1 overflow-x-auto">
        {adminNavLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-t-lg",
                isActive
                  ? "text-lavender-800"
                  : "text-lavender-500 hover:text-lavender-700 hover:bg-lavender-50"
              )}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-lavender-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="lg:hidden absolute left-0 right-0 z-40 bg-cream border-b border-lavender-100 shadow-lg px-2 py-2 space-y-0.5">
            {adminNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-lavender-100 text-lavender-800"
                      : "text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
}
