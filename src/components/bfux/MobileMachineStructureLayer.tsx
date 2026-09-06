"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Network } from "lucide-react";
import { getLabMachineNode, labMachineEdges, type LabMachineEdge } from "./lab-machine-model";
import type { LabMachineResolution } from "./LabMachine";
import { useMobileStructureHoldReveal } from "./useMobileStructureHoldReveal";
import "./mobile-machine-structure.css";
import "./mobile-machine-structure-aligned.css";

type AlignedRelationView = {
  key: string;
  sourceId: string;
  sourceLabel: string;
  sourceTone: string;
  relation: string;
  kind: LabMachineEdge["kind"];
  direction: "inbound" | "outbound";
  otherId: string;
  otherLabel: string;
  top: number;
};

type RelationStyle = CSSProperties & {
  "--bf-relation-source-tone": string;
};

function sameRelations(left: AlignedRelationView[], right: AlignedRelationView[]) {
  return left.length === right.length && left.every((relation, index) => {
    const other = right[index];
    return Boolean(other)
      && relation.key === other.key
      && relation.sourceTone === other.sourceTone
      && relation.top === other.top;
  });
}

export function MobileMachineStructureLayer({ resolution }: { resolution: LabMachineResolution }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [transientOpen, setTransientOpen] = useState(false);
  const [alignedRelations, setAlignedRelations] = useState<AlignedRelationView[]>([]);
  const open = latchedOpen || transientOpen;

  useMobileStructureHoldReveal({
    targetSelector: ".physical-machine-experience__machine-stack",
    enabled: !latchedOpen,
    onTransientChange: setTransientOpen,
  });

  useEffect(() => {
    if (!open) {
      setAlignedRelations([]);
      return;
    }

    const experience = rootRef.current?.closest<HTMLElement>(".physical-machine-experience");
    const gutter = rootRef.current?.querySelector<HTMLElement>(".bf-mobile-machine-structure__gutter");
    if (!experience || !gutter) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const nodes = Array.from(
        experience.querySelectorAll<HTMLElement>(
          '.bf-machine__apparatus > .bf-machine-node[data-node-id]',
        ),
      ).filter((node) => node.getClientRects().length > 0 && window.getComputedStyle(node).display !== "none");

      const visibleNodeIds = new Set(
        nodes.map((node) => node.dataset.nodeId).filter((value): value is string => Boolean(value)),
      );
      const gutterRect = gutter.getBoundingClientRect();
      if (gutterRect.height <= 0) return;

      const edgeRelations = new Map<string, AlignedRelationView[]>();

      for (const edge of labMachineEdges) {
        if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) continue;

        const from = getLabMachineNode(edge.from);
        const to = getLabMachineNode(edge.to);
        if (!from || !to) continue;

        const outbound: AlignedRelationView = {
          key: `${edge.from}->${edge.to}:${edge.from}`,
          sourceId: edge.from,
          sourceLabel: from.label,
          sourceTone: "#8eb8cc",
          relation: edge.relation,
          kind: edge.kind,
          direction: "outbound",
          otherId: edge.to,
          otherLabel: to.label,
          top: 0,
        };
        const inbound: AlignedRelationView = {
          key: `${edge.from}->${edge.to}:${edge.to}`,
          sourceId: edge.to,
          sourceLabel: to.label,
          sourceTone: "#8eb8cc",
          relation: edge.relation,
          kind: edge.kind,
          direction: "inbound",
          otherId: edge.from,
          otherLabel: from.label,
          top: 0,
        };

        edgeRelations.set(edge.from, [...(edgeRelations.get(edge.from) ?? []), outbound]);
        edgeRelations.set(edge.to, [...(edgeRelations.get(edge.to) ?? []), inbound]);
      }

      const nextRelations = nodes.flatMap<AlignedRelationView>((node) => {
        const sourceId = node.dataset.nodeId;
        if (!sourceId) return [];

        const localRelations = edgeRelations.get(sourceId) ?? [];
        // A single gutter plate should correspond to exactly one source card.
        // Hub cards such as Research expose their relations through the peripheral
        // cards instead of collapsing several meanings into one ambiguous plate.
        if (localRelations.length !== 1) return [];

        const rect = node.getBoundingClientRect();
        if (rect.bottom < gutterRect.top - 16 || rect.top > gutterRect.bottom + 16) return [];

        const center = rect.top + rect.height / 2 - gutterRect.top;
        const safeTop = Math.round(Math.max(36, Math.min(gutterRect.height - 36, center)));
        const sourceTone = window.getComputedStyle(node).getPropertyValue("--tone").trim() || "#8eb8cc";

        return [{
          ...localRelations[0],
          sourceTone,
          top: safeTop,
        }];
      }).sort((left, right) => left.top - right.top);

      setAlignedRelations((current) => sameRelations(current, nextRelations) ? current : nextRelations);
    };

    const scheduleMeasure = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(experience);
    observer.observe(gutter);

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true, capture: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleMeasure, { capture: true });
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [open, resolution]);

  const revealMode = latchedOpen ? "latched" : transientOpen ? "transient" : "closed";

  return (
    <div
      className="bf-mobile-machine-structure"
      data-open={open ? "true" : "false"}
      data-reveal-mode={revealMode}
      data-resolution={resolution}
      data-relation-count={alignedRelations.length}
      ref={rootRef}
    >
      <button
        className="bf-mobile-machine-structure__toggle"
        type="button"
        aria-expanded={open}
        aria-pressed={latchedOpen}
        aria-controls={panelId}
        aria-label={latchedOpen
          ? "Hide the mobile relation gutter"
          : "Reveal the mobile relation gutter. Press and hold the machine to reveal it transiently."}
        onClick={() => {
          setTransientOpen(false);
          setLatchedOpen((value) => !value);
        }}
      >
        <Network aria-hidden="true" />
        <span>
          <small>{resolution === "focus" ? "CORE · HOLD" : "FULL · HOLD"}</small>
          <strong>Relations</strong>
        </span>
        <b>{latchedOpen ? "Hide" : transientOpen ? "Pin" : "Reveal"}</b>
      </button>

      <aside
        className="bf-mobile-machine-structure__gutter"
        id={panelId}
        aria-label="Visible machine relations aligned with their source cards"
        aria-hidden={!open}
      >
        <div
          className="bf-mobile-machine-structure__relations"
          data-empty={alignedRelations.length === 0 ? "true" : "false"}
        >
          {alignedRelations.map((relation) => {
            const style: RelationStyle = {
              top: relation.top,
              "--bf-relation-source-tone": relation.sourceTone,
            };

            return (
              <div
                className="bf-mobile-machine-structure__relation"
                data-source-id={relation.sourceId}
                data-direction={relation.direction}
                data-kind={relation.kind}
                key={relation.key}
                style={style}
                aria-label={`${relation.sourceLabel}: ${relation.relation} ${relation.otherLabel}`}
              >
                <i aria-hidden="true" />
                <span className="bf-mobile-machine-structure__source" aria-hidden="true">
                  {relation.sourceLabel}
                </span>
                <small>{relation.relation}</small>
                <strong>{relation.otherLabel}</strong>
                <span className="bf-mobile-machine-structure__arrow" aria-hidden="true">
                  {relation.direction === "outbound" ? "->" : "<-"}
                </span>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
