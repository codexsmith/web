import {
  publicationProjection,
  selectedPublications,
} from "../content/publications";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const featuredPublication = selectedPublications.find((publication) => publication.featured);
const supportingPublications = selectedPublications.filter((publication) => !publication.featured);

import {
  FeaturedPublicationCard,
  SupportingPublicationCard,
} from "./PublicationCards";

export function PublicationCatalogSection() {
  return (
    <section className={styles.publicationCatalog}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>PUBLICATION INDEX</>}
        title={<>Research artifacts, with their controlling state attached.</>}
        note={
          <>
            Curated first-contact projection over three publication-control authorities.
            Selection here does not promote publication maturity, peer review, truth,
            novelty, or scientific authority.
          </>
        }
      />

      <div className={styles.publicationCatalogState} aria-label="Publication catalog source state">
        <div>
          <span>CATALOG MODE</span>
          <strong>SOURCE-GOVERNED SELECTION</strong>
        </div>
        <div>
          <span>SOURCE-BOUND RECORDS</span>
          <strong>{selectedPublications.length} BOUND</strong>
        </div>
        <div>
          <span>LAB SOURCE REVISION</span>
          <strong>{publicationProjection.sourceRevision.slice(0, 12)}</strong>
        </div>
      </div>

      <div className={styles.publicationControlSources}>
        {publicationProjection.sources.map((source) => (
          <article className={styles.publicationControlSource} key={source.registryId}>
            <div>
              <span>{source.registryId}</span>
              <strong>{source.label}</strong>
            </div>
            <p>{source.role}</p>
            <dl>
              <div>
                <dt>VISIBLE SOURCE SCALE</dt>
                <dd>{source.recordCount} records</dd>
              </div>
              <div>
                <dt>AUTHORITY</dt>
                <dd>{source.authority}</dd>
              </div>
            </dl>
            <a href={source.href} target="_blank" rel="noreferrer">
              Inspect registry <span aria-hidden="true">-&gt;</span>
            </a>
          </article>
        ))}
      </div>

      <div className={styles.publicationProjectionFirewall}>
        <span>PUBLIC PROJECTION FIREWALL</span>
        <strong>{publicationProjection.authority}</strong>
      </div>

      {featuredPublication ? (
        <article
          className={styles.featuredPublication}
          data-tone={featuredPublication.tone}
          id={"publication-" + featuredPublication.id}
        >
          <div className={styles.publicationFolio} aria-hidden="true">
            <div className={styles.folioTopline}>
              <span>{featuredPublication.typeCode}</span>
              <span>{featuredPublication.sourceRegistryId}</span>
            </div>
            <div className={styles.folioMark}>BFL</div>
            <p>{featuredPublication.id}</p>
            <strong>{featuredPublication.type}</strong>
            <small>{featuredPublication.sourceLabel}</small>
          </div>

          <FeaturedPublicationCard featuredPublication={featuredPublication} />
        </article>
      ) : null}

      <div className={styles.publicationRecordGrid}>
        {supportingPublications.map((publication) => (
          <SupportingPublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </section>
  );
}
