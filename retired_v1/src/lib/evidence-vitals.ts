import institutionalRegisterSummaryData from "../content/institutional_register_summary.json";
import { crossDomainResearchProgram } from "./cross-domain-research-program";

export type EvidenceVitalTone = "standard" | "bounded" | "caution";

export type EvidenceVital = {
  id: string;
  label: string;
  value: string | number;
  detail: string;
  tone: EvidenceVitalTone;
  mobilePriority?: boolean;
};

export type EvidenceStanding =
  | "recorded"
  | "operational"
  | "externally-verified"
  | "withdrawn";

export type EvidencePending = {
  target: "operational" | "externally-verified";
  gate: string;
};

export type PublicEvidenceReference = {
  kind: "named-internal" | "external";
  label: string;
  href?: string;
};

export type ProvenanceReference = {
  id: string;
  note?: string;
};

export type EvidenceStatus = {
  standing: EvidenceStanding;
  pending?: EvidencePending;
  appliesTo: string;
  claimCeiling: string;
  boundaryConditions?: string[];
  publicReferences?: PublicEvidenceReference[];
  provenanceRecords: ProvenanceReference[];
  lastReviewed?: string;
  withdrawal?: {
    date: string;
    reason: string;
    supersededBy?: string;
  };
};

export const EVIDENCE_STANDING_LABELS: Record<EvidenceStanding, string> = {
  recorded: "Recorded",
  operational: "Operational",
  "externally-verified": "Externally verified",
  withdrawn: "Withdrawn",
};

export const EVIDENCE_STANDING_MEANINGS: Record<EvidenceStanding, string> = {
  recorded:
    "A traceable claim, artifact, event, or outcome exists in the provenance system.",
  operational:
    "The declared first-party evidence gate has been satisfied within the stated boundary conditions.",
  "externally-verified":
    "Qualifying independent evidence supports the stated claim within its declared scope.",
  withdrawn:
    "The claim is no longer asserted for current use; its historical provenance remains retained.",
};

type InstitutionalRegisterSummary = {
  schemaVersion: "boundary-first.institutional-register-summary.v1";
  status: string;
  source: string;
  generated: string;
  counts: {
    coreRecords: number;
    sourceStated: number;
    explicitlyProposed: number;
    operationallyVerified: number;
    needsAdjudication: number;
    exactDuplicatesNeedingCanonicalSource: number;
    candidateCanonicalClusters: number;
  };
  boundary: string;
};

const institutionalRegisterSummary =
  institutionalRegisterSummaryData as InstitutionalRegisterSummary;

function validateSnapshot(summary: InstitutionalRegisterSummary) {
  if (
    summary.schemaVersion !==
    "boundary-first.institutional-register-summary.v1"
  ) {
    throw new Error("Unsupported institutional register summary schema.");
  }
  if (
    summary.counts.sourceStated > summary.counts.coreRecords ||
    summary.counts.operationallyVerified > summary.counts.sourceStated ||
    summary.counts.needsAdjudication > summary.counts.coreRecords
  ) {
    throw new Error("Institutional evidence counts are internally inconsistent.");
  }
  if (!summary.generated.trim() || !summary.boundary.trim()) {
    throw new Error("Institutional evidence snapshot lacks boundary metadata.");
  }
}

export function validateEvidenceStatus(status: EvidenceStatus): EvidenceStatus {
  if (!status.appliesTo.trim() || !status.claimCeiling.trim()) {
    throw new Error("Evidence status requires an explicit referent and claim ceiling.");
  }
  if (status.provenanceRecords.length === 0) {
    throw new Error("Evidence status must retain underlying provenance.");
  }
  if (status.standing === "withdrawn" && status.pending) {
    throw new Error("Withdrawn revisions cannot retain an open promotion gate.");
  }
  if (status.standing === "withdrawn" && !status.withdrawal) {
    throw new Error("Withdrawn revisions require withdrawal metadata.");
  }
  if (
    status.pending?.target === "operational" &&
    status.standing !== "recorded"
  ) {
    throw new Error("Only recorded claims may be pending operational promotion.");
  }
  if (
    status.pending?.target === "externally-verified" &&
    (status.standing === "externally-verified" ||
      status.standing === "withdrawn")
  ) {
    throw new Error(
      "Externally verified or withdrawn claims cannot be pending external verification.",
    );
  }
  status.publicReferences?.forEach((reference) => {
    if (!reference.label.trim()) {
      throw new Error("Public evidence references require a label.");
    }
    if (
      reference.kind === "external" &&
      reference.href &&
      !reference.href.startsWith("https://")
    ) {
      throw new Error("External evidence references require an HTTPS URL.");
    }
  });
  return status;
}

validateSnapshot(institutionalRegisterSummary);

const externalSourceCount = crossDomainResearchProgram.sources.filter(
  (source) => source.kind === "external-primary",
).length;
const strongestWorkingGrade = crossDomainResearchProgram.caseStudies.reduce(
  (strongest, caseStudy) =>
    caseStudy.mappingDecision.grade.localeCompare(strongest) > 0
      ? caseStudy.mappingDecision.grade
      : strongest,
  "L0",
);

export const evidenceSnapshot = {
  generated: institutionalRegisterSummary.generated,
  status: institutionalRegisterSummary.status,
  boundary: institutionalRegisterSummary.boundary,
  researchVersion: crossDomainResearchProgram.version,
};

