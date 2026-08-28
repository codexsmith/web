"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import legacySource from "@/content/lab-machine-governed-objects.json";
import registrySource from "@/content/lab-machine-object-registry.json";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import { LabMachineDetailPanel } from "./LabMachineDetailPanel";
import { LabMachineNavigationProvider, type LabMachineTraversalStep } from "./LabMachineNavigationContext";
import {
  getLabMachineConnectingEdge,
  getLabMachineNode,
  labMachineEdgeKey,
  labMachineEdges,
  labMachineMermaid,
  labMachineNodes,
  type LabMachineEdge,
  type LabMachineNode,
} from "./lab-machine-model";
import "./lab-machine.css";
import "./lab-machine-physical.css";
import "./lab-machine-main-card-port.css";
import "./lab-machine-selection.css";
import "./lab-machine-traversal.css";

type ObjectSummary = { id: string; label: string; route: string[] };
const legacy = legacySource as { defaultObjectId: string; objects: ObjectSummary[] };
const registry = registrySource as { objects: ObjectSummary[] };
const governedObjects = [...legacy.objects, ...registry.objects];

const nodeIcons: Record<string, BfuxIconName> = {
  products: "object", publications: "claim", applications: "projection", method: "contexture", pipeline: "trace", research: "invariant",
  about: "actor", people: "peer", governance: "responsibility", timeline: "process", service: "port", "public-value": "consequence",
};

const nodeNumbers: Record<string, number> = { products:1, publications:2, pipeline:3, applications:4, method:5, people:6, governance:7, timeline:8, about:9 };

function edgeTone(edge: LabMachineEdge) {
  const source = labMachineNodes.find((node) => node.id === edge.from);
  const target = labMachineNodes.find((node) => node.id === edge.to);
  if (edge.kind === "feeds") return target?.tone ?? source?.tone ?? "slate";
  return source?.tone ?? target?.tone ?? "slate";
}

function Node({ node, edges, selected, related, visited, objectRoute, onSelect }: { node: LabMachineNode; edges: LabMachineEdge[]; selected: boolean; related: boolean; visited: boolean; objectRoute: boolean; onSelect: () => void }) {
  const inbound = edges.filter((edge) => edge.to === node.id);
  const outbound = edges.filter((edge) => edge.from === node.id);
  const icon = nodeIcons[node.id] ?? "boundary";
  const number = nodeNumbers[node.id];
  return <article className={`bf-machine-node bf-machine-node--${node.kind}`} data-node-id={node.id} data-tone={node.tone} data-inputs={inbound.length} data-outputs={outbound.length} data-selected={selected ? "true" : "false"} data-related={related ? "true" : "false"} data-visited={visited ? "true" : "false"} data-object-route={objectRoute ? "true" : "false"} style={{ gridArea: node.area }} role="button" tabIndex={0} aria-pressed={selected} aria-label={`Open ${node.label}`} onClick={onSelect} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(); } }}>
    <div className="bf-machine-node__mount" aria-hidden="true" /><div className="bf-machine-node__shell" aria-hidden="true" /><span className="bf-machine-node__fasteners" aria-hidden="true"><i /><i /><i /><i /></span>
    <div className="bf-machine-node__face"><div className="bf-machine-node__icon-plate" aria-hidden="true"><span className="bf-machine-node__icon-well"><BfuxIcon name={icon} /></span></div><header><span>{number ? `${number}. ${node.question}` : node.question}</span><strong>{node.label}</strong></header><div className="bf-machine-node__boundary"><small>BOUNDARY</small><p>{node.boundary}</p></div>{(node.state || node.meta?.length) && <footer>{node.state && <span className="bf-machine-node__state"><small>STATE</small>{node.state}</span>}{node.meta?.map((item) => <span key={item}>{item}</span>)}</footer>}</div>
    {inbound.length > 0 && <div className="bf-machine-node__ports bf-machine-node__ports--in" aria-label={`${inbound.length} incoming interface${inbound.length === 1 ? "" : "s"}`}>{inbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}</div>}
    {outbound.length > 0 && <div className="bf-machine-node__ports bf-machine-node__ports--out" aria-label={`${outbound.length} outgoing interface${outbound.length === 1 ? "" : "s"}`}>{outbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}</div>}
  </article>;
}

