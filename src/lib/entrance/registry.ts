import { entryTriadBinding, entryTriadRoutes } from "../entry-triad";
import type {
  EntranceId,
  EntranceRouteDefinition,
} from "./types";

const routePresentation: Record<
  EntranceId,
  Pick<EntranceRouteDefinition, "aliases" | "promise" | "effort">
> = {
  people: {
    aliases: [],
    promise: "A focused route shaped by what you need now.",
    effort: "Choose a need, a position, and a familiar doorway.",
  },
  problem: {
    aliases: [],
    promise: "A familiar scene becomes a formal doorway.",
    effort: "Choose one world, then one consequential scene.",
  },
  repair: {
    aliases: [],
    promise: "A guided sequence leads from consequence to repair.",
    effort: "Fifteen short scenes, each directly addressable.",
  },
};

export const ENTRANCE_INVARIANT = entryTriadBinding.bindingProtocol.invariant;

export const ENTRANCE_ROUTES: readonly EntranceRouteDefinition[] =
  entryTriadRoutes.map((route, presentationOrder) => ({
    ...route,
    aliases: routePresentation[route.id].aliases,
    effort: routePresentation[route.id].effort,
    presentationOrder,
    promise: routePresentation[route.id].promise,
    rootHref: route.href,
  }));

const entranceById = Object.fromEntries(
  ENTRANCE_ROUTES.map((route) => [route.id, route]),
) as Record<EntranceId, EntranceRouteDefinition>;

export function getEntranceRoute(id: EntranceId): EntranceRouteDefinition {
  return entranceById[id];
}

export function siblingEntrances(
  id: EntranceId,
): EntranceRouteDefinition[] {
  return ENTRANCE_ROUTES.filter((route) => route.id !== id);
}
