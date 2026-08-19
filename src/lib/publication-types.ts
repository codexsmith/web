export const publicationStages = [
  "seed",
  "draft",
  "working-public",
  "review",
  "launch-candidate",
  "published",
  "superseded",
] as const;

export type PublicationStage = (typeof publicationStages)[number];

export type PublicationMetadata = {
  stage: PublicationStage;
  label: string;
  documentClass: string;
  claimMaturity: string;
  audience: string;
  nextGate: string;
  sourceRef: string;
  version?: string;
};
