export type EntranceId = "people" | "problem" | "repair";

export type EntranceMilestone =
  | "identity"
  | "orientation"
  | "selection"
  | "route"
  | "arrival"
  | "corpus";

export type EntranceRouteDefinition = {
  id: EntranceId;
  bridge: "who" | "what" | "how";
  label: string;
  question: string;
  description: string;
  rootHref: string;
  aliases: string[];
  presentationOrder: number;
  canonicalNodeIds: string[];
  promise: string;
  effort: string;
};

export type EntranceResolution = {
  entranceId: EntranceId;
  milestone: EntranceMilestone;
  rootHref: string;
  pathname: string;
};
