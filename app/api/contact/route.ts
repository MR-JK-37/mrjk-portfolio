import { NextResponse } from "next/server";
import { z } from "zod";
import { assertSameOrigin, checkRateLimit, clientIp, sanitizeText } from "@/lib/security";

const contactSchema = z.object({ name: z.string().min(2).max(80), email: z.email().max(160), message: z.string().min(20).max(2000), website: z.string().max(0).optional().default("") });

export async function POST(request: Request) {
  if (!(await assertSameOrigin())) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const limit = checkRateLimit(`contact:${await clientIp()}`, 4, 15 * 60_000);
  if (!limit.allowed) return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 });
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Please check each field and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Message accepted." });
  const apiKey = process.env.RESEND_API_KEY; const to = process.env.CONTACT_TO_EMAIL; const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ message: "Contact delivery is not configured yet. Please use the listed email once supplied." }, { status: 503 });
  const clean = { name: sanitizeText(parsed.data.name), email: sanitizeText(parsed.data.email), message: sanitizeText(parsed.data.message) };
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: clean.email, subject: `Portfolio message from ${clean.name}`, text: clean.message }) });
  if (!response.ok) return NextResponse.json({ message: "Delivery failed. Please try again later." }, { status: 502 });
  return NextResponse.json({ message: "Message sent." });
}
