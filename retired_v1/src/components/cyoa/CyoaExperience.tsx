import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  canonicalCyoaNodeIndex,
  cyoaBinding,
  cyoaHref,
  cyoaOnramps,
  type CyoaChoice,
  type CyoaOnramp,
} from "@/lib/cyoa";
import { EntranceSwitcher } from "@/components/entrance/EntranceSwitcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ATLAS_HREF } from "@/lib/site-navigation";
import styles from "./cyoa.module.css";

type Props = {
  onramp?: CyoaOnramp;
  choice?: CyoaChoice;
};

export function CyoaExperience({ onramp, choice }: Props) {
  const entranceMilestone = !onramp
    ? "orientation"
    : !choice
      ? "selection"
      : "arrival";

  return (
    <main className={styles.page}>
      <SiteHeader />
      <EntranceSwitcher current="problem" milestone={entranceMilestone} />

      <Progress onramp={onramp} choice={choice} />

      {!onramp && <EntranceStage />}
      {onramp && !choice && <ChoiceStage onramp={onramp} />}
      {onramp && choice && <ArrivalStage onramp={onramp} choice={choice} />}

      <SiteFooter />
    </main>
  );
}

function Progress({ onramp, choice }: Props) {
  const activeStateId = choice
    ? "cross-bridge"
    : onramp
      ? "name-trouble"
      : "choose-world";
  const activeIndex = cyoaBinding.workflow.states.findIndex(
    (state) => state.id === activeStateId,
  );
  const stages = cyoaBinding.workflow.states.map((state, index) => ({
    number: String(index + 1).padStart(2, "0"),
    label: state.label,
    active: index === activeIndex,
    done: index < activeIndex,
  }));

  return (
    <ol className={styles.progress} aria-label="Adventure progress">
      {stages.map((stage) => (
        <li
          className={stage.active ? styles.activeProgress : undefined}
          data-complete={stage.done || undefined}
          key={stage.number}
        >
          <span>{stage.number}</span>
          <strong>{stage.label}</strong>
        </li>
      ))}
    </ol>
  );
}

function EntranceStage() {
  const copy = cyoaBinding.projection.copy;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroHeading}>
          <p className={styles.eyebrow}>{copy.entranceEyebrow}</p>
          <h1>{copy.entranceTitle}</h1>
        </div>
        <div className={styles.heroCopy}>
          <h2>{copy.entranceIntro}</h2>
          <p>{copy.nonClassification}</p>
          <p className={styles.routeNote}>
            3 steps · about 2 minutes · restart anytime
          </p>
        </div>
      </section>

      <section className={styles.onrampGrid} aria-label="Available on-ramps">
        {cyoaOnramps.map((item) => (
          <Link className={styles.onrampCard} href={cyoaHref(item.slug)} key={item.slug}>
            <span className={styles.cardNumber}>{item.number}</span>
            <p>{item.label}</p>
            <h2>{item.prompt}</h2>
            <span className={styles.cardDescription}>{item.description}</span>
            <span className={styles.cardAction}>
              Start here <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}

function ChoiceStage({ onramp }: { onramp: CyoaOnramp }) {
  const copy = cyoaBinding.projection.copy;

  return (
    <section className={styles.stage}>
      <Link className={styles.backLink} href={cyoaHref()}>
        <ArrowLeft aria-hidden="true" /> Choose another setting
      </Link>
      <div className={styles.stageHeading}>
        <div>
          <p className={styles.eyebrow}>{onramp.label}</p>
          <h1>{copy.choiceTitle}</h1>
        </div>
        <p>{copy.choiceIntro}</p>
      </div>
      <div className={styles.choiceGrid}>
        {onramp.choices.map((item, index) => (
          <Link
            className={styles.choiceCard}
            href={cyoaHref(onramp.slug, item.slug)}
            key={item.slug}
          >
            <span className={styles.cardNumber}>0{index + 1}</span>
            <p>{item.conceptLabel}</p>
            <h2>{item.title}</h2>
            <blockquote>“{item.scene}”</blockquote>
            <span className={styles.cardAction}>
              Continue <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArrivalStage({
  onramp,
  choice,
}: {
  onramp: CyoaOnramp;
  choice: CyoaChoice;
}) {
  return (
    <section className={styles.arrival}>
      <Link className={styles.backLink} href={cyoaHref(onramp.slug)}>
        <ArrowLeft aria-hidden="true" /> Choose the other scene
      </Link>

      <div className={styles.arrivalHero}>
        <div>
          <p className={styles.eyebrow}>{choice.conceptLabel}</p>
          <h1>{choice.title}</h1>
        </div>
        <blockquote>“{choice.scene}”</blockquote>
      </div>

      <div className={styles.conceptStrip} aria-label="Concepts exposed">
        <span className={styles.conceptStripHeading}>
          {cyoaBinding.projection.copy.conceptStripLabel}
          <small>
            {cyoaBinding.bindingProtocol.status} binding · {cyoaBinding.bindingProtocol.claimCeiling.replaceAll("-", " ")}
          </small>
        </span>
        <ul>
          {choice.concepts.map((concept) => (
            <li key={concept.id}>
              <Link
                href={canonicalCyoaNodeIndex[concept.canonicalNodeIds[0]].href}
                title={`${concept.label}: ${concept.definition}`}
              >
                {concept.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.arrivalGrid}>
        <article className={styles.lesson}>
          <p className={styles.panelLabel}>What you already know</p>
          <h2>{choice.lesson}</h2>
          <div>
            <p className={styles.panelLabel}>The structural move</p>
            <p>{choice.structuralMove}</p>
          </div>
        </article>

        <aside className={styles.bridge}>
          <div>
            <p className={styles.panelLabel}>Where the analogy stops</p>
            <p>{choice.firewall}</p>
          </div>
          <div>
            <p className={styles.panelLabel}>Formal connection</p>
            <p>{choice.bridge}</p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href={choice.destination.href}>
              {choice.destination.actionLabel} <ArrowRight aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryAction} href={ATLAS_HREF}>
              See the whole Atlas
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
