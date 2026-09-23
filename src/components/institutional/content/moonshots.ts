import { nodes, type ContentNode } from "@/lib/content";

const requiredNode = (id: string) => {
  const node = nodes.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Missing Moonshots content node: ${id}`);
  return node;
};

export const moonshotsProgram = requiredNode("moonshots");

export const moonshotObjectives = nodes.filter(
  (node) => node.parentId === moonshotsProgram.id,
);

export const moonshotsEvaluation = moonshotsProgram.inspection?.[0];

export function moonshotSlug(node: ContentNode) {
  return node.path.split("/").at(-1) ?? node.id;
}

export function getMoonshotObjectiveBySlug(slug: string) {
  return moonshotObjectives.find((node) => moonshotSlug(node) === slug);
}
