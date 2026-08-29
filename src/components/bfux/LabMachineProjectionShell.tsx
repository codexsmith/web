"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BfuxIcon } from "@/components/bfux-icons";
import { getLabMachineNode } from "./lab-machine-model";
import { LabMachineObjectCarrier } from "./LabMachineObjectCarrier";
import { LabMachineRelationRail } from "./LabMachineRelationRail";
import { useLabMachineNavigation } from "./LabMachineNavigationContext";
import "./lab-machine-projection.css";
import "./lab-machine-density.css";

const contextualSummarySelectors = [
  ".bf-publications-projection__controls > p",
  ".bf-people__controls > p",
  ".bf-products-projection__controls > p",
  ".bf-research-projection__controls > p",
  ".bf-pipeline__controls > p",
  ".bf-governance__controls > p",
  ".bf-about__controls > p",
  ".bf-method__controls > p",
  ".bf-applications__controls > p",
  ".bf-service__controls > p",
  ".bf-value__posture > p",
];

const duplicateReadoutSelectors = [
  ".bf-publications-projection__readout",
  ".bf-people__readout",
  ".bf-products-projection__readout",
  ".bf-research-projection__readout",
  ".bf-pipeline__readout",
  ".bf-governance__readout",
  ".bf-timeline__state-readout",
];

function normalizeBadgeWords(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.length > 3 && word.endsWith("S") ? word.slice(0, -1) : word);
}

function badgesOverlap(left: string, right: string) {
  const leftWords = normalizeBadgeWords(left);
  const rightWords = normalizeBadgeWords(right);
  const leftNumber = left.match(/\d+/)?.[0];
  const rightNumber = right.match(/\d+/)?.[0];

  if (left.toUpperCase() === right.toUpperCase()) return true;
  if (!leftNumber || leftNumber !== rightNumber) return false;
  if (leftWords.includes("VISIBLE") || rightWords.includes("VISIBLE")) return true;

  const ignored = new Set(["PUBLIC", "PIPELINE", "CURRENT", "OPERATIONAL", "IN", "PLAY"]);
  const leftTerms = leftWords.filter((word) => !/^\d+$/.test(word) && !ignored.has(word));
  const rightTerms = rightWords.filter((word) => !/^\d+$/.test(word) && !ignored.has(word));
  return leftTerms.some((word) => rightTerms.includes(word));
}

function uniqueStrings(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.trim().replace(/\s+/g, " ").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function LabMachineProjectionShell({
  subsystem,
  projection,
  eyebrow,
  title,
  description,
  status,
  onBack,
  onClose,
  children,
}: {
  subsystem: string;
  projection: string;
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const shellRef = useRef<HTMLElement>(null);
  const rings = ["Boundary First Labs", "Lab Machine", subsystem, projection];
  const navigation = useLabMachineNavigation();
  const statusBadges = status?.split("·").map((item) => item.trim()).filter(Boolean) ?? [];
  const [glanceDetails, setGlanceDetails] = useState<string[]>([]);
  const [supplementalBadges, setSupplementalBadges] = useState<string[]>([]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const details: string[] = [];
    const badges: string[] = [];

    for (const selector of contextualSummarySelectors) {
      shell.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        const text = element.textContent?.trim();
        if (text && text !== description) details.push(text);
        element.hidden = true;
        element.parentElement?.setAttribute("data-bf-summary-harvested", "true");
      });
    }

    for (const selector of duplicateReadoutSelectors) {
      shell.querySelectorAll<HTMLElement>(selector).forEach((readout) => {
        readout.querySelectorAll<HTMLElement>(":scope > div").forEach((metric) => {
          const label = metric.querySelector("small")?.textContent?.trim();
          const value = metric.querySelector("strong")?.textContent?.trim();
          if (label && value) badges.push(`${value} ${label}`);
        });

        const prose = readout.querySelector<HTMLElement>(":scope > p")?.textContent?.trim();
        if (prose && prose !== description) details.push(prose);
        readout.hidden = true;
      });
    }

    const nextDetails = uniqueStrings(details).filter((detail) => detail.toLowerCase() !== description.trim().toLowerCase());
    const nextBadges = uniqueStrings(badges).filter(
      (badge) => !statusBadges.some((statusBadge) => badgesOverlap(statusBadge, badge)),
    );

    setGlanceDetails(nextDetails);
    setSupplementalBadges(nextBadges);
  }, [description, projection, status]);

  const allBadges = uniqueStrings([...statusBadges, ...supplementalBadges]);

  return (
    <section ref={shellRef} className="bf-projection-shell" aria-label={`${subsystem}: ${projection}`}>
      <header className="bf-projection-shell__header">
        <div className="bf-projection-shell__title">
          <span className="bf-projection-shell__glyph"><BfuxIcon name="projection" /></span>
          <div>
            <p>{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="bf-projection-shell__commands">
          <div className="bf-projection-shell__glance">
            <small>AT A GLANCE</small>
            <p>{description}</p>
            {glanceDetails.length ? (
              <div className="bf-projection-shell__glance-notes">
                {glanceDetails.map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            ) : null}
            {allBadges.length ? (
              <div className="bf-projection-shell__badges" aria-label={`${subsystem} summary figures`}>
                {allBadges.map((badge) => <span key={badge}>{badge}</span>)}
              </div>
            ) : null}
          </div>
          <div className="bf-projection-shell__actions">
            <button type="button" onClick={onBack}>BACK TO {subsystem.toUpperCase()}</button>
            <button type="button" onClick={onClose} aria-label="Close projection">CLOSE ×</button>
          </div>
        </div>
      </header>

      <aside className="bf-projection-map" aria-label="Boundary depth map">
        <div className="bf-projection-map__graphic" aria-hidden="true">
          <i data-ring="0" />
          <i data-ring="1" />
          <i data-ring="2" />
          <i data-ring="3" />
          <span />
        </div>
        <div className="bf-projection-map__legend">
          <small>BOUNDARY DEPTH</small>
          <ol>
            {rings.map((ring, index) => (
              <li key={ring} data-focus={index === rings.length - 1 ? "true" : "false"}>
                <span>{String(index).padStart(2, "0")}</span>
                <strong>{ring}</strong>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {navigation?.currentNodeId ? <div className="bf-projection-shell__traversal">
        <LabMachineObjectCarrier compact />
        <LabMachineRelationRail compact />
        <div className="bf-projection-shell__path">
          <small>BOUND PATH · {navigation.trail.length} RELATION{navigation.trail.length === 1 ? "" : "S"}</small>
          <strong>{navigation.focusLabel} → {getLabMachineNode(navigation.currentNodeId)?.label ?? subsystem}</strong>
          <span><button type="button" disabled={!navigation.trail.length} onClick={navigation.rewind}>BACK ONE</button><button type="button" disabled={!navigation.trail.length} onClick={navigation.clearTrail}>RESET FOCUS</button></span>
        </div>
      </div> : null}

      <div className="bf-projection-shell__workfield">{children}</div>
    </section>
  );
}
