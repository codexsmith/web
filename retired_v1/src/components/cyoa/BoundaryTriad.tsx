import Link from "next/link";
import { entryTriadBinding, entryTriadRoutes } from "@/lib/entry-triad";
import styles from "./triad.module.css";

export function BoundaryTriad() {
  const { bindingProtocol, projection } = entryTriadBinding;

  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Link className={styles.wordmark} href="/">
          <span aria-hidden="true">◎</span>
          <span>
            <strong>Boundary First Labs</strong>
            <small>People - Problem - Repair</small>
          </span>
        </Link>
        <span className={styles.instrumentLabel}>Entrance instrument · 01</span>
      </header>

      <section className={styles.intro}>
        <div className={styles.ornament} aria-hidden="true">
          <span />
        </div>
        <p className={styles.eyebrow}>{projection.eyebrow}</p>
        <h1>{projection.title}</h1>
        <p className={styles.lede}>{projection.introduction}</p>
      </section>

      <section
        className={styles.instrumentSection}
        aria-labelledby="triad-instruction"
      >
        <div className={styles.apparatus}>
          <div className={styles.tickRing} aria-hidden="true" />
          <nav className={styles.dial} aria-label="Choose where to begin">
            {entryTriadRoutes.map((route) => (
              <Link
                aria-label={`${route.label}: ${route.question} ${route.description}`}
                className={`${styles.slice} ${styles[route.id]}`}
                href={route.href}
                key={route.id}
              >
                <span className={styles.sliceCopy}>
                  <small>{route.bridge}</small>
                  <strong>{route.label}</strong>
                  <em>{route.question}</em>
                </span>
              </Link>
            ))}
            <span className={styles.hub} aria-hidden="true">
              <i />
            </span>
          </nav>
        </div>

        <p className={styles.instruction} id="triad-instruction">
          {projection.instruction}
        </p>
      </section>

      <footer className={styles.footer}>
        <span>{bindingProtocol.invariant}</span>
        <span>Boundary First - public teaching route</span>
      </footer>
    </main>
  );
}
