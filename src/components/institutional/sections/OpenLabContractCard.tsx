"use client";

import Link from "next/link";
import { CollapsibleSection } from "../CollapsibleSection";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/OpenLab.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import { type OpenLabParticipationContract } from "../content/openLab";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function OpenLabContractCard({
  contract,
}: {
  contract: OpenLabParticipationContract;
}) {
  return (
    <CollapsibleSection
      as="article"
      className={styles.openLabContractCard}
      data-open-lab-tone={contract.tone}
      defaultOpen={false}
      header={({ isOpen, toggle }) => (
        <div className={styles.openLabContractHeader}>
          <div className={styles.openLabContractTitleRow}>
            <span className={styles.openLabContractCode}>{contract.code}</span>
            <h3>{contract.title}</h3>
            <code>{contract.type}</code>
          </div>

          <p className={styles.openLabContractSubtitle}>
            {contract.subtitle}
          </p>
          <p className={styles.openLabContractDescription}>
            {contract.description}
          </p>

          <div className={styles.openLabContractHeaderFooter}>
            <Link
              className={styles.openLabContractAction}
              href={
                "/open-lab?type=" +
                encodeURIComponent(contract.type) +
                "#open-lab-intake"
              }
            >
              Inspect this intake route{" "}
              <span aria-hidden="true">-&gt;</span>
            </Link>

            <button
              className={styles.openLabHeaderToggle}
              onClick={toggle}
              aria-expanded={isOpen}
              aria-label="Toggle details"
            >
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
            </button>
          </div>
        </div>
      )}
    >
      <div className={styles.openLabDrawerContent}>
        <div className={styles.openLabOrdinaryLanguage}>
          <span>WHAT WE ASK IN ORDINARY LANGUAGE</span>
          <ul>
            {contract.ordinaryLanguage.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.openLabOutcome}>
          <span>POSSIBLE ROUTING / OUTCOME</span>
          <p>{contract.possibleOutcomes}</p>
        </div>

        <div className={styles.openLabBoundary}>
          <span>BOUNDARY</span>
          <p>{contract.boundary}</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
