"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BfuxAnchorGridLayer,
  BfuxAnchorGridPicker,
  remapBfuxAnchorPlacements,
  type BfuxAnchorGridSpec,
  type BfuxAnchorGridState,
  type BfuxNodeAnchorPlacement,
} from "./BfuxAnchorGrid";
import { BfuxAuthoredLayoutLayer } from "./BfuxAuthoredLayoutLayer";
import { BfuxPartsBox } from "./BfuxPartsBox";
import { BfuxPlacementLayer, type BfuxPlacedPart } from "./BfuxPlacementLayer";
import { bfuxAuthoredLayout } from "./bfux-layout-authored.generated";
import {
  bfuxAuthoredLayoutSourcePath,
  renderBfuxAuthoredLayoutSource,
} from "./bfux-layout-compiler";
import type {
  BfuxBillboardLayout,
  BfuxLayoutResolution,
  BfuxMachineLayoutSource,
  BfuxProjectionLayout,
} from "./bfux-layout-source";
import "./bfux-layout-studio.css";

const targetSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const machineSelector = '.bf-machine[data-skin="physical"]';
const storageKey = "bfl_bfux_layout_studio_billboard_v1";
const gridStorageKey = "bfl_bfux_anchor_grid_v1";
const placementStorageKey = "bfl_bfux_placed_parts_v1";
const tuningEvent = "bfux-layout-tuning";

type ResolutionKey = BfuxLayoutResolution;
type LayoutValues = BfuxBillboardLayout;
type SavedLayout = Partial<Record<ResolutionKey, Partial<LayoutValues>>>;
type SavedAnchorGrid = Partial<Record<ResolutionKey, Partial<BfuxAnchorGridState>>>;
type SavedParts = Partial<Record<ResolutionKey, BfuxPlacedPart[]>>;

function authoredProjection(resolution: ResolutionKey): BfuxProjectionLayout {
  return bfuxAuthoredLayout[resolution];
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The studio remains functional for the active session when storage is blocked.
  }
}

function readSaved(): SavedLayout {
  return readJson<SavedLayout>(storageKey, {});
}

function writeSaved(saved: SavedLayout) {
  writeJson(storageKey, saved);
}

function readSavedGrid(): SavedAnchorGrid {
  return readJson<SavedAnchorGrid>(gridStorageKey, {});
}

function writeSavedGrid(saved: SavedAnchorGrid) {
  writeJson(gridStorageKey, saved);
}

function readSavedParts(): SavedParts {
  return readJson<SavedParts>(placementStorageKey, {});
}

function hydratedGrid(
  saved: SavedAnchorGrid[ResolutionKey],
  fallback: BfuxProjectionLayout["anchorGrid"],
): BfuxAnchorGridState {
  return {
    spec: {
      ...fallback.spec,
      ...(saved?.spec ?? {}),
    },
    placements: Array.isArray(saved?.placements)
      ? saved.placements
      : fallback.placements.map((placement) => ({ ...placement })),
  };
}

function currentResolution(machine: HTMLElement | null): ResolutionKey {
  return machine?.dataset.resolution === "mid" || machine?.dataset.resolution === "full" ? "mid" : "focus";
}

function applyValues(target: HTMLElement, values: LayoutValues) {
  target.style.setProperty("--billboard-width", `${values.width}%`);
  if (values.height === null) target.style.removeProperty("--billboard-height");
  else target.style.setProperty("--billboard-height", `${values.height}px`);
  target.style.setProperty("--billboard-gap-y", `${values.gapY}px`);
  target.style.setProperty("--billboard-visual-width", `${values.visualWidth}%`);
  target.style.setProperty("--billboard-maze-scale", String(values.mazeScale));
  target.style.setProperty("--billboard-maze-left", `${values.mazeLeft}%`);
  target.style.setProperty("--billboard-visual-pad-x", String(values.visualPadX));
  target.style.setProperty("--billboard-visual-pad-y", String(values.visualPadY));
  target.style.setProperty("--billboard-copy-pad-x", String(values.copyPadX));
  target.style.setProperty("--billboard-copy-pad-y", String(values.copyPadY));
  target.style.setProperty("--billboard-title-scale", String(values.titleScale));
  target.style.setProperty("--billboard-controls-height", String(values.controlsHeight));
  target.dispatchEvent(new CustomEvent(tuningEvent, { bubbles: true }));
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  displayValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  displayValue?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="bfux-layout-studio__control">
      <span>{label}</span>
      <output>{displayValue ?? `${value}${unit ?? ""}`}</output>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </label>
  );
}

