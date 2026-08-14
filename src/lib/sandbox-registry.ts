import { getWorkRecord } from "@/lib/work-records";

export type SandboxKind =
  | "representation-lab"
  | "guided-sequence"
  | "bounded-testbed"
  | "research-operations"
  | "evidence-infrastructure";

export type SandboxEntry = {
  id: string;
  title: string;
  kind: SandboxKind;
  status: string;
  purpose: string;
  tests: string;
  boundary: string;
  href: string;
  sourceRecord?: string;
};

const chess = getWorkRecord("boundary-first-chess");
const corpusForge = getWorkRecord("corpus-forge");
const claimLedger = getWorkRecord("claim-evidence-ledger");

export const sandboxEntries: SandboxEntry[] = [
  {
    id: "representation-lab",
    title: "Representation Laboratory",
    kind: "representation-lab",
    status: "Operational interface testbed",
    purpose:
      "Compare multiple visual grammars for the same Boundary First objects without changing the underlying claim or record.",
    tests:
      "Whether sequence, radial, cycle, convergence, and closure-map representations preserve the distinctions a reader needs to act correctly.",
    boundary:
      "A visualization can improve legibility or expose a defect in a representation. It does not by itself establish truth, evidence maturity, or universal transport.",
    href: "/sandbox/representation-lab",
  },
  {
    id: "guided-introduction",
    title: "Guided Introduction",
    kind: "guided-sequence",
    status: "Operational public sequence",
    purpose:
      "Test progressive disclosure by teaching consequence, boundary, method, evidence, and repair before exposing the full Atlas.",
    tests:
      "Whether a reader can enter through recognizable structure and retain orientation while moving into deeper formal material.",
    boundary:
      "The sequence is a pedagogical projection over governed records. Narrative order does not create dependency, proof, or canonical priority.",
    href: "/learn",
  },
  {
    id: "boundary-first-chess",
    title: chess?.title ?? "Boundary First Chess",
    kind: "bounded-testbed",
    status: chess?.standing ?? "Recorded testbed",
    purpose:
      "Apply Boundary First reasoning in a constrained environment with explicit state, legal moves, evaluation, planning, and observable outcomes.",
    tests:
      "Whether boundary, invariant, state, consequence, and repair reasoning produces useful analysis in a domain with unusually clear constraints.",
    boundary:
      chess?.evidenceBoundary ??
      "Chess is a bounded testbed and does not prove that every result transports universally.",
    href: chess?.canonicalHref ?? "/work/boundary-first-chess",
    sourceRecord: chess?.slug,
  },
  {
    id: "corpus-forge",
    title: corpusForge?.title ?? "Corpus Forge",
    kind: "research-operations",
    status: corpusForge?.standing ?? "Recorded research workflow",
    purpose:
      "Put source preservation, claim extraction, contradiction tracking, provenance, maturity control, and human review into an inspectable research workflow.",
    tests:
      "Whether AI-assisted research can increase transformation capacity without moving authority or promotion gates out of accountable human control.",
    boundary:
      corpusForge?.evidenceBoundary ??
      "Operational workflow evidence remains distinct from product maturity or independent validation.",
    href: corpusForge?.canonicalHref ?? "/work/corpus-forge",
    sourceRecord: corpusForge?.slug,
  },
  {
    id: "claim-evidence-ledger",
    title: claimLedger?.title ?? "Claim and Evidence Ledger",
    kind: "evidence-infrastructure",
    status: claimLedger?.standing ?? "Emerging evidence infrastructure",
    purpose:
      "Make claims, sources, assumptions, counterevidence, review state, supersession, and permitted public wording explicit enough to inspect.",
    tests:
      "Whether evidence status and claim ceilings can remain attached while the same material is projected into different public interfaces.",
    boundary:
      claimLedger?.evidenceBoundary ??
      "A recorded source or relation does not automatically raise the standing of the claim it accompanies.",
    href: claimLedger?.canonicalHref ?? "/work/claim-evidence-ledger",
    sourceRecord: claimLedger?.slug,
  },
];

export const sandboxPromotionRule =
  "Sandbox contact may produce evidence, defects, or reusable methods. It never promotes an object directly to capability, program, or canon without the corresponding review gate.";

export const civicChangeBoundary =
  "Civic and change-infrastructure concepts remain portfolio and research context in this release. Their presence in the corpus does not create an operating civic program, service, deployment promise, or governance authority.";
