import Link from "next/link";
import type { AudienceDataset, AudienceRouteConfig, RouteSelection } from "@/lib/audience/types";
import { compatibleAudiences, compatibleDoorways, routeHref } from "@/lib/audience/resolve";
import styles from "./audience.module.css";

export function AudienceRouteOutlet({ dataset, config, selection }: { dataset: AudienceDataset; config: AudienceRouteConfig; selection: RouteSelection }) {
  const audiences = compatibleAudiences(dataset, selection.intent?.id);
  const doorways = compatibleDoorways(dataset, selection.audience?.id);

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{config.labels.eyebrow}</p>
          <h1>{selection.audience ? selection.audience.title : config.labels.title}</h1>
          <p className={styles.lede}>{selection.audience?.arrivalStatement ?? config.labels.intro}</p>
        </div>
        <nav className={styles.headerActions} aria-label="Audience route actions">
          {(selection.intent || selection.audience || selection.doorway) && <Link href={config.basePath}>{config.labels.restart}</Link>}
          {config.showAtlasEscape && <Link href={config.atlasHref}>{config.labels.atlas}</Link>}
        </nav>
      </header>

      <div className={styles.progress} aria-label="Current route">
        <RouteCrumb label="Intent" value={selection.intent?.title} />
        <RouteCrumb label="Audience" value={selection.audience?.shortTitle} />
        <RouteCrumb label="Doorway" value={selection.doorway?.title} />
        <RouteCrumb label="Depth" value={selection.depth} />
      </div>

      {!selection.intent && (
        <section aria-labelledby="intent-title">
          <SectionHeading id="intent-title" kicker="Start from pressure" title="What brings you here?" body="Choose the need that is active now. This does not permanently classify you." />
          <div className={styles.grid}>
            {dataset.intents.map((intent) => (
              <ChoiceCard key={intent.id} href={routeHref(config, [intent.slug], intent.recommendedDepth)} title={intent.prompt} body={intent.summary} meta={intent.useCase} />
            ))}
          </div>
        </section>
      )}

      {selection.intent && !selection.audience && (
        <section aria-labelledby="audience-title">
          <SectionHeading id="audience-title" kicker="Choose your relation" title="Which position best matches you today?" body="The same person may use different routes at different times." />
          <div className={styles.grid}>
            {audiences.map((audience) => (
              <ChoiceCard key={audience.id} href={routeHref(config, [selection.intent?.slug, audience.slug], selection.depth)} title={audience.title} body={audience.arrivalStatement} meta={`${audience.depthRange.entry} → ${audience.depthRange.maximum}`} />
            ))}
          </div>
        </section>
      )}

      {selection.audience && !selection.doorway && (
        <section aria-labelledby="doorway-title">
          <SectionHeading id="doorway-title" kicker="Choose a familiar scene" title="Where should the method become concrete?" body="The doorway is an example, not the destination. It lowers the first conceptual burden." />
          <div className={styles.grid}>
            {doorways.map((doorway) => (
              <ChoiceCard key={doorway.id} href={routeHref(config, [selection.intent?.slug, selection.audience?.slug, doorway.slug], selection.depth)} title={doorway.title} body={doorway.summary} meta={`${doorway.domainNodeIds.length} graph references`} />
            ))}
          </div>
        </section>
      )}

      {selection.audience && selection.doorway && (
        <RouteResult selection={selection} config={config} />
      )}
    </main>
  );
}

function RouteResult({ selection, config }: { selection: RouteSelection; config: AudienceRouteConfig }) {
  const audience = selection.audience!;
  const doorway = selection.doorway!;
  return (
    <div className={styles.resultGrid}>
      <section className={styles.routePanel} aria-labelledby="route-title">
        <SectionHeading id="route-title" kicker={`${doorway.title} doorway`} title={audience.desiredTransformation} body={doorway.summary} />
        <ol className={styles.steps}>
          {audience.route.map((step, index) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
                <div className={styles.tags}>{step.nodeRefs.map((ref) => <span key={`${step.id}-${ref.id}`}>{ref.id}</span>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside className={styles.contextPanel}>
        <p className={styles.eyebrow}>Boundary conditions</p>
        <Definition term="Arrival pressure" value={audience.trigger} />
        <Definition term="Current barrier" value={audience.barrier} />
        <Definition term="Success signal" value={audience.successSignal} />
        <Definition term="Preferred formats" value={audience.preferredFormats.join(", ")} />
        <Definition term="Canonical node references" value={[...audience.recommendedNodeIds, ...doorway.domainNodeIds].join(", ")} />
        <Link className={styles.primaryAction} href={audience.nextAction.href}>{audience.nextAction.label}</Link>
        <Link className={styles.secondaryAction} href={routeHref(config, [selection.intent?.slug, audience.slug, doorway.slug], "evaluate")}>Increase depth to evaluate</Link>
      </aside>
    </div>
  );
}

function ChoiceCard({ href, title, body, meta }: { href: string; title: string; body: string; meta: string }) {
  return <Link className={styles.card} href={href}><span className={styles.meta}>{meta}</span><h2>{title}</h2><p>{body}</p><span className={styles.cardAction}>Continue →</span></Link>;
}
function SectionHeading({ id, kicker, title, body }: { id: string; kicker: string; title: string; body: string }) {
  return <div className={styles.sectionHeading}><p className={styles.eyebrow}>{kicker}</p><h2 id={id}>{title}</h2><p>{body}</p></div>;
}
function RouteCrumb({ label, value }: { label: string; value?: string }) {
  return <div className={value ? styles.crumbActive : styles.crumb}><span>{label}</span><strong>{value ?? "—"}</strong></div>;
}
function Definition({ term, value }: { term: string; value: string }) {
  return <div className={styles.definition}><dt>{term}</dt><dd>{value}</dd></div>;
}
