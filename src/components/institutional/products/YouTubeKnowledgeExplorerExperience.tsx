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
          <p>WHAT PROJECTR DOES</p>
          <h2>Make a long source easier to search, revisit, and understand without hiding the original.</h2>
          <span>
            Long-form video carries explanation, argument, demonstration, and context, but
            precise retrieval is expensive. The Explorer turns one source into a navigable
            knowledge object without losing the path back to the original moment.
          </span>
        </div>

        <blockquote className={styles.explorerSourceQuote}>
          The useful unit is not just a feed item. It is a source you can search, navigate,
          save, revisit, and trace back to the original moment.
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
          <p>THE CURRENT YOUTUBE IMPLEMENTATION</p>
          <h2>A 90-minute video should be easier to work with than a scrub bar.</h2>
          <span>
            Outline, transcript, concepts, search, and source navigation are different views
            over the same source. None of them replaces the original video.
          </span>
        </div>

        <div className={styles.explorerWorkspaceShell}>
          <div className={styles.explorerWorkspaceToolbar}>
            <div>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </div>
            <span>PROJECTR · YOUTUBE KNOWLEDGE EXPLORER</span>
            <strong>linked to source</strong>
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
          <p>ASK THE SOURCE</p>
          <h2>Ask a question and keep the answer tied to the moments that support it.</h2>
          <span>
            A model may help write the answer, but the supporting moments must come from the
            loaded source. If the source does not support the answer, the product should say so.
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
          <p>HOW IT IS BUILT</p>
          <h2>Your saved knowledge should not be trapped in one interface or AI provider.</h2>
          <blockquote>
            The useful knowledge object should survive changes in interface, storage, hosting,
            or AI provider.
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
          <span>PORTABLE PROJECTR CORE</span>
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
            <h2>The core works. The next question is whether people choose to keep using it.</h2>
          </div>
          <blockquote>
            Build something useful first. Treat repeated voluntary use as the next evidence.
          </blockquote>
        </div>

        <div className={styles.explorerStateGrid}>
          <article data-state="exists">
            <span>EXISTS NOW</span>
            <strong>Working Projectr core</strong>
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
            <strong>Do people return because the product is useful?</strong>
            <ul>
              <li>Polish the current YouTube product experience</li>
              <li>Run real source and user sessions</li>
              <li>Measure repeated voluntary use and failure modes</li>
              <li>Then test willingness to pay and packaging</li>
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
            <h2>Keep the source. Add structure. Use AI without losing the trail back.</h2>
          </div>

          <div className={styles.explorerCloseActions}>
            <Link href="/contact?type=product&source=youtube-knowledge-explorer">
              Test, review, or collaborate on Projectr <span aria-hidden="true">→</span>
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
