import type { LabObjectKind } from "../LabObjectIdentity";
import {
  atlasEdges,
  atlasKindLabels,
  atlasNodes,
} from "./atlas";
import { institutionalFooterRoutes } from "../institutionalRoutes";

export type CommandPaletteRelationship = {
  relation: string;
  otherTitle: string;
};

export type CommandPaletteEntry = {
  id: string;
  type: "object" | "page";
  label: string;
  href: string;
  kind?: LabObjectKind;
  identifier?: string;
  meta: string;
  searchText: string;
  relationships: readonly CommandPaletteRelationship[];
};

const nodeById = new Map(atlasNodes.map((node) => [node.atlasId, node]));
const relationshipsByNode = new Map<string, CommandPaletteRelationship[]>();

function attachRelationship(
  atlasId: string,
  relationship: CommandPaletteRelationship,
) {
  const current = relationshipsByNode.get(atlasId) ?? [];
  current.push(relationship);
  relationshipsByNode.set(atlasId, current);
}

for (const edge of atlasEdges) {
  const from = nodeById.get(edge.from);
  const to = nodeById.get(edge.to);

  if (from && to) {
    attachRelationship(from.atlasId, {
      relation: edge.relation,
      otherTitle: to.title,
    });
    attachRelationship(to.atlasId, {
      relation: edge.relation,
      otherTitle: from.title,
    });
  }
}

const objectEntries: CommandPaletteEntry[] = atlasNodes.map((node) => {
  const relationships = relationshipsByNode.get(node.atlasId) ?? [];
  const relationshipText = atlasEdges
    .filter((edge) => edge.from === node.atlasId || edge.to === node.atlasId)
    .flatMap((edge) => {
      const otherId = edge.from === node.atlasId ? edge.to : edge.from;
      const other = nodeById.get(otherId);
      return [
        edge.relation,
        edge.note,
        other?.title ?? "",
        other?.identifier ?? "",
      ];
    });

  return {
    id: `object:${node.atlasId}`,
    type: "object",
    label: node.title,
    href: `/v3/atlas?focus=${encodeURIComponent(node.atlasId)}`,
    kind: node.kind,
    identifier: node.identifier,
    meta: `${atlasKindLabels[node.kind] ?? node.kind} · ${node.status}`,
    relationships,
    searchText: [
      node.title,
      node.identifier ?? "",
      node.status,
      node.secondary ?? "",
      node.summary,
      ...(node.searchTerms ?? []),
      ...relationshipText,
    ].join(" "),
  };
});

const routeMap = new Map<string, { label: string; href: string }>([
  ["/v3", { label: "Home", href: "/v3" }],
  ...institutionalFooterRoutes.map((route) => [
    route.href,
    { label: route.label, href: route.href },
  ] as const),
]);

const pageEntries: CommandPaletteEntry[] = [...routeMap.values()].map((route) => ({
  id: `page:${route.href}`,
  type: "page",
  label: route.label,
  href: route.href,
  meta: "Institutional page",
  relationships: [],
  searchText: `${route.label} ${route.href}`,
}));

export const commandPaletteEntries = [
  ...objectEntries,
  ...pageEntries,
] as const satisfies readonly CommandPaletteEntry[];

export const commandPaletteQuickEntries = pageEntries.slice(0, 8);

export const commandPaletteStats = {
  objects: objectEntries.length,
  pages: pageEntries.length,
  relationships: atlasEdges.length,
} as const;
