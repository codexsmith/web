import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bfl_bridge_ops";
const COOKIE_PATH = "/ops/bridges";
const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function password() {
  return process.env.BFL_BRIDGE_OPS_PASSWORD?.trim();
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sessionSigningKey(secret: string) {
  return createHmac("sha256", secret)
    .update("boundary-first-bridge-ops-session-key-v1")
    .digest();
}

function sessionSignature(secret: string, issuedAt: string) {
  return createHmac("sha256", sessionSigningKey(secret))
    .update(`${SESSION_VERSION}.${issuedAt}`)
    .digest("hex");
}

function createSessionValue(secret: string, issuedAtMs = Date.now()) {
  const issuedAt = String(issuedAtMs);
  return `${SESSION_VERSION}.${issuedAt}.${sessionSignature(secret, issuedAt)}`;
}

function isValidSessionValue(value: string, secret: string, nowMs = Date.now()) {
  const [version, issuedAt, suppliedSignature, ...rest] = value.split(".");
  if (
    rest.length > 0 ||
    version !== SESSION_VERSION ||
    !/^\d+$/.test(issuedAt ?? "") ||
    !suppliedSignature
  ) {
    return false;
  }

  const issuedAtMs = Number(issuedAt);
  const ageMs = nowMs - issuedAtMs;
  if (
    !Number.isFinite(issuedAtMs) ||
    ageMs < 0 ||
    ageMs > SESSION_TTL_SECONDS * 1000
  ) {
    return false;
  }

  return safeEqual(suppliedSignature, sessionSignature(secret, issuedAt));
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL_SECONDS,
    priority: "high" as const,
  };
}

export function isBridgeOpsPassword(candidate: string) {
  const secret = password();
  if (!secret) return false;
  return safeEqual(candidate, secret);
}

export async function hasBridgeOpsSession() {
  const secret = password();
  if (!secret) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return false;

  return isValidSessionValue(value, secret);
}

export async function createBridgeOpsSession() {
  const secret = password();
  if (!secret) {
    throw new Error("Bridge ops password is not configured");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionValue(secret), cookieOptions());
}

export async function clearBridgeOpsSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
}
