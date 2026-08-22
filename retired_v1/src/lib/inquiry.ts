export type InquiryIntent =
  | "general"
  | "work"
  | "collaboration"
  | "research"
  | "evidence"
  | "accessibility";

export type InquiryContext = {
  source?: string;
  topic?: string;
  intent?: InquiryIntent;
  record?: string;
};

function clean(value: string | undefined): string | undefined {
  const normalized = value?.trim().replace(/[\r\n\t]+/g, " ");
  return normalized ? normalized.slice(0, 180) : undefined;
}

export function normalizeInquiryContext(
  context: InquiryContext,
): InquiryContext {
  return {
    source: clean(context.source),
    topic: clean(context.topic),
    intent: context.intent ?? "general",
    record: clean(context.record),
  };
}

export function buildInquiryHref(context: InquiryContext = {}): string {
  const normalized = normalizeInquiryContext(context);
  const params = new URLSearchParams();

  if (normalized.source) params.set("source", normalized.source);
  if (normalized.topic) params.set("topic", normalized.topic);
  if (normalized.intent) params.set("intent", normalized.intent);
  if (normalized.record) params.set("record", normalized.record);

  const query = params.toString();
  return `/inquire${query ? `?${query}` : ""}`;
}

export function buildInquiryMailto(context: InquiryContext = {}): string {
  const normalized = normalizeInquiryContext(context);
  const topic = normalized.topic ?? normalized.record ?? "Boundary First Labs";
  const subject = `BFL inquiry · ${topic}`;
  const contextLines = [
    normalized.intent ? `Intent: ${normalized.intent}` : null,
    normalized.topic ? `Topic: ${normalized.topic}` : null,
    normalized.record ? `Record: ${normalized.record}` : null,
    normalized.source ? `Arrived from: ${normalized.source}` : null,
  ].filter(Boolean);

  const body = [
    "I am contacting Boundary First Labs about the context below.",
    "",
    ...contextLines,
    "",
    "What I am trying to understand, build, change, test, or propose:",
    "",
    "Relevant constraints, evidence, or system context:",
    "",
  ].join("\n");

  return `mailto:contact@boundaryfirstlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
