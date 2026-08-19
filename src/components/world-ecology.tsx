"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ContentNode,
  EdgeType,
  getCrossEdges,
  getImmediateChildTowardFocus,
  getNode,
  isDescendantOf,
} from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";

type WorldEcologyProps = {
  focusNode: ContentNode;
  gestaltNode: ContentNode;
  onNavigate: (id: string) => void;
};

type RelationScope = "local" | "internal" | "boundary";
type RelationDirection = "outgoing" | "incoming";
type RelationFamily = "structural" | "applied" | "governance";

type RelationProjection = {
  key: string;
  type: EdgeType;
  label: string;
  direction: RelationDirection;
  family: RelationFamily;
  scope: RelationScope;
  relatedNode: ContentNode;
  sourceRegionId: string;
  sourceRegionLabel: string;
  targetRegionId?: string;
  targetRegionLabel?: string;
};

type Point = { x: number; y: number };
type RelationSegment = RelationProjection & {
  start: Point;
  end: Point;
  control: Point;
  labelPoint: Point;
};

const structuralTypes = new Set<EdgeType>([
  "contains",
  "specializes",
  "grounds",
  "derived-from",
  "depends-on",
  "extends",
]);

const appliedTypes = new Set<EdgeType>([
  "implements",
  "demonstrates",
  "applies-to",
  "instantiates",
]);

function relationFamily(type: EdgeType): RelationFamily {
  if (structuralTypes.has(type)) return "structural";
  if (appliedTypes.has(type)) return "applied";
  return "governance";
}

function centerOf(rect: DOMRect, worldRect: DOMRect): Point {
  return {
    x: rect.left - worldRect.left + rect.width / 2,
    y: rect.top - worldRect.top + rect.height / 2,
  };
}

function edgePoint(rect: DOMRect, worldRect: DOMRect, toward: Point): Point {
  const center = centerOf(rect, worldRect);
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const halfWidth = Math.max(1, rect.width / 2);
  const halfHeight = Math.max(1, rect.height / 2);
  const divisor = Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight, 1);

  return {
    x: center.x + dx / divisor,
    y: center.y + dy / divisor,
  };
}

function relationSentence(focusNode: ContentNode, relation: RelationProjection): string {
  if (relation.direction === "outgoing") {
    return `${focusNode.label} ${relation.label} ${relation.relatedNode.label}`;
  }

  return `${relation.relatedNode.label} ${relation.label} ${focusNode.label}`;
}

function scopeLabel(relation: RelationProjection): string {
  if (relation.scope === "local") {
    return relation.targetRegionLabel ? `Visible in ${relation.targetRegionLabel}` : "Visible in this whole";
  }

  if (relation.scope === "internal") {
    return `Compacted inside ${relation.sourceRegionLabel}`;
  }

  return "Crosses current whole";
}

