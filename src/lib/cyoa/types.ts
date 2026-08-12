export type CyoaBindingStatus = "draft" | "review" | "approved" | "superseded";
export type CyoaClaimCeiling = "pedagogical-on-ramp";

export type CyoaConceptDefinition = {
  id: string;
  label: string;
  definition: string;
  canonicalNodeIds: string[];
};

export type CyoaBindingChoice = {
  id: string;
  slug: string;
  title: string;
  scene: string;
  conceptLabel: string;
  conceptIds: string[];
  canonicalNodeIds: string[];
  lesson: string;
  structuralMove: string;
  metaphorFirewall: string;
  formalBridge: string;
  destinationNodeId: string;
  actionLabel: string;
};

export type CyoaBindingOnramp = {
  id: string;
  slug: string;
  number: string;
  label: string;
  prompt: string;
  description: string;
  canonicalNodeIds: string[];
  choices: CyoaBindingChoice[];
};

export type CyoaWorkflowState = {
  id: "choose-world" | "name-trouble" | "cross-bridge";
  label: string;
};

export type CyoaBinding = {
  schemaVersion: "boundary-first.binding.cyoa.v1";
  bindingProtocol: {
    id: string;
    version: string;
    title: string;
    status: CyoaBindingStatus;
    claimCeiling: CyoaClaimCeiling;
    provenance: {
      createdFrom: string[];
      implementedAt: string;
    };
    compatibility: {
      renderer: string;
      canonicalNodeSource: string;
    };
  };
  source: {
    schemaFamily: "custom";
    schemaReference: string;
    adapters: string[];
  };
  semantics: {
    conceptRegistry: CyoaConceptDefinition[];
    onramps: CyoaBindingOnramp[];
  };
  workflow: {
    profile: "adaptive-onramp";
    states: CyoaWorkflowState[];
    transitions: Array<{ from: string; to: string; action: string }>;
    restartable: true;
    stateMutation: "navigation-only";
  };
  projection: {
    id: string;
    pattern: "guided-path";
    regions: string[];
    components: Record<string, string>;
    copy: {
      prototypePrimary: string;
      prototypeSecondary: string;
      entranceEyebrow: string;
      entranceTitle: string;
      entranceIntro: string;
      nonClassification: string;
      choiceTitle: string;
      choiceIntro: string;
      conceptStripLabel: string;
      footerPrimary: string;
      footerSecondary: string;
    };
  };
  interactions: {
    actions: Array<{
      id: string;
      method: "link";
      preservesHistory: boolean;
      keyboardEquivalent: "native-link";
    }>;
    fallbacks: string[];
  };
  validation: {
    requiredOnrampIds: string[];
    requiredChoiceFields: string[];
    accessibilityConstraints: string[];
    governanceConstraints: string[];
  };
  export: {
    targets: string[];
    documentation: boolean;
    fixtures: boolean;
  };
};

export type CanonicalNodeSummary = {
  id: string;
  label: string;
  summary: string;
  href: string;
};

export type CyoaChoice = Omit<
  CyoaBindingChoice,
  "conceptIds" | "metaphorFirewall" | "formalBridge" | "destinationNodeId" | "actionLabel"
> & {
  concepts: CyoaConceptDefinition[];
  firewall: string;
  bridge: string;
  destination: CanonicalNodeSummary & { actionLabel: string };
};

export type CyoaOnramp = Omit<CyoaBindingOnramp, "choices"> & {
  choices: CyoaChoice[];
};
