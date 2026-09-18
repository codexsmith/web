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
      label: "active",
      icon: "active",
      detail: "45 registered surfaces marked active in the Lab Registry Catalog dated 2026-09-16.",
      breakdown: {
        title: "The 45 active surfaces span all ten registry classes.",
        intro:
          "Active is registrar lifecycle metadata: the catalog marks the surface active. It is not a score for research quality, scientific truth, product maturity, funding priority, or production readiness.",
        items: [
          { value: "13", label: "Governance registers" },
          { value: "8", label: "Execution queues & task registries" },
          { value: "5", label: "Identity & provenance registries" },
          { value: "4", label: "Aggregate projections" },
          { value: "4", label: "Durable-object registries" },
          { value: "3", label: "Generated discovery indexes" },
          { value: "3", label: "Scientific state & evidence registries" },
          { value: "2", label: "Grammar & vocabulary registries" },
          { value: "2", label: "Machinery & capability registries" },
          { value: "1", label: "Domain-local registry" },
        ],
        source: registrySource + ' Derived from status === "active".',
      },
    },
    {
      id: "classes",
      value: "10",
      label: "classes",
      icon: "classes",
      detail: "10 registry classes represented in the Lab Registry Catalog dated 2026-09-16.",
      breakdown: {
        title: "Ten classes describe what kind of institutional job each surface performs.",
        intro:
          "The public labels below translate the registrar's exact class names without changing them. Counts sum to all 57 registered surfaces.",
        items: [
          {
            value: "16",
            label: "Governance registers",
            detail: "Decision, adjudication, contradiction, delta, routing, and related governance state.",
            code: "governance_register",
          },
          {
            value: "9",
            label: "Execution queues & task registries",
            detail: "Work queues, execution queues, and task-state surfaces.",
            code: "execution_queue_task_registry",
          },
          {
            value: "6",
            label: "Grammar & vocabulary registries",
            detail: "Type grammars, relation types, vocabularies, and derivation-rule surfaces.",
            code: "grammar_vocabulary_registry",
          },
          {
            value: "6",
            label: "Identity & provenance registries",
            detail: "Identity mappings, source registries, and provenance-bearing relationship records.",
            code: "identity_provenance_registry",
          },
          {
            value: "5",
            label: "Aggregate projections",
            detail: "Cross-source summaries, graphs, and compatibility views derived from other authorities.",
            code: "aggregate_projection",
          },
          {
            value: "4",
            label: "Durable-object registries",
            detail: "Core object families such as research lanes, experiments, products, and atlases.",
            code: "durable_object_registry",
          },
          {
            value: "4",
            label: "Generated discovery indexes",
            detail: "Generated surfaces for discovery and routing; the index is not promoted above its sources.",
            code: "generated_index_discovery_registry",
          },
          {
            value: "3",
            label: "Scientific state & evidence registries",
            detail: "Claim, theorem, and evidence-state surfaces with bounded scientific authority.",
            code: "scientific_state_evidence_registry",
          },
          {
            value: "2",
            label: "Domain-local registries",
            detail: "Specialized registries whose authority stays with a particular research or domain owner.",
            code: "domain_local_registry",
          },
          {
            value: "2",
            label: "Machinery & capability registries",
            detail: "Registered Lab machinery, agents, and capability state.",
            code: "machinery_capability_registry",
          },
        ],
        note:
          "These classes describe representation and institutional function, not importance or maturity.",
        source: registrySource + " Derived from distinct registry_class values.",
      },
    },
    {
      id: "machine",
      value: "29",
      label: "machine-readable",
      icon: "machine",
      detail: "29 registered surfaces marked machine-readable in the Lab Registry Catalog dated 2026-09-16.",
      breakdown: {
        title: "29 of 57 surfaces declare a machine-readable representation.",
        intro:
          "Machine-readable means the registrar marks the surface as structured for software to parse. It does not imply automation, AI control, live execution, correctness, or greater authority. The values below are machine-readable / total within each class.",
        items: [
          { value: "4 / 16", label: "Governance registers" },
          { value: "3 / 9", label: "Execution queues & task registries" },
          { value: "6 / 6", label: "Grammar & vocabulary registries" },
          { value: "4 / 6", label: "Identity & provenance registries" },
          { value: "3 / 5", label: "Aggregate projections" },
          { value: "1 / 4", label: "Durable-object registries" },
          { value: "3 / 4", label: "Generated discovery indexes" },
          { value: "2 / 3", label: "Scientific state & evidence registries" },
          { value: "1 / 2", label: "Domain-local registries" },
          { value: "2 / 2", label: "Machinery & capability registries" },
        ],
        note:
          "The remaining 28 surfaces are not declared machine-readable in this snapshot. That does not mean they are unreadable to people or less authoritative.",
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