export function WorldEcology({ focusNode, gestaltNode, onNavigate }: WorldEcologyProps) {
  const [segments, setSegments] = useState<RelationSegment[]>([]);
  const [open, setOpen] = useState(true);

  const projections = useMemo<RelationProjection[]>(() => {
    if (focusNode.id === gestaltNode.id) return [];

    const sourceRegion = getImmediateChildTowardFocus(gestaltNode.id, focusNode.id);
    if (!sourceRegion) return [];
    const renderedSourceRegion = hydrateContentNode(sourceRegion);

    return getCrossEdges(focusNode.id).map((edge) => {
      const relatedNode = hydrateContentNode(edge.node);
      const direction: RelationDirection = edge.from === focusNode.id ? "outgoing" : "incoming";
      let targetRegionId: string | undefined;
      let targetRegionLabel: string | undefined;

      if (relatedNode.id !== gestaltNode.id && isDescendantOf(relatedNode.id, gestaltNode.id)) {
        const projectedTarget = getImmediateChildTowardFocus(gestaltNode.id, relatedNode.id);
        if (projectedTarget) {
          targetRegionId = projectedTarget.id;
          targetRegionLabel = hydrateContentNode(getNode(projectedTarget.id)).label;
        }
      }

      const scope: RelationScope = targetRegionId
        ? targetRegionId === sourceRegion.id
          ? "internal"
          : "local"
        : "boundary";

      return {
        key: `${edge.from}-${edge.to}-${edge.type}`,
        type: edge.type,
        label: edge.label,
        direction,
        family: relationFamily(edge.type),
        scope,
        relatedNode,
        sourceRegionId: sourceRegion.id,
        sourceRegionLabel: renderedSourceRegion.label,
        targetRegionId,
        targetRegionLabel,
      };
    });
  }, [focusNode.id, gestaltNode.id]);

  const geometryKey = projections
    .map((relation) => `${relation.key}:${relation.scope}:${relation.targetRegionId ?? "boundary"}`)
    .join("|");

  useEffect(() => {
    setOpen(true);
  }, [focusNode.id, gestaltNode.id]);

  useEffect(() => {
    if (!projections.length) {
      setSegments([]);
      return;
    }

    const world = document.querySelector<HTMLElement>(".world-viewport");
    const branch = document.querySelector<HTMLElement>(".branch-world");
    if (!world) return;

    const measure = () => {
      const worldRect = world.getBoundingClientRect();
      const nextSegments: RelationSegment[] = [];

      projections
        .filter((relation) => relation.scope === "local" && relation.targetRegionId)
        .forEach((relation, index) => {
          const source = world.querySelector<HTMLElement>(
            `.district-card[data-node-id="${relation.sourceRegionId}"]`,
          );
          const target = world.querySelector<HTMLElement>(
            `.district-card[data-node-id="${relation.targetRegionId}"]`,
          );

          if (!source || !target) return;

          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const sourceCenter = centerOf(sourceRect, worldRect);
          const targetCenter = centerOf(targetRect, worldRect);
          const outgoing = relation.direction === "outgoing";
          const semanticStartRect = outgoing ? sourceRect : targetRect;
          const semanticEndRect = outgoing ? targetRect : sourceRect;
          const semanticStartCenter = outgoing ? sourceCenter : targetCenter;
          const semanticEndCenter = outgoing ? targetCenter : sourceCenter;
          const start = edgePoint(semanticStartRect, worldRect, semanticEndCenter);
          const end = edgePoint(semanticEndRect, worldRect, semanticStartCenter);
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const length = Math.max(1, Math.hypot(dx, dy));
          const bend = Math.min(38, Math.max(14, length * 0.08)) * (index % 2 === 0 ? 1 : -1);
          const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
          const control = {
            x: midpoint.x + (-dy / length) * bend,
            y: midpoint.y + (dx / length) * bend,
          };
          const labelPoint = {
            x: (start.x + 2 * control.x + end.x) / 4,
            y: (start.y + 2 * control.y + end.y) / 4,
          };

          nextSegments.push({ ...relation, start, end, control, labelPoint });
        });

      setSegments(nextSegments);
    };

    const frame = requestAnimationFrame(measure);
    const settle = window.setTimeout(measure, 340);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
    observer?.observe(world);
    branch && observer?.observe(branch);
    branch?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer?.disconnect();
      branch?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [geometryKey, projections]);

  if (!projections.length) return null;

  const localCount = projections.filter((relation) => relation.scope === "local").length;
  const internalCount = projections.filter((relation) => relation.scope === "internal").length;
  const boundaryCount = projections.filter((relation) => relation.scope === "boundary").length;

  return (
    <div className="world-ecology" aria-label={`Relationship ecology for ${focusNode.label} within ${gestaltNode.label}`}>
      <svg className="relation-overlay" aria-hidden="true">
        <defs>
          {(["structural", "applied", "governance"] as RelationFamily[]).map((family) => (
            <marker
              id={`relation-arrow-${family}`}
              key={family}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path className={`relation-arrow relation-arrow--${family}`} d="M0,0 L7,3.5 L0,7 z" />
            </marker>
          ))}
        </defs>
        {segments.map((segment) => (
          <g key={segment.key} data-edge-family={segment.family} data-edge-type={segment.type}>
            <path
              className="relation-path"
              d={`M ${segment.start.x} ${segment.start.y} Q ${segment.control.x} ${segment.control.y} ${segment.end.x} ${segment.end.y}`}
              markerEnd={`url(#relation-arrow-${segment.family})`}
            />
            <circle className="relation-port" cx={segment.start.x} cy={segment.start.y} r="3.5" />
          </g>
        ))}
      </svg>

      <div className="relation-label-layer" aria-hidden="true">
        {segments.map((segment) => (
          <span
            key={segment.key}
            className="relation-geometry-label"
            data-edge-family={segment.family}
            style={{ left: segment.labelPoint.x, top: segment.labelPoint.y }}
          >
            {segment.label}
          </span>
        ))}
      </div>

      <aside className={`relation-dock ${open ? "relation-dock--open" : ""}`}>
        <button
          className="relation-dock__toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <span>
            <small>Relation field</small>
            <strong>{focusNode.shortLabel ?? focusNode.label}</strong>
          </span>
          <span className="relation-dock__counts" aria-label={`${localCount} visible, ${internalCount} compacted, ${boundaryCount} boundary relations`}>
            <i>{localCount}</i>
            <i>{internalCount}</i>
            <i>{boundaryCount}</i>
          </span>
          <span className="relation-dock__chevron" aria-hidden="true">{open ? "−" : "+"}</span>
        </button>

        {open ? (
          <div className="relation-dock__body">
            <div className="relation-dock__legend" aria-hidden="true">
              <span><i data-scope="local" /> visible</span>
              <span><i data-scope="internal" /> compacted</span>
              <span><i data-scope="boundary" /> boundary</span>
            </div>
            <div className="relation-dock__relations">
              {projections.map((relation) => (
                <button
                  key={relation.key}
                  data-scope={relation.scope}
                  data-edge-family={relation.family}
                  onClick={() => onNavigate(relation.relatedNode.id)}
                  title={`Traverse relation to ${relation.relatedNode.label}`}
                >
                  <span className="relation-dock__port" aria-hidden="true" />
                  <span className="relation-dock__copy">
                    <small>{scopeLabel(relation)} · {relation.type}</small>
                    <strong>{relation.relatedNode.label}</strong>
                    <em>{relationSentence(focusNode, relation)}</em>
                  </span>
                  <span className="relation-dock__arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
