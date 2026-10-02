import type { CSSProperties, ReactNode } from "react";
import type {
  RepresentationalLabClaimBoundary,
  RepresentationalLabIdentity,
  RepresentationalLabLayout,
  RepresentationalLabMetric,
  RepresentationalLabTone,
  RepresentationalLabTraceEvent,
} from "./lab-patterns";
import styles from "./representational-lab-shell.module.css";

type ShellProps = {
  labId: string;
  identity: RepresentationalLabIdentity;
  layout?: RepresentationalLabLayout;
  metric?: RepresentationalLabMetric;
  claimBoundary?: RepresentationalLabClaimBoundary;
  primary: ReactNode;
  secondary?: ReactNode;
  footer?: ReactNode;
  accent?: string;
  background?: string;
  className?: string;
};

type PanelProps = {
  children: ReactNode;
  as?: "section" | "aside" | "article" | "div";
  ariaLabel?: string;
  className?: string;
};

type StatusProps = {
  label: ReactNode;
  detail?: ReactNode;
  tone?: RepresentationalLabTone;
  className?: string;
};

type TraceProps = {
  events: RepresentationalLabTraceEvent[];
  emptyLabel?: string;
  className?: string;
};

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function RepresentationalLabShell({
  labId,
  identity,
  layout = "instrument-inspector",
  metric,
  claimBoundary,
  primary,
  secondary,
  footer,
  accent,
  background,
  className,
}: ShellProps) {
  const shellStyle = {
    ...(accent ? { "--rl-accent": accent } : {}),
    ...(background ? { "--rl-bg": background } : {}),
  } as CSSProperties;

  return (
    <main
      className={classNames(styles.shell, className)}
      style={shellStyle}
      aria-labelledby={`${labId}-title`}
      data-lab-layout={layout}
    >
      <header className={styles.header}>
        <div className={styles.identity}>
          <p className={styles.eyebrow}>{identity.eyebrow}</p>
          <h1 id={`${labId}-title`}>{identity.title}</h1>
          <div className={styles.description}>{identity.description}</div>
        </div>
        {metric ? <RepresentationalLabMetricBadge metric={metric} /> : null}
      </header>

      {claimBoundary ? (
        <section
          className={styles.claimBoundary}
          data-tone={claimBoundary.tone ?? "caution"}
          aria-label="Claim boundary"
        >
          <strong>{claimBoundary.label}</strong>
          <div>{claimBoundary.detail}</div>
        </section>
      ) : null}

      <div className={styles.workspace} data-layout={layout}>
        <div className={styles.primarySlot}>{primary}</div>
        {secondary ? <div className={styles.secondarySlot}>{secondary}</div> : null}
      </div>

      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </main>
  );
}

export function RepresentationalLabPanel({
  children,
  as = "section",
  ariaLabel,
  className,
}: PanelProps) {
  const Tag = as;
  return (
    <Tag className={classNames(styles.panel, className)} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}

export function RepresentationalLabSectionLabel({ children }: { children: ReactNode }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

export function RepresentationalLabMetricBadge({ metric }: { metric: RepresentationalLabMetric }) {
  return (
    <div className={styles.metricBadge} aria-label={`${metric.label}: ${String(metric.value)}`}>
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      {metric.detail ? <small>{metric.detail}</small> : null}
    </div>
  );
}

export function RepresentationalLabStatus({
  label,
  detail,
  tone = "info",
  className,
}: StatusProps) {
  return (
    <div
      className={classNames(styles.status, className)}
      data-tone={tone}
      aria-live="polite"
    >
      <span>{label}</span>
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

export function RepresentationalLabTrace({
  events,
  emptyLabel = "No consequential events recorded yet.",
  className,
}: TraceProps) {
  if (events.length === 0) {
    return <p className={classNames(styles.traceEmpty, className)}>{emptyLabel}</p>;
  }

  return (
    <ol className={classNames(styles.trace, className)}>
      {events.map((event) => (
        <li key={`${event.seq}-${event.label}`} data-tone={event.tone ?? "neutral"}>
          <span>{String(event.seq).padStart(2, "0")}</span>
          <div>
            <strong>{event.label}</strong>
            <p>{event.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
