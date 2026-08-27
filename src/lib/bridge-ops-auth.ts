import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bfl_bridge_ops";
const COOKIE_VALUE = "bridge-ops-authenticated";

function password() {
  return process.env.BFL_BRIDGE_OPS_PASSWORD?.trim();
}

function signature(secret: string) {
  return createHmac("sha256", secret).update(COOKIE_VALUE).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
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

  return safeEqual(value, signature(secret));
}

export async function createBridgeOpsSession() {
  const secret = password();
  if (!secret) {
    throw new Error("Bridge ops password is not configured");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signature(secret), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/ops/bridges",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearBridgeOpsSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
