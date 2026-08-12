"use client";

import {
  ArrowRight,
  ListTree,
} from "lucide-react";
import type {
  GraphNode,
  SemanticRecord,
  SemanticTarget,
} from "@/app/context/GraphContext";
import { slugifyFacet } from "@/app/context/facets";
import {
  entityDashArray,
  entityKindLabels,
  inferEntityKind,
  layerPalettes,
  paletteForLayer,
  paletteForNode,
  projectionLabels,
  semanticShapePath,
  type EntityKind,
  type MapProjection,
} from "@/lib/map-semantics";
import {
  asRecord,
  asRecordArray,
  asString,
  asStringArray,
  type ContentRecord,
} from "@/lib/content";

export type HaloEntity = {
  id: string;
  label: string;
  summary: string;
  kind: EntityKind;
  layer: string;
  relationType: string;
  authority: string;
  evidence: string;
  status: string;
  closure: string;
  direction?: string;
  directionality?: string;
  rationale?: string;
  belonging?: string;
  definitionStatus?: string;
  evidenceStatus?: string;
  stage?: string;
  productStage?: string;
  auditDate?: string;
  sourceId?: string;
  recordHref?: string;
  actionLabel?: string;
  targetOptions?: SemanticTarget[];
};

type PositionedEntity = HaloEntity & {
  x: number;
  y: number;
  ring: "facet" | "relation" | "horizon";
};

type ContextHaloProps = {
  active: GraphNode;
  nodes: GraphNode[];
  projection: MapProjection;
  selectedRelationId?: string | null;
  onInspectRelation: (entity: HaloEntity) => void;
  onOpenRecord: () => void;
};

function recordLabel(record: ContentRecord, fallback: string): string {
  return asString(
    record.label,
    asString(
      record.title,
      asString(
        record.statement,
        asString(record.work, asString(record.name, fallback)),
      ),
    ),
  );
}

function recordSummary(record: ContentRecord, fallback: string): string {
  return asString(
    record.description,
    asString(
      record.summary,
      asString(
        record.body,
        asString(record.purpose, asString(record.relation, fallback)),
      ),
    ),
  );
}

function stringRecord(value: string, prefix: string, index: number): ContentRecord {
  return {
    id: `${prefix}-${index}`,
    label: value,
  };
}

function toHaloEntity(
  record: ContentRecord,
  options: {
    fallbackLabel: string;
    kind: EntityKind;
    layer: string;
    relationType: string;
    index: number;
    sourceId?: string;
    recordHref?: string;
    actionLabel?: string;
  },
): HaloEntity {
  const label = recordLabel(record, options.fallbackLabel);
  const targetOptions = asRecordArray(record.targetOptions)
    .map((target) => ({
      id: asString(target.id),
      label: asString(target.label),
      recordHref: asString(target.recordHref),
    }))
    .filter(
      (target): target is SemanticTarget =>
        Boolean(target.id && target.label && target.recordHref),
    );
  return {
    id: asString(record.id, `${options.relationType}-${options.index}-${label}`),
    label,
    summary: recordSummary(
      record,
      `A ${entityKindLabels[options.kind].toLowerCase()} related through ${options.relationType.toLowerCase()}.`,
    ),
    kind: inferEntityKind(record, options.kind),
    layer: asString(record.layer, options.layer),
    relationType: asString(record.relationType, options.relationType),
    authority: asString(
      record.authority,
      asString(
        record.boundary,
        options.kind === "collaborator"
          ? "Authority is limited to the declared role and scope."
          : "No additional authority is implied by this relation.",
      ),
    ),
    evidence: asString(
      record.evidence,
      asString(
        record.claimCeiling,
        asString(
          record.status,
          options.kind === "evidence"
            ? "Evidence status is recorded at the source."
            : "No promotion is implied by proximity.",
        ),
      ),
    ),
    status: asString(
      record.status,
      asString(record.maturity, "Contextual relation"),
    ),
    closure: asString(
      record.closure,
      asString(
        record.closureConditions,
        "Correction, replacement, withdrawal, transfer, or retirement remains governed by the source record.",
      ),
    ),
    direction: asString(record.direction),
    directionality: asString(record.directionality),
    rationale: asString(record.rationale),
    belonging: asString(record.belonging),
    definitionStatus: asString(record.definitionStatus),
    evidenceStatus: asString(record.evidenceStatus),
    stage: asString(record.stage),
    productStage: asString(record.productStage),
    auditDate: asString(record.auditDate),
    sourceId: asString(
      record.targetId,
      asString(record.sourceId, options.sourceId),
    ),
    recordHref: asString(record.recordHref, options.recordHref),
    actionLabel: asString(record.actionLabel, options.actionLabel),
    targetOptions,
  };
}

