import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";
import { DevProductSwitch } from "@/components/version-switch/DevProductSwitch";
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

const capabilityStrip = [
  ["01", "Research artifacts"],
  ["02", "Operational tools"],
  ["03", "Public-interest analysis"],
  ["04", "Formal metrology"],
] as const;

const institutionCards = [
  {
    index: "01",
    title: "Research",
    description: "Theory, experiments, and working papers across computation, mathematics, physics, information, and scientific method.",
  },
  {
    index: "02",
    title: "Apparatus",
    description: "Registries, evidence systems, transforms, and operational machinery for making complex work inspectable.",
  },
  {
    index: "03",
    title: "Products",
    description: "Durable utility-bearing things made for people to use, learn from, support, buy, license, or carry elsewhere.",
  },
  {
    index: "04",
    title: "Projects",
    description: "Places where the method is applied, transferred, deployed, or deliberately stress-tested against real systems.",
  },
] as const;

const methodSteps = [
  ["01", "Representation", "Make the structure legible."],
  ["02", "State", "Model what changes and what persists."],
  ["03", "Transform", "Track lawful movement between forms."],
  ["04", "Defect", "Inspect breakdowns, closure failures, and edge cases."],
] as const;

const featuredWork = [
  {
    tag: "PRODUCT",
    title: "Boundary-First Chess",
    description: "A book-length teaching asset and developed pedagogy for making structural change on the board more legible.",
  },
  {
    tag: "PRODUCT",
    title: "Projectr / YouTube Knowledge Explorer",
    description: "A source-linked software wedge for turning long-form video into searchable, timestamped, structured knowledge.",
  },
  {
    tag: "RESEARCH APPARATUS",
    title: "Agentic Scientific Method",
    description: "Executable machinery for research, evidence handling, critique, verification, defect localization, and repair.",
  },
  {
    tag: "PUBLIC INTEREST",
    title: "Public Infrastructure Analysis",
    description: "Applied systems analysis for public records, workflows, institutions, uncertainty, and consequence-bearing processes.",
  },
] as const;

export function InstitutionalHomePreview() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/v3" aria-label="Boundary First Labs Website v3 home">
          <BoundaryFirstWaveLogo className={styles.logo} variant="compact" decorative />
          <span className={styles.brandCopy}>
            <strong>Boundary First Labs</strong>
            <span>Practice-born. Research-backed. Formally generalized.</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Website v3 route preview">
          {primaryRoutes.map((route) => (
            <span key={route}>{route}</span>
          ))}
        </nav>

        <div className={styles.headerTools}>
          <DevProductSwitch active="product" />
          <a className={styles.labLink} href="/v2">
            Enter the Lab
            <span aria-hidden="true">↗</span>
          </a>
        </div>
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
              <a className={styles.primaryAction} href="/v2">
                Explore the Lab
                <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondaryAction} href="/research">
                Read the Research
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <aside
            className={styles.heroVisual}
            role="img"
            aria-label="Concept study for the Boundary First Labs institutional visual language"
          >
            <div className={styles.mountainFar} aria-hidden="true" />
            <div className={styles.mountainNear} aria-hidden="true" />
            <div className={styles.water} aria-hidden="true" />
            <div className={styles.structure} aria-hidden="true">
              <div className={styles.structureWords}>
                <span>IDEAS</span>
                <span>METHODS</span>
                <span>INSTRUMENTS</span>
                <span>PUBLIC GOOD</span>
              </div>
              <strong>A MORE<br />LEGIBLE<br />WORLD</strong>
            </div>
            <div className={styles.visualMark}>
              <BoundaryFirstWaveLogo className={styles.visualLogo} variant="compact" decorative />
              <div>
                <span>BOUNDARY FIRST LABS</span>
                <small>CONCEPT STUDY</small>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.institutionCards} aria-label="Institutional routes">
          {institutionCards.map((card) => (
            <article className={styles.institutionCard} key={card.title}>
              <span className={styles.cardIndex}>{card.index}</span>
              <div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </article>
          ))}
        </section>

        <section className={styles.methodSection}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>OUR APPROACH</p>
            <h2>What the Lab does</h2>
            <p>Knowledge is treated as a system: represented, transformed, tested, measured, revised, and acted upon.</p>
          </div>

          <div className={styles.methodWorkbench}>
            <div className={styles.capabilityStrip} aria-label="What the Lab produces and supports">
              {capabilityStrip.map(([index, label]) => (
                <div className={styles.capability} key={label}>
                  <span>{index}</span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>

            <div className={styles.methodGrid}>
              {methodSteps.map(([index, title, description]) => (
                <article className={styles.methodStep} key={title}>
                  <span>{index}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>FEATURED WORK</p>
              <h2>Research that leaves the Lab.</h2>
            </div>
            <span>Selected products, projects, and research machinery</span>
          </div>

          <div className={styles.featuredGrid}>
            {featuredWork.map((item, index) => (
              <article className={styles.featuredCard} key={item.title}>
                <div className={styles.featuredVisual} data-variant={index + 1} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.featuredCopy}>
                  <span className={styles.featuredTag}>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={styles.featuredArrow} aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.posture}>
          <div>
            <p className={styles.sectionIndex}>OUR STANCE</p>
            <h2>Working posture</h2>
          </div>
          <p>
            Sober, inspectable, and criticism-friendly. The Lab is built to absorb counterexamples, refine its machinery, and produce artifacts that can be examined by others.
          </p>
          <blockquote>“Better systems for a more legible world.”</blockquote>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <BoundaryFirstWaveLogo className={styles.footerLogo} variant="compact" decorative />
          <div>
            <strong>Boundary First Labs</strong>
            <span>Practice-born. Research-backed. Formally generalized.</span>
          </div>
        </div>

        <div className={styles.footerNav}>
          {primaryRoutes.map((route) => <span key={route}>{route}</span>)}
        </div>

        <div className={styles.footerMeta}>
          <span>© 2026 Boundary First Labs</span>
          <a href="/v2">Enter the Lab ↗</a>
        </div>
      </footer>
    </div>
  );
}
