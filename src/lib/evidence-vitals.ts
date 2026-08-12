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

export const EVIDENCE_SNAPSHOT_STAMP = `Corpus snapshot ${evidenceSnapshot.generated} / research v${evidenceSnapshot.researchVersion}`;
