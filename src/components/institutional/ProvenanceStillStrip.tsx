import Image from "next/image";
import type { ProvenanceStillSequence } from "./content/publicState";
import styles from "./styles/LabThroughTime.module.css";

export function ProvenanceStillStrip({
  sequence,
  role,
  period,
}: {
  sequence: ProvenanceStillSequence;
  role: string;
  period: string;
}) {
  return (
    <figure className={styles.provenancePanorama}>
      <div
        className={styles.provenancePanoramaFrames}
        aria-label="Five-frame research-room survey panorama"
      >
        {sequence.frames.map((frame, index) => (
          <div className={styles.provenancePanoramaFrame} key={frame.sha256}>
            <Image
              src={frame.imageSrc}
              alt={frame.alt}
              fill
              sizes="20vw"
              priority={index === 0}
            />
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </div>
        ))}

        <div className={styles.provenanceMediaTag}>
          <span>{role}</span>
          <small>{period}</small>
        </div>
      </div>

      <figcaption>
        <span>VIDEO-DERIVED PAN SEQUENCE</span>
        <p>{sequence.note}</p>
      </figcaption>
    </figure>
  );
}
