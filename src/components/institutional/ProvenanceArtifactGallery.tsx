import Image from "next/image";
import { provenanceGallery } from "./content/publicState";
import styles from "./styles/LabThroughTime.module.css";

export function ProvenanceArtifactGallery() {
  return (
    <section className={styles.provenanceGallerySection} aria-labelledby="provenance-gallery-title">
      <header className={styles.provenanceGalleryHeader}>
        <div>
          <p className={styles.sectionIndex}>PRIMARY ARTIFACTS · FIRST PUBLIC SET</p>
          <h2 id="provenance-gallery-title">The pre-acceleration substrate is visible.</h2>
          <p>
            These are original media carried forward from Lab provenance packages, copied into
            the public site at the same pinned Lab revision as this timeline projection.
          </p>
        </div>

        <aside className={styles.provenanceContract}>
          <span>PUBLIC PROVENANCE CONTRACT</span>
          <strong>{provenanceGallery.publicClaim}</strong>
          <p>{provenanceGallery.claimCeiling}</p>
        </aside>
      </header>

      <div className={styles.provenanceGrid}>
        {provenanceGallery.artifacts.map((artifact, index) => {
          const sourceHref =
            `https://github.com/${provenanceGallery.sourceRepository}/blob/${provenanceGallery.sourceRevision}/${artifact.sourcePath}`;

          return (
            <article
              className={styles.provenanceCard}
              data-featured={index === 0 ? "true" : undefined}
              key={artifact.id}
            >
              <div className={styles.provenanceMedia}>
                <Image
                  src={artifact.imageSrc}
                  alt={artifact.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 34vw"}
                  priority={index === 0}
                />
                <div className={styles.provenanceMediaTag}>
                  <span>{artifact.role}</span>
                  <small>{artifact.period}</small>
                </div>
              </div>

              <div className={styles.provenanceBody}>
                <div className={styles.provenanceTopline}>
                  <span>{artifact.id}</span>
                  <code title={artifact.sha256}>SHA-256 {artifact.sha256.slice(0, 12)}…</code>
                </div>
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>

                <div className={styles.provenanceEstablishes}>
                  <span>WHAT THIS ESTABLISHES</span>
                  <p>{artifact.establishes}</p>
                </div>

                <div className={styles.provenanceUse}>
                  <span>PUBLIC USE</span>
                  <strong>{artifact.publicUse}</strong>
                </div>

                <a href={sourceHref} target="_blank" rel="noreferrer">
                  Inspect source at pinned Lab revision <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <footer className={styles.provenanceNext}>
        <span>NEXT PROVENANCE STRATA</span>
        <strong>2020 whiteboards → 2021 notes → professional method artifacts → current Git laboratory</strong>
        <p>
          Those layers are already indexed or partially packaged upstream. They remain separate
          from this first gallery until their primary media and public-use boundaries are projected
          with the same discipline.
        </p>
      </footer>
    </section>
  );
}
