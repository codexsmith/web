import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { LabObjectIdentity } from "../LabObjectIdentity";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  publicationProjection,
  selectedPublications,
  type PublicationRecord,
} from "../content/publications";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const featuredPublication = selectedPublications.find((publication) => publication.featured);
const supportingPublications = selectedPublications.filter((publication) => !publication.featured);

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

function PublicationSourceContract({
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

function PublicationControlDetails({
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

function PublicationAuthorityFirewall({
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

          <div className={styles.featuredPublicationBody}>
            <LabObjectIdentity
              identifier={featuredPublication.id}
              identifierLabel="SOURCE ID"
              kind="publication"
              status={featuredPublication.recordState}
              statusLabel={featuredPublication.statusLabel}
              variant="compact"
            />
            <p className={styles.publicationLane}>{featuredPublication.lane}</p>
            <h3>{featuredPublication.title}</h3>
            <p className={styles.publicationAbstract}>{featuredPublication.orientation}</p>

            <div className={styles.publicationMetaGrid}>
              <PublicationMeta label="TYPE" value={featuredPublication.type} />
              <PublicationMeta label="DOMAIN" value={featuredPublication.domain} />
              <PublicationMeta label="SOURCE STATE" value={featuredPublication.sourceState} />
              <PublicationMeta label="CONTROL SURFACE" value={featuredPublication.sourceLabel} />
            </div>

            <div className={styles.publicationClaimCeiling}>
              <span>CLAIM CEILING</span>
              <p>{featuredPublication.claimCeiling}</p>
            </div>

            <PublicationControlDetails publication={featuredPublication} />
            <PublicationAvailability surfaces={featuredPublication.surfaces} />
            <PublicationSourceContract publication={featuredPublication} />
            <PublicationAuthorityFirewall publication={featuredPublication} />
          </div>
        </article>
      ) : null}

      <div className={styles.publicationRecordGrid}>
        {supportingPublications.map((publication) => (
          <article
            className={styles.publicationRecordCard}
            data-tone={publication.tone}
            id={"publication-" + publication.id}
            key={publication.id}
          >
            <LabObjectIdentity
              identifier={publication.id}
              identifierLabel="SOURCE ID"
              kind="publication"
              status={publication.recordState}
              statusLabel={publication.statusLabel}
              variant="compact"
            />

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

            <div className={styles.publicationClaimCeiling}>
              <span>CLAIM CEILING</span>
              <p>{publication.claimCeiling}</p>
            </div>

            <PublicationControlDetails publication={publication} />
            <PublicationAvailability surfaces={publication.surfaces} />
            <PublicationSourceContract publication={publication} />
            <PublicationAuthorityFirewall publication={publication} />
          </article>
        ))}
      </div>
    </section>
  );
}
