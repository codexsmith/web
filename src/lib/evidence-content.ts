import type { ContentNode } from "@/lib/content-registry";
import { nodes } from "@/lib/content-registry";
import { founderProfile } from "@/lib/founder-content";
import { getSemanticEvents, type SemanticEvent } from "@/lib/semantic-events";

export type EvidenceAvailability = "public" | "retained" | "internal";

export type EvidenceSource = {
  id: string;
  label: string;
  type: string;
  availability: EvidenceAvailability;
  href?: string;
  owner?: string;
  date?: string;
  note?: string;
};

export type EvidenceClaim = {
  id: string;
  statement: string;
  standing: string;
  supportIds: string[];
  boundary?: string;
};

export type EvidencePackage = {
  title?: string;
  eyebrow?: string;
  question: string;
  evidenceLevel: string;
  currentStanding: string;
  claimCeiling: string;
  nextGate: string;
  lastUpdated?: string;
  claims: EvidenceClaim[];
  sources: EvidenceSource[];
  limits?: string[];
  unknowns?: string[];
};

export type EvidenceProfile = EvidencePackage & {
  title: string;
  eyebrow: string;
  events: SemanticEvent[];
};

export type BranchEvidenceItem = {
  node: ContentNode;
  standing: string;
  stage: string;
  nextGate?: string;
};

export type BranchEvidenceEvent = SemanticEvent & {
  node: ContentNode;
};

export type BranchEvidenceSummary = {
  question: string;
  items: BranchEvidenceItem[];
  stageCounts: Array<{ stage: string; count: number }>;
  gates: Array<{ node: ContentNode; gate: string }>;
  events: BranchEvidenceEvent[];
};

const founderSources: EvidenceSource[] = [
  {
    id: "founder-public-provenance",
    label: "Founder and method provenance",
    type: "Public institutional provenance statement",
    availability: "public",
    href: "/about/provenance",
    owner: "Boundary First Labs",
    note: "Public and attributable, but not independent verification.",
  },
  {
    id: "founder-note",
    label: "Founder's Note",
    type: "Retained first-party source",
    availability: "retained",
    owner: founderProfile.name,
    note: "Supports origin, continuity, and responsibility claims as a first-party record.",
  },
  {
    id: "citywatch-delivery-record",
    label: "CityWatch historical delivery record",
    type: "Public work-product record",
    availability: "public",
    href: "/products/shipped/citywatch",
    owner: "Boundary First Labs",
    note: "A bounded example of prior software-delivery practice; it is not a complete career record.",
  },
];

const founderClaims: EvidenceClaim[] = [
  {
    id: "founder-responsibility",
    statement: `${founderProfile.name} is the founder and current steward responsible for Boundary First Labs' public work.`,
    standing: "publicly declared",
    supportIds: ["founder-public-provenance", "founder-note"],
    boundary: "Present responsibility does not make the founder an independent validator of the Lab's claims.",
  },
  {
    id: "founder-delivery-practice",
    statement: "Professional software delivery is part of the operating provenance behind the Lab's methods.",
    standing: "bounded work-product support",
    supportIds: ["founder-public-provenance", "citywatch-delivery-record"],
    boundary: "One retained delivery example does not establish every broader professional or cross-domain claim.",
  },
  {
    id: "founder-pre-ai-continuity",
    statement: "The underlying practice and research questions predate the current generative-AI cycle.",
    standing: "first-party provenance",
    supportIds: ["founder-note", "founder-public-provenance"],
    boundary: "The current public record is first-party and should not be read as independent historical verification.",
  },
  {
    id: "founder-concentration-risk",
    statement: "The Lab currently carries material founder-concentration risk in memory, method, and decision history.",
    standing: "institutional self-assessment",
    supportIds: ["founder-note"],
    boundary: "The mitigation path is stated; institutional durability has not yet been demonstrated.",
  },
];

