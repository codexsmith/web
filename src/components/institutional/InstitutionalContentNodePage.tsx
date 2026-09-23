import Link from "next/link";
import type { ContentNode } from "@/lib/content";
import { nodes } from "@/lib/content";
import { institutionalContentNodeRoutes } from "@/lib/site-release";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/ContentNode.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const admittedRoutes = new Set<string>(institutionalContentNodeRoutes);

function routeFor(node: ContentNode) {
  return `/${node.path}`;
}

function kindLabel(kind: ContentNode["kind"]) {
  const labels: Record<ContentNode["kind"], string> = {
    root: "Institution",
    branch: "Program area",
    product: "Product",
    service: "Service",
    project: "Project",
    research: "Research",
    method: "Method",
    standard: "Standard",
    foundation: "Foundation",
    theory: "Theory",
    about: "Institution",
    document: "Document",
  };
  return labels[kind];
}

function topLevelRoute(node: ContentNode) {
  const segment = node.path.split("/")[0];
  if (segment === "products") return { href: "/products", label: "Products" };
  if (segment === "about") return { href: "/about", label: "About" };
  if (segment === "people") return { href: "/about", label: "About" };
  return { href: "/research", label: "Research" };
}

function bodyTitle(node: ContentNode) {
  if (node.kind === "branch" || node.kind === "research") return "What this area contains.";
  if (node.kind === "about" || node.kind === "document") return "How this part of the Lab works.";
  return "What this work currently says.";
}

export function InstitutionalContentNodePage({
  node,
}: {
  node: ContentNode;
}) {
  const parent = node.parentId
    ? nodes.find((candidate) => candidate.id === node.parentId)
    : undefined;
  const children = nodes.filter(
    (candidate) =>
      candidate.parentId === node.id &&
      candidate.path &&
      admittedRoutes.has(routeFor(candidate)),
  );
  const body = node.body ?? [];
  const inspections = node.inspection ?? [];
  const related = node.links ?? [];
  const topLevel = topLevelRoute(node);

  return (
    <InstitutionalPageShell mainClassName={styles.contentNodePage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.contentNodeHero}
        eyebrow={<>{node.eyebrow}</>}
        title={<>{node.label}</>}
        lead={<>{node.summary}</>}
      >
        <aside className={styles.contentNodeLedger}>
          <div>
            <span>OBJECT</span>
            <strong>{kindLabel(node.kind)}</strong>
          </div>
          {node.status ? (
            <div>
              <span>PUBLIC STATUS</span>
              <strong>{node.status.label}</strong>
            </div>
          ) : null}
          {parent ? (
            <div>
              <span>CONTEXT</span>
              <strong>{parent.label}</strong>
            </div>
          ) : null}
        </aside>
      </InstitutionalRouteHero>

      {body.length ? (
        <section className={styles.contentNodeBody}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>CURRENT PUBLIC RECORD</>}
            title={<>{bodyTitle(node)}</>}
            note={
              node.status?.detail ? <>{node.status.detail}</> : undefined
            }
          />

          <div className={styles.contentNodeBodyGrid}>
            {body.map((paragraph, index) => (
              <article key={`${node.id}-body-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {children.length ? (
        <section className={styles.contentNodeChildren}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>INSIDE THIS AREA</>}
            title={<>Follow the work one level deeper.</>}
            note={<>These routes now use the same institutional v3 surface.</>}
          />
          <div className={styles.contentNodeChildGrid}>
            {children.map((child) => (
              <Link href={routeFor(child)} key={child.id}>
                <small>{child.eyebrow}</small>
                <strong>{child.label}</strong>
                <p>{child.summary}</p>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {inspections.map((inspection) => (
        <section className={styles.contentNodeInspection} key={inspection.id}>
          <div className={styles.contentNodeInspectionLead}>
            <p className={styles.sectionIndex}>{inspection.eyebrow}</p>
            <h2>{inspection.label}</h2>
            <p>{inspection.summary}</p>
          </div>

          <div>
            <ol className={styles.contentNodeInspectionList}>
              {inspection.bullets.map((bullet, index) => (
                <li key={bullet}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{bullet}</p>
                </li>
              ))}
            </ol>

            {inspection.links?.length ? (
              <nav
                className={styles.contentNodeInlineLinks}
                aria-label={`${inspection.label} related links`}
              >
                {inspection.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </nav>
            ) : null}

            {inspection.sourceRef ? (
              <div className={styles.contentNodeSource}>
                <span>SOURCE REFERENCE</span>
                <code>{inspection.sourceRef}</code>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {related.length ? (
        <section className={styles.contentNodeRelated}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>RELATED WORK</>}
            title={<>Continue through the public work graph.</>}
          />
          <div className={styles.contentNodeRelatedLedger}>
            {related.map((link, index) => (
              <Link href={link.href} key={`${link.href}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {link.eyebrow ? <small>{link.eyebrow}</small> : null}
                  <strong>{link.label}</strong>
                  {link.summary ? <p>{link.summary}</p> : null}
                </div>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.contentNodeClose}>
        <div>
          <p className={styles.sectionIndex}>KEEP EXPLORING</p>
          <h2>This record belongs to a larger public system.</h2>
        </div>
        <nav aria-label="Content record navigation">
          <Link href={topLevel.href}>
            {topLevel.label} <span aria-hidden="true">→</span>
          </Link>
          <Link href="/atlas">
            Lab Atlas <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact">
            Contact <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