function PhysicalStatus({ trailLength, objectLabel }: { trailLength: number; objectLabel?: string }) {
  return <aside className="bf-machine__status" aria-label="Lab Machine graph status"><strong>THE LAB MACHINE</strong><small>{objectLabel ? `Carrying: ${objectLabel}` : "Powered by Research. Built for People."}</small><dl><div><dt>CORE</dt><dd>RESEARCH</dd></div><div><dt>MODULES</dt><dd>{labMachineNodes.length}</dd></div><div><dt>PATH</dt><dd>{trailLength}</dd></div></dl></aside>;
}

function PhysicalLegend() {
  const items: Array<[BfuxIconName,string,string]> = [["boundary","BOUNDARY","Containment"],["port","PORT","Interface"],["trace","TRACE","Relation"],["gate","GATE","Condition"],["state","STATE","Observed"],["transition","COMMAND","Action"],["inspect","THROUGH","Inspect deeper"]];
  return <footer className="bf-machine__legend" aria-label="Boundary First visual grammar legend"><strong>LEGEND · BOUNDARY-FIRST VISUAL GRAMMAR</strong><div>{items.map(([icon,label,detail]) => <span key={label}><BfuxIcon name={icon} /><b>{label}</b><small>{detail}</small></span>)}</div><p>ORIENT → PROBE → BIND → ACT</p></footer>;
}

