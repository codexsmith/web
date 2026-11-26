import styles from "./styles/DoctrineFrontDoor.module.css";

export type ReaderMastheadKind = "boundary" | "operation" | "observation" | "collaboration";

// Decorative engravings, not quantitative diagrams, alternate logos, or
// representations of private research. Public figures carry captions and
// accessible descriptions separately; this ornament intentionally carries
// no content or action that a reader must perceive.
export function ReaderMastheadField({ kind }: { kind: ReaderMastheadKind }) {
  return (
    <svg className={styles.mastheadField} data-reader-masthead={kind}
      viewBox="0 0 200 160" aria-hidden="true" focusable="false">
      <g className={styles.mastheadGuide}>
        <path d="M8 26V8h18M174 8h18v18M8 134v18h18M174 152h18v-18" />
        <path d="M100 8v144M8 80h184" strokeDasharray="2 5" />
        <path d="M20 144h160M20 141v6M60 141v6M100 139v10M140 141v6M180 141v6" />
      </g>
      {kind === "boundary" && (
        <>
          <g className={styles.mastheadContour}>
            <circle cx="100" cy="74" r="62" />
            <circle cx="100" cy="74" r="45" />
            <circle cx="100" cy="74" r="25" />
            <path d="M38 74C59 31 81 117 100 74S141 31 162 74" />
          </g>
          <path className={styles.mastheadAccented} d="M100 74L144 30" />
          <circle className={styles.mastheadWitness} cx="144" cy="30" r="3.4" />
        </>
      )}
      {kind === "operation" && (
        <>
          <g className={styles.mastheadContour}>
            <rect x="26" y="24" width="148" height="100" rx="2" />
            <path d="M69 43H45v62h24M131 43h24v62h-24" />
            <rect x="80" y="54" width="40" height="40" />
            <path d="M45 74h35M120 74h35M80 54l40 40M80 94l40-40" />
          </g>
          <path className={styles.mastheadAccented} d="M80 74h40" />
          <circle className={styles.mastheadWitness} cx="100" cy="74" r="3.4" />
        </>
      )}
      {kind === "observation" && (
        <>
          <g className={styles.mastheadContour}>
            <circle cx="100" cy="74" r="62" />
            <circle cx="100" cy="74" r="43" />
            <circle cx="100" cy="74" r="19" />
            <path d="M100 12v19M162 74h-19M100 136v-19M38 74h19M56 30l88 88M56 118l88-88" />
            <path d="M100 74L142 45M142 45l-12-9M142 45l-2 15" />
          </g>
          <path className={styles.mastheadAccented} d="M100 74L142 45" />
          <circle className={styles.mastheadWitness} cx="142" cy="45" r="3.4" />
        </>
      )}
      {kind === "collaboration" && (
        <>
          <g className={styles.mastheadContour}>
            <circle cx="76" cy="74" r="48" />
            <circle cx="124" cy="74" r="48" />
            <circle cx="76" cy="74" r="31" />
            <circle cx="124" cy="74" r="31" />
            <path d="M76 74h48M100 32.43v83.14" />
          </g>
          <path className={styles.mastheadAccented}
            d="M100 32.43A48 48 0 0 1 100 115.57A48 48 0 0 1 100 32.43Z" />
          <circle className={styles.mastheadWitness} cx="100" cy="74" r="3.4" />
        </>
      )}
    </svg>
  );
}
