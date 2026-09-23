"use client";

import React from "react";
import Link from "next/link";
import { CollapsibleSection } from "../CollapsibleSection";
import { LabObjectIdentity } from "../LabObjectIdentity";
import { type projects } from "../content/projects";

export function FeaturedProjectCard({
  project,
  styles,
}: {
  project: (typeof projects)[number];
  styles: Record<string, string>;
}) {
  return (
    <CollapsibleSection
      as="article"
      className={styles.projectCaseCard}
      data-project-tone={project.tone}
      defaultOpen={false}
      header={({ isOpen, toggle }) => (
        <button
          className={styles.projectHeaderToggle}
          onClick={toggle}
          aria-expanded={isOpen}
          style={{
            appearance: "none",
            background: "transparent",
            border: "none",
            textAlign: "left",
            whiteSpace: "normal",
            cursor: "pointer",
            width: "100%",
            padding: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={styles.projectHeaderContent}>
            <div className={styles.projectCaseTopline}>
              <div className={styles.projectHeaderTitleArea}>
                <p className={styles.projectCaseType}>{project.type}</p>
                <h3>{project.title}</h3>
              </div>
              <LabObjectIdentity
                kind="project"
                hideKind={true}
                status={project.status}
                statusLabel="SOURCE STATUS"
                variant="compact"
              />
            </div>

            <div className={styles.projectCaseFacts}>
              <div>
                <span>NATIVE DOMAIN</span>
                <strong>{project.domain}</strong>
              </div>
              <div>
                <span>PRIMARY STRESS</span>
                <strong>{project.stress}</strong>
              </div>
            </div>

            <blockquote>{project.question}</blockquote>
          </div>
          
          <div className={styles.projectHeaderChevron}>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            >
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      )}
    >
      <div className={styles.projectDrawerContent}>
        <div className={styles.projectExploreAction}>
          <Link href={project.href} className={styles.projectExploreLink}>
            Explore Project <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.projectCaseResult}>
          <span>WHAT EXISTS / CURRENT RESULT</span>
          <p>{project.result}</p>
        </div>

        <div className={styles.projectConsequenceGrid}>
          <div>
            <span>AGENCY</span>
            <p>{project.agency}</p>
          </div>
          <div>
            <span>STEWARDSHIP</span>
            <p>{project.stewardship}</p>
          </div>
        </div>

        <div className={styles.projectTransferSignal}>
          <span>TRANSFER SIGNAL</span>
          {project.transfer}
        </div>
      </div>
    </CollapsibleSection>
  );
}