export function LabMachine({ showSchematic = false, skin = "physical", initialNodeId }: { showSchematic?: boolean; skin?: "apparatus" | "physical"; initialNodeId?: string }) {
  const id = useId().replaceAll(":", "");
  const router = useRouter();
  const initialNode = getLabMachineNode(initialNodeId);
  const [svg, setSvg] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(initialNode?.id ?? null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(initialNode?.id ?? null);
  const [trail, setTrail] = useState<LabMachineTraversalStep[]>([]);
  const [activeObjectId, setActiveObjectId] = useState<string | null>(legacy.defaultObjectId);
  const selectedNode = getLabMachineNode(selectedNodeId);
  const focusNode = getLabMachineNode(focusNodeId);
  const activeObject = governedObjects.find((object) => object.id === activeObjectId);

  useEffect(() => {
    if (!showSchematic) return;
    let live = true;
    import("mermaid").then(({ default: mermaid }) => { mermaid.initialize({ startOnLoad:false, theme:"dark", securityLevel:"strict", flowchart:{ curve:"stepAfter", htmlLabels:false } }); return mermaid.render(`lab-machine-${id}`, labMachineMermaid()); }).then((result) => { if (live) setSvg(result.svg); });
    return () => { live = false; };
  }, [id, showSchematic]);

  const navigateTo = (nodeId: string) => {
    if (!selectedNodeId) { setSelectedNodeId(nodeId); setFocusNodeId(nodeId); setTrail([]); return; }
    if (nodeId === selectedNodeId) return;
    const edge = getLabMachineConnectingEdge(selectedNodeId, nodeId);
    if (!edge) { setSelectedNodeId(nodeId); setFocusNodeId(nodeId); setTrail([]); return; }
    setTrail((current) => [...current, { edgeKey:labMachineEdgeKey(edge), from:selectedNodeId, to:nodeId, relation:edge.relation, kind:edge.kind, direction:edge.from === selectedNodeId ? "forward" : "reverse" }]);
    setSelectedNodeId(nodeId);
  };

  const openCard = (nodeId: string) => {
    navigateTo(nodeId);
    const params = new URLSearchParams(window.location.search);
    params.set("skin", skin);
    params.set("section", nodeId);
    router.push(`/world?${params.toString()}`);
  };

  const loadObject = (objectId: string) => {
    const object = governedObjects.find((candidate) => candidate.id === objectId);
    setActiveObjectId(objectId);
    setTrail([]);
    const entry = object?.route[0];
    if (entry) { setSelectedNodeId(entry); setFocusNodeId(entry); }
  };

  const rewind = () => { const previous = trail[trail.length - 1]; if (!previous) return; setSelectedNodeId(previous.from); setTrail((current) => current.slice(0,-1)); };
  const clearTrail = () => { if (focusNodeId) setSelectedNodeId(focusNodeId); setTrail([]); };

  const activeEdgeKeys = new Set(trail.map((step) => step.edgeKey));
  const relatedNodeIds = new Set(selectedNodeId ? labMachineEdges.flatMap((edge) => edge.from === selectedNodeId ? [edge.to] : edge.to === selectedNodeId ? [edge.from] : []) : []);
  const visitedNodeIds = new Set([focusNodeId, ...trail.flatMap((step) => [step.from, step.to])].filter(Boolean));
  const objectRouteIds = new Set(activeObject?.route ?? []);
  const objectRouteEdgeKeys = new Set((activeObject?.route ?? []).slice(0,-1).flatMap((nodeId,index) => { const edge = getLabMachineConnectingEdge(nodeId, activeObject!.route[index + 1]); return edge ? [labMachineEdgeKey(edge)] : []; }));
  const paths = skin === "physical" ? physicalTracePaths : apparatusTracePaths;
  const navigationValue = { focusId:focusNodeId ?? selectedNodeId ?? "", focusLabel:focusNode?.label ?? selectedNode?.label ?? "Lab Machine", currentNodeId:selectedNodeId, trail, activeObjectId, navigateTo, rewind, clearTrail, setActiveObjectId, loadObject };

  return <LabMachineNavigationProvider value={navigationValue}><section className="bf-machine" data-skin={skin} aria-label="Boundary First Labs machine">
    <div className="bf-machine__title"><strong>THE LAB MACHINE</strong><span>Powered by Research. Built for People.</span></div>
    <div className="bf-machine__board">
      {skin === "physical" ? <PhysicalStatus trailLength={trail.length} objectLabel={activeObject?.label} /> : null}
      <svg className="bf-machine__traces" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">{labMachineEdges.map((edge,i) => { const tone=edgeTone(edge); const active=activeEdgeKeys.has(labMachineEdgeKey(edge)); const adjacent=selectedNodeId===edge.from || selectedNodeId===edge.to; const objectRoute=objectRouteEdgeKeys.has(labMachineEdgeKey(edge)); return <g key={`${edge.from}-${edge.to}`} className="bf-machine__cable" data-kind={edge.kind} data-tone={tone} data-active={active?"true":"false"} data-adjacent={adjacent?"true":"false"} data-object-route={objectRoute?"true":"false"}><path className="bf-machine__cable-sheath" d={paths[i]} /><path className="bf-machine__cable-core" d={paths[i]} /><path className="bf-machine__cable-highlight" d={paths[i]} /></g>; })}</svg>
      {labMachineNodes.map((node) => <Node key={node.id} node={node} edges={labMachineEdges} selected={selectedNodeId===node.id} related={relatedNodeIds.has(node.id)} visited={visitedNodeIds.has(node.id)} objectRoute={objectRouteIds.has(node.id)} onSelect={() => openCard(node.id)} />)}
    </div>
    {skin === "physical" ? <PhysicalLegend /> : null}
    {selectedNode ? <LabMachineDetailPanel key={selectedNode.id} node={selectedNode} onClose={() => { setSelectedNodeId(null); setFocusNodeId(null); setTrail([]); const params = new URLSearchParams(window.location.search); params.delete("section"); router.push(`/world?${params.toString()}`); }} /> : null}
    {showSchematic && <details className="bf-machine__schematic"><summary>Structure / Mermaid projection</summary><div dangerouslySetInnerHTML={{ __html:svg }} /></details>}
  </section></LabMachineNavigationProvider>;
}

const apparatusTracePaths = ["M245 350 H410","M245 500 H410","M790 385 H900","M520 290 V185 H365","M600 290 V185 H600","M680 290 V185 H835","M470 560 V650","M600 560 V650","M730 560 V650","M955 185 H1080 V300","M1110 365 V455","M1080 520 H925 V700 H500","M505 145 H760"];
const physicalTracePaths = ["M250 335 H330 V395 H405","M250 555 H330 V470 H405","M795 390 H760","M505 300 V260 H395 V225","M590 300 V230","M675 300 V260 H770 V225","M430 600 V565 H500 V530","M590 600 V530","M750 600 V565 H680 V530","M965 155 H1040 V205","M1090 230 V430","M1040 485 H930 V650 H520","M500 118 H750"];
