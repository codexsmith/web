export type PublicChange = {
  id: string;
  date: string;
  scope: "Research" | "Method" | "Institution" | "Public interface";
  title: string;
  summary: string;
  consequence: string;
  sourceRepository: string;
  sourceRevision: string;
  sourceLabel: string;
  sourceHref: string;
  surfaceHref?: string;
};

export const changesProjection = {
  generatedDate: "2026-09-23",
  webRevision: "0944f1352f12cc1a9a2ec395feb5172217474aee",
  labRevision: "f5b8b063349bdf92fb8f5f138df52fcf4482b0ee",
  authority:
    "This is a curated public delta archive over canonical repository state. It reports selected material changes and backfilled milestones; it is not a complete commit log, activity feed, or claim-promotion surface.",
} as const;

export const recentChanges: readonly PublicChange[] = [
  {
    id: "chg-architecture-observatory-carryforward",
    date: "2026-09-23",
    scope: "Institution",
    title: "Federated architecture and Architecture Observatory work reached current Lab main.",
    summary:
      "The architecture and Observatory work from PR #471 was carried forward onto the current Lab main rather than leaving the work stranded on an older branch.",
    consequence:
      "The Lab's architecture-inspection machinery and federated-operations documentation now participate in current canonical institutional state.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "f5b8b063349bdf92fb8f5f138df52fcf4482b0ee",
    sourceLabel: "Carry forward PR #471 architecture and Observatory work onto current main",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/f5b8b063349bdf92fb8f5f138df52fcf4482b0ee",
    surfaceHref: "/apparatus",
  },
  {
    id: "chg-asm-005-execution",
    date: "2026-09-23",
    scope: "Research",
    title: "EXP-ASM-005 execution was carried into canonical research state.",
    summary:
      "The executed statistical-computational control work from PR #470 was reconciled onto current main with its experiment state rather than remaining a branch-local result.",
    consequence:
      "The bounded control results can now be inspected as part of the durable Agentic Scientific Method research record.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "dcd24785bc0e6942f1c7d4f86c89dc8fc057bb14",
    sourceLabel: "Carry forward PR #470 EXP-ASM-005 execution onto current main",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/dcd24785bc0e6942f1c7d4f86c89dc8fc057bb14",
    surfaceHref: "/research",
  },
  {
    id: "chg-research-engineering-cornerstone",
    date: "2026-09-23",
    scope: "Method",
    title: "Research Engineering became an explicit institutional cornerstone.",
    summary:
      "The Design by Artifact lineage was clarified and its bounded synthesis was established as a Research Engineering cornerstone.",
    consequence:
      "The Lab now has a more explicit method-level bridge between design lineage, scientific method, agentic execution, Boundary-First constraints, and durable research artifacts.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "c8982bfc211b19c2eb3f615ab9159a225a421c44",
    sourceLabel: "Clarify Design by Artifact lineage and establish Research Engineering cornerstone",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/c8982bfc211b19c2eb3f615ab9159a225a421c44",
    surfaceHref: "/research",
  },
  {
    id: "chg-weather-registry-recovery",
    date: "2026-09-23",
    scope: "Research",
    title: "Boundary First Weather gained durable research and registry routing.",
    summary:
      "Registry Review Wave 002 admitted the Weather research, lineage, and source surfaces while preserving the benchmark and Product firewalls and reconciling Product-to-ResearchLane edges.",
    consequence:
      "Weather is now easier to traverse across product, research, publication, lineage, and machine-readable registry surfaces without collapsing those identities together.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "3449532713410fd89cf71a34493f9a61bb4c577a",
    sourceLabel: "Merge RR2-HP-001-008 machine parity and Weather recovery",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/3449532713410fd89cf71a34493f9a61bb4c577a",
    surfaceHref: "/products/boundary-first-weather",
  },
  {
    id: "chg-temporal-public-surfaces",
    date: "2026-09-23",
    scope: "Public interface",
    title: "The website gained explicit Now, What Changed, and Lab Through Time views.",
    summary:
      "The temporal-state workstream merged the first public surfaces for current state, material deltas, and historical provenance.",
    consequence:
      "A visitor can now inspect the institution across present state, change history, and longer-term development rather than seeing only a static description.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "0944f1352f12cc1a9a2ec395feb5172217474aee",
    sourceLabel: "Initial temporal state and Lab Through Time surfaces",
    sourceHref:
      "https://github.com/codexsmith/web/commit/0944f1352f12cc1a9a2ec395feb5172217474aee",
    surfaceHref: "/lab-through-time",
  },
  {
    id: "chg-registry-recovery-151-closure",
    date: "2026-09-23",
    scope: "Institution",
    title: "The 151-item high-priority registry recovery wave closed.",
    summary:
      "The final recovery provenance closure recorded the exact source conversation and marked the RR-HP-001 through RR-HP-151 wave fully complete.",
    consequence:
      "A large body of previously under-registered work now has durable identity, routing, and machine-parity state instead of remaining dependent on folder memory and branch archaeology.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "9de9b9e9964230254c0b3a84994f436d8e8db5fe",
    sourceLabel: "Merge final registry recovery provenance closure",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/9de9b9e9964230254c0b3a84994f436d8e8db5fe",
    surfaceHref: "/apparatus",
  },
] as const;

