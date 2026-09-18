export function formatOrdinal(index: number, startAt = 1) {
  return String(index + startAt).padStart(2, "0");
}
