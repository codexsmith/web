"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { BfuxPartGlyph, getBfuxPartDefinition, type BfuxPartKind } from "./BfuxPartsBox";
import { bfuxAuthoredLayout } from "./bfux-layout-authored.generated";
import { bfuxGridPlacementGeometry } from "./bfux-grid-geometry";
import type { BfuxBillboardLayout, BfuxLayoutCorner, BfuxLayoutResolution } from "./bfux-layout-source";
import "./bfux-authored-layout.css";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const nodeSelector = '.bf-machine-node[data-machine-layer="node"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const layoutTuningEvent = "bfux-layout-tuning";
const traceViewBoxWidth = 1200;
const traceViewBoxHeight = 760;

function currentResolution(host: HTMLElement): BfuxLayoutResolution {
  const machine = host.closest<HTMLElement>('.bf-machine[data-skin="physical"]');
  return machine?.dataset.resolution === "mid" || machine?.dataset.resolution === "full" ? "mid" : "focus";
}

function cornerTranslation(corner: BfuxLayoutCorner) {
  return {
    x: corner === "ne" || corner === "se" ? "-100%" : "0%",
    y: corner === "sw" || corner === "se" ? "-100%" : "0%",
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
  const [apparatus, setApparatus] = useState<HTMLElement | null>(null);
  const [resolution, setResolution] = useState<BfuxLayoutResolution>("focus");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let frame = 0;
    const find = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setApparatus((current) => current === next ? current : next);
      if (next) setResolution(currentResolution(next));
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
    if (!apparatus) return;
    const bump = () => setRevision((current) => current + 1);
    const resizeObserver = new ResizeObserver(bump);
    resizeObserver.observe(apparatus);
    window.addEventListener("resize", bump);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", bump);
    };
  }, [apparatus]);

  useEffect(() => {
    if (!apparatus) return;
    const layout = bfuxAuthoredLayout[resolution];
    const billboard = apparatus.querySelector<HTMLElement>(billboardSelector);
    if (billboard) applyBillboardValues(billboard, layout.billboard);

    const placementByNode = new Map(layout.anchorGrid.placements.map((placement) => [placement.nodeId, placement]));
    const nodes = Array.from(apparatus.querySelectorAll<HTMLElement>(nodeSelector));
    const geometryFor = (nodeId: string) => {
      const placement = placementByNode.get(nodeId);
      return placement ? bfuxGridPlacementGeometry(apparatus, layout.anchorGrid.spec, placement) : null;
    };

    for (const node of nodes) {
      const nodeId = node.dataset.nodeId ?? "";
      const placement = placementByNode.get(nodeId);
      if (!placement) continue;

      const geometry = bfuxGridPlacementGeometry(apparatus, layout.anchorGrid.spec, placement, {
        width: node.offsetWidth,
        height: node.offsetHeight,
      });
      const translation = cornerTranslation(placement.corner);
      node.dataset.bfuxAuthoredGridPlaced = "true";
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

    /* The Full process chassis is existing Lab Machine hardware, not a separate
     * authored card. Keep the entire bus bay on the same geometry contract as
     * the authored Research and Pipeline placements so it follows both the
     * Research envelope and the compact process-card row. */
    const lowerDeck = apparatus.querySelector<HTMLElement>(".bf-machine__lower-deck");
    const researchNode = nodes.find((node) => node.dataset.nodeId === "research");
    const researchPlacement = placementByNode.get("research");
    const pipelinePlacement = placementByNode.get("pipeline");
    const governancePlacement = placementByNode.get("governance");
    const researchGeometry = geometryFor("research");

    if (resolution === "mid" && lowerDeck && researchGeometry && pipelinePlacement) {
      const pipelineGeometry = bfuxGridPlacementGeometry(apparatus, layout.anchorGrid.spec, pipelinePlacement);
      apparatus.style.setProperty("--lower-deck-left", `${researchGeometry.left}px`);
      apparatus.style.setProperty(
        "--lower-deck-top",
        `calc(${pipelineGeometry.top}px - var(--compact-card-inset))`,
      );
      apparatus.style.setProperty("--lower-deck-width", `${researchGeometry.width}px`);
      lowerDeck.style.height = `calc(${pipelineGeometry.height}px + var(--compact-card-inset))`;
    }

    /* Research and Governance use paired physical sockets. Derive the purple
     * lead from the same authored rectangles as the cards: its horizontal run
     * ends directly above Governance's top socket, and its vertical position
     * stacks the two sockets without a floating gap. The final 3px trim matches
     * the painted socket edges rather than their border boxes. */
    if (resolution === "mid" && researchNode && researchGeometry && governancePlacement) {
      const governanceGeometry = bfuxGridPlacementGeometry(apparatus, layout.anchorGrid.spec, governancePlacement);
      const governanceRun = governanceGeometry.left - (researchGeometry.left + researchGeometry.width);
      const governanceTopOffset = governanceGeometry.top - researchGeometry.top;
      researchNode.style.setProperty(
        "--bfux-research-governance-run",
        `calc(${governanceRun}px + calc(var(--machine-u) * .35) + 3px)`,
      );
      researchNode.style.setProperty(
        "--bfux-research-governance-top",
        `calc(${governanceTopOffset}px - var(--lower-dock-height) - var(--lower-dock-height))`,
      );
    }

    /* Full's upper pipes are part of the authored apparatus too. The SVG keeps
     * its stable 1200x760 drawing space, but each route is projected from the
     * same live card rectangles used above. That keeps People/Product/Publications
     * mechanically attached to Research as the cards move in Layout Studio. */
    const traceLayer = apparatus.querySelector<SVGSVGElement>(".bf-machine__traces");
    if (resolution === "mid" && traceLayer && researchGeometry) {
      const peopleGeometry = geometryFor("people");
      const productsGeometry = geometryFor("products");
      const publicationsGeometry = geometryFor("publications");
      const apparatusWidth = Math.max(1, apparatus.offsetWidth);
      const apparatusHeight = Math.max(1, apparatus.offsetHeight);
      const overlap = 2;
      const sx = (value: number) => value / apparatusWidth * traceViewBoxWidth;
      const sy = (value: number) => value / apparatusHeight * traceViewBoxHeight;
      const n = (value: number) => Math.round(value * 100) / 100;
      const setCablePath = (selector: string, d: string, tone?: string) => {
        const cable = traceLayer.querySelector<SVGGElement>(selector);
        if (!cable) return;
        if (tone) cable.setAttribute("data-tone", tone);
        cable.querySelectorAll<SVGPathElement>("path").forEach((path) => path.setAttribute("d", d));
      };

      if (peopleGeometry) {
        const x = sx(peopleGeometry.left + peopleGeometry.width * .5);
        const fromY = sy(peopleGeometry.top + peopleGeometry.height - overlap);
        const toY = sy(researchGeometry.top + overlap);
        setCablePath(
          '.bf-machine__cable[data-from="people"][data-to="research"]',
          `M${n(x)} ${n(fromY)} V${n(toY)}`,
          "blue",
        );
      }

      if (productsGeometry) {
        const x = sx(productsGeometry.left + productsGeometry.width * .5);
        const fromY = sy(researchGeometry.top + overlap);
        const toY = sy(productsGeometry.top + productsGeometry.height - overlap);
        setCablePath(
          '.bf-machine__cable[data-from="research"][data-to="products"]',
          `M${n(x)} ${n(fromY)} V${n(toY)}`,
        );
      }

      if (publicationsGeometry) {
        const fromX = sx(researchGeometry.left + researchGeometry.width - overlap);
        const fromY = sy(researchGeometry.top + researchGeometry.height * .23);
        const toX = sx(publicationsGeometry.left + publicationsGeometry.width * .5);
        const toY = sy(publicationsGeometry.top + publicationsGeometry.height - overlap);
        setCablePath(
          '.bf-machine__cable[data-from="research"][data-to="publications"]',
          `M${n(fromX)} ${n(fromY)} H${n(toX)} V${n(toY)}`,
        );
      }

      if (productsGeometry && publicationsGeometry) {
        const fromX = sx(productsGeometry.left + productsGeometry.width - overlap);
        const toX = sx(publicationsGeometry.left + overlap);
        const y = sy((
          productsGeometry.top + productsGeometry.height * .5
          + publicationsGeometry.top + publicationsGeometry.height * .5
        ) / 2);
        setCablePath(
          ".bf-machine__cable--product-publication",
          `M${n(fromX)} ${n(y)} H${n(toX)}`,
        );
      }
    }

    apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));

    return () => {
      if (billboard) clearBillboardValues(billboard);
      for (const node of nodes) {
        delete node.dataset.bfuxAuthoredGridPlaced;
        delete node.dataset.bfuxGridCorner;
        delete node.dataset.bfuxGridSpan;
        node.style.removeProperty("--bfux-node-anchor-x");
        node.style.removeProperty("--bfux-node-anchor-y");
        node.style.removeProperty("--bfux-node-anchor-tx");
        node.style.removeProperty("--bfux-node-anchor-ty");
        node.style.removeProperty("--bfux-node-grid-width");
        node.style.removeProperty("--bfux-node-grid-height");
      }
      if (lowerDeck) lowerDeck.style.removeProperty("height");
      if (researchNode) {
        researchNode.style.removeProperty("--bfux-research-governance-run");
        researchNode.style.removeProperty("--bfux-research-governance-top");
      }
      apparatus.style.removeProperty("--lower-deck-left");
      apparatus.style.removeProperty("--lower-deck-top");
      apparatus.style.removeProperty("--lower-deck-width");
      apparatus.dispatchEvent(new CustomEvent(layoutTuningEvent, { bubbles: true }));
    };
  }, [apparatus, resolution, revision]);

  if (!apparatus) return null;
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
