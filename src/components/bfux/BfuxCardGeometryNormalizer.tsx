"use client";

import { useEffect } from "react";
import { bfuxGridPitchPx } from "./bfux-grid-geometry";
import "./bfux-card-geometry-normalizer.css";

const desktopQuery = "(min-width: 1025px)";
const machineSelector = '.bf-machine[data-skin="physical"]';
const apparatusSelector = '[data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const legacyGridStorageKey = "bfl_bfux_anchor_grid_v1";
const sizeProfileMigrationKey = "bfl_bfux_anchor_grid_90px_size_profile_v4";
const upperFieldNodeIds = new Set(["representation-lab", "people", "products", "publications"]);
export const bfuxCardSizeQuantumPx = 60;
const measurementNoiseTolerancePx = 0.75;

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

  /* The billboard and upper People / Products / Publications bank are the same
   * physical card family: two 90px tracks tall. Research is three tracks tall.
   * The billboard differs only in what its face renders, not in its chassis
   * geometry. */
  if (upperFieldNodeIds.has(nodeId)) return bfuxGridPitchPx * 2;
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
  /* Normalization is a one-time migration for each card in the current
   * apparatus/resolution. Grid portals and drag/drop mutate the DOM frequently;
   * re-measuring already-normalized cards would feed their own rounded output
   * back into the next measurement and can create runaway growth. Newly mounted
   * cards are still discovered and normalized when they appear. */
  const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector))
    .filter((node) => (
      node.dataset.expanded !== "true"
      && node.dataset.bfuxGridCanonicalSize !== "true"
    ));

  if (nodes.length === 0) return;

  /* Measure every new card before mutating any card. This is important for
   * nested hardware such as Tour: resizing its parent must not change the source
   * measurement we are trying to quantize. */
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

    /* Preserve the user's anchor/corner work. Only migrate vertical spans for
     * card families whose canonical heights are grid-native. The billboard is
     * now deliberately the same two-track chassis family as the upper cards. */
    const raw = window.localStorage.getItem(legacyGridStorageKey);
    if (raw) {
      const saved = JSON.parse(raw) as Record<string, { placements?: Array<{ nodeId?: string; rowSpan?: number }> }>;
      for (const projection of Object.values(saved)) {
        if (!projection || !Array.isArray(projection.placements)) continue;
        projection.placements = projection.placements.map((placement) => {
          const nodeId = placement.nodeId ?? "";
          if (upperFieldNodeIds.has(nodeId)) return { ...placement, rowSpan: 2 };
          if (nodeId === "research") return { ...placement, rowSpan: 3 };
          return placement;
        });
      }
      window.localStorage.setItem(legacyGridStorageKey, JSON.stringify(saved));
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
 * module. Heights use explicit grid-native families: the Representation Lab
 * billboard plus People / Products / Publications are 180px (2 x 90px tracks),
 * while Research is 270px (3 x 90px tracks). Other cards retain the 60px
 * rounding bridge until their own grid-native size families are chosen.
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
