"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Box, Clock3, ListTree, Network, Share2, ShieldPlus, Users, type LucideIcon } from "lucide-react";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import {
  labMachineEdges,
  labMachineMermaid,
  labMachineNodes,
  type LabMachineEdge,
  type LabMachineNode,
} from "./lab-machine-model";
import "./lab-machine.css";
import "./lab-machine-physical.css";
import "./lab-machine-reference-cards.css";
import "./lab-machine-reference-match.css";

const nodeIcons: Record<string, BfuxIconName> = {
  products: "object",
  research: "invariant",
  about: "actor",
  service: "port",
  "public-value": "consequence",
};

const nodeLucideIcons: Record<string, LucideIcon> = {
  publications: Share2,
  applications: Box,
  method: Network,
  pipeline: ListTree,
  people: Users,
  governance: ShieldPlus,
  timeline: Clock3,
};

const aboutResearchConnectorKinds: LabMachineEdge["kind"][] = [
  "attaches",
  "attaches",
  "attaches",
  "serves",
  "constrains",
  "records",
];

const pipelineMethodConnectorKinds: LabMachineEdge["kind"][] = ["feeds", "feeds"];
const methodTimelineConnectorKinds: LabMachineEdge["kind"][] = ["records", "records"];
const lowerDeckContactCount = 5;

const physicalNodeIds = new Set([
  "products",
  "publications",
  "method",
  "pipeline",
  "research",
  "about",
  "people",
  "governance",
  "timeline",
]);

const physicalFocusNodeOrder: Record<string, number> = {
  people: 0,
  products: 1,
  publications: 2,
  about: 3,
  research: 4,
  pipeline: 5,
  method: 6,
  timeline: 7,
  governance: 8,
};

function edgeTone(edge: LabMachineEdge) {
  const source = labMachineNodes.find((node) => node.id === edge.from);
  const target = labMachineNodes.find((node) => node.id === edge.to);
  if (target?.id === "research" && ["people", "governance", "timeline"].includes(source?.id ?? "")) return "violet";
  if (edge.kind === "feeds") return target?.tone ?? source?.tone ?? "slate";
  return source?.tone ?? target?.tone ?? "slate";
}