function cloneProjection(projection: BfuxProjectionLayout): BfuxProjectionLayout {
  return {
    billboard: { ...projection.billboard },
    anchorGrid: {
      spec: { ...projection.anchorGrid.spec },
      placements: projection.anchorGrid.placements.map((placement) => ({ ...placement })),
    },
    placedParts: projection.placedParts.map((placement) => ({ ...placement })),
  };
}

function authoredEditState() {
  const layouts: SavedLayout = {};
  const grids: SavedAnchorGrid = {};
  const parts: SavedParts = {};

  for (const key of ["focus", "mid"] as const) {
    const projection = authoredProjection(key);
    layouts[key] = { ...projection.billboard };
    grids[key] = {
      spec: { ...projection.anchorGrid.spec },
      placements: projection.anchorGrid.placements.map((placement) => ({ ...placement })),
    };
    parts[key] = projection.placedParts.map((placement) => ({ ...placement }));
  }

  return { layouts, grids, parts };
}

export function BfuxLayoutStudio() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [resolution, setResolution] = useState<ResolutionKey>("focus");
  const [values, setValues] = useState<LayoutValues>({ ...authoredProjection("focus").billboard });
  const [placedParts, setPlacedParts] = useState<BfuxPlacedPart[]>([]);
  const [partsReady, setPartsReady] = useState(false);
  const [editResetEpoch, setEditResetEpoch] = useState(0);
  const [gridState, setGridState] = useState<BfuxAnchorGridState>(() => hydratedGrid(undefined, authoredProjection("focus").anchorGrid));
  const [gridHydratedFor, setGridHydratedFor] = useState<ResolutionKey | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState(140);
  const [copyState, setCopyState] = useState("COPY SOURCE");
  const [specState, setSpecState] = useState("COPY SPEC");
  const [writeState, setWriteState] = useState("WRITE REPO");
  const [metrics, setMetrics] = useState("waiting for billboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("bfux") === "edit");
  }, []);

  useEffect(() => {
    if (!enabled) {
      setPartsReady(false);
      return;
    }

    const saved = readSavedParts();
    let changed = false;
    for (const key of ["focus", "mid"] as const) {
      if (Array.isArray(saved[key])) continue;
      saved[key] = authoredProjection(key).placedParts.map((placement) => ({ ...placement }));
      changed = true;
    }
    if (changed) writeJson(placementStorageKey, saved);
    setPartsReady(true);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const find = () => {
      const nextTarget = document.querySelector<HTMLElement>(targetSelector);
      const nextMachine = nextTarget?.closest<HTMLElement>(machineSelector) ?? document.querySelector<HTMLElement>(machineSelector);
      setTarget((current) => (current === nextTarget ? current : nextTarget));
      setResolution(currentResolution(nextMachine));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(find);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-resolution"] });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const saved = readSaved();
    setValues({ ...authoredProjection(resolution).billboard, ...(saved[resolution] ?? {}) });
  }, [enabled, resolution]);

  useEffect(() => {
    if (!enabled) return;
    const saved = readSavedGrid();
    setGridState(hydratedGrid(saved[resolution], authoredProjection(resolution).anchorGrid));
    setSelectedNodeId(null);
    setGridHydratedFor(resolution);
  }, [enabled, resolution]);

  useEffect(() => {
    if (!enabled || gridHydratedFor !== resolution) return;
    const saved = readSavedGrid();
    saved[resolution] = gridState;
    writeSavedGrid(saved);
  }, [enabled, gridHydratedFor, gridState, resolution]);

  useEffect(() => {
    if (!enabled || !target) return;
    applyValues(target, values);
    target.classList.add("bfux-layout-editing");

    const saved = readSaved();
    saved[resolution] = values;
    writeSaved(saved);

    return () => {
      target.classList.remove("bfux-layout-editing");
    };
  }, [enabled, resolution, target, values]);

  useEffect(() => {
    if (!enabled || !target) return;

    const updateMetrics = () => {
      const rect = target.getBoundingClientRect();
      const products = document.querySelector<HTMLElement>('.bf-machine-node[data-node-id="products"]');
      const productsRect = products?.getBoundingClientRect();
      const gap = productsRect ? productsRect.top - rect.bottom : 0;
      const localHeight = target.offsetHeight || Math.round(rect.height) || 140;
      setMeasuredHeight(Math.max(128, Math.round(localHeight)));
      setMetrics(`${Math.round(rect.width)} × ${Math.round(rect.height)} px · gap ${Math.round(gap)} px`);
    };

    updateMetrics();
    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(target);
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", updateMetrics, true);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", updateMetrics, true);
    };
  }, [enabled, target]);

  const handleNodePlacements = useCallback((placements: BfuxNodeAnchorPlacement[]) => {
    setGridState((current) => ({ ...current, placements }));
  }, []);

  const updateGridSpec = useCallback((spec: BfuxAnchorGridSpec) => {
    setGridState((current) => {
      const dimensionsChanged = current.spec.columns !== spec.columns || current.spec.rows !== spec.rows;
      return {
        spec,
        placements: dimensionsChanged
          ? remapBfuxAnchorPlacements(current.placements, current.spec, spec)
          : current.placements,
      };
    });
  }, []);

  const releaseSelectedNode = useCallback(() => {
    if (!selectedNodeId) return;
    setGridState((current) => ({
      ...current,
      placements: current.placements.filter((placement) => placement.nodeId !== selectedNodeId),
    }));
    setSelectedNodeId(null);
  }, [selectedNodeId]);

  const releaseAllNodes = useCallback(() => {
    setGridState((current) => ({ ...current, placements: [] }));
    setSelectedNodeId(null);
  }, []);

  const compileLayout = (): BfuxMachineLayoutSource => {
    const savedLayouts = readSaved();
    const savedGrids = readSavedGrid();
    const savedParts = readSavedParts();

    const projection = (key: ResolutionKey): BfuxProjectionLayout => {
      const base = cloneProjection(authoredProjection(key));
      const billboard = key === resolution
        ? { ...values }
        : { ...base.billboard, ...(savedLayouts[key] ?? {}) };
      const anchorGrid = key === resolution
        ? {
            spec: { ...gridState.spec },
            placements: gridState.placements.map((placement) => ({ ...placement })),
          }
        : hydratedGrid(savedGrids[key], base.anchorGrid);
      const parts = key === resolution
        ? placedParts.map((placement) => ({ ...placement }))
        : (savedParts[key] ?? base.placedParts).map((placement) => ({ ...placement }));

      return { billboard, anchorGrid, placedParts: parts };
    };

    return {
      schema: "bfux.machine-layout/v1",
      focus: projection("focus"),
      mid: projection("mid"),
    };
  };

  const compiledSource = () => renderBfuxAuthoredLayoutSource(compileLayout());

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(compiledSource());
      setCopyState("SOURCE COPIED");
      window.setTimeout(() => setCopyState("COPY SOURCE"), 1300);
    } catch {
      setCopyState("COPY FAILED");
    }
  };

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(compileLayout(), null, 2));
      setSpecState("SPEC COPIED");
      window.setTimeout(() => setSpecState("COPY SPEC"), 1300);
    } catch {
      setSpecState("COPY FAILED");
    }
  };

  const downloadSource = () => {
    const blob = new Blob([compiledSource()], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bfux-layout-authored.generated.ts";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const writeSource = async () => {
    setWriteState("WRITING…");
    try {
      const response = await fetch("/api/bfux/layout-studio", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          schema: "bfux.layout-source/v1",
          source: compiledSource(),
        }),
      });

      if (!response.ok) {
        setWriteState(response.status === 403 ? "LOCAL DEV ONLY" : "WRITE FAILED");
        window.setTimeout(() => setWriteState("WRITE REPO"), 1800);
        return;
      }

      setWriteState("SOURCE WRITTEN");
      window.setTimeout(() => setWriteState("WRITE REPO"), 1600);
    } catch {
      setWriteState("WRITE FAILED");
      window.setTimeout(() => setWriteState("WRITE REPO"), 1800);
    }
  };

  if (!enabled) return <BfuxAuthoredLayoutLayer />;

  function update<K extends keyof LayoutValues>(key: K, value: LayoutValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const resetEditState = () => {
    const authored = authoredEditState();
    writeSaved(authored.layouts);
    writeSavedGrid(authored.grids);
    writeJson(placementStorageKey, authored.parts);

    const projection = cloneProjection(authoredProjection(resolution));
    setValues(projection.billboard);
    setGridState(projection.anchorGrid);
    setPlacedParts(projection.placedParts);
    setSelectedNodeId(null);
    setCopyState("COPY SOURCE");
    setSpecState("COPY SPEC");
    setWriteState("WRITE REPO");
    setEditResetEpoch((current) => current + 1);
  };

  const exit = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("bfux");
    window.history.replaceState(null, "", url);
    setEnabled(false);
  };

  const heightValue = values.height ?? measuredHeight;

  return (
    <>
      {partsReady ? (
        <BfuxPlacementLayer
          key={`parts-${editResetEpoch}`}
          resolution={resolution}
          onPlacementsChange={setPlacedParts}
        />
      ) : null}
      <BfuxAnchorGridLayer
        key={`grid-${editResetEpoch}`}
        state={gridState}
        onPlacementsChange={handleNodePlacements}
        onSelectedNodeChange={setSelectedNodeId}
      />
      <aside className="bfux-layout-studio" aria-label="BFUX layout studio">
        <header>
          <div>
            <small>BFUX LAYOUT STUDIO · V0.6</small>
            <strong>Lab Machine layout</strong>
          </div>
          <button type="button" onClick={exit}>×</button>
        </header>

        <div className="bfux-layout-studio__status">
          <span>{resolution === "focus" ? "CORE" : "FULL"}</span>
          <code>{gridState.placements.length} cards · {placedParts.length} parts</code>
        </div>

        <BfuxAnchorGridPicker
          state={gridState}
          selectedNodeId={selectedNodeId}
          onSpecChange={updateGridSpec}
          onReleaseSelected={releaseSelectedNode}
          onReleaseAll={releaseAllNodes}
        />

        <div className="bfux-layout-studio__section-label">
          <span>BILLBOARD GEOMETRY</span>
          <small>{metrics}</small>
        </div>
        <RangeControl label="CARD WIDTH" value={values.width} min={20} max={60} step={0.5} unit="%" onChange={(value) => update("width", value)} />
        <RangeControl
          label="CARD HEIGHT"
          value={heightValue}
          min={128}
          max={420}
          step={1}
          unit="px"
          displayValue={values.height === null ? `AUTO · ${heightValue}px` : `${heightValue}px`}
          onChange={(value) => update("height", value)}
        />
        <div className="bfux-layout-studio__height-mode">
          <small>{values.height === null ? "HEIGHT FOLLOWS CONTENT" : "HEIGHT FIXED BY CONTRACT"}</small>
          <button type="button" data-active={values.height === null ? "true" : undefined} onClick={() => update("height", null)}>AUTO HEIGHT</button>
        </div>
        <RangeControl label="GAP ABOVE PRODUCTS" value={values.gapY} min={-20} max={40} step={1} unit="px" onChange={(value) => update("gapY", value)} />
        <RangeControl label="MAZE / COPY SPLIT" value={values.visualWidth} min={25} max={65} step={0.5} unit="%" onChange={(value) => update("visualWidth", value)} />
        <RangeControl label="MAZE SCALE" value={values.mazeScale} min={0.7} max={1.6} step={0.02} onChange={(value) => update("mazeScale", value)} />
        <RangeControl label="MAZE X" value={values.mazeLeft} min={-40} max={5} step={1} unit="%" onChange={(value) => update("mazeLeft", value)} />
        <RangeControl label="MAZE PAD X" value={values.visualPadX} min={0} max={1.2} step={0.02} unit="u" onChange={(value) => update("visualPadX", value)} />
        <RangeControl label="MAZE PAD Y" value={values.visualPadY} min={0} max={1.2} step={0.02} unit="u" onChange={(value) => update("visualPadY", value)} />
        <RangeControl label="COPY PAD X" value={values.copyPadX} min={0} max={1.4} step={0.02} unit="u" onChange={(value) => update("copyPadX", value)} />
        <RangeControl label="COPY PAD Y" value={values.copyPadY} min={0} max={1.4} step={0.02} unit="u" onChange={(value) => update("copyPadY", value)} />
        <RangeControl label="TITLE SCALE" value={values.titleScale} min={0.8} max={1.8} step={0.02} unit="u" onChange={(value) => update("titleScale", value)} />
        <RangeControl label="LOWER ROW HEIGHT" value={values.controlsHeight} min={1.4} max={3.2} step={0.05} unit="u" onChange={(value) => update("controlsHeight", value)} />

        <BfuxPartsBox placedCount={placedParts.length} />

        <section className="bfux-layout-studio__source">
          <header>
            <div>
              <span>EXECUTABLE SOURCE</span>
              <small>RUNTIME CONSUMES THIS FILE DIRECTLY</small>
            </div>
            <code>{bfuxAuthoredLayoutSourcePath}</code>
          </header>
          <div>
            <button type="button" onClick={downloadSource}>DOWNLOAD .TS</button>
            <button type="button" onClick={writeSource}>{writeState}</button>
            <button type="button" onClick={copySpec}>{specState}</button>
          </div>
          <p><b>WRITE REPO</b> is a fixed-path, development-only writer for a local <code>next dev</code> checkout. On a Vercel preview, use COPY SOURCE or DOWNLOAD .TS; both are exact replacements, not instructions for an agent.</p>
        </section>

        <footer>
          <button type="button" onClick={resetEditState} title="Restore Core and Full to the authored layout source">RESET ALL EDITS</button>
          <button type="button" onClick={copySource}>{copyState}</button>
        </footer>
        <p>RESET ALL EDITS restores billboard geometry, card anchors, grid settings, placed parts, and transient editor selection for both Core and Full from the authored source. The editor compiles those same systems back into one versioned source module.</p>
      </aside>
    </>
  );
}
