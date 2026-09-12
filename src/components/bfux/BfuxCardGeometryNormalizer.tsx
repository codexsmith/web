"use client";

import { useEffect } from "react";
import "./bfux-card-geometry-normalizer.css";

const desktopQuery = "(min-width: 1025px)";
const machineSelector = '.bf-machine[data-skin="physical"]';
const apparatusSelector = '[data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const legacyGridStorageKey = "bfl_bfux_anchor_grid_v1";
const fixedPitchMigrationKey = "bfl_bfux_anchor_grid_90px_stable_sizes_v2";
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
    const height = roundUpToQuantum(size.height);
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

function migrateLegacyEditorGridState() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("bfux") !== "edit") return;

  try {
    if (window.localStorage.getItem(fixedPitchMigrationKey) === "1") return;
    /* The first 90px implementation could persist spans sampled after repeated
     * 60px re-normalization. Clear those contaminated editor placements once so
     * the stable-size model starts from the canonical composition rather than
     * preserving accidental growth. */
    window.localStorage.removeItem(legacyGridStorageKey);
    window.localStorage.setItem(fixedPitchMigrationKey, "1");
  } catch {
    // Storage is optional; the editor still hydrates from authored source.
  }
}

/**
 * Canonical desktop geometry bridge.
 *
 * The existing Lab Machine composition was authored in percentages, clamps and
 * content-sized special cases. We sample each live exterior size once, then
 * round width and height UP to the next 60px module. The BFUX drafting lattice
 * is intentionally coarser at 90px to keep the editor performant and visually
 * calm. Card dimensions remain independent of that ruler, so drag/drop moves
 * cards without resizing them even when a card spans a fractional track count.
 *
 * Position remains owned by the authored composition until a card is explicitly
 * placed on the lattice. Once placed, the anchor-grid contract owns the same
 * exterior envelope; drag/drop therefore moves rather than resizes the card.
 */
export function BfuxCardGeometryNormalizer() {
  useEffect(() => {
    migrateLegacyEditorGridState();

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
