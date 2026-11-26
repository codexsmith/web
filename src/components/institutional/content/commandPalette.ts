import type { LabObjectKind } from "../LabObjectIdentity";
import { curatedReaderRoutes } from "../institutionalRoutes";
export type CommandPaletteRelationship = { relation: string; otherTitle: string };
export type CommandPaletteEntry = {
  id: string; type: "object" | "page"; label: string; href: string;
  kind?: LabObjectKind; identifier?: string; meta: string; searchText: string;
  relationships: readonly CommandPaletteRelationship[];
};
const pageEntries: CommandPaletteEntry[] = curatedReaderRoutes.map(route => ({
  id: `page:${route.href}`, type: "page", label: route.label, href: route.href,
  meta: "Public-facing reader", relationships: [], searchText: `${route.label} ${route.href}`,
}));
export const commandPaletteEntries = pageEntries;
export const commandPaletteQuickEntries = pageEntries.filter(entry => ["/", "/codexware", "/observatory", "/work-with-us", "/evidence-and-trust", "/contact"].includes(entry.href));
export const commandPaletteStats = { objects: 0, pages: pageEntries.length, relationships: 0 } as const;