function Node({
  node,
  edges,
  skin,
  onOpen,
}: {
  node: LabMachineNode;
  edges: LabMachineEdge[];
  skin: "apparatus" | "physical";
  onOpen?: (nodeId: string) => void;
}) {
  const inbound = edges.filter((edge) => edge.to === node.id);
  const outbound = edges.filter((edge) => edge.from === node.id);
  const icon = nodeIcons[node.id] ?? "boundary";
  const LucideNodeIcon = nodeLucideIcons[node.id];
  const isAboutResearchAdjacency = skin === "physical" && node.id === "about";
  const isPipelineMethodAdjacency = skin === "physical" && node.id === "pipeline";
  const isMethodTimelineAdjacency = skin === "physical" && node.id === "method";

  const isConjoinedBlock = skin === "physical" && ["pipeline", "method", "timeline"].includes(node.id);
  const eyebrow = skin === "physical" && node.id === "people"
    ? "WHO"
    : skin === "physical" && node.id === "products"
    ? "WHAT"
    : node.id === "service"
    ? node.label
    : node.question;

  let outboundCount = outbound.length;
  if (isAboutResearchAdjacency) outboundCount = aboutResearchConnectorKinds.length;
  if (isPipelineMethodAdjacency) outboundCount = pipelineMethodConnectorKinds.length;
  if (isMethodTimelineAdjacency) outboundCount = methodTimelineConnectorKinds.length;
  if (skin === "physical" && node.id === "timeline") outboundCount = 0;

  return (
    <article
      className={`bf-machine-node bf-machine-node--${node.kind} ${isConjoinedBlock ? "bf-machine-node--conjoined" : ""}`}
      data-node-id={node.id}
      data-machine-node-interactive={onOpen ? "true" : undefined}
      data-tone={node.tone}
      data-inputs={inbound.length}
      data-outputs={outboundCount}
      data-adjacency={isAboutResearchAdjacency ? "research" : isPipelineMethodAdjacency ? "method" : isMethodTimelineAdjacency ? "timeline" : undefined}
      style={{ gridArea: node.area }}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `Open ${node.label}` : undefined}
      onClick={onOpen ? () => onOpen(node.id) : undefined}
      onKeyDown={onOpen ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onOpen(node.id);
        }
      } : undefined}
    >
      <div className="bf-machine-node__mount" aria-hidden="true" />
      <div className="bf-machine-node__shell" aria-hidden="true" />
      <span className="bf-machine-node__fasteners" aria-hidden="true">
        <i /><i /><i /><i />
      </span>

      <div className="bf-machine-node__face">
        <div className="bf-machine-node__icon-plate" aria-hidden="true">
          <span className="bf-machine-node__icon-well">
            {LucideNodeIcon ? <LucideNodeIcon /> : <BfuxIcon name={icon} />}
          </span>
        </div>

        <header>
          <span>{eyebrow}</span>
          {node.id === "service" ? null : <strong>{node.label}</strong>}
        </header>

        <div className="bf-machine-node__boundary">
          <small>BOUNDARY</small>
          <p>{node.boundary}</p>
        </div>

        {(node.state || node.meta?.length) && !isConjoinedBlock && (
          <footer>
            {node.state && (
              <span className="bf-machine-node__state">
                <small>STATE</small>
                {node.state}
              </span>
            )}
            {node.meta?.map((item) => {
              const [label, value] = item.split(" · ");
              return <span key={item}><small>{label}</small>{value ?? label}</span>;
            })}
          </footer>
        )}
      </div>

      {inbound.length > 0 && (
        <div className="bf-machine-node__ports bf-machine-node__ports--in" aria-label={`${inbound.length} incoming interface${inbound.length === 1 ? "" : "s"}`}>
          {inbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}
        </div>
      )}
      {outboundCount > 0 && (
        <div
          className="bf-machine-node__ports bf-machine-node__ports--out"
          aria-label={
            isAboutResearchAdjacency ? "Six-contact adjacency connector to Research" :
            isPipelineMethodAdjacency ? "Two-contact adjacency connector to Method" :
            isMethodTimelineAdjacency ? "Two-contact adjacency connector to Timeline" :
            `${outbound.length} outgoing interface${outbound.length === 1 ? "" : "s"}`
          }
        >
          {isAboutResearchAdjacency
            ? aboutResearchConnectorKinds.map((kind, index) => <i key={`about-research-${index}`} title="About snapped to Research" data-kind={kind} />)
            : isPipelineMethodAdjacency
            ? pipelineMethodConnectorKinds.map((kind, index) => <i key={`pipeline-method-${index}`} title="Pipeline snapped to Method" data-kind={kind} />)
            : isMethodTimelineAdjacency
            ? methodTimelineConnectorKinds.map((kind, index) => <i key={`method-timeline-${index}`} title="Method snapped to Timeline" data-kind={kind} />)
            : outbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}
        </div>
      )}

      {isConjoinedBlock && node.id === "pipeline" && (
        <div className="bf-machine-node__underpipe" aria-hidden="true">
          <div className="bf-machine-node__underpipe-highlight" />
        </div>
      )}

      {skin === "physical" && node.id === "research" && (
        <div className="bf-machine-node__lower-dock" aria-label="Five-contact connector to the lower module">
          {Array.from({ length: lowerDeckContactCount }, (_, index) => <i key={`research-lower-dock-${index}`} />)}
        </div>
      )}
      {skin === "physical" && node.id === "research" && (
        <div className="bf-machine-node__research-governance-dock" aria-label="Research connector to Governance"><i /></div>
      )}
      {skin === "physical" && node.id === "governance" && (
        <div className="bf-machine-node__governance-top-dock" aria-label="Governance connector to Research"><i /></div>
      )}
    </article>
  );
}

function PhysicalStatus() {
  return (
    <aside className="bf-machine__status" aria-label="Lab Machine graph status">
      <strong>THE LAB MACHINE</strong>
      <small>Powered by Research. Built for People.</small>
    </aside>
  );
}

