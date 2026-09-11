"use client";

import { representationLabBillboardNode } from "./lab-machine-model";
import "./representation-lab-billboard-card.css";
import "./representation-lab-billboard-layout.css";
import "./representation-lab-billboard-polish.css";

export function RepresentationLabBillboardCard() {
  const node = representationLabBillboardNode;

  return (
    <a
      className="bf-machine-node bf-machine-node--billboard"
      data-machine-layer="node"
      data-machine-node-interactive="true"
      data-node-id={node.id}
      data-tone={node.tone}
      href={node.href ?? "/playground/representation-lab"}
      aria-label={`Open ${node.label}, an interactive Boundary First introduction`}
    >
      <div className="bf-machine-node__mount" aria-hidden="true" />
      <div className="bf-machine-node__shell" aria-hidden="true" />
      <span className="bf-machine-node__fasteners" aria-hidden="true">
        <i /><i /><i /><i />
      </span>

      <div className="bf-machine-node__face bf-machine-billboard__face">
        <div className="bf-machine-billboard__visual" aria-hidden="true">
          <svg viewBox="10 10 160 84" role="presentation">
            <defs>
              <filter id="billboard-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="billboard-arrow-blue" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#73b6ff" />
              </marker>
              <marker id="billboard-arrow-violet" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#bd74ff" />
              </marker>
              <marker id="billboard-arrow-cyan" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#4dd0e1" />
              </marker>
            </defs>

            <rect x="13" y="13" width="154" height="78" rx="3" className="bf-machine-billboard__maze-frame" />
            <path d="M38 13v22h25v18H40v18h38v20M93 13v24h27v20h-18v34M120 37h47M78 53h24M13 71h27" className="bf-machine-billboard__walls" />

            <circle cx="24" cy="80" r="4" className="bf-machine-billboard__start" filter="url(#billboard-soft-glow)" />
            <circle cx="155" cy="24" r="6" className="bf-machine-billboard__goal-ring" filter="url(#billboard-soft-glow)" />
            <circle cx="155" cy="24" r="2" className="bf-machine-billboard__goal" />

            <path
              d="M27 80H48V62H73V45H91V29H123V24H146"
              className="bf-machine-billboard__route bf-machine-billboard__route--blue"
              markerEnd="url(#billboard-arrow-blue)"
            />
            <path
              d="M27 80H61V76H91V61H126V43H146V29"
              className="bf-machine-billboard__route bf-machine-billboard__route--violet"
              markerEnd="url(#billboard-arrow-violet)"
            />
            <path
              d="M27 80 L48 71 L61 68 L73 53 L91 60 L108 45 L126 52 L146 36"
              className="bf-machine-billboard__route bf-machine-billboard__route--cyan"
              markerEnd="url(#billboard-arrow-cyan)"
            />
          </svg>

          <div className="bf-machine-billboard__legend">
            <span data-tone="blue"><i /> JOB</span>
            <span data-tone="cyan"><i /> METHOD</span>
            <span data-tone="violet"><i /> MODEL</span>
            <span data-tone="green"><i /> GOAL</span>
          </div>
        </div>

        <div className="bf-machine-billboard__copy">
          <div className="bf-machine-billboard__eyebrow">
            <span>{node.question}</span>
            <small>INTERACTIVE</small>
          </div>

          <strong>
            <span>One World, Many</span>
            <span>Representations</span>
          </strong>
          <p>{node.boundary}</p>

          <span className="bf-machine-billboard__cta">
            <b>TRY THE LAB <i>→</i></b>
          </span>
        </div>

        <div className="bf-machine-billboard__cue-row" aria-hidden="true">
          <span><i data-tone="blue" /> ONE WORLD</span>
          <span><i data-tone="violet" /> SWAP METHOD</span>
          <span><i data-tone="green" /> SEE REPRESENTATION</span>
        </div>
      </div>
    </a>
  );
}