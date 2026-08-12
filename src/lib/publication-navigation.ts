export const CIVILIZATIONAL_MECHANICS_PATH =
  "/publications/civilizational-mechanics";

export const PUBLICATION_MECHANICS = [
  { id: "nested-interiors", label: "Nested interiors" },
  { id: "boundary-accounting", label: "Boundary accounting" },
  { id: "agency-rate", label: "Agency rate" },
  { id: "root-lenses", label: "Root lenses" },
  { id: "boundary-cycle", label: "Boundary First cycle" },
  { id: "repair-router", label: "Repair router" },
] as const;

export type PublicationMechanicId =
  (typeof PUBLICATION_MECHANICS)[number]["id"];

export function publicationMechanicsHref(
  currentQuery: string,
  changes: Record<string, string | null>,
): string {
  const params = new URLSearchParams(
    currentQuery.startsWith("?") ? currentQuery.slice(1) : currentQuery,
  );
  Object.entries(changes).forEach(([key, value]) => {
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });
  const query = params.toString();
  return `${CIVILIZATIONAL_MECHANICS_PATH}${
    query ? `?${query}` : ""
  }#interactive-mechanics`;
}
