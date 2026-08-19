export const uiShellModes = ["cards", "apparatus"] as const;

export type UiShellMode = (typeof uiShellModes)[number];

/**
 * Card is the active production renderer. Apparatus is intentionally reserved as a
 * second representation target over the same semantic graph, traversal state, content,
 * evidence, publication, and process model.
 *
 * The Apparatus design sequence is documented in:
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_interaction_grammar_v0_1.md
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_static_studies_v0_1.md
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_visual_morphology_v0_1.md
 *
 * The semantic grammar, real-content studies, and first visual morphology are now
 * sufficiently specified for a small implementation prototype. Apparatus remains
 * reserved until that prototype proves semantic parity, accessibility, zoom/reflow,
 * connector-density collapse, and reduced-motion behavior. It must not replace Card as
 * the production shell merely because prototype code exists.
 */
export const activeUiShell: UiShellMode = "cards";

export const uiShellReadiness: Record<UiShellMode, "active" | "reserved"> = {
  cards: "active",
  apparatus: "reserved",
};
