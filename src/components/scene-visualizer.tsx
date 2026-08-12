import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CircleDot,
  FileCheck2,
  GitBranch,
  Layers3,
  Network,
  RefreshCw,
  Scale,
  ShieldCheck,
  Waypoints,
  Wrench,
} from "lucide-react";
import { asString } from "@/lib/content";

type DomainNode = {
  id: string;
  label: string;
  role?: string | string[];
  icon?: React.ElementType;
  virtual?: boolean;
  [key: string]: unknown;
};

interface SceneVisualizerProps {
  scene: {
    id: string;
    number: number;
    eyebrow: string;
    visualMode?: string;
    layoutPreset?: string;
    terms?: string[];
  };
  sceneNodes: DomainNode[];
  onNodeClick: (id: string) => void;
}

const METHOD_TERMS = ["Boundary", "Invariant", "Defect", "Repair"];

export function SceneVisualizer({
  scene,
  sceneNodes,
  onNodeClick,
}: SceneVisualizerProps) {
  const legendTerms =
    scene.terms && scene.terms.length > 0
      ? scene.terms.slice(0, 4)
      : METHOD_TERMS;
  const visual = renderScene(
    scene.layoutPreset,
    sceneNodes,
    onNodeClick,
  );

  return (
    <div className="flex min-h-[30rem] flex-col">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">
        <span>{scene.visualMode?.replaceAll("-", " ") ?? "Scene"}</span>
        <span>
          {sceneNodes.length > 0
            ? `${sceneNodes.length} reference${sceneNodes.length === 1 ? "" : "s"}`
            : "Conceptual frame"}
        </span>
      </div>

      <div className="flex min-h-[21rem] flex-1 items-center py-6">
        {visual}
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        aria-label="Scene vocabulary"
      >
        {legendTerms.map((term, index) => {
          const icons = [CircleDot, ShieldCheck, GitBranch, Network];
          const Icon = icons[index % icons.length];
          return (
            <div
              className="border-t border-primary-foreground/30 pt-3"
              key={term}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="mt-2 block font-mono text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-primary-foreground/80">
                {term}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderScene(
  layoutPreset: string | undefined,
  nodes: DomainNode[],
  onNodeClick: (id: string) => void,
) {
  switch (layoutPreset) {
    case "single-consequence":
      return <SingleConsequence />;
    case "four-question-wheel":
      return <FourQuestionWheel />;
    case "lineage-roots":
      return <LineageRoots nodes={nodes} onNodeClick={onNodeClick} />;
    case "many-to-one-convergence":
      return (
        <ConvergenceDiagram nodes={nodes} onNodeClick={onNodeClick} />
      );
    case "dual-node-overlap":
      return <DualPractice nodes={nodes} onNodeClick={onNodeClick} />;
    case "on-ramp-chooser":
      return (
        <HubDiagram
          centerLabel="Shared mechanics"
          nodes={nodes}
          onNodeClick={onNodeClick}
        />
      );
    case "formal-object-explorer":
      return (
        <HubDiagram
          centerId="distinction-space"
          centerLabel="Distinction Space"
          nodes={nodes}
          onNodeClick={onNodeClick}
        />
      );
    case "faceted-object":
      return (
        <HubDiagram
          centerId="boundary-theory"
          centerLabel="Boundary Theory"
          nodes={nodes}
          onNodeClick={onNodeClick}
        />
      );
    case "mechanics-cycle":
      return (
        <NodeCycle
          nodes={nodes}
          onNodeClick={onNodeClick}
          centerLabel="Inspect · specify · apply · repair"
        />
      );
    case "path-chooser":
      return (
        <HubDiagram
          centerLabel="Choose by question"
          nodes={nodes}
          onNodeClick={onNodeClick}
        />
      );
    case "program-project-product-evidence-loop":
      return (
        <FixedCycle
          items={["Program", "Project", "Product", "Evidence"]}
          centerLabel="Promotion requires contact"
        />
      );
    case "collaboration-relations":
      return (
        <FixedCycle
          items={[
            "Participation",
            "Advice",
            "Review",
            "Funding",
            "Authorship",
            "Authority",
          ]}
          centerLabel="Declare role, scope, and closure"
        />
      );
    case "evidence-pipeline":
      return (
        <Pipeline
          items={[
            "Source",
            "Claim",
            "Formalize",
            "Test",
            "Criticize",
            "Promote or repair",
          ]}
        />
      );
    case "purpose-power-repair-cycle":
      return (
        <FixedCycle
          items={[
            "Purpose",
            "Invariants",
            "Authority",
            "Gates",
            "Standing",
            "Repair",
          ]}
          centerLabel="Continuity"
        />
      );
    case "canonical-atlas":
      return (
        <HubDiagram
          centerId="identity"
          centerLabel="Boundary First Labs"
          nodes={nodes}
          onNodeClick={onNodeClick}
        />
      );
    default:
      return <NodeGrid nodes={nodes} onNodeClick={onNodeClick} />;
  }
}

function NodeCard({
  node,
  onNodeClick,
  compact = false,
}: {
  node: DomainNode;
  onNodeClick: (id: string) => void;
  compact?: boolean;
}) {
  const Icon = node.icon ?? CircleDot;
  const className = `group grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center border border-primary-foreground/25 bg-primary-foreground/[0.06] backdrop-blur-sm transition-colors ${
    compact ? "gap-2 p-2.5" : "gap-3 p-3"
  }`;
  const content = (
    <>
      <span
        className={`flex items-center justify-center border border-primary-foreground/25 ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Icon
          className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] font-semibold uppercase leading-3 tracking-[0.1em] text-primary-foreground/60">
          {asString(node.role, node.virtual ? "Concept" : "Record")}
        </span>
        <strong
          className={`mt-1 block font-serif font-semibold leading-tight ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          {node.label}
        </strong>
      </span>
      {!node.virtual && (
        <ArrowRight
          className="h-3.5 w-3.5 opacity-45 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (node.virtual) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      className={`${className} hover:bg-primary-foreground/[0.13]`}
      href={`/domain/${node.id}`}
      onClick={() => onNodeClick(node.id)}
    >
      {content}
    </Link>
  );
}

function NodeGrid({
  nodes,
  onNodeClick,
}: {
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
}) {
  if (nodes.length === 0) {
    return (
      <div className="grid w-full place-items-center border border-dashed border-primary-foreground/30 p-10 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground/65">
        This scene is conceptual; continue to reveal its records.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {nodes.map((node) => (
        <NodeCard
          compact
          key={node.id}
          node={node}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  );
}

function SingleConsequence() {
  return (
    <div
      className="grid w-full place-items-center"
      role="img"
      aria-label="A system representation divides what is included from what is excluded, while excluded consequences return to the system."
    >
      <div className="w-full max-w-md">
        <div className="mx-auto w-fit border border-primary-foreground/35 bg-primary-foreground/[0.07] px-6 py-4 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary-foreground/60">
            Representation
          </span>
          <strong className="mt-1 block font-serif text-xl">
            The system
          </strong>
        </div>
        <ArrowDown
          className="mx-auto my-4 h-5 w-5 text-primary-foreground/55"
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-primary-foreground bg-primary-foreground p-4 text-center text-primary">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
              Included
            </span>
            <span className="mt-2 block text-xs">Visible · governable</span>
          </div>
          <div className="border border-dashed border-primary-foreground/45 p-4 text-center text-primary-foreground/65">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
              Excluded
            </span>
            <span className="mt-2 block text-xs">Hidden · displaced</span>
          </div>
        </div>
        <div className="mt-3 border-l-2 border-amber-300/70 bg-amber-200/10 px-4 py-3 text-sm text-primary-foreground/80">
          Excluded consequence returns as defect, burden, risk, or harm.
        </div>
      </div>
    </div>
  );
}

function FourQuestionWheel() {
  const questions = [
    ["Boundary", "What is included?"],
    ["Invariant", "What must survive?"],
    ["Defect", "Where can closure fail?"],
    ["Repair", "Who can restore it?"],
  ];
  return (
    <div
      className="grid w-full place-items-center"
      role="img"
      aria-label="Boundary First's four questions: boundary, invariant, defect, and repair."
    >
      <div className="grid w-full max-w-lg grid-cols-2 gap-2">
        {questions.map(([term, question], index) => (
          <div
            className="border border-primary-foreground/30 bg-primary-foreground/[0.06] p-4"
            key={term}
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary-foreground/60">
              0{index + 1}
            </span>
            <strong className="mt-2 block font-serif text-lg">{term}</strong>
            <span className="mt-1 block text-xs text-primary-foreground/70">
              {question}
            </span>
          </div>
        ))}
        <div className="col-span-2 mx-auto -mt-1 flex items-center gap-2 border border-primary-foreground bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em]">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Boundary First
        </div>
      </div>
    </div>
  );
}

function LineageRoots({
  nodes,
  onNodeClick,
}: {
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
}) {
  return (
    <div
      className="w-full"
      role="group"
      aria-label="Foundational lineages converging on Boundary First"
    >
      <div className="mx-auto w-fit border border-primary-foreground/35 bg-primary px-5 py-3 text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-primary-foreground/60">
          Present synthesis
        </span>
        <strong className="mt-1 block font-serif text-lg">
          Boundary First
        </strong>
      </div>
      <div className="mx-auto h-6 w-px bg-primary-foreground/35" />
      <div className="grid grid-cols-2 gap-2 border-t border-primary-foreground/30 pt-4 sm:grid-cols-3">
        {nodes.map((node) => (
          <NodeCard
            compact
            key={node.id}
            node={node}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
    </div>
  );
}

function ConvergenceDiagram({
  nodes,
  onNodeClick,
}: {
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
}) {
  const target =
    nodes.find((node) => node.id === "formal-grammars") ?? nodes[0];
  const sources = nodes.filter((node) => node.id !== target?.id);
  return (
    <div className="grid w-full items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(9rem,0.6fr)]">
      <div className="grid grid-cols-2 gap-2">
        {sources.map((node) => (
          <NodeCard
            compact
            key={node.id}
            node={node}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
      <ArrowRight
        className="mx-auto h-5 w-5 rotate-90 text-primary-foreground/55 sm:rotate-0"
        aria-hidden="true"
      />
      {target && (
        <div className="border border-primary-foreground bg-primary-foreground p-4 text-center text-primary">
          <Waypoints className="mx-auto h-5 w-5" aria-hidden="true" />
          <span className="mt-2 block font-mono text-[9px] font-bold uppercase tracking-[0.12em]">
            Explicit apparatus
          </span>
          <strong className="mt-1 block font-serif text-lg">
            {target.label}
          </strong>
        </div>
      )}
    </div>
  );
}

function DualPractice({
  nodes,
  onNodeClick,
}: {
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
}) {
  return (
    <div className="w-full">
      <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
        {nodes.slice(0, 1).map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            onNodeClick={onNodeClick}
          />
        ))}
        <div className="grid place-items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary text-center font-mono text-[9px] font-bold uppercase leading-4 tracking-[0.1em]">
            Shared
            <br />
            mechanics
          </div>
        </div>
        {nodes.slice(1, 2).map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-sm text-center text-xs leading-5 text-primary-foreground/65">
        Independent inquiry and operational practice expose the same
        representational failure from different sides.
      </p>
    </div>
  );
}

function HubDiagram({
  centerId,
  centerLabel,
  nodes,
  onNodeClick,
}: {
  centerId?: string;
  centerLabel: string;
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
}) {
  const center = centerId
    ? nodes.find((node) => node.id === centerId)
    : undefined;
  const satellites = nodes.filter((node) => node.id !== center?.id);
  return (
    <div className="w-full">
      <div className="mx-auto flex w-fit min-w-40 items-center justify-center gap-2 rounded-full border border-primary-foreground bg-primary-foreground px-5 py-3 text-center text-primary">
        <CircleDot className="h-4 w-4" aria-hidden="true" />
        <strong className="font-serif text-base">{centerLabel}</strong>
      </div>
      <div className="mx-auto h-5 w-px bg-primary-foreground/35" />
      <div className="grid grid-cols-2 gap-2 border-t border-primary-foreground/30 pt-4 sm:grid-cols-3">
        {satellites.map((node) => (
          <NodeCard
            compact
            key={node.id}
            node={node}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
      {center && !center.virtual && (
        <Link
          className="mx-auto mt-3 flex w-fit items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.11em] text-primary-foreground/70 hover:text-primary-foreground"
          href={`/domain/${center.id}`}
          onClick={() => onNodeClick(center.id)}
        >
          Open the center record
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function NodeCycle({
  nodes,
  onNodeClick,
  centerLabel,
}: {
  nodes: DomainNode[];
  onNodeClick: (id: string) => void;
  centerLabel: string;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2">
        {nodes.slice(0, 4).map((node, index) => (
          <div className="relative" key={node.id}>
            <span className="absolute right-2 top-2 z-10 font-mono text-[9px] text-primary-foreground/45">
              0{index + 1}
            </span>
            <NodeCard
              node={node}
              onNodeClick={onNodeClick}
              compact
            />
          </div>
        ))}
      </div>
      <div className="mx-auto -mt-1 flex w-fit items-center gap-2 border border-primary-foreground/35 bg-primary px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.11em]">
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        {centerLabel}
      </div>
    </div>
  );
}

function FixedCycle({
  items,
  centerLabel,
}: {
  items: string[];
  centerLabel: string;
}) {
  const icons = [Layers3, Wrench, Network, FileCheck2, Scale, RefreshCw];
  return (
    <div
      className="w-full"
      role="img"
      aria-label={`${items.join(", ")} form a cycle around ${centerLabel}.`}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              className="border border-primary-foreground/28 bg-primary-foreground/[0.06] p-3"
              key={item}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[9px] text-primary-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <strong className="mt-3 block font-serif text-base">
                {item}
              </strong>
            </div>
          );
        })}
      </div>
      <div className="mx-auto -mt-1 flex w-fit items-center gap-2 border border-primary-foreground bg-primary-foreground px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.11em] text-primary">
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        {centerLabel}
      </div>
    </div>
  );
}

function Pipeline({ items }: { items: string[] }) {
  return (
    <div
      className="w-full"
      role="img"
      aria-label={`Evidence pipeline: ${items.join(", ")}.`}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item, index) => (
          <div
            className="relative border border-primary-foreground/28 bg-primary-foreground/[0.06] p-3"
            key={item}
          >
            <span className="font-mono text-[9px] text-primary-foreground/45">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="mt-2 block font-serif text-base">
              {item}
            </strong>
            {index < items.length - 1 && (
              <ArrowRight
                className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 bg-primary text-primary-foreground/60 sm:block"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 border-t border-primary-foreground/30 pt-3 font-mono text-[9px] font-bold uppercase tracking-[0.11em] text-primary-foreground/65">
        <FileCheck2 className="h-4 w-4" aria-hidden="true" />
        Authority follows evidence; proximity does not promote a claim
      </div>
    </div>
  );
}
