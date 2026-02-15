import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {};

  // Check env vars (just presence, not values)
  checks.AUTH_SECRET_set = !!process.env.AUTH_SECRET;
  checks.NEXTAUTH_SECRET_set = !!process.env.NEXTAUTH_SECRET;
  checks.DATABASE_URL_set = !!process.env.DATABASE_URL;
  checks.NODE_ENV = process.env.NODE_ENV;

  // Check database connection
  try {
    const userCount = await prisma.user.count();
    checks.db_connected = true;
    checks.user_count = userCount;
  } catch (error) {
    checks.db_connected = false;
    checks.db_error = error instanceof Error ? error.message : String(error);
  }

  // Check if users exist (emails only, no sensitive data)
  try {
    const users = await prisma.user.findMany({
      select: { email: true, name: true },
    });
    checks.users = users;
  } catch (error) {
    checks.users_error = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json(checks);
}
