# P6 · Operating Lens Stage Axis

The Operating lenses surface is an overlay on the Boundary First process circuit, not another process and not a decorative activity meter.

## Semantic law

Repeated marks require an explicit semantic axis.

A user must be able to identify, without decoding abbreviations:

1. what each position refers to;
2. what each state means;
3. how the overlay relates to the current process object.

The canonical stage axis therefore uses the full words:

- Intake
- Boundary
- Representation
- Hypothesis
- Construction
- Execution
- Validation
- Repair
- Promotion

Abbreviations such as `IN`, `BD`, `RP`, `HY`, or compressed variants are not admissible on this surface because they introduce a decoding task precisely where the instrument is supposed to make structure immediately legible.

## Orthogonal meanings

The matrix separates two different questions rather than encoding both in one pill state:

- **Lens participation** — a cell says `Applies` when the method participates at that stage; `—` means no declared emphasis for that lens.
- **Current object placement** — the stage header says `Current` when the focal object presently occupies that process stage.

Current placement does not change the meaning of `Applies`, and lens participation does not imply that the focal object is currently at that stage.

## Wide projection

Wide screens render one lens-by-stage matrix:

- rows are Agentic, Lean Startup, Agile, Scientific, Computational, and Constructive;
- columns are the nine full-word canonical stage names;
- each row carries a short method role;
- each cell carries an explicit `Applies` or `—` state;
- current process placement is highlighted on the column header, not conflated with cell participation.

The matrix is allowed only while the full words remain comfortably legible.

## Compact projection

Below the matrix legibility threshold, the interface must not compress the stage axis into abbreviations or anonymous marks.

Instead, each method becomes a compact card that lists only the stages in which it participates, using the same full stage words. Current-stage intersections may be marked `Current object` inside the relevant participating stage.

At narrow mobile widths the participating stages become a one-column list.

## Accessibility

The wide representation exposes table, row, row-header, column-header, and cell roles. Cell accessible names include method, full stage name, participation standing, and current-object standing where relevant.

Compact projection preserves the full textual stage names in visible content; meaning never depends on color or marker shape alone.

## Acceptance criteria

The Operating lenses surface is acceptable only if:

1. no anonymous pill/sparkline coverage strip is rendered;
2. all nine canonical stage positions are named with full words on the wide axis;
3. participation is explicitly represented as `Applies` versus no declared emphasis;
4. current object placement is represented independently from lens participation;
5. the wide matrix recomposes before stage names become cramped;
6. compact cards repeat full stage words rather than abbreviations;
7. the interface causes no document horizontal overflow;
8. Computational and other method names remain readable without pathological word breaking.
