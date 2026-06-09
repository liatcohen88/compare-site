// Uses Web Crypto API only - works in both Node and Edge runtimes
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "hashveli2026";
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ?? "default-secret-change-in-production-please";

export const SESSION_COOKIE = "hashveli_admin";
export const SESSION_TTL_DAYS = 7;

async function hash(input: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(ADMIN_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(input));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyPassword(input: string): boolean {
  if (!input || input.length !== ADMIN_PASSWORD.length) return false;
  // Constant-time comparison
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result |= input.charCodeAt(i) ^ ADMIN_PASSWORD.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${expiresAt}`;
  const signature = await hash(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expectedSig = await hash(payload);
  if (expectedSig !== signature) return false;
  const expiresAt = parseInt(payload, 10);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  return true;
}
