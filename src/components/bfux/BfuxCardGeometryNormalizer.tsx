"use client";

import { useEffect } from "react";
import { bfuxAuthoredLayout } from "./bfux-layout-authored.generated";
import { bfuxGridPitchPx } from "./bfux-grid-geometry";
import type { BfuxLayoutNodePlacement } from "./bfux-layout-source";
import "./bfux-card-geometry-normalizer.css";

const desktopQuery = "(min-width: 1025px)";
const machineSelector = '.bf-machine[data-skin="physical"]';
const apparatusSelector = '[data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const legacyGridStorageKey = "bfl_bfux_anchor_grid_v1";
const billboardLayoutStorageKey = "bfl_bfux_layout_studio_billboard_v1";
const sizeProfileMigrationKey = "bfl_bfux_anchor_grid_90px_size_profile_v9";
const twoTrackNodeIds = new Set(["representation-lab", "people", "products", "publications", "about"]);
export const bfuxCardSizeQuantumPx = 60;
const measurementNoiseTolerancePx = 0.75;

const billboardInteriorDefaults = {
  focus: {
    visualWidth: 40,
    mazeScale: 0.92,
    mazeLeft: -14,
    visualPadX: 0.5,
    visualPadY: 0.36,
    copyPadX: 0.62,
    copyPadY: 0.48,
    titleScale: 1.6,
    controlsHeight: 2.5,
  },
  mid: {
    visualWidth: 40,
    mazeScale: 0.92,
    mazeLeft: -14,
    visualPadX: 0.5,
    visualPadY: 0.36,
    copyPadX: 0.62,
    copyPadY: 0.48,
    titleScale: 1.55,
    controlsHeight: 2.5,
  },
} as const;

type SavedGridProjection = {
  spec?: { columns?: number; rows?: number; visible?: boolean };
  placements?: BfuxLayoutNodePlacement[];
};

type LegacyFullPlacement = Pick<
  BfuxLayoutNodePlacement,
  "nodeId" | "column" | "row" | "corner" | "columnSpan" | "rowSpan"
>;

/* Immediately preceding generated Full profile. This lets the migration advance
 * the known WIP reference composition without touching a genuinely hand-edited
 * Full arrangement. */
const legacyFullComposition: LegacyFullPlacement[] = [
  { nodeId: "people", column: 8, row: 1, corner: "ne", columnSpan: 4, rowSpan: 1.75 },
  { nodeId: "products", column: 12, row: 2.75, corner: "se", columnSpan: 3.75, rowSpan: 1.75 },
  { nodeId: "publications", column: 12.5, row: 1, corner: "nw", columnSpan: 4, rowSpan: 1.75 },
  { nodeId: "about", column: 3.5, row: 3.25, corner: "ne", columnSpan: 3.75, rowSpan: 1.75 },
  { nodeId: "research", column: 4, row: 3, corner: "nw", columnSpan: 7.25, rowSpan: 2.25 },
  { nodeId: "governance", column: 11.5, row: 5, corner: "nw", columnSpan: 3.75, rowSpan: 1.75 },
  { nodeId: "pipeline", column: 4.25, row: 5.5, corner: "nw", columnSpan: 2, rowSpan: 1 },
  { nodeId: "method", column: 6.25, row: 5.5, corner: "nw", columnSpan: 2.25, rowSpan: 1 },
  { nodeId: "timeline", column: 8.5, row: 5.5, corner: "nw", columnSpan: 2.25, rowSpan: 1 },
];

function approximatelyEqual(left: number | undefined, right: number | undefined) {
  if (left == null || right == null) return left === right;
  return Math.abs(left - right) < 0.001;
}

function isLegacyFullComposition(projection: SavedGridProjection | undefined) {
  const placements = projection?.placements;
  if (!Array.isArray(placements) || placements.length !== legacyFullComposition.length) return false;

  const byId = new Map(placements.map((placement) => [placement.nodeId, placement]));
  return legacyFullComposition.every((expected) => {
    const actual = byId.get(expected.nodeId);
    return Boolean(
      actual
      && actual.corner === expected.corner
      && approximatelyEqual(actual.column, expected.column)
      && approximatelyEqual(actual.row, expected.row)
      && approximatelyEqual(actual.columnSpan, expected.columnSpan)
      && approximatelyEqual(actual.rowSpan, expected.rowSpan)
    );
  });
}

