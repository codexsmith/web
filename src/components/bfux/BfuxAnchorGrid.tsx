"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  bfuxGridAxisFraction,
  bfuxGridFitSpan,
  bfuxGridMaxColumnSpan,
  bfuxGridMaxRowSpan,
  bfuxGridPanX,
  bfuxGridPanY,
  bfuxGridPitch,
  bfuxGridPlacementGeometry,
  bfuxGridRemapSpan,
  bfuxGridSpan,
  type BfuxGridCorner,
} from "./bfux-grid-geometry";
import "./bfux-anchor-grid.css";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const nodeTransferType = "application/x-bfux-node";
const layoutTuningEvent = "bfux-layout-tuning";
const spanAdjustEvent = "bfux-grid-span-adjust";
const maxPickerColumns = 12;
const maxPickerRows = 8;

export type BfuxAnchorGridResolution = "focus" | "mid";
export type BfuxAnchorCorner = BfuxGridCorner;

export type BfuxAnchorGridSpec = {
  columns: number;
  rows: number;
  visible: boolean;
};

export type BfuxNodeAnchorPlacement = {
  nodeId: string;
  column: number;
  row: number;
  corner: BfuxAnchorCorner;
  columnSpan?: number;
  rowSpan?: number;
};

export type BfuxAnchorGridState = {
  spec: BfuxAnchorGridSpec;
  placements: BfuxNodeAnchorPlacement[];
};

export const defaultBfuxAnchorGridState: BfuxAnchorGridState = {
  spec: { columns: 8, rows: 6, visible: true },
  placements: [],
};

type DragState = {
  nodeId: string;
  columnSpan: number;
  rowSpan: number;
  grabRatioX: number;
  grabRatioY: number;
};

type SnapCandidate = Required<Pick<BfuxNodeAnchorPlacement, "nodeId" | "column" | "row" | "corner" | "columnSpan" | "rowSpan">> & {
  x: number;
  y: number;
  width: number;
  height: number;
};

