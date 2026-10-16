import { NextResponse } from "next/server";
import { assertSameOrigin } from "@/lib/security";
export async function POST() { if (!(await assertSameOrigin())) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 }); const response = NextResponse.json({ message: "Signed out." }); response.cookies.set("mrjki_session", "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 }); return response; }
