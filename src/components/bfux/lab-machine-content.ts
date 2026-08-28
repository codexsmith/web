import content from "@/content/lab-machine-second-layer.json";

export type LabMachineContentView = {
  id: string;
  label: string;
  purpose: string;
};

export type LabMachineCardContent = {
  label: string;
  eyebrow: string;
  framingQuestion: string;
  systemRole: string;
  orientation: string;
  institutionalPurpose: string;
  boundary: {
    contains: string[];
    excludes: string[];
  };
  process: {
    entersAs: string[];
    transformsThrough: string[];
    exitsAs: string[];
  };
  rationale: string[];
  validationSignals: string[];
  views: LabMachineContentView[];
  takeaway: string;
};

export const labMachineSecondLayer = content;

export function getLabMachineCardContent(nodeId: string): LabMachineCardContent | undefined {
  return (content.cards as Record<string, LabMachineCardContent>)[nodeId];
}
