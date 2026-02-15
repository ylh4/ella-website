import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-lavender-50">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
