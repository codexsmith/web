"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
    BookOpen,
    BrainCircuit,
    CircleDot,
    Compass,
    FileText,
    Globe2,
    Hammer,
    Layers3,
    Orbit,
    Sparkles,
} from "lucide-react";

export type NodeId = 
  | "identity"
  | "computer-science"
  | "bfe"
  | "agency"
  | "applied-systems"
  | "public-domain"
  | "ai-forge"
  | "corpus"
  | "essays"
  | "theory";

export type GraphNode = {
  id: NodeId;
  label: string;
  short: string;
  title: string;
  body: string;
  icon: React.ElementType; // Lucide icon
  mapIcon: string; // text icon
  homeX: number;
  homeY: number;
  homeR: number;
  mapX: number; 
  mapY: number;
  mapR: number;
  tone?: string;
  facets: string[]; // used as children on map too
  takeaways: string[];
};

export const graphNodes: GraphNode[] = [
  {
    id: "identity",
    label: "Boundary First Thinking",
    short: "A systems practice centered on boundaries, agency, and invariants.",
    title: "Boundary First Thinking.",
    body: "This site introduces a body of work about systems, representation, agency, engineering, AI, and public consequence. The method begins by identifying boundaries, constraints, invariants, interfaces, and responsibilities before implementation.",
    icon: CircleDot,
    mapIcon: "◎",
    homeX: 0,
    homeY: 0,
    homeR: 156,
    mapX: 0,
    mapY: 0,
    mapR: 94,
    tone: "primary",
    facets: ["Representational Mechanics", "Executable Representations", "Agency", "Applied Systems", "Public Domain"],
    takeaways: [
      "Boundaries are conditions of freedom, safety, and trust.",
      "Systems emerge from method, not accident.",
      "AI amplifies agency; it does not replace it.",
      "The public good is the measure that matters.",
    ],
  },
  {
    id: "computer-science",
    label: "Representational Mechanics",
    short: "Software, computation, representation, complexity, systems design.",
    title: "Representational Mechanics.",
    body: "This lane covers software architecture, data models, algorithms, complexity, knowledge graphs, AI tooling, and the practical craft of building systems that preserve domain invariants.",
    icon: BrainCircuit,
    mapIcon: "⌖",
    homeX: 265,
    homeY: -120,
    homeR: 112,
    mapX: 0,
    mapY: -235,
    mapR: 68,
    facets: ["Software Architecture", "Knowledge Graphs", "Complexity", "AI Tooling"],
    takeaways: ["Name the boundary.", "Track closure.", "Preserve invariants."],
  },
  {
    id: "bfe",
    label: "Executable Representations",
    short: "Own the problem complexity, not the code complexity.",
    title: "Executable Representations.",
    body: "A method for extracting artifacts, actors, invariants, failure modes, interfaces, and contracts before implementation. It asks what exists, where it lives, who knows it, when it appears, and why it matters before asking how to build it.",
    icon: Hammer,
    mapIcon: "□",
    homeX: 320,
    homeY: 105,
    homeR: 100,
    mapX: -270,
    mapY: -95,
    mapR: 72,
    facets: ["Artifacts", "Interfaces", "Contracts", "Failure Modes"],
    takeaways: ["Own problem complexity.", "Stabilize interfaces.", "Make failure legible."],
  },
  {
    id: "agency",
    label: "Agency",
    short: "Action, responsibility, closure, and consequence.",
    title: "Agency must land somewhere.",
    body: "The agency lane asks where responsibility sits when systems act. In human work, AI systems, institutions, and public infrastructure, agency cannot remain vague without causing boundary failures.",
    icon: Compass,
    mapIcon: "◬",
    homeX: -205,
    homeY: -122,
    homeR: 88,
    mapX: 180,
    mapY: -220,
    mapR: 64,
    facets: ["Responsibility", "Consequence", "Decision", "Review"],
    takeaways: ["Responsibility is non-delegable.", "Closure prevents drift.", "Consequences are the ultimate test."],
  },
  {
    id: "applied-systems",
    label: "Applied Systems",
    short: "Weather, economics, organizations, civilization-scale feedback.",
    title: "Applied systems are where theory pays rent.",
    body: "This lane applies boundary-first analysis to weather simulation, organizational design, economics, infrastructure, public systems, and the places where abstractions become material consequences.",
    icon: Layers3,
    mapIcon: "◉",
    homeX: -245,
    homeY: 100,
    homeR: 98,
    mapX: -240,
    mapY: 165,
    mapR: 72,
    facets: ["Weather@Home", "Organizations", "Economics", "Infrastructure"],
    takeaways: ["Theory must touch reality.", "Feedback matters.", "Systems serve needs."],
  },
  {
    id: "public-domain",
    label: "Public Domain",
    short: "The public-facing essays, doctrines, and civic arguments.",
    title: "Public arguments for shared boundary repair.",
    body: "This lane translates the theory into accessible essays about AI, sustainability, civilizational failure, professional responsibility, public institutions, and the ethics of systems that affect everyone.",
    icon: Globe2,
    mapIcon: "⌂",
    homeX: -12,
    homeY: 235,
    homeR: 92,
    mapX: 260,
    mapY: 165,
    mapR: 72,
    facets: ["Essays", "Governance", "Sustainability", "Public Doctrine"],
    takeaways: ["Stewardship is a design constraint.", "Institutions are systems.", "Public consequence counts."],
  },
  {
    id: "ai-forge",
    label: "AI as Forge",
    short: "AI amplifies craft; the human remains the smith.",
    title: "AI is a forge, not an oracle.",
    body: "The AI lane treats generative systems as powerful tools that require craft lineage, reviewable agency, declared boundaries, and consequence-bearing human judgment.",
    icon: Sparkles,
    mapIcon: "✦",
    homeX: 136,
    homeY: 270,
    homeR: 76,
    mapX: 270,
    mapY: -95,
    mapR: 72,
    facets: ["Craft", "Review", "Bounded AI", "Tool Use"],
    takeaways: ["The human remains the smith.", "Declare boundaries.", "Review amplification."],
  },
  {
    id: "corpus",
    label: "Corpus",
    short: "Source material, notes, papers, experiments, and claim ledgers.",
    title: "The corpus is the workbench.",
    body: "The corpus collects drafts, notes, experiments, diagrams, source documents, outlines, and claim ledgers. It is the substrate from which papers, public essays, tools, and research maps are generated.",
    icon: BookOpen,
    mapIcon: "▱",
    homeX: 158,
    homeY: -300,
    homeR: 72,
    mapX: 0,
    mapY: 245,
    mapR: 64,
    facets: ["Notes", "Papers", "Experiments", "Claims"],
    takeaways: ["Preserve provenance.", "Separate claims by maturity.", "Turn notes into artifacts."],
  },
  {
    id: "essays",
    label: "Essays",
    short: "Readable bridges into the theory.",
    title: "Essays are the public on-ramp.",
    body: "The essay library gives readers ordinary-language entry points before they encounter the formal theory or deep graph.",
    icon: FileText,
    mapIcon: "≡",
    homeX: -358,
    homeY: 14,
    homeR: 70,
    mapX: -300,
    mapY: 20,
    mapR: 50,
    facets: ["On-Ramps", "Doctrine", "Public Essays", "Glossary"],
    takeaways: ["Start simple.", "Provide multiple paths in.", "Language matters."],
  },
  {
    id: "theory",
    label: "Theory",
    short: "Closure, representation, distinction, gauge, stage, invariant.",
    title: "The formal spine stays behind the landing page.",
    body: "The mathematical and theoretical material is present, but it should not dominate the first impression. The landing page names the major regions; deeper pages reveal the Smith-chart and knowledge-graph structures.",
    icon: Orbit,
    mapIcon: "⍟",
    homeX: -92,
    homeY: -295,
    homeR: 78,
    mapX: -180,
    mapY: -200,
    mapR: 60,
    facets: ["Closure", "Gauge", "Stage", "Invariant"],
    takeaways: ["Rigor ensures soundness.", "Theory guides the method.", "Math is unambiguous."],
  },
];

export const graphJourney: NodeId[] = [
  "identity",
  "computer-science",
  "bfe",
  "ai-forge",
  "applied-systems",
  "corpus",
  "public-domain",
];

interface GraphContextType {
  activeNodeId: NodeId;
  setActiveNodeId: (id: NodeId) => void;
  nodes: GraphNode[];
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState<NodeId>("identity");

  return (
    <GraphContext.Provider value={{ activeNodeId, setActiveNodeId, nodes: graphNodes }}>
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
