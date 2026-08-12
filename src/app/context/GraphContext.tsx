"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Atom,
  BookOpen,
  Boxes,
  Braces,
  BrainCircuit,
  CircleDashed,
  CircleDot,
  Compass,
  Construction,
  FileText,
  Focus,
  Globe2,
  Hammer,
  HandHeart,
  Handshake,
  Landmark,
  Layers3,
  Mic2,
  Network,
  Orbit,
  Scale,
  ScanSearch,
  ShieldCheck,
  Sigma,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import graphNodesData from "./graphNodes.json";
import { ATLAS_OVERVIEW_NODE_ID } from "@/lib/map-state";

export type NodeId = string;

export type DocumentRef = {
  id: string;
  title: string;
  type: "manifesto" | "plan" | "essay" | "proof" | "catalog" | string;
  maturity: "draft" | "proposal" | "formal_result" | "published" | string;
  audience?: string;
};

export type ArtifactRef = {
  id: string;
  title: string;
  maturity: string;
  parent: string;
  mapIcon?: string;
  color?: string;
};

export type SemanticTarget = {
  id: string;
  label: string;
  recordHref: string;
};

export type SemanticRecord = {
  id: string;
  label: string;
  summary: string;
  kind?: string;
  layer?: string;
  relationType: string;
  authority: string;
  evidence: string;
  status: string;
  closure: string;
  sourceId?: string;
  targetId?: string;
  targetNodeIds?: string[];
  targetOptions?: SemanticTarget[];
  recordHref?: string;
  actionLabel?: string;
  provenance?: string;
  provenanceRefs?: string[];
  canonicalRelationId?: string;
  relationKey?: string;
  relationFamily?: string;
  directionality?: "directed" | "symmetric" | "inverse-paired" | string;
  inverseRelationType?: string;
  rationale?: string;
  claimBoundary?: string;
  evidenceStatus?: string;
  evidenceRefs?: string[];
  definition?: string;
  definitionStatus?: string;
  definitionProvenance?: string;
  belonging?: string;
  strength?: string;
  direction?: string;
  stage?: string;
  productStage?: string;
  sources?: string[];
  productSources?: string[];
  auditDate?: string;
  [key: string]: unknown;
};

export type ProjectionRecords = {
  work: SemanticRecord[];
  evidence: SemanticRecord[];
  lineage: SemanticRecord[];
  governance: SemanticRecord[];
  collaboration: SemanticRecord[];
};

export type GraphNode = {
  id: NodeId;
  label: string;
  short: string;
  title: string;
  body: string;
  icon: React.ElementType;
  iconName?: string;
  mapIcon: string;
  homeX: number;
  homeY: number;
  homeR: number;
  mapX: number;
  mapY: number;
  mapR: number;
  tone?: string;
  displayUI?: "node" | "radialpart";
  facets: string[];
  takeaways: string[];
  coreThesis?: string;
  claims?: string[];
  documents?: DocumentRef[];
  artifacts?: ArtifactRef[];
  relationRecords?: SemanticRecord[];
  facetRecords?: SemanticRecord[];
  projectionRecords?: ProjectionRecords;
  associatedURL?: string;
  architectureStage?: string;
  architectureOrder?: number;
  [key: string]: unknown;
};

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Braces,
  CircleDashed,
  CircleDot,
  Focus,
  Orbit,
  BookOpen,
  Boxes,
  BrainCircuit,
  Hammer,
  HandHeart,
  Handshake,
  Landmark,
  Sparkles,
  Layers3,
  Compass,
  Construction,
  Globe2,
  FileText,
  Mic2,
  Network,
  Scale,
  ScanSearch,
  ShieldCheck,
  Sigma,
};

import artifactsIndex from "./artifactsIndex.json";

const hasPublishedArtifacts = Object.keys(artifactsIndex).length > 0;

export const graphNodes: GraphNode[] = graphNodesData.map((node) => {
  const normalizedDisplayUI: GraphNode["displayUI"] =
    node.displayUI === "radialpart" ? "radialpart" : "node";

  return {
    ...node,
    displayUI: normalizedDisplayUI,
    icon: iconMap[node.iconName] || CircleDot,
    // Strip artifact references when no content has been published yet
    ...(hasPublishedArtifacts ? {} : { artifacts: undefined }),
  } as GraphNode;
});

// Include all domains in the journey footer, except the top-level identity node
export const graphJourney: NodeId[] = graphNodes
  .filter((n) => n.id !== "identity")
  .map((node) => node.id);

interface GraphContextType {
  activeNodeId: NodeId | null;
  setActiveNodeId: (id: NodeId | null) => void;
  nodes: GraphNode[];
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState<NodeId | null>(
    ATLAS_OVERVIEW_NODE_ID,
  );

  return (
    <GraphContext.Provider
      value={{ activeNodeId, setActiveNodeId, nodes: graphNodes }}
    >
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
