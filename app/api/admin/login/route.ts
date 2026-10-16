import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { assertSameOrigin, checkRateLimit, clientIp, createSession } from "@/lib/security";

const schema = z.object({ password: z.string().min(8).max(256) });
export async function POST(request: Request) {
  if (!(await assertSameOrigin())) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const key = `login:${await clientIp()}`; const limit = checkRateLimit(key, 5, 15 * 60_000);
  if (!limit.allowed) return NextResponse.json({ message: "Login locked for 15 minutes." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null)); const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!parsed.success || !hash || !(await compare(parsed.data.password, hash))) return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  const response = NextResponse.json({ message: "Authenticated." });
  response.cookies.set("mrjki_session", await createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 7200 });
  return response;
}