function roundUpToQuantum(value: number, quantum = bfuxCardSizeQuantumPx) {
  if (!Number.isFinite(value) || value <= 0) return quantum;

  /* DOMRect values can land a fraction of a pixel above an exact module after
   * apparatus scaling (360.0002, 420.0001, ...). A raw Math.ceil would then add
   * another full 60px every time the normalizer observed the machine. Ignore a
   * sub-pixel tolerance before rounding so normalization is mathematically
   * idempotent. */
  const stableValue = Math.max(0, value - measurementNoiseTolerancePx);
  return Math.max(quantum, Math.ceil(stableValue / quantum) * quantum);
}

function measureLocalSize(node: HTMLElement, apparatus: HTMLElement) {
  const apparatusRect = apparatus.getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();
  const scaleX = apparatus.offsetWidth > 0 ? apparatusRect.width / apparatus.offsetWidth : 1;
  const scaleY = apparatus.offsetHeight > 0 ? apparatusRect.height / apparatus.offsetHeight : scaleX;

  return {
    width: nodeRect.width / (scaleX || 1),
    height: nodeRect.height / (scaleY || 1),
  };
}

function canonicalHeight(node: HTMLElement, measuredHeight: number) {
  const nodeId = node.dataset.nodeId ?? "";

  /* These are fallback card families for nodes that have not been explicitly
   * authored onto the lattice. A placed projection owns its own exterior span,
   * so Full Loop can use reference-tuned fractional tracks without this bridge
   * rewriting them. */
  if (twoTrackNodeIds.has(nodeId)) return bfuxGridPitchPx * 2;
  if (nodeId === "research") return bfuxGridPitchPx * 3;

  return roundUpToQuantum(measuredHeight);
}

function clearCanonicalSizes(apparatus: HTMLElement) {
  for (const node of Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector))) {
    delete node.dataset.bfuxGridCanonicalSize;
    node.style.removeProperty("--bfux-node-canonical-width");
    node.style.removeProperty("--bfux-node-canonical-height");
  }
}

function applyCanonicalSizes(apparatus: HTMLElement) {
  /* Normalization is a one-time migration for each top-level card in the current
   * apparatus/resolution. Attached hardware such as Full Loop Tour derives its
   * geometry from its parent card and must never be independently quantized. */
  const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector))
    .filter((node) => (
      node.dataset.expanded !== "true"
      && node.dataset.attachedTo == null
      && node.dataset.bfuxGridCanonicalSize !== "true"
    ));

  if (nodes.length === 0) return;

  /* Measure every new card before mutating any card so sibling measurements do
   * not feed back through another card's newly normalized envelope. */
  const measurements = nodes.map((node) => ({
    node,
    size: measureLocalSize(node, apparatus),
  }));

  for (const { node, size } of measurements) {
    const width = roundUpToQuantum(size.width);
    const height = canonicalHeight(node, size.height);
    node.dataset.bfuxGridCanonicalSize = "true";
    node.style.setProperty("--bfux-node-canonical-width", `${width}px`);
    node.style.setProperty("--bfux-node-canonical-height", `${height}px`);
  }
}

function mutationMayAddMachineCard(record: MutationRecord) {
  if (record.type === "attributes") return record.attributeName === "data-resolution";
  if (record.type !== "childList") return false;

  return Array.from(record.addedNodes).some((added) => {
    if (!(added instanceof Element)) return false;
    return added.matches(nodeSelector, machineSelector)
      || Boolean(added.querySelector(nodeSelector));
  });
}

