"use client";

import { useMemo, useState } from "react";
import { nodes } from "@/lib/content";

type SearchPanelProps = {
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function SearchPanel({ onClose, onNavigate }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return nodes.filter((node) => node.id !== "root").slice(0, 8);

    return nodes
      .filter((node) => {
        const searchable = [
          node.label,
          node.eyebrow,
          node.summary,
          node.status?.label,
          node.status?.sourceStatus,
          ...(node.body ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(needle);
      })
      .slice(0, 10);
  }, [query]);

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button className="search-layer__backdrop" onClick={onClose} aria-label="Close search" />
      <section className="search-panel">
        <div className="search-panel__header">
          <div>
            <p className="eyebrow">Traverse by name or standing</p>
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
            placeholder="Shipped, pilot, Corpus Forge, Augusta..."
          />
        </label>
        <div className="search-results">
          {results.map((node) => (
            <button
              key={node.id}
              onClick={() => {
                onNavigate(node.id);
                onClose();
              }}
            >
              <span>{node.label}</span>
              <small>{node.status?.label ?? node.eyebrow}</small>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
