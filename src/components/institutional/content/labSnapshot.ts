import type { LabSnapshotRowProps } from "../LabSnapshotRow";

export const homeLabSnapshot = {
  label: "Lab snapshot",
  status: "Static",
  updated: "Sep 17, 2026",
  note:
    "Point-in-time observational measurements from the curated Library, Lab Registry Catalog, and Corpus Forge semantic index. Not live telemetry.",
  metrics: [
    {
      value: "96K",
      label: "files",
      icon: "files",
      detail: "96,201 files in the curated Library snapshot generated 2026-09-13.",
    },
    {
      value: "25 GB",
      label: "",
      icon: "storage",
      detail: "25.06 GB in the curated Library snapshot generated 2026-09-13.",
    },
    {
      value: "57",
      label: "surfaces",
      icon: "surfaces",
      detail: "57 registered control surfaces in the Lab Registry Catalog dated 2026-09-16.",
    },
    {
      value: "45",
      label: "active",
      icon: "active",
      detail: "45 registered surfaces marked active in the Lab Registry Catalog dated 2026-09-16.",
    },
    {
      value: "10",
      label: "classes",
      icon: "classes",
      detail: "10 registry classes represented in the Lab Registry Catalog dated 2026-09-16.",
    },
    {
      value: "29",
      label: "machine-readable",
      icon: "machine",
      detail: "29 registered surfaces marked machine-readable in the Lab Registry Catalog dated 2026-09-16.",
    },
    {
      value: "262K",
      label: "semantic units",
      icon: "semantic",
      detail: "262,249 source-bound semantic units in the completed workstation baseline dated 2026-09-17.",
    },
  ],
} satisfies LabSnapshotRowProps;
