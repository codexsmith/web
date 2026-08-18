export type Depth =
  | "recognize"
  | "understand"
  | "use"
  | "build"
  | "evaluate"
  | "extend";

export type NodeReference = {
  id: string;
  label?: string;
  role?: "doorway" | "core" | "support" | "destination";
};

export type RouteStep = {
  id: string;
  title: string;
  summary: string;
  nodeRefs: NodeReference[];
  actionLabel?: string;
};

export type AudienceNode = {
  id: string;
  slug: string;
  type: "audience";
  title: string;
  shortTitle: string;
  arrivalStatement: string;
  trigger: string;
  barrier: string;
  desiredTransformation: string;
  depthRange: { entry: Depth; maximum: Depth };
  useCases: string[];
  doorwayIds: string[];
  coreConcepts: string[];
  recommendedNodeIds: string[];
  preferredFormats: string[];
  nextAction: { label: string; href: string };
  successSignal: string;
  route: RouteStep[];
  related: string[];
};

export type IntentNode = {
  id: string;
  slug: string;
  type: "intent";
  title: string;
  prompt: string;
  summary: string;
  useCase: string;
  audienceIds: string[];
  recommendedDepth: Depth;
  related: string[];
};

export type DoorwayNode = {
  id: string;
  slug: string;
  type: "doorway";
  title: string;
  summary: string;
  domainNodeIds: string[];
  audienceIds: string[];
  related: string[];
};

export type AudienceDataset = {
  schemaVersion: "boundary-first.audience.v1";
  title: string;
  description: string;
  audiences: AudienceNode[];
  intents: IntentNode[];
  doorways: DoorwayNode[];
};

export type AudienceRouteConfig = {
  basePath: string;
  defaultDepth: Depth;
  atlasHref: string;
  publicationHref: string;
  labels: {
    eyebrow: string;
    title: string;
    intro: string;
    restart: string;
    atlas: string;
    publication: string;
  };
};

export type RouteSelection = {
  intent?: IntentNode;
  audience?: AudienceNode;
  doorway?: DoorwayNode;
  depth: Depth;
};

export type CanonicalNodeSummary = {
  id: string;
  label: string;
  summary: string;
  href: string;
};

export type PublicationRecommendation = {
  audienceId: string;
  cardId: string;
  kicker: string;
  title: string;
  summary: string;
  href: string;
};
