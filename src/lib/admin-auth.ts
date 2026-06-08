import crypto from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ?? "default-secret-change-in-production-please";

export const SESSION_COOKIE = "hashveli_admin";
export const SESSION_TTL_DAYS = 7;

function hash(input: string): string {
  return crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(input)
    .digest("hex");
}

export function verifyPassword(input: string): boolean {
  // Constant-time comparison
  const expected = Buffer.from(ADMIN_PASSWORD);
  const actual = Buffer.from(input);
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${expiresAt}`;
  const signature = hash(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (hash(payload) !== signature) return false;
  const expiresAt = parseInt(payload, 10);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  return true;
}
