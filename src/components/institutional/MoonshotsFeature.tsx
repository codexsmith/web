import Link from "next/link";
import { getChildren, getNode } from "@/lib/content";
import styles from "./styles/MoonshotsFeature.module.css";

type MoonshotsFeatureContext = "research" | "projects" | "open-lab";

const contextCopy: Record<
  MoonshotsFeatureContext,
  { eyebrow: string; title: string; note: string }
> = {
  research: {
    eyebrow: "LONG-HORIZON RESEARCH",
    title: "What the Lab is trying to become capable of doing.",
    note:
      "The active research pages describe current work. Moonshots names the longer goals that organize which capabilities the Lab is trying to earn over time.",
  },
  projects: {
    eyebrow: "BEYOND THE CURRENT PROJECT SET",
    title: "Projects test things now. Moonshots show the longer direction.",
    note:
      "Current projects test concrete systems. Moonshots shows what larger capabilities those projects may eventually support without pretending those capabilities already exist.",
  },
  "open-lab": {
    eyebrow: "OPEN PROBLEMS",
    title: "Eight long-horizon research goals.",
    note:
      "The Lab welcomes criticism, counterexamples, specialist knowledge, and collaboration around work that should improve under outside pressure.",
  },
};

export function MoonshotsFeature({
  context,
}: {
  context: MoonshotsFeatureContext;
}) {
  const moonshots = getNode("moonshots");
  const objectives = getChildren("moonshots");
  const copy = contextCopy[context];
  const isOpenLab = context === "open-lab";

  return (
    <section
      className={styles.moonshotsFeature}
      data-context={context}
      aria-labelledby={`moonshots-feature-${context}`}
    >
      <div className={styles.moonshotsFrame}>
        <header className={styles.moonshotsHeader}>
          <div className={styles.moonshotsLead}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h2 id={`moonshots-feature-${context}`}>{copy.title}</h2>
            {!isOpenLab ? (
              <p className={styles.moonshotsSummary}>{moonshots.summary}</p>
            ) : null}
            <p className={styles.moonshotsNote}>{copy.note}</p>
          </div>

          <div className={styles.moonshotsIdentity} aria-label="Moonshots program scope">
            <span>MOONSHOTS</span>
            <strong>{String(objectives.length).padStart(2, "0")}</strong>
            <small>LONG-HORIZON OBJECTIVES</small>
          </div>
        </header>

        <div className={styles.objectiveIndex}>
          <div className={styles.objectiveIndexHeader}>
            <span>OBJECTIVE INDEX</span>
            <strong>Big goals must break into smaller tests.</strong>
          </div>

          <ol>
            {objectives.map((objective, index) => (
              <li key={objective.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{objective.shortLabel ?? objective.label}</strong>
              </li>
            ))}
          </ol>
        </div>

        <footer className={styles.moonshotsFooter}>
          <p className={styles.claimBoundary}>
            Long-horizon goals are not claims of completion, scientific validation,
            market value, external adoption, or inevitability.
          </p>

          <Link className={styles.moonshotsLink} href="/research/moonshots">
            Explore Moonshots <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
