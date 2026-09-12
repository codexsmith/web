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

export function bfuxGridCoordinate(index: number, size: number, pointCount: number) {
  const pitch = bfuxGridPitch(size, pointCount);
  const origin = pointCount <= 1 ? size / 2 : 0;
  return origin + index * pitch;
}

export function bfuxGridSpan(value: number | undefined) {
  return Math.max(1, Math.round(value ?? 1));
}

/* Picker-level span limits describe the apparatus lattice itself. Placement
 * geometry applies the tighter workfield-edge bound once apparatus dimensions
 * are known. Keeping these independent of anchor position is important because
 * valid anchors may live on repeated grid points outside the apparatus box. */
export function bfuxGridMaxColumnSpan(_placement: Pick<BfuxGridPlacementLike, "column" | "corner">, spec: BfuxGridSpecLike) {
  return Math.max(1, spec.columns - 1);
}

export function bfuxGridMaxRowSpan(_placement: Pick<BfuxGridPlacementLike, "row" | "corner">, spec: BfuxGridSpecLike) {
  return Math.max(1, spec.rows - 1);
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

/* The grid spec describes points ACROSS THE APPARATUS, not points across the
 * apparatus plus its pan margins. The same pitch then repeats into those
 * margins. This keeps card dimensions stable while making the surrounding
 * drafting plane genuinely tiled and functional. */
export function bfuxGridWorkfieldMetrics(apparatus: HTMLElement, spec: BfuxGridSpecLike) {
  const apparatusWidth = Math.max(1, apparatus.offsetWidth);
  const apparatusHeight = Math.max(1, apparatus.offsetHeight);
  const pitchX = bfuxGridPitch(apparatusWidth, spec.columns);
  const pitchY = bfuxGridPitch(apparatusHeight, spec.rows);
  const left = -bfuxGridPanX;
  const top = -bfuxGridPanY;
  const right = apparatusWidth + bfuxGridPanX;
  const bottom = apparatusHeight + bfuxGridPanY;
  const originX = spec.columns <= 1 ? apparatusWidth / 2 : 0;
  const originY = spec.rows <= 1 ? apparatusHeight / 2 : 0;
  const minColumn = Math.ceil((left - originX) / pitchX);
  const maxColumn = Math.floor((right - originX) / pitchX);
  const minRow = Math.ceil((top - originY) / pitchY);
  const maxRow = Math.floor((bottom - originY) / pitchY);

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
  const maxColumnSpan = Math.max(1, Math.floor(
    (rightAnchored ? anchorX - metrics.left : metrics.right - anchorX) / metrics.pitchX + 1e-6,
  ));
  const maxRowSpan = Math.max(1, Math.floor(
    (bottomAnchored ? anchorY - metrics.top : metrics.bottom - anchorY) / metrics.pitchY + 1e-6,
  ));
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

export function bfuxGridRemapCoordinate(index: number, previousPoints: number, nextPoints: number) {
  const previousTracks = Math.max(1, previousPoints - 1);
  const nextTracks = Math.max(1, nextPoints - 1);
  const normalized = previousPoints <= 1 ? index + 0.5 : index / previousTracks;
  return nextPoints <= 1
    ? Math.round(normalized - 0.5)
    : Math.round(normalized * nextTracks);
}

export function bfuxGridRemapSpan(value: number | undefined, previousPoints: number, nextPoints: number) {
  if (value == null) return undefined;
  const previousTracks = Math.max(1, previousPoints - 1);
  const nextTracks = Math.max(1, nextPoints - 1);
  return Math.max(1, Math.round((value / previousTracks) * nextTracks));
}