function facetRecord(active: GraphNode, facet: string, index: number): ContentRecord {
  const facetSlug = slugifyFacet(facet);
  const canonicalRecord = active.facetRecords?.find(
    (record) =>
      asString(record.id) === `facet-${active.id}-${facetSlug}` ||
      asString(record.slug) === facetSlug,
  );
  if (canonicalRecord) {
    return canonicalRecord;
  }
  const structuredRecords = [
    ...asRecordArray(active.researchShelves),
    ...asRecordArray(active.facetRecords),
    ...asRecordArray(active.researchFacets),
    ...asRecordArray(active.shelves),
  ];
  const structuredRecord = structuredRecords.find((record) => {
    const recordId = slugifyFacet(asString(record.id));
    const recordLabelSlug = slugifyFacet(recordLabel(record, ""));
    return recordId === facetSlug || recordLabelSlug === facetSlug;
  });
  const structuredSummary = structuredRecord
    ? recordSummary(structuredRecord, "")
    : "";
  const summary =
    structuredSummary ||
    `Within ${active.label}, ${facet} bounds inquiry into ${facet.toLowerCase()}. ${active.short}`;

  return {
    ...(structuredRecord ?? {}),
    id: `facet-${active.id}-${facetSlug}`,
    label: facet,
    description: summary,
    status: "Declared facet",
    authority: `Scope is inherited from ${active.label}; selecting this facet does not authorize operational or public-result claims.`,
    evidence: "No facet-specific evidence source is linked.",
    closure: `Revise the facet declaration in ${active.label} and review its target, evidence, and product links separately.`,
    index,
  };
}

export function buildFacetHaloEntity(
  active: GraphNode,
  facet: string,
  index = active.facets.indexOf(facet),
): HaloEntity {
  const safeIndex = index >= 0 ? index : 0;
  const facetSlug = slugifyFacet(facet);
  return toHaloEntity(facetRecord(active, facet, safeIndex), {
    fallbackLabel: `Facet ${safeIndex + 1}`,
    kind: "facet",
    layer: asString(active.layer, "support"),
    relationType: "Facet affinity",
    index: safeIndex,
    sourceId: active.id,
    recordHref: `/domain/${active.id}#${facetSlug}`,
    actionLabel: "Open facet in record",
  });
}

function relatedDomainEntities(
  active: GraphNode,
  nodes: GraphNode[],
): HaloEntity[] {
  return (active.relationRecords ?? [])
    .map((record, index) => {
      const target = nodes.find((node) => node.id === record.targetId);
      if (!target) return null;
      return toHaloEntity(record, {
        fallbackLabel: target.label,
        kind: inferEntityKind(target, "domain"),
        layer: asString(target.layer, "support"),
        relationType: record.relationType,
        index,
        sourceId: target.id,
        recordHref: record.recordHref ?? `/domain/${target.id}`,
        actionLabel: record.actionLabel ?? "Open related domain",
      });
    })
    .filter((entity): entity is HaloEntity => Boolean(entity));
}

