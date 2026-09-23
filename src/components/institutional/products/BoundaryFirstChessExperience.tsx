import Link from "next/link";
import { ProductExperienceShell } from "./ProductExperienceShell";
import { BoundaryFirstChessBoard } from "./BoundaryFirstChessBoard";
import {
  boundaryFirstChessNav,
  boundaryFirstChessProduct,
  chessAnalyzerLayers,
  chessEvidenceGates,
  chessFieldGuideObjects,
  chessGrammar,
  chessNotClaimed,
} from "../content/boundaryFirstChess";
import styles from "../styles/BoundaryFirstChess.module.css";

export function BoundaryFirstChessExperience() {
  return (
    <ProductExperienceShell
      actions={[
        { href: "#method", label: "See the lens" },
        {
          href: "/contact?type=product&source=boundary-first-chess",
          label: "Help test it",
          kind: "secondary",
        },
      ]}
      heroVisual={<BoundaryFirstChessBoard />}
      navItems={boundaryFirstChessNav}
      product={boundaryFirstChessProduct}
    >
      <section className={styles.chessMethodSection} id="method">
        <div className={styles.chessStatement}>
          <p>THE CENTRAL QUESTION</p>
          <blockquote>
            What boundary did this move create, repair, weaken, exploit, or transform?
          </blockquote>
          <span>
            The point is not to rename chess. It is to give familiar ideas a shared
            structural language that makes change easier to point at.
          </span>
        </div>

        <div className={styles.chessGrammarRail}>
          {chessGrammar.map(([label, description], index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <strong>{label}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.chessSeeingCourse}>
          <span>POSITIONING</span>
          <strong>This is not a Grandmaster course.</strong>
          <em>It is a seeing course.</em>
        </div>
      </section>

      <section className={styles.chessFieldGuideSection} id="field-guide">
        <div className={styles.chessSectionLead}>
          <p>THE PRODUCT OBJECT</p>
          <h2>A field guide large enough to teach a method. Small enough to test one.</h2>
          <span>
            The first release should prove clarity before scale. Book, course, software,
            video, and classroom extensions only become separate product claims when use
            and evidence earn the split.
          </span>
        </div>

        <div className={styles.chessGuideDesk}>
          <div className={styles.chessGuideCover}>
            <small>BOUNDARY-FIRST CHESS</small>
            <strong>A Field Guide for Seeing the Board</strong>
            <span>CREATE · REPAIR · WEAKEN · EXPLOIT · TRANSFORM</span>
            <div aria-hidden="true" className={styles.chessGuideMark}>♔</div>
          </div>

          <div className={styles.chessGuideObjects}>
            {chessFieldGuideObjects.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <small>{item.status}</small>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.chessAnalyzerSection} id="analyzer">
        <div className={styles.chessAnalyzerLead}>
          <p>THE ANALYZER CONCEPT</p>
          <h2>An explainer first. Not a competitive engine.</h2>
          <span>
            The research architecture keeps four authority layers separate so a new
            explanation cannot silently overwrite legal board truth or established chess analysis.
          </span>
        </div>

        <div className={styles.chessAnalyzerStack}>
          {chessAnalyzerLayers.map(([label, title, description], index) => (
            <details open={index === 0} key={label}>
              <summary>
                <span>{label}</span>
                <strong>{title}</strong>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{description}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.chessEvidenceSection} id="evidence">
        <div className={styles.chessEvidenceHeader}>
          <div>
            <p>THE RESEARCH GATE</p>
            <h2>Make the teaching claim answerable to reality.</h2>
          </div>
          <blockquote>
            A term that fails comparison should be repaired or retired.
          </blockquote>
        </div>

        <div className={styles.chessEvidenceBody}>
          <div className={styles.chessEvidenceGates}>
            {chessEvidenceGates.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <aside className={styles.chessClaimFirewall}>
            <p>NOT CURRENTLY CLAIMED</p>
            {chessNotClaimed.map((claim) => (
              <span key={claim}>{claim}</span>
            ))}
          </aside>
        </div>
      </section>

      <section className={styles.chessReleaseSection} id="release">
        <div className={styles.chessReleaseState}>
          <span>CURRENT STATE</span>
          <strong>Research product / developed source / external validation pending</strong>
        </div>

        <div className={styles.chessReleaseCopy}>
          <p>RELEASE PATH</p>
          <h2>Package what exists. Put it in front of learners and chess people. Keep what survives.</h2>
          <p>
            The next meaningful step is not inventing the product from scratch. It is
            editorial production, diagrams, outside chess review, learner testing, and a
            bounded publication or crowdfunding decision.
          </p>

          <div className={styles.chessReleaseActions}>
            <Link href="/contact?type=product&source=boundary-first-chess">
              Test, teach, review, or partner around Chess <span aria-hidden="true">→</span>
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
