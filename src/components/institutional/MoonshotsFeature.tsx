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
    title: "Where the machinery is pointed.",
    note:
      "The active research surface describes work under present pressure. Moonshots names the longer objectives that organize what capabilities the Lab is trying to earn over time.",
  },
  projects: {
    eyebrow: "BEYOND THE CURRENT PROJECT SET",
    title: "Projects are pressure tests. Moonshots are the longer vector.",
    note:
      "Current projects test bounded systems now. The Moonshots program makes visible the larger research infrastructure those tests may eventually support without treating ambition as achieved capability.",
  },
  "open-lab": {
    eyebrow: "OPEN PROBLEM FIELD",
    title: "The long-horizon program should be exposed to outside pressure too.",
    note:
      "Moonshots collects objectives whose open problems are too large for a closed loop. Criticism, counterexamples, specialist knowledge, collaboration, and failed approaches are useful inputs here.",
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

  return (
    <section
      className={styles.moonshotsFeature}
      data-context={context}
      aria-labelledby={`moonshots-feature-${context}`}
    >
      <div className={styles.signalRail} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.moonshotsLead}>
        <p>{copy.eyebrow}</p>
        <h2 id={`moonshots-feature-${context}`}>{copy.title}</h2>
        <p className={styles.moonshotsSummary}>{moonshots.summary}</p>
        <p className={styles.moonshotsNote}>{copy.note}</p>

        <Link className={styles.moonshotsLink} href="/research/moonshots">
          Enter Moonshots <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.objectivePanel}>
        <header>
          <span>06 OBJECTIVES</span>
          <strong>Ambition stays decomposable.</strong>
        </header>

        <ol className={styles.objectiveRail}>
          {objectives.map((objective, index) => (
            <li key={objective.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{objective.shortLabel ?? objective.label}</strong>
            </li>
          ))}
        </ol>

        <p className={styles.claimBoundary}>
          Long-horizon objectives are not claims of completion, scientific validation,
          market value, external adoption, or inevitability.
        </p>
      </div>
    </section>
  );
}
