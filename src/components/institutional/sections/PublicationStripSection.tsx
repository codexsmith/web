import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { publicationStrip } from "../content/publications";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function PublicationStripSection() {
  return (
    <section className={styles.publicationStrip}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>MORE FROM THE PUBLICATION FIELD</>}
        title={<>Follow the machinery across established domains.</>}
        note={<>Computer science leads this supporting layer, followed by mathematics and physics calibrations. Selection is editorial; stage and readiness remain source-governed.</>}
      />

      <div
        className={styles.publicationStripTrack}
        role="list"
        aria-label="Supporting publication selections"
        tabIndex={0}
      >
        {publicationStrip.map((publication, index) => (
          <article
            className={styles.publicationStripCard}
            data-tone={publication.tone}
            role="listitem"
            key={publication.id}
          >
            <div className={styles.publicationStripTopline}>
              <span>{publication.discipline}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>

            <p className={styles.publicationStripDomain}>{publication.domain}</p>
            <h3>{publication.title}</h3>
            <p className={styles.publicationStripSummary}>{publication.summary}</p>

            <div className={styles.publicationStripState}>
              <span>STAGE {publication.stage}</span>
              <span>READINESS {publication.readiness}</span>
            </div>

            <div className={styles.publicationStripSignals}>
              {publication.signals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>

            <code className={styles.publicationStripSource}>{publication.sourceRef}</code>
          </article>
        ))}
      </div>

      <p className={styles.publicationStripHint}>
        Scroll horizontally to continue through the controlled publication field.
      </p>
    </section>
  );
}
