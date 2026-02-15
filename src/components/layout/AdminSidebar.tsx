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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cream rounded-xl shadow-md text-lavender-700"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-cream border-r border-lavender-100 flex flex-col transition-transform lg:translate-x-0",
          collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-6 border-b border-lavender-100">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Mascot variant="happy" size="sm" />
            <span className="font-display font-bold text-lg text-lavender-800">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setCollapsed(true)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-lavender-100 text-lavender-800"
                  : "text-lavender-600 hover:bg-lavender-50 hover:text-lavender-800"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-lavender-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-lavender-600 hover:bg-lavender-50"
          >
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/20"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
