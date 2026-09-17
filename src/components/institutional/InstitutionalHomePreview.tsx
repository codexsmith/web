import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";
import styles from "./InstitutionalHomePreview.module.css";

const primaryRoutes = [
  "About",
  "Research",
  "Products",
  "Projects",
  "Apparatus",
  "Publications",
  "Open Lab",
];

const routeIndex = [
  ["Research", "What are we investigating?"],
  ["Apparatus", "How is the work made inspectable and executable?"],
  ["Products", "What durable utility-bearing things are being made?"],
  ["Projects", "Where has the method been applied or stress-tested?"],
  ["Publications", "What bounded artifacts can be read and challenged?"],
  ["Open Lab", "How can the public criticize, collaborate, or bring work?"],
] as const;

export function InstitutionalHomePreview() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/institutional-preview" aria-label="Boundary First Labs institutional preview home">
          <BoundaryFirstWaveLogo className={styles.logo} variant="compact" decorative />
          <span className={styles.brandWords}>
            <strong>BOUNDARY FIRST</strong>
            <span>LABS</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Website v3 route preview">
          {primaryRoutes.map((route) => (
            <span key={route}>{route}</span>
          ))}
        </nav>

        <a className={styles.labLink} href="/">
          Enter the Lab
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Practice-born. Research-backed. Formally generalized.</p>
            <h1>Systematizing knowledge for science, engineering, and public reasoning.</h1>
            <p className={styles.lead}>
              Boundary First Labs is an applied systems research laboratory studying how complex systems are represented, transformed, tested, and improved.
            </p>
            <p className={styles.bodyCopy}>
              We build research, methods, products, and operational tools for making consequential systems more legible, reasoning more inspectable, and useful capability easier to transfer.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="/">
                Explore the Lab
                <span aria-hidden="true">→</span>
              </a>
              <span className={styles.previewLabel}>Institutional shell preview</span>
            </div>
          </div>

          <aside className={styles.heroPlate} aria-label="Boundary First Labs institutional identity">
            <div className={styles.plateMeta}>
              <span>BOUNDARY FIRST LABS</span>
              <span>EST. 2026</span>
            </div>
            <div className={styles.plateMark}>
              <BoundaryFirstWaveLogo className={styles.plateLogo} variant="compact" decorative />
            </div>
            <div className={styles.plateFooter}>
              <span>APPLIED SYSTEMS</span>
              <strong>RESEARCH LABORATORY</strong>
            </div>
          </aside>
        </section>

        <section className={styles.routeBand} aria-labelledby="route-band-title">
          <div className={styles.routeBandIntro}>
            <p className={styles.sectionIndex}>01 / INSTITUTION</p>
            <h2 id="route-band-title">A public front door to the work.</h2>
          </div>
          <div className={styles.routeGrid}>
            {routeIndex.map(([title, description], index) => (
              <article className={styles.routeCard} key={title}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Boundary First Labs</span>
        <span>Institutional preview · Website v3</span>
        <a href="/">Enter the Lab ↗</a>
      </footer>
    </div>
  );
}
