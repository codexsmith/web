export type ReferenceLink = { readonly label: string; readonly url: string };
export type ReferenceWork = {
  readonly id: string;
  readonly authors: readonly string[];
  readonly title: string;
  readonly year: string;
  readonly type: string;
  readonly disciplines: readonly string[];
  readonly source: string;
  readonly sourceLabel: string;
  readonly links: readonly ReferenceLink[];
  readonly editionNote?: string;
};
export type CatalogFilters = {
  query: string;
  author: string;
  discipline: string;
  sort: "curated" | "year" | "title";
};
export const initialCatalogFilters: CatalogFilters = {
  query: "", author: "", discipline: "", sort: "curated",
};
const fold = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("en").replace(/ø/g, "o").replace(/ł/g, "l").replace(/æ/g, "ae").replace(/œ/g, "oe").replace(/ß/g, "ss");
const compare = (a: string, b: string) => a.localeCompare(b, "en", { sensitivity: "base" });
export function catalogFacets(works: readonly ReferenceWork[]) {
  return {
    authors: [...new Set(works.flatMap(work => work.authors))].sort(compare),
    disciplines: [...new Set(works.flatMap(work => work.disciplines))].sort(compare),
  };
}
export function filterReferences(works: readonly ReferenceWork[], filters: CatalogFilters): ReferenceWork[] {
  const terms = fold(filters.query.trim()).split(/\s+/).filter(Boolean);
  const selected = works.filter(work => {
    if (filters.author && !work.authors.includes(filters.author)) return false;
    if (filters.discipline && !work.disciplines.includes(filters.discipline)) return false;
    const haystack = fold([work.title, ...work.authors, work.year, work.type, ...work.disciplines].join(" "));
    return terms.every(term => haystack.includes(term));
  });
  if (filters.sort === "year") selected.sort((a, b) => compare(a.year, b.year) || compare(a.title, b.title) || compare(a.id, b.id));
  if (filters.sort === "title") selected.sort((a, b) => compare(a.title, b.title) || compare(a.id, b.id));
  return selected;
}
