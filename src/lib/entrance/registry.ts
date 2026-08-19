import type { EntranceId, EntranceRouteDefinition } from "./types";

export const ENTRANCE_INVARIANT =
  "Every entrance begins with a different boundary while preserving access to the same body of work.";

export const ENTRANCE_ROUTES: readonly EntranceRouteDefinition[] = [
  {
    id: "people",
    bridge: "who",
    label: "People",
    question: "Who is here?",
    description:
      "Begin with the person, role, responsibility, or consequence already in view.",
    rootHref: "/audience",
    aliases: [],
    presentationOrder: 0,
    canonicalNodeIds: ["identity", "on-ramps", "constructive-humanist-agentics"],
    promise: "A focused route shaped by what you need now.",
    effort: "Choose a need, a position, and a familiar doorway.",
  },
  {
    id: "problem",
    bridge: "what",
    label: "Problem",
    question: "What happened?",
    description:
      "Begin with the pressure, failure, contradiction, or boundary asking to be named.",
    rootHref: "/problem",
    aliases: [],
    presentationOrder: 1,
    canonicalNodeIds: ["boundary-theory", "representational-mechanics", "systems-criticism"],
    promise: "A familiar scene becomes a formal doorway.",
    effort: "Choose one world, then one consequential scene.",
  },
  {
    id: "repair",
    bridge: "how",
    label: "Repair",
    question: "What restores the path?",
    description:
      "Begin with the method, instrument, and governed work of making consequence repairable.",
    rootHref: "/learn",
    aliases: [],
    presentationOrder: 2,
    canonicalNodeIds: ["bfe", "corpus", "identity"],
    promise: "A guided sequence leads from consequence to repair.",
    effort: "Fifteen short scenes, each directly addressable.",
  },
];

const entranceById = Object.fromEntries(
  ENTRANCE_ROUTES.map((route) => [route.id, route]),
) as Record<EntranceId, EntranceRouteDefinition>;

export function getEntranceRoute(id: EntranceId): EntranceRouteDefinition {
  return entranceById[id];
}

export function siblingEntrances(id: EntranceId): EntranceRouteDefinition[] {
  return ENTRANCE_ROUTES.filter((route) => route.id !== id);
}
