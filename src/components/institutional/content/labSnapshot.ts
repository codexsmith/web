import type { LabSnapshotRowProps } from "../LabSnapshotRow";

const registrySource = "Source: Lab Registry Catalog · Sep 16, 2026 · 57 registered descriptors.";
const machinerySource = "Source: Lab Machinery Registry · Sep 5, 2026 · 10 registered machinery components.";

export const homeLabSnapshot = {
  label: "Lab snapshot",
  updated: "Sep 17, 2026",
  note:
    "Point-in-time view of corpus scale and the machinery used to keep work routed, inspectable, tested, and persistent without relying on one person's memory. Not live telemetry.",
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
      value: "7",
      label: "core machines",
      icon: "active",
      detail: "7 of 10 registered Lab machinery components are marked stable in the current Machinery Registry.",
      breakdown: {
        title: "Seven stable machines carry the recurring operational load.",
        intro:
          "The Lab is not operated by manually tending dozens of independent files or registers. A smaller set of stable machinery handles recurring jobs such as routing, intake, research refinement, provenance, management rollups, and publication control.",
        items: [
          {
            value: "01",
            label: "Control Plane",
            detail: "Keeps structural maps, routing, derived measurements, freshness checks, and health surfaces coherent.",
          },
          {
            value: "02",
            label: "Intake audit & commit",
            detail: "Moves new material into the Library through an auditable ingest, adjudication, commit, refresh, and re-check cycle.",
          },
          {
            value: "03",
            label: "Corpus Forge",
            detail: "Runs bounded corpus refinement, criticism, evidence production, and candidate repair without crossing human promotion gates.",
          },
          {
            value: "04",
            label: "Agentic Artifact Protocol",
            detail: "Makes opted-in research objects addressable and testable by software while preserving their local authority.",
          },
          {
            value: "05",
            label: "Supporting Capture",
            detail: "Preserves provenance, integrity, and supporting source material without silently promoting it into current theory.",
          },
          {
            value: "06",
            label: "Management Control",
            detail: "Rolls up and routes cross-Lab work while leaving domain-local work and authority with their owners.",
          },
          {
            value: "07",
            label: "Publication Control & Paper Mine",
            detail: "Tracks publication dependencies, sources, queues, projections, measurements, and history.",
          },
        ],
        note:
          "This is the first answer to how one person can operate all this: most persistent state is memory around a much smaller operating core. The operator works through the machines and their control surfaces rather than holding the corpus in working memory.",
        source: machinerySource + ' Derived from maturity === "stable".',
      },
    },
    {
      id: "classes",
      value: "6",
      label: "operating functions",
      icon: "classes",
      detail: "Six recurring functions organize how the Lab remembers, routes, changes, checks, governs, and hands off work.",
      breakdown: {
        title: "The machinery takes six recurring jobs off the operator's plate.",
        intro:
          "These are not scores, departments, or six separate tools. They are the recurring kinds of work that appear across the Lab. Different machines can perform several of them; the point is that the operator can reason about the whole system through one small vocabulary.",
        variant: "flow",
        items: [
          {
            value: "01",
            label: "Remember",
            detail: "Write down identity, provenance, decisions, queue state, and durable research state so the operator does not have to hold it in memory.",
            code: "STORE",
          },
          {
            value: "02",
            label: "Route",
            detail: "Determine where work belongs, what it depends on, which authority applies, and what the next admissible action is.",
            code: "ROUTE",
          },
          {
            value: "03",
            label: "Work",
            detail: "Perform bounded transformations such as ingesting, refining, reducing, compiling, translating, or projecting material.",
            code: "TRANSFORM",
          },
          {
            value: "04",
            label: "Check",
            detail: "Catch defects, contradictions, broken paths, integrity failures, failed benchmarks, and evidence that should stop or redirect the work.",
            code: "TEST",
          },
          {
            value: "05",
            label: "Gate",
            detail: "Control admission, promotion, publication, and consequential change so useful automation does not silently become authority.",
            code: "GOVERN",
          },
          {
            value: "06",
            label: "Deliver",
            detail: "Package bounded results for the next consumer—another machine, the operator, a collaborator, or a public surface—while preserving context.",
            code: "PROJECT",
          },
        ],
        note:
          "A useful shorthand is: remember → route → work → check → gate → deliver → repeat. The operator sets goals, resolves ambiguity, and retains consequential authority; the machinery carries persistent state and repeatable process.",
        source: machinerySource + " Internal functional roles: Store, Route, Transform, Test, Govern, Project.",
      },
    },
    {
      id: "machine",
      value: "29",
      label: "software-readable",
      icon: "machine",
      detail: "29 of 57 registered state surfaces expose a structured representation that software can inspect directly.",
      breakdown: {
        title: "Software can inspect 29 state surfaces directly.",
        intro:
          "This is the leverage layer between the operator and the corpus. Structured state lets tools answer questions like what changed, what is queued, where authority lives, and what needs attention without requiring a human to open and reread every control document.",
        items: [
          {
            value: "29",
            label: "Directly inspectable",
            detail: "The registrar declares a structured representation that software can parse, query, validate, or route.",
          },
          {
            value: "28",
            label: "Human-first",
            detail: "The authoritative surface is document-oriented or is not declared machine-readable in this snapshot.",
          },
        ],
        note:
          "Examples include the Product Register, Lab Machinery Registry, publication graph, type and relation vocabularies, claim ledgers, source registries, and Agent Control state. Software-readable does not mean autonomous: authority-changing and external actions remain gated.",
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
