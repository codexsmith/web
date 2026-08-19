import type { DeliveryStage } from "@/lib/content";

export type SemanticEventType =
  | "introduced"
  | "developed"
  | "piloted"
  | "validated"
  | "shipped"
  | "revised"
  | "superseded"
  | "retired"
  | "reopened"
  | "standing-recorded"
  | "evidence-attached"
  | "claim-ceiling-set";

export type SemanticEventStandingEffect =
  | "promotes"
  | "preserves"
  | "supersedes"
  | "retires"
  | "reopens"
  | "records";

export type SemanticEventActor = {
  label: string;
  kind: "person" | "institution" | "system";
};

export type SemanticEvent = {
  id: string;
  nodeId: string;
  type: SemanticEventType;
  label: string;
  summary: string;
  /**
   * The date the represented domain event actually took effect, when established.
   * Omit it rather than substituting a publication, migration, or repository date.
   */
  effectiveAt?: string;
  /** Date this event was admitted into the public semantic ledger. */
  recordedAt: string;
  datePrecision: "day" | "month" | "year" | "unknown";
  actor: SemanticEventActor;
  evidenceRefs: string[];
  resultingStage?: DeliveryStage;
  sourceStatus?: string;
  standingEffect: SemanticEventStandingEffect;
  claimCeiling: string;
  replacesEventId?: string;
};

const publicLedgerRecordedAt = "2026-08-18";
const boundaryFirstLabs: SemanticEventActor = {
  label: "Boundary First Labs",
  kind: "institution",
};

/**
 * Seed ledger.
 *
 * These records deliberately distinguish the date a state was entered from the date
 * its public standing was recorded. Where the retained corpus does not establish an
 * effective date, effectiveAt remains absent and datePrecision remains unknown.
 */
