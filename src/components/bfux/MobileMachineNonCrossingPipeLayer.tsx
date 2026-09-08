"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { labMachineEdges } from "./lab-machine-model";

type PipeSeed = {
  key: string;
  tone: string;
  focus: number;
  fromId: string;
  toId: string;
  fromRect: DOMRect;
  toRect: DOMRect;
  persistent: boolean;
};

type PipeView = {
  key: string;
  tone: string;
  focus: number;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  laneX: number;
  toX: number;
  toY: number;
  persistent: boolean;
  laneIndex: number;
};

type PipeStyle = CSSProperties & {
  "--bf-pipe-tone": string;
  "--bf-pipe-opacity": string;
  "--bf-pipe-width": string;
};

type Incident = {
  key: string;
  otherY: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function visibleHeight(rect: DOMRect, top: number, bottom: number) {
  return Math.min(rect.bottom, bottom) - Math.max(rect.top, top);
}

function samePipes(left: PipeView[], right: PipeView[]) {
  return left.length === right.length && left.every((pipe, index) => {
    const other = right[index];
    return Boolean(other)
      && pipe.key === other.key
      && pipe.tone === other.tone
      && pipe.focus === other.focus
      && pipe.fromX === other.fromX
      && pipe.fromY === other.fromY
      && pipe.laneX === other.laneX
      && pipe.toX === other.toX
      && pipe.toY === other.toY
      && pipe.persistent === other.persistent
      && pipe.laneIndex === other.laneIndex;
  });
}

function distributePorts(
  nodeId: string,
  card: HTMLElement,
  incidents: Incident[],
  portYByEdgeNode: Map<string, number>,
) {
  const rect = card.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2;
  const edgeInset = clamp(rect.height * 0.13, 8, 18);
  const centerGap = clamp(rect.height * 0.06, 3, 8);
  const above = incidents.filter((incident) => incident.otherY < centerY);
  const below = incidents.filter((incident) => incident.otherY >= centerY);

  // Same-side channel routing is non-crossing only when the shared-node ports
  // reverse the order of the peripheral endpoints. That turns interleaving
  // intervals into nested intervals, which can then be assigned nested lanes.
  const assign = (
    group: Incident[],
    startY: number,
    endY: number,
  ) => {
    if (group.length === 0) return;
    const ordered = [...group].sort((left, right) =>
      right.otherY - left.otherY || left.key.localeCompare(right.key),
    );
    const span = Math.max(0, endY - startY);

    ordered.forEach((incident, index) => {
      const fraction = ordered.length === 1 ? 0.5 : index / (ordered.length - 1);
      const y = startY + span * fraction;
      portYByEdgeNode.set(`${incident.key}:${nodeId}`, Math.round(y * 10) / 10);
    });
  };

  if (above.length > 0 && below.length > 0) {
    assign(above, rect.top + edgeInset, centerY - centerGap);
    assign(below, centerY + centerGap, rect.bottom - edgeInset);
    return;
  }

  // A one-sided fan may use nearly the full edge; the reversed ordering is what
  // guarantees nesting, while the larger spread keeps ports visually distinct.
  assign(above.length > 0 ? above : below, rect.top + edgeInset, rect.bottom - edgeInset);
}

export function MobileMachineNonCrossingPipeLayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markerSeed = useId().replace(/:/g, "");
  const arrowId = `${markerSeed}-noncross-arrow`;
  const [pipes, setPipes] = useState<PipeView[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const measure = () => {
      frame = 0;
      const structure = document.querySelector<HTMLElement>(
        '.bf-mobile-machine-structure[data-open="true"]',
      );
      const experience = structure?.closest<HTMLElement>(".physical-machine-experience");
      const gutter = structure?.querySelector<HTMLElement>(".bf-mobile-machine-structure__gutter");

      if (!structure || !experience || !gutter) {
        setPipes((current) => current.length === 0 ? current : []);
        return;
      }

      const gutterRect = gutter.getBoundingClientRect();
      if (gutterRect.height <= 0 || gutterRect.width <= 0) {
        setPipes((current) => current.length === 0 ? current : []);
        return;
      }

      const cards = Array.from(
        experience.querySelectorAll<HTMLElement>(
          '.bf-machine__apparatus > .bf-machine-node[data-node-id]',
        ),
      ).filter((card) => {
        const style = window.getComputedStyle(card);
        return card.getClientRects().length > 0
          && style.display !== "none"
          && style.visibility !== "hidden";
      });

      const cardById = new Map<string, HTMLElement>();
      for (const card of cards) {
        const nodeId = card.dataset.nodeId;
        if (nodeId) cardById.set(nodeId, card);
      }

      const viewportTop = gutterRect.top;
      const viewportBottom = gutterRect.bottom;
      const focalY = gutterRect.top + gutterRect.height * 0.48;
      const focusRadius = Math.max(130, gutterRect.height * 0.5);
      const visibleIds = new Set<string>();
      const focusById = new Map<string, number>();

      for (const [nodeId, card] of cardById) {
        const rect = card.getBoundingClientRect();
        const amount = visibleHeight(rect, viewportTop, viewportBottom);
        if (amount < 28) continue;
        visibleIds.add(nodeId);
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const center = visibleTop + (visibleBottom - visibleTop) / 2;
        const focus = clamp(1 - Math.abs(center - focalY) / focusRadius, 0, 1);
        focusById.set(nodeId, Math.round(focus * 100) / 100);
      }

      const seeds = labMachineEdges.flatMap<PipeSeed>((edge) => {
        const fromCard = cardById.get(edge.from);
        const toCard = cardById.get(edge.to);
        if (!fromCard || !toCard) return [];

        const fromVisible = visibleIds.has(edge.from);
        const toVisible = visibleIds.has(edge.to);
        if (!fromVisible && !toVisible) return [];

        const peripheralId = edge.from === "research"
          ? edge.to
          : edge.to === "research"
            ? edge.from
            : edge.from;
        const toneCard = cardById.get(peripheralId) ?? fromCard;
        const tone = window.getComputedStyle(toneCard).getPropertyValue("--tone").trim() || "#8eb8cc";

        return [{
          key: `${edge.from}->${edge.to}:${edge.relation}`,
          tone,
          focus: Math.max(focusById.get(edge.from) ?? 0.1, focusById.get(edge.to) ?? 0.1),
          fromId: edge.from,
          toId: edge.to,
          fromRect: fromCard.getBoundingClientRect(),
          toRect: toCard.getBoundingClientRect(),
          persistent: fromVisible !== toVisible,
        }];
      });

      const incidentsByNode = new Map<string, Incident[]>();
      const addIncident = (nodeId: string, key: string, otherY: number) => {
        const incidents = incidentsByNode.get(nodeId) ?? [];
        incidents.push({ key, otherY });
        incidentsByNode.set(nodeId, incidents);
      };

      for (const seed of seeds) {
        addIncident(seed.fromId, seed.key, seed.toRect.top + seed.toRect.height / 2);
        addIncident(seed.toId, seed.key, seed.fromRect.top + seed.fromRect.height / 2);
      }

      const portYByEdgeNode = new Map<string, number>();
      for (const [nodeId, incidents] of incidentsByNode) {
        const card = cardById.get(nodeId);
        if (card) distributePorts(nodeId, card, incidents, portYByEdgeNode);
      }

      const withPorts = seeds.map((seed) => {
        const fromY = portYByEdgeNode.get(`${seed.key}:${seed.fromId}`)
          ?? seed.fromRect.top + seed.fromRect.height / 2;
        const toY = portYByEdgeNode.get(`${seed.key}:${seed.toId}`)
          ?? seed.toRect.top + seed.toRect.height / 2;
        return {
          seed,
          fromY,
          toY,
          span: Math.abs(toY - fromY),
          topY: Math.min(fromY, toY),
        };
      });

      const rightmostCardEdge = seeds.reduce(
        (rightmost, seed) => Math.max(rightmost, seed.fromRect.right, seed.toRect.right),
        0,
      );
      const routingGap = Math.max(0, gutterRect.left - rightmostCardEdge);
      const laneInset = clamp(routingGap * 0.1, 5, 10);
      const laneLeft = Math.min(rightmostCardEdge + laneInset, gutterRect.left - laneInset);
      const laneRight = Math.max(laneLeft, gutterRect.left - laneInset);
      const laneSpan = Math.max(0, laneRight - laneLeft);

      // Longest/nested intervals take the outermost lanes. Persistent offscreen
      // continuations are biased outward, keeping them from cutting through the
      // local visible fan. For equal spans the geometric order provides stable
      // lane assignment while scrolling.
      const laneOrder = [...withPorts].sort((left, right) =>
        Number(right.seed.persistent) - Number(left.seed.persistent)
        || right.span - left.span
        || left.topY - right.topY
        || left.seed.key.localeCompare(right.seed.key),
      );
      const laneXByEdge = new Map<string, { x: number; index: number }>();

      laneOrder.forEach((route, index) => {
        const fraction = laneOrder.length === 1
          ? 0.5
          : 1 - index / (laneOrder.length - 1);
        laneXByEdge.set(route.seed.key, {
          x: Math.round((laneLeft + laneSpan * fraction) * 10) / 10,
          index,
        });
      });

      const next = withPorts.map<PipeView>(({ seed, fromY, toY }) => {
        const lane = laneXByEdge.get(seed.key);
        return {
          key: seed.key,
          tone: seed.tone,
          focus: seed.focus,
          fromId: seed.fromId,
          toId: seed.toId,
          fromX: Math.round(seed.fromRect.right * 10) / 10,
          fromY: Math.round(fromY * 10) / 10,
          laneX: lane?.x ?? Math.round(laneRight * 10) / 10,
          toX: Math.round(seed.toRect.right * 10) / 10,
          toY: Math.round(toY * 10) / 10,
          persistent: seed.persistent,
          laneIndex: lane?.index ?? 0,
        };
      }).sort((left, right) => left.laneIndex - right.laneIndex);

      setPipes((current) => samePipes(current, next) ? current : next);
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.documentElement);

    mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-open", "data-resolution", "style", "class"],
      childList: true,
      subtree: true,
    });

    schedule();
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);

    return () => {
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="bf-mobile-machine-noncrossing-pipe-layer" ref={rootRef} aria-hidden="true">
      {pipes.length > 0 ? (
        <svg className="bf-mobile-machine-noncrossing-pipe-layer__svg">
          <defs>
            <marker
              id={arrowId}
              markerWidth="5.5"
              markerHeight="5.5"
              refX="4.9"
              refY="2.75"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0 0 L5.5 2.75 L0 5.5 z" fill="context-stroke" />
            </marker>
          </defs>
          {pipes.map((pipe) => {
            const style: PipeStyle = {
              "--bf-pipe-tone": pipe.tone,
              "--bf-pipe-opacity": String((pipe.persistent ? 0.22 : 0.34) + pipe.focus * 0.55),
              "--bf-pipe-width": String(1 + pipe.focus * 0.75),
            };
            const path = `M ${pipe.fromX} ${pipe.fromY} H ${pipe.laneX} V ${pipe.toY} H ${pipe.toX}`;

            return (
              <g
                className="bf-mobile-machine-noncrossing-pipe-layer__pipe"
                data-from-id={pipe.fromId}
                data-to-id={pipe.toId}
                data-persistent={pipe.persistent ? "true" : "false"}
                data-lane-index={pipe.laneIndex}
                key={pipe.key}
                style={style}
              >
                <path className="bf-mobile-machine-noncrossing-pipe-layer__casing" d={path} />
                <path className="bf-mobile-machine-noncrossing-pipe-layer__trace" d={path} markerEnd={`url(#${arrowId})`} />
                <circle cx={pipe.fromX} cy={pipe.fromY} r="2.35" />
              </g>
            );
          })}
        </svg>
      ) : null}
    </div>
  );
}
