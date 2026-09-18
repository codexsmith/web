"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LabObjectIdentity, type LabObjectKind } from "./LabObjectIdentity";
import {
  atlasEdges,
  atlasKindLabels,
  atlasKindOrder,
  atlasNodes,
  type AtlasEdge,
  type AtlasNode,
} from "./content/atlas";
import styles from "./styles/Atlas.module.css";

function findNode(atlasId: string) {
  return atlasNodes.find((node) => node.atlasId === atlasId);
}

function relationLabel(edge: AtlasEdge, selectedId: string) {
  return edge.from === selectedId ? edge.relation : `← ${edge.relation}`;
}

export function LabAtlasExplorer() {
  const [selectedId, setSelectedId] = useState<string>(
    atlasNodes.find((node) => node.atlasId === "research-asm")?.atlasId ??
      atlasNodes[0]?.atlasId ??
      "",
  );

  const selected = findNode(selectedId) ?? atlasNodes[0];
  const relations = useMemo(
    () =>
      atlasEdges.filter(
        (edge) => edge.from === selected?.atlasId || edge.to === selected?.atlasId,
      ),
    [selected?.atlasId],
  );

  if (!selected) return null;

  return (
    <section className={styles.explorer} aria-label="Public Lab Atlas relationship explorer">
      <div className={styles.objectField}>
        {atlasKindOrder.map((kind) => {
          const nodes = atlasNodes.filter((node) => node.kind === kind);
          if (!nodes.length) return null;

          return (
            <section className={styles.kindGroup} data-kind={kind} key={kind}>
              <header>
                <span>{atlasKindLabels[kind] ?? kind}</span>
                <strong>{nodes.length}</strong>
              </header>

              <div className={styles.nodeList}>
                {nodes.map((node) => (
                  <button
                    type="button"
                    className={styles.nodeButton}
                    data-selected={node.atlasId === selected.atlasId ? "true" : "false"}
                    key={node.atlasId}
                    onClick={() => setSelectedId(node.atlasId)}
                  >
                    <span>{node.identifier ?? node.kind.toUpperCase()}</span>
                    <strong>{node.title}</strong>
                    <small>{node.status}</small>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <aside className={styles.inspector} aria-live="polite">
        <div className={styles.inspectorTopline}>
          <span>FOCUS OBJECT</span>
          <small>{relations.length} typed relationship{relations.length === 1 ? "" : "s"}</small>
        </div>

        <h2>{selected.title}</h2>
        <p className={styles.summary}>{selected.summary}</p>

        <LabObjectIdentity
          identifier={selected.identifier}
          identifierLabel={selected.identifierLabel}
          kind={selected.kind}
          secondary={selected.secondary}
          secondaryLabel={selected.secondaryLabel}
          status={selected.status}
          statusLabel={selected.statusLabel}
        />

        <Link className={styles.openObject} href={selected.href}>
          Open object surface <span aria-hidden="true">→</span>
        </Link>

        <div className={styles.relationships}>
          <div className={styles.relationshipHeader}>
            <span>DECLARED RELATIONSHIPS</span>
            <small>Absence of an edge does not imply absence of a relationship.</small>
          </div>

          {relations.length ? (
            relations.map((edge) => {
              const otherId = edge.from === selected.atlasId ? edge.to : edge.from;
              const other = findNode(otherId);
              if (!other) return null;

              return (
                <button
                  type="button"
                  className={styles.relationship}
                  key={`${edge.from}:${edge.to}:${edge.relation}`}
                  onClick={() => setSelectedId(other.atlasId)}
                >
                  <span>{relationLabel(edge, selected.atlasId)}</span>
                  <strong>{other.title}</strong>
                  <small>{edge.note}</small>
                </button>
              );
            })
          ) : (
            <p className={styles.noRelationships}>
              No relationship is declared for this object in the first public Atlas boundary.
              The Atlas does not infer one from wording, layout, or conceptual similarity.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
