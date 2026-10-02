export type AugustaSpatialRouteKind = "river" | "canal" | "street" | "highway" | "beltway";
export type AugustaSpatialZoneKind = "downtown" | "historical" | "institutional" | "residential" | "orientation";

export type AugustaSpatialRoute = {
  id: string;
  label: string;
  kind: AugustaSpatialRouteKind;
  d: string;
  labelX: number;
  labelY: number;
  labelRotate?: number;
};

export type AugustaSpatialZone = {
  id: string;
  label: string;
  kind: AugustaSpatialZoneKind;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const augustaSpatialContract = {
  orientation: "north-up-ish schematic",
  sourceLabel: "Augusta-Richmond County GIS — authoritative upgrade path",
  sourceHref: "https://www.augustaga.gov/gis",
  note:
    "Routes and zones are orientation aids, not surveyed geometry, legal boundaries, routing advice, or statements of exact distance. Replace with official GIS geometry when the public spatial layer is promoted beyond prototype status.",
} as const;

export const augustaSpatialRoutes: AugustaSpatialRoute[] = [
  {
    id: "savannah-river",
    label: "SAVANNAH RIVER",
    kind: "river",
    d: "M 2 16 C 18 11, 34 12, 49 14 S 79 12, 99 8",
    labelX: 72,
    labelY: 10,
    labelRotate: -5,
  },
  {
    id: "augusta-canal",
    label: "AUGUSTA CANAL",
    kind: "canal",
    d: "M 8 23 C 23 21, 34 22, 46 24 S 66 24, 78 22",
    labelX: 23,
    labelY: 20,
  },
  {
    id: "broad-street",
    label: "BROAD ST",
    kind: "street",
    d: "M 38 29 C 53 28.5, 68 28.5, 86 27",
    labelX: 66,
    labelY: 27,
  },
  {
    id: "fifteenth-street",
    label: "15TH ST",
    kind: "street",
    d: "M 43 22 C 43 38, 44 55, 46 76",
    labelX: 44,
    labelY: 48,
    labelRotate: 84,
  },
  {
    id: "walton-way",
    label: "WALTON WAY",
    kind: "street",
    d: "M 23 43 C 37 43, 52 44, 71 48",
    labelX: 35,
    labelY: 41,
    labelRotate: 4,
  },
  {
    id: "washington-road",
    label: "WASHINGTON RD",
    kind: "highway",
    d: "M 4 34 C 17 33, 27 35, 40 40",
    labelX: 15,
    labelY: 31,
    labelRotate: 5,
  },
  {
    id: "gordon-highway",
    label: "GORDON HWY",
    kind: "highway",
    d: "M 43 57 C 58 61, 73 67, 92 78",
    labelX: 70,
    labelY: 66,
    labelRotate: 18,
  },
  {
    id: "i520",
    label: "I-520",
    kind: "beltway",
    d: "M 86 27 C 96 39, 96 62, 88 86 C 76 94, 58 96, 43 92",
    labelX: 91,
    labelY: 55,
    labelRotate: 88,
  },
];

export const augustaSpatialZones: AugustaSpatialZone[] = [
  { id: "downtown", label: "DOWNTOWN", kind: "downtown", x: 57, y: 20, width: 27, height: 16 },
  { id: "laney-walker", label: "LANEY-WALKER / GOLDEN BLOCKS", kind: "historical", x: 48, y: 38, width: 23, height: 21 },
  { id: "education-medical", label: "EDUCATION / MEDICAL", kind: "institutional", x: 34, y: 38, width: 19, height: 23 },
  { id: "west-augusta", label: "WEST AUGUSTA", kind: "orientation", x: 12, y: 29, width: 25, height: 25 },
  { id: "south-augusta", label: "SOUTH AUGUSTA", kind: "residential", x: 48, y: 63, width: 37, height: 25 },
];

export const augustaSpatialNodePositions: Record<string, { x: number; y: number }> = {
  "savannah-water": { x: 27, y: 20 },
  "georgia-power-system": { x: 82, y: 43 },
  "augusta-transport": { x: 68, y: 65 },
  rcss: { x: 69, y: 32 },
  "augusta-households": { x: 78, y: 75 },
  "black-augusta-ecology": { x: 54, y: 61 },
  "paine-college": { x: 41, y: 51 },
  "haines-institute": { x: 52, y: 49 },
  "tabernacle-baptist": { x: 61, y: 43 },
  "ct-walker-school": { x: 45, y: 68 },
  "golden-blocks": { x: 57, y: 53 },
};

export function getAugustaSpatialPosition(id: string, fallback: { x: number; y: number }) {
  return augustaSpatialNodePositions[id] ?? fallback;
}