function migrateEditorSizeProfile() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("bfux") !== "edit") return;

  try {
    if (window.localStorage.getItem(sizeProfileMigrationKey) === "1") return;

    /* Full Loop now has a reference-tuned authored projection. Replace only the
     * empty pre-grid state or the immediately preceding generated Full profile;
     * hand-authored Full arrangements remain untouched. */
    const rawGrid = window.localStorage.getItem(legacyGridStorageKey);
    if (rawGrid) {
      const saved = JSON.parse(rawGrid) as Record<string, SavedGridProjection | undefined>;
      const mid = saved.mid;
      if (
        !mid
        || !Array.isArray(mid.placements)
        || mid.placements.length === 0
        || isLegacyFullComposition(mid)
      ) {
        saved.mid = {
          ...(mid ?? {}),
          spec: { ...bfuxAuthoredLayout.mid.anchorGrid.spec },
          placements: bfuxAuthoredLayout.mid.anchorGrid.placements.map((placement) => ({ ...placement })),
        };
      }

      /* Core keeps the shared fallback height families. Full owns its explicit
       * fractional row spans and must not be coerced back to 2/3-track cards. */
      const focus = saved.focus;
      if (focus && Array.isArray(focus.placements)) {
        focus.placements = focus.placements.map((placement) => {
          const nodeId = placement.nodeId ?? "";
          if (twoTrackNodeIds.has(nodeId)) return { ...placement, rowSpan: 2 };
          if (nodeId === "research") return { ...placement, rowSpan: 3 };
          return placement;
        });
      }

      window.localStorage.setItem(legacyGridStorageKey, JSON.stringify(saved));
    }

    /* The billboard's old local tuning values were authored before its chassis
     * was folded back into the normal machine-card geometry. Keep width, height,
     * gap and any other user choices, but refresh the internal visual/copy split
     * so existing edit sessions pick up the repaired billboard immediately. */
    const rawBillboard = window.localStorage.getItem(billboardLayoutStorageKey);
    if (rawBillboard) {
      const saved = JSON.parse(rawBillboard) as Record<string, Record<string, unknown> | undefined>;
      for (const key of ["focus", "mid"] as const) {
        saved[key] = {
          ...(saved[key] ?? {}),
          ...billboardInteriorDefaults[key],
        };
      }
      window.localStorage.setItem(billboardLayoutStorageKey, JSON.stringify(saved));
    }

    window.localStorage.setItem(sizeProfileMigrationKey, "1");
  } catch {
    // Storage is optional; the editor still hydrates from authored source.
  }
}

/**
 * Canonical desktop geometry bridge.
 *
 * Widths still derive from the existing machine and round UP to the next 60px
 * module. Unplaced card heights use explicit fallback families: the
 * Representation Lab billboard, People / Products / Publications, and About
 * use 180px (2 x 90px tracks), while unplaced Research uses 270px (3 x 90px
 * tracks). Authored grid placement supersedes those fallback envelopes and may
 * use fractional spans where the physical reference composition requires them.
 * Attached hardware derives its envelope from its parent instead of being
 * independently normalized.
 *
 * Position remains owned by the authored composition until a card is explicitly
 * placed on the lattice. Once placed, the anchor-grid contract owns the same
 * exterior envelope; drag/drop therefore moves rather than resizes the card.
 */
export function BfuxCardGeometryNormalizer() {
  useEffect(() => {
    migrateEditorSizeProfile();

    const desktop = window.matchMedia(desktopQuery);
    let frame = 0;
    let activeApparatus: HTMLElement | null = null;
    let activeResolution = "";

    const apply = () => {
      const machine = document.querySelector<HTMLElement>(machineSelector);
      const apparatus = machine?.querySelector<HTMLElement>(apparatusSelector) ?? null;

      if (!desktop.matches) {
        if (activeApparatus) clearCanonicalSizes(activeApparatus);
        activeApparatus = apparatus;
        activeResolution = machine?.dataset.resolution ?? "";
        return;
      }

      if (!machine || !apparatus) return;

      const resolution = machine.dataset.resolution ?? "focus";
      const apparatusChanged = activeApparatus !== apparatus;
      const resolutionChanged = activeResolution !== resolution;

      if (activeApparatus && (apparatusChanged || resolutionChanged)) {
        clearCanonicalSizes(activeApparatus);
      }

      activeApparatus = apparatus;
      activeResolution = resolution;

      /* Let canonical composition CSS settle before sampling newly mounted
       * cards. Existing normalized cards are never sampled again. */
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyCanonicalSizes(apparatus));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    schedule();
    desktop.addEventListener("change", schedule);
    const observer = new MutationObserver((records) => {
      if (records.some(mutationMayAddMachineCard)) schedule();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-resolution"],
    });

    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      if (activeApparatus) clearCanonicalSizes(activeApparatus);
    };
  }, []);

  return null;
}
