"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Network } from "lucide-react";
import { getLabMachineNode, labMachineEdges, type LabMachineEdge } from "./lab-machine-model";
import type { LabMachineResolution } from "./LabMachine";
import { useMobileStructureHoldReveal } from "./useMobileStructureHoldReveal";
import "./mobile-machine-structure.css";

type RelationView = {
  key: string;
  relation: string;
  kind: LabMachineEdge["kind"];
  direction: "inbound" | "outbound";
  otherId: string;
  otherLabel: string;
};

function sameIds(left: string[], right: string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function MobileMachineStructureLayer({ resolution }: { resolution: LabMachineResolution }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [transientOpen, setTransientOpen] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState("research");
  const [visibleNodeIds, setVisibleNodeIds] = useState<string[]>([]);
  const open = latchedOpen || transientOpen;

  useMobileStructureHoldReveal({
    targetSelector: ".physical-machine-experience__machine-stack",
    enabled: !latchedOpen,
    onTransientChange: setTransientOpen,
  });

  useEffect(() => {
    if (!open) return;

    const experience = rootRef.current?.closest<HTMLElement>(".physical-machine-experience");
    if (!experience) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const nodes = Array.from(
        experience.querySelectorAll<HTMLElement>(
          '.bf-machine__apparatus > .bf-machine-node[data-node-id]',
        ),
      ).filter((node) => node.getClientRects().length > 0 && window.getComputedStyle(node).display !== "none");

      const ids = nodes.map((node) => node.dataset.nodeId).filter((value): value is string => Boolean(value));
      setVisibleNodeIds((current) => sameIds(current, ids) ? current : ids);
      if (nodes.length === 0) return;

      const shell = experience.closest<HTMLElement>(".site-shell");
      const frameTop = shell
        ? Number.parseFloat(window.getComputedStyle(shell).getPropertyValue("--frame-top")) || 0
        : 0;
      const anchorY = Math.max(frameTop + 104, Math.min(window.innerHeight * 0.42, window.innerHeight - 120));

      let nextId = ids[0] ?? "research";
      let nextDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node) => {
        const id = node.dataset.nodeId;
        if (!id) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - anchorY);
        if (distance < nextDistance) {
          nextDistance = distance;
          nextId = id;
        }
      });

      setActiveNodeId((current) => current === nextId ? current : nextId);
    };

    const scheduleMeasure = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [open, resolution]);

  const activeNode = getLabMachineNode(activeNodeId);
  const relations = useMemo<RelationView[]>(() => {
    const visible = new Set(visibleNodeIds);

    return labMachineEdges
      .filter((edge) => edge.from === activeNodeId || edge.to === activeNodeId)
      .flatMap<RelationView>((edge) => {
        const direction: RelationView["direction"] = edge.from === activeNodeId ? "outbound" : "inbound";
        const otherId = direction === "outbound" ? edge.to : edge.from;
        const other = getLabMachineNode(otherId);
        if (!other) return [];
        if (visible.size > 0 && !visible.has(otherId)) return [];

        return [{
          key: `${edge.from}->${edge.to}`,
          relation: edge.relation,
          kind: edge.kind,
          direction,
          otherId,
          otherLabel: other.label,
        }];
      })
      .sort((left, right) => Number(right.direction === "outbound") - Number(left.direction === "outbound"));
  }, [activeNodeId, visibleNodeIds]);

  const shownRelations = relations.slice(0, 4);
  const hiddenRelationCount = Math.max(0, relations.length - shownRelations.length);
  const revealMode = latchedOpen ? "latched" : transientOpen ? "transient" : "closed";

  return (
    <div
      className="bf-mobile-machine-structure"
      data-open={open ? "true" : "false"}
      data-reveal-mode={revealMode}
      data-resolution={resolution}
      data-active-node={activeNodeId}
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
        aria-label={`Local relations for ${activeNode?.label ?? "the current machine node"}`}
        aria-hidden={!open}
      >
        <header>
          <small>LOCAL STRUCTURE</small>
          <strong>{activeNode?.label ?? "Lab Machine"}</strong>
          <span>Scroll to inspect the assembly.</span>
        </header>

        <div className="bf-mobile-machine-structure__relations">
          {shownRelations.length > 0 ? shownRelations.map((relation) => (
            <div
              className="bf-mobile-machine-structure__relation"
              data-direction={relation.direction}
              data-kind={relation.kind}
              key={relation.key}
            >
              <i aria-hidden="true" />
              <small>{relation.relation}</small>
              <strong>{relation.otherLabel}</strong>
              <span aria-hidden="true">{relation.direction === "outbound" ? "->" : "<-"}</span>
            </div>
          )) : (
            <p className="bf-mobile-machine-structure__empty">No local relation is exposed in this projection.</p>
          )}
        </div>

        {hiddenRelationCount > 0 ? (
          <p className="bf-mobile-machine-structure__more">+{hiddenRelationCount} local relation{hiddenRelationCount === 1 ? "" : "s"}</p>
        ) : null}
      </aside>
    </div>
  );
}