function PhysicalLegend() {
  const items: Array<[BfuxIconName, string, string]> = [
    ["boundary", "BOUNDARY", "Containment"],
    ["port", "PORT", "Interface"],
    ["trace", "TRACE", "Relation"],
    ["gate", "GATE", "Condition"],
    ["state", "STATE", "Observed"],
    ["transition", "COMMAND", "Action"],
    ["inspect", "THROUGH", "Inspect deeper"],
  ];

  return (
    <footer className="bf-machine__legend" aria-label="Boundary First visual grammar legend">
      <strong>LEGEND · BOUNDARY-FIRST VISUAL GRAMMAR</strong>
      <div>
        {items.map(([icon, label, detail]) => (
          <span key={label}><BfuxIcon name={icon} /><b>{label}</b><small>{detail}</small></span>
        ))}
      </div>
      <div className="bf-machine__legend-actions">
        <p><span>HOVER: <b>Probe</b></span><span>CLICK: <b>Bind</b></span><span>ENTER: <b>Act</b></span></p>
        <p>ORIENT → PROBE → BIND → ACT</p>
      </div>
    </footer>
  );
}

export function LabMachine({
  showSchematic = false,
  skin = "physical",
  resolution = "mid",
  onOpenNode,
}: {
  showSchematic?: boolean;
  skin?: "apparatus" | "physical";
  resolution?: LabMachineResolution;
  onOpenNode?: (nodeId: string) => void;
}) {
  const id = useId().replaceAll(":", "");
  const [svg, setSvg] = useState("");
  const [apparatusOffset, setApparatusOffset] = useState({ x: 0, y: 0 });
  const [isDraggingApparatus, setIsDraggingApparatus] = useState(false);
  const apparatusDrag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    if (!showSchematic) return;
    let live = true;
    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          flowchart: { curve: "stepAfter", htmlLabels: false },
        });
        return mermaid.render(`lab-machine-${id}`, labMachineMermaid());
      })
      .then((result) => {
        if (live) setSvg(result.svg);
      });
    return () => {
      live = false;
    };
  }, [id, showSchematic]);

  const paths = skin === "physical"
    ? resolution === "focus" ? physicalFocusTracePaths : physicalTracePaths
    : apparatusTracePaths;
  const visibleNodes = skin === "physical"
    ? labMachineNodes.filter((node) => physicalNodeIds.has(node.id))
    : labMachineNodes;
  const orderedVisibleNodes = skin === "physical" && resolution === "focus"
    ? [...visibleNodes].sort((a, b) => physicalFocusNodeOrder[a.id] - physicalFocusNodeOrder[b.id])
    : visibleNodes;
  const visibleEdges = skin === "physical"
    ? labMachineEdges.filter((edge) => physicalNodeIds.has(edge.from) && physicalNodeIds.has(edge.to))
    : labMachineEdges;

  return (
    <section className="bf-machine" data-skin={skin} data-resolution={resolution} aria-label="Boundary First Labs machine">
      <div className="bf-machine__title">
        <strong>THE LAB MACHINE</strong>
        <span>Powered by Research. Built for People.</span>
      </div>
      <div
        className="bf-machine__board"
        data-dragging={isDraggingApparatus ? "true" : undefined}
        tabIndex={skin === "physical" ? 0 : undefined}
        role={skin === "physical" ? "group" : undefined}
        aria-label={skin === "physical" ? "Draggable Lab workspace. Use the pointer anywhere on the machine field to drag the apparatus, arrow keys to nudge, or Home to reset." : undefined}
        title={skin === "physical" ? "Drag anywhere in the machine field to reposition the apparatus · Double-click or press Home to reset" : undefined}
        onPointerDown={skin === "physical" ? (event) => {
          if (event.button !== 0) return;
          if ((event.target as HTMLElement).closest('[data-machine-node-interactive="true"], a, button, input, select, textarea')) return;
          apparatusDrag.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: apparatusOffset.x,
            originY: apparatusOffset.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsDraggingApparatus(true);
        } : undefined}
        onPointerMove={skin === "physical" ? (event) => {
          const drag = apparatusDrag.current;
          if (!drag || drag.pointerId !== event.pointerId) return;
          const x = Math.max(-700, Math.min(700, drag.originX + event.clientX - drag.startX));
          const y = Math.max(-260, Math.min(260, drag.originY + event.clientY - drag.startY));
          setApparatusOffset({ x, y });
        } : undefined}
        onPointerUp={skin === "physical" ? (event) => {
          if (apparatusDrag.current?.pointerId !== event.pointerId) return;
          apparatusDrag.current = null;
          setIsDraggingApparatus(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        } : undefined}
        onPointerCancel={skin === "physical" ? () => {
          apparatusDrag.current = null;
          setIsDraggingApparatus(false);
        } : undefined}
        onDoubleClick={skin === "physical" ? () => setApparatusOffset({ x: 0, y: 0 }) : undefined}
        onKeyDown={skin === "physical" ? (event) => {
          if (event.key === "Home") {
            event.preventDefault();
            setApparatusOffset({ x: 0, y: 0 });
            return;
          }
          const delta = event.shiftKey ? 40 : 12;
          let movement: { x: number; y: number } | null = null;
          if (event.key === "ArrowLeft") movement = { x: -delta, y: 0 };
          if (event.key === "ArrowRight") movement = { x: delta, y: 0 };
          if (event.key === "ArrowUp") movement = { x: 0, y: -delta };
          if (event.key === "ArrowDown") movement = { x: 0, y: delta };
          if (movement === null) return;
          event.preventDefault();
          setApparatusOffset((current) => ({
            x: Math.max(-700, Math.min(700, current.x + movement.x)),
            y: Math.max(-260, Math.min(260, current.y + movement.y)),
          }));
        } : undefined}
      >
        {skin === "physical" ? <PhysicalStatus /> : null}
        <div
          className="bf-machine__apparatus"
          style={skin === "physical" ? { transform: `translate3d(${apparatusOffset.x}px, ${apparatusOffset.y}px, 0)` } : undefined}
        >
          <svg className="bf-machine__traces" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
            {visibleEdges.map((edge) => {
              const i = labMachineEdges.indexOf(edge);
              const tone = edgeTone(edge);
              return (
                <g key={`${edge.from}-${edge.to}`} className="bf-machine__cable" data-kind={edge.kind} data-tone={tone} data-from={edge.from} data-to={edge.to}>
                  <path className="bf-machine__cable-sheath" d={paths[i]} />
                  <path className="bf-machine__cable-core" d={paths[i]} />
                  <path className="bf-machine__cable-highlight" d={paths[i]} />
                </g>
              );
            })}
            {skin === "physical" && resolution === "mid" ? (
              <g className="bf-machine__cable bf-machine__cable--product-publication" data-kind="feeds" data-tone="green">
                <path className="bf-machine__cable-sheath" d="M774 121 H798" />
                <path className="bf-machine__cable-core" d="M774 121 H798" />
                <path className="bf-machine__cable-highlight" d="M774 121 H798" />
              </g>
            ) : null}
          </svg>
          {skin === "physical" && resolution === "mid" ? (
            <div className="bf-machine__lower-deck" aria-hidden="true">
              <span />
            </div>
          ) : null}
          {orderedVisibleNodes.map((node) => <Node key={node.id} node={node} edges={visibleEdges} skin={skin} onOpen={onOpenNode} />)}
        </div>
      </div>
      {skin === "physical" ? <PhysicalLegend /> : null}
      {showSchematic && (
        <details className="bf-machine__schematic">
          <summary>Structure / Mermaid projection</summary>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </details>
      )}
    </section>
  );
}

export type LabMachineResolution = "mid" | "focus";

const apparatusTracePaths = [
  "M245 350 H410",
  "M245 500 H410",
  "M790 385 H900",
  "M520 290 V185 H365",
  "M600 290 V185 H600",
  "M680 290 V185 H835",
  "M470 560 V650",
  "M600 560 V650",
  "M730 560 V650",
  "M955 185 H1080 V300",
  "M1110 365 V455",
  "M1080 520 H925 V700 H500",
];

const physicalTracePaths = [
  "",
  "",
  "",
  "M657 239 V205",
  "M713 285 H915 V205",
  "",
  "M399 205 V239",
  "",
  "",
  "",
  "",
  "",
];

const physicalFocusTracePaths = [
  "",
  "",
  "",
  "M600 395 V355 H546 V319",
  "M750 395 V355 H852 V319",
  "",
  "M186 319 V355 H450 V395",
  "",
  "",
  "",
  "",
  "",
];