const evidencePackages: Record<string, EvidencePackage> = {
  root: {
    title: founderProfile.name,
    eyebrow: "Founder evidence",
    question:
      "What supports the founder's provenance, delivery experience, continuity of work, and present institutional responsibility?",
    evidenceLevel: "Public provenance + retained first-party record",
    currentStanding: "Founder and current institutional steward",
    claimCeiling:
      "Biography establishes provenance and responsibility. It does not validate mathematical, scientific, legal, or institutional claims.",
    nextGate: "Add independent review, durable shared records, and evidence that the institution can operate beyond founder memory.",
    claims: founderClaims,
    sources: founderSources,
    limits: [
      "Corpus volume is not a substitute for evidence quality.",
      "Professional software experience does not automatically validate claims in other domains.",
      "AI assistance accelerates representation and comparison; it is not evidentiary or authorizing authority.",
    ],
    unknowns: ["The degree to which current methods can be transferred and operated independently remains unestablished."],
  },
  provenance: {
    eyebrow: "Institutional provenance",
    question:
      "Which public and retained records support the Lab's account of where its methods came from, and where does that account remain first-party?",
    evidenceLevel: "Public first-party provenance with bounded work-product support",
    currentStanding: "Attributed institutional origin record",
    claimCeiling:
      "The record supports origin, continuity, and responsibility. It does not independently validate the resulting research or establish every biographical detail.",
    nextGate: "Attach independently checkable education, delivery, publication, and review records claim by claim.",
    claims: founderClaims.slice(1),
    sources: founderSources,
    limits: [
      "The retained founder record is an accountable source, but it is still a first-party source.",
      "Methodological continuity across domains does not establish that those domains are equivalent.",
    ],
    unknowns: ["A complete public chronology and independent reviewer record have not yet been assembled."],
  },
  "corpus-forge": {
    eyebrow: "Product evidence",
    question: "What establishes Corpus Forge as an active program, and what remains unvalidated?",
    evidenceLevel: "Public specification + active internal validation record",
    currentStanding: "Active-development method and software program",
    claimCeiling:
      "The current record establishes an active program and validation activity, not a production-ready platform or successful validation result.",
    nextGate: "Publish a bounded validation report with test cases, failures, review decisions, and promotion criteria.",
    lastUpdated: "2026-08-18",
    claims: [
      {
        id: "corpus-forge-program",
        statement: "Corpus Forge exists as an active research-operations method and software-development program.",
        standing: "source-backed",
        supportIds: ["corpus-forge-public-record", "corpus-forge-project-register"],
        boundary: "This does not establish a complete or production-ready knowledge-management platform.",
      },
      {
        id: "corpus-forge-validation",
        statement: "A focused Corpus Forge agent-pipeline project is recorded in an active validation phase.",
        standing: "internally documented",
        supportIds: ["corpus-forge-project-register"],
        boundary: "Validation activity is not validation success, benchmark superiority, or safe autonomous promotion authority.",
      },
    ],
    sources: [
      {
        id: "corpus-forge-public-record",
        label: "Corpus Forge public product record",
        type: "Public product and method specification",
        availability: "public",
        href: "/corpus-forge",
        owner: "Boundary First Labs",
      },
      {
        id: "corpus-forge-project-register",
        label: "Corpus Forge Agent Pipeline project entry",
        type: "Retained project-status register",
        availability: "internal",
        owner: "Boundary First Labs",
        note: "The entry records active validation work; it does not record a successful validation outcome.",
      },
    ],
    limits: ["No production reliability, productivity, adoption, or comparative benchmark result is currently established."],
    unknowns: ["The public record does not yet show how the system performs under sustained multi-reviewer use."],
  },
  citywatch: {
    eyebrow: "Delivery evidence",
    question: "What is established about CityWatch's historical delivery, and what must not be inferred from it?",
    evidenceLevel: "Retained public delivery record",
    currentStanding: "Historical shipped municipal software",
    claimCeiling:
      "The retained record supports historical implementation and delivery, not current affiliation, endorsement, outcomes, awards, or present operation.",
    nextGate: "Attach independently recoverable delivery artifacts, dates, operating witnesses, and outcome records where public release is lawful.",
    lastUpdated: "2026-08-18",
    claims: [
      {
        id: "citywatch-delivered",
        statement: "CityWatch civic-transparency software was implemented and delivered inside Augusta-Richmond County IT.",
        standing: "historical delivery",
        supportIds: ["citywatch-public-record"],
        boundary: "The current public source is a retained first-party project record rather than an independent municipal archive.",
      },
      {
        id: "citywatch-representation",
        statement: "The delivered representation joined project, spending, infrastructure, status, timeline, media, and map context.",
        standing: "work-product description",
        supportIds: ["citywatch-public-record"],
        boundary: "The representation establishes product scope, not measured civic outcomes or present operation.",
      },
    ],
    sources: [
      {
        id: "citywatch-public-record",
        label: "Augusta CityWatch retained public record",
        type: "Historical product and delivery record",
        availability: "public",
        href: "/augusta-citywatch",
        owner: "Boundary First Labs",
        note: "Presented as historical professional standing with no claim of current municipal affiliation.",
      },
    ],
    limits: [
      "Boundary First Labs does not claim a current Augusta-Richmond County relationship, sponsorship, authorization, or endorsement.",
      "Awards, commendations, usage outcomes, and present operating status remain unclaimed without additional evidence.",
    ],
    unknowns: ["Independent public delivery and outcome records have not yet been linked into this evidence package."],
  },
  "augusta-civic": {
    eyebrow: "Project-direction evidence",
    question: "What supports Augusta Civic Infrastructure as a legitimate project direction without overstating municipal standing?",
    evidenceLevel: "Declared project direction + historical delivery lineage",
    currentStanding: "Planned Boundary First Labs public-interest project",
    claimCeiling:
      "The record supports a planned project direction informed by prior work; it does not establish current municipal participation or authorization.",
    nextGate: "Choose one bounded civic question, identify lawful public sources, and publish an inspectable pilot artifact.",
    lastUpdated: "2026-08-18",
    claims: [
      {
        id: "augusta-civic-direction",
        statement: "Augusta Civic Infrastructure is a declared Boundary First Labs public-interest project direction.",
        standing: "planned",
        supportIds: ["augusta-civic-definition"],
        boundary: "A declared direction is not a funded, authorized, or active municipal engagement.",
      },
      {
        id: "augusta-civic-lineage",
        statement: "The direction is informed by historical CityWatch implementation experience.",
        standing: "bounded lineage",
        supportIds: ["augusta-civic-definition", "augusta-citywatch-lineage"],
        boundary: "Historical delivery supplies relevant experience, not present institutional standing.",
      },
    ],
    sources: [
      {
        id: "augusta-civic-definition",
        label: "Augusta Civic Infrastructure project definition",
        type: "Retained public-interest project record",
        availability: "retained",
        owner: "Boundary First Labs",
      },
      {
        id: "augusta-citywatch-lineage",
        label: "CityWatch historical delivery record",
        type: "Public work-product lineage",
        availability: "public",
        href: "/products/shipped/citywatch",
        owner: "Boundary First Labs",
      },
    ],
    limits: ["No municipal sponsorship, endorsement, funding, data access, authorization, or participation is claimed."],
    unknowns: ["The first bounded civic question, source set, collaborator, and public artifact remain to be selected."],
  },
  "pub-executable-distinctions": {
    eyebrow: "Publication evidence",
    question: "What exists as a manuscript, what is under review, and what remains an argument rather than an established result?",
    evidenceLevel: "Substantive manuscript under internal review",
    currentStanding: "Working v0.1 publication · review pending",
    claimCeiling:
      "The manuscript establishes a developed public argument, not external validation of its cross-domain comparisons or universal applicability.",
    nextGate: "Complete founder and research review, tighten cross-domain ceilings, and record external criticism before stable release.",
    claims: [
      {
        id: "executable-distinctions-manuscript",
        statement: "A substantive v0.1 manuscript exists and presents a coherent token-to-consequence argument.",
        standing: "manuscript documented",
        supportIds: ["executable-distinctions-source"],
        boundary: "Manuscript completeness does not establish the validity of every argument it contains.",
      },
      {
        id: "executable-distinctions-review",
        statement: "The manuscript is currently positioned for focused founder and research review.",
        standing: "internal review pending",
        supportIds: ["executable-distinctions-source"],
        boundary: "Review status does not imply that external or domain-specific review has occurred.",
      },
    ],
    sources: [
      {
        id: "executable-distinctions-source",
        label: "Executable Distinctions v0.1 manuscript",
        type: "Retained working manuscript",
        availability: "retained",
        owner: "Boundary First Labs",
        note: "The manuscript is the evidence for document existence and maturity, not independent evidence for its substantive claims.",
      },
      {
        id: "executable-representation-context",
        label: "Executable Representation research object",
        type: "Public research context",
        availability: "public",
        href: "/research/software/executable-representation",
        owner: "Boundary First Labs",
      },
    ],
    limits: ["No external peer review, empirical validation, or cross-domain expert review is currently recorded."],
    unknowns: ["Which comparisons survive domain-specific criticism remains an open publication gate."],
  },
};

