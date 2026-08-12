import rawDataset from "../../content/audience_nodes.json";
import canonicalNodeData from "../../content/nodes.json";
import { publicationContent } from "../publication-suite";
import { domainHref } from "../site-navigation";
import {
  validateAudienceDataset,
  validateAudienceRelationshipReciprocity,
  validateCanonicalAudienceReferences,
} from "./schema";
import type {
  AudienceDataset,
  CanonicalNodeSummary,
  PublicationRecommendation,
} from "./types";

const canonicalIdAliases: Record<string, string> = {
  "agency-audit": "governance-institutions",
  "ai-as-forge": "ai-forge",
  "boundary-first-chess": "products-testbeds",
  "boundary-first-engineering": "bfe",
  "boundary-first-soccer": "products-testbeds",
  "claim-ledger": "corpus",
  closure: "boundary-theory",
  "closure-driven-development": "software-engineering-practice",
  "contradiction-register": "corpus-forge",
  "corpus-operations": "corpus",
  education: "on-ramps",
  "formal-spine": "representational-mechanics",
  "human-factors": "constructive-humanist-agentics",
  "lab-overview": "identity",
  "mathematics-formal-structures": "mathematics",
  "modern-posture": "positions",
  "physics-physical-regimes": "physics",
  "public-interface": "public-philosophy-satire",
  "research-programs": "boundary-theory",
  "software-before-code": "bfe",
  "software-engineering": "software-engineering-practice",
};

const nextActionAliases: Record<string, string> = {
  "/start": "/",
  "/learn": "/publications/civilizational-mechanics",
  "/tools/boundary-review":
    "/publications/civilizational-mechanics#interactive-mechanics",
  "/projects": "/work",
  "/services/agency-audit": "/domain/governance-institutions",
  "/agency": "/domain/constructive-humanist-agentics",
  "/teach": "/domain/on-ramps",
  "/research": "/domain/boundary-theory",
  "/review": "/domain/corpus",
};

const publicationCardByAudience: Record<string, string> = {
  "audience-curious": "nested-world",
  "audience-learner": "boundary-first-cycle",
  "audience-practitioner": "accounting-software",
  "audience-builder": "ai-acceleration",
  "audience-leader": "business-agent",
  "audience-affected": "externality-transfer",
  "audience-educator": "nested-world",
  "audience-researcher": "representational-evolution",
  "audience-critic": "repair-router",
  "audience-partner": "mission-atlas",
};

function normalizeCanonicalId(id: string): string {
  return canonicalIdAliases[id] ?? id;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

validateAudienceDataset(rawDataset);

export const audienceDataset: AudienceDataset = {
  ...rawDataset,
  intents: rawDataset.intents.map((intent) => ({
    ...intent,
    related: unique(intent.related.map(normalizeCanonicalId)),
  })),
  doorways: rawDataset.doorways.map((doorway) => ({
    ...doorway,
    domainNodeIds: unique(
      doorway.domainNodeIds.map(normalizeCanonicalId),
    ),
    audienceIds: unique([
      ...doorway.audienceIds,
      ...rawDataset.audiences
        .filter((audience) => audience.doorwayIds.includes(doorway.id))
        .map((audience) => audience.id),
    ]),
    related: unique(doorway.related.map(normalizeCanonicalId)),
  })),
  audiences: rawDataset.audiences.map((audience) => ({
    ...audience,
    recommendedNodeIds: unique(
      audience.recommendedNodeIds.map(normalizeCanonicalId),
    ),
    route: audience.route.map((step) => ({
      ...step,
      nodeRefs: step.nodeRefs
        .map((reference) => ({
          ...reference,
          id: normalizeCanonicalId(reference.id),
        }))
        .filter(
          (reference, index, references) =>
            references.findIndex((item) => item.id === reference.id) ===
            index,
        ),
    })),
    nextAction: {
      ...audience.nextAction,
      href:
        nextActionAliases[audience.nextAction.href] ??
        audience.nextAction.href,
    },
  })),
} as AudienceDataset;

validateAudienceDataset(audienceDataset);
validateAudienceRelationshipReciprocity(audienceDataset);

type RawCanonicalNode = {
  id: string;
  label: string;
  short?: string;
  title?: string;
};

export const canonicalNodeIndex: Readonly<
  Record<string, CanonicalNodeSummary>
> = Object.fromEntries(
  (canonicalNodeData as RawCanonicalNode[]).map((node) => [
    node.id,
    {
      id: node.id,
      label: node.label,
      summary: node.short ?? node.title ?? "",
      href: domainHref(node.id),
    },
  ]),
);

validateCanonicalAudienceReferences(
  audienceDataset,
  new Set(Object.keys(canonicalNodeIndex)),
);

export const publicationRecommendations: Readonly<
  Record<string, PublicationRecommendation>
> = Object.fromEntries(
  Object.entries(publicationCardByAudience).map(
    ([audienceId, cardId]) => {
      const card = publicationContent.featuredCards.find(
        (candidate) => candidate.id === cardId,
      );
      if (!card) {
        throw new Error(
          `Unknown publication card '${cardId}' for '${audienceId}'.`,
        );
      }
      return [
        audienceId,
        {
          audienceId,
          cardId,
          kicker: card.kicker,
          title: card.title,
          summary: card.summary,
          href: `/publications/civilizational-mechanics#step-${card.id}`,
        },
      ];
    },
  ),
);

export const publicationClaimCeiling = publicationContent.claimCeiling;

export const audienceCompatibilityAliases = Object.freeze({
  canonicalIds: canonicalIdAliases,
  nextActions: nextActionAliases,
});
