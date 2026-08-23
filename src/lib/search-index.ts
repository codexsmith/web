import {
  getCrossEdges,
  nodes,
  type ContentNode,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { getEvidenceProfile, hasEvidenceProjection } from "@/lib/evidence-content";
import { semanticEventSearchText } from "@/lib/semantic-events";
import { getWorldOrientation } from "@/lib/world-orientation";

export type SearchChannel =
  | "identity"
  | "orientation"
  | "content"
  | "standing"
  | "evidence"
  | "relation"
  | "inspection"
  | "event";

export type SearchMatchReason = {
  channel: SearchChannel;
  label: string;
  excerpt: string;
};

type SearchSection = SearchMatchReason & {
  text: string;
  weight: number;
};

export type SearchRecord = {
  node: ContentNode;
  objectType: string;
  stage?: string;
  stageLabel?: string;
  hasEvidence: boolean;
  relationTypes: string[];
  relationCount: number;
  sections: SearchSection[];
};

export type SearchFilters = {
  objectType: string;
  stage: string;
  relation: string;
  evidenceOnly: boolean;
};

export type SearchResult = SearchRecord & {
  score: number;
  reasons: SearchMatchReason[];
};

export type SearchFacetOption = {
  value: string;
  label: string;
};

export type SearchFacetOptions = {
  objectTypes: SearchFacetOption[];
  stages: SearchFacetOption[];
  relations: SearchFacetOption[];
};

function humanize(value: string) {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function compact(values: Array<string | undefined | null>) {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

function section(
  channel: SearchChannel,
  label: string,
  values: Array<string | undefined | null>,
  weight: number,
  excerpt?: string,
): SearchSection | undefined {
  const present = compact(values);
  if (!present.length) return undefined;
  return {
    channel,
    label,
    excerpt: excerpt ?? present[0],
    text: present.join(" ").toLowerCase(),
    weight,
  };
}

function stageForNode(node: ContentNode) {
  if (node.publication) {
    return {
      stage: node.publication.stage,
      label: node.publication.label,
    };
  }
  if (node.status) {
    return {
      stage: node.status.stage,
      label: node.status.label,
    };
  }
  return undefined;
}

function objectTypeForNode(node: ContentNode) {
  return node.publication ? "publication" : node.kind;
}

export function buildSearchIndex(): SearchRecord[] {
  return nodes
    .filter((node) => node.id !== "root")
    .map(hydrateContentNode)
    .map((node) => {
      const evidence = getEvidenceProfile(node);
      const relations = getCrossEdges(node.id);
      const orientation = getWorldOrientation(node.id);
      const stage = stageForNode(node);

      const relationSections = relations.map((edge) => {
        const direction = edge.from === node.id ? "outgoing" : "incoming";
        const excerpt = `${direction} · ${edge.label} · ${edge.node.label}`;
        return section(
          "relation",
          "Typed relation",
          [edge.type, edge.label, edge.node.label, edge.node.shortLabel, edge.node.eyebrow],
          72,
          excerpt,
        );
      });

      const evidenceSections: Array<SearchSection | undefined> = [];
      if (evidence) {
        evidenceSections.push(
          section(
            "evidence",
            "Evidence standing",
            [evidence.currentStanding, evidence.evidenceLevel, evidence.claimCeiling, evidence.nextGate],
            78,
            evidence.currentStanding,
          ),
          section(
            "evidence",
            "Evidence claims",
            evidence.claims.flatMap((claim) => [claim.statement, claim.standing, claim.boundary]),
            74,
            evidence.claims[0]?.statement,
          ),
          section(
            "evidence",
            "Evidence sources",
            evidence.sources.flatMap((source) => [source.label, source.type, source.availability, source.owner, source.note]),
            70,
            evidence.sources[0]?.label,
          ),
        );
      }

      const sections = [
        section(
          "identity",
          "Identity",
          [node.label, node.shortLabel, node.path, node.eyebrow],
          100,
          node.label,
        ),
        section(
          "orientation",
          "Boundary orientation",
          [orientation?.boundary],
          84,
          orientation?.boundary,
        ),
        section(
          "content",
          "Object record",
          [node.summary, ...(node.body ?? [])],
          54,
          node.summary,
        ),
        section(
          "standing",
          "Declared standing",
          [
            node.status?.stage,
            node.status?.label,
            node.status?.detail,
            node.status?.sourceStatus,
            node.status?.provenance,
            node.publication?.stage,
            node.publication?.label,
            node.publication?.documentClass,
            node.publication?.claimMaturity,
            node.publication?.audience,
            node.publication?.nextGate,
            node.publication?.sourceRef,
          ],
          82,
          stage?.label,
        ),
        section(
          "inspection",
          "Inspection record",
          (node.inspection ?? []).flatMap((inspection) => [
            inspection.label,
            inspection.eyebrow,
            inspection.summary,
            inspection.sourceRef,
            ...inspection.bullets,
          ]),
          58,
          node.inspection?.[0]?.label,
        ),
        section(
          "event",
          "Standing event",
          semanticEventSearchText(node.id),
          64,
          semanticEventSearchText(node.id)[0],
        ),
        ...relationSections,
        ...evidenceSections,
      ].filter((item): item is SearchSection => Boolean(item));

      return {
        node,
        objectType: objectTypeForNode(node),
        stage: stage?.stage,
        stageLabel: stage?.label,
        hasEvidence: hasEvidenceProjection(node.id),
        relationTypes: Array.from(new Set(relations.map((edge) => edge.type))),
        relationCount: relations.length,
        sections,
      };
    });
}

export function searchFacetOptions(records: SearchRecord[]): SearchFacetOptions {
  const objectTypes = Array.from(new Set(records.map((record) => record.objectType)))
    .sort()
    .map((value) => ({ value, label: humanize(value) }));

  const stageLabels = new Map<string, string>();
  records.forEach((record) => {
    if (record.stage && !stageLabels.has(record.stage)) {
      stageLabels.set(record.stage, humanize(record.stage));
    }
  });

  const stages = Array.from(stageLabels, ([value, label]) => ({ value, label }))
    .sort((left, right) => left.label.localeCompare(right.label));

  const relations = Array.from(new Set(records.flatMap((record) => record.relationTypes)))
    .sort()
    .map((value) => ({ value, label: humanize(value) }));

  return { objectTypes, stages, relations };
}

function passesFilters(record: SearchRecord, filters: SearchFilters) {
  if (filters.objectType !== "all" && record.objectType !== filters.objectType) return false;
  if (filters.stage !== "all" && record.stage !== filters.stage) return false;
  if (filters.evidenceOnly && !record.hasEvidence) return false;
  if (filters.relation === "related" && record.relationCount === 0) return false;
  if (
    filters.relation !== "all"
    && filters.relation !== "related"
    && !record.relationTypes.includes(filters.relation)
  ) return false;
  return true;
}

export function searchLab(
  records: SearchRecord[],
  query: string,
  filters: SearchFilters,
  limit = 14,
): SearchResult[] {
  const needle = query.trim().toLowerCase();
  const terms = needle.split(/\s+/).filter(Boolean);

  return records
    .filter((record) => passesFilters(record, filters))
    .flatMap((record) => {
      if (!needle) return [{ ...record, score: 0, reasons: [] }];

      const combined = record.sections.map((item) => item.text).join(" ");
      if (!terms.every((term) => combined.includes(term))) return [];

      const matched = record.sections
        .map((item) => {
          const phraseMatch = item.text.includes(needle);
          const termMatches = terms.filter((term) => item.text.includes(term)).length;
          if (!phraseMatch && termMatches === 0) return undefined;
          return {
            item,
            score: item.weight + (phraseMatch ? 28 : 0) + termMatches * 5,
          };
        })
        .filter((item): item is { item: SearchSection; score: number } => Boolean(item))
        .sort((left, right) => right.score - left.score);

      const score = matched.reduce((total, match, index) => {
        return total + (index === 0 ? match.score : Math.round(match.score * 0.22));
      }, 0);

      const reasons = matched.slice(0, 2).map(({ item }) => ({
        channel: item.channel,
        label: item.label,
        excerpt: item.excerpt,
      }));

      return [{ ...record, score, reasons }];
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}
