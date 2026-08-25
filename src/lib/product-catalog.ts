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

/* Catalog threshold: a listed object should be something a visitor can use, run,
   apply, navigate, inspect, or operationalize. Publication objects are cross-listed
   when the publication is itself a method, protocol, instrument, learning surface,
   or research apparatus rather than merely because a manuscript exists. */
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
      "Reusable practitioner methods, standards, protocols, architecture doctrines, instruments, and bounded services produced by the Lab.",
    entries: [
      { kind: "node", nodeId: "boundary-first-engineering" },
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
      { kind: "node", nodeId: "boundary-first-ux" },
      { kind: "node", nodeId: "boundary-first-architecture" },
      { kind: "node", nodeId: "ontological-software" },
      { kind: "node", nodeId: "executable-representation" },
      { kind: "node", nodeId: "verification-governance" },
      { kind: "node", nodeId: "pub-consequence-bearing-development" },
      { kind: "node", nodeId: "pub-bounded-consequence-circuit" },
      { kind: "node", nodeId: "agency-audit" },
      { kind: "node", nodeId: "pub-people-review-worksheet" },
      { kind: "node", nodeId: "pub-language-garden" },
    ],
  },
  {
    id: "research-testbeds",
    label: "Research programs & testbeds",
    summary:
      "Executable, inspectable, or practitioner-facing research surfaces used to test whether Boundary First methods survive contact with a domain.",
    entries: [
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
      { kind: "node", nodeId: "boundary-first-weather" },
      { kind: "node", nodeId: "boundary-first-chess" },
      { kind: "node", nodeId: "boundary-first-soccer" },
      { kind: "node", nodeId: "constitutional-law" },
      { kind: "node", nodeId: "schemathematics" },
      { kind: "node", nodeId: "pub-operational-homology" },
    ],
  },
  {
    id: "public-artifacts",
    label: "Public instruments & artifacts",
    summary:
      "Substantial civic, historical, learning, and visual artifacts that make a bounded system or line of reasoning inspectable and usable.",
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
      { kind: "node", nodeId: "pub-original-visual-grammar" },
      { kind: "node", nodeId: "pub-civilizational-first-passage" },
    ],
  },
];
