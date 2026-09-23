import type { ReactNode } from "react";
import type { CssModule } from "./styles/composeCssModules";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type ChildLinkKind =
  | "support"
  | "application"
  | "evidence"
  | "status"
  | "participation"
  | "provenance"
  | "governance"
  | "apparatus"
  | "experiment"
  | "claim"
  | "atlas";

function ChildLinkIcon({
  kind,
  className,
}: {
  kind: ChildLinkKind;
  className: string;
}) {
  const common = {
    className,
    viewBox: "0 0 28 28",
    role: "presentation" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "support":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="9" />
          <path d="M16.8 10.2c-.7-.8-1.7-1.2-3-1.2-1.7 0-2.8.8-2.8 2s1 1.8 3 2.2c2 .4 3 1.1 3 2.4 0 1.4-1.2 2.4-3.1 2.4-1.5 0-2.7-.5-3.5-1.4" />
          <path d="M14 7.5v13" />
        </svg>
      );
    case "application":
      return (
        <svg {...common}>
          <path d="M5 21.5l7.3-7.3" />
          <path d="M16.1 4.5a5 5 0 0 0-4.4 7.4l-6.8 6.8 4.4 4.4 6.8-6.8a5 5 0 0 0 6.9-6.1l-3.4 3.4-3.2-.9-.9-3.2L18.9 6a5 5 0 0 0-2.8-1.5Z" />
        </svg>
      );
    case "evidence":
      return (
        <svg {...common}>
          <path d="M7 4.5h10l4 4v15H7z" />
          <path d="M17 4.5v4h4" />
          <path d="m10.5 16 2.3 2.3 4.8-5" />
        </svg>
      );
    case "status":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="9.5" />
          <path d="M14 8.5V14l4 2.3" />
        </svg>
      );
    case "participation":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="3" />
          <circle cx="19" cy="11" r="2.5" />
          <path d="M4.5 22c.6-4.1 2.5-6.2 5.7-6.2 3.3 0 5.2 2.1 5.8 6.2" />
          <path d="M15.8 17.1c1-.8 2.1-1.2 3.3-1.2 2.5 0 4 1.7 4.4 5" />
        </svg>
      );
    case "provenance":
      return (
        <svg {...common}>
          <circle cx="14" cy="9" r="3.5" />
          <path d="M7.5 22c.8-4.6 3-6.9 6.5-6.9s5.7 2.3 6.5 6.9" />
          <path d="M4.5 6.5h3M6 5v3M20.5 6.5h3M22 5v3" />
        </svg>
      );
    case "governance":
      return (
        <svg {...common}>
          <path d="M14 4.5 22 8v6.2c0 4.6-3.1 7.6-8 9.3-4.9-1.7-8-4.7-8-9.3V8z" />
          <path d="M10.2 14.1 13 17l5-6" />
          <path d="M14 4.5v4" />
        </svg>
      );
    case "apparatus":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="3.5" />
          <path d="M14 4.5v3M14 20.5v3M4.5 14h3M20.5 14h3M7.3 7.3l2.1 2.1M18.6 18.6l2.1 2.1M20.7 7.3l-2.1 2.1M9.4 18.6l-2.1 2.1" />
          <circle cx="14" cy="14" r="8" />
        </svg>
      );
    case "experiment":
      return (
        <svg {...common}>
          <path d="M10.5 4.5h7M12 4.5v6.2l-5 9a2.3 2.3 0 0 0 2 3.3h10a2.3 2.3 0 0 0 2-3.3l-5-9V4.5" />
          <path d="M9.5 17h9" />
          <circle cx="13" cy="19.5" r="1" />
        </svg>
      );
    case "claim":
      return (
        <svg {...common}>
          <path d="M6 6.5h16v15H6z" />
          <path d="M9.5 10.5h9M9.5 14h7M9.5 17.5h5" />
          <path d="m18.2 17.2 1.4 1.4 2.8-3.2" />
        </svg>
      );
    case "atlas":
      return (
        <svg {...common}>
          <circle cx="7" cy="9" r="2.5" />
          <circle cx="21" cy="7" r="2.5" />
          <circle cx="14" cy="21" r="2.5" />
          <path d="M9.4 8.6 18.5 7.4M8.4 11l4.4 7.7M19.8 9.1l-4.4 9.5" />
        </svg>
      );
  }
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
    relation: string;
    kind: ChildLinkKind;
    tone: "blue" | "gold" | "green" | "orange" | "teal" | "slate" | "indigo";
  }[];
  children?: ReactNode;
}) {
  const visibleChildLinks = childLinks?.slice(0, 6);

  return (
    <section className={className} data-institutional-hero>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        {lead ? <p className={styles.routeLead}>{lead}</p> : null}
        {support ? <p className={styles.routeSupport}>{support}</p> : null}
      </div>

      {children || visibleChildLinks?.length ? (
        <div className={styles.routeHeroAside}>
          {children ? (
            <div className={styles.routeHeroAsideContent}>{children}</div>
          ) : null}

          {visibleChildLinks?.length ? (
            <nav className={styles.routeChildNav} aria-label="Related pages">
              <span className={styles.routeChildLabel}>RELATED</span>
              <div className={styles.routeChildLinks}>
                {visibleChildLinks.map((link) => (
                  <a
                    className={styles.routeChildLink}
                    data-tone={link.tone}
                    href={link.href}
                    key={link.href}
                  >
                    <span className={styles.routeChildMark} aria-hidden="true">
                      <ChildLinkIcon
                        kind={link.kind}
                        className={styles.routeChildIcon}
                      />
                    </span>
                    <span className={styles.routeChildCopy}>
                      <small>{link.relation}</small>
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
