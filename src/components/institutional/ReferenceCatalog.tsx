"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { catalogFacets, filterReferences, initialCatalogFilters, type CatalogFilters, type ReferenceWork } from "./referenceCatalogModel";
import styles from "./styles/ReferenceLibrary.module.css";

// Stable server/client snapshot makes hydration readiness inspectable without a side effect or network call.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ReferenceCatalog({ works }: { works: readonly ReferenceWork[] }) {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [filters, setFilters] = useState<CatalogFilters>(initialCatalogFilters);
  const facets = useMemo(() => catalogFacets(works), [works]);
  const results = useMemo(() => filterReferences(works, filters), [works, filters]);
  const update = <K extends keyof CatalogFilters,>(key: K, value: CatalogFilters[K]) =>
    setFilters(previous => ({ ...previous, [key]: value }));
  return (
    <div data-reference-catalog data-reference-ready={ready} className={styles.catalog}>
      <div className={styles.controls} role="group" aria-label="Filter reference works">
        <label className={styles.search}>Search titles, authors and disciplines
          <input type="search" value={filters.query} onChange={event => update("query", event.currentTarget.value)} placeholder="e.g. Grothendieck, logic, 1957" autoComplete="off" />
        </label>
        <label>Author
          <select value={filters.author} onChange={event => update("author", event.currentTarget.value)}>
            <option value="">All authors</option>
            {facets.authors.map(author => <option key={author} value={author}>{author}</option>)}
          </select>
        </label>
        <label>Discipline
          <select value={filters.discipline} onChange={event => update("discipline", event.currentTarget.value)}>
            <option value="">All disciplines</option>
            {facets.disciplines.map(discipline => <option key={discipline} value={discipline}>{discipline}</option>)}
          </select>
        </label>
        <label>Order
          <select value={filters.sort} onChange={event => {
            const value = event.currentTarget.value;
            if (value === "curated" || value === "year" || value === "title") update("sort", value);
          }}>
            <option value="curated">Curated order</option><option value="year">Publication year</option><option value="title">Title A–Z</option>
          </select>
        </label>
        <button type="button" className={styles.reset} onClick={() => setFilters(initialCatalogFilters)}>Reset</button>
      </div>
      <p role="status" className={styles.count} data-reference-count>{results.length} of {works.length} reference works</p>
      {results.length === 0 && <p className={styles.empty}>No matching works. Try another search or reset the filters.</p>}
      <ol className={styles.results} aria-label="Reference works">
        {results.map(work => (
          <li key={work.id} id={`ref-${work.id}`} data-reference-id={work.id} className={styles.record}>
            <p className={styles.meta}>{work.year} · {work.type}</p>
            <div className={styles.description}>
              <h3>{work.title}</h3><p className={styles.author}>{work.authors.join("; ")}</p>
              <p className={styles.disciplines}>{work.disciplines.join(" · ")}</p>
              {work.editionNote && <p className={styles.note}>{work.editionNote}</p>}
              <div className={styles.sourceLinks}>
                <a href={work.source} target="_blank" rel="noopener noreferrer" aria-label={`${work.sourceLabel}: ${work.title} (opens in a new tab)`}>{work.sourceLabel} ↗</a>
                {work.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}: ${work.title} (opens in a new tab)`}>{link.label} ↗</a>)}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
