import type { ReactNode } from "react";
import type { CssModule } from "./styles/composeCssModules";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function InstitutionalRouteHero({
  styles,
  className,
  eyebrow,
  title,
  lead,
  support,
  childLinks,
  children,
}: {
  styles: CssModule;
  className: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  support?: ReactNode;
  childLinks?: readonly {
    label: string;
    href: string;
  }[];
  children?: ReactNode;
}) {
  return (
    <section className={className} data-institutional-hero>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        {lead ? <p className={styles.routeLead}>{lead}</p> : null}
        {support ? <p className={styles.routeSupport}>{support}</p> : null}
      </div>

      {children || childLinks?.length ? (
        <div className={styles.routeHeroAside}>
          {children ? (
            <div className={styles.routeHeroAsideContent}>{children}</div>
          ) : null}

          {childLinks?.length ? (
            <nav className={styles.routeChildNav} aria-label="Child pages">
              <span className={styles.routeChildLabel}>
                {childLinks.length === 1 ? "CHILD PAGE" : "CHILD PAGES"}
              </span>
              <div className={styles.routeChildLinks}>
                {childLinks.map((link) => (
                  <a className={styles.routeChildLink} href={link.href} key={link.href}>
                    <span className={styles.routeChildDependencyMark} aria-hidden="true">
                      <svg
                        className={styles.routeChildDependencyIcon}
                        viewBox="0 0 28 28"
                        role="presentation"
                      >
                        <rect x="3" y="4" width="8" height="8" rx="1.5" />
                        <rect x="17" y="16" width="8" height="8" rx="1.5" />
                        <path d="M10.5 10.5L17.5 17.5" />
                        <path d="M15 17.5H17.5V15" />
                      </svg>
                    </span>
                    <span className={styles.routeChildCopy}>
                      <small>DEPENDENCY</small>
                      <strong>{link.label}</strong>
                    </span>
                    <span className={styles.routeChildArrow} aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </nav>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function InstitutionalSectionHeader({
  styles,
  eyebrow,
  title,
  note,
  className,
}: {
  styles: CssModule;
  eyebrow: ReactNode;
  title: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(styles.sectionHeader, className)}>
      <div>
        <p className={styles.sectionIndex}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note ? <span>{note}</span> : null}
    </div>
  );
}

export function InstitutionalSectionLead({
  styles,
  eyebrow,
  title,
  description,
  className,
}: {
  styles: CssModule;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(styles.sectionLead, className)}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
