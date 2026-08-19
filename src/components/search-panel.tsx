"use client";

import { useMemo, useState } from "react";
import { nodes } from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";

type SearchPanelProps = {
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function SearchPanel({ onClose, onNavigate }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const indexedNodes = useMemo(() => nodes.map(hydrateContentNode), []);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return indexedNodes.filter((node) => node.id !== "root").slice(0, 8);

    return indexedNodes
      .filter((node) => {
        const searchable = [
          node.label,
          node.eyebrow,
          node.summary,
          node.status?.label,
          node.status?.sourceStatus,
          ...(node.body ?? []),
          ...(node.inspection ?? []).flatMap((inspection) => [
            inspection.label,
            inspection.eyebrow,
            inspection.summary,
            ...inspection.bullets,
          ]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(needle);
      })
      .slice(0, 10);
  }, [indexedNodes, query]);

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button className="search-layer__backdrop" onClick={onClose} aria-label="Close search" />
      <section className="search-panel">
        <div className="search-panel__header">
          <div>
            <p className="eyebrow">Traverse by name, standing, or concern</p>
            <h2 id="search-title">Search the lab</h2>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
        <label className="search-field">
          <span className="sr-only">Search</span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Accessibility, civic, founder, shipped, Corpus Forge..."
          />
        </label>
        <div className="search-results">
          {results.map((node) => (
            <button
              key={node.id}
              data-kind={node.kind}
              onClick={() => {
                onNavigate(node.id);
                onClose();
              }}
              title={`Traverse to ${node.label}`}
            >
              <span>{node.label}</span>
              <span className="search-result__meta">
                <small>{node.status?.label ?? node.eyebrow}</small>
                <code className="search-result__path">/{node.path}</code>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
