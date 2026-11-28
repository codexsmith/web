// Authored opt-in: long-form curated readers. Home and Contact are entry surfaces.
export const sectionNavRoutes = [
  "/observatory",
  "/observatory/intellectual-lineage",
  "/observatory/reference-library",
  "/observatory/research-architecture",
  "/observatory/computational-inquiry",
  "/observatory/demonstrations",
  "/observatory/instruments",
  "/codexware",
  "/codexware/civic-record",
  "/codexware/economic-maintenance",
  "/work-with-us",
  "/work-with-us/professional-services",
  "/work-with-us/paper-auditing",
  "/work-with-us/public-service",
  "/work-with-us/funding",
  "/consequential-systems",
  "/ai-governance",
  "/constructive-human-agency",
  "/digital-native-institution",
  "/evidence-and-trust"
] as const;
export type ReaderSectionEntry = { readonly id: string; readonly label: string };
export function chapterSectionEntries(sections: readonly { readonly title: string; readonly anchorId: string }[]): ReaderSectionEntry[] {
  return sections.map(({ title, anchorId }) => ({ id: anchorId, label: title }));
}
