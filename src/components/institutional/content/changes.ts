export type PublicChange = {
  id: string;
  date: string;
  scope: "Research" | "Method" | "Institution" | "Public interface";
  title: string;
  summary: string;
  consequence: string;
  sourceRepository: string;
  sourceRevision: string;
  sourceHref: string;
  surfaceHref?: string;
};

export const changesProjection = {
  generatedDate: "2026-09-18",
  webRevision: "f6fc94a7dc84225c2718f16adef32b260775eb4f",
  labRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15",
  authority:
    "This is a curated public delta projection over canonical repository state. It reports selected material changes; it is not a complete commit log, activity feed, or claim-promotion surface.",
} as const;

export const recentChanges: readonly PublicChange[] = [
  {
    id: "chg-representational-taxonomy",
    date: "2026-09-18",
    scope: "Public interface",
    title: "Representational domain taxonomy became a visible Lab snapshot dimension.",
    summary:
      "The public corpus snapshot now exposes the Lab's representational taxonomy instead of leaving static/dynamic and discrete/continuous structure implicit.",
    consequence:
      "A visitor can now see how information, mathematics, physics, computation, and language sit inside a broader representational-domain frame.",
    sourceRepository: "codexsmith/web",
    sourceRevision: "f6fc94a7dc84225c2718f16adef32b260775eb4f",
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
      "The Lab's representation-maintenance problem is now documented as part of the work rather than treated as invisible housekeeping.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "57be67134804f30f3435936ddbfcc8b38ddefda3",
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
      "The institutional website's content architecture is now represented inside the Lab corpus as part of the institution's governed public projection.",
    consequence:
      "The public interface and the research corpus are less likely to drift into two unrelated descriptions of the Lab.",
    sourceRepository: "codexsmith/boundary-first-labs",
    sourceRevision: "298786157b261f20533a778c63b84e87145cd379",
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
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/commit/2a120b9bd17648f520c3ec869d8287d5c7f26189",
    surfaceHref: "/research",
  },
] as const;

export const homeRecentChanges = recentChanges.slice(0, 3);
export const nowRecentChanges = recentChanges.slice(0, 5);
