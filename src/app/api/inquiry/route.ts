import {
  inquiryTypes,
  isInquiryTypeId,
} from "@/components/institutional/content/contact";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;

type RateBucket = { count: number; resetAt: number };

const globalRateState = globalThis as typeof globalThis & {
  __bflInquiryRateState?: Map<string, RateBucket>;
};

const rateState =
  globalRateState.__bflInquiryRateState ??
  (globalRateState.__bflInquiryRateState = new Map<string, RateBucket>());

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function allowRequest(key: string, now: number) {
  if (rateState.size > 1000) {
    for (const [bucketKey, bucket] of rateState) {
      if (bucket.resetAt <= now) rateState.delete(bucketKey);
    }
  }

  const current = rateState.get(key);
  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT) return false;

  current.count += 1;
  rateState.set(key, current);
  return true;
}

export async function POST(request: Request) {
  const receiver = process.env.BFL_INQUIRY_WEBHOOK_URL;

  if (!receiver) {
    return Response.json(
      {
        ok: false,
        message: "Direct inquiry submission is not configured on this deployment.",
      },
      { status: 503 },
    );
  }

  const now = Date.now();
  const key = clientKey(request);

  if (!allowRequest(key, now)) {
    return Response.json(
      {
        ok: false,
        message: "Too many inquiry attempts. Please wait before trying again.",
      },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      { ok: false, message: "The inquiry payload was not valid JSON." },
      { status: 400 },
    );
  }

  const honeypot = cleanText(body.website, 200);
  if (honeypot) {
    return Response.json({ ok: true });
  }

  const startedAt =
    typeof body.startedAt === "number" && Number.isFinite(body.startedAt)
      ? body.startedAt
      : 0;

  if (!startedAt || now - startedAt < 1200) {
    return Response.json(
      { ok: false, message: "The inquiry was submitted too quickly. Please try again." },
      { status: 400 },
    );
  }

  const type = cleanText(body.type, 40);
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254);
  const affiliation = cleanText(body.affiliation, 160);
  const desiredOutcome = cleanText(body.desiredOutcome, 300);
  const message = cleanText(body.message, 6000);
  const sourceContext = cleanText(body.sourceContext, 120) || "contact";

  if (!isInquiryTypeId(type)) {
    return Response.json(
      { ok: false, message: "Choose a valid reason for contact." },
      { status: 400 },
    );
  }

  if (name.length < 2) {
    return Response.json(
      { ok: false, message: "Please provide your name." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { ok: false, message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return Response.json(
      { ok: false, message: "Please provide a little more context in the message." },
      { status: 400 },
    );
  }

  const typeRecord = inquiryTypes.find((item) => item.id === type);

  const outbound = {
    schema: "bfl.inquiry.v1",
    receivedAt: new Date(now).toISOString(),
    inquiryType: type,
    inquiryLabel: typeRecord?.label ?? type,
    sourceContext,
    contact: {
      name,
      email,
      affiliation: affiliation || null,
    },
    desiredOutcome: desiredOutcome || null,
    message,
  };

  const token = process.env.BFL_INQUIRY_WEBHOOK_TOKEN;

  try {
    const response = await fetch(receiver, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(outbound),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          message: "The inquiry receiver did not accept the message. Please try again later.",
        },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      {
        ok: false,
        message: "The inquiry receiver could not be reached. Please try again later.",
      },
      { status: 502 },
    );
  }

  return Response.json(
    { ok: true, message: "Inquiry received." },
    {
      status: 200,
      headers: { "cache-control": "no-store" },
    },
  );
}
