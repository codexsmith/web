import { cyoaOnramps } from "./data";

export const CYOA_PROBLEM_PATH = "/problem";

export function cyoaHref(onrampSlug?: string, choiceSlug?: string) {
  return [CYOA_PROBLEM_PATH, onrampSlug, choiceSlug]
    .filter(Boolean)
    .join("/");
}

export function resolveCyoaPath(path: string[] = []) {
  const [onrampSlug, choiceSlug] = path;
  const onramp = cyoaOnramps.find((item) => item.slug === onrampSlug);
  const choice = onramp?.choices.find((item) => item.slug === choiceSlug);
  return { onramp, choice };
}

export function isCyoaPathValid(path: string[] = []) {
  if (path.length > 2) return false;
  const { onramp, choice } = resolveCyoaPath(path);
  if (path.length >= 1 && !onramp) return false;
  if (path.length >= 2 && !choice) return false;
  return true;
}

export function cyoaStaticParams() {
  const contentPaths = [
    [] as string[],
    ...cyoaOnramps.flatMap((onramp) => [
      { path: [onramp.slug] },
      ...onramp.choices.map((choice) => ({
        path: [onramp.slug, choice.slug],
      })),
    ]).map((item) => item.path),
  ];
  return [
    { path: undefined as string[] | undefined },
    ...contentPaths
      .filter((path) => path.length > 0)
      .map((path) => ({ path })),
  ];
}

export type CyoaRouteResolution =
  | { kind: "hub"; contentPath: string[] }
  | { kind: "problem"; contentPath: string[] }
  | { kind: "legacy-problem"; contentPath: string[] }
  | { kind: "invalid"; contentPath: string[] };

export function resolveCyoaRoutePath(
  path: string[] = [],
): CyoaRouteResolution {
  if (path.length === 0) {
    return { kind: "hub", contentPath: [] };
  }
  if (path[0] === "problem") {
    const subPath = path.slice(1);
    if (isCyoaPathValid(subPath)) {
      return { kind: "problem", contentPath: subPath };
    }
    return { kind: "invalid", contentPath: path };
  }
  if (isCyoaPathValid(path)) {
    return { kind: "legacy-problem", contentPath: path };
  }
  return { kind: "invalid", contentPath: path };
}
