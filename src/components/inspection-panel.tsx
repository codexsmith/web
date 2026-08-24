"use client";

import { BfuxIcon } from "@/components/bfux-icons";
import type { Inspection } from "@/lib/content";

type InspectionPanelProps = {
  inspection: Inspection;
  onClose: () => void;
};

export function InspectionPanel({ inspection, onClose }: InspectionPanelProps) {
  return (
    <div className="inspection-layer" role="dialog" aria-modal="true" aria-labelledby="inspection-title">
      <button className="inspection-layer__backdrop" onClick={onClose} aria-label="Close inspection" />
      <section className="inspection-panel inspection-panel--instrument">
        <div className="inspection-panel__rail">
          <span className="inspection-panel__rail-label">
            <BfuxIcon name="inspect" />
            <span>Through</span>
          </span>
          <button className="inspection-panel__close" onClick={onClose}>
            <BfuxIcon name="close" />
            <span>Close</span>
          </button>
        </div>
        <div className="inspection-panel__content">
          <p className="eyebrow">{inspection.eyebrow}</p>
          <h2 id="inspection-title">{inspection.label}</h2>
          <p className="lede">{inspection.summary}</p>
          <ul>
            {inspection.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          {inspection.sourceRef ? (
            <div className="inspection-source">
              <span>
                <BfuxIcon name="trace" />
                Retained source
              </span>
              <code>{inspection.sourceRef}</code>
            </div>
          ) : null}

          {inspection.links?.length ? (
            <div className="inspection-record-links">
              {inspection.links.map((link) => (
                <a href={link.href} key={`${inspection.id}-${link.href}`}>
                  <span>{link.eyebrow ?? "Related record"}</span>
                  <strong>{link.label}</strong>
                  {link.summary ? <small>{link.summary}</small> : null}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
