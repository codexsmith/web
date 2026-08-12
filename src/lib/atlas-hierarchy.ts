import rawBinding from "../content/atlas.binding.json";
import canonicalNodes from "../content/nodes.json";

export type AtlasHierarchyBranch = {
  id: string;
  label: string;
  description: string;
  layer: string;
  angleDegrees: number;
  nodeIds: string[];
};

export type AtlasHierarchyBinding = {
  schemaVersion: "boundary-first.binding.atlas.v1";
  bindingProtocol: {
    id: string;
    version: string;
    title: string;
    status: "draft" | "review" | "approved" | "superseded";
    invariant: string;
  };
  projection: {
    pattern: "theory-centered-cluster-tree";
    rootNodeId: string;
    contextNodeId: string;
    eyebrow: string;
    title: string;
    introduction: string;
    branches: AtlasHierarchyBranch[];
  };
  validation: {
    requireCompleteCanonicalCoverage: true;
    requireUniqueBranchMembership: true;
    accessibilityConstraints: string[];
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Atlas binding requires a non-empty '${field}'.`);
  }
}

function requireStringArray(
  value: unknown,
  field: string,
): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(`Atlas binding requires '${field}' node references.`);
  }
}

export function validateAtlasHierarchyBinding(
  value: unknown,
  canonicalIds: ReadonlySet<string>,
): asserts value is AtlasHierarchyBinding {
  if (!isRecord(value)) throw new Error("Atlas binding must be an object.");
  if (value.schemaVersion !== "boundary-first.binding.atlas.v1") {
    throw new Error("Unsupported Atlas binding schema version.");
  }

  const data = value as unknown as AtlasHierarchyBinding;
  if (!isRecord(data.bindingProtocol) || !isRecord(data.projection)) {
    throw new Error("Atlas binding requires protocol and projection sections.");
  }
  for (const field of ["id", "version", "title", "invariant"] as const) {
    requireString(data.bindingProtocol[field], `bindingProtocol.${field}`);
  }
  if (!/^\d+\.\d+\.\d+$/.test(data.bindingProtocol.version)) {
    throw new Error("Atlas binding version must use semantic versioning.");
  }
  if (data.projection.pattern !== "theory-centered-cluster-tree") {
    throw new Error("Unsupported Atlas projection pattern.");
  }
  for (const field of [
    "rootNodeId",
    "contextNodeId",
    "eyebrow",
    "title",
    "introduction",
  ] as const) {
    requireString(data.projection[field], `projection.${field}`);
  }
  if (!canonicalIds.has(data.projection.rootNodeId)) {
    throw new Error(`Unknown Atlas root node '${data.projection.rootNodeId}'.`);
  }
  if (!canonicalIds.has(data.projection.contextNodeId)) {
    throw new Error(
      `Unknown Atlas context node '${data.projection.contextNodeId}'.`,
    );
  }
  if (
    !Array.isArray(data.projection.branches) ||
    data.projection.branches.length < 2
  ) {
    throw new Error("Atlas binding requires at least two hierarchy branches.");
  }

  const branchIds = new Set<string>();
  const assignedNodeIds = new Set<string>();
  for (const branch of data.projection.branches) {
    for (const field of ["id", "label", "description", "layer"] as const) {
      requireString(branch[field], `branch.${field}`);
    }
    if (!Number.isFinite(branch.angleDegrees)) {
      throw new Error(`Atlas branch '${branch.id}' requires an angle.`);
    }
    requireStringArray(branch.nodeIds, `branch.${branch.id}.nodeIds`);
    if (branchIds.has(branch.id)) {
      throw new Error(`Duplicate Atlas branch '${branch.id}'.`);
    }
    branchIds.add(branch.id);
    for (const nodeId of branch.nodeIds) {
      if (!canonicalIds.has(nodeId)) {
        throw new Error(
          `Unknown canonical node '${nodeId}' in Atlas branch '${branch.id}'.`,
        );
      }
      if (nodeId === data.projection.rootNodeId) {
        throw new Error("The Atlas root may not also belong to a branch.");
      }
      if (assignedNodeIds.has(nodeId)) {
        throw new Error(
          `Atlas node '${nodeId}' has duplicate branch membership.`,
        );
      }
      assignedNodeIds.add(nodeId);
    }
  }

  const missingNodeIds = [...canonicalIds].filter(
    (nodeId) =>
      nodeId !== data.projection.rootNodeId && !assignedNodeIds.has(nodeId),
  );
  if (missingNodeIds.length > 0) {
    throw new Error(
      `Atlas hierarchy is missing canonical nodes: ${missingNodeIds.join(
        ", ",
      )}.`,
    );
  }
  if (!assignedNodeIds.has(data.projection.contextNodeId)) {
    throw new Error("The Atlas context node must have an explicit branch.");
  }
  if (
    !isRecord(data.validation) ||
    data.validation.requireCompleteCanonicalCoverage !== true ||
    data.validation.requireUniqueBranchMembership !== true ||
    !Array.isArray(data.validation.accessibilityConstraints) ||
    data.validation.accessibilityConstraints.length === 0
  ) {
    throw new Error("Atlas binding requires complete validation constraints.");
  }
}

const canonicalIds = new Set(
  (canonicalNodes as Array<{ id: string }>).map((node) => node.id),
);
const candidateBinding: unknown = rawBinding;
validateAtlasHierarchyBinding(candidateBinding, canonicalIds);

export const atlasHierarchyBinding: AtlasHierarchyBinding = candidateBinding;
export const atlasTheoryRootId = atlasHierarchyBinding.projection.rootNodeId;
export const atlasContextNodeId =
  atlasHierarchyBinding.projection.contextNodeId;
export const atlasHierarchyBranches = atlasHierarchyBinding.projection.branches;

const branchByNodeId = new Map(
  atlasHierarchyBranches.flatMap((branch) =>
    branch.nodeIds.map((nodeId) => [nodeId, branch] as const),
  ),
);

export function atlasHierarchyBranchForNode(
  nodeId: string,
): AtlasHierarchyBranch | null {
  return branchByNodeId.get(nodeId) ?? null;
}
