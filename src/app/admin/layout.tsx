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
      <div className="min-h-screen bg-lavender-50 flex flex-col">
        <AdminSidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
