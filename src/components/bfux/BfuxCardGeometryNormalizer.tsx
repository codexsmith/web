"use client";

import { useEffect } from "react";
import "./bfux-card-geometry-normalizer.css";

const desktopQuery = "(min-width: 1025px)";
const machineSelector = '.bf-machine[data-skin="physical"]';
const apparatusSelector = '[data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const legacyGridStorageKey = "bfl_bfux_anchor_grid_v1";
const fixedPitchMigrationKey = "bfl_bfux_anchor_grid_30px_migrated_v1";
export const bfuxCardSizeQuantumPx = 60;

function roundUpToQuantum(value: number, quantum = bfuxCardSizeQuantumPx) {
  if (!Number.isFinite(value) || value <= 0) return quantum;
  return Math.ceil(value / quantum) * quantum;
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
  const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector))
    .filter((node) => node.dataset.expanded !== "true");

  /* Measure every card before mutating any card. This is important for nested
   * hardware such as Tour: resizing its parent must not change the source
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

function migrateLegacyEditorGridState() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("bfux") !== "edit") return;

  try {
    if (window.localStorage.getItem(fixedPitchMigrationKey) === "1") return;
    /* Old placements encoded column/row against a stretched apparatus grid.
     * Those coordinates do not mean the same thing on the new fixed 30px ruler,
     * so carrying them forward would manufacture apparent placement bugs. */
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
 * content-sized special cases. We sample those live exterior sizes, then round
 * each width and height UP to the next 60px module. The BFUX drafting lattice is
 * 30px, so every canonical card edge occupies an even number of tracks.
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

      /* Let canonical composition CSS settle before sampling it. */
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
      if (records.some((record) => record.type === "childList" || record.attributeName === "data-resolution")) {
        schedule();
      }
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
