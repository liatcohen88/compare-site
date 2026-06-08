import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST() {
  const res = NextResponse.redirect(
    new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "https://hashveli.co.il"),
  );
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
