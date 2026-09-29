import { provenanceGallery } from "./content/publicState";
import { ProvenanceStillStrip } from "./ProvenanceStillStrip";
import styles from "./styles/LabThroughTime.module.css";

export function ProvenanceArtifactGallery() {
  const roomSurvey = provenanceGallery.artifacts.find(
    (artifact) => artifact.id === "ARTIFACT-PROV-ROOM-SURVEY",
  );

  if (!roomSurvey?.sequence) return null;

  return (
    <section
      className={styles.provenanceGallerySection}
      data-room-survey="true"
      aria-labelledby="research-room-survey-title"
    >
      <header className={styles.provenanceGalleryHeader}>
        <div>
          <p className={styles.sectionIndex}>RESEARCH ROOM SURVEY · C. 2019–2021</p>
          <h2 id="research-room-survey-title">The research had a room before it had a Lab.</h2>
          <p>
            Five stills from the preserved survey video show the physical scale and
            organization of the independent research period that preceded the current
            AI-accelerated institution.
          </p>
        </div>
      </header>

      <div className={styles.provenanceGrid}>
        <article
          className={styles.provenanceCard}
          data-featured="true"
        >
          <ProvenanceStillStrip
            sequence={roomSurvey.sequence}
            role={roomSurvey.role}
            period={roomSurvey.period}
            caption="Five stills from the preserved room-survey video, shown together as a spatial record."
          />

          <div className={styles.provenanceBody}>
            <div className={styles.provenanceTopline}>
              <span>PHYSICAL RESEARCH ENVIRONMENT</span>
              <code>{roomSurvey.period}</code>
            </div>

            <h3>{roomSurvey.title}</h3>
            <p>
              By this period, the work had expanded into a room-scale environment of
              notes, books, whiteboards, diagrams, and active research surfaces.
            </p>

            <div className={styles.provenanceEstablishes}>
              <span>WHAT THE IMAGES ESTABLISH</span>
              <p>
                {provenanceGallery.publicClaim} They establish scale, organization, and
                chronology—not correctness, priority, or maturity of every claim visible in
                the room.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
