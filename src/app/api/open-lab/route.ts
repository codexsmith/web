import {
  isOpenLabSubmissionType,
  participationContracts,
} from "@/components/institutional/content/openLab";
import { readOpenLabServerConfig } from "@/lib/open-lab-intake";

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 4;

type RateBucket = { count: number; resetAt: number };

const globalRateState = globalThis as typeof globalThis & {
  __bflOpenLabRateState?: Map<string, RateBucket>;
};

const rateState =
  globalRateState.__bflOpenLabRateState ??
  (globalRateState.__bflOpenLabRateState = new Map<string, RateBucket>());

const SUBMITTER_TYPES = new Set(["individual", "team", "organization", "anonymous"]);
const CONTACT_MODES = new Set(["reply_requested", "no_reply"]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanBoolean(value: unknown) {
  return value === true;
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

function parsePublicLinks(value: unknown) {
  if (typeof value !== "string") return [];
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8);

  const links: string[] = [];
  for (const line of lines) {
    try {
      const url = new URL(line);
      if (url.protocol !== "http:" && url.protocol !== "https:") return null;
      links.push(url.toString().slice(0, 1200));
    } catch {
      return null;
    }
  }
  return links;
}

function makeSubmissionId(now: number) {
  const date = new Date(now).toISOString().slice(0, 10).replaceAll("-", "");
  return `OL-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const { publicConfig, receiver, token } = readOpenLabServerConfig();

  if (!publicConfig.enabled || !receiver || !token) {
    return Response.json(
      {
        ok: false,
        message:
          "Governed Open Lab submission is not active on this deployment. No submission was accepted.",
        gates: publicConfig.gates,
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }

  const now = Date.now();
  const key = clientKey(request);

  if (!allowRequest(key, now)) {
    return Response.json(
      {
        ok: false,
        message: "Too many submission attempts. Please wait before trying again.",
      },
      { status: 429, headers: { "cache-control": "no-store" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      { ok: false, message: "The submission payload was not valid JSON." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const honeypot = cleanText(body.website, 200);
  if (honeypot) {
    return Response.json(
      { ok: true, submissionId: "filtered" },
      { headers: { "cache-control": "no-store" } },
    );
  }

  const startedAt =
    typeof body.startedAt === "number" && Number.isFinite(body.startedAt)
      ? body.startedAt
      : 0;

  if (!startedAt || now - startedAt < 1500) {
    return Response.json(
      {
        ok: false,
        message: "The submission was completed too quickly. Please review it and try again.",
      },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const submissionType = cleanText(body.submissionType, 80);
  const submitterType = cleanText(body.submitterType, 40);
  const contactMode = cleanText(body.contactMode, 40);
  const displayName = cleanText(body.displayName, 120);
  const email = cleanText(body.email, 254);
  const affiliation = cleanText(body.affiliation, 180);
  const subject = cleanText(body.subject, 320);
  const summary = cleanText(body.summary, 2200);
  const details = cleanText(body.details, 8000);
  const requestedOutcome = cleanText(body.requestedOutcome, 800);
  const conflictDisclosure = cleanText(body.conflictDisclosure, 1200);
  const sourceContext = cleanText(body.sourceContext, 180) || "open-lab";
  const evidenceLinks = parsePublicLinks(body.evidenceLinks);

  if (!isOpenLabSubmissionType(submissionType)) {
    return Response.json(
      { ok: false, message: "Choose a valid Open Lab participation route." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (!SUBMITTER_TYPES.has(submitterType)) {
    return Response.json(
      { ok: false, message: "Choose a valid submitter type." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (!CONTACT_MODES.has(contactMode)) {
    return Response.json(
      { ok: false, message: "Choose whether a reply path is requested." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (contactMode === "reply_requested" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { ok: false, message: "A valid email address is required when a reply is requested." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (subject.length < 5) {
    return Response.json(
      { ok: false, message: "Please identify the system, claim, work, or relationship you are bringing." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (summary.length < 20) {
    return Response.json(
      { ok: false, message: "Please provide a short summary with enough context to route the submission." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  if (evidenceLinks === null) {
    return Response.json(
      {
        ok: false,
        message: "Evidence links must be public http or https URLs, one per line.",
      },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const noSensitiveMaterial = cleanBoolean(body.noSensitiveMaterial);
  const reviewConsent = cleanBoolean(body.reviewConsent);
  const retentionAcknowledged = cleanBoolean(body.retentionAcknowledged);

  if (!noSensitiveMaterial || !reviewConsent || !retentionAcknowledged) {
    return Response.json(
      {
        ok: false,
        message:
          "Submission requires the sensitive-material, private-review, and retention acknowledgements.",
      },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const publicResponseRequested = cleanBoolean(body.publicResponseRequested);
  const contract = participationContracts.find((item) => item.type === submissionType);
  const submissionId = makeSubmissionId(now);

  const outbound = {
    schema: publicConfig.schema,
    submissionId,
    receivedAt: new Date(now).toISOString(),
    submissionType,
    submissionLabel: contract?.title ?? submissionType,
    sourceContext,
    policy: {
      version: publicConfig.policyVersion,
      retentionDays: publicConfig.retentionDays,
      initialVisibility: "private_intake",
      publicationConsent: "separate_consent_required",
      publicResponseRequested,
    },
    submitter: {
      type: submitterType,
      displayName: displayName || null,
      contactMode,
      email: contactMode === "reply_requested" ? email : null,
      affiliation: affiliation || null,
    },
    submission: {
      subject,
      summary,
      details: details || null,
      evidenceLinks,
      requestedOutcome: requestedOutcome || null,
      conflictDisclosure: conflictDisclosure || null,
    },
    safety: {
      noSensitiveMaterialAcknowledged: true,
      fileUploadsAccepted: false,
      publicLinksOnly: true,
    },
    consent: {
      privateReviewAndRouting: true,
      retentionWindowAcknowledged: true,
      publicationPermissionGranted: false,
    },
    state: {
      intake: "received",
      response: "unreviewed",
    },
    provenance: {
      originalSubmissionPreserved: true,
      sourceRevision: publicConfig.sourceRevision,
      transport: "public_web_to_authenticated_receiver",
    },
  };

  try {
    const response = await fetch(receiver, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(outbound),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          message:
            "The governed Open Lab receiver did not accept the submission. No receipt was issued.",
        },
        { status: 502, headers: { "cache-control": "no-store" } },
      );
    }
  } catch {
    return Response.json(
      {
        ok: false,
        message:
          "The governed Open Lab receiver could not be reached. No receipt was issued.",
      },
      { status: 502, headers: { "cache-control": "no-store" } },
    );
  }

  return Response.json(
    {
      ok: true,
      submissionId,
      state: "received",
      message:
        "Submission received for private review and routing. Receipt does not imply acceptance, investigation, publication, endorsement, or response.",
    },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
