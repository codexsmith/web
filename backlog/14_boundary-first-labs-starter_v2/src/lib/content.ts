export type NodeKind =
  | "root"
  | "branch"
  | "product"
  | "project"
  | "research"
  | "method"
  | "foundation"
  | "theory"
  | "about"
  | "document";

export type EdgeType =
  | "contains"
  | "specializes"
  | "implements"
  | "demonstrates"
  | "grounds"
  | "derived-from"
  | "depends-on"
  | "applies-to"
  | "extends"
  | "contrasts-with"
  | "governs"
  | "measures"
  | "documents"
  | "instantiates";

export type Inspection = {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
};

export type ContentNode = {
  id: string;
  label: string;
  shortLabel?: string;
  path: string;
  parentId?: string;
  kind: NodeKind;
  eyebrow: string;
  summary: string;
  body?: string[];
  inspection?: Inspection[];
};

export type GraphEdge = {
  from: string;
  to: string;
  type: EdgeType;
  label: string;
};

export const nodes: ContentNode[] = [
  {
    id: "root",
    label: "Boundary First Labs",
    path: "",
    kind: "root",
    eyebrow: "Software research and engineering lab",
    summary:
      "Software for difficult systems, public-interest projects, and research into executable representation.",
  },
  {
    id: "products",
    label: "Products",
    path: "products",
    parentId: "root",
    kind: "branch",
    eyebrow: "Built systems",
    summary:
      "Concrete software products, tools, experiments, and case studies that demonstrate the lab's engineering practice.",
  },
  {
    id: "product-portfolio",
    label: "Product Portfolio",
    path: "products/portfolio",
    parentId: "products",
    kind: "product",
    eyebrow: "Replace with shipped products",
    summary:
      "A starter node for the strongest Boundary First Labs product pages. Replace this with named products and their evidence.",
    body: [
      "Lead with the artifact: what was built, for whom, and what difficult system it makes legible or executable.",
      "Then expose the model, boundaries, state, architecture, edge cases, and research bridges that explain why the artifact is trustworthy.",
    ],
  },
  {
    id: "tools-experiments",
    label: "Tools & Experiments",
    path: "products/tools-experiments",
    parentId: "products",
    kind: "product",
    eyebrow: "Working artifacts",
    summary:
      "Small software artifacts that test an interaction, representation, architecture, or domain model before it becomes a larger product.",
  },
  {
    id: "public-interest",
    label: "Public Interest",
    path: "public-interest",
    parentId: "root",
    kind: "branch",
    eyebrow: "Public-purpose work",
    summary:
      "Projects, principles, aspirations, and open work that show what Boundary First Labs intends to use its technical capacity for.",
  },
  {
    id: "public-mission",
    label: "Mission",
    path: "public-interest/mission",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Institutional purpose",
    summary:
      "Define the public obligations and long-horizon purpose of the lab without requiring every project to be a commercial product.",
  },
  {
    id: "public-principles",
    label: "Principles",
    path: "public-interest/principles",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Operating commitments",
    summary:
      "Accessibility, lifecycle responsibility, accountable systems, public legibility, maintainability, and respect for real constraints.",
  },
  {
    id: "augusta-civic",
    label: "Augusta Civic Infrastructure",
    shortLabel: "Augusta Civic",
    path: "public-interest/augusta-civic-infrastructure",
    parentId: "public-interest",
    kind: "project",
    eyebrow: "Public-interest project",
    summary:
      "A project space for software-enabled analysis of local historic and civic infrastructure in Augusta.",
    body: [
      "The public output does not have to be a conventional software product. Software can be the machinery used to assemble records, normalize evidence, model relationships, and produce useful civic knowledge.",
      "This node is intentionally lightweight in the starter. It is ready to receive maps, datasets, analysis, source provenance, and public-facing artifacts as the project develops.",
    ],
  },
  {
    id: "public-aspirations",
    label: "Goals & Aspirations",
    shortLabel: "Aspirations",
    path: "public-interest/goals-aspirations",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Future capacity",
    summary:
      "Ambitious directions the lab wants to become capable of addressing, clearly separated from current claims and delivered work.",
  },
  {
    id: "research",
    label: "Research",
    path: "research",
    parentId: "root",
    kind: "branch",
    eyebrow: "Methods and formal foundations",
    summary:
      "The research machinery behind the lab's software practice, from professional engineering doctrine to formal foundations.",
  },
  {
    id: "software",
    label: "Software",
    path: "research/software",
    parentId: "research",
    kind: "research",
    eyebrow: "Software doctrine",
    summary:
      "A coherent software lane: boundaries, ontology, executable representation, architecture, UX, state, verification, and governance.",
  },
  {
    id: "boundary-first-engineering",
    label: "Boundary First Engineering",
    shortLabel: "Engineering",
    path: "research/software/boundary-first-engineering",
    parentId: "software",
    kind: "method",
    eyebrow: "Engineering doctrine",
    summary:
      "Make boundaries, contracts, ownership, invariants, lifecycle, and failure behavior explicit before local implementation details dominate the design.",
    body: [
      "Boundary First Engineering treats architecture as an invariant-preserving representation problem. Interfaces, abstract classes, services, modules, and deployment boundaries are mechanisms; the primary question is whether the chosen representation is coherent and consistently enforced.",
      "It connects naturally to onion, clean, and hexagonal architecture while keeping domain meaning and dependency direction visible as first-class constraints.",
    ],
  },
  {
    id: "ontological-software",
    label: "Ontological Software",
    shortLabel: "Ontology",
    path: "research/software/ontological-software",
    parentId: "software",
    kind: "method",
    eyebrow: "Ontology-driven software synthesis",
    summary:
      "Determine what exists, how it relates, what states are admissible, and what transitions preserve meaning before deciding how the code should be shaped.",
    body: [
      "A sufficiently explicit ontology can drive schemas, validation, APIs, workflows, state machines, tests, documentation, permissions, and portions of UI structure.",
      "The ambition is not code generation for its own sake. It is to reduce representational drift by deriving executable surfaces from a shared domain grammar.",
    ],
  },
  {
    id: "executable-representation",
    label: "Executable Representation",
    shortLabel: "Executable Rep.",
    path: "research/software/executable-representation",
    parentId: "software",
    kind: "method",
    eyebrow: "Software as formal representation",
    summary:
      "Software is an executable representation of a domain: primitives, admissible constructions, transitions, invariants, and operational semantics made runnable.",
    body: [
      "A representation is itself a boundary. It exposes distinctions, hides others, constrains what can be expressed, and determines which operations are lawful.",
      "This creates direct bridges to formal grammars, programming-language semantics, DSLs, schemas, protocols, parsers, compilers, interpreters, and model-driven systems.",
    ],
    inspection: [
      {
        id: "representation-through-product",
        label: "Inspect a product bridge",
        eyebrow: "Through interaction",
        summary:
          "This starter inspection demonstrates the interaction pattern: evidence can be inspected from a theory node without navigating away from the current conceptual position.",
        bullets: [
          "The current node remains Executable Representation.",
          "The inspection is a contextual layer, not a new route.",
          "Replace this placeholder with a real product, diagram, repository, case study, or executable demo.",
        ],
      },
    ],
  },
  {
    id: "boundary-first-architecture",
    label: "Boundary First Architecture",
    shortLabel: "Architecture",
    path: "research/software/boundary-first-architecture",
    parentId: "software",
    kind: "method",
    eyebrow: "System structure",
    summary:
      "Architecture as controlled dependency, explicit ownership, semantic interfaces, lifecycle boundaries, and localized invariant maintenance.",
  },
  {
    id: "boundary-first-ux",
    label: "Boundary First UX",
    shortLabel: "UX",
    path: "research/software/boundary-first-ux",
    parentId: "software",
    kind: "method",
    eyebrow: "Human-system boundary",
    summary:
      "Represent the domain faithfully enough that navigation and interaction correspond to intelligible traversal through the system.",
    body: [
      "Boundary First UX treats the interface as an operational boundary: it should expose state, afford lawful action, prevent invalid transitions, preserve context, and make recovery obvious.",
      "This website is intended to become the first polished demonstration: tree orientation over a graph, typed transitions, a persistent boundary frame, through-inspection, and gestalt zoom.",
    ],
  },
  {
    id: "verification-governance",
    label: "Verification & Governance",
    shortLabel: "Verification",
    path: "research/software/verification-governance",
    parentId: "software",
    kind: "method",
    eyebrow: "Closure, authority, accountability",
    summary:
      "Testing, observability, provenance, permissions, auditability, and lifecycle responsibility as parts of the same executable system boundary.",
    body: [
      "Verification explores admissible and failure states, then traces defects back to missing contracts, boundary errors, or violated invariants.",
      "Governance asks who may cause which state transition, under what authority, with what evidence, and who owns the resulting consequence.",
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    path: "research/foundations",
    parentId: "research",
    kind: "research",
    eyebrow: "Primitive structure",
    summary:
      "The deeper conceptual and mathematical primitives under executable representation and Boundary First software practice.",
  },
  {
    id: "distinction",
    label: "Distinction",
    path: "research/foundations/distinction",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Primitive difference",
    summary:
      "The primitive act or structure by which one admissible state, object, region, or value is made distinguishable from another.",
  },
  {
    id: "bound-distinction",
    label: "Bound Distinction",
    path: "research/foundations/bound-distinction",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Maintained distinction",
    summary:
      "A distinction carried inside a boundary or grammar that determines its admissible identity, complement, and operations.",
  },
  {
    id: "bit",
    label: "The Bit",
    path: "research/foundations/bit",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Calibration anchor",
    summary:
      "The bit serves as a calibration anchor: a minimal lawful distinction that can participate in compositional state-transition systems.",
  },
  {
    id: "distinction-space",
    label: "Distinction Space",
    path: "research/foundations/distinction-space",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Formalization",
    summary:
      "A formal setting for studying distinctions, boundaries, admissible structure, relations, transformations, and the spaces those distinctions generate.",
  },
  {
    id: "formal-theory",
    label: "Formal Theory",
    path: "research/formal-theory",
    parentId: "research",
    kind: "research",
    eyebrow: "Formal research program",
    summary:
      "Higher-order formal work that generalizes the software doctrine beyond a single implementation domain.",
  },
  {
    id: "boundary-theory",
    label: "Boundary Theory",
    path: "research/formal-theory/boundary-theory",
    parentId: "formal-theory",
    kind: "theory",
    eyebrow: "Formal research",
    summary:
      "A research program seeking rigorous cross-domain primitives and structure-preserving relationships around boundaries, distinctions, representation, and closure.",
  },
  {
    id: "schemathematics",
    label: "Schemathematics",
    path: "research/formal-theory/schemathematics",
    parentId: "formal-theory",
    kind: "theory",
    eyebrow: "Operational mathematics",
    summary:
      "An operational atlas approach to mathematical structure: what objects do, which constraints they introduce, and how they transform across representations.",
  },
  {
    id: "about",
    label: "About",
    path: "about",
    parentId: "root",
    kind: "branch",
    eyebrow: "Institution and provenance",
    summary:
      "Who the lab is, how it works, where the methods came from, and how to get in touch.",
  },
  {
    id: "the-lab",
    label: "The Lab",
    path: "about/the-lab",
    parentId: "about",
    kind: "about",
    eyebrow: "Institution",
    summary:
      "Boundary First Labs as a software research and engineering lab whose primary medium is executable systems and computational analysis.",
  },
  {
    id: "how-we-work",
    label: "How We Work",
    path: "about/how-we-work",
    parentId: "about",
    kind: "about",
    eyebrow: "Practice",
    summary:
      "Start from the domain boundary, make state and constraints explicit, build the smallest coherent representation, then test it against reality.",
  },
  {
    id: "provenance",
    label: "Provenance",
    path: "about/provenance",
    parentId: "about",
    kind: "about",
    eyebrow: "History and sources",
    summary:
      "The professional, computational, mathematical, scientific, and public-interest lineage behind the lab's methods and artifacts.",
  },
  {
    id: "contact",
    label: "Contact",
    path: "about/contact",
    parentId: "about",
    kind: "about",
    eyebrow: "Work with the lab",
    summary:
      "A starter contact node. Replace with the preferred inquiry channel, availability, and engagement model.",
  },
];

export const edges: GraphEdge[] = [
  {
    from: "distinction-space",
    to: "executable-representation",
    type: "grounds",
    label: "grounds",
  },
  {
    from: "bit",
    to: "bound-distinction",
    type: "instantiates",
    label: "calibrates",
  },
  {
    from: "ontological-software",
    to: "executable-representation",
    type: "depends-on",
    label: "depends on",
  },
  {
    from: "boundary-first-engineering",
    to: "boundary-first-architecture",
    type: "contains",
    label: "contains",
  },
  {
    from: "boundary-first-ux",
    to: "executable-representation",
    type: "applies-to",
    label: "applies",
  },
  {
    from: "verification-governance",
    to: "augusta-civic",
    type: "applies-to",
    label: "can apply to",
  },
  {
    from: "executable-representation",
    to: "product-portfolio",
    type: "demonstrates",
    label: "demonstrated by",
  },
  {
    from: "boundary-theory",
    to: "distinction-space",
    type: "extends",
    label: "extends",
  },
];

const nodeById = new Map(nodes.map((node) => [node.id, node]));
const nodeByPath = new Map(nodes.map((node) => [node.path, node]));

export function getNode(id: string): ContentNode {
  return nodeById.get(id) ?? nodeById.get("root")!;
}

export function getNodeByPath(pathSegments: string[]): ContentNode {
  const path = pathSegments.join("/");
  return nodeByPath.get(path) ?? nodeById.get("root")!;
}

export function getChildren(id: string): ContentNode[] {
  return nodes.filter((node) => node.parentId === id);
}

export function getParent(id: string): ContentNode | undefined {
  const node = getNode(id);
  return node.parentId ? getNode(node.parentId) : undefined;
}

export function getAncestors(id: string): ContentNode[] {
  const result: ContentNode[] = [];
  let cursor = getNode(id);

  while (cursor.parentId) {
    cursor = getNode(cursor.parentId);
    result.unshift(cursor);
  }

  return result;
}

export function getSiblings(id: string): ContentNode[] {
  const node = getNode(id);
  if (!node.parentId) return [];
  return getChildren(node.parentId);
}

export function getPathForNode(id: string): string {
  const node = getNode(id);
  return node.path ? `/${node.path}` : "/";
}

export function isDescendantOf(descendantId: string, ancestorId: string): boolean {
  if (descendantId === ancestorId) return true;
  let cursor = getNode(descendantId);

  while (cursor.parentId) {
    if (cursor.parentId === ancestorId) return true;
    cursor = getNode(cursor.parentId);
  }

  return false;
}

export function getImmediateChildTowardFocus(
  gestaltId: string,
  focusId: string,
): ContentNode | undefined {
  if (gestaltId === focusId) return undefined;
  const children = getChildren(gestaltId);
  return children.find((child) => isDescendantOf(focusId, child.id));
}

export function getCrossEdges(id: string): Array<GraphEdge & { node: ContentNode }> {
  return edges.flatMap((edge) => {
    if (edge.from === id) {
      return [{ ...edge, node: getNode(edge.to) }];
    }

    if (edge.to === id) {
      return [{ ...edge, node: getNode(edge.from) }];
    }

    return [];
  });
}
