"use client";

import { useEffect, useId, useState } from "react";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import {
  labMachineEdges,
  labMachineMermaid,
  labMachineNodes,
  type LabMachineEdge,
  type LabMachineNode,
} from "./lab-machine-model";
import "./lab-machine.css";

const nodeIcons: Record<string, BfuxIconName> = {
  products: "object",
  publications: "claim",
  applications: "projection",
  method: "contexture",
  pipeline: "trace",
  research: "invariant",
  about: "actor",
  people: "peer",
  governance: "responsibility",
  timeline: "process",
  service: "port",
  "public-value": "consequence",
};

function edgeTone(edge: LabMachineEdge) {
  const source = labMachineNodes.find((node) => node.id === edge.from);
  const target = labMachineNodes.find((node) => node.id === edge.to);
  if (edge.kind === "feeds") return target?.tone ?? source?.tone ?? "slate";
  return source?.tone ?? target?.tone ?? "slate";
}

function Node({ node, edges }: { node: LabMachineNode; edges: LabMachineEdge[] }) {
  const inbound = edges.filter((edge) => edge.to === node.id);
  const outbound = edges.filter((edge) => edge.from === node.id);
  const icon = nodeIcons[node.id] ?? "boundary";

  return (
    <article
      className={`bf-machine-node bf-machine-node--${node.kind}`}
      data-tone={node.tone}
      data-inputs={inbound.length}
      data-outputs={outbound.length}
      style={{ gridArea: node.area }}
    >
      <div className="bf-machine-node__shell" aria-hidden="true" />
      <span className="bf-machine-node__fasteners" aria-hidden="true">
        <i /><i /><i /><i />
      </span>

      <div className="bf-machine-node__face">
        <div className="bf-machine-node__icon-plate" aria-hidden="true">
          <span className="bf-machine-node__icon-well">
            <BfuxIcon name={icon} />
          </span>
        </div>

        <header>
          <span>{node.question}</span>
          <strong>{node.label}</strong>
        </header>

        <div className="bf-machine-node__boundary">
          <small>BOUNDARY</small>
          <p>{node.boundary}</p>
        </div>

        {(node.state || node.meta?.length) && (
          <footer>
            {node.state && (
              <span className="bf-machine-node__state">
                <small>STATE</small>
                {node.state}
              </span>
            )}
            {node.meta?.map((item) => <span key={item}>{item}</span>)}
          </footer>
        )}
      </div>

      {inbound.length > 0 && (
        <div className="bf-machine-node__ports bf-machine-node__ports--in" aria-label={`${inbound.length} incoming interface${inbound.length === 1 ? "" : "s"}`}>
          {inbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}
        </div>
      )}
      {outbound.length > 0 && (
        <div className="bf-machine-node__ports bf-machine-node__ports--out" aria-label={`${outbound.length} outgoing interface${outbound.length === 1 ? "" : "s"}`}>
          {outbound.map((edge) => <i key={`${edge.from}-${edge.to}`} title={`${edge.from} ${edge.relation} ${edge.to}`} data-kind={edge.kind} />)}
        </div>
      )}
    </article>
  );
}

export function LabMachine({ showSchematic = false }: { showSchematic?: boolean }) {
  const id = useId().replaceAll(":", "");
  const [svg, setSvg] = useState("");

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

  return (
    <section className="bf-machine" aria-label="Boundary First Labs machine">
      <div className="bf-machine__title">
        <strong>THE LAB MACHINE</strong>
        <span>Powered by Research. Built for People.</span>
      </div>
      <div className="bf-machine__board">
        <svg className="bf-machine__traces" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
          {labMachineEdges.map((edge, i) => (
            <path
              key={`${edge.from}-${edge.to}`}
              data-kind={edge.kind}
              data-tone={edgeTone(edge)}
              d={tracePaths[i]}
            />
          ))}
        </svg>
        {labMachineNodes.map((node) => <Node key={node.id} node={node} edges={labMachineEdges} />)}
      </div>
      {showSchematic && (
        <details className="bf-machine__schematic">
          <summary>Structure / Mermaid projection</summary>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </details>
      )}
    </section>
  );
}

const tracePaths = [
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
