"use client";

import { useState } from "react";
import { BfuxIcon } from "@/components/bfux-icons";
import { getLabMachineCardContent } from "./lab-machine-content";
import { getLabMachineNode, type LabMachineNode } from "./lab-machine-model";
import { LabMachineObjectCarrier } from "./LabMachineObjectCarrier";
import { LabMachineRelationRail } from "./LabMachineRelationRail";
import { useLabMachineNavigation } from "./LabMachineNavigationContext";
import {
  LabMachineAboutProjection,
  isAboutProjectionMode,
  type AboutProjectionMode,
} from "./LabMachineAboutProjection";
import {
  LabMachineApplicationsProjection,
  isApplicationsProjectionMode,
  type ApplicationsProjectionMode,
} from "./LabMachineApplicationsProjection";
import {
  LabMachineGovernanceProjection,
  isGovernanceProjectionMode,
  type GovernanceProjectionMode,
} from "./LabMachineGovernanceProjection";
import {
  LabMachineMethodProjection,
  isMethodProjectionMode,
  type MethodProjectionMode,
} from "./LabMachineMethodProjection";
import {
  LabMachinePeopleProjection,
  isPeopleProjectionMode,
  type PeopleProjectionMode,
} from "./LabMachinePeopleProjection";
import {
  LabMachinePipelineProjection,
  isPipelineProjectionMode,
  type PipelineProjectionMode,
} from "./LabMachinePipelineProjection";
import {
  LabMachineProductsProjection,
  isProductProjectionMode,
  type ProductProjectionMode,
} from "./LabMachineProductsProjection";
import {
  LabMachinePublicValueProjection,
  isPublicValueProjectionMode,
  type PublicValueProjectionMode,
} from "./LabMachinePublicValueProjection";
import {
  LabMachineResearchProjection,
  isResearchProjectionMode,
  type ResearchProjectionMode,
} from "./LabMachineResearchProjection";
import {
  LabMachineServiceProjection,
  isServiceProjectionMode,
  type ServiceProjectionMode,
} from "./LabMachineServiceProjection";
import {
  LabMachineTimelineProjection,
  isTimelineProjectionMode,
  type TimelineProjectionMode,
} from "./LabMachineTimelineProjection";
import "./lab-machine-detail.css";

type ActiveProjection =
  | { subsystem: "timeline"; mode: TimelineProjectionMode }
  | { subsystem: "products"; mode: ProductProjectionMode }
  | { subsystem: "research"; mode: ResearchProjectionMode }
  | { subsystem: "method"; mode: MethodProjectionMode }
  | { subsystem: "pipeline"; mode: PipelineProjectionMode }
  | { subsystem: "governance"; mode: GovernanceProjectionMode }
  | { subsystem: "about"; mode: AboutProjectionMode }
  | { subsystem: "people"; mode: PeopleProjectionMode }
  | { subsystem: "applications"; mode: ApplicationsProjectionMode }
  | { subsystem: "service"; mode: ServiceProjectionMode }
  | { subsystem: "public-value"; mode: PublicValueProjectionMode }
  | null;

function resolveProjection(subsystem: string, mode: string): ActiveProjection {
  switch (subsystem) {
    case "timeline":
      return isTimelineProjectionMode(mode) ? { subsystem, mode } : null;
    case "products":
      return isProductProjectionMode(mode) ? { subsystem, mode } : null;
    case "research":
      return isResearchProjectionMode(mode) ? { subsystem, mode } : null;
    case "method":
      return isMethodProjectionMode(mode) ? { subsystem, mode } : null;
    case "pipeline":
      return isPipelineProjectionMode(mode) ? { subsystem, mode } : null;
    case "governance":
      return isGovernanceProjectionMode(mode) ? { subsystem, mode } : null;
    case "about":
      return isAboutProjectionMode(mode) ? { subsystem, mode } : null;
    case "people":
      return isPeopleProjectionMode(mode) ? { subsystem, mode } : null;
    case "applications":
      return isApplicationsProjectionMode(mode) ? { subsystem, mode } : null;
    case "service":
      return isServiceProjectionMode(mode) ? { subsystem, mode } : null;
    case "public-value":
      return isPublicValueProjectionMode(mode) ? { subsystem, mode } : null;
    default:
      return null;
  }
}

