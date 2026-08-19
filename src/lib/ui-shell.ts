export const uiShellModes = ["cards", "apparatus"] as const;

export type UiShellMode = (typeof uiShellModes)[number];

/**
 * Card is the active production renderer. Apparatus is intentionally reserved as a
 * second representation target over the same semantic graph, traversal state, content,
 * evidence, publication, and process model.
 *
 * Its interaction grammar is now documented in
 * backlog/3_bfl_boundary_first_ux/bfl_apparatus_interaction_grammar_v0_1.md.
 * Do not render an apparatus placeholder or production renderer yet: the next gate is
 * three static apparatus studies (root, branch, leaf) reviewed against that grammar.
 */
export const activeUiShell: UiShellMode = "cards";

export const uiShellReadiness: Record<UiShellMode, "active" | "reserved"> = {
  cards: "active",
  apparatus: "reserved",
};