function projectionEntities(
  active: GraphNode,
  identity: GraphNode | undefined,
  nodes: GraphNode[],
  projection: MapProjection,
): HaloEntity[] {
  if (projection === "domains") {
    return relatedDomainEntities(active, nodes).slice(0, 8);
  }

  const canonicalRecords = active.projectionRecords?.[projection] ?? [];
  if (canonicalRecords.length) {
    const kindByProjection: Record<
      Exclude<MapProjection, "domains">,
      EntityKind
    > = {
      work: "project",
      evidence: "evidence",
      lineage: "lineage",
      governance: "policy",
      collaboration: "collaborator",
    };
    return canonicalRecords.slice(0, 8).map((record, index) =>
      toHaloEntity(record as SemanticRecord, {
        fallbackLabel: `${projectionLabels[projection]} record ${index + 1}`,
        kind: kindByProjection[projection],
        layer: asString(record.layer, asString(active.layer, "support")),
        relationType: asString(record.relationType, projectionLabels[projection]),
        index,
        sourceId: asString(record.sourceId, active.id),
        recordHref: asString(record.recordHref, `/domain/${active.id}`),
        actionLabel: asString(record.actionLabel, "Open source record"),
      }),
    );
  }

  if (projection === "work") {
    const records = [
      ...asRecordArray(active.researchPrograms),
      ...asRecordArray(active.practicePrograms),
      ...asRecordArray(active.programs),
      ...asRecordArray(active.softwarePortfolio),
    ];
    return records.slice(0, 8).map((record, index) =>
      toHaloEntity(record, {
        fallbackLabel: `Work record ${index + 1}`,
        kind: inferEntityKind(record, "project"),
        layer: "practice",
        relationType: "Work",
        index,
      }),
    );
  }

  if (projection === "evidence") {
    const claims = asStringArray(active.claims).map((value, index) =>
      stringRecord(value, "claim", index),
    );
    const documents = asRecordArray(active.documents);
    const evidenceStages =
      active.id === "identity"
        ? asRecordArray(asRecord(identity?.evidenceArchitecture).stages)
        : [];
    return [...claims, ...documents, ...evidenceStages]
      .slice(0, 8)
      .map((record, index) =>
        toHaloEntity(record, {
          fallbackLabel: `Evidence record ${index + 1}`,
          kind: "evidence",
          layer: "proof",
          relationType: "Evidence",
          index,
        }),
      );
  }

  if (projection === "lineage") {
    const history = asRecord(active.history);
    const records = [
      ...asRecordArray(active.conceptualLineage),
      ...asRecordArray(history.buildsFrom),
      ...asRecordArray(history.historicalArc),
    ];
    return records.slice(0, 8).map((record, index) =>
      toHaloEntity(record, {
        fallbackLabel: `Lineage source ${index + 1}`,
        kind: "lineage",
        layer: "research",
        relationType: "Lineage",
        index,
      }),
    );
  }

  if (projection === "collaboration") {
    const collaboration = asRecord(identity?.collaboration);
    const records = [
      ...asRecordArray(collaboration.roleClasses),
      ...asRecordArray(collaboration.collaborationModes),
    ];
    return records.slice(0, 8).map((record, index) =>
      toHaloEntity(record, {
        fallbackLabel: `Collaboration role ${index + 1}`,
        kind: "collaborator",
        layer: "public-interface",
        relationType: "Collaboration",
        index,
      }),
    );
  }

  const governanceRelations = [
    {
      id: `claim-boundary-${active.id}`,
      label: `${active.label} claim boundary`,
      description: asString(
        active.coreThesis,
        `Claims made under ${active.label} remain bounded to its declared role and evidence.`,
      ),
      authority: `${active.label} may organize inquiry within its declared role; it cannot promote claims beyond appropriate evidence or professional authority.`,
      sourceId: active.id,
    },
    {
      id: `evidence-gate-${active.id}`,
      label: `${active.label} evidence gate`,
      description: `The source record exposes ${active.claims?.length ?? 0} claim statements and ${active.documents?.length ?? 0} document references. Promotion remains proportionate to the relevant proof, review, and use standard.`,
      evidence: "Counts are derived from the canonical domain record.",
      sourceId: active.id,
    },
    {
      id: `closure-${active.id}`,
      label: `${active.label} correction and closure`,
      description: `Correction, replacement, withdrawal, transfer, or retirement must remain attached to the versioned ${active.label} record.`,
      closure: "Preserve provenance, material disagreement, affected dependencies, and the final stewardship decision.",
      sourceId: active.id,
    },
  ];

  return governanceRelations.map((record, index) =>
    toHaloEntity(record, {
      fallbackLabel: `Governance relation ${index + 1}`,
      kind: "policy",
      layer: "public-policy",
      relationType: "Governance",
      index,
      sourceId: record.sourceId,
    }),
  );
}

