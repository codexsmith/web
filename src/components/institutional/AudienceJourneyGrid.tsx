import Link from "next/link";
import type { AudienceJourney } from "./content/audiences";
import styles from "./styles/AudienceJourneyGrid.module.css";

export function AudienceJourneyGrid({
  journeys,
  compact = false,
}: {
  journeys: readonly AudienceJourney[];
  compact?: boolean;
}) {
  return (
    <div
      className={styles.grid}
      data-compact={compact ? "true" : "false"}
      aria-label="Audience-specific paths through Boundary First Labs"
    >
      {journeys.map((journey) => (
        <article
          className={styles.journey}
          data-tone={journey.tone}
          id={compact ? undefined : journey.id}
          key={journey.id}
        >
          <header>
            <span>{journey.shortLabel}</span>
            <h2>{journey.question}</h2>
            <p>{journey.description}</p>
          </header>

          <ol className={styles.path} aria-label={journey.label + " path"}>
            {journey.steps.map((step) => (
              <li key={step.label + step.href}>
                <Link href={step.href}>
                  <small>{step.label}</small>
                  <strong>{step.title}</strong>
                  {!compact ? <p>{step.reason}</p> : null}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>

          <Link className={styles.action} href={journey.action.href}>
            {journey.action.label}
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