function clampInteger(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function cornerTranslation(corner: BfuxAnchorCorner) {
  return {
    x: corner === "ne" || corner === "se" ? "-100%" : "0%",
    y: corner === "sw" || corner === "se" ? "-100%" : "0%",
  };
}

function elementScale(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
  const scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : scaleX;
  return { rect, scaleX: scaleX || 1, scaleY: scaleY || 1 };
}

function nodeLocalSize(node: HTMLElement, workfield: HTMLElement) {
  const workfieldScale = elementScale(workfield);
  const nodeRect = node.getBoundingClientRect();
  return {
    width: nodeRect.width / workfieldScale.scaleX,
    height: nodeRect.height / workfieldScale.scaleY,
  };
}

function candidateForPointer(workfield: HTMLElement, event: DragEvent, spec: BfuxAnchorGridSpec, drag: DragState) {
  const { rect, scaleX, scaleY } = elementScale(workfield);
  const workfieldWidth = workfield.offsetWidth || rect.width;
  const workfieldHeight = workfield.offsetHeight || rect.height;
  const pointerX = (event.clientX - rect.left) / scaleX;
  const pointerY = (event.clientY - rect.top) / scaleY;
  const pitchX = bfuxGridPitch(workfieldWidth, spec.columns);
  const pitchY = bfuxGridPitch(workfieldHeight, spec.rows);
  const width = pitchX * drag.columnSpan;
  const height = pitchY * drag.rowSpan;
  const corners: BfuxAnchorCorner[] = ["nw", "ne", "sw", "se"];
  let best: { candidate: SnapCandidate; distance: number } | null = null;

  for (let row = 0; row < spec.rows; row += 1) {
    const y = bfuxGridAxisFraction(row, spec.rows) * workfieldHeight;
    for (let column = 0; column < spec.columns; column += 1) {
      const x = bfuxGridAxisFraction(column, spec.columns) * workfieldWidth;
      for (const corner of corners) {
        const placement = { column, row, corner };
        if (drag.columnSpan > bfuxGridMaxColumnSpan(placement, spec)) continue;
        if (drag.rowSpan > bfuxGridMaxRowSpan(placement, spec)) continue;

        const rightAnchored = corner === "ne" || corner === "se";
        const bottomAnchored = corner === "sw" || corner === "se";
        const left = x - (rightAnchored ? width : 0);
        const top = y - (bottomAnchored ? height : 0);
        const right = left + width;
        const bottom = top + height;

        if (left < -0.5 || top < -0.5 || right > workfieldWidth + 0.5 || bottom > workfieldHeight + 0.5) continue;

        const expectedPointerX = left + width * drag.grabRatioX;
        const expectedPointerY = top + height * drag.grabRatioY;
        const distance = Math.hypot(pointerX - expectedPointerX, pointerY - expectedPointerY);
        if (best && distance >= best.distance) continue;

        best = {
          distance,
          candidate: {
            nodeId: drag.nodeId,
            column,
            row,
            corner,
            columnSpan: drag.columnSpan,
            rowSpan: drag.rowSpan,
            x,
            y,
            width,
            height,
          },
        };
      }
    }
  }

  return best?.candidate ?? null;
}

function pointerInsideWorkfield(workfield: HTMLElement, event: DragEvent) {
  const rect = workfield.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

export function remapBfuxAnchorPlacements(
  placements: BfuxNodeAnchorPlacement[],
  previous: BfuxAnchorGridSpec,
  next: BfuxAnchorGridSpec,
) {
  return placements.map((placement) => {
    const x = bfuxGridAxisFraction(placement.column, previous.columns);
    const y = bfuxGridAxisFraction(placement.row, previous.rows);
    const nextPlacement: BfuxNodeAnchorPlacement = {
      ...placement,
      column: next.columns <= 1 ? 0 : clampInteger(x * (next.columns - 1), 0, next.columns - 1),
      row: next.rows <= 1 ? 0 : clampInteger(y * (next.rows - 1), 0, next.rows - 1),
      columnSpan: bfuxGridRemapSpan(placement.columnSpan, previous.columns, next.columns),
      rowSpan: bfuxGridRemapSpan(placement.rowSpan, previous.rows, next.rows),
    };

    if (nextPlacement.columnSpan != null) {
      const span = bfuxGridSpan(nextPlacement.columnSpan);
      if (nextPlacement.corner === "ne" || nextPlacement.corner === "se") {
        nextPlacement.column = Math.max(nextPlacement.column, span);
      } else {
        nextPlacement.column = Math.min(nextPlacement.column, Math.max(0, next.columns - 1 - span));
      }
      nextPlacement.columnSpan = Math.min(span, Math.max(1, bfuxGridMaxColumnSpan(nextPlacement, next)));
    }

    if (nextPlacement.rowSpan != null) {
      const span = bfuxGridSpan(nextPlacement.rowSpan);
      if (nextPlacement.corner === "sw" || nextPlacement.corner === "se") {
        nextPlacement.row = Math.max(nextPlacement.row, span);
      } else {
        nextPlacement.row = Math.min(nextPlacement.row, Math.max(0, next.rows - 1 - span));
      }
      nextPlacement.rowSpan = Math.min(span, Math.max(1, bfuxGridMaxRowSpan(nextPlacement, next)));
    }

    return nextPlacement;
  });
}

export function BfuxAnchorGridPicker({
  state,
  selectedNodeId,
  onSpecChange,
  onResizeSelected,
  onReleaseSelected,
  onReleaseAll,
}: {
  state: BfuxAnchorGridState;
  selectedNodeId: string | null;
  onSpecChange: (spec: BfuxAnchorGridSpec) => void;
  onResizeSelected?: (axis: "column" | "row", delta: number) => void;
  onReleaseSelected: () => void;
  onReleaseAll: () => void;
}) {
  const [hover, setHover] = useState<{ columns: number; rows: number } | null>(null);
  const activeColumns = hover?.columns ?? state.spec.columns;
  const activeRows = hover?.rows ?? state.spec.rows;
  const selectedPlacement = state.placements.find((placement) => placement.nodeId === selectedNodeId) ?? null;
  const selectedColumnSpan = selectedPlacement ? bfuxGridSpan(selectedPlacement.columnSpan) : 0;
  const selectedRowSpan = selectedPlacement ? bfuxGridSpan(selectedPlacement.rowSpan) : 0;
  const selectedMaxColumnSpan = selectedPlacement ? bfuxGridMaxColumnSpan(selectedPlacement, state.spec) : 0;
  const selectedMaxRowSpan = selectedPlacement ? bfuxGridMaxRowSpan(selectedPlacement, state.spec) : 0;

  const adjustSelected = (axis: "column" | "row", delta: number) => {
    if (!selectedNodeId) return;
    if (onResizeSelected) {
      onResizeSelected(axis, delta);
      return;
    }
    window.dispatchEvent(new CustomEvent(spanAdjustEvent, {
      detail: { nodeId: selectedNodeId, axis, delta },
    }));
  };

  return (
    <details className="bfux-anchor-grid-picker" open>
      <summary>
        <span>ANCHOR GRID</span>
        <small>CORNERS + CARD SPANS SHARE THE SAME POINT LATTICE</small>
      </summary>

      <div className="bfux-anchor-grid-picker__body">
        <header>
          <div>
            <small>PICK YOUR GRID</small>
            <strong>{activeColumns} × {activeRows} POINTS</strong>
          </div>
          <button
            type="button"
            data-active={state.spec.visible ? "true" : undefined}
            onClick={() => onSpecChange({ ...state.spec, visible: !state.spec.visible })}
          >
            {state.spec.visible ? "GRID ON" : "GRID OFF"}
          </button>
        </header>

        <div
          className="bfux-anchor-grid-picker__matrix"
          onMouseLeave={() => setHover(null)}
          aria-label="Choose anchor grid dimensions"
        >
          {Array.from({ length: maxPickerRows }, (_, rowIndex) => (
            Array.from({ length: maxPickerColumns }, (_, columnIndex) => {
              const columns = columnIndex + 1;
              const rows = rowIndex + 1;
              const active = columns <= activeColumns && rows <= activeRows;
              const selected = columns === state.spec.columns && rows === state.spec.rows;
              return (
                <button
                  key={`${columns}x${rows}`}
                  type="button"
                  data-active={active ? "true" : undefined}
                  data-selected={selected ? "true" : undefined}
                  aria-label={`${columns} by ${rows} anchor points`}
                  title={`${columns} × ${rows} anchor points`}
                  onMouseEnter={() => setHover({ columns, rows })}
                  onFocus={() => setHover({ columns, rows })}
                  onBlur={() => setHover(null)}
                  onClick={() => onSpecChange({ ...state.spec, columns, rows })}
                >
                  <i />
                </button>
              );
            })
          ))}
        </div>

        <div className="bfux-anchor-grid-picker__explain">
          <span><b>↖ ↗ ↙ ↘</b> a corner hangs from a point; width + height occupy whole grid tracks.</span>
          <span>Dropped cards therefore share the same location and size grammar instead of mixing grid anchors with unrelated CSS dimensions.</span>
        </div>

        <div className="bfux-anchor-grid-picker__selection">
          <div>
            <small>SELECTED CARD</small>
            <code>{selectedNodeId ?? "NONE"}</code>
          </div>
          <button type="button" disabled={!selectedNodeId} onClick={onReleaseSelected}>RELEASE</button>
          <button type="button" disabled={state.placements.length === 0} onClick={onReleaseAll}>RELEASE ALL</button>
        </div>

        <div className="bfux-anchor-grid-picker__span" data-active={selectedPlacement ? "true" : undefined}>
          <div>
            <small>GRID SPAN</small>
            <code>{selectedPlacement ? `${selectedColumnSpan} W × ${selectedRowSpan} H` : "DROP A CARD TO SIZE IT"}</code>
          </div>
          <div className="bfux-anchor-grid-picker__span-controls">
            <button type="button" disabled={!selectedPlacement || selectedColumnSpan <= 1} onClick={() => adjustSelected("column", -1)}>W−</button>
            <button type="button" disabled={!selectedPlacement || selectedColumnSpan >= selectedMaxColumnSpan} onClick={() => adjustSelected("column", 1)}>W+</button>
            <button type="button" disabled={!selectedPlacement || selectedRowSpan <= 1} onClick={() => adjustSelected("row", -1)}>H−</button>
            <button type="button" disabled={!selectedPlacement || selectedRowSpan >= selectedMaxRowSpan} onClick={() => adjustSelected("row", 1)}>H+</button>
          </div>
        </div>
      </div>
    </details>
  );
}

export function BfuxAnchorGridLayer({
  state,
  onPlacementsChange,
  onSelectedNodeChange,
}: {
  state: BfuxAnchorGridState;
  onPlacementsChange: (placements: BfuxNodeAnchorPlacement[]) => void;
  onSelectedNodeChange?: (nodeId: string | null) => void;
}) {
  const [apparatus, setApparatus] = useState<HTMLElement | null>(null);
  const [workfield, setWorkfield] = useState<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [candidate, setCandidate] = useState<SnapCandidate | null>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    let frame = 0;
    const findApparatus = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setApparatus((current) => current === next ? current : next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(findApparatus);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-skin", "data-resolution"],
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setWorkfield(null);
  }, [apparatus]);

  useEffect(() => {
    const adjust = (event: Event) => {
      const detail = (event as CustomEvent<{ nodeId?: string; axis?: "column" | "row"; delta?: number }>).detail;
      if (!detail?.nodeId || !detail.axis || !Number.isFinite(detail.delta)) return;
      const delta = Math.sign(detail.delta ?? 0);
      if (!delta) return;

      const placements = state.placements.map((placement) => {
        if (placement.nodeId !== detail.nodeId) return placement;
        if (detail.axis === "column") {
          const max = bfuxGridMaxColumnSpan(placement, state.spec);
          return { ...placement, columnSpan: clampInteger(bfuxGridSpan(placement.columnSpan) + delta, 1, Math.max(1, max)) };
        }
        const max = bfuxGridMaxRowSpan(placement, state.spec);
        return { ...placement, rowSpan: clampInteger(bfuxGridSpan(placement.rowSpan) + delta, 1, Math.max(1, max)) };
      });
      onPlacementsChange(placements);
    };

    window.addEventListener(spanAdjustEvent, adjust);
    return () => window.removeEventListener(spanAdjustEvent, adjust);
  }, [onPlacementsChange, state]);

  useEffect(() => {
    if (!apparatus || !workfield) return;
    let frame = 0;

    workfield.dataset.bfuxGridEditing = "true";
    workfield.dataset.bfuxGridVisible = state.spec.visible ? "true" : "false";
    workfield.dataset.bfuxGridCoordinateSpace = "apparatus-workfield";
    apparatus.dataset.bfuxGridEditing = "true";

    const applyPlacementStyles = () => {
      const placementByNode = new Map(state.placements.map((placement) => [placement.nodeId, placement]));
      const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector));

      for (const node of nodes) {
        node.draggable = node.dataset.expanded !== "true";
        node.dataset.bfuxGridEditable = "true";
        const placement = placementByNode.get(node.dataset.nodeId ?? "");

        if (!placement) {
          delete node.dataset.bfuxGridPlaced;
          delete node.dataset.bfuxGridCorner;
          delete node.dataset.bfuxGridSpan;
          node.style.removeProperty("--bfux-node-anchor-x");
          node.style.removeProperty("--bfux-node-anchor-y");
          node.style.removeProperty("--bfux-node-anchor-tx");
          node.style.removeProperty("--bfux-node-anchor-ty");
          node.style.removeProperty("--bfux-node-grid-width");
          node.style.removeProperty("--bfux-node-grid-height");
          continue;
        }

        const size = nodeLocalSize(node, workfield);
        const geometry = bfuxGridPlacementGeometry(apparatus, state.spec, placement, size);
        const translation = cornerTranslation(placement.corner);
        node.dataset.bfuxGridPlaced = "true";
        node.dataset.bfuxGridCorner = placement.corner;
        node.dataset.bfuxGridSpan = `${geometry.columnSpan}x${geometry.rowSpan}`;
        node.style.setProperty("--bfux-node-anchor-x", `${geometry.anchorX}px`);
        node.style.setProperty("--bfux-node-anchor-y", `${geometry.anchorY}px`);
        node.style.setProperty("--bfux-node-anchor-tx", translation.x);
        node.style.setProperty("--bfux-node-anchor-ty", translation.y);
        node.style.setProperty("--bfux-node-grid-width", `${geometry.width}px`);
        node.style.setProperty("--bfux-node-grid-height", `${geometry.height}px`);

        if (node.classList.contains("bf-machine-node--billboard")) {
          node.style.removeProperty("left");
          node.style.removeProperty("top");
        }
      }

      apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));
    };

    const scheduleApply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyPlacementStyles);
    };

    applyPlacementStyles();
    const resizeObserver = new ResizeObserver(scheduleApply);
    resizeObserver.observe(workfield);
    resizeObserver.observe(apparatus);
    window.addEventListener("resize", scheduleApply);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleApply);
      delete workfield.dataset.bfuxGridEditing;
      delete workfield.dataset.bfuxGridVisible;
      delete workfield.dataset.bfuxGridCoordinateSpace;
      delete apparatus.dataset.bfuxGridEditing;
      for (const node of Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector))) {
        node.removeAttribute("draggable");
        delete node.dataset.bfuxGridEditable;
        delete node.dataset.bfuxGridPlaced;
        delete node.dataset.bfuxGridCorner;
        delete node.dataset.bfuxGridSpan;
        node.style.removeProperty("--bfux-node-anchor-x");
        node.style.removeProperty("--bfux-node-anchor-y");
        node.style.removeProperty("--bfux-node-anchor-tx");
        node.style.removeProperty("--bfux-node-anchor-ty");
        node.style.removeProperty("--bfux-node-grid-width");
        node.style.removeProperty("--bfux-node-grid-height");
      }
      apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));
    };
  }, [apparatus, state, workfield]);

  useEffect(() => {
    if (!apparatus || !workfield) return;

    const pointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const node = target.closest<HTMLElement>(nodeSelector);
      if (!node || !apparatus.contains(node) || node.dataset.expanded === "true") return;
      event.stopPropagation();
      onSelectedNodeChange?.(node.dataset.nodeId ?? null);
    };

    const click = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const node = target.closest<HTMLElement>(nodeSelector);
      if (!node || !apparatus.contains(node) || node.dataset.expanded === "true") return;
      event.preventDefault();
      event.stopPropagation();
      onSelectedNodeChange?.(node.dataset.nodeId ?? null);
    };

    const dragStart = (event: DragEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const node = target.closest<HTMLElement>(nodeSelector);
      if (!node || !apparatus.contains(node) || node.dataset.expanded === "true") return;
      const nodeId = node.dataset.nodeId;
      if (!nodeId) return;

      const size = nodeLocalSize(node, workfield);
      const nodeRect = node.getBoundingClientRect();
      const existing = state.placements.find((placement) => placement.nodeId === nodeId);
      const pitchX = bfuxGridPitch(workfield.offsetWidth, state.spec.columns);
      const pitchY = bfuxGridPitch(workfield.offsetHeight, state.spec.rows);
      const columnSpan = existing?.columnSpan == null
        ? bfuxGridFitSpan(size.width, pitchX, Math.max(1, state.spec.columns - 1))
        : bfuxGridSpan(existing.columnSpan);
      const rowSpan = existing?.rowSpan == null
        ? bfuxGridFitSpan(size.height, pitchY, Math.max(1, state.spec.rows - 1))
        : bfuxGridSpan(existing.rowSpan);
      const grabRatioX = nodeRect.width > 0 ? clamp01((event.clientX - nodeRect.left) / nodeRect.width) : 0.5;
      const grabRatioY = nodeRect.height > 0 ? clamp01((event.clientY - nodeRect.top) / nodeRect.height) : 0.5;
      const nextDrag = { nodeId, columnSpan, rowSpan, grabRatioX, grabRatioY };

      event.stopPropagation();
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(nodeTransferType, JSON.stringify({ schema: "bfux.node/v1", nodeId }));
      event.dataTransfer.setData("text/plain", nodeId);
      node.dataset.bfuxGridDragging = "true";
      dragRef.current = nextDrag;
      setDrag(nextDrag);
      setCandidate(null);
      onSelectedNodeChange?.(nodeId);
    };

    const dragOver = (event: DragEvent) => {
      const activeDrag = dragRef.current;
      if (!activeDrag || !Array.from(event.dataTransfer.types).includes(nodeTransferType)) return;
      if (!pointerInsideWorkfield(workfield, event)) {
        setCandidate(null);
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "move";
      setCandidate(candidateForPointer(workfield, event, state.spec, activeDrag));
    };

    const drop = (event: DragEvent) => {
      const activeDrag = dragRef.current;
      if (!activeDrag || !Array.from(event.dataTransfer.types).includes(nodeTransferType)) return;
      if (!pointerInsideWorkfield(workfield, event)) return;
      event.preventDefault();
      event.stopPropagation();
      const next = candidateForPointer(workfield, event, state.spec, activeDrag);
      if (next) {
        onPlacementsChange([
          ...state.placements.filter((placement) => placement.nodeId !== activeDrag.nodeId),
          {
            nodeId: activeDrag.nodeId,
            column: next.column,
            row: next.row,
            corner: next.corner,
            columnSpan: next.columnSpan,
            rowSpan: next.rowSpan,
          },
        ]);
      }
      const node = apparatus.querySelector<HTMLElement>(`${nodeSelector}[data-node-id="${CSS.escape(activeDrag.nodeId)}"]`);
      if (node) delete node.dataset.bfuxGridDragging;
      dragRef.current = null;
      setDrag(null);
      setCandidate(null);
    };

    const dragEnd = () => {
      const activeDrag = dragRef.current;
      if (activeDrag) {
        const node = apparatus.querySelector<HTMLElement>(`${nodeSelector}[data-node-id="${CSS.escape(activeDrag.nodeId)}"]`);
        if (node) delete node.dataset.bfuxGridDragging;
      }
      dragRef.current = null;
      setDrag(null);
      setCandidate(null);
    };

    apparatus.addEventListener("pointerdown", pointerDown, true);
    apparatus.addEventListener("click", click, true);
    apparatus.addEventListener("dragstart", dragStart, true);
    window.addEventListener("dragover", dragOver, true);
    window.addEventListener("drop", drop, true);
    window.addEventListener("dragend", dragEnd);

    return () => {
      apparatus.removeEventListener("pointerdown", pointerDown, true);
      apparatus.removeEventListener("click", click, true);
      apparatus.removeEventListener("dragstart", dragStart, true);
      window.removeEventListener("dragover", dragOver, true);
      window.removeEventListener("drop", drop, true);
      window.removeEventListener("dragend", dragEnd);
      dragRef.current = null;
    };
  }, [apparatus, onPlacementsChange, onSelectedNodeChange, state.placements, state.spec, workfield]);

  const points = useMemo(() => {
    const next: Array<{ column: number; row: number; x: number; y: number }> = [];
    for (let row = 0; row < state.spec.rows; row += 1) {
      for (let column = 0; column < state.spec.columns; column += 1) {
        next.push({ column, row, x: bfuxGridAxisFraction(column, state.spec.columns), y: bfuxGridAxisFraction(row, state.spec.rows) });
      }
    }
    return next;
  }, [state.spec.columns, state.spec.rows]);

  if (!apparatus) return null;

  const ghostStyle = candidate ? {
    left: `${candidate.x}px`,
    top: `${candidate.y}px`,
    width: `${candidate.width}px`,
    height: `${candidate.height}px`,
    transform: `translate(${cornerTranslation(candidate.corner).x}, ${cornerTranslation(candidate.corner).y})`,
  } as CSSProperties : undefined;

  const workfieldStyle = {
    "--bfux-grid-pan-x": `${bfuxGridPanX}px`,
    "--bfux-grid-pan-y": `${bfuxGridPanY}px`,
  } as CSSProperties;

  return createPortal(
    <div
      ref={setWorkfield}
      className="bfux-anchor-grid-overlay"
      data-visible={state.spec.visible || drag ? "true" : undefined}
      data-dragging={drag ? "true" : undefined}
      data-coordinate-space="apparatus-workfield"
      style={workfieldStyle}
      aria-hidden="true"
    >
      {Array.from({ length: state.spec.columns }, (_, column) => (
        <span
          key={`column:${column}`}
          data-axis="column"
          style={{ left: `${bfuxGridAxisFraction(column, state.spec.columns) * 100}%` }}
        />
      ))}
      {Array.from({ length: state.spec.rows }, (_, row) => (
        <span
          key={`row:${row}`}
          data-axis="row"
          style={{ top: `${bfuxGridAxisFraction(row, state.spec.rows) * 100}%` }}
        />
      ))}
      {points.map((point) => {
        const active = candidate?.column === point.column && candidate?.row === point.row;
        return (
          <i
            key={`${point.column}:${point.row}`}
            data-active={active ? "true" : undefined}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          />
        );
      })}
      {candidate && drag ? (
        <div className="bfux-anchor-grid-ghost" style={ghostStyle} data-corner={candidate.corner}>
          <span>{drag.nodeId}</span>
          <b>{candidate.corner.toUpperCase()} · {candidate.column + 1},{candidate.row + 1} · {candidate.columnSpan}×{candidate.rowSpan}</b>
        </div>
      ) : null}
    </div>,
    apparatus,
    "bfux-anchor-grid",
  );
}
