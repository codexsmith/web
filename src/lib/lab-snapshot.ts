export type LabSnapshotMetric = {
  value: string;
  label: string;
  detail: string;
  sourceRef: string;
};

export const labSnapshot = {
  snapshotDate: "2026-09-18",
  sourceWindow: "2026-09-13 — 2026-09-17",
  status: "static public projection",
  note:
    "These are dated observational measurements of the Lab corpus and its control machinery. They are not live telemetry and will drift as the Lab changes.",
  metrics: [
    {
      value: "96,201",
      label: "Curated files",
      detail: "25.06 GB Library",
      sourceRef:
        "boundary-first-labs/organized_library_curated/999_Library/00_MAPS/FOLDER_TOC.md (generated 2026-09-13)",
    },
    {
      value: "57",
      label: "Registered surfaces",
      detail: "registry-of-registries",
      sourceRef:
        "boundary-first-labs/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/LAB_REGISTRY_CATALOG.json (2026-09-16)",
    },
    {
      value: "45",
      label: "Active surfaces",
      detail: "10 registry classes",
      sourceRef:
        "boundary-first-labs/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/LAB_REGISTRY_CATALOG.json (2026-09-16)",
    },
    {
      value: "29",
      label: "Machine-readable",
      detail: "of 57 registered",
      sourceRef:
        "boundary-first-labs/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/LAB_REGISTRY_CATALOG.json (2026-09-16)",
    },
    {
      value: "262,249",
      label: "Semantic units",
      detail: "source-bound local index",
      sourceRef:
        "boundary-first-labs/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/corpus_forge/local_instrumentation/WORKSTATION_BASELINE_2026-09-17.md",
    },
  ] satisfies LabSnapshotMetric[],
} as const;
