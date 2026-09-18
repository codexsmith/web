export type CssModule = Readonly<Record<string, string>>;

export function composeCssModules(
  ...modules: CssModule[]
): Record<string, string> {
  const composed: Record<string, string> = {};
  const keys = new Set<string>();

  for (const module of modules) {
    for (const key of Object.keys(module)) keys.add(key);
  }

  for (const key of keys) {
    composed[key] = modules
      .map((module) => module[key])
      .filter(Boolean)
      .join(" ");
  }

  return composed;
}
