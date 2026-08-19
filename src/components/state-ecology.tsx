"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentNode, DeliveryStage, getChildren } from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";
import { getSemanticEvents, type SemanticEvent } from "@/lib/semantic-events";

type StateEcologyProps = {
  focusNode: ContentNode;
  gestaltNode: ContentNode;
};

type StateMode =
  | "active"
  | "testing"
  | "developed"
  | "delivered"
  | "future"
  | "historical"
  | "undeclared";

type StateProfile = {
  mode: StateMode;
  label: string;
  activity: string;
  transitionGate: string;
};

const stageOrder: DeliveryStage[] = [
  "active-development",
  "pilot",
  "developed",
  "shipped",
  "planned",
];

const stageLabels: Record<DeliveryStage, string> = {
  "active-development": "active",
  pilot: "pilot",
  developed: "developed",
  shipped: "shipped",
  planned: "planned",
};

function deriveStateProfile(node: ContentNode): StateProfile {
  const status = node.status;

  if (status?.historical) {
    return {
      mode: "historical",
      label: "Historical record",
      activity: "Delivered work retained as provenance rather than represented as a current operating surface.",
      transitionGate:
        "Any renewed or successor work should be represented as a new current state while preserving this historical record.",
    };
  }

  switch (status?.stage) {
    case "active-development":
      return {
        mode: "active",
        label: "Active development",
        activity: "The representation is still changing under implementation, research, or product work.",
        transitionGate:
          "Active work does not become pilot or shipped by time alone; promotion requires evidence appropriate to the target claim.",
      };
    case "pilot":
      return {
        mode: "testing",
        label: "Pilot / evaluation",
        activity: "The work is bounded enough to be exercised against real or representative conditions.",
        transitionGate:
          "Promotion requires retained evidence from bounded use, observed failure modes, and a justified next claim ceiling.",
      };
    case "developed":
      return {
        mode: "developed",
        label: "Developed / promotion-gated",
        activity: "A substantive artifact, method, doctrine, or standard exists, but development is not the same claim as delivery.",
        transitionGate:
          "Do not promote to shipped, validated, or institutionalized status without evidence that supports that specific claim.",
      };
    case "shipped":
      return {
        mode: "delivered",
        label: "Delivered",
        activity: "A delivery claim is present in the retained status model.",
        transitionGate:
          "Future change should preserve provenance; maintenance, replacement, or supersession should be represented explicitly rather than overwriting the delivered state.",
      };
    case "planned":
      return {
        mode: "future",
        label: "Planned / future intent",
        activity: "The object is represented as a bounded direction or intended capability, not as delivered or developed work.",
        transitionGate:
          "Promotion begins only when an inspectable artifact, implementation, experiment, or other admissible evidence exists.",
      };
    default:
      return {
        mode: "undeclared",
        label: "Lifecycle not declared",
        activity: "The current public model does not assign a delivery-stage claim to this object.",
        transitionGate:
          "No temporal or maturity inference should be made until an explicit standing is added to the source model.",
      };
  }
}

function evidencePosture(node: ContentNode) {
  const inspections = node.inspection ?? [];
  const records = node.links ?? [];
  const sourceRefs = new Set(
    inspections
      .map((inspection) => inspection.sourceRef)
      .filter((sourceRef): sourceRef is string => Boolean(sourceRef)),
  );

  if (inspections.length && sourceRefs.size) {
    return {
      label: "Source-bound",
      detail: `${inspections.length} inspectable ${inspections.length === 1 ? "view" : "views"} · ${sourceRefs.size} retained ${sourceRefs.size === 1 ? "source" : "sources"}`,
    };
  }

  if (inspections.length) {
    return {
      label: "Inspectable",
      detail: `${inspections.length} inspectable ${inspections.length === 1 ? "view" : "views"}; no source reference is declared on those views.`,
    };
  }

  if (records.length) {
    return {
      label: "Record-linked",
      detail: `${records.length} retained/public ${records.length === 1 ? "record" : "records"}; no Through evidence view is declared.`,
    };
  }

  return {
    label: "Sparse",
    detail: "No explicit Through evidence view or retained/public record is attached to this object yet.",
  };
}

function eventEffectiveLabel(event: SemanticEvent) {
  if (!event.effectiveAt) return "Effective date not established";
  if (event.datePrecision === "year") return event.effectiveAt.slice(0, 4);
  if (event.datePrecision === "month") return event.effectiveAt.slice(0, 7);
  return event.effectiveAt;
}

