"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentNode, EdgeType, getCrossEdges } from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";

type FocusTelemetryProps = {
  focusNode: ContentNode;
  gestaltNode: ContentNode;
  onInspect: (inspectionId: string) => void;
  onNavigate: (id: string) => void;
};

const appliedTypes = new Set<EdgeType>([
  "implements",
  "demonstrates",
  "applies-to",
  "instantiates",
]);

export function FocusTelemetry({
  focusNode,
  gestaltNode,
  onInspect,
  onNavigate,
}: FocusTelemetryProps) {
  const [open, setOpen] = useState(true);

  const inspections = focusNode.inspection ?? [];
  const records = focusNode.links ?? [];

  const sourceRefs = useMemo(() => {
    const refs = inspections
      .map((inspection) => inspection.sourceRef)
      .filter((sourceRef): sourceRef is string => Boolean(sourceRef));
    return Array.from(new Set(refs));
  }, [inspections]);

  const appliedSurfaces = useMemo(() => {
    const seen = new Set<string>();

    return getCrossEdges(focusNode.id)
      .filter((edge) => appliedTypes.has(edge.type))
      .flatMap((edge) => {
        if (seen.has(edge.node.id)) return [];
        seen.add(edge.node.id);

        return [{
          edge,
          node: hydrateContentNode(edge.node),
          direction: edge.from === focusNode.id ? "outgoing" as const : "incoming" as const,
        }];
      });
  }, [focusNode.id]);

  const hasTelemetry = Boolean(
    focusNode.status ||
      inspections.length ||
      records.length ||
      sourceRefs.length ||
      appliedSurfaces.length,
  );

  useEffect(() => {
    setOpen(true);
  }, [focusNode.id]);

  if (!hasTelemetry) return null;

  const evidenceLabel = inspections.length
    ? `${inspections.length} ${inspections.length === 1 ? "view" : "views"}`
    : "No inspection views";
  const sourceLabel = sourceRefs.length
    ? `${sourceRefs.length} ${sourceRefs.length === 1 ? "source" : "sources"}`
    : "No source refs";

  return (
    <aside
      className={`focus-telemetry ${open ? "focus-telemetry--open" : ""}`}
      data-stage={focusNode.status?.stage ?? "undeclared"}
      aria-label={`Telemetry for ${focusNode.label}`}
    >
      <button
        className="focus-telemetry__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="focus-telemetry__identity">
          <small>Focus telemetry</small>
          <strong>{focusNode.shortLabel ?? focusNode.label}</strong>
          <em>
            {focusNode.id === gestaltNode.id
              ? "direct observation"
              : `observed within ${gestaltNode.shortLabel ?? gestaltNode.label}`}
          </em>
        </span>
        <span className="focus-telemetry__signal" aria-hidden="true" />
        <span className="focus-telemetry__chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <div className="focus-telemetry__readouts">
        <span>
          <small>Type</small>
          <strong>{focusNode.kind.replaceAll("-", " ")}</strong>
        </span>
        <span data-readout="standing">
          <small>Standing</small>
          <strong>{focusNode.status?.label ?? "Not declared"}</strong>
        </span>
        <span>
          <small>Evidence</small>
          <strong>{evidenceLabel}</strong>
          <em>{sourceLabel}</em>
        </span>
        <span>
          <small>Records</small>
          <strong>{records.length}</strong>
        </span>
        <span>
          <small>Applied</small>
          <strong>{appliedSurfaces.length}</strong>
        </span>
      </div>

      {open ? (
        <div className="focus-telemetry__body">
          {focusNode.status ? (
            <section className="telemetry-compartment telemetry-compartment--standing">
              <div className="telemetry-compartment__label">Declared standing</div>
              <strong>{focusNode.status.label}</strong>
              <p>{focusNode.status.detail}</p>
              <div className="telemetry-compartment__meta">
                {focusNode.status.sourceStatus ? (
                  <span>Source status · {focusNode.status.sourceStatus}</span>
                ) : null}
                {focusNode.status.provenance ? (
                  <span>Provenance · {focusNode.status.provenance}</span>
                ) : null}
              </div>
            </section>
          ) : null}

          {inspections.length ? (
            <section className="telemetry-compartment">
              <div className="telemetry-compartment__label">Inspectable evidence</div>
              <div className="telemetry-actions">
                {inspections.map((inspection) => (
                  <button
                    key={inspection.id}
                    onClick={() => onInspect(inspection.id)}
                    title={`Inspect ${inspection.label}`}
                  >
                    <span>Inspect</span>
                    <strong>{inspection.label}</strong>
                    <small>{inspection.eyebrow}</small>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {records.length ? (
            <section className="telemetry-compartment">
              <div className="telemetry-compartment__label">Retained / public records</div>
              <div className="telemetry-records">
                {records.map((record) => (
                  <a href={record.href} key={`${focusNode.id}-${record.href}`}>
                    <span>Open</span>
                    <strong>{record.label}</strong>
                    <small>{record.eyebrow ?? "Record"}</small>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {appliedSurfaces.length ? (
            <section className="telemetry-compartment">
              <div className="telemetry-compartment__label">Applied surfaces</div>
              <div className="telemetry-actions telemetry-actions--applied">
                {appliedSurfaces.map(({ edge, node, direction }) => (
                  <button
                    key={`${edge.from}-${edge.to}-${edge.type}`}
                    onClick={() => onNavigate(node.id)}
                    title={`Traverse to ${node.label}`}
                  >
                    <span>{direction === "outgoing" ? edge.label : `incoming · ${edge.label}`}</span>
                    <strong>{node.label}</strong>
                    <small>{edge.type}</small>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {sourceRefs.length ? (
            <section className="telemetry-compartment telemetry-compartment--sources">
              <div className="telemetry-compartment__label">Evidence references</div>
              <ul>
                {sourceRefs.map((sourceRef) => (
                  <li key={sourceRef}>{sourceRef}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
