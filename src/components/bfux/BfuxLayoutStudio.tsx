"use client";

import { useEffect, useMemo, useState } from "react";
import { BfuxPartsBox } from "./BfuxPartsBox";
import "./bfux-layout-studio.css";

const targetSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const machineSelector = '.bf-machine[data-skin="physical"]';
const storageKey = "bfl_bfux_layout_studio_billboard_v1";
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
      setMeasuredHeight(Math.max(80, Math.round(localHeight)));
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

  const exported = useMemo(() => JSON.stringify({
    component: "representation-lab-billboard",
    resolution,
    values,
  }, null, 2), [resolution, values]);

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
    <aside className="bfux-layout-studio" aria-label="BFUX layout studio">
      <header>
        <div>
          <small>BFUX LAYOUT STUDIO · V0.2</small>
          <strong>Representation Lab billboard</strong>
        </div>
        <button type="button" onClick={exit}>×</button>
      </header>

      <div className="bfux-layout-studio__status">
        <span>{resolution === "focus" ? "CORE" : "FULL"}</span>
        <code>{metrics}</code>
      </div>

      <RangeControl label="CARD WIDTH" value={values.width} min={20} max={60} step={0.5} unit="%" onChange={(value) => update("width", value)} />
      <RangeControl
        label="CARD HEIGHT"
        value={heightValue}
        min={80}
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

      <BfuxPartsBox />

      <footer>
        <button type="button" onClick={reset}>RESET {resolution === "focus" ? "CORE" : "FULL"}</button>
        <button type="button" onClick={copy}>{copyState}</button>
      </footer>
      <p>Changes are live and saved locally per view. Copy the config when the card looks right; the Parts Box emits stable BFUX part payloads for the coming placement canvas.</p>
    </aside>
  );
}
