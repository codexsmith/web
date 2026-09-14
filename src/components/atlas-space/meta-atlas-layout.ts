export type MetaDomainPosition = {
  x: number;
  y: number;
};

const PRIMARY_POSITIONS: MetaDomainPosition[] = [
  { x: 23, y: 24 },
  { x: 77, y: 24 },
  { x: 23, y: 74 },
  { x: 77, y: 74 },
];

export function metaPositionFor(index: number, total: number): MetaDomainPosition {
  if (total <= PRIMARY_POSITIONS.length) return PRIMARY_POSITIONS[index] ?? { x: 50, y: 50 };

  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * 34,
    y: 50 + Math.sin(angle) * 34,
  };
}
