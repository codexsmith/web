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
        { href: "#method", label: "See the method" },
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
          <p>THE TEACHING QUESTION</p>
          <blockquote>
            What changed in the position, and what does that change make possible or dangerous?
          </blockquote>
          <span>
            The point is not to replace chess vocabulary. It is to help learners connect
            familiar ideas—king safety, weak squares, open lines, overloaded defenders,
            initiative, and repair—into a clearer picture of what changed after a move.
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
          <span>WHO IT IS FOR</span>
          <strong>Players who know the rules but still struggle to see the board.</strong>
          <em>The product teaches a way to notice structural change before calculating deeper.</em>
        </div>
      </section>

      <section className={styles.chessFieldGuideSection} id="field-guide">
        <div className={styles.chessSectionLead}>
          <p>THE BOOK</p>
          <h2>A developed field guide for learning how to see positional change.</h2>
          <span>
            The manuscript already exists. The next step is to improve the diagrams,
            editing, outside chess review, learner testing, and release packaging before
            expanding into courses, software, video, or classroom products.
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
          <p>THE ANALYZER IDEA</p>
          <h2>Explain the position; do not pretend to replace a chess engine.</h2>
          <span>
            Any future analyzer should keep legal board state, ordinary engine analysis,
            Boundary-First interpretation, and disagreement separate so the new explanation
            cannot overwrite established chess facts.
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
            <p>WHAT STILL NEEDS TO BE TESTED</p>
            <h2>The teaching method has to prove that it actually helps learners.</h2>
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
          <strong>Developed manuscript and teaching method · outside learner validation still needed</strong>
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
