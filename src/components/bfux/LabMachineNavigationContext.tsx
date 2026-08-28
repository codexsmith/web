"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LabMachineEdge } from "./lab-machine-model";

export type LabMachineTraversalStep = {
  edgeKey: string;
  from: string;
  to: string;
  relation: string;
  kind: LabMachineEdge["kind"];
  direction: "forward" | "reverse";
};

type LabMachineNavigationValue = {
  focusId: string;
  focusLabel: string;
  currentNodeId: string | null;
  trail: LabMachineTraversalStep[];
  activeObjectId: string | null;
  navigateTo: (nodeId: string) => void;
  rewind: () => void;
  clearTrail: () => void;
  setActiveObjectId: (objectId: string | null) => void;
};

const LabMachineNavigationContext = createContext<LabMachineNavigationValue | null>(null);

export function LabMachineNavigationProvider({ value, children }: { value: LabMachineNavigationValue; children: ReactNode }) {
  return <LabMachineNavigationContext.Provider value={value}>{children}</LabMachineNavigationContext.Provider>;
}

export function useLabMachineNavigation() {
  return useContext(LabMachineNavigationContext);
}
