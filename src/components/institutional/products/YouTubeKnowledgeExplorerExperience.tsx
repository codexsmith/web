import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductExperienceShell } from "./ProductExperienceShell";
import { YouTubeKnowledgeExplorerInstrument } from "./YouTubeKnowledgeExplorerInstrument";
import {
  explorerArchitecture,
  explorerClaimFirewall,
  explorerEvidenceRules,
  explorerPipeline,
  explorerWorkspace,
  youtubeKnowledgeExplorerNav,
  youtubeKnowledgeExplorerProduct,
} from "../content/youtubeKnowledgeExplorer";
import styles from "../styles/YouTubeKnowledgeExplorer.module.css";

export function YouTubeKnowledgeExplorerExperience() {
  return (
    <ProductExperienceShell
      actions={[
        { href: "#source", label: "See how it works" },
        {
          href: "/contact?type=product&source=youtube-knowledge-explorer",
          label: "Help test the MVP",
          kind: "secondary",
        },
      ]}
      heroVisual={<YouTubeKnowledgeExplorerInstrument />}
      navItems={youtubeKnowledgeExplorerNav}
      product={youtubeKnowledgeExplorerProduct}
    >
      <section className={styles.explorerSourceSection} id="source">
        <div className={styles.explorerSourceLead}>
          <p>THE PRODUCT THESIS</p>
          <h2>Make the source easier to use without making it disappear.</h2>
          <span>
            Long-form video contains useful explanation, argument, demonstration, and context,
            but the default interface makes precise retrieval expensive. The Explorer turns one
            source into a navigable knowledge object while keeping a path back to the original moment.
          </span>
        </div>

        <blockquote className={styles.explorerSourceQuote}>
          The useful unit is not a feed item. It is a source with searchable segments,
          navigable topics, provenance, and a path back to the original evidence.
        </blockquote>

        <div className={styles.explorerPipeline}>
          {explorerPipeline.map(([index, title, description]) => (
            <article key={index}>
              <span>{index}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.explorerWorkspaceSection} id="workspace">
        <div className={styles.explorerWorkspaceLead}>
          <p>THE WORKSPACE</p>
          <h2>A 90-minute video should behave more like a document you can inspect.</h2>
          <span>
            Outline, transcript, concepts, search, and source navigation are different projections
            over the same evidence object. None of them gets to silently replace the source.
          </span>
        </div>

        <div className={styles.explorerWorkspaceShell}>
          <div className={styles.explorerWorkspaceToolbar}>
            <div>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </div>
            <span>YOUTUBE KNOWLEDGE EXPLORER · SAVED EXPLORATION</span>
            <strong>source-bound</strong>
          </div>

          <div className={styles.explorerWorkspaceGrid}>
            {explorerWorkspace.map((item, index) => (
              <article key={item.label}>
                <span>0{index + 1} · {item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>

                {index === 0 ? (
                  <ol className={styles.explorerWorkspaceOutline}>
                    <li><i>06:18</i><b>Start with the source</b></li>
                    <li><i>18:42</i><b>Structure without replacement</b></li>
                    <li><i>34:12</i><b>Search should return evidence</b></li>
                  </ol>
                ) : null}

                {index === 1 ? (
                  <div className={styles.explorerWorkspaceSearch}>
                    <span>search</span>
                    <strong>representation</strong>
                    <small>34:12 · 41:08 · 58:27</small>
                  </div>
                ) : null}

                {index === 2 ? (
                  <div className={styles.explorerWorkspaceConcepts}>
                    {["source", "evidence", "timestamp", "outline", "admissibility"].map((concept) => (
                      <small key={concept}>{concept}</small>
                    ))}
                  </div>
                ) : null}

                {index === 3 ? (
                  <div className={styles.explorerWorkspaceAnswer}>
                    <p>
                      Claims remain connected to the source segments that support them.
                    </p>
                    <div><span>34:12</span><span>58:27</span></div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.explorerAnswersSection} id="answers">
        <div className={styles.explorerAnswersLead}>
          <p>EVIDENCE-BOUND ANSWERING</p>
          <h2>Ask the video. Make the answer show its work.</h2>
          <span>
            Hosted synthesis can help write the answer, but it cannot invent its evidence graph.
            The Explorer retrieves candidate source segments first, constrains the answer to those
            segment IDs, reconstructs excerpts and timestamps from its own source state, and validates
            the result again before display.
          </span>
        </div>

        <div className={styles.explorerAnswerBench}>
          <article className={styles.explorerQuestionCard}>
            <span>QUESTION</span>
            <strong>Why does preserving timestamps matter?</strong>
            <small>Evidence search returned 3 candidate segments.</small>
          </article>

          <article className={styles.explorerClaimCard}>
            <div>
              <span>ANSWER FROM SOURCE EVIDENCE</span>
              <strong>2 supported claims</strong>
            </div>
            <ol>
              <li>
                Timestamped segments let navigation and search point back to the original
                moment rather than detaching an answer from its source.
                <div><span>Evidence · 34:12</span></div>
              </li>
              <li>
                Source identity, transcript structure, and evidence references can survive
                a change in the model or interface used to explore them.
                <div><span>Evidence · 58:27</span></div>
              </li>
            </ol>
          </article>

          <aside className={styles.explorerInsufficientCard}>
            <span>VALID RESULT</span>
            <strong>Insufficient evidence.</strong>
            <p>
              If the loaded source does not support a question, the system can return no claims
              instead of manufacturing a persuasive answer.
            </p>
          </aside>
        </div>

        <div className={styles.explorerEvidenceRules}>
          {explorerEvidenceRules.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.explorerPortableSection} id="portable">
        <div className={styles.explorerPortableLead}>
          <p>PORTABLE CORE</p>
          <h2>The product model should outlive its current stack.</h2>
          <blockquote>
            The product model must not be owned by its implementation language, UI framework,
            cloud provider, database, or AI provider.
          </blockquote>
        </div>

        <div className={styles.explorerArchitectureStack}>
          {explorerArchitecture.map(([title, description], index) => (
            <article key={title} style={{ "--layer-index": index } as CSSProperties}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.explorerBoundaryRail}>
          <span>YOUTUBE / CAPTIONS</span>
          <i>→</i>
          <span>PORTABLE CORE</span>
          <i>→</i>
          <span>BROWSER / FILE / DATABASE</span>
          <i>→</i>
          <span>OPTIONAL MODEL ADAPTER</span>
          <i>→</i>
          <span>PORTABLE EXPLORATION</span>
        </div>
      </section>

      <section className={styles.explorerEvidenceSection} id="evidence">
        <div className={styles.explorerStateHeader}>
          <div>
            <p>CURRENT PRODUCT STATE</p>
            <h2>There is already a working vertical slice. The market still has to answer back.</h2>
          </div>
          <blockquote>
            Build the capability first. Treat repeated voluntary use as evidence.
          </blockquote>
        </div>

        <div className={styles.explorerStateGrid}>
          <article data-state="exists">
            <span>EXISTS NOW</span>
            <strong>Executable product core</strong>
            <ul>
              <li>YouTube URL parsing and portable source metadata</li>
              <li>Authorized caption acquisition plus VTT/SRT import</li>
              <li>Transcript normalization and exact / concept-linked search</li>
              <li>Deterministic outline and concept enrichment</li>
              <li>Evidence-bound deterministic and hosted answering</li>
              <li>Browser-local persistence and versioned import / export</li>
            </ul>
          </article>

          <article data-state="next">
            <span>NEXT COMMERCIAL TEST</span>
            <strong>Do people choose to come back?</strong>
            <ul>
              <li>Polish the bounded SaaS experience</li>
              <li>Run real source and user sessions</li>
              <li>Measure repeated voluntary use and failure modes</li>
              <li>Then test pricing or willingness to pay</li>
            </ul>
          </article>

          <article data-state="firewall">
            <span>NOT YET ESTABLISHED</span>
            <strong>Keep the product claim smaller than the vision.</strong>
            <div>
              {explorerClaimFirewall.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>

        <div className={styles.explorerClose}>
          <div>
            <span>PRODUCT DIRECTION</span>
            <h2>Source first. Structure second. Synthesis only when the evidence closes.</h2>
          </div>

          <div className={styles.explorerCloseActions}>
            <Link href="/contact?type=product&source=youtube-knowledge-explorer">
              Test, review, or collaborate on the Explorer <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products">
              Back to Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </ProductExperienceShell>
  );
}
