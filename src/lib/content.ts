export type ContentRecord = Record<string, unknown>;

export function asRecord(value: unknown): ContentRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as ContentRecord)
    : {};
}

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function asRecordArray(value: unknown): ContentRecord[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is ContentRecord =>
          Boolean(item) && typeof item === "object" && !Array.isArray(item),
      )
    : [];
}

export function sentence(value: unknown, fallback: string): string {
  const text = asString(value, fallback).trim();
  if (!text) return fallback;
  return /[.!?]$/.test(text) ? text : `${text}.`;
}