export const EVIDENCE_SNAPSHOT_STAMP = `Corpus snapshot ${evidenceSnapshot.generated} / research v${evidenceSnapshot.researchVersion}`;

export const corpusEvidenceVitals: EvidenceVital[] = [
  {
    id: "core-records",
    label: "Core corpus records",
    value: institutionalRegisterSummary.counts.coreRecords,
    detail: "Records inventoried in the working institutional corpus.",
    tone: "standard",
    mobilePriority: true,
  },
  {
    id: "source-stated",
    label: "Source-stated",
    value: institutionalRegisterSummary.counts.sourceStated,
    detail: "Language present in source material; not equivalent to proof.",
    tone: "bounded",
  },
  {
    id: "explicitly-proposed",
    label: "Explicitly proposed",
    value: institutionalRegisterSummary.counts.explicitlyProposed,
    detail: "Records visibly marked as proposals rather than adopted operation.",
    tone: "bounded",
  },
  {
    id: "operationally-verified",
    label: "Operationally verified",
    value: institutionalRegisterSummary.counts.operationallyVerified,
    detail: "No operating-evidence claim is currently made by this register.",
    tone: "caution",
    mobilePriority: true,
  },
  {
    id: "needs-adjudication",
    label: "Need adjudication",
    value: institutionalRegisterSummary.counts.needsAdjudication,
    detail: "Records still requiring authority, status, or canonical-source review.",
    tone: "caution",
  },
];

export const researchEvidenceVitals: EvidenceVital[] = [
  {
    id: "defined-terms",
    label: "Source-bounded terms",
    value: crossDomainResearchProgram.lexicon.length,
    detail: "Starter definitions retained in their native domain context.",
    tone: "standard",
  },
  {
    id: "external-sources",
    label: "External primary sources",
    value: externalSourceCount,
    detail: "Named primary sources in the current bounded program.",
    tone: "standard",
  },
  {
    id: "bounded-cases",
    label: "Bounded cases",
    value: crossDomainResearchProgram.caseStudies.length,
    detail: "Completed comparative readings, not universal demonstrations.",
    tone: "bounded",
    mobilePriority: true,
  },
  {
    id: "breakpoints",
    label: "Breakpoints logged",
    value: crossDomainResearchProgram.counterexamples.length,
    detail: "Rejected or explicitly limited cross-domain mappings.",
    tone: "bounded",
    mobilePriority: true,
  },
  {
    id: "strongest-grade",
    label: "Strongest working grade",
    value: strongestWorkingGrade,
    detail: "A candidate mapping grade, not formal equivalence or proof.",
    tone: "caution",
  },
];

export const claimEvidenceVitals: EvidenceVital[] = [
  {
    ...corpusEvidenceVitals.find((item) => item.id === "source-stated")!,
    mobilePriority: true,
  },
  corpusEvidenceVitals.find(
    (item) => item.id === "operationally-verified",
  )!,
  researchEvidenceVitals.find((item) => item.id === "bounded-cases")!,
  researchEvidenceVitals.find((item) => item.id === "breakpoints")!,
];

export const corpusEvidenceStatus = validateEvidenceStatus({
  standing: "recorded",
  appliesTo:
    "The institutional corpus and register counts.",
  claimCeiling:
    "Inventory and status tracking only. Source presence does not establish validity or operation.",
  boundaryConditions: [
    "Records reflect inventoried source material across Boundary First collections.",
    "No claim of operational proof is made by register presence alone.",
  ],
  provenanceRecords: [{ id: "institutional-register-summary" }],
  lastReviewed: institutionalRegisterSummary.generated,
});

export const claimEvidenceStatus = validateEvidenceStatus({
  standing: "recorded",
  appliesTo:
    "The aggregate claim-evidence context shown across the Work and Publications indexes.",
  claimCeiling:
    "Collection-level evidence context only. Individual claims, projects, publications, and artifacts retain their own standing and claim ceiling.",
  boundaryConditions: [
    "The summary combines corpus source presence with bounded research indicators.",
    "No child claim inherits the strongest standing represented anywhere in the collection.",
  ],
  provenanceRecords: [
    { id: "institutional-register-summary" },
    { id: "cross-domain-research-program" },
  ],
  lastReviewed: institutionalRegisterSummary.generated,
});

export const researchProgramEvidenceStatus = validateEvidenceStatus({
  standing: "operational",
  pending: {
    target: "externally-verified",
    gate: [
      crossDomainResearchProgram.openGates[0],
      crossDomainResearchProgram.openGates[2],
      crossDomainResearchProgram.openGates[4],
    ].join("; "),
  },
  appliesTo:
    `${crossDomainResearchProgram.title} as an active bounded comparative research program.`,
  claimCeiling: crossDomainResearchProgram.claimCeiling,
  boundaryConditions: [
    "Operational applies to the completed first-party comparative readings, explicit mapping decisions, and recorded breakpoints in this program.",
    "It does not assert formal equivalence, universality, field superiority, or independent validation.",
  ],
  publicReferences: crossDomainResearchProgram.sources
    .filter((source) => source.kind === "external-primary")
    .map((source) => ({
      kind: "external" as const,
      label: source.label,
      href: source.url,
    })),
  provenanceRecords: [{ id: "cross-domain-research-program" }],
});
