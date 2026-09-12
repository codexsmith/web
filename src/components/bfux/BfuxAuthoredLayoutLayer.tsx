"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { BfuxPartGlyph, getBfuxPartDefinition, type BfuxPartKind } from "./BfuxPartsBox";
import { bfuxAuthoredLayout } from "./bfux-layout-authored.generated";
import type { BfuxBillboardLayout, BfuxLayoutCorner, BfuxLayoutResolution } from "./bfux-layout-source";
import "./bfux-authored-layout.css";

const machineSelector = '.bf-machine[data-skin="physical"]';
const workfieldSelector = '[data-machine-layer="pan-surface"]';
const apparatusSelector = '[data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const layoutTuningEvent = "bfux-layout-tuning";

type LayoutHosts = {
  workfield: HTMLElement;
  apparatus: HTMLElement;
};

function currentResolution(host: HTMLElement): BfuxLayoutResolution {
  const machine = host.closest<HTMLElement>(machineSelector);
  return machine?.dataset.resolution === "mid" || machine?.dataset.resolution === "full" ? "mid" : "focus";
}

function axisFraction(index: number, count: number) {
  return count <= 1 ? 0.5 : index / (count - 1);
}

function cornerTranslation(corner: BfuxLayoutCorner) {
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

function anchorPositionInApparatus(
  workfield: HTMLElement,
  apparatus: HTMLElement,
  column: number,
  row: number,
  columns: number,
  rows: number,
) {
  const xFraction = axisFraction(column, columns);
  const yFraction = axisFraction(row, rows);
  const workfieldRect = workfield.getBoundingClientRect();

  /* Mobile hides the desktop workfield entirely. Keep the old apparatus-local
   * percentage interpretation there; desktop authored layouts use the full
   * workfield and are converted back into apparatus-local pixels. */
  if (!workfieldRect.width || !workfieldRect.height) {
    return { x: `${xFraction * 100}%`, y: `${yFraction * 100}%` };
  }

  const apparatusScale = elementScale(apparatus);
  const clientX = workfieldRect.left + xFraction * workfieldRect.width;
  const clientY = workfieldRect.top + yFraction * workfieldRect.height;
  return {
    x: `${(clientX - apparatusScale.rect.left) / apparatusScale.scaleX}px`,
    y: `${(clientY - apparatusScale.rect.top) / apparatusScale.scaleY}px`,
  };
}

function applyBillboardValues(target: HTMLElement, values: BfuxBillboardLayout) {
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
}

function clearBillboardValues(target: HTMLElement) {
  for (const property of [
    "--billboard-width",
    "--billboard-height",
    "--billboard-gap-y",
    "--billboard-visual-width",
    "--billboard-maze-scale",
    "--billboard-maze-left",
    "--billboard-visual-pad-x",
    "--billboard-visual-pad-y",
    "--billboard-copy-pad-x",
    "--billboard-copy-pad-y",
    "--billboard-title-scale",
    "--billboard-controls-height",
  ]) target.style.removeProperty(property);
}

function partSize(kind: BfuxPartKind) {
  switch (kind) {
    case "port": return { width: 58, height: 58 };
    case "tube": return { width: 112, height: 52 };
    case "elbow": return { width: 82, height: 76 };
    case "extended": return { width: 96, height: 62 };
    case "module": return { width: 112, height: 78 };
    case "module-wide": return { width: 152, height: 78 };
    default: return { width: 72, height: 62 };
  }
}

export function BfuxAuthoredLayoutLayer() {
  const [hosts, setHosts] = useState<LayoutHosts | null>(null);
  const [resolution, setResolution] = useState<BfuxLayoutResolution>("focus");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let frame = 0;
    const find = () => {
      const machine = document.querySelector<HTMLElement>(machineSelector);
      const workfield = machine?.querySelector<HTMLElement>(workfieldSelector) ?? null;
      const apparatus = machine?.querySelector<HTMLElement>(apparatusSelector) ?? null;
      setHosts((current) => {
        if (!workfield || !apparatus) return current === null ? current : null;
        if (current?.workfield === workfield && current.apparatus === apparatus) return current;
        return { workfield, apparatus };
      });
      if (apparatus) setResolution(currentResolution(apparatus));
      setRevision((current) => current + 1);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(find);
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
    if (!hosts) return;
    const bump = () => setRevision((current) => current + 1);
    const resizeObserver = new ResizeObserver(bump);
    resizeObserver.observe(hosts.workfield);
    resizeObserver.observe(hosts.apparatus);
    window.addEventListener("resize", bump);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", bump);
    };
  }, [hosts]);

  useEffect(() => {
    if (!hosts) return;
    const { workfield, apparatus } = hosts;
    const layout = bfuxAuthoredLayout[resolution];
    const billboard = apparatus.querySelector<HTMLElement>(billboardSelector);
    if (billboard) applyBillboardValues(billboard, layout.billboard);

    const placementByNode = new Map(layout.anchorGrid.placements.map((placement) => [placement.nodeId, placement]));
    const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector));

    for (const node of nodes) {
      const nodeId = node.dataset.nodeId ?? "";
      const placement = placementByNode.get(nodeId);
      if (!placement) continue;

      const anchor = anchorPositionInApparatus(
        workfield,
        apparatus,
        placement.column,
        placement.row,
        layout.anchorGrid.spec.columns,
        layout.anchorGrid.spec.rows,
      );
      const translation = cornerTranslation(placement.corner);
      node.dataset.bfuxAuthoredGridPlaced = "true";
      node.dataset.bfuxGridCorner = placement.corner;
      node.style.setProperty("--bfux-node-anchor-x", anchor.x);
      node.style.setProperty("--bfux-node-anchor-y", anchor.y);
      node.style.setProperty("--bfux-node-anchor-tx", translation.x);
      node.style.setProperty("--bfux-node-anchor-ty", translation.y);

      if (node.classList.contains("bf-machine-node--billboard")) {
        node.style.removeProperty("left");
        node.style.removeProperty("top");
      }
    }

    apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));

    return () => {
      if (billboard) clearBillboardValues(billboard);
      for (const node of nodes) {
        delete node.dataset.bfuxAuthoredGridPlaced;
        delete node.dataset.bfuxGridCorner;
        node.style.removeProperty("--bfux-node-anchor-x");
        node.style.removeProperty("--bfux-node-anchor-y");
        node.style.removeProperty("--bfux-node-anchor-tx");
        node.style.removeProperty("--bfux-node-anchor-ty");
      }
      apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));
    };
  }, [hosts, resolution, revision]);

  if (!hosts) return null;
  const { apparatus } = hosts;
  const layout = bfuxAuthoredLayout[resolution];

  return createPortal(
    <div className="bfux-authored-parts-layer" data-resolution={resolution} aria-hidden="true">
      {layout.placedParts.map((placement) => {
        const part = getBfuxPartDefinition(placement.partId);
        if (!part) return null;
        const size = partSize(part.kind);
        const style = {
          "--bfux-part-x": `${placement.x * 100}%`,
          "--bfux-part-y": `${placement.y * 100}%`,
          "--bfux-part-width": `${size.width}px`,
          "--bfux-part-height": `${size.height}px`,
        } as CSSProperties;
        return (
          <span
            key={placement.instanceId}
            className="bfux-authored-part"
            data-part-family={part.family}
            data-part-kind={part.kind}
            style={style}
          >
            <BfuxPartGlyph kind={part.kind} />
          </span>
        );
      })}
    </div>,
    apparatus,
    "bfux-authored-layout",
  );
}
