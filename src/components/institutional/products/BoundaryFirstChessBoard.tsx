"use client";

import { useMemo, useState } from "react";
import {
  chessLenses,
  type ChessLensId,
} from "../content/boundaryFirstChess";
import styles from "../styles/BoundaryFirstChess.module.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const pieces: Record<string, string> = {
  a8: "♜",
  c8: "♝",
  d8: "♛",
  f8: "♜",
  g8: "♚",
  a7: "♟",
  b7: "♟",
  c7: "♟",
  f7: "♟",
  g7: "♟",
  h7: "♟",
  c6: "♞",
  d6: "♟",
  e5: "♟",
  f6: "♞",
  c5: "♝",
  a2: "♙",
  b2: "♙",
  c2: "♙",
  f2: "♙",
  g2: "♙",
  h2: "♙",
  d3: "♙",
  e4: "♙",
  c3: "♘",
  f3: "♘",
  c4: "♗",
  c1: "♗",
  d1: "♕",
  a1: "♖",
  f1: "♖",
  g1: "♔",
};

export function BoundaryFirstChessBoard() {
  const [activeLens, setActiveLens] = useState<ChessLensId>("create");
  const lens = chessLenses.find((item) => item.id === activeLens) ?? chessLenses[0];
  const primary = useMemo(() => new Set<string>(lens.primary), [lens]);
  const secondary = useMemo(() => new Set<string>(lens.secondary), [lens]);

  return (
    <div className={styles.chessInstrument}>
      <div className={styles.chessInstrumentTopline}>
        <div>
          <span>BOUNDARY MAP · ILLUSTRATIVE POSITION</span>
          <strong>One board. Five ways to ask what changed.</strong>
        </div>
        <span className={styles.chessInstrumentLamp} aria-hidden="true" />
      </div>

      <div className={styles.chessLensControls} aria-label="Boundary-First Chess analysis lenses">
        {chessLenses.map((item) => (
          <button
            aria-pressed={item.id === activeLens}
            key={item.id}
            onClick={() => setActiveLens(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.chessBoardStage}>
        <div
          aria-label="Illustrative chess position with structural highlights"
          className={styles.chessBoard}
          data-lens={activeLens}
          role="img"
        >
          {ranks.flatMap((rank, rankIndex) =>
            files.map((file, fileIndex) => {
              const square = `${file}${rank}`;
              const isLight = (rankIndex + fileIndex) % 2 === 0;
              const piece = pieces[square];

              return (
                <div
                  className={[
                    styles.chessSquare,
                    isLight ? styles.chessSquareLight : styles.chessSquareDark,
                    primary.has(square) ? styles.chessSquarePrimary : "",
                    secondary.has(square) ? styles.chessSquareSecondary : "",
                  ].filter(Boolean).join(" ")}
                  data-square={square}
                  key={square}
                >
                  {piece ? <span className={styles.chessPiece}>{piece}</span> : null}
                  {file === "a" || rank === 1 ? (
                    <small className={styles.chessCoordinate}>
                      {file === "a" ? rank : file}
                    </small>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>

        <div className={styles.chessLensReadout}>
          <p>{lens.kicker}</p>
          <h2>{lens.title}</h2>
          <span>{lens.description}</span>
          <blockquote>{lens.question}</blockquote>
          <small>
            Teaching map only. Highlighting is explanatory, not an engine evaluation or move recommendation.
          </small>
        </div>
      </div>
    </div>
  );
}