export function StateEcology({ focusNode, gestaltNode }: StateEcologyProps) {
  const [open, setOpen] = useState(false);
  const profile = deriveStateProfile(focusNode);
  const evidence = evidencePosture(focusNode);
  const ledgerEvents = useMemo(() => getSemanticEvents(focusNode.id), [focusNode.id]);

  const worldDistribution = useMemo(() => {
    const children = getChildren(gestaltNode.id).map(hydrateContentNode);
    const counts = new Map<string, number>();

    children.forEach((child) => {
      const key = child.status?.historical
        ? "historical"
        : child.status?.stage ?? "undeclared";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    const ordered = [
      ...stageOrder.map((stage) => ({
        key: stage,
        label: stageLabels[stage],
        count: counts.get(stage) ?? 0,
      })),
      { key: "historical", label: "historical", count: counts.get("historical") ?? 0 },
      { key: "undeclared", label: "undeclared", count: counts.get("undeclared") ?? 0 },
    ].filter((entry) => entry.count > 0);

    return { children, ordered };
  }, [gestaltNode.id]);

  useEffect(() => {
    setOpen(false);
  }, [focusNode.id]);

  const hasWorldField = worldDistribution.children.length > 0;
  const ledgerLabel = ledgerEvents.length
    ? `${ledgerEvents.length} ledger ${ledgerEvents.length === 1 ? "event" : "events"}`
    : "no explicit ledger";

  return (
    <aside
      className={`state-ecology ${open ? "state-ecology--open" : ""}`}
      data-state-mode={profile.mode}
      aria-label={`State ecology for ${focusNode.label}`}
    >
      <button
        className="state-ecology__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="state-ecology__signal" aria-hidden="true" />
        <span className="state-ecology__identity">
          <small>State field</small>
          <strong>{profile.label}</strong>
          <em>{evidence.label} · {ledgerLabel}</em>
        </span>
        <span className="state-ecology__chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>

      {open ? (
        <div className="state-ecology__body">
          <section className="state-ecology__section">
            <span className="state-ecology__label">Current lifecycle posture</span>
            <strong>{profile.label}</strong>
            <p>{profile.activity}</p>
          </section>

          <section className="state-ecology__section">
            <span className="state-ecology__label">Evidence posture</span>
            <strong>{evidence.label}</strong>
            <p>{evidence.detail}</p>
          </section>

          <section className="state-ecology__section state-ecology__section--gate">
            <span className="state-ecology__label">Next admissible transition</span>
            <p>{profile.transitionGate}</p>
          </section>

          <section className="state-ecology__section state-ecology__section--ledger">
            <span className="state-ecology__label">Semantic event ledger</span>
            {ledgerEvents.length ? (
              <div className="semantic-event-ledger">
                {ledgerEvents.map((event) => (
                  <article
                    className="semantic-event"
                    data-event-type={event.type}
                    data-standing-effect={event.standingEffect}
                    key={event.id}
                  >
                    <span className="semantic-event__rail" aria-hidden="true" />
                    <header className="semantic-event__header">
                      <span>
                        <small>{event.type.replaceAll("-", " ")}</small>
                        <strong>{event.label}</strong>
                      </span>
                      <time dateTime={event.effectiveAt ?? event.recordedAt}>
                        {eventEffectiveLabel(event)}
                      </time>
                    </header>
                    <p>{event.summary}</p>
                    <dl className="semantic-event__facts">
                      <div>
                        <dt>Actor</dt>
                        <dd>{event.actor.label}</dd>
                      </div>
                      <div>
                        <dt>Standing effect</dt>
                        <dd>{event.standingEffect}</dd>
                      </div>
                      {event.resultingStage ? (
                        <div>
                          <dt>Resulting stage</dt>
                          <dd>{event.resultingStage}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>Recorded</dt>
                        <dd>{event.recordedAt}</dd>
                      </div>
                    </dl>
                    <div className="semantic-event__ceiling">
                      <small>Claim ceiling</small>
                      <p>{event.claimCeiling}</p>
                    </div>
                    <div className="semantic-event__evidence">
                      <small>Evidence / provenance</small>
                      <ul>
                        {event.evidenceRefs.map((evidenceRef) => (
                          <li key={evidenceRef}>{evidenceRef}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="semantic-event-ledger__empty">
                No semantic events have been admitted for this object yet. Current standing remains a state claim, not a reconstructed chronology.
              </p>
            )}
          </section>

          {hasWorldField ? (
            <section className="state-ecology__section">
              <span className="state-ecology__label">Current whole · declared state distribution</span>
              <div className="state-ecology__distribution">
                {worldDistribution.ordered.map((entry) => (
                  <span key={entry.key} data-stage={entry.key}>
                    <strong>{entry.count}</strong>
                    <small>{entry.label}</small>
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <p className="state-ecology__clock-note">
            Event effective dates are shown only when the retained source establishes them. Ledger recording dates are not substituted for unknown domain-event dates.
          </p>
        </div>
      ) : null}
    </aside>
  );
}
