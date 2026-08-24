"use client";

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
  return (
    <main
      className="world-viewport detail-surface inspection-surface"
      data-detail-kind="inspection"
      aria-labelledby="inspection-title"
    >
      <section className="detail-workbench inspection-workbench">
        <header className="inspection-surface__header">
          <div className="inspection-surface__identity">
            <BfuxIcon name="inspect" />
            <div>
              <span>{inspection.eyebrow} · inspection</span>
              <h2 id="inspection-title">{inspection.label}</h2>
            </div>
          </div>
          <button className="inspection-surface__close" type="button" onClick={onClose}>
            <BfuxIcon name="back" />
            <span>Return to object</span>
          </button>
          <p className="inspection-surface__summary">{inspection.summary}</p>
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
      </section>
    </main>
  );
}
