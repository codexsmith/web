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

export function bfuxGridAxisFraction(index: number, count: number) {
  return count <= 1 ? 0.5 : index / (count - 1);
}

export function bfuxGridPitch(size: number, pointCount: number) {
  return size / Math.max(1, pointCount - 1);
}

export function bfuxGridSpan(value: number | undefined) {
  return Math.max(1, Math.round(value ?? 1));
}

export function bfuxGridMaxColumnSpan(placement: Pick<BfuxGridPlacementLike, "column" | "corner">, spec: BfuxGridSpecLike) {
  if (spec.columns <= 1) return 1;
  return placement.corner === "ne" || placement.corner === "se"
    ? Math.max(0, placement.column)
    : Math.max(0, spec.columns - 1 - placement.column);
}

export function bfuxGridMaxRowSpan(placement: Pick<BfuxGridPlacementLike, "row" | "corner">, spec: BfuxGridSpecLike) {
  if (spec.rows <= 1) return 1;
  return placement.corner === "sw" || placement.corner === "se"
    ? Math.max(0, placement.row)
    : Math.max(0, spec.rows - 1 - placement.row);
}

export function bfuxGridFitSpan(size: number, pitch: number, maxSpan: number) {
  if (maxSpan <= 0) return 0;
  if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(pitch) || pitch <= 0) return 1;

  // Preserve almost all of the authored card envelope while snapping it onto
  // the lattice. A small (<6%) shrink is allowed to avoid a one-pixel/content
  // rounding difference doubling the card to the next full grid span.
  const minimumToFit = Math.max(1, Math.ceil((size * 0.94) / pitch));
  const nearest = Math.max(1, Math.round(size / pitch));
  return Math.min(maxSpan, Math.max(minimumToFit, nearest));
}

export function bfuxGridWorkfieldMetrics(apparatus: HTMLElement, spec: BfuxGridSpecLike) {
  const width = apparatus.offsetWidth + bfuxGridPanX * 2;
  const height = apparatus.offsetHeight + bfuxGridPanY * 2;
  return {
    left: -bfuxGridPanX,
    top: -bfuxGridPanY,
    width,
    height,
    pitchX: bfuxGridPitch(width, spec.columns),
    pitchY: bfuxGridPitch(height, spec.rows),
  };
}

export function bfuxGridPlacementGeometry(
  apparatus: HTMLElement,
  spec: BfuxGridSpecLike,
  placement: BfuxGridPlacementLike,
  fallbackSize?: { width: number; height: number },
) {
  const metrics = bfuxGridWorkfieldMetrics(apparatus, spec);
  const maxColumnSpan = Math.max(1, bfuxGridMaxColumnSpan(placement, spec));
  const maxRowSpan = Math.max(1, bfuxGridMaxRowSpan(placement, spec));
  const columnSpan = placement.columnSpan == null
    ? bfuxGridFitSpan(fallbackSize?.width ?? metrics.pitchX, metrics.pitchX, maxColumnSpan)
    : Math.min(maxColumnSpan, bfuxGridSpan(placement.columnSpan));
  const rowSpan = placement.rowSpan == null
    ? bfuxGridFitSpan(fallbackSize?.height ?? metrics.pitchY, metrics.pitchY, maxRowSpan)
    : Math.min(maxRowSpan, bfuxGridSpan(placement.rowSpan));

  const anchorX = metrics.left + bfuxGridAxisFraction(placement.column, spec.columns) * metrics.width;
  const anchorY = metrics.top + bfuxGridAxisFraction(placement.row, spec.rows) * metrics.height;
  const width = metrics.pitchX * columnSpan;
  const height = metrics.pitchY * rowSpan;
  const rightAnchored = placement.corner === "ne" || placement.corner === "se";
  const bottomAnchored = placement.corner === "sw" || placement.corner === "se";

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

export function bfuxGridRemapSpan(value: number | undefined, previousPoints: number, nextPoints: number) {
  if (value == null) return undefined;
  const previousTracks = Math.max(1, previousPoints - 1);
  const nextTracks = Math.max(1, nextPoints - 1);
  return Math.max(1, Math.round((value / previousTracks) * nextTracks));
}
