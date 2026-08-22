export const uiShellModes = ["cards", "apparatus"] as const;

export type UiShellMode = (typeof uiShellModes)[number];
export type UiShellReadiness = "active" | "prototype";

/**
 * Card remains the active production renderer. Apparatus now has a bounded prototype
 * renderer over the same semantic graph, traversal state, content, evidence,
 * publication, and process model.
 *
 * The Apparatus design sequence is documented in:
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_interaction_grammar_v0_1.md
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_static_studies_v0_1.md
 * - backlog/3_bfl_boundary_first_ux/bfl_apparatus_visual_morphology_v0_1.md
 *
 * The prototype is addressable only through an explicit `ui=apparatus` query. It is
 * not the production default and must not replace Card until browser, zoom,
 * accessibility, traversal, and content-parity review are complete.
 */
export const activeUiShell: UiShellMode = "cards";

export const uiShellReadiness: Record<UiShellMode, UiShellReadiness> = {
  cards: "active",
  apparatus: "prototype",
};

export function parseUiShell(value?: string | string[]): UiShellMode {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate === "apparatus" ? "apparatus" : "cards";
}
