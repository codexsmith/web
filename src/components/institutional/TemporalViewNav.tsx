import Link from "next/link";
import { temporalViews, type TemporalViewId } from "./content/publicState";
import styles from "./styles/TemporalViewNav.module.css";

export function TemporalViewNav({ activeView }: { activeView: TemporalViewId }) {
  return (
    <section className={styles.temporalNav} aria-label="Lab temporal views">
      <header>
        <span>THREE TIME SCALES</span>
        <strong>Recent motion. Present posture. Long memory.</strong>
      </header>

      <div className={styles.temporalGrid}>
        {temporalViews.map((view) => (
          <Link
            aria-current={view.id === activeView ? "page" : undefined}
            className={styles.temporalCard}
            data-active={view.id === activeView ? "true" : "false"}
            href={view.href}
            key={view.id}
          >
            <span>{view.relation}</span>
            <strong>{view.label}</strong>
            <p>{view.question}</p>
            <small>{view.description}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
