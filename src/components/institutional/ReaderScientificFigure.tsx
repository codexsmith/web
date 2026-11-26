import styles from "./styles/DoctrineFrontDoor.module.css";

// These are figures for existing public teaching examples, not research output.
// The geometry uses a common length scale; inventory has ten cells per record;
// the institutional figure is a many-to-one observation, not a causal diagram.
const geometry = [
  { id: "A", width: 6, height: 2, x: 28 },
  { id: "B", width: 4, height: 3, x: 198 },
] as const;
const inventory = [
  { id: "A", total: 10, reserved: 0 },
  { id: "B", total: 10, reserved: 7 },
] as const;
const unit = 14;

const descriptions = {
  geometry: {
    title: "Equal area does not imply equal perimeter",
    description: "At the same length scale, rectangle A is six units by two and rectangle B is four by three. Both have area twelve. Their perimeters are sixteen and fourteen respectively.",
    caption: "Constructed Euclidean example. Each grid cell represents one square unit; both rectangles use the same scale.",
  },
  inventory: {
    title: "Equal totals, different available stock",
    description: "Fictional record A has ten available items and none reserved. Record B has three available and seven reserved. Crossed cells represent reserved stock.",
    caption: "Fictional inventory. One cell represents one item. Crossed cells are reserved and unavailable for a new order.",
  },
  outcome: {
    title: "A completion label can hide different outcomes",
    description: "In fictional record A the service was delivered. In record B a transfer was completed and service is still pending. Both records display Complete.",
    caption: "Fictional service records. Arrows represent the mapping from underlying outcome to displayed label, not a service workflow or causal sequence.",
  },
} as const;

export type ScientificFigureKind = keyof typeof descriptions;

export const demonstrationFigureByTitle: Readonly<Partial<Record<string, ScientificFigureKind>>> = {
  "Geometry: one quantity does not determine another": "geometry",
  "Computation: same total, different useful state": "inventory",
  "Institutions: process completion is not outcome completion": "outcome",
};

export function ReaderScientificFigure({ kind, number }: { kind: ScientificFigureKind; number: number }) {
  const copy = descriptions[kind];
  return (
    <figure className={styles.scientificFigure} data-reader-scientific-figure={kind} data-reader-figure-number={number}>
      <svg viewBox="0 0 320 158" role="img" aria-label={copy.description} focusable="false">
        <title>{copy.title}</title>
        {kind === "geometry" && (
          <>
            <text x="70" y="15" textAnchor="middle" className={styles.figureLabel}>A · 6 × 2</text>
            <text x="226" y="15" textAnchor="middle" className={styles.figureLabel}>B · 4 × 3</text>
            {geometry.map(({id, width, height, x}) => (
              <g key={id} data-figure-rectangle={id} data-width={width} data-height={height}
                 data-area={width * height} data-perimeter={2 * (width + height)}>
                <rect x={x} y={28} width={width * unit} height={height * unit} className={styles.figureField} />
                {Array.from({length: width - 1}, (_, i) => <path key={"v" + i} d={`M${x+(i+1)*unit} 28v${height*unit}`} className={styles.figureGridline} />)}
                {Array.from({length: height - 1}, (_, i) => <path key={"h" + i} d={`M${x} ${28+(i+1)*unit}h${width*unit}`} className={styles.figureGridline} />)}
                <text x={x + width * unit / 2} y="91" textAnchor="middle" className={styles.figureLabel}>Area {width * height}</text>
                <text x={x + width * unit / 2} y="108" textAnchor="middle" className={styles.figureMuted}>Perimeter {2 * (width + height)}</text>
              </g>
            ))}
            <path d="M23 122h274" className={styles.figureRule} />
            <text x="160" y="142" textAnchor="middle" className={styles.figureLabel}>Same area · Different perimeter</text>
          </>
        )}
        {kind === "inventory" && (
          <>
            {inventory.map(({id, total, reserved}, row) => (
              <g key={id} data-figure-inventory={id} data-total={total} data-reserved={reserved}>
                <text x="14" y={16+row*70} className={styles.figureLabel}>Record {id} · {total-reserved} available</text>
                {Array.from({length: total}, (_, i) => {
                  const isReserved = i >= total - reserved;
                  const x = 15+i*29;
                  const y = 25+row*70;
                  return (
                    <g key={i} data-figure-stock={isReserved ? "reserved" : "available"}>
                      <rect x={x} y={y} width="25" height="25" className={isReserved ? styles.figureReserved : styles.figureField} />
                      {isReserved && <path d={`M${x+5} ${y+5}l15 15m0 -15 -15 15`} className={styles.figureCross} />}
                    </g>
                  );
                })}
                <text x="14" y={64+row*70} className={styles.figureMuted}>{total} total · {reserved} reserved</text>
              </g>
            ))}
          </>
        )}
        {kind === "outcome" && (
          <>
            <text x="160" y="14" textAnchor="middle" className={styles.figureMuted}>Underlying service outcomes</text>
            <rect x="5" y="24" width="145" height="47" rx="2" className={styles.figureField} />
            <rect x="170" y="24" width="145" height="47" rx="2" className={styles.figureField} />
            <text x="77.5" y="41" textAnchor="middle" className={styles.figureMuted}>Record A</text>
            <text x="77.5" y="59" textAnchor="middle" className={styles.figureLabel}>Delivered</text>
            <text x="242.5" y="41" textAnchor="middle" className={styles.figureMuted}>Record B</text>
            <text x="242.5" y="59" textAnchor="middle" className={styles.figureLabel}>Pending after transfer</text>
            <path d="M77.5 71v11h53v16m-4-5 4 5 4-5M242.5 71v11h-53v16m-4-5 4 5 4-5" className={styles.figureCross} />
            <rect x="94" y="101" width="132" height="36" rx="2" className={styles.figureObserved} data-figure-observation="Complete" />
            <text x="160" y="123" textAnchor="middle" className={styles.figureLabel}>Complete</text>
            <text x="160" y="151" textAnchor="middle" className={styles.figureMuted}>Displayed label</text>
          </>
        )}
      </svg>
      <figcaption>
        <span className={styles.figureCaptionHeading} data-science-caption-band>
          <span className={styles.figureOrdinal}>Figure {String(number).padStart(2, "0")}</span>
          <strong>{copy.title}</strong>
        </span>
        <span className={styles.figureCaptionNote}>{copy.caption}</span>
      </figcaption>
    </figure>
  );
}
