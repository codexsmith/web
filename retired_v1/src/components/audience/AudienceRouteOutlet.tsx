import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EntranceSwitcher } from "@/components/entrance/EntranceSwitcher";
import {
  canonicalNodeIndex,
  publicationClaimCeiling,
  publicationRecommendations,
} from "@/lib/audience/data";
import {
  compatibleAudiences,
  compatibleDoorways,
  depthsForAudience,
  routeHref,
} from "@/lib/audience/resolve";
import type {
  AudienceDataset,
  AudienceRouteConfig,
  CanonicalNodeSummary,
  RouteSelection,
} from "@/lib/audience/types";
import styles from "./audience.module.css";

type AudienceRouteOutletProps = {
  dataset: AudienceDataset;
  config: AudienceRouteConfig;
  selection: RouteSelection;
};

export function AudienceRouteOutlet({
  dataset,
  config,
  selection,
}: AudienceRouteOutletProps) {
  const audiences = compatibleAudiences(dataset, selection.intent?.id);
  const doorways = compatibleDoorways(dataset, selection.audience?.id);
  const title =
    selection.audience?.title ?? selection.intent?.title ?? config.labels.title;
  const lede =
    selection.audience?.arrivalStatement ??
    selection.intent?.summary ??
    config.labels.intro;
  const entranceMilestone = !selection.intent
    ? "orientation"
    : !selection.audience
      ? "selection"
      : !selection.doorway
        ? "route"
        : "arrival";

  return (
    <main className={styles.page}>
      <SiteHeader />
      <EntranceSwitcher current="people" milestone={entranceMilestone} />

      <div className={styles.shell}>
        <RouteProgress selection={selection} />

        {(selection.intent || selection.audience || selection.doorway) && (
          <div className={styles.routeActions}>
            <nav
              className={styles.headerActions}
              aria-label="Guided entrance controls"
            >
              <Link href={config.basePath}>
                <RotateCcw aria-hidden="true" />
                {config.labels.restart}
              </Link>
            </nav>
          </div>
        )}

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{config.labels.eyebrow}</p>
            <h1>{title}</h1>
          </div>
          {!selection.intent ? (
            <div className={styles.heroPrompt}>
              <div>
                <span>01</span>
                <p>Start from active pressure</p>
              </div>
              <h2 id="intent-title">Choose the reason for this visit.</h2>
              <p>
                The first choice narrows the opening move, not the material you
                are allowed to reach.
              </p>
            </div>
          ) : (
            <div className={styles.heroCopy}>
              <p>{lede}</p>
              <p className={styles.nonClassification}>
                This choice describes what you need now. It does not classify
                you or limit the rest of the corpus.
              </p>
            </div>
          )}
        </section>

        {!selection.intent && (
          <section className={styles.routeStage} aria-labelledby="intent-title">
            <div className={styles.choiceGrid}>
              {dataset.intents.map((intent, index) => (
                <ChoiceCard
                  key={intent.id}
                  index={index + 1}
                  href={routeHref(
                    config,
                    [intent.slug],
                    intent.recommendedDepth,
                  )}
                  title={intent.prompt}
                  body={intent.summary}
                  meta={intent.useCase.replaceAll("-", " ")}
                />
              ))}
            </div>
          </section>
        )}

        {selection.intent && !selection.audience && (
          <section
            className={styles.routeStage}
            aria-labelledby="audience-title"
          >
            <SectionHeading
              id="audience-title"
              index="02"
              kicker="Choose a useful beginning"
              title="Where should this become concrete?"
              body="Your first choice is enough to start. Choose a concrete beginning below, or skip refinement and browse the work, Atlas, or three paths."
            />
            <div className={styles.choiceGrid}>
              {audiences.map((audience, index) => {
                const doorwayCount = compatibleDoorways(
                  dataset,
                  audience.id,
                ).length;
                return (
                  <ChoiceCard
                    key={audience.id}
                    index={index + 1}
                    href={routeHref(
                      config,
                      [selection.intent?.slug, audience.slug],
                      selection.depth,
                    )}
                    title={audience.title}
                    body={audience.arrivalStatement}
                    meta={`${doorwayCount} familiar ${
                      doorwayCount === 1 ? "doorway" : "doorways"
                    }`}
                  />
                );
              })}
            </div>
            <div className={styles.refinementExits} aria-label="Skip route refinement">
              <Link className={styles.refinementExit} href="/work">
                Browse work and evidence <ArrowRight aria-hidden="true" />
              </Link>
              <Link className={styles.refinementExit} href={config.atlasHref}>
                View the Atlas as a list <ArrowRight aria-hidden="true" />
              </Link>
              <Link className={styles.refinementExit} href="/problem">
                <RotateCcw aria-hidden="true" />
                <span>Choose a different doorway</span>
              </Link>
            </div>
          </section>
        )}

        {selection.audience && !selection.doorway && (
          <section
            className={styles.routeStage}
            aria-labelledby="doorway-title"
          >
            <SectionHeading
              id="doorway-title"
              index="03"
              kicker="Choose a familiar scene"
              title="Where should the method become concrete?"
              body="A doorway lowers the first conceptual burden. It is an example and an entry surface, not the destination."
            />
            <div className={styles.choiceGrid}>
              {doorways.map((doorway, index) => {
                const labels = doorway.domainNodeIds
                  .map((id) => canonicalNodeIndex[id]?.label)
                  .filter(Boolean)
                  .join(" · ");
                return (
                  <ChoiceCard
                    key={doorway.id}
                    index={index + 1}
                    href={routeHref(
                      config,
                      [
                        selection.intent?.slug,
                        selection.audience?.slug,
                        doorway.slug,
                      ],
                      selection.depth,
                    )}
                    title={doorway.title}
                    body={doorway.summary}
                    meta={labels}
                  />
                );
              })}
            </div>
          </section>
        )}

        {selection.audience && selection.doorway && (
          <RouteResult selection={selection} config={config} />
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

function RouteResult({
  selection,
  config,
}: {
  selection: RouteSelection;
  config: AudienceRouteConfig;
}) {
  const audience = selection.audience!;
  const doorway = selection.doorway!;
  const publication = publicationRecommendations[audience.id];
  const recommendedNodes = uniqueCanonicalNodes([
    ...doorway.domainNodeIds,
    ...audience.recommendedNodeIds,
  ]);

  return (
    <section className={styles.result} aria-labelledby="route-title">
      <div className={styles.resultHeading}>
        <SectionHeading
          id="route-title"
          index="04"
          kicker={`${doorway.title} doorway · ${selection.depth} depth`}
          title={audience.desiredTransformation}
          body={doorway.summary}
        />
        <div className={styles.depthControl}>
          <span>Refine depth</span>
          <div>
            {depthsForAudience(audience).map((depth) => (
              <Link
                key={depth}
                aria-current={depth === selection.depth ? "page" : undefined}
                href={routeHref(
                  config,
                  [selection.intent?.slug, audience.slug, doorway.slug],
                  depth,
                )}
              >
                {depth}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={styles.routePanel}>
          <p className={styles.panelLabel}>Your smallest useful route</p>
          <ol className={styles.steps}>
            {audience.route.map((step, index) => (
              <li key={step.id} className={styles.step}>
                <span className={styles.stepIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.stepRole}>
                    {index === 0
                      ? "Locate"
                      : index === audience.route.length - 1
                        ? "Carry forward"
                        : "Work"}
                  </p>
                  <h2>{step.title}</h2>
                  <p>{step.summary}</p>
                  <div
                    className={styles.nodeLinks}
                    aria-label={`Canonical records for ${step.title}`}
                  >
                    {step.nodeRefs.map((reference) => (
                      <CanonicalNodeLink
                        key={`${step.id}-${reference.id}`}
                        node={canonicalNodeIndex[reference.id]}
                        role={reference.role}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.canonicalStrip}>
            <div>
              <p className={styles.panelLabel}>
                Canonical records in this route
              </p>
              <p>
                These links open the existing corpus records. The audience route
                does not duplicate or replace their content.
              </p>
            </div>
            <div className={styles.nodeLinks}>
              {recommendedNodes.map((node) => (
                <CanonicalNodeLink key={node.id} node={node} />
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.contextPanel}>
          <div>
            <p className={styles.panelLabel}>Boundary conditions</p>
            <dl className={styles.definitions}>
              <Definition term="Arrival pressure" value={audience.trigger} />
              <Definition term="Current barrier" value={audience.barrier} />
              <Definition
                term="Success signal"
                value={audience.successSignal}
              />
              <Definition
                term="Useful formats"
                value={audience.preferredFormats.join(", ")}
              />
            </dl>
          </div>

          {publication && (
            <Link className={styles.publicationCard} href={publication.href}>
              <span>{publication.kicker}</span>
              <strong>{publication.title}</strong>
              <p>{publication.summary}</p>
              <em>
                Open this passage <ArrowRight aria-hidden="true" />
              </em>
            </Link>
          )}

          <div className={styles.claimCeiling}>
            <span>Claim boundary</span>
            <p>{publicationClaimCeiling}</p>
          </div>

          <div className={styles.nextActions}>
            <Link
              className={styles.primaryAction}
              href={audience.nextAction.href}
            >
              {audience.nextAction.label}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryAction} href={config.atlasHref}>
              {config.labels.atlas}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

function uniqueCanonicalNodes(ids: string[]): CanonicalNodeSummary[] {
  return [...new Set(ids)]
    .map((id) => canonicalNodeIndex[id])
    .filter((node): node is CanonicalNodeSummary => Boolean(node));
}

function CanonicalNodeLink({
  node,
  role,
}: {
  node: CanonicalNodeSummary;
  role?: string;
}) {
  return (
    <Link className={styles.nodeLink} href={node.href}>
      <span>{node.label}</span>
      {role && <small>{role}</small>}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

function ChoiceCard({
  href,
  title,
  body,
  meta,
  index,
}: {
  href: string;
  title: string;
  body: string;
  meta: string;
  index: number;
}) {
  return (
    <Link className={styles.choiceCard} href={href}>
      <span className={styles.cardIndex}>{String(index).padStart(2, "0")}</span>
      <span className={styles.cardMeta}>{meta}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <span className={styles.cardAction}>
        Continue <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
}

function SectionHeading({
  id,
  index,
  kicker,
  title,
  body,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <span>{index}</span>
        <p>{kicker}</p>
      </div>
      <h2 id={id}>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

function RouteProgress({ selection }: { selection: RouteSelection }) {
  const currentIndex = !selection.intent
    ? 0
    : !selection.audience
      ? 1
      : !selection.doorway
        ? 2
        : 3;
  const items = [
    { label: "Choose a need", value: selection.intent?.title },
    {
      label: "Choose a position",
      value: selection.audience?.shortTitle,
    },
    { label: "Choose a doorway", value: selection.doorway?.title },
  ];

  return (
    <ol className={styles.progress} aria-label="Audience route progress">
      {items.map((item, index) => {
        const state =
          index < currentIndex
            ? "complete"
            : index === currentIndex
              ? "current"
              : "pending";
        return (
          <li
            key={item.label}
            className={styles[state]}
            aria-current={state === "current" ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.value ?? item.label}</strong>
          </li>
        );
      })}
    </ol>
  );
}

function Definition({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}
