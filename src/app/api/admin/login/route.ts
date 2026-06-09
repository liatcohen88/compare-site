import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_DAYS,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password?: string };
    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
