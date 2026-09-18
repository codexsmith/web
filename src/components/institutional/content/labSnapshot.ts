import type { LabSnapshotRowProps } from "../LabSnapshotRow";

const registrySource = "Source: Lab Registry Catalog · Sep 16, 2026 · 57 registered descriptors.";

export const homeLabSnapshot = {
  label: "Lab snapshot",
  updated: "Sep 17, 2026",
  note:
    "Point-in-time observational measurements from the curated Library, Lab Registry Catalog, and Corpus Forge semantic index. Not live telemetry.",
  metrics: [
    {
      id: "files",
      value: "96K",
      label: "files",
      icon: "files",
      detail: "96,201 files in the curated Library snapshot generated 2026-09-13.",
    },
    {
      id: "storage",
      value: "25 GB",
      label: "",
      icon: "storage",
      detail: "25.06 GB in the curated Library snapshot generated 2026-09-13.",
    },
    {
      id: "active",
      value: "45",
      label: "active systems",
      icon: "active",
      detail: "45 of 57 registered Lab systems are marked active in the Sep 16 Registry Catalog snapshot.",
      breakdown: {
        title: "45 of 57 registered systems are active.",
        intro:
          "The Lab tracks persistent pieces of its research and operating machinery—things like queues, catalogs, indexes, evidence ledgers, and governance records. Active simply means the registrar marks that system as currently in use.",
        items: [
          {
            value: "45",
            label: "Active",
            detail: "Currently represented as in-use Lab machinery.",
          },
          {
            value: "10",
            label: "Seeded",
            detail: "Established in the catalog, but not yet marked active.",
          },
          {
            value: "1",
            label: "Replaced",
            detail: "Superseded by a newer system and retained for lineage.",
          },
          {
            value: "1",
            label: "Needs resolution",
            detail: "Known to the Lab, but its canonical location or routing still needs resolution.",
          },
        ],
        note:
          "This is lifecycle state for the Lab's organizational machinery. It does not mean scientifically validated, production-ready, currently executing, or more important.",
        source: registrySource + ' Derived from the catalog status field.',
      },
    },
    {
      id: "classes",
      value: "10",
      label: "system types",
      icon: "classes",
      detail: "The 57 registered Lab systems fall into 10 functional types in the Sep 16 Registry Catalog snapshot.",
      breakdown: {
        title: "Ten system types show how the Lab organizes its work.",
        intro:
          "Rather than one giant database, the Lab uses different structures for different jobs: deciding, scheduling, naming, tracing sources, tracking evidence, discovering material, and operating tools. These public labels translate the registrar's exact categories into ordinary language.",
        items: [
          {
            value: "16",
            label: "Governance & decision records",
            detail: "Decisions, contradictions, adjudications, changes, routing, and other institutional control state.",
          },
          {
            value: "9",
            label: "Work & execution queues",
            detail: "What needs doing, what is underway, and operational task state.",
          },
          {
            value: "6",
            label: "Vocabularies & rule sets",
            detail: "Shared types, relations, terms, and transformation rules used across the Lab.",
          },
          {
            value: "6",
            label: "Identity & source records",
            detail: "Where objects came from, what they correspond to, and where their authority lives.",
          },
          {
            value: "5",
            label: "Cross-system summaries",
            detail: "Graphs and consolidated views assembled from underlying source-owned systems.",
          },
          {
            value: "4",
            label: "Core object catalogs",
            detail: "Durable Lab objects such as research lanes, experiments, products, and atlases.",
          },
          {
            value: "4",
            label: "Discovery indexes",
            detail: "Generated indexes that make a large corpus easier to find, route, and navigate.",
          },
          {
            value: "3",
            label: "Claims & evidence systems",
            detail: "Scientific claims, theorems, evidence, and their represented state.",
          },
          {
            value: "2",
            label: "Domain-specific registers",
            detail: "Specialized records whose meaning and authority remain local to a particular research program.",
          },
          {
            value: "2",
            label: "Lab tools & capabilities",
            detail: "Machinery, agents, and executable capability records.",
          },
        ],
        note:
          "The ten public labels are translations of the ten exact registrar classes; the counts still sum to all 57 registered systems.",
        source: registrySource + " Derived from distinct registry_class values.",
      },
    },
    {
      id: "machine",
      value: "29",
      label: "software-readable",
      icon: "machine",
      detail: "29 of 57 registered Lab systems declare a structured representation that software can inspect directly.",
      breakdown: {
        title: "29 systems can be inspected directly by software.",
        intro:
          "These systems expose structured state that tools can parse without first interpreting prose. That makes parts of the Lab directly searchable, checkable, connectable, and usable by software rather than only readable as documents.",
        items: [
          {
            value: "29",
            label: "Structured for software",
            detail: "A machine-readable representation is explicitly declared in the registrar.",
          },
          {
            value: "28",
            label: "Primarily human-readable",
            detail: "The authoritative surface remains document-oriented or is not declared machine-readable in this snapshot.",
          },
        ],
        note:
          "Examples already structured for software include the Product Register, Lab Machinery Registry, Publication Graph, type and relation vocabularies, claim ledgers, source registries, and Agent Control registries. Software-readable does not mean automated, AI-controlled, correct, live, or more authoritative.",
        source: registrySource + " Derived from machine_readable === true.",
      },
    },
    {
      id: "semantic",
      value: "262K",
      label: "semantic units",
      icon: "semantic",
      detail: "262,249 source-bound semantic units in the completed workstation baseline dated 2026-09-17.",
    },
  ],
} satisfies LabSnapshotRowProps;
