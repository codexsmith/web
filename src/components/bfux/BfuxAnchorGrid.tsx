"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import "./bfux-anchor-grid.css";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const nodeTransferType = "application/x-bfux-node";
const layoutTuningEvent = "bfux-layout-tuning";
const maxPickerColumns = 12;
const maxPickerRows = 8;

export type BfuxAnchorGridResolution = "focus" | "mid";
export type BfuxAnchorCorner = "nw" | "ne" | "sw" | "se";

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
  width: number;
  height: number;
  grabX: number;
  grabY: number;
};

type SnapCandidate = BfuxNodeAnchorPlacement & {
  x: number;
  y: number;
  width: number;
  height: number;
};

function clampInteger(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function axisFraction(index: number, count: number) {
  return count <= 1 ? 0.5 : index / (count - 1);
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
    scaleX: workfieldScale.scaleX,
    scaleY: workfieldScale.scaleY,
  };
}

function candidateForPointer(workfield: HTMLElement, event: DragEvent, spec: BfuxAnchorGridSpec, drag: DragState) {
  const { rect, scaleX, scaleY } = elementScale(workfield);
  const workfieldWidth = workfield.offsetWidth || rect.width;
  const workfieldHeight = workfield.offsetHeight || rect.height;
  const pointerX = (event.clientX - rect.left) / scaleX;
  const pointerY = (event.clientY - rect.top) / scaleY;
  const corners: BfuxAnchorCorner[] = ["nw", "ne", "sw", "se"];
  let best: { candidate: SnapCandidate; distance: number } | null = null;

  for (let row = 0; row < spec.rows; row += 1) {
    const y = axisFraction(row, spec.rows) * workfieldHeight;
    for (let column = 0; column < spec.columns; column += 1) {
      const x = axisFraction(column, spec.columns) * workfieldWidth;
      for (const corner of corners) {
        const rightAnchored = corner === "ne" || corner === "se";
        const bottomAnchored = corner === "sw" || corner === "se";
        const left = x - (rightAnchored ? drag.width : 0);
        const top = y - (bottomAnchored ? drag.height : 0);
        const right = left + drag.width;
        const bottom = top + drag.height;

        if (left < -0.5 || top < -0.5 || right > workfieldWidth + 0.5 || bottom > workfieldHeight + 0.5) continue;

        const expectedPointerX = left + drag.grabX;
        const expectedPointerY = top + drag.grabY;
        const distance = Math.hypot(pointerX - expectedPointerX, pointerY - expectedPointerY);
        if (best && distance >= best.distance) continue;

        best = {
          distance,
          candidate: {
            nodeId: drag.nodeId,
            column,
            row,
            corner,
            x,
            y,
            width: drag.width,
            height: drag.height,
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

function anchorPointInApparatus(
  workfield: HTMLElement,
  apparatus: HTMLElement,
  placement: BfuxNodeAnchorPlacement,
  spec: BfuxAnchorGridSpec,
) {
  const workfieldRect = workfield.getBoundingClientRect();
  const apparatusScale = elementScale(apparatus);
  const clientX = workfieldRect.left + axisFraction(placement.column, spec.columns) * workfieldRect.width;
  const clientY = workfieldRect.top + axisFraction(placement.row, spec.rows) * workfieldRect.height;
  return {
    x: (clientX - apparatusScale.rect.left) / apparatusScale.scaleX,
    y: (clientY - apparatusScale.rect.top) / apparatusScale.scaleY,
  };
}

export function remapBfuxAnchorPlacements(
  placements: BfuxNodeAnchorPlacement[],
  previous: BfuxAnchorGridSpec,
  next: BfuxAnchorGridSpec,
) {
  return placements.map((placement) => {
    const x = axisFraction(placement.column, previous.columns);
    const y = axisFraction(placement.row, previous.rows);
    return {
      ...placement,
      column: next.columns <= 1 ? 0 : clampInteger(x * (next.columns - 1), 0, next.columns - 1),
      row: next.rows <= 1 ? 0 : clampInteger(y * (next.rows - 1), 0, next.rows - 1),
    };
  });
}

export function BfuxAnchorGridPicker({
  state,
  selectedNodeId,
  onSpecChange,
  onReleaseSelected,
  onReleaseAll,
}: {
  state: BfuxAnchorGridState;
  selectedNodeId: string | null;
  onSpecChange: (spec: BfuxAnchorGridSpec) => void;
  onReleaseSelected: () => void;
  onReleaseAll: () => void;
}) {
  const [hover, setHover] = useState<{ columns: number; rows: number } | null>(null);
  const activeColumns = hover?.columns ?? state.spec.columns;
  const activeRows = hover?.rows ?? state.spec.rows;

  return (
    <details className="bfux-anchor-grid-picker" open>
      <summary>
        <span>ANCHOR GRID</span>
        <small>CORNERS HANG FROM SHARED POINTS</small>
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
          <span><b>↖ ↗ ↙ ↘</b> nearest card corner snaps to a point</span>
          <span>Cards may share a point from opposite sides or share a row/column without inventing offsets.</span>
        </div>

        <div className="bfux-anchor-grid-picker__selection">
          <div>
            <small>SELECTED CARD</small>
            <code>{selectedNodeId ?? "NONE"}</code>
          </div>
          <button type="button" disabled={!selectedNodeId} onClick={onReleaseSelected}>RELEASE</button>
          <button type="button" disabled={state.placements.length === 0} onClick={onReleaseAll}>RELEASE ALL</button>
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
          node.style.removeProperty("--bfux-node-anchor-x");
          node.style.removeProperty("--bfux-node-anchor-y");
          node.style.removeProperty("--bfux-node-anchor-tx");
          node.style.removeProperty("--bfux-node-anchor-ty");
          continue;
        }

        const anchor = anchorPointInApparatus(workfield, apparatus, placement, state.spec);
        const translation = cornerTranslation(placement.corner);
        node.dataset.bfuxGridPlaced = "true";
        node.dataset.bfuxGridCorner = placement.corner;
        node.style.setProperty("--bfux-node-anchor-x", `${anchor.x}px`);
        node.style.setProperty("--bfux-node-anchor-y", `${anchor.y}px`);
        node.style.setProperty("--bfux-node-anchor-tx", translation.x);
        node.style.setProperty("--bfux-node-anchor-ty", translation.y);

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
        node.style.removeProperty("--bfux-node-anchor-x");
        node.style.removeProperty("--bfux-node-anchor-y");
        node.style.removeProperty("--bfux-node-anchor-tx");
        node.style.removeProperty("--bfux-node-anchor-ty");
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
      const grabX = (event.clientX - nodeRect.left) / size.scaleX;
      const grabY = (event.clientY - nodeRect.top) / size.scaleY;
      const nextDrag = { nodeId, width: size.width, height: size.height, grabX, grabY };

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
          { nodeId: activeDrag.nodeId, column: next.column, row: next.row, corner: next.corner },
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
        next.push({ column, row, x: axisFraction(column, state.spec.columns), y: axisFraction(row, state.spec.rows) });
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

  return createPortal(
    <div
      ref={setWorkfield}
      className="bfux-anchor-grid-overlay"
      data-visible={state.spec.visible || drag ? "true" : undefined}
      data-dragging={drag ? "true" : undefined}
      data-coordinate-space="apparatus-workfield"
      aria-hidden="true"
    >
      {Array.from({ length: state.spec.columns }, (_, column) => (
        <span
          key={`column:${column}`}
          data-axis="column"
          style={{ left: `${axisFraction(column, state.spec.columns) * 100}%` }}
        />
      ))}
      {Array.from({ length: state.spec.rows }, (_, row) => (
        <span
          key={`row:${row}`}
          data-axis="row"
          style={{ top: `${axisFraction(row, state.spec.rows) * 100}%` }}
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
          <b>{candidate.corner.toUpperCase()} · {candidate.column + 1},{candidate.row + 1}</b>
        </div>
      ) : null}
    </div>,
    apparatus,
    "bfux-anchor-grid",
  );
}
