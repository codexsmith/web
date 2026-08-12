import React from "react";
import type { GraphNode } from "@/app/context/GraphContext";
import { DomainRecordSection } from "@/components/domain-record-section";

type NodeDetailSectionsProps = {
  node: GraphNode;
  nodes: GraphNode[];
  onSelectNode: (id: string) => void;
  fields?: string[];
  hideMetadata?: boolean;
  fieldLabels?: Record<string, string>;
  fieldIntroductions?: Record<string, React.ReactNode>;
  sectionIds?: Record<string, string>;
};

const PRESENTED_IN_HEADER = new Set(["label", "title", "short", "body", "icon"]);
const METADATA_FIELDS = [
  "id",
  "role",
  "layer",
  "status",
  "tone",
  "contentVersion",
  "iconName",
  "mapIcon",
];
const LAYOUT_FIELDS = ["homeX", "homeY", "homeR", "mapX", "mapY", "mapR"];
const PRIMARY_FIELDS = [
  "coreThesis"
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fieldLabel(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function itemTitle(value: Record<string, unknown>, index: number) {
  const candidate = value.title ?? value.label ?? value.name ?? value.id ?? value.practice;
  return typeof candidate === "string" || typeof candidate === "number"
    ? String(candidate)
    : `Entry ${index + 1}`;
}

function valueCount(value: unknown) {
  if (Array.isArray(value)) return `${value.length} ${value.length === 1 ? "entry" : "entries"}`;
  if (isRecord(value)) {
    const count = Object.keys(value).length;
    return `${count} ${count === 1 ? "field" : "fields"}`;
  }
  return null;
}

function StructuredValue({
  value,
  nodeIds,
  currentNodeId,
  onSelectNode,
  depth = 0,
}: {
  value: unknown;
  nodeIds: Set<string>;
  currentNodeId: string;
  onSelectNode: (id: string) => void;
  depth?: number;
}) {
  if (value === null || value === undefined) {
    return <span className="text-sm italic text-muted-foreground">Not specified</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span className="inline-flex rounded-sm border border-border/50 bg-muted/40 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground">
        {value ? "Yes" : "No"}
      </span>
    );
  }

  if (typeof value === "number") {
    return <span className="font-mono text-sm text-foreground">{value}</span>;
  }

  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value)) {
      return (
        <a className="break-all text-sm text-primary underline underline-offset-4" href={value} rel="noreferrer" target="_blank">
          {value}
        </a>
      );
    }

    if (nodeIds.has(value) && value !== currentNodeId) {
      return (
        <button
          className="max-w-full rounded-sm border border-border/50 bg-card px-2.5 py-1.5 text-left font-mono text-[11px] text-foreground transition-colors [overflow-wrap:anywhere] hover:bg-muted"
          onClick={() => onSelectNode(value)}
          type="button"
        >
          {fieldLabel(value)} →
        </button>
      );
    }

    return (
      <p className="min-w-0 whitespace-pre-wrap text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
        {value}
      </p>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <p className="text-sm italic text-muted-foreground">No entries currently listed.</p>;
    }

    const containsStructuredItems = value.some((item) => isRecord(item) || Array.isArray(item));
    if (!containsStructuredItems) {
      return (
        <ul className="space-y-2">
          {value.map((item, index) => (
            <li className="flex gap-2.5 text-sm leading-6 text-muted-foreground" key={`${String(item)}-${index}`}>
              <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <StructuredValue
                currentNodeId={currentNodeId}
                depth={depth + 1}
                nodeIds={nodeIds}
                onSelectNode={onSelectNode}
                value={item}
              />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <article className="min-w-0 rounded-sm border border-border/40 bg-background/45 p-4" key={index}>
            {isRecord(item) && (
              <h4 className="mb-3 font-serif text-base font-semibold text-foreground">{itemTitle(item, index)}</h4>
            )}
            <StructuredValue
              currentNodeId={currentNodeId}
              depth={depth + 1}
              nodeIds={nodeIds}
              onSelectNode={onSelectNode}
              value={item}
            />
          </article>
        ))}
      </div>
    );
  }

  if (isRecord(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return <p className="text-sm italic text-muted-foreground">No fields currently listed.</p>;
    }

    return (
      <dl className={depth === 0 ? "min-w-0 space-y-4" : "min-w-0 space-y-3"}>
        {entries.map(([key, child]) => (
          <div
            className={depth === 0 ? "min-w-0 border-b border-border/25 pb-4 last:border-0 last:pb-0" : "min-w-0"}
            key={key}
          >
            <dt className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {fieldLabel(key)}
            </dt>
            <dd className="min-w-0">
              <StructuredValue
                currentNodeId={currentNodeId}
                depth={depth + 1}
                nodeIds={nodeIds}
                onSelectNode={onSelectNode}
                value={child}
              />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return <span className="text-sm text-muted-foreground">{String(value)}</span>;
}

function DataSection({
  field,
  value,
  nodeIds,
  currentNodeId,
  onSelectNode,
  initiallyOpen = false,
  introduction,
  label,
  sectionId,
}: {
  field: string;
  value: unknown;
  nodeIds: Set<string>;
  currentNodeId: string;
  onSelectNode: (id: string) => void;
  initiallyOpen?: boolean;
  introduction?: React.ReactNode;
  label?: string;
  sectionId?: string;
}) {
  const count = valueCount(value);
  const displayLabel = label ?? fieldLabel(field);

  return (
    <DomainRecordSection
      count={count}
      id={sectionId}
      initiallyOpen={initiallyOpen}
      title={displayLabel}
    >
      {introduction ? <div className="mb-7">{introduction}</div> : null}
      <StructuredValue
        currentNodeId={currentNodeId}
        nodeIds={nodeIds}
        onSelectNode={onSelectNode}
        value={value}
      />
    </DomainRecordSection>
  );
}

export function NodeDetailSections({
  node,
  nodes,
  onSelectNode,
  fields,
  fieldIntroductions,
  hideMetadata,
  fieldLabels,
  sectionIds,
}: NodeDetailSectionsProps) {
  const nodeIds = new Set(nodes.map((item) => item.id));
  const sourceFields = Object.keys(node).filter((key) => key !== "icon");
  const groupedFields = new Set([...PRESENTED_IN_HEADER, ...METADATA_FIELDS, ...LAYOUT_FIELDS]);

  const metadata = Object.fromEntries(
    METADATA_FIELDS.filter((field) => Object.prototype.hasOwnProperty.call(node, field)).map((field) => [field, node[field]])
  );
  const layout = Object.fromEntries(
    LAYOUT_FIELDS.filter((field) => Object.prototype.hasOwnProperty.call(node, field)).map((field) => [field, node[field]])
  );

  const detailFields = fields 
    ? fields.map(f => [f, node[f as keyof GraphNode]] as [string, unknown]).filter(([, val]) => val !== undefined)
    : Object.entries(node)
        .filter(([field]) => !groupedFields.has(field))
        .sort(([a], [b]) => {
          const aIndex = PRIMARY_FIELDS.indexOf(a);
          const bIndex = PRIMARY_FIELDS.indexOf(b);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.localeCompare(b);
        });

  return (
    <section className="space-y-4">
      {!hideMetadata && (
        <div className="flex items-center justify-between pb-3">
          <h2 className="font-serif text-2xl font-semibold text-foreground">Schema details</h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {sourceFields.length} fields
          </span>
        </div>
      )}

      {detailFields.map(([field, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
          <DataSection
            currentNodeId={node.id}
            field={field}
            introduction={fieldIntroductions?.[field]}
            label={fieldLabels?.[field]}
            initiallyOpen={field === "coreThesis"}
            key={field}
            nodeIds={nodeIds}
            onSelectNode={onSelectNode}
            sectionId={sectionIds?.[field]}
            value={value}
          />
        );
      })}

      {!hideMetadata && (
        <>
          <DataSection
            currentNodeId={node.id}
            field="Node Metadata"
            nodeIds={nodeIds}
            onSelectNode={onSelectNode}
            value={metadata}
          />
          <DataSection
            currentNodeId={node.id}
            field="Visualization Layout"
            nodeIds={nodeIds}
            onSelectNode={onSelectNode}
            value={layout}
          />
        </>
      )}
    </section>
  );
}
