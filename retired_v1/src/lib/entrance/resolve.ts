import { ENTRANCE_ROUTES, getEntranceRoute } from "./registry";
import type {
  EntranceId,
  EntranceMilestone,
  EntranceResolution,
} from "./types";

function pathParts(pathname: string, basePath: string) {
  return pathname
    .slice(basePath.length)
    .split("/")
    .filter(Boolean);
}

export function entranceMilestone(
  entranceId: EntranceId,
  pathname: string,
): EntranceMilestone {
  const route = getEntranceRoute(entranceId);
  const parts = pathParts(pathname, route.rootHref);

  if (entranceId === "people") {
    if (parts.length === 0) return "orientation";
    if (parts.length === 1) return "selection";
    if (parts.length === 2) return "route";
    return "arrival";
  }

  if (entranceId === "problem") {
    if (parts.length === 0) return "orientation";
    if (parts.length === 1) return "selection";
    return "arrival";
  }

  if (parts.length === 0) return "orientation";
  return parts.at(-1) === "atlas-reveal" ? "arrival" : "route";
}

export function resolveEntrancePath(
  pathname: string,
): EntranceResolution | null {
  const route = ENTRANCE_ROUTES.find(
    (candidate) =>
      pathname === candidate.rootHref ||
      pathname.startsWith(`${candidate.rootHref}/`),
  );
  if (!route) return null;

  return {
    entranceId: route.id,
    milestone: entranceMilestone(route.id, pathname),
    pathname,
    rootHref: route.rootHref,
  };
}

export const ENTRANCE_MILESTONE_LABELS: Record<
  EntranceMilestone,
  string
> = {
  identity: "Identity",
  orientation: "Orientation",
  selection: "Selection",
  route: "Route",
  arrival: "Arrival",
  corpus: "Corpus",
};
