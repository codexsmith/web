export type BfuxLayoutResolution = "focus" | "mid";
export type BfuxLayoutCorner = "nw" | "ne" | "sw" | "se";

export type BfuxBillboardLayout = {
  width: number;
  height: number | null;
  gapY: number;
  visualWidth: number;
  mazeScale: number;
  mazeLeft: number;
  visualPadX: number;
  visualPadY: number;
  copyPadX: number;
  copyPadY: number;
  titleScale: number;
  controlsHeight: number;
};

export type BfuxLayoutGridSpec = {
  columns: number;
  rows: number;
  visible: boolean;
};

export type BfuxLayoutNodePlacement = {
  nodeId: string;
  column: number;
  row: number;
  corner: BfuxLayoutCorner;
};

export type BfuxLayoutPartPlacement = {
  instanceId: string;
  partId: string;
  x: number;
  y: number;
};

export type BfuxProjectionLayout = {
  billboard: BfuxBillboardLayout;
  anchorGrid: {
    spec: BfuxLayoutGridSpec;
    placements: BfuxLayoutNodePlacement[];
  };
  placedParts: BfuxLayoutPartPlacement[];
};

export type BfuxMachineLayoutSource = {
  schema: "bfux.machine-layout/v1";
  focus: BfuxProjectionLayout;
  mid: BfuxProjectionLayout;
};
