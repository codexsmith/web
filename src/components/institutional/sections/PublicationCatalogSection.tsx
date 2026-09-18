import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import { publicationStubs } from "../content/publications";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const featuredPublication = publicationStubs.find((publication) => publication.featured);
const supportingPublications = publicationStubs.filter((publication) => !publication.featured);

function PublicationMeta({
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

function PublicationAvailability({
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

export function PublicationCatalogSection() {
  return (
    <section className={styles.publicationCatalog}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>PUBLICATION INDEX</>}
        title={<>Research artifacts, with their state attached.</>}
        note={<>UI stubs only. Canonical documents, dates, identifiers, links, and source-owned publication states will be bound later.</>}
      />

      <div className={styles.publicationCatalogState} aria-label="Publication catalog placeholder state">
        <div>
          <span>CATALOG MODE</span>
          <strong>UI STUBS</strong>
        </div>
        <div>
          <span>CANONICAL DOCUMENTS</span>
          <strong>0 BOUND</strong>
        </div>
        <div>
          <span>NEXT INTEGRATION</span>
          <strong>SOURCE-GOVERNED RECORDS</strong>
        </div>
      </div>

      {featuredPublication ? (
        <article
          className={styles.featuredPublication}
          data-tone={featuredPublication.tone}
        >
          <div className={styles.publicationFolio} aria-hidden="true">
            <div className={styles.folioTopline}>
              <span>{featuredPublication.typeCode}</span>
              <span>UI STUB</span>
            </div>
            <div className={styles.folioMark}>BFL</div>
            <p>{featuredPublication.id}</p>
            <strong>{featuredPublication.type}</strong>
            <small>NO DOCUMENT BOUND</small>
          </div>

          <div className={styles.featuredPublicationBody}>
            <div className={styles.publicationRecordTopline}>
              <span>{featuredPublication.id}</span>
              <span>{featuredPublication.recordState}</span>
            </div>
            <p className={styles.publicationLane}>{featuredPublication.lane}</p>
            <h3>{featuredPublication.title}</h3>
            <p className={styles.publicationAbstract}>{featuredPublication.abstract}</p>

            <div className={styles.publicationMetaGrid}>
              <PublicationMeta label="TYPE" value={featuredPublication.type} />
              <PublicationMeta label="DOMAIN" value={featuredPublication.domain} />
              <PublicationMeta label="SOURCE STATE" value={featuredPublication.sourceState} />
              <PublicationMeta label="RESEARCH LANE" value={featuredPublication.lane} />
            </div>

            <div className={styles.publicationClaimCeiling}>
              <span>CLAIM CEILING</span>
              <p>{featuredPublication.claimCeiling}</p>
            </div>

            <PublicationAvailability surfaces={featuredPublication.surfaces} />
          </div>
        </article>
      ) : null}

      <div className={styles.publicationRecordGrid}>
        {supportingPublications.map((publication) => (
          <article
            className={styles.publicationRecordCard}
            data-tone={publication.tone}
            key={publication.id}
          >
            <div className={styles.publicationRecordTopline}>
              <span>{publication.id}</span>
              <span>{publication.recordState}</span>
            </div>

            <div className={styles.publicationTypeLine}>
              <span>{publication.typeCode}</span>
              <strong>{publication.type}</strong>
            </div>

            <p className={styles.publicationLane}>{publication.lane}</p>
            <h3>{publication.title}</h3>
            <p className={styles.publicationAbstract}>{publication.abstract}</p>

            <div className={styles.publicationRecordMeta}>
              <PublicationMeta label="DOMAIN" value={publication.domain} />
              <PublicationMeta label="SOURCE STATE" value={publication.sourceState} />
            </div>

            <div className={styles.publicationClaimCeiling}>
              <span>CLAIM CEILING</span>
              <p>{publication.claimCeiling}</p>
            </div>

            <PublicationAvailability surfaces={publication.surfaces} />
          </article>
        ))}
      </div>
    </section>
  );
}
