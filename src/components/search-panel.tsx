"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildSearchIndex,
  searchFacetOptions,
  searchLab,
  type SearchFilters,
} from "@/lib/search-index";

type SearchPanelProps = {
  onClose: () => void;
  onNavigate: (id: string) => void;
};

const initialFilters: SearchFilters = {
  objectType: "all",
  stage: "all",
  relation: "all",
  evidenceOnly: false,
};

function humanize(value: string) {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function SearchPanel({ onClose, onNavigate }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const index = useMemo(() => buildSearchIndex(), []);
  const facets = useMemo(() => searchFacetOptions(index), [index]);
  const matchedResults = useMemo(
    () => searchLab(index, query, filters, Number.MAX_SAFE_INTEGER),
    [filters, index, query],
  );
  const results = matchedResults.slice(0, 14);
  const hasActiveFilters = filters.objectType !== "all"
    || filters.stage !== "all"
    || filters.relation !== "all"
    || filters.evidenceOnly;

  useEffect(() => {
    restoreFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      restoreFocusRef.current?.focus();
    };
  }, [onClose]);

  const clearSearch = () => {
    setQuery("");
    setFilters(initialFilters);
    inputRef.current?.focus();
  };

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button className="search-layer__backdrop" onClick={onClose} aria-label="Close search" />
      <section className="search-panel search-panel--instrument" ref={panelRef}>
        <div className="search-panel__header">
          <div>
            <p className="eyebrow">Traverse by identity, boundary, standing, evidence, relation, or event</p>
            <h2 id="search-title">Search the lab</h2>
          </div>
          <button onClick={onClose}>Close</button>
        </div>

        <label className="search-field">
          <span className="sr-only">Search</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Accessibility, launch candidate, grounds, CityWatch, claim ceiling..."
          />
        </label>

        <fieldset className="search-facets">
          <legend>Constrain traversal</legend>

          <label>
            <span>Object type</span>
            <select
              value={filters.objectType}
              onChange={(event) => setFilters((current) => ({ ...current, objectType: event.target.value }))}
            >
              <option value="all">Any type</option>
              {facets.objectTypes.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Standing / stage</span>
            <select
              value={filters.stage}
              onChange={(event) => setFilters((current) => ({ ...current, stage: event.target.value }))}
            >
              <option value="all">Any standing</option>
              {facets.stages.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Typed relation</span>
            <select
              value={filters.relation}
              onChange={(event) => setFilters((current) => ({ ...current, relation: event.target.value }))}
            >
              <option value="all">Any relation state</option>
              <option value="related">Has typed relations</option>
              {facets.relations.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="search-facets__check">
            <input
              type="checkbox"
              checked={filters.evidenceOnly}
              onChange={(event) => setFilters((current) => ({ ...current, evidenceOnly: event.target.checked }))}
            />
            <span>Evidence projection available</span>
          </label>
        </fieldset>

        <div className="search-result-summary" aria-live="polite">
          <span>
            {matchedResults.length === results.length
              ? `${results.length} admissible result${results.length === 1 ? "" : "s"}`
              : `Showing ${results.length} of ${matchedResults.length} admissible results`}
          </span>
          {(query || hasActiveFilters) ? (
            <button type="button" onClick={clearSearch}>Clear query and facets</button>
          ) : null}
        </div>

        <div className="search-results search-results--instrument">
          {results.map((result) => {
            const node = result.node;
            return (
              <button
                key={node.id}
                className="search-result"
                data-kind={node.kind}
                data-object-type={result.objectType}
                onClick={() => {
                  onNavigate(node.id);
                  onClose();
                }}
                title={`Traverse to ${node.label}`}
              >
                <span className="search-result__heading">
                  <strong>{node.label}</strong>
                  <code className="search-result__path">/{node.path}</code>
                </span>

                <span className="search-result__facets" aria-label="Object metadata">
                  <small>{humanize(result.objectType)}</small>
                  {result.stage ? <small>{humanize(result.stage)}</small> : null}
                  {result.hasEvidence ? <small>Evidence</small> : null}
                  {result.relationCount ? (
                    <small>{result.relationCount} relation{result.relationCount === 1 ? "" : "s"}</small>
                  ) : null}
                </span>

                {result.reasons.length ? (
                  <span className="search-result__reasons" aria-label={`Why ${node.label} matched`}>
                    {result.reasons.map((reason) => (
                      <span key={`${reason.channel}-${reason.label}`}>
                        <small>{reason.label}</small>
                        <em>{reason.excerpt}</em>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="search-result__orientation">{node.eyebrow}</span>
                )}
              </button>
            );
          })}

          {!results.length ? (
            <div className="search-results__empty">
              <strong>No admissible result</strong>
              <p>Broaden the query or remove one of the schema constraints.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