const branchQuestions: Record<string, string> = {
  products: "Which products have declared standing, what supports that standing, and which promotion gates remain open?",
  research: "Which research objects carry an explicit maturity claim, and where are validation burdens still open?",
  "public-interest": "Which public-interest commitments and projects have evidence-bearing standing without overstating partners or outcomes?",
  publications: "Which manuscripts exist, how mature are they as publications, and what review gates remain before stronger release?",
  about: "Which institutional and provenance claims have a public evidence package, and where does first-party testimony remain the boundary?",
};

const stageOrder = [
  "shipped",
  "published",
  "developed",
  "working-public",
  "active-development",
  "review",
  "launch-candidate",
  "pilot",
  "draft",
  "seed",
  "planned",
  "recorded",
];

function descendantsOf(nodeId: string): ContentNode[] {
  const result: ContentNode[] = [];
  const pending = nodes.filter((node) => node.parentId === nodeId);

  while (pending.length) {
    const node = pending.shift()!;
    result.push(node);
    pending.push(...nodes.filter((candidate) => candidate.parentId === node.id));
  }

  return result;
}

function hasDirectEvidence(node: ContentNode): boolean {
  return Boolean(
    evidencePackages[node.id]
      || node.status
      || node.publication
      || getSemanticEvents(node.id).length,
  );
}

