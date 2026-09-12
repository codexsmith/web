export type BfuxGridCorner = "nw" | "ne" | "sw" | "se";

export type BfuxGridSpecLike = {
  columns: number;
  rows: number;
};

export type BfuxGridPlacementLike = {
  column: number;
  row: number;
  corner: BfuxGridCorner;
  columnSpan?: number;
  rowSpan?: number;
};

export const bfuxGridPanX = 700;
export const bfuxGridPanY = 260;
export const bfuxGridPitchPx = 60;
const bfuxGridMinimumSpan = 0.05;
const bfuxGridMaxSpan = 128;

function stableSpan(value: number) {
  return Math.round(value * 10000) / 10000;
}

export function bfuxGridAxisFraction(index: number, count: number) {
  return count <= 1 ? 0.5 : index / (count - 1);
}

/* Layout Studio uses one physical drafting ruler. The old point-count picker
 * remains part of the serialized contract for backwards compatibility, but it
 * no longer stretches the lattice to fit the apparatus. Every adjacent point
 * is exactly 60 CSS pixels apart in apparatus-local coordinates. This matches
 * the canonical card-size quantum, so card edges and grid points share the same
 * physical module without the visual noise of the earlier 30px half-module. */
export function bfuxGridPitch(_size: number, _pointCount: number) {
  return bfuxGridPitchPx;
}

export function bfuxGridCoordinate(index: number, _size: number, _pointCount: number) {
  return index * bfuxGridPitchPx;
}

/* A span is a measurement in grid-track units, not inherently an integer.
 * Drag/drop uses fractional spans so snapping a corner never resizes the card.
 * Explicit resize controls may still quantize a span to whole tracks. */
export function bfuxGridSpan(value: number | undefined) {
  const next = value ?? 1;
  if (!Number.isFinite(next)) return 1;
  return stableSpan(Math.max(bfuxGridMinimumSpan, next));
}

/* With a fixed physical pitch, legal span length is determined by workfield
 * bounds rather than the legacy number of picker points. The tighter bound is
 * applied in bfuxGridPlacementGeometry. */
export function bfuxGridMaxColumnSpan(_placement: Pick<BfuxGridPlacementLike, "column" | "corner">, _spec: BfuxGridSpecLike) {
  return bfuxGridMaxSpan;
}

export function bfuxGridMaxRowSpan(_placement: Pick<BfuxGridPlacementLike, "row" | "corner">, _spec: BfuxGridSpecLike) {
  return bfuxGridMaxSpan;
}

export function bfuxGridFitSpan(size: number, pitch: number, maxSpan: number) {
  if (maxSpan <= 0) return 0;
  if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(pitch) || pitch <= 0) return 1;

  // Moving and snapping are geometry-preserving operations. Express the live
  // card dimension in track units without quantizing it. This makes the point
  // lattice own alignment while the card keeps exactly the size it had when the
  // drag began. Resizing is a separate, explicit operation.
  return stableSpan(Math.min(maxSpan, Math.max(bfuxGridMinimumSpan, size / pitch)));
}

/* The drafting plane is a 60px Cartesian lattice rooted at apparatus (0,0).
 * It repeats into the same pan envelope on every side, so the visual rails and
 * legal drop points share one stable physical ruler independent of viewport or
 * card composition. */
export function bfuxGridWorkfieldMetrics(apparatus: HTMLElement, spec: BfuxGridSpecLike) {
  const apparatusWidth = Math.max(1, apparatus.offsetWidth);
  const apparatusHeight = Math.max(1, apparatus.offsetHeight);
  const pitchX = bfuxGridPitch(apparatusWidth, spec.columns);
  const pitchY = bfuxGridPitch(apparatusHeight, spec.rows);
  const left = -bfuxGridPanX;
  const top = -bfuxGridPanY;
  const right = apparatusWidth + bfuxGridPanX;
  const bottom = apparatusHeight + bfuxGridPanY;
  const minColumn = Math.ceil(left / pitchX);
  const maxColumn = Math.floor(right / pitchX);
  const minRow = Math.ceil(top / pitchY);
  const maxRow = Math.floor(bottom / pitchY);

  return {
    apparatusWidth,
    apparatusHeight,
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
    pitchX,
    pitchY,
    minColumn,
    maxColumn,
    minRow,
    maxRow,
  };
}

export function bfuxGridPlacementGeometry(
  apparatus: HTMLElement,
  spec: BfuxGridSpecLike,
  placement: BfuxGridPlacementLike,
  fallbackSize?: { width: number; height: number },
) {
  const metrics = bfuxGridWorkfieldMetrics(apparatus, spec);
  const anchorX = bfuxGridCoordinate(placement.column, metrics.apparatusWidth, spec.columns);
  const anchorY = bfuxGridCoordinate(placement.row, metrics.apparatusHeight, spec.rows);
  const rightAnchored = placement.corner === "ne" || placement.corner === "se";
  const bottomAnchored = placement.corner === "sw" || placement.corner === "se";
  const maxColumnSpan = Math.max(1, (
    rightAnchored ? anchorX - metrics.left : metrics.right - anchorX
  ) / metrics.pitchX);
  const maxRowSpan = Math.max(1, (
    bottomAnchored ? anchorY - metrics.top : metrics.bottom - anchorY
  ) / metrics.pitchY);
  const columnSpan = placement.columnSpan == null
    ? bfuxGridFitSpan(fallbackSize?.width ?? metrics.pitchX, metrics.pitchX, maxColumnSpan)
    : Math.min(maxColumnSpan, bfuxGridSpan(placement.columnSpan));
  const rowSpan = placement.rowSpan == null
    ? bfuxGridFitSpan(fallbackSize?.height ?? metrics.pitchY, metrics.pitchY, maxRowSpan)
    : Math.min(maxRowSpan, bfuxGridSpan(placement.rowSpan));
  const width = metrics.pitchX * columnSpan;
  const height = metrics.pitchY * rowSpan;

  return {
    ...metrics,
    anchorX,
    anchorY,
    width,
    height,
    left: anchorX - (rightAnchored ? width : 0),
    top: anchorY - (bottomAnchored ? height : 0),
    columnSpan,
    rowSpan,
  };
}

/* Grid density is physical (60px), so legacy picker dimensions no longer
 * change coordinate meaning. Keep existing placements stable if that UI state
 * changes while we migrate the picker to the fixed-ruler model. */
export function bfuxGridRemapCoordinate(index: number, _previousPoints: number, _nextPoints: number) {
  return index;
}

export function bfuxGridRemapSpan(value: number | undefined, _previousPoints: number, _nextPoints: number) {
  return value == null ? undefined : bfuxGridSpan(value);
}
