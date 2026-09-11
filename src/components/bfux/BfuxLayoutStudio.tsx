"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BfuxAnchorGridLayer,
  BfuxAnchorGridPicker,
  defaultBfuxAnchorGridState,
  remapBfuxAnchorPlacements,
  type BfuxAnchorGridSpec,
  type BfuxAnchorGridState,
  type BfuxNodeAnchorPlacement,
} from "./BfuxAnchorGrid";
import { BfuxPartsBox } from "./BfuxPartsBox";
import { BfuxPlacementLayer, type BfuxPlacedPart } from "./BfuxPlacementLayer";
import "./bfux-layout-studio.css";

const targetSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const machineSelector = '.bf-machine[data-skin="physical"]';
const storageKey = "bfl_bfux_layout_studio_billboard_v1";
const gridStorageKey = "bfl_bfux_anchor_grid_v1";
const tuningEvent = "bfux-layout-tuning";

type ResolutionKey = "focus" | "mid";

type LayoutValues = {
  width: number;
  height: number | null;
  gapY: number;
  visualWidth: number;
  mazeScale: number;
  mazeLeft: number;
  visualPadX: number;
  visualPadY: number;
  copyPadX: number;
  copyPadY: number;
  titleScale: number;
  controlsHeight: number;
};

type SavedLayout = Partial<Record<ResolutionKey, Partial<LayoutValues>>>;
type SavedAnchorGrid = Partial<Record<ResolutionKey, Partial<BfuxAnchorGridState>>>;

const defaults: Record<ResolutionKey, LayoutValues> = {
  focus: {
    width: 35,
    height: null,
    gapY: 0,
    visualWidth: 44,
    mazeScale: 1,
    mazeLeft: -18,
    visualPadX: 0.56,
    visualPadY: 0.42,
    copyPadX: 0.72,
    copyPadY: 0.56,
    titleScale: 1.38,
    controlsHeight: 2.2,
  },
  mid: {
    width: 35,
    height: null,
    gapY: 0,
    visualWidth: 44,
    mazeScale: 1,
    mazeLeft: -18,
    visualPadX: 0.56,
    visualPadY: 0.42,
    copyPadX: 0.72,
    copyPadY: 0.56,
    titleScale: 1.32,
    controlsHeight: 2.2,
  },
};

function readSaved(): SavedLayout {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as SavedLayout) : {};
  } catch {
    return {};
  }
}

function writeSaved(saved: SavedLayout) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch {
    // The editor still works for the current session when storage is blocked.
  }
}

function readSavedGrid(): SavedAnchorGrid {
  try {
    const raw = window.localStorage.getItem(gridStorageKey);
    return raw ? (JSON.parse(raw) as SavedAnchorGrid) : {};
  } catch {
    return {};
  }
}

function writeSavedGrid(saved: SavedAnchorGrid) {
  try {
    window.localStorage.setItem(gridStorageKey, JSON.stringify(saved));
  } catch {
    // Grid editing remains live for the current session when storage is blocked.
  }
}

function hydratedGrid(saved: SavedAnchorGrid[ResolutionKey]): BfuxAnchorGridState {
  return {
    spec: {
      ...defaultBfuxAnchorGridState.spec,
      ...(saved?.spec ?? {}),
    },
    placements: Array.isArray(saved?.placements) ? saved.placements : [],
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

export function BfuxLayoutStudio() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [resolution, setResolution] = useState<ResolutionKey>("focus");
  const [values, setValues] = useState<LayoutValues>(defaults.focus);
  const [placedParts, setPlacedParts] = useState<BfuxPlacedPart[]>([]);
  const [gridState, setGridState] = useState<BfuxAnchorGridState>(defaultBfuxAnchorGridState);
  const [gridHydratedFor, setGridHydratedFor] = useState<ResolutionKey | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState(140);
  const [metrics, setMetrics] = useState("waiting for billboard");
  const [copyState, setCopyState] = useState("COPY CONFIG");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("bfux") === "edit");
  }, []);

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
    setValues({ ...defaults[resolution], ...(saved[resolution] ?? {}) });
  }, [enabled, resolution]);

  useEffect(() => {
    if (!enabled) return;
    const saved = readSavedGrid();
    setGridState(hydratedGrid(saved[resolution]));
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

  const exported = useMemo(() => JSON.stringify({
    component: "lab-machine-layout",
    resolution,
    billboard: values,
    anchorGrid: gridState,
    placedParts,
  }, null, 2), [gridState, placedParts, resolution, values]);

  if (!enabled) return null;

  function update<K extends keyof LayoutValues>(key: K, value: LayoutValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const reset = () => {
    const saved = readSaved();
    delete saved[resolution];
    writeSaved(saved);
    setValues(defaults[resolution]);
  };

  const exit = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("bfux");
    window.history.replaceState(null, "", url);
    setEnabled(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exported);
      setCopyState("COPIED");
      window.setTimeout(() => setCopyState("COPY CONFIG"), 1200);
    } catch {
      setCopyState("COPY FAILED");
    }
  };

  const heightValue = values.height ?? measuredHeight;

  return (
    <>
      <BfuxPlacementLayer resolution={resolution} onPlacementsChange={setPlacedParts} />
      <BfuxAnchorGridLayer
        state={gridState}
        onPlacementsChange={handleNodePlacements}
        onSelectedNodeChange={setSelectedNodeId}
      />
      <aside className="bfux-layout-studio" aria-label="BFUX layout studio">
        <header>
          <div>
            <small>BFUX LAYOUT STUDIO · V0.4</small>
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

        <footer>
          <button type="button" onClick={reset}>RESET BILLBOARD</button>
          <button type="button" onClick={copy}>{copyState}</button>
        </footer>
        <p>Pick an anchor lattice like an Excel table, then drag a machine card. The nearest valid corner snaps to a shared point. Multiple cards may hang from opposite sides of the same point or share a row/column without hand-tuned offsets. RELEASE returns a card to its authored CSS position. Parts remain freely placeable on the same apparatus.</p>
      </aside>
    </>
  );
}
