import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  if (req.auth) return NextResponse.next();

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/admin/:path*"],
};