function stageForNode(node: ContentNode): string {
  if (node.publication) return node.publication.stage;
  if (node.status) return node.status.stage;
  if (getSemanticEvents(node.id).length) return "recorded";
  return "declared";
}

function humanizeSlug(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replaceAll(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sourceFromReference(reference: string, node: ContentNode, index: number): EvidenceSource {
  const normalized = reference.replaceAll("\\", "/");
  const publicRecord = node.links?.find((link) => link.href.startsWith("/"));

  if (normalized.includes("project_index")) {
    return {
      id: `ledger-source-${index}`,
      label: `${node.label} project register entry`,
      type: "Retained project-status register",
      availability: "internal",
      owner: "Boundary First Labs",
    };
  }

  if (normalized.includes("product-landing-pages")) {
    return {
      id: `ledger-source-${index}`,
      label: `${node.label} retained public record`,
      type: "Product or program source record",
      availability: publicRecord ? "public" : "retained",
      href: publicRecord?.href,
      owner: "Boundary First Labs",
    };
  }

  if (normalized.includes("content/artifacts")) {
    const filename = normalized.split("/").at(-1) ?? `${node.label} manuscript`;
    return {
      id: `ledger-source-${index}`,
      label: humanizeSlug(filename),
      type: "Retained manuscript or research artifact",
      availability: "retained",
      owner: "Boundary First Labs",
    };
  }

  if (!normalized.includes("/") && !normalized.includes("#")) {
    return {
      id: `ledger-source-${index}`,
      label: reference,
      type: "Retained public record",
      availability: "retained",
      owner: "Boundary First Labs",
    };
  }

  return {
    id: `ledger-source-${index}`,
    label: `${node.label} retained source ${index + 1}`,
    type: "Retained supporting record",
    availability: "retained",
    owner: "Boundary First Labs",
  };
}

function generatedSources(node: ContentNode, events: SemanticEvent[]): EvidenceSource[] {
  const result: EvidenceSource[] = [];

  if (node.publication) {
    result.push({
      id: "publication-manuscript",
      label: `${node.label} manuscript source`,
      type: node.publication.documentClass,
      availability: "retained",
      owner: "Boundary First Labs",
      note: "Supports the existence and development state of the manuscript, not the truth of every underlying claim.",
    });
  } else if (node.status) {
    const publicRecord = node.links?.find((link) => link.href.startsWith("/"));
    result.push({
      id: "declared-standing-source",
      label: publicRecord?.label ?? node.status.provenance ?? `${node.label} standing record`,
      type: publicRecord?.eyebrow ?? "Public portfolio standing declaration",
      availability: publicRecord ? "public" : "retained",
      href: publicRecord?.href,
      owner: "Boundary First Labs",
      note: node.status.provenance ? `Declared provenance: ${node.status.provenance}.` : undefined,
    });
  }

  events.flatMap((event) => event.evidenceRefs).forEach((reference, index) => {
    result.push(sourceFromReference(reference, node, index));
  });

  const seen = new Set<string>();
  return result.filter((source) => {
    const key = `${source.label.toLowerCase()}|${source.href ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function generatedClaim(node: ContentNode, sources: EvidenceSource[], events: SemanticEvent[]): EvidenceClaim {
  if (node.publication) {
    return {
      id: `${node.id}-publication-standing`,
      statement: `${node.label} exists as a ${node.publication.documentClass.toLowerCase()} at the ${node.publication.stage.replaceAll("-", " ")} stage.`,
      standing: "manuscript state declared",
      supportIds: sources.map((source) => source.id),
      boundary: "Publication maturity does not establish proof, empirical validation, adoption, or external endorsement of the subject.",
    };
  }

  if (node.status) {
    return {
      id: `${node.id}-declared-standing`,
      statement: node.status.detail,
      standing: node.status.label,
      supportIds: sources.map((source) => source.id),
      boundary: events[0]?.claimCeiling,
    };
  }

  return {
    id: `${node.id}-recorded-event`,
    statement: events[0]?.summary ?? `${node.label} has an admitted standing record.`,
    standing: events[0]?.label ?? "standing recorded",
    supportIds: sources.map((source) => source.id),
    boundary: events[0]?.claimCeiling,
  };
}

export function getEvidencePackage(nodeId: string): EvidencePackage | undefined {
  return evidencePackages[nodeId];
}

export function hasEvidenceProjection(nodeId: string): boolean {
  const node = nodes.find((candidate) => candidate.id === nodeId);
  if (!node) return false;
  if (hasDirectEvidence(node)) return true;
  return descendantsOf(nodeId).some(hasDirectEvidence);
}

export function getEvidenceProfile(node: ContentNode): EvidenceProfile | undefined {
  const declared = evidencePackages[node.id];
  const events = getSemanticEvents(node.id);
  if (!declared && !node.status && !node.publication && !events.length) return undefined;

  if (declared) {
    return {
      ...declared,
      title: declared.title ?? node.label,
      eyebrow: declared.eyebrow ?? "Evidence",
      events,
    };
  }

  const sources = generatedSources(node, events);
  const latestEvent = events[0];
  const isPublication = Boolean(node.publication);
  const currentStanding = node.publication?.label ?? node.status?.label ?? latestEvent?.label ?? "Standing recorded";
  const claimCeiling = latestEvent?.claimCeiling
    ?? (isPublication
      ? "The manuscript record establishes document existence and development state, not proof or validation of its subject."
      : `The declared ${node.status?.stage ?? "recorded"} standing does not establish broader performance, validation, adoption, outcome, or endorsement claims.`);

  return {
    title: node.label,
    eyebrow: isPublication ? "Publication evidence" : "Standing evidence",
    question: isPublication
      ? "What manuscript exists, how mature is it as a publication, and what must remain distinct from the validity of its subject?"
      : "What supports the current standing of this object, and what would be required before that standing could be promoted?",
    evidenceLevel: isPublication
      ? "Retained manuscript + declared publication state"
      : latestEvent
        ? "Declared standing + admitted lineage event"
        : "Declared first-party standing",
    currentStanding,
    claimCeiling,
    nextGate: node.publication?.nextGate ?? "A route-specific evidence gate has not yet been declared.",
    lastUpdated: latestEvent?.effectiveAt ?? latestEvent?.recordedAt,
    claims: [generatedClaim(node, sources, events)],
    sources,
    limits: node.publication
      ? ["Manuscript maturity and epistemic validity remain separate axes."]
      : undefined,
    events,
  };
}

export function getBranchEvidenceSummary(node: ContentNode): BranchEvidenceSummary {
  const evidenceNodes = descendantsOf(node.id).filter(hasDirectEvidence);
  const items = evidenceNodes.map((candidate) => {
    const profile = getEvidenceProfile(candidate);
    return {
      node: candidate,
      standing: profile?.currentStanding ?? "Evidence package declared",
      stage: stageForNode(candidate),
      nextGate: profile?.nextGate,
    };
  });

  const counts = new Map<string, number>();
  items.forEach((item) => counts.set(item.stage, (counts.get(item.stage) ?? 0) + 1));
  const stageCounts = Array.from(counts, ([stage, count]) => ({ stage, count })).sort((left, right) => {
    const leftIndex = stageOrder.indexOf(left.stage);
    const rightIndex = stageOrder.indexOf(right.stage);
    return (leftIndex < 0 ? stageOrder.length : leftIndex) - (rightIndex < 0 ? stageOrder.length : rightIndex);
  });

  const gates = items
    .filter((item) => item.nextGate && item.nextGate !== "A route-specific evidence gate has not yet been declared.")
    .map((item) => ({ node: item.node, gate: item.nextGate! }));

  const events = evidenceNodes
    .flatMap((candidate) => getSemanticEvents(candidate.id).map((event) => ({ ...event, node: candidate })))
    .sort((left, right) => {
      const leftDate = left.effectiveAt ?? left.recordedAt;
      const rightDate = right.effectiveAt ?? right.recordedAt;
      return rightDate.localeCompare(leftDate);
    });

  return {
    question: branchQuestions[node.id]
      ?? `Which objects inside ${node.label} carry evidence-bearing standing, and which promotion gates remain open?`,
    items,
    stageCounts,
    gates,
    events,
  };
}