export const semanticEventLedger: Record<string, SemanticEvent[]> = {
  "corpus-forge": [
    {
      id: "corpus-forge-active-standing-recorded",
      nodeId: "corpus-forge",
      type: "standing-recorded",
      label: "Active-development standing recorded",
      summary:
        "The public Corpus Forge record identifies a current research-operations method and software-development program with explicit provenance, review, promotion, supersession, and repair goals.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: [
        "src/content/product-landing-pages/corpus-forge.json",
        "src/content/project_index.json#project-corpus-forge-agent-pipeline",
      ],
      resultingStage: "active-development",
      sourceStatus: "active-development",
      standingEffect: "records",
      claimCeiling:
        "Supports a current method and active software program. It does not establish a complete or production-ready knowledge-management platform, reliability result, productivity result, or autonomous promotion authority.",
    },
    {
      id: "corpus-forge-agent-pipeline-validation-recorded",
      nodeId: "corpus-forge",
      type: "evidence-attached",
      label: "Agent-pipeline validation activity attached",
      summary:
        "The project index records the Corpus Forge Agent Pipeline as active and in a validation phase, advancing the wider Corpus Forge program and focused ledger surfaces.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: ["src/content/project_index.json#project-corpus-forge-agent-pipeline"],
      sourceStatus: "active / validation",
      standingEffect: "preserves",
      claimCeiling:
        "Supports the existence of active validation work. It does not by itself establish validation success, production readiness, benchmark superiority, or safe autonomous claim promotion.",
    },
  ],
  "agency-audit": [
    {
      id: "agency-audit-pilot-standing-recorded",
      nodeId: "agency-audit",
      type: "standing-recorded",
      label: "Pilot-intake standing recorded",
      summary:
        "The Agency & Representation Audit is represented as an available bounded pilot engagement with explicit exclusions around legal advice, certification, fairness certification, and security assessment.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: ["src/content/product-landing-pages/agency-representation-audit.json"],
      resultingStage: "pilot",
      sourceStatus: "pilot-intake",
      standingEffect: "records",
      claimCeiling:
        "Supports offering a bounded pilot audit. It does not establish regulatory, legal, security, or fairness certification and does not imply a completed external pilot unless separately evidenced.",
    },
  ],
  citywatch: [
    {
      id: "citywatch-delivery-retained",
      nodeId: "citywatch",
      type: "shipped",
      label: "Historical delivery retained",
      summary:
        "The retained CityWatch record supports that civic-transparency software was built and delivered inside Augusta-Richmond County IT and is now represented as historical professional standing.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: ["src/content/product-landing-pages/augusta-citywatch.json"],
      resultingStage: "shipped",
      sourceStatus: "historical-project-no-current-affiliation",
      standingEffect: "records",
      claimCeiling:
        "Supports historical implementation and delivery standing. It does not establish a current Augusta-Richmond County relationship, sponsorship, endorsement, awards, outcomes, or present operation without additional evidence.",
    },
  ],
  "boundary-first-ux": [
    {
      id: "bfux-developed-standing-recorded",
      nodeId: "boundary-first-ux",
      type: "developed",
      label: "Launch-candidate standard standing recorded",
      summary:
        "Boundary First UX is represented as a developed working public standard with a substantial interaction grammar, flagship demonstration, accessibility requirements, and proposed conformance levels.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: ["src/content/product-landing-pages/boundary-first-ux.json"],
      resultingStage: "developed",
      sourceStatus: "launch-candidate",
      standingEffect: "records",
      claimCeiling:
        "Supports describing BFUX as a developed launch-candidate standard. Proposed conformance levels are not yet canonical, and developed status must not be represented as external validation or shipped institutional adoption.",
    },
  ],
  "boundary-first-engineering": [
    {
      id: "bfe-developed-doctrine-recorded",
      nodeId: "boundary-first-engineering",
      type: "developed",
      label: "Developed doctrine standing recorded",
      summary:
        "Boundary First Engineering is represented as a developed software-engineering doctrine with substantial public practitioner expressions in Software Before Code and Closure-Driven Software Development.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: [
        "Software Before Code retained public record",
        "Closure-Driven Software Development retained public record",
      ],
      resultingStage: "developed",
      standingEffect: "records",
      claimCeiling:
        "Supports a developed practitioner doctrine and public method lineage. It does not by itself establish universal superiority, external standardization, or independent empirical validation.",
    },
  ],
  "augusta-civic": [
    {
      id: "augusta-civic-planned-standing-recorded",
      nodeId: "augusta-civic",
      type: "standing-recorded",
      label: "Planned civic-project standing recorded",
      summary:
        "Augusta Civic Infrastructure is represented as a Boundary First Labs public-interest project direction informed by prior CityWatch delivery rather than as a current municipal engagement.",
      recordedAt: publicLedgerRecordedAt,
      datePrecision: "unknown",
      actor: boundaryFirstLabs,
      evidenceRefs: [
        "src/content/product-landing-pages/augusta-citywatch.json",
        "src/lib/public-interest-content.ts#augusta-civic",
      ],
      resultingStage: "planned",
      standingEffect: "records",
      claimCeiling:
        "Supports a planned BFL project direction and historical implementation lineage. It does not establish current municipal sponsorship, endorsement, funding, access, authorization, or participation.",
    },
  ],
};

export function getSemanticEvents(nodeId: string): SemanticEvent[] {
  return [...(semanticEventLedger[nodeId] ?? [])].sort((left, right) => {
    const leftDate = left.effectiveAt ?? left.recordedAt;
    const rightDate = right.effectiveAt ?? right.recordedAt;
    return rightDate.localeCompare(leftDate) || right.recordedAt.localeCompare(left.recordedAt);
  });
}

export function semanticEventSearchText(nodeId: string): string[] {
  return getSemanticEvents(nodeId).flatMap((event) => [
    event.type,
    event.label,
    event.summary,
    event.actor.label,
    event.sourceStatus,
    event.claimCeiling,
    ...event.evidenceRefs,
  ].filter((value): value is string => Boolean(value)));
}
