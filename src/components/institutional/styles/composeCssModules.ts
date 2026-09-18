export type CssModule = Readonly<Record<string, string>>;

export function composeCssModules(
  ...modules: CssModule[]
): Record<string, string> {
  const composed: Record<string, string> = {};
  const keys = new Set<string>();

  for (const cssModule of modules) {
    for (const key of Object.keys(cssModule)) keys.add(key);
  }

  for (const key of keys) {
    composed[key] = modules
      .map((cssModule) => cssModule[key])
      .filter(Boolean)
      .join(" ");
  }

  return composed;
}
