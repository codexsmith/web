"use client";

import { useMemo, useState } from "react";
import {
  representationAtlasProjection,
  representationDomains,
  representationMechanicSlots,
  type RepresentationDomainId,
  type RepresentationMechanicId,
} from "./content/representationAtlas";
import styles from "./styles/RepresentationAtlas.module.css";

export function RepresentationAtlasExplorer() {
  const [domainId, setDomainId] = useState<RepresentationDomainId>("strategy");
  const [mechanicId, setMechanicId] =
    useState<RepresentationMechanicId>("representation");

  const domain = useMemo(
    () => representationDomains.find((item) => item.id === domainId) ?? representationDomains[0],
    [domainId],
  );

  const mechanic = useMemo(
    () =>
      representationMechanicSlots.find((item) => item.id === mechanicId) ??
      representationMechanicSlots[0],
    [mechanicId],
  );

  return (
    <section
      className={styles.explorer}
      data-tone={domain.tone}
      aria-label="Interactive Representation Atlas"
    >
      <div className={styles.controlRail}>
        <div className={styles.controlLead}>
          <span>01 · CHOOSE A WITNESS DOMAIN</span>
          <strong>Change the subject. Keep the structural questions fixed.</strong>
        </div>

        <div className={styles.domainTabs} role="group" aria-label="Witness domains">
          {representationDomains.map((item) => (
            <button
              type="button"
              key={item.id}
              data-active={item.id === domain.id ? "true" : "false"}
              data-tone={item.tone}
              aria-pressed={item.id === domain.id}
              onClick={() => setDomainId(item.id)}
            >
              <small>{item.domainClass}</small>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.domainSignal}>
        <div>
          <span>ACTIVE WITNESS DOMAIN</span>
          <strong>{domain.label}</strong>
          <small>{domain.domainClass}</small>
        </div>
        <p>{domain.witnessQuestion}</p>
      </div>

      <div className={styles.circuitHeader}>
        <div>
          <span>02 · TRACE THE MECHANICS</span>
          <strong>Click a structural slot to compare that role across all five domains.</strong>
        </div>
        <p>
          The positions are analytical roles, not claims that the domains are formally equivalent.
        </p>
      </div>

      <div className={styles.mechanicsCircuit} aria-label="Representation mechanics circuit">
        {representationMechanicSlots.map((slot, index) => (
          <button
            type="button"
            key={slot.id}
            className={styles.mechanic}
            data-active={slot.id === mechanic.id ? "true" : "false"}
            aria-pressed={slot.id === mechanic.id}
            onClick={() => setMechanicId(slot.id)}
          >
            <span className={styles.mechanicTopline}>
              <small>{slot.ordinal}</small>
              <em>{slot.formal}</em>
            </span>
            <strong>{slot.label}</strong>
            <p>{domain.mechanics[slot.id]}</p>
            {index < representationMechanicSlots.length - 1 ? (
              <i aria-hidden="true">→</i>
            ) : null}
          </button>
        ))}
      </div>

      <div className={styles.inspectBand}>
        <article className={styles.domainBrief}>
          <span>SELECTED DOMAIN · {domain.shortLabel}</span>
          <h2>{domain.witnessProblem}</h2>
          <dl>
            <div>
              <dt>WITNESS QUESTION</dt>
              <dd>{domain.witnessQuestion}</dd>
            </div>
            <div>
              <dt>BOUNDARY FIRST SURFACE</dt>
              <dd>{domain.contribution}</dd>
            </div>
          </dl>
        </article>

        <article className={styles.crossDomain}>
          <header>
            <span>03 · COMPARE ONE ROLE ACROSS DOMAINS</span>
            <h2>{mechanic.label}</h2>
            <p>{mechanic.prompt}</p>
          </header>

          <div className={styles.compareRows}>
            {representationDomains.map((item) => (
              <button
                type="button"
                key={item.id}
                data-active={item.id === domain.id ? "true" : "false"}
                data-tone={item.tone}
                onClick={() => setDomainId(item.id)}
              >
                <span>
                  <small>{item.shortLabel}</small>
                  <strong>{item.label}</strong>
                </span>
                <p>{item.mechanics[mechanic.id]}</p>
                <i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
        </article>
      </div>

      <aside className={styles.authorityNote}>
        <div>
          <span>COMPARATIVE-LENS FIREWALL</span>
          <strong>{representationAtlasProjection.status}</strong>
        </div>
        <p>{representationAtlasProjection.authority}</p>
        <nav aria-label="Representation Atlas source documents">
          <a
            href={representationAtlasProjection.witnessDomainsSource}
            target="_blank"
            rel="noreferrer"
          >
            Witness Domains ↗
          </a>
          <a
            href={representationAtlasProjection.representationMechanicsSource}
            target="_blank"
            rel="noreferrer"
          >
            Candidate mechanics spine ↗
          </a>
        </nav>
      </aside>
    </section>
  );
}
