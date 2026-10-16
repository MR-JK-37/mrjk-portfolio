import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { assertSameOrigin, checkRateLimit, clientIp, verifySession } from "@/lib/security";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]); const maxBytes = 8 * 1024 * 1024;
export async function POST(request: Request) {
  if (!(await assertSameOrigin())) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const token = (await cookies()).get("mrjki_session")?.value; if (!(await verifySession(token))) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  if (!checkRateLimit(`upload:${await clientIp()}`, 12, 60 * 60_000).allowed) return NextResponse.json({ message: "Upload rate limit reached." }, { status: 429 });
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME; const apiKey = process.env.CLOUDINARY_API_KEY; const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ message: "Cloudinary credentials are missing. Upload aborted; no local fallback exists." }, { status: 503 });
  const data = await request.formData(); const file = data.get("file"); if (!(file instanceof File) || !allowed.has(file.type) || file.size > maxBytes) return NextResponse.json({ message: "Use JPEG, PNG, WebP or AVIF up to 8 MB." }, { status: 400 });
  const timestamp = Math.floor(Date.now() / 1000); const folder = "mrjki-portfolio/memories"; const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const upstream = new FormData(); upstream.set("file", file); upstream.set("api_key", apiKey); upstream.set("timestamp", String(timestamp)); upstream.set("folder", folder); upstream.set("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: upstream }); const result = await response.json() as { secure_url?: string; public_id?: string; width?: number; height?: number; error?: { message?: string } };
  if (!response.ok || !result.secure_url?.startsWith("https://res.cloudinary.com/")) return NextResponse.json({ message: result.error?.message ?? "Cloudinary rejected the upload." }, { status: 502 });
  const proof = await fetch(result.secure_url, { method: "HEAD" }); if (!proof.ok) return NextResponse.json({ message: "Cloudinary returned a URL, but the asset could not be verified." }, { status: 502 });
  return NextResponse.json({ url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height, verifiedStatus: proof.status });
}
