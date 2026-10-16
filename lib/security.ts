import { headers } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + windowMs }); return { allowed: true, remaining: limit - 1 }; }
  current.count += 1;
  return { allowed: current.count <= limit, remaining: Math.max(0, limit - current.count) };
}

export function sanitizeText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/[\u0000-\u001F\u007F]/g, " ").trim();
}

export async function assertSameOrigin() {
  const incoming = await headers();
  const origin = incoming.get("origin");
  const host = incoming.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

function sessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return secret;
}

export async function createSession() {
  const payload = Buffer.from(JSON.stringify({ role: "admin", exp: Date.now() + 2 * 60 * 60_000, jti: crypto.randomUUID() })).toString("base64url");
  const signature = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export async function verifySession(token?: string) {
  if (!token) return false;
  try { const [payload, signature] = token.split("."); if (!payload || !signature) return false; const expected = createHmac("sha256", sessionSecret()).update(payload).digest(); const received = Buffer.from(signature, "base64url"); if (received.length !== expected.length || !timingSafeEqual(received, expected)) return false; const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { role?: string; exp?: number }; return data.role === "admin" && typeof data.exp === "number" && data.exp > Date.now(); } catch { return false; }
}

export async function clientIp() {
  const incoming = await headers();
  return incoming.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
