"use client";

import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type {
  GraphNode,
  SemanticRecord,
} from "@/app/context/GraphContext";

type RelationGroup = {
  id: "outgoing" | "symmetric" | "incoming";
  label: string;
  description: string;
  icon: typeof ArrowUpRight;
  records: SemanticRecord[];
};

export const RELATION_PREVIEW_LIMIT = 3;

export function DomainTopologyPlot({
  node,
  nodes,
  onSelectNode,
}: {
  node: GraphNode;
  nodes: GraphNode[];
  onSelectNode?: (id: string) => void;
}) {
  const router = useRouter();
  const validTargetIds = new Set(nodes.map((candidate) => candidate.id));
  const relationRecords = (node.relationRecords ?? []).filter(
    (record) => record.targetId && validTargetIds.has(record.targetId),
  );

  const relationGroups: RelationGroup[] = [
    {
      id: "outgoing",
      label: "Declared from here",
      description: "Relations this domain declares toward another record.",
      icon: ArrowUpRight,
      records: relationRecords.filter(
        (record) => record.direction === "outgoing",
      ),
    },
    {
      id: "symmetric",
      label: "Reciprocal context",
      description:
        "Symmetric relations visible from either participating record.",
      icon: ArrowLeftRight,
      records: relationRecords.filter(
        (record) => record.direction === "symmetric",
      ),
    },
    {
      id: "incoming",
      label: "Declared toward here",
      description:
        "Incoming views derived from another domain's declaration.",
      icon: ArrowDownLeft,
      records: relationRecords.filter(
        (record) => record.direction === "incoming",
      ),
    },
  ];
  const groups = relationGroups.filter((group) => group.records.length > 0);

  if (groups.length === 0) return null;

  const handleNavigate = (id: string) => {
    if (onSelectNode) {
      onSelectNode(id);
      return;
    }
    router.push(`/domain/${id}`);
  };

  const renderRecord = (record: SemanticRecord) => (
    <li key={record.id}>
      <button
        aria-label={`${record.relationType}: ${record.label}`}
        className="group min-h-11 w-full px-4 py-4 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        onClick={() => handleNavigate(record.targetId as string)}
        type="button"
      >
        <span className="flex items-start justify-between gap-3">
          <span className="font-semibold leading-5 text-foreground">
            {record.label}
          </span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </span>
        <span className="mt-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {record.relationType}
        </span>
        <span className="mt-2 block text-sm leading-5 text-foreground/70">
          {record.summary}
        </span>
      </button>
    </li>
  );

  return (
    <div>
      <p className="max-w-3xl text-sm font-medium leading-6 text-muted-foreground">
        Direction, inverse views, and reciprocal relations come from the shared
        semantic registry. Each group begins with a bounded preview; expand
        only the group you need.
      </p>
      <div
        className={`mt-6 grid gap-4 ${
          groups.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : ""
        }`}
      >
        {groups.map((group) => {
          const Icon = group.icon;
          const previewRecords = group.records.slice(0, RELATION_PREVIEW_LIMIT);
          const remainingRecords = group.records.slice(
            RELATION_PREVIEW_LIMIT,
          );
          const headingId = `relation-group-${group.id}`;

          return (
            <section
              aria-labelledby={headingId}
              className="min-w-0 self-start rounded-sm border border-border bg-background"
              key={group.id}
            >
              <div className="border-b border-border px-4 py-4">
                <div className="flex items-center gap-2">
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground"
                  />
                  <h3
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                    id={headingId}
                  >
                    {group.label}
                  </h3>
                  <span className="ml-auto rounded-full border border-border px-2 py-0.5 font-mono text-[10px] font-semibold">
                    {group.records.length}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <ul className="divide-y divide-border/50">
                {previewRecords.map(renderRecord)}
              </ul>
              {remainingRecords.length ? (
                <details className="group/more border-t border-border/50">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground marker:content-none hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    Show {remainingRecords.length} more
                    <Plus
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-open/more:rotate-45"
                    />
                  </summary>
                  <ul className="divide-y divide-border/50 border-t border-border/50">
                    {remainingRecords.map(renderRecord)}
                  </ul>
                </details>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
