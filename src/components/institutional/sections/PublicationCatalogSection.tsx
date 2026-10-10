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
        title={<>Selected research artifacts, with status and limits visible.</>}
        note={
          <>
            This is a curated first look at current publication records. Being shown here
            does not mean a paper has been published, peer reviewed, proven correct, or
            approved for release.
          </>
        }
      />

      <div className={styles.publicationCatalogState} aria-label="Publication catalog source state">
        <div>
          <span>CATALOG</span>
          <strong>CURATED PUBLIC SELECTION</strong>
        </div>
        <div>
          <span>SELECTED RECORDS</span>
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
                <dt>CURRENT SOURCE SCALE</dt>
                <dd>{source.recordCount} records</dd>
              </div>
              <div>
                <dt>WHAT THIS SOURCE CONTROLS</dt>
                <dd>{source.authority}</dd>
              </div>
            </dl>
            <p className={styles.privateSourceNote}>
              Private Lab control source. This dated public projection shows its
              declared role and source scale without granting direct repository access.
            </p>
          </article>
        ))}
      </div>

      <div className={styles.publicationProjectionFirewall}>
        <span>PUBLICATION STATUS BOUNDARY</span>
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
