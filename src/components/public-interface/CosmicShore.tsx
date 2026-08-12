import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import styles from "./CosmicShore.module.css";

export function CosmicShore({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      aria-label="A quiet drafting-style shore study featuring the circular Cosmic Shoreline logo."
      className={`${styles.figure} ${compact ? "min-h-[20rem]" : ""}`}
    >
      <div aria-hidden="true" className={styles.horizon} />
      <div aria-hidden="true" className={styles.shore} />
      <CosmicShoreMark
        aria-hidden="true"
        className={styles.mark}
        surface="dark"
      />
      <div aria-hidden="true" className={styles.beacon} />
      <p className={styles.annotation}>
        Cosmic Shore · circle logo study
      </p>
      <figcaption className={styles.caption}>
        <span>Representation has a boundary.</span>
        <span>Consequence continues beyond it.</span>
      </figcaption>
    </figure>
  );
}
