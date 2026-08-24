"use client";

import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import { ContentNode, getChildren, getCrossEdges } from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";

type SubjectPaneProps =
  | {
      node: ContentNode;
      variant: "glance";
      glanceHeading?: string;
    }
  | {
      node: ContentNode;
      variant?: "full";
      onInspect: (inspectionId: string) => void;
      onNavigate: (id: string) => void;
    };

export type SubjectAction =
  | {
      kind: "record";
      key: string;
      label: string;
      eyebrow: string;
      summary?: string;
      href: string;
    }
  | {
      kind: "inspection";
      key: string;
      label: string;
      eyebrow: string;
      summary?: string;
      inspectionId: string;
    }
  | {
      kind: "relation";
      key: string;
      label: string;
      eyebrow: string;
      summary?: string;
      nodeId: string;
      edgeType: string;
    };

function actionGlyph(action: SubjectAction): BfuxIconName {
  if (action.kind === "inspection") return "inspect";
  if (action.kind === "relation") return "peer";
  return "trace";
}

function ActionCardContents({ action }: { action: SubjectAction }) {
  return (
    <>
      <BfuxIcon name={actionGlyph(action)} className="subject-pane__action-glyph" />
      <span className="subject-pane__action-copy">
        <span>{action.eyebrow}</span>
        <strong>{action.label}</strong>
        {action.summary ? <small>{action.summary}</small> : null}
      </span>
    </>
  );
}

export function ActionCard({
  action,
  onInspect,
  onNavigate,
}: {
  action: SubjectAction;
  onInspect: (inspectionId: string) => void;
  onNavigate: (id: string) => void;
}) {
  if (action.kind === "record") {
    return (
      <a className="subject-pane__action" data-action-kind={action.kind} href={action.href}>
        <ActionCardContents action={action} />
      </a>
    );
  }

  if (action.kind === "inspection") {
    return (
      <button
        className="subject-pane__action"
        data-action-kind={action.kind}
        onClick={() => onInspect(action.inspectionId)}
      >
        <ActionCardContents action={action} />
      </button>
    );
  }

  return (
    <button
      className="subject-pane__action"
      data-action-kind={action.kind}
      onClick={() => onNavigate(action.nodeId)}
      data-edge-type={action.edgeType}
    >
      <ActionCardContents action={action} />
    </button>
  );
}

export function getSubjectActions(node: ContentNode): SubjectAction[] {
  const records = node.links ?? [];
  const inspections = node.inspection ?? [];
  const isBranch = getChildren(node.id).length > 0;
  const relations = isBranch
    ? getCrossEdges(node.id).map((edge) => ({
        ...edge,
        node: hydrateContentNode(edge.node),
      }))
    : [];

  const recordActions: SubjectAction[] = records.map((record) => ({
    kind: "record",
    key: `record:${record.href}`,
    label: record.label,
    eyebrow: record.eyebrow ?? "Open record",
    summary: record.summary,
    href: record.href,
  }));

  const inspectionActions: SubjectAction[] = inspections.map((inspection) => ({
    kind: "inspection",
    key: `inspection:${inspection.id}`,
    label: inspection.label,
    eyebrow: inspection.id.startsWith("exploratory-")
      ? "Explore · calibration only"
      : inspection.eyebrow ?? "Inspect",
    summary: inspection.summary,
    inspectionId: inspection.id,
  }));

  const relationActions: SubjectAction[] = relations.map((relation) => ({
    kind: "relation",
    key: `relation:${relation.from}:${relation.to}:${relation.type}`,
    label: relation.node.label,
    eyebrow: relation.label,
    summary: relation.type,
    nodeId: relation.node.id,
    edgeType: relation.type,
  }));

  // Ordinary World interaction should expose a small, diverse set of useful paths first
  // rather than dumping every available record/evidence/relation into the initial pane.
  return [
    relationActions[0],
    recordActions[0],
    inspectionActions[0],
    recordActions[1],
    relationActions[1],
    inspectionActions[1],
    ...recordActions.slice(2),
    ...relationActions.slice(2),
    ...inspectionActions.slice(2),
  ].filter((action): action is SubjectAction => Boolean(action));
}

export function SubjectPane(props: SubjectPaneProps) {
  const { node } = props;
  const body = node.body ?? [];
  const status = node.status;
  const publication = node.publication;
  const immediateBody = body[0];
  const remainingBody = body.slice(1);

  if (props.variant === "glance") {
    return (
      <article className="subject-pane subject-pane--glance public-interest-panel public-interest-panel--glance">
        <span className="public-interest-panel__kind">At a glance</span>
        {props.glanceHeading ? <strong>{props.glanceHeading}</strong> : null}
        <p>{immediateBody ?? node.summary}</p>
      </article>
    );
  }

  const { onInspect, onNavigate } = props;
  const orderedActions = getSubjectActions(node);

  const primaryActions = orderedActions.slice(0, 4);
  const remainingActions = orderedActions.slice(4);

  const hasContent =
    body.length > 0 ||
    Boolean(status) ||
    Boolean(publication) ||
    primaryActions.length > 0 ||
    remainingActions.length > 0;

  if (!hasContent) return null;

  return (
    <section className="subject-pane" aria-label={`At a glance for ${node.label}`}>
      <header className="subject-pane__header">
        <span className="subject-pane__label">At a glance</span>
        {publication ? (
          <span className="work-status-chip publication-status-chip" data-stage={publication.stage}>
            {publication.label}
          </span>
        ) : status ? (
          <span className="work-status-chip" data-stage={status.stage}>{status.label}</span>
        ) : null}
      </header>

      {immediateBody ? (
        <div className="subject-pane__body">
          <p>{immediateBody}</p>
        </div>
      ) : null}

      {publication ? (
        <div className="subject-pane__standing">
          <span>Next publication gate</span>
          <p>{publication.nextGate}</p>
        </div>
      ) : status ? (
        <div className="subject-pane__standing">
          <span>Current standing</span>
          <p>{status.detail}</p>
        </div>
      ) : null}

      {primaryActions.length ? (
        <section className="subject-pane__primary" aria-label="Immediate next paths">
          <div className="subject-pane__group-label">Continue from here</div>
          <div className="subject-pane__action-grid">
            {primaryActions.map((action) => (
              <ActionCard
                key={action.key}
                action={action}
                onInspect={onInspect}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      ) : null}

      {remainingBody.length || remainingActions.length ? (
        <div className="subject-pane__secondary">
          {remainingBody.length ? (
            <details className="subject-pane__disclosure">
              <summary>More context · {remainingBody.length}</summary>
              <div className="subject-pane__disclosure-body">
                {remainingBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </details>
          ) : null}

          {remainingActions.length ? (
            <details className="subject-pane__disclosure">
              <summary>More paths · {remainingActions.length}</summary>
              <div className="subject-pane__action-grid subject-pane__action-grid--secondary">
                {remainingActions.map((action) => (
                  <ActionCard
                    key={action.key}
                    action={action}
                    onInspect={onInspect}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
