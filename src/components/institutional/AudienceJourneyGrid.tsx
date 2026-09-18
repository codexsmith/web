import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import type { AudienceJourney } from "./content/audiences";
import styles from "./styles/AudienceJourneyGrid.module.css";

function AudienceJourneySummary({
  journey,
  compact,
}: {
  journey: AudienceJourney;
  compact: boolean;
}) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTopline}>
        <span>{journey.shortLabel}</span>
        <small>{journey.steps.length} stops</small>
      </div>

      <h2>{journey.question}</h2>
      <p className={styles.summaryDescription}>{journey.description}</p>

      <div className={styles.routePreview} aria-label="Path preview">
        {journey.steps.map((step) => (
          <span key={step.href}>{step.title}</span>
        ))}
      </div>

      <strong className={styles.inspectCue}>
        {compact ? "Choose this path" : "Inspect this path"}
        <span aria-hidden="true">↗</span>
      </strong>
    </div>
  );
}

function AudienceJourneyDetail({ journey }: { journey: AudienceJourney }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detailLead}>
        <div>
          <span>SUGGESTED TRAVERSAL</span>
          <strong>{journey.label}</strong>
        </div>
        <p>
          {journey.description} The sequence is guidance, not a tunnel; branch whenever
          another public object becomes more useful.
        </p>
      </div>

      <ol className={styles.path} aria-label={journey.label + " path"}>
        {journey.steps.map((step) => (
          <li key={step.label + step.href}>
            <Link href={step.href}>
              <small>{step.label}</small>
              <strong>{step.title}</strong>
              <p>{step.reason}</p>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>

      <Link className={styles.action} href={journey.action.href}>
        {journey.action.label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export function AudienceJourneyGrid({
  journeys,
  compact = false,
}: {
  journeys: readonly AudienceJourney[];
  compact?: boolean;
}) {
  const itemOrder = journeys.map((journey) => journey.id);

  return (
    <ReflowField
      className={[
        styles.field,
        compact ? styles.fieldCompact : styles.fieldFull,
      ].join(" ")}
      ariaLabel="Audience-specific paths through Boundary First Labs"
      layoutMode="focus-stage"
      itemOrder={itemOrder}
    >
      {journeys.map((journey) => (
        <ReflowFieldItem
          id={journey.id}
          label={journey.label}
          className={styles.journey}
          dataTone={journey.tone}
          key={journey.id}
          summary={<AudienceJourneySummary journey={journey} compact={compact} />}
          detail={<AudienceJourneyDetail journey={journey} />}
        />
      ))}
    </ReflowField>
  );
}
