import rawBinding from "../content/entry-triad.binding.json";
import canonicalNodes from "../content/nodes.json";

export type EntryTriadRoute = {
  id: "people" | "problem" | "repair";
  label: string;
  question: string;
  description: string;
  href: string;
  bridge: "who" | "what" | "how";
  canonicalNodeIds: string[];
};

export type EntryTriadBinding = {
  schemaVersion: "boundary-first.binding.entry-triad.v1";
  bindingProtocol: {
    id: string;
    version: string;
    title: string;
    status: "draft" | "review" | "approved" | "superseded";
    invariant: string;
  };
  projection: {
    pattern: "three-part-instrument";
    eyebrow: string;
    title: string;
    introduction: string;
    instruction: string;
  };
  routes: EntryTriadRoute[];
  validation: {
    requiredRouteIds: string[];
    accessibilityConstraints: string[];
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Entry triad requires a non-empty '${field}'.`);
  }
}

export function validateEntryTriadBinding(
  value: unknown,
  canonicalIds: ReadonlySet<string>,
): asserts value is EntryTriadBinding {
  if (!isRecord(value)) throw new Error("Entry triad binding must be an object.");
  if (value.schemaVersion !== "boundary-first.binding.entry-triad.v1") {
    throw new Error("Unsupported entry triad schema version.");
  }

  const data = value as unknown as EntryTriadBinding;
  if (!isRecord(data.bindingProtocol) || !isRecord(data.projection)) {
    throw new Error("Entry triad requires binding and projection sections.");
  }
  for (const field of ["id", "version", "title", "invariant"] as const) {
    requireString(data.bindingProtocol[field], `bindingProtocol.${field}`);
  }
  if (!/^\d+\.\d+\.\d+$/.test(data.bindingProtocol.version)) {
    throw new Error("Entry triad version must use semantic versioning.");
  }
  if (data.projection.pattern !== "three-part-instrument") {
    throw new Error("Unsupported entry triad projection pattern.");
  }
  for (const field of ["eyebrow", "title", "introduction", "instruction"] as const) {
    requireString(data.projection[field], `projection.${field}`);
  }
  if (!Array.isArray(data.routes) || data.routes.length !== 3) {
    throw new Error("Entry triad requires exactly three routes.");
  }
  const routeIds = new Set<string>();
  const hrefs = new Set<string>();
  for (const route of data.routes) {
    for (const field of ["id", "label", "question", "description", "href", "bridge"] as const) {
      requireString(route[field], `route.${field}`);
    }
    if (!route.href.startsWith("/") || route.href.startsWith("//")) {
      throw new Error(`Entry route '${route.id}' requires an internal destination.`);
    }
    if (!Array.isArray(route.canonicalNodeIds) || route.canonicalNodeIds.length === 0) {
      throw new Error(`Entry route '${route.id}' requires canonical node references.`);
    }
    if (routeIds.has(route.id) || hrefs.has(route.href)) {
      throw new Error("Entry triad route IDs and destinations must be unique.");
    }
    routeIds.add(route.id);
    hrefs.add(route.href);
    for (const nodeId of route.canonicalNodeIds) {
      if (!canonicalIds.has(nodeId)) {
        throw new Error(`Unknown canonical node '${nodeId}' on entry route '${route.id}'.`);
      }
    }
  }
  if (!isRecord(data.validation) || !Array.isArray(data.validation.requiredRouteIds)) {
    throw new Error("Entry triad requires validation constraints.");
  }
  for (const routeId of data.validation.requiredRouteIds) {
    if (!routeIds.has(routeId)) throw new Error(`Missing required entry route '${routeId}'.`);
  }
  if (!Array.isArray(data.validation.accessibilityConstraints) || data.validation.accessibilityConstraints.length === 0) {
    throw new Error("Entry triad requires accessibility constraints.");
  }
}

const canonicalIds = new Set(
  (canonicalNodes as Array<{ id: string }>).map((node) => node.id),
);
const candidate: unknown = rawBinding;
validateEntryTriadBinding(candidate, canonicalIds);

export const entryTriadBinding: EntryTriadBinding = candidate;
export const entryTriadRoutes = entryTriadBinding.routes;
