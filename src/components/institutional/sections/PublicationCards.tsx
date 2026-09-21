"use client";

import React from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import { type PublicationRecord } from "../content/publications";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function PublicationMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.publicationMetaCell}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function PublicationAvailability({
  surfaces,
}: {
  surfaces: readonly string[];
}) {
  return (
    <div className={styles.publicationAvailability}>
      {surfaces.map((surface) => (
        <span key={surface}>{surface}</span>
      ))}
    </div>
  );
}

export function PublicationSourceContract({
  publication,
}: {
  publication: PublicationRecord;
}) {
  return (
    <div className={styles.publicationSourceContract}>
      <div>
        <span>SOURCE AUTHORITY</span>
        <strong>{publication.sourceLabel}</strong>
        <small>{publication.sourceRegistryId}</small>
      </div>
      <div>
        <span>SOURCE RECORD</span>
        <code>{publication.sourceRef}</code>
      </div>
      <a href={publication.sourceHref} target="_blank" rel="noreferrer">
        Inspect pinned source <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  );
}

export function PublicationControlDetails({
  publication,
}: {
  publication: PublicationRecord;
}) {
  const hasDetails =
    Boolean(publication.publicationGate) ||
    Boolean(publication.dependencies?.length) ||
    Boolean(publication.evidencePlan?.length) ||
    Boolean(publication.feeds?.length);

  if (!hasDetails) return null;

  return (
    <div className={styles.publicationControlDetails}>
      {publication.publicationGate ? (
        <div className={styles.publicationDetailGroup}>
          <span>PUBLICATION GATE</span>
          <p>{publication.publicationGate}</p>
        </div>
      ) : null}

      {publication.dependencies?.length ? (
        <div className={styles.publicationDetailGroup}>
          <span>DEPENDENCIES</span>
          <ul>
            {publication.dependencies.map((dependency) => (
              <li key={dependency.id}>
                <strong>{dependency.id}</strong>
                <span>{dependency.title}</span>
                <small>{dependency.status}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.evidencePlan?.length ? (
        <div className={styles.publicationDetailGroup}>
          <span>EVIDENCE PLAN</span>
          <ul>
            {publication.evidencePlan.map((item) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.feeds?.length ? (
        <div className={styles.publicationDetailGroup}>
          <span>GRAPH FEEDS</span>
          <ul>
            {publication.feeds.map((item) => (
              <li key={item}>
                <code>{item}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function PublicationAuthorityFirewall({
  publication,
}: {
  publication: PublicationRecord;
}) {
  return (
    <div className={styles.publicationAuthorityFirewall}>
      <span>AUTHORITY CEILING</span>
      <p>{publication.sourceAuthority}</p>
    </div>
  );
}

export function FeaturedPublicationCard({
  featuredPublication,
}: {
  featuredPublication: PublicationRecord;
}) {
  return (
    <CollapsibleSection
      as="div"
      className={styles.featuredPublicationBody}
      defaultOpen={false}
      header={({ isOpen, toggle }) => (
        <button
          className={styles.publicationHeaderToggle}
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <p className={styles.publicationLane}>{featuredPublication.lane}</p>
          <h3>{featuredPublication.title}</h3>
          <p className={styles.publicationAbstract}>{featuredPublication.orientation}</p>

          <div className={styles.publicationMetaGrid}>
            <PublicationMeta label="TYPE" value={featuredPublication.type} />
            <PublicationMeta label="DOMAIN" value={featuredPublication.domain} />
            <PublicationMeta label="SOURCE STATE" value={featuredPublication.sourceState} />
            <PublicationMeta label="CONTROL SURFACE" value={featuredPublication.sourceLabel} />
          </div>
          
          <div className={styles.publicationHeaderChevron}>
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
      <div className={styles.publicationDrawerContent}>
        <div className={styles.publicationClaimCeiling}>
          <span>CLAIM CEILING</span>
          <p>{featuredPublication.claimCeiling}</p>
        </div>

        <PublicationControlDetails publication={featuredPublication} />
        <PublicationAvailability surfaces={featuredPublication.surfaces} />
        <PublicationSourceContract publication={featuredPublication} />
        <PublicationAuthorityFirewall publication={featuredPublication} />
      </div>
    </CollapsibleSection>
  );
}

export function SupportingPublicationCard({
  publication,
}: {
  publication: PublicationRecord;
}) {
  return (
    <CollapsibleSection
      as="article"
      className={styles.publicationRecordCard}
      data-tone={publication.tone}
      id={"publication-" + publication.id}
      defaultOpen={false}
      header={({ isOpen, toggle }) => (
        <button
          className={styles.publicationHeaderToggle}
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <div className={styles.publicationTypeLine}>
            <span>{publication.typeCode}</span>
            <strong>{publication.type}</strong>
          </div>

          <p className={styles.publicationLane}>{publication.lane}</p>
          <h3>{publication.title}</h3>
          <p className={styles.publicationAbstract}>{publication.orientation}</p>

          <div className={styles.publicationRecordMeta}>
            <PublicationMeta label="DOMAIN" value={publication.domain} />
            <PublicationMeta label="CONTROL SURFACE" value={publication.sourceLabel} />
            <PublicationMeta label="SOURCE STATE" value={publication.sourceState} />
            <PublicationMeta label="REGISTRY" value={publication.sourceRegistryId} />
          </div>
          
          <div className={styles.publicationHeaderChevron}>
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
      <div className={styles.publicationDrawerContent}>
        <div className={styles.publicationClaimCeiling}>
          <span>CLAIM CEILING</span>
          <p>{publication.claimCeiling}</p>
        </div>

        <PublicationControlDetails publication={publication} />
        <PublicationAvailability surfaces={publication.surfaces} />
        <PublicationSourceContract publication={publication} />
        <PublicationAuthorityFirewall publication={publication} />
      </div>
    </CollapsibleSection>
  );
}
