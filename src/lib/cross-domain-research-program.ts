import programData from "../content/cross_domain_research_program.binding.json";

export type MappingGrade = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";
export type MappingDecision =
  | "promoted-bounded-analogy"
  | "promoted-operational-homology-candidate";
export type CounterexampleDecision = "rejected" | "bounded-only";
export type ProgramSourceKind = "external-primary" | "project-primary";

export type CrossDomainResearchProgram = {
  schemaVersion: "boundary-first.research-program.operational-homology.v1";
  version: string;
  programStatus: "bounded-comparative-program-active-pending-external-review";
  sourceSuite: string;
  title: string;
  objective: string;
  hypothesis: string;
  negativeResultRule: string;
  operationalTuple: string[];
  mappingGrades: Array<{
    level: MappingGrade;
    label: string;
    criterion: string;
    operationalHomologyNameAllowed: boolean;
  }>;
  sources: Array<{
    id: string;
    kind: ProgramSourceKind;
    label: string;
    url?: string;
  }>;
  lexicon: Array<{
    id: string;
    domain: string;
    term: string;
    definition: string;
    sourceId: string;
  }>;
  caseStudies: Array<{
    id: string;
    title: string;
    status: "bounded-comparative-reading-complete";
    scope: string;
    sourceIds: string[];
    representations: Array<{
      id: "ordinary-process" | "software-model" | "boundary-first-model";
      label: string;
      reveals: string;
      omits: string;
    }>;
    falseCollapse: string;
    result: string;
    mappingDecision: {
      candidate: string;
      grade: MappingGrade;
      decision: MappingDecision;
      rationale: string;
      breakpoint: string;
    };
  }>;
  counterexamples: Array<{
    id: string;
    mapping: string;
    observedResemblance: string;
    breakpoint: string;
    decision: CounterexampleDecision;
    maxGrade: MappingGrade;
  }>;
  openGates: string[];
  claimCeiling: string;
  routes: {
    program: string;
    argument: string;
    work: string;
    collaborate: string;
  };
};

const REQUIRED_OPERATIONAL_TUPLE = [
  "entity roles",
  "relations",
  "state representation",
  "admissible transitions",
  "protected invariants",
  "boundary conditions",
  "witness mechanisms",
  "failure modes",
  "responsibility routing",
  "repair operations",
];

const REQUIRED_GRADE_ORDER: MappingGrade[] = [
  "L0",
  "L1",
  "L2",
  "L3",
  "L4",
  "L5",
];

const REQUIRED_REPRESENTATIONS = [
  "ordinary-process",
  "software-model",
  "boundary-first-model",
];

function gradeNumber(grade: MappingGrade) {
  return Number(grade.slice(1));
}

function validateInternalRoute(name: string, value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    throw new Error(`Cross-domain research route ${name} must be internal.`);
  }
}

export function validateCrossDomainResearchProgram(
  value: CrossDomainResearchProgram,
): CrossDomainResearchProgram {
  if (
    value.schemaVersion !==
    "boundary-first.research-program.operational-homology.v1"
  ) {
    throw new Error("Unsupported cross-domain research-program schema.");
  }
  if (
    value.programStatus !==
    "bounded-comparative-program-active-pending-external-review"
  ) {
    throw new Error(
      "The cross-domain program must retain its pending external-review state.",
    );
  }

  if (
    value.operationalTuple.join("|") !==
    REQUIRED_OPERATIONAL_TUPLE.join("|")
  ) {
    throw new Error("The research program must preserve the operational tuple.");
  }

  const gradeOrder = value.mappingGrades.map((grade) => grade.level);
  if (gradeOrder.join("|") !== REQUIRED_GRADE_ORDER.join("|")) {
    throw new Error("Mapping grades must run from L0 through L5 in order.");
  }
  value.mappingGrades.forEach((grade) => {
    const shouldAllowHomologyName = gradeNumber(grade.level) >= 4;
    if (grade.operationalHomologyNameAllowed !== shouldAllowHomologyName) {
      throw new Error(
        "Operational-homology language is permitted only at L4 or L5.",
      );
    }
  });

  const sourceIds = new Set(value.sources.map((source) => source.id));
  if (sourceIds.size !== value.sources.length) {
    throw new Error("Research-program source identifiers must be unique.");
  }
  const externalSources = value.sources.filter(
    (source) => source.kind === "external-primary",
  );
  if (externalSources.length < 4) {
    throw new Error("The starter lexicon requires external primary sources.");
  }
  externalSources.forEach((source) => {
    if (!source.url?.startsWith("https://")) {
      throw new Error(`External source ${source.id} requires an HTTPS URL.`);
    }
  });

  const lexiconDomains = new Set(value.lexicon.map((entry) => entry.domain));
  if (value.lexicon.length < 10 || lexiconDomains.size < 4) {
    throw new Error(
      "The starter lexicon requires at least ten terms across four domains.",
    );
  }
  value.lexicon.forEach((entry) => {
    if (!sourceIds.has(entry.sourceId)) {
      throw new Error(`Lexicon entry ${entry.id} has an unknown source.`);
    }
    if (!entry.definition.trim()) {
      throw new Error(`Lexicon entry ${entry.id} requires a definition.`);
    }
  });

  if (value.caseStudies.length < 2) {
    throw new Error("The research program requires two bounded case studies.");
  }
  value.caseStudies.forEach((caseStudy) => {
    if (caseStudy.status !== "bounded-comparative-reading-complete") {
      throw new Error(`Case study ${caseStudy.id} is not complete.`);
    }
    const representations = caseStudy.representations.map(
      (representation) => representation.id,
    );
    if (representations.join("|") !== REQUIRED_REPRESENTATIONS.join("|")) {
      throw new Error(
        `Case study ${caseStudy.id} requires ordinary, software, and Boundary First views.`,
      );
    }
    caseStudy.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`Case study ${caseStudy.id} has an unknown source.`);
      }
    });
    if (
      caseStudy.mappingDecision.decision ===
        "promoted-operational-homology-candidate" &&
      gradeNumber(caseStudy.mappingDecision.grade) < 4
    ) {
      throw new Error(
        "An operational-homology candidate must be graded L4 or higher.",
      );
    }
  });

  if (
    !value.caseStudies.some((caseStudy) =>
      caseStudy.mappingDecision.decision.startsWith("promoted-"),
    )
  ) {
    throw new Error("At least one mapping decision must be promoted.");
  }
  if (value.counterexamples.length < 10) {
    throw new Error("The breakage ledger requires at least ten counterexamples.");
  }
  if (!value.counterexamples.some((entry) => entry.decision === "rejected")) {
    throw new Error("The breakage ledger must explicitly reject a mapping.");
  }

  if (!value.negativeResultRule.trim() || value.openGates.length < 3) {
    throw new Error("The program must remain negative-capable and open-gated.");
  }
  Object.entries(value.routes).forEach(([name, route]) =>
    validateInternalRoute(name, route),
  );

  return value;
}

export const crossDomainResearchProgram =
  validateCrossDomainResearchProgram(
    programData as CrossDomainResearchProgram,
  );

export const CROSS_DOMAIN_RESEARCH_PROGRAM_PATH =
  crossDomainResearchProgram.routes.program;
