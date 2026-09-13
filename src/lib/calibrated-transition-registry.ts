import type { CalibratedTransitionContract } from "@/lib/calibrated-transition";
import { augustaResurfacingTransitionContract } from "@/lib/augusta-transport-calibration";
import { highlandAvenueWaterTransitionContract } from "@/lib/augusta-water-calibration";

export type CalibratedTransitionRegistration = {
  id: string;
  domain: string;
  geography: string;
  targetNodeIds: string[];
  contract: CalibratedTransitionContract;
  maturity: "calibrated-arithmetic" | "calibrated-model";
};

export const calibratedTransitionRegistry: CalibratedTransitionRegistration[] = [
  {
    id: highlandAvenueWaterTransitionContract.id,
    domain: "water infrastructure",
    geography: "Augusta-Richmond County, Georgia",
    targetNodeIds: ["savannah-water"],
    contract: highlandAvenueWaterTransitionContract,
    maturity: "calibrated-arithmetic",
  },
  {
    id: augustaResurfacingTransitionContract.id,
    domain: "transportation maintenance",
    geography: "Augusta-Richmond County, Georgia",
    targetNodeIds: ["augusta-transport"],
    contract: augustaResurfacingTransitionContract,
    maturity: "calibrated-arithmetic",
  },
];

export function getCalibratedTransitionRegistration(id: string) {
  return calibratedTransitionRegistry.find((registration) => registration.id === id) ?? null;
}

export function getCalibratedTransitionsForNode(nodeId: string) {
  return calibratedTransitionRegistry.filter((registration) => registration.targetNodeIds.includes(nodeId));
}
