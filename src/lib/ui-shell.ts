export const uiShellModes = ["cards", "apparatus"] as const;

export type UiShellMode = (typeof uiShellModes)[number];

/**
 * Card is the active production renderer. Apparatus is intentionally reserved here as a
 * second representation target over the same semantic graph, traversal state, content,
 * evidence, and process model. Do not render an apparatus placeholder: its visual and
 * interaction grammar is still under design.
 */
export const activeUiShell: UiShellMode = "cards";

export const uiShellReadiness: Record<UiShellMode, "active" | "reserved"> = {
  cards: "active",
  apparatus: "reserved",
};
