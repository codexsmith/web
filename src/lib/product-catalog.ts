import type { DeliveryStage } from "@/lib/content-registry";

export type ProductCatalogNodeEntry = {
  kind: "node";
  nodeId: string;
};

export type ProductCatalogRouteEntry = {
  kind: "route";
  id: string;
  label: string;
  href: string;
  eyebrow: string;
  summary: string;
  canonicalHome: string;
  status?: {
    stage: DeliveryStage;
    label: string;
  };
};

export type ProductCatalogEntry = ProductCatalogNodeEntry | ProductCatalogRouteEntry;

export type ProductCatalogGroup = {
  id: "software-systems" | "methods-standards-services" | "research-testbeds" | "public-artifacts";
  label: string;
  summary: string;
  entries: ProductCatalogEntry[];
};

export const productCatalogGroups: ProductCatalogGroup[] = [
  {
    id: "software-systems",
    label: "Software & systems",
    summary:
      "Executable systems and product concepts: software people can operate, inspect, or build toward as bounded products.",
    entries: [
      { kind: "node", nodeId: "corpus-forge" },
      { kind: "node", nodeId: "projectr" },
      { kind: "node", nodeId: "youtube-knowledge-explorer" },
      { kind: "node", nodeId: "cross-platform-bookshelf" },
      { kind: "node", nodeId: "need-capacity-map" },
    ],
  },
  {
    id: "methods-standards-services",
    label: "Methods, standards & services",
    summary:
      "Reusable practitioner methods, standards, architecture doctrines, and bounded services produced by the Lab.",
    entries: [
      { kind: "node", nodeId: "agency-audit" },
      { kind: "node", nodeId: "boundary-first-engineering" },
      { kind: "node", nodeId: "ontological-software" },
      { kind: "node", nodeId: "boundary-first-architecture" },
      { kind: "node", nodeId: "boundary-first-ux" },
      { kind: "node", nodeId: "verification-governance" },
      {
        kind: "route",
        id: "software-before-code",
        label: "Software Before Code",
        href: "/software-before-code",
        eyebrow: "Working public engineering method",
        summary:
          "Determine the object, boundary, ownership, invariants, lifecycle, and failure behavior before selecting implementation mechanisms.",
        canonicalHome: "Research / Software / Boundary First Engineering",
        status: { stage: "developed", label: "Working public method" },
      },
      {
        kind: "route",
        id: "closure-driven-software-development",
        label: "Closure-Driven Software Development",
        href: "/closure-driven-software-development",
        eyebrow: "Advanced practitioner method",
        summary:
          "Turn uncertainty into executable evidence before it hardens into architecture, then keep closure tied to observed consequence and repair.",
        canonicalHome: "Research / Software / Boundary First Engineering",
        status: { stage: "developed", label: "Advanced practitioner draft" },
      },
    ],
  },
  {
    id: "research-testbeds",
    label: "Research programs & testbeds",
    summary:
      "Executable, inspectable, or practitioner-facing research surfaces used to test whether Boundary First methods survive contact with a domain.",
    entries: [
      { kind: "node", nodeId: "boundary-first-weather" },
      { kind: "node", nodeId: "boundary-first-chess" },
      { kind: "node", nodeId: "boundary-first-soccer" },
      { kind: "node", nodeId: "constitutional-law" },
      { kind: "node", nodeId: "schemathematics" },
      {
        kind: "route",
        id: "paper-mine",
        label: "Paper Mine",
        href: "/research/paper-mine",
        eyebrow: "Corpus-wide publication workbench",
        summary:
          "An interactive workbench for controlled publication objects and paper-shaped candidates across the Lab corpus, with readiness, provenance, claim ceilings, and evidence obligations visible.",
        canonicalHome: "Research",
        status: { stage: "active-development", label: "Public workbench" },
      },
    ],
  },
  {
    id: "public-artifacts",
    label: "Public artifacts & civic infrastructure",
    summary:
      "Substantial public-facing systems and artifacts that make civic, institutional, or historical structure inspectable.",
    entries: [
      { kind: "node", nodeId: "citywatch" },
      { kind: "node", nodeId: "augusta-civic" },
      {
        kind: "route",
        id: "founder-provenance-timeline",
        label: "Founder & Intellectual Provenance Timeline",
        href: "/about/provenance/timeline",
        eyebrow: "Interactive provenance chronology",
        summary:
          "A source-aware interactive chronology of founder formation, research genealogy, theory development, evidence classes, and unresolved provenance work.",
        canonicalHome: "About / Provenance",
        status: { stage: "developed", label: "Interactive artifact" },
      },
    ],
  },
];