export const historicalChanges: readonly PublicChange[] = [
  {
    id: "chg-canonical-institutional-routes",
    date: "2026-09-19",
    scope: "Public interface",
    title: "Institutional routes became canonical public URLs.",
    summary:
      "The website merged the route-canonicalization pass that moved the v3 institutional surface from preview-style paths to the primary public route structure.",
    consequence:
      "Research, products, institutional pages, and deep links can now be treated as the canonical public site rather than as a parallel versioned shell.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "2fad98679fe85f6bf41659ad1c957fa1ff52e698",
    sourceLabel: "Canonicalize institutional routes",
    sourceHref:
      "https://github.com/codexsmith/web/commit/2fad98679fe85f6bf41659ad1c957fa1ff52e698",
    surfaceHref: "/",
  },
  {
    id: "chg-v3-institutional-face",
    date: "2026-09-19",
    scope: "Public interface",
    title: "Website v3 became the institutional face of Boundary First Labs.",
    summary:
      "The main v3 institutional-face workstream and routing switch merged into the web repository.",
    consequence:
      "The public site shifted from an earlier shell toward the current institution-oriented information architecture and visual system.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "73c9ff9c09faed2493aebd32a3fb4e19dbf72599",
    sourceLabel: "Website v3 institutional face and v2/v3 routing switch",
    sourceHref:
      "https://github.com/codexsmith/web/commit/73c9ff9c09faed2493aebd32a3fb4e19dbf72599",
    surfaceHref: "/",
  },
  {
    id: "chg-representational-taxonomy",
    date: "2026-09-18",
    scope: "Public interface",
    title: "Representational domain taxonomy became a visible Lab snapshot dimension.",
    summary:
      "The public corpus snapshot exposed the Lab's representational taxonomy instead of leaving static/dynamic and discrete/continuous structure implicit.",
    consequence:
      "A visitor can see how information, mathematics, physics, computation, and language sit inside a broader representational-domain frame.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "f6fc94a7dc84225c2718f16adef32b260775eb4f",
    sourceLabel: "Style representational domain taxonomy",
    sourceHref:
      "https://github.com/codexsmith/web/commit/f6fc94a7dc84225c2718f16adef32b260775eb4f",
    surfaceHref: "/",
  },
  {
    id: "chg-quadrature-entropy",
    date: "2026-09-18",
    scope: "Research",
    title: "Representational quadrature and entropy research was reconciled into Lab main.",
    summary:
      "A previously separate research package was reconciled onto the current canonical corpus rather than remaining isolated on an older work branch.",
    consequence:
      "The work is now part of the main recoverable research body and can participate in later publication, comparison, and evidence workflows.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15",
    sourceLabel: "Reconcile representational quadrature and entropy research package",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/3a8c984712ae1d87c7ec714876c356c20242cb15",
    surfaceHref: "/research",
  },
  {
    id: "chg-singularity-calibration",
    date: "2026-09-18",
    scope: "Research",
    title: "Paired Poincare / Navier-Stokes singularity calibration was reconciled.",
    summary:
      "The paired singularity-calibration work was brought onto canonical main as a bounded research package.",
    consequence:
      "The comparison now has durable corpus presence without implying that either mathematical problem has been solved or promoted.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "36f8f15d0968d353931a2bec3a803f21e2abd9db",
    sourceLabel: "Reconcile paired Poincare / Navier-Stokes singularity calibration",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/36f8f15d0968d353931a2bec3a803f21e2abd9db",
    surfaceHref: "/research",
  },
  {
    id: "chg-knowledge-normalization",
    date: "2026-09-18",
    scope: "Method",
    title: "Knowledge normalization and integration debt were reconciled into the corpus.",
    summary:
      "A research note focused on normalization and integration debt moved into current canonical state.",
    consequence:
      "The Lab's representation-maintenance problem is documented as part of the work rather than treated as invisible housekeeping.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "57be67134804f30f3435936ddbfcc8b38ddefda3",
    sourceLabel: "Reconcile knowledge normalization and integration debt note",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/57be67134804f30f3435936ddbfcc8b38ddefda3",
    surfaceHref: "/apparatus",
  },
  {
    id: "chg-website-v3-architecture",
    date: "2026-09-18",
    scope: "Institution",
    title: "Website v3 content architecture was reconciled into the Lab corpus.",
    summary:
      "The institutional website's content architecture became represented inside the Lab corpus as part of the institution's governed public projection.",
    consequence:
      "The public interface and the research corpus are less likely to drift into two unrelated descriptions of the Lab.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "298786157b261f20533a778c63b84e87145cd379",
    sourceLabel: "Reconcile Website v3 content architecture onto current main",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/298786157b261f20533a778c63b84e87145cd379",
    surfaceHref: "/about",
  },
  {
    id: "chg-regime-recovery",
    date: "2026-09-18",
    scope: "Research",
    title: "Regime-recovery formalization completed its reconciliation replay.",
    summary:
      "A formalization workstream was replayed and reconciled onto the current corpus rather than being copied forward as an opaque final artifact.",
    consequence:
      "Its lineage is preserved through the reconciliation process, which is itself useful evidence about recoverability and corpus maintenance.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "6d2bf7e7b2ff9331138b4f42ccdb2c51cc4ba952",
    sourceLabel: "Reconcile regime recovery formalization onto current main",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/6d2bf7e7b2ff9331138b4f42ccdb2c51cc4ba952",
    surfaceHref: "/research",
  },
  {
    id: "chg-ai-verification",
    date: "2026-09-18",
    scope: "Method",
    title: "AI-assisted candidate verification protocol was reconciled.",
    summary:
      "The candidate-verification protocol was replayed into current canonical state as a governed method artifact.",
    consequence:
      "AI-assisted research can be discussed through an inspectable verification protocol rather than as an unbounded claim about agent capability.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "2a120b9bd17648f520c3ec869d8287d5c7f26189",
    sourceLabel: "Reconcile AI-assisted candidate verification protocol",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/2a120b9bd17648f520c3ec869d8287d5c7f26189",
    surfaceHref: "/research",
  },
  {
    id: "chg-timeline-register",
    date: "2026-09-16",
    scope: "Institution",
    title: "The Lab Timeline became a canonical registry.",
    summary:
      "The timeline-registry workstream promoted a canonical Lab Timeline Register instead of leaving institutional history distributed across local narrative surfaces.",
    consequence:
      "Temporal provenance gained a durable source that public history views can project from without making the website itself the historical authority.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "c48af1edd812ebda48220b17a76e08f5afb4804c",
    sourceLabel: "Promote canonical Lab Timeline Register",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/c48af1edd812ebda48220b17a76e08f5afb4804c",
    surfaceHref: "/lab-through-time",
  },
  {
    id: "chg-capability-foundry",
    date: "2026-09-12",
    scope: "Institution",
    title: "The Internal Capability Foundry gained its first executable scaffold.",
    summary:
      "A portable capability-foundry MVP established adapter contracts, a credential-free demo chain, run manifests, artifact hashing, and bounded setup/run entrypoints.",
    consequence:
      "The Lab gained a concrete path for adding reusable capabilities such as voice, social distribution, and funding adapters without collapsing provider implementations into the institutional contract.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "2cd645712fd281db45eb6e2b589041258cc40942",
    sourceLabel: "Internal Capability Foundry MVP scaffold",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/2cd645712fd281db45eb6e2b589041258cc40942",
    surfaceHref: "/apparatus",
  },
  {
    id: "chg-representational-lab-suite",
    date: "2026-09-12",
    scope: "Research",
    title: "The Representational Laboratory Suite entered the corpus.",
    summary:
      "The Representational Laboratory Suite v0.1 merged as a bounded research and instrumentation package.",
    consequence:
      "Representation-focused experiments and instruments gained a more explicit home for continued calibration and public explanation.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "fce3d0cf95fe7667ef9c0e807c0d443b4241c3b3",
    sourceLabel: "Add Representational Laboratory Suite v0.1",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/fce3d0cf95fe7667ef9c0e807c0d443b4241c3b3",
    surfaceHref: "/labs/representation-lab",
  },
  {
    id: "chg-paper-mine-workbench",
    date: "2026-08-24",
    scope: "Public interface",
    title: "Paper Mine became a public research workbench.",
    summary:
      "The web repository merged the first public Paper Mine workbench rather than leaving publication state as an internal-only corpus surface.",
    consequence:
      "Readers gained a public route into publication candidates and their research context instead of seeing publications only as isolated finished documents.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "38d1b012fcc56b8fb2119a3a819a19d2c7c7255f",
    sourceLabel: "Add Paper Mine public research workbench",
    sourceHref:
      "https://github.com/codexsmith/web/commit/38d1b012fcc56b8fb2119a3a819a19d2c7c7255f",
    surfaceHref: "/research/paper-mine",
  },
  {
    id: "chg-public-architecture-review-gates",
    date: "2026-08-14",
    scope: "Public interface",
    title: "The first public architecture and review gates landed.",
    summary:
      "The initial public-shell merge established the website architecture and explicit review gates that later institutional surfaces built on.",
    consequence:
      "This is an early durable boundary in the site's history: the public interface became a governed projection rather than a loose collection of pages.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "32b5b832344121fd7e18c00ed4b484e183f28fef",
    sourceLabel: "Build Boundary First Labs public architecture and review gates",
    sourceHref:
      "https://github.com/codexsmith/web/commit/32b5b832344121fd7e18c00ed4b484e183f28fef",
    surfaceHref: "/",
  },
] as const;

export const allChanges: readonly PublicChange[] = [
  ...recentChanges,
  ...historicalChanges,
];

export const homeRecentChanges = recentChanges.slice(0, 3);
export const nowRecentChanges = recentChanges.slice(0, 5);