export function buildContextHaloEntities(
  active: GraphNode,
  nodes: GraphNode[],
  projection: MapProjection,
): {
  facetEntities: HaloEntity[];
  closeEntities: HaloEntity[];
  horizonEntities: HaloEntity[];
} {
  const identity = nodes.find((node) => node.id === "identity");
  const candidateFacetEntities = active.facets
    .slice(0, 12)
    .map((facet, index) => buildFacetHaloEntity(active, facet, index));
  const closeEntities = projectionEntities(
    active,
    identity,
    nodes,
    projection,
  );
  const closeSourceIds = new Set(
    closeEntities
      .map((entity) => entity.sourceId)
      .filter((id): id is string => Boolean(id)),
  );
  const relatedIds = new Set(
    (active.relationRecords ?? [])
      .map((record) => record.targetId)
      .filter((id): id is string => Boolean(id)),
  );
  const closeLabelKeys = new Set(
    closeEntities.map((entity) => normalizeEntityLabel(entity.label)),
  );
  const horizonEntities: HaloEntity[] = nodes
    .filter(
      (node) =>
        node.id !== active.id &&
        !closeSourceIds.has(node.id) &&
        (active.id === "identity" ||
          relatedIds.has(node.id) ||
          node.layer === active.layer),
    )
    .slice(0, 8)
    .map((node) => ({
      id: `horizon-${node.id}`,
      label: node.label,
      summary: node.short,
      kind: inferEntityKind(node, "domain"),
      layer: asString(node.layer, "support"),
      relationType: "Domain horizon",
      authority: "Horizon proximity supplies context, not authority.",
      evidence: "Horizon placement is contextual; no relation-specific evidence is asserted.",
      status: asString(node.role, "Domain"),
      closure: "This contextual relation remains revisable.",
      sourceId: node.id,
    }))
    .filter(
      (entity) => !closeLabelKeys.has(normalizeEntityLabel(entity.label)),
    );
  const canonicalLabelKeys = new Set(
    [...closeEntities, ...horizonEntities].map((entity) =>
      normalizeEntityLabel(entity.label),
    ),
  );
  const facetEntities = candidateFacetEntities.filter(
    (entity) => !canonicalLabelKeys.has(normalizeEntityLabel(entity.label)),
  );

  return { facetEntities, closeEntities, horizonEntities };
}

function positionOnRing(
  entity: HaloEntity,
  index: number,
  count: number,
  radius: number,
  ring: PositionedEntity["ring"],
  rotation = -Math.PI / 2,
): PositionedEntity {
  const angle = rotation + (index * Math.PI * 2) / Math.max(count, 1);
  const roundCoordinate = (value: number) => Math.round(value * 1000) / 1000;
  return {
    ...entity,
    x: roundCoordinate(Math.cos(angle) * radius),
    y: roundCoordinate(Math.sin(angle) * radius),
    ring,
  };
}

function labelLines(
  label: string,
  maxCharacters = 12,
  maxLines = 3,
): string[] {
  const words = label
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((word) => {
      const semanticChunks = word.includes("-")
        ? word
            .split("-")
            .filter(Boolean)
            .map((part, index, parts) =>
              index < parts.length - 1 ? `${part}-` : part,
            )
        : [word];
      return semanticChunks.flatMap((semanticChunk) => {
        if (semanticChunk.length <= maxCharacters) {
          return [semanticChunk];
        }
        const chunks: string[] = [];
        const chunkSize = Math.max(2, maxCharacters - 1);
        let remainder = semanticChunk;
        while (remainder.length > maxCharacters) {
          chunks.push(`${remainder.slice(0, chunkSize)}-`);
          remainder = remainder.slice(chunkSize);
        }
        if (remainder) chunks.push(remainder);
        return chunks;
      });
    });
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const fitted = lines.slice(0, maxLines);
  fitted[maxLines - 1] = `${fitted[maxLines - 1].slice(
    0,
    Math.max(1, maxCharacters - 1),
  )}…`;
  return fitted;
}

function normalizeEntityLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function radialInnerPoint(
  entity: PositionedEntity,
  radius: number,
): { x: number; y: number } {
  const angle = Math.atan2(entity.y, entity.x);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function edgeStyle(relationType: string) {
  const normalized = relationType.toLowerCase();
  if (normalized.includes("evidence")) {
    return { dash: "2 6", width: 2.2, opacity: 0.9 };
  }
  if (normalized.includes("lineage")) {
    return { dash: "4 6", width: 1.4, opacity: 0.62 };
  }
  if (normalized.includes("governance")) {
    return { dash: "10 4", width: 2.3, opacity: 0.9 };
  }
  if (normalized.includes("collaboration")) {
    return { dash: "12 5 2 5", width: 2, opacity: 0.85 };
  }
  if (normalized.includes("work")) {
    return { dash: undefined, width: 2.7, opacity: 0.88 };
  }
  if (normalized.includes("facet")) {
    return { dash: undefined, width: 1.2, opacity: 0.65 };
  }
  return { dash: undefined, width: 1.7, opacity: 0.72 };
}

function HaloNode({
  entity,
  onInspect,
  selected = false,
  compact = false,
}: {
  entity: PositionedEntity;
  onInspect: (entity: HaloEntity) => void;
  selected?: boolean;
  compact?: boolean;
}) {
  const palette = paletteForLayer(entity.layer);
  const labelFontSize = compact
    ? 13
    : entity.ring === "horizon"
      ? 17
      : entity.label.length > 32
        ? 18
        : 20;
  const lineHeight = labelFontSize + 2;
  const maxCharacters = compact
    ? 13
    : 13;
  const maxLines = compact
    ? 4
    : entity.ring === "facet"
      ? 5
      : entity.ring === "relation"
        ? 4
        : 3;
  const lines = labelLines(
    entity.label,
    maxCharacters,
    maxLines,
  );
  const longestLine = Math.max(
    1,
    ...lines.map((line) => line.length),
  );
  const estimatedTextWidth = longestLine * labelFontSize * 0.58;
  const estimatedTextHeight = lines.length * lineHeight;
  const baseSize = compact
    ? 54
    : entity.ring === "facet"
      ? 60
      : entity.ring === "relation"
        ? 60
        : 50;
  const maxSize = compact
    ? 68
    : entity.ring === "facet"
      ? 84
      : entity.ring === "relation"
        ? 84
        : 66;
  const size = Math.min(
    maxSize,
    Math.max(
      baseSize,
      Math.ceil(estimatedTextWidth / 1.55 + 10),
      Math.ceil(estimatedTextHeight / 1.45 + 8),
    ),
  );
  const dash = entityDashArray(entity.kind);

  return (
    <g
      aria-controls="map-selection-details"
      aria-label={`${entityKindLabels[entity.kind]}: ${entity.label}. ${entity.relationType}`}
      aria-pressed={selected}
      className="group cursor-pointer outline-none"
      onClick={(event) => {
        event.currentTarget.focus();
        onInspect(entity);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onInspect(entity);
        }
      }}
      role="button"
      tabIndex={0}
      transform={`translate(${entity.x} ${entity.y})`}
    >
      <title>{`${entity.label} — ${entity.relationType}. ${entity.summary}`}</title>
      <path
        className={`${selected ? "opacity-100" : "opacity-0"} pointer-events-none transition-opacity group-focus:opacity-100`}
        d={semanticShapePath(entity.kind, size + 10)}
        fill="none"
        stroke={palette.ink}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={semanticShapePath(entity.kind, size)}
        fill={palette.soft}
        stroke={palette.solid}
        strokeDasharray={dash}
        strokeWidth={selected ? 3.6 : entity.ring === "relation" ? 2.6 : 1.7}
        vectorEffect="non-scaling-stroke"
      />
      {entity.ring === "relation" && (
        <path
          d={semanticShapePath(entity.kind, size + 7)}
          fill="none"
          opacity="0.28"
          stroke={palette.solid}
          strokeDasharray={dash}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      )}
      <text
        className="font-sans"
        fill={palette.ink}
        fontSize={labelFontSize}
        fontWeight="750"
        textAnchor="middle"
      >
        {lines.map((line, index) => (
          <tspan
            dy={
              index === 0
                ? lines.length === 1
                  ? 5
                  : 5 -
                    ((lines.length - 1) * lineHeight) / 2
                : lineHeight
            }
            key={`${entity.id}-${line}`}
            x="0"
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export function SemanticMapLegend({
  surface = "map",
}: {
  surface?: "map" | "architecture";
} = {}) {
  const paletteEntries = Object.entries(layerPalettes);
  const kinds: Array<{ kind: EntityKind; label: string }> = [
    { kind: "domain", label: "Domain / theory" },
    { kind: "facet", label: "Facet" },
    { kind: "program", label: "Program" },
    { kind: "project", label: "Project / policy" },
    { kind: "product", label: "Product" },
    { kind: "evidence", label: "Evidence / artifact" },
    { kind: "service", label: "Service" },
    { kind: "testbed", label: "Testbed" },
    { kind: "collaborator", label: "Role" },
  ];

  return (
    <details className="group w-[15rem] max-w-[calc(100vw-2rem)] border border-border bg-background/95 shadow-lg backdrop-blur open:w-[min(34rem,calc(100vw-2rem))]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-mono text-xs font-semibold uppercase tracking-[0.08em]">
        <span className="flex items-center gap-2">
          <ListTree className="h-4 w-4" />
          Semantic legend
        </span>
        <span className="text-muted-foreground group-open:hidden">Open</span>
        <span className="hidden text-muted-foreground group-open:inline">Close</span>
      </summary>
      <div
        className={`grid gap-5 border-t border-border p-4 ${
          surface === "map" ? "sm:grid-cols-2" : ""
        }`}
      >
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Hue · domain family
          </p>
          <ul className="mt-3 grid gap-2">
            {paletteEntries.map(([layer, palette]) => (
              <li className="flex items-center gap-2 text-sm leading-5" key={layer}>
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border"
                  style={{
                    backgroundColor: palette.soft,
                    borderColor: palette.solid,
                  }}
                />
                {palette.family}
              </li>
            ))}
          </ul>
        </div>
        {surface === "map" ? (
          <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Shape · entity type
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {kinds.map(({ kind, label }) => (
              <li className="flex items-center gap-2 text-sm leading-5" key={kind}>
                <svg aria-hidden="true" className="h-4 w-4 overflow-visible" viewBox="-12 -12 24 24">
                  <path
                    d={semanticShapePath(kind, 8)}
                    fill="#F8F3E8"
                    stroke="#0B1F3A"
                    strokeDasharray={entityDashArray(kind)}
                    strokeWidth="1.5"
                  />
                </svg>
                {label}
              </li>
            ))}
          </ul>
          </div>
        ) : null}
      </div>
      <p className="border-t border-border px-4 py-3 text-sm leading-5 text-muted-foreground">
        {surface === "map"
          ? "Angle shows facet affinity. Radius shows structural distance. Edge weight shows relationship strength; edge style shows relationship type; opacity shows current prominence."
          : "The left rule preserves each node's domain family. Stage placement shows conceptual dependency, and the visible role label preserves object type without relying on color alone."}
      </p>
    </details>
  );
}

export function ContextHalo({
  active,
  nodes,
  projection,
  selectedRelationId,
  onInspectRelation,
  onOpenRecord,
}: ContextHaloProps) {
  const activePalette = paletteForNode(active);
  const { facetEntities, closeEntities, horizonEntities } =
    buildContextHaloEntities(active, nodes, projection);

  const positionedFacets = facetEntities.map((entity, index) =>
    positionOnRing(entity, index, facetEntities.length, 325, "facet"),
  );
  const positionedClose = closeEntities.map((entity, index) =>
    positionOnRing(
      entity,
      index,
      closeEntities.length,
      490,
      "relation",
      -Math.PI / 2 + Math.PI / Math.max(closeEntities.length, 1),
    ),
  );
  const positionedHorizon = horizonEntities.map((entity, index) =>
    positionOnRing(
      entity,
      index,
      horizonEntities.length,
      640,
      "horizon",
      -Math.PI / 2 + Math.PI / Math.max(horizonEntities.length, 1),
    ),
  );
  const compactEntities = closeEntities.slice(0, 6).map((entity, index, items) =>
    positionOnRing(
      entity,
      index,
      items.length,
      158,
      "relation",
      -Math.PI / 2 + Math.PI / Math.max(items.length, 1),
    ),
  );

  function inspectEntity(entity: HaloEntity) {
    onInspectRelation(entity);
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-5 xl:right-[30rem] xl:p-5 2xl:right-[34rem]">
        <button
          className="pointer-events-auto inline-flex min-h-10 items-center border border-border bg-background/95 px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] shadow-sm backdrop-blur hover:bg-muted"
          onClick={onOpenRecord}
          type="button"
        >
          Open record
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <svg
        aria-label={`${active.label} compact relation context. ${projectionLabels[projection]} lens.`}
        className="h-full w-full xl:hidden"
        role="group"
        viewBox="-240 -240 480 480"
      >
        <defs>
          <radialGradient id="compact-halo-background" cx="50%" cy="50%" r="64%">
            <stop offset="0%" stopColor={activePalette.soft} stopOpacity="0.58" />
            <stop offset="100%" stopColor="#F8F3E8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          fill="url(#compact-halo-background)"
          height="480"
          width="480"
          x="-240"
          y="-240"
        />
        <circle
          cx="0"
          cy="0"
          fill="none"
          opacity="0.42"
          r="226"
          stroke={activePalette.solid}
          strokeDasharray="7 7"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {compactEntities.map((entity) => (
          <line
            key={`compact-edge-${entity.id}`}
            opacity="0.76"
            stroke={paletteForLayer(entity.layer).solid}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            x1="0"
            x2={entity.x}
            y1="0"
            y2={entity.y}
          />
        ))}
        {compactEntities.map((entity) => (
          <HaloNode
            compact
            entity={entity}
            key={`compact-${entity.id}`}
            onInspect={inspectEntity}
            selected={selectedRelationId === entity.id}
          />
        ))}
        <g
          aria-label={`Center object: ${active.label}`}
          className="group cursor-pointer outline-none"
          onClick={(event) => {
            event.currentTarget.focus();
            onOpenRecord();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenRecord();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <title>{`Open the ${active.label} record`}</title>
          <path
            className="pointer-events-none opacity-0 transition-opacity group-focus:opacity-100"
            d={semanticShapePath(inferEntityKind(active, "domain"), 78)}
            fill="none"
            stroke={activePalette.ink}
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={semanticShapePath(inferEntityKind(active, "domain"), 68)}
            fill={activePalette.soft}
            stroke={activePalette.solid}
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
          <text
            fill={activePalette.ink}
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.7"
            textAnchor="middle"
            y="-12"
          >
            SELECTED
          </text>
          {labelLines(active.label, 14, 3).map((line, index) => (
            <text
              fill={activePalette.ink}
              fontSize="16"
              fontWeight="800"
              key={`compact-center-${line}`}
              textAnchor="middle"
              y={5 + index * 18}
            >
              {line}
            </text>
          ))}
        </g>
      </svg>

      <svg
        aria-label={`${active.label} relation context. ${projectionLabels[projection]} lens.`}
        className="hidden h-full xl:block xl:w-[calc(100%_-_28rem)] 2xl:w-[calc(100%_-_32rem)]"
        role="group"
        viewBox="-720 -720 1440 1440"
      >
        <defs>
          <marker
            id="halo-arrow"
            markerHeight="6"
            markerWidth="6"
            orient="auto-start-reverse"
            refX="5"
            refY="3"
            viewBox="0 0 6 6"
          >
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={activePalette.solid} opacity="0.7" />
          </marker>
          <radialGradient id="halo-background" cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor={activePalette.soft} stopOpacity="0.48" />
            <stop offset="70%" stopColor="#F8F3E8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F8F3E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="-720" y="-720" width="1440" height="1440" fill="url(#halo-background)" />

        {[
          { radius: 116, label: "CENTER OBJECT", dash: undefined },
          { radius: 410, label: "FACET RING", dash: "2 5" },
          { radius: 570, label: "CLOSE RELATION BAND", dash: "8 6" },
          { radius: 710, label: "DOMAIN HORIZON", dash: "3 8" },
        ].map(({ radius, label, dash }) => (
          <g key={label}>
            <circle
              cx="0"
              cy="0"
              fill="none"
              opacity={label === "CLOSE RELATION BAND" ? 0.48 : 0.28}
              r={radius}
              stroke={activePalette.solid}
              strokeDasharray={dash}
              strokeWidth={label === "CLOSE RELATION BAND" ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
            />
            {label !== "CENTER OBJECT" && label !== "FACET RING" ? (
              <text
                fill={activePalette.ink}
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.2"
                opacity="0.68"
                textAnchor="middle"
                x="0"
                y={-radius + 12}
              >
                {label}
              </text>
            ) : null}
          </g>
        ))}

        {positionedFacets.map((entity) => {
          const style = edgeStyle(entity.relationType);
          return (
            <line
              key={`edge-${entity.id}`}
              x1="0"
              y1="0"
              x2={entity.x}
              y2={entity.y}
              opacity={style.opacity}
              stroke={activePalette.solid}
              strokeDasharray={style.dash}
              strokeWidth={style.width}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {positionedClose.map((entity) => {
          const source = radialInnerPoint(entity, 412);
          const style = edgeStyle(entity.relationType);
          return (
            <line
              key={`edge-${entity.id}`}
              markerEnd="url(#halo-arrow)"
              x1={source.x}
              y1={source.y}
              x2={entity.x}
              y2={entity.y}
              opacity={style.opacity}
              stroke={paletteForLayer(entity.layer).solid}
              strokeDasharray={style.dash}
              strokeWidth={style.width}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {positionedHorizon.map((entity) => {
          const source = radialInnerPoint(entity, 572);
          const style = edgeStyle("Domain horizon");
          return (
            <line
              key={`edge-${entity.id}`}
              x1={source.x}
              y1={source.y}
              x2={entity.x}
              y2={entity.y}
              opacity="0.28"
              stroke={paletteForLayer(entity.layer).solid}
              strokeDasharray={style.dash ?? "3 8"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {positionedHorizon.map((entity) => (
          <HaloNode
            entity={entity}
            key={entity.id}
            onInspect={inspectEntity}
            selected={selectedRelationId === entity.id}
          />
        ))}
        {positionedClose.map((entity) => (
          <HaloNode
            entity={entity}
            key={entity.id}
            onInspect={inspectEntity}
            selected={selectedRelationId === entity.id}
          />
        ))}
        {positionedFacets.map((entity) => (
          <HaloNode
            entity={entity}
            key={entity.id}
            onInspect={inspectEntity}
            selected={selectedRelationId === entity.id}
          />
        ))}

        <g
          aria-label={`Center object: ${active.label}`}
          className="group cursor-pointer outline-none"
          onClick={(event) => {
            event.currentTarget.focus();
            onOpenRecord();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenRecord();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <title>{`Open the ${active.label} record`}</title>
          <path
            className="pointer-events-none opacity-0 transition-opacity group-focus:opacity-100"
            d={semanticShapePath(inferEntityKind(active, "domain"), 122)}
            fill="none"
            stroke={activePalette.ink}
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={semanticShapePath(inferEntityKind(active, "domain"), 106)}
            fill={activePalette.soft}
            stroke={activePalette.solid}
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="0" cy="0" r="116" fill="none" opacity="0.28" stroke={activePalette.solid} />
          <text className="font-sans" fill={activePalette.ink} fontSize="15" fontWeight="750" textAnchor="middle" y="-26">
            {asString(active.role, "Selected object").toUpperCase()}
          </text>
          {labelLines(active.label, 16, 3).map((line, index) => (
            <text
              fill={activePalette.ink}
              className="font-sans"
              fontSize="24"
              fontWeight="800"
              key={line}
              textAnchor="middle"
              y={5 + index * 26}
            >
              {line}
            </text>
          ))}
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 z-20 hidden lg:block">
        <SemanticMapLegend />
      </div>

    </div>
  );
}
