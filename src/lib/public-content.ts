import { asRecord, asRecordArray, asString, asStringArray } from "./content";

export function firstText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  return asStringArray(value)[0] ?? fallback;
}

export function textList(value: unknown): string[] {
  return typeof value === "string" ? [value] : asStringArray(value);
}

export function projectedRecord(value: unknown) {
  return asRecord(value);
}

export function projectedRecords(value: unknown) {
  return asRecordArray(value);
}

export function humanizeStatus(value: unknown, fallback = "Unrecorded") {
  const status = asString(value, fallback);
  return status
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}
