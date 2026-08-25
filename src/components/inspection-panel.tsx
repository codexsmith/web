"use client";

import type { KeyboardEvent } from "react";
import { BfuxInspectionArtifacts } from "@/components/bfux-content-artifact";
import { BfuxIcon } from "@/components/bfux-icons";
import type { Inspection } from "@/lib/content";
import type { ContentNode } from "@/lib/content-registry";
import { getRecordDetailHrefForLink } from "@/lib/record-detail-routing";

type InspectionPanelProps = {
  inspection: Inspection;
  owner?: ContentNode;
  onClose: () => void;
};

export function InspectionPanel({ inspection, owner, onClose }: InspectionPanelProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    onClose();
  }

  return (
    <aside
      className="world-viewport inspection-card-layer"
      data-detail-kind="inspection"
      data-inspection-id={inspection.id}
      onKeyDown={handleKeyDown}
    >
      <section
        className="inspection-workbench inspection-card"
        aria-labelledby="inspection-title"
        aria-describedby="inspection-summary"
      >
        <header className="inspection-surface__header">
          <div className="inspection-surface__identity">
            <BfuxIcon name="inspect" />
            <div>
              <span>{inspection.eyebrow} · attached inspection</span>
              <h2 id="inspection-title">{inspection.label}</h2>
            </div>
          </div>
          <button
            autoFocus
            aria-label="Close inspection"
            className="inspection-surface__close inspection-surface__close--icon"
            type="button"
            onClick={onClose}
          >
            <BfuxIcon name="close" />
            <span>Close</span>
          </button>
          <p id="inspection-summary" className="inspection-surface__summary">
            {inspection.summary}
          </p>
        </header>

        <div className="inspection-surface__content">
          <div className="inspection-surface__grid">
            <BfuxInspectionArtifacts inspection={inspection} />

            {inspection.sourceRef ? (
              <div className="inspection-surface__source">
                <span>Retained source</span>
                <code>{inspection.sourceRef}</code>
              </div>
            ) : null}

            {inspection.links?.length ? (
              <div className="inspection-surface__links" aria-label="Related retained records">
                {inspection.links.map((link) => {
                  const href = owner
                    ? getRecordDetailHrefForLink(owner, link.href) ?? link.href
                    : link.href;
                  return (
                    <a href={href} key={`${inspection.id}-${link.href}`}>
                      <small>{link.eyebrow ?? "Related record"}</small>
                      <strong>{link.label}</strong>
                      {link.summary ? <small>{link.summary}</small> : null}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <footer className="inspection-surface__footer">
          <span>Attached inspection · page location unchanged</span>
          <button
            className="inspection-surface__close inspection-surface__close--footer"
            type="button"
            onClick={onClose}
          >
            <BfuxIcon name="back" />
            <span>Close inspection</span>
          </button>
        </footer>
      </section>
    </aside>
  );
}