export function LabMachineDetailPanel({ node, onClose }: { node: LabMachineNode; onClose: () => void }) {
  const content = getLabMachineCardContent(node.id);
  const navigation = useLabMachineNavigation();
  const [activeProjection, setActiveProjection] = useState<ActiveProjection>(null);

  if (!content) return null;

  if (activeProjection?.subsystem === "timeline") return <LabMachineTimelineProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "products") return <LabMachineProductsProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "research") return <LabMachineResearchProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "method") return <LabMachineMethodProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "pipeline") return <LabMachinePipelineProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "governance") return <LabMachineGovernanceProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "about") return <LabMachineAboutProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "people") return <LabMachinePeopleProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "applications") return <LabMachineApplicationsProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "service") return <LabMachineServiceProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;
  if (activeProjection?.subsystem === "public-value") return <LabMachinePublicValueProjection initialMode={activeProjection.mode} onBack={() => setActiveProjection(null)} onClose={onClose} />;

  return (
    <section className="bf-machine-detail" data-tone={node.tone} aria-label={`${node.label} institutional detail`}>
      <header className="bf-machine-detail__header">
        <div className="bf-machine-detail__identity">
          <span className="bf-machine-detail__icon"><BfuxIcon name="inspect" /></span>
          <div><p>{content.eyebrow}</p><h2>{content.label}</h2><strong>{content.framingQuestion}</strong></div>
        </div>
        <button type="button" onClick={onClose} aria-label={`Close ${node.label} detail`}>CLOSE ×</button>
      </header>

      <div className="bf-machine-detail__orientation">
        <div><small>SYSTEM ROLE</small><strong>{content.systemRole}</strong></div>
        <p>{content.orientation}</p><p>{content.institutionalPurpose}</p>
      </div>

      <LabMachineObjectCarrier />
      <LabMachineRelationRail nodeId={node.id} />
      {navigation ? <TraversalTrail /> : null}

      <div className="bf-machine-detail__grid">
        <section className="bf-machine-detail__module">
          <header><span>01</span><h3>BOUNDARY</h3></header>
          <div className="bf-machine-detail__split">
            <div><small>CONTAINS</small><ul>{content.boundary.contains.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><small>EXCLUDES</small><ul>{content.boundary.excludes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>
        <section className="bf-machine-detail__module bf-machine-detail__module--process">
          <header><span>02</span><h3>PROCESS</h3></header>
          <div className="bf-machine-detail__process">
            <ProcessColumn label="ENTERS AS" items={content.process.entersAs} /><span className="bf-machine-detail__arrow" aria-hidden="true">→</span>
            <ProcessColumn label="TRANSFORMS THROUGH" items={content.process.transformsThrough} /><span className="bf-machine-detail__arrow" aria-hidden="true">→</span>
            <ProcessColumn label="EXITS AS" items={content.process.exitsAs} />
          </div>
        </section>
        <section className="bf-machine-detail__module"><header><span>03</span><h3>RATIONALE</h3></header><ol className="bf-machine-detail__numbered">{content.rationale.map((item) => <li key={item}>{item}</li>)}</ol></section>
        <section className="bf-machine-detail__module"><header><span>04</span><h3>VALIDATION SIGNALS</h3></header><ul className="bf-machine-detail__signals">{content.validationSignals.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>

      <section className="bf-machine-detail__views" aria-label={`${node.label} available views`}>
        <header><small>AVAILABLE PROJECTIONS</small><h3>Inspect this subsystem another way</h3></header>
        <div>{content.views.map((view) => {
          const projection = resolveProjection(node.id, view.id);
          const available = projection !== null;
          return (
            <article key={view.id} data-view-id={view.id}>
              <span>PROJECTION</span><strong>{view.label}</strong><p>{view.purpose}</p>
              <button type="button" disabled={!available} title={available ? `Open ${view.label}` : "Projection component pending"} onClick={() => {
                if (projection) setActiveProjection(projection);
              }}>{available ? "OPEN" : "PLANNED"}</button>
            </article>
          );
        })}</div>
      </section>

      <footer className="bf-machine-detail__takeaway"><small>INSTITUTIONAL TAKEAWAY</small><p>{content.takeaway}</p></footer>
    </section>
  );
}

function TraversalTrail() {
  const navigation = useLabMachineNavigation();
  if (!navigation) return null;
  const focus = getLabMachineNode(navigation.focusId);
  return (
    <section className="bf-machine-trail" aria-label="Current Lab Machine traversal">
      <header>
        <div><small>BOUND PATH</small><strong>{focus?.label ?? navigation.focusLabel} → {getLabMachineNode(navigation.currentNodeId)?.label ?? navigation.focusLabel}</strong></div>
        <div><button type="button" disabled={!navigation.trail.length} onClick={navigation.rewind}>BACK ONE RELATION</button><button type="button" disabled={!navigation.trail.length} onClick={navigation.clearTrail}>RESET TO FOCUS</button></div>
      </header>
      <div className="bf-machine-trail__steps">
        <span className="bf-machine-trail__origin">{focus?.label ?? navigation.focusLabel}</span>
        {navigation.trail.map((step, index) => <span className="bf-machine-trail__step" key={`${step.edgeKey}-${index}`}><b>{step.direction === "forward" ? "→" : "←"}</b><small>{step.relation}</small><strong>{getLabMachineNode(step.to)?.label ?? step.to}</strong></span>)}
      </div>
    </section>
  );
}

function ProcessColumn({ label, items }: { label: string; items: string[] }) {
  return <div><small>{label}</small><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
