import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { LabObjectIdentity } from "../LabObjectIdentity";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  canonicalPublications,
  canonicalPublicationStageCounts,
} from "../content/publications";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const featuredPublication = canonicalPublications.find((publication) => publication.featured);
const supportingPublications = canonicalPublications.filter((publication) => !publication.featured);

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

function PublicationActions({
  publication,
}: {
  publication: (typeof canonicalPublications)[number];
}) {
  return (
    <div className={styles.publicationActions}>
      <a href={publication.href}>Inspect record</a>
      <a href={publication.sourceHref}>Canonical source</a>
      <a href={publication.rawSourceHref} download>Download source</a>
    </div>
  );
}

function PublicationProvenance({
  publication,
}: {
  publication: (typeof canonicalPublications)[number];
}) {
  return (
    <div className={styles.publicationProvenance}>
      <div>
        <span>CANONICAL SOURCE</span>
        <code>{publication.sourceRef}</code>
      </div>
      <div>
        <span>CITATION</span>
        <p>{publication.citation}</p>
      </div>
      {publication.related.length ? (
        <div>
          <span>DECLARED RELATIONS</span>
          <nav>
            {publication.related.map((relation) => (
              <a href={relation.href} key={`${relation.relation}-${relation.href}`}>
                {relation.relation}: {relation.title}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

function PublicationCardBody({
  publication,
  featured = false,
}: {
  publication: (typeof canonicalPublications)[number];
  featured?: boolean;
}) {
  return (
    <>
      <LabObjectIdentity
        identifier={publication.id}
        identifierLabel="RECORD"
        kind="publication"
        status={publication.recordState}
        statusLabel="STATE"
        variant="compact"
      />

      <div className={styles.publicationTypeLine}>
        <span>{publication.typeCode}</span>
        <strong>{publication.type}</strong>
      </div>

      <p className={styles.publicationLane}>{publication.lane}</p>
      <h3>{publication.title}</h3>
      <p className={styles.publicationAbstract}>{publication.abstract}</p>

      <div className={featured ? styles.publicationMetaGrid : styles.publicationRecordMeta}>
        <PublicationMeta label="STAGE" value={publication.stage} />
        <PublicationMeta label="CLAIM MATURITY" value={publication.claimMaturity} />
        <PublicationMeta label="AUDIENCE" value={publication.audience} />
        {featured ? (
          <PublicationMeta label="VERSION" value={publication.version ?? "Not declared"} />
        ) : null}
      </div>

      <div className={styles.publicationClaimCeiling}>
        <span>CLAIM / VALIDATION BOUNDARY</span>
        <p>{publication.claimCeiling}</p>
      </div>

      <div className={styles.publicationNextGate}>
        <span>NEXT PUBLICATION GATE</span>
        <p>{publication.nextGate}</p>
      </div>

      <PublicationAvailability surfaces={publication.surfaces} />
      <PublicationActions publication={publication} />
      <PublicationProvenance publication={publication} />
    </>
  );
}

export function PublicationCatalogSection() {
  const lifecycleSummary = Object.entries(canonicalPublicationStageCounts)
    .map(([stage, count]) => `${stage}: ${count}`)
    .join(" · ");

  return (
    <section className={styles.publicationCatalog}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>PUBLICATION INDEX</>}
        title={<>Canonical publication objects, not presentation stubs.</>}
        note={<>This projection is derived from the first-class publication portfolio. Lifecycle state, version, claim maturity, source path, and declared relations remain owned by the canonical record.</>}
      />

      <div className={styles.publicationCatalogState} aria-label="Canonical publication catalog state">
        <div>
          <span>CATALOG MODE</span>
          <strong>CANONICAL REGISTRY</strong>
        </div>
        <div>
          <span>SOURCE-GOVERNED OBJECTS</span>
          <strong>{canonicalPublications.length} RECORDS</strong>
        </div>
        <div>
          <span>LIFECYCLE DISTRIBUTION</span>
          <strong>{lifecycleSummary}</strong>
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
              <span>{featuredPublication.stage.toUpperCase()}</span>
            </div>
            <div className={styles.folioMark}>BFL</div>
            <p>{featuredPublication.id}</p>
            <strong>{featuredPublication.type}</strong>
            <small>{featuredPublication.version ?? "UNVERSIONED SOURCE"}</small>
          </div>

          <div className={styles.featuredPublicationBody}>
            <PublicationCardBody publication={featuredPublication} featured />
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
            <PublicationCardBody publication={publication} />
          </article>
        ))}
      </div>
    </section>
  );
}
