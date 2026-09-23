"use client";

import { CollapsibleSection } from "../CollapsibleSection";
import { LabObjectIdentity } from "../LabObjectIdentity";
import { type programs } from "../content/research";

export function ResearchProgramCard({
  program,
  styles,
}: {
  program: (typeof programs)[0];
  styles: Record<string, string>;
}) {
  return (
    <CollapsibleSection
      as="article"
      className={styles.researchProgramCard}
      data-tone={program.tone}
      defaultOpen={false}
      header={({ isOpen, toggle }) => (
        <button
          className={styles.programHeaderToggle}
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
          <div className={styles.programHeaderContent}>
            <div className={styles.programHeaderLeft}>
              <p className={styles.programRole}>{program.role}</p>
              <h3>{program.title}</h3>

              <div className={styles.programIdentityPrimary}>
                <LabObjectIdentity
                  identifier={program.code}
                  identifierLabel="CODE"
                  kind="research"
                  status={program.state}
                  hideStatus
                  variant="compact"
                />
              </div>

              <div className={styles.programIdentityState}>
                <LabObjectIdentity
                  hideKind
                  kind="research"
                  status={program.state}
                  statusLabel="STATE"
                  variant="compact"
                />
              </div>
            </div>
            <div className={styles.programHeaderRight}>
              <p className={styles.programSummary}>{program.summary}</p>
            </div>
          </div>
          
          <div className={styles.programHeaderChevron}>
            <svg
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>
      )}
    >
      <div className={styles.programStatusGrid}>
        <div>
          <span>{program.statusLabel}</span>
          <strong>{program.status}</strong>
        </div>
        <div className={styles.programQuestionPanel}>
          <span>GOVERNING QUESTION</span>
          <p>{program.question}</p>
        </div>
      </div>

      <div className={styles.programWorkingSurface}>
        <span>WORKING SURFACE</span>
        <div>
          {program.workingSurface.map((item) => (
            <strong key={item}>{item}</strong>
          ))}
        </div>
      </div>

      <div className={styles.programBoundary}>
        <span>CLAIM / AUTHORITY BOUNDARY</span>
        {program.boundary}
      </div>
    </CollapsibleSection>
  );
}
