import rawBinding from "../../content/cyoa.binding.json";
import canonicalNodeData from "../../content/nodes.json";
import { domainHref } from "../site-navigation";
import { validateCyoaBinding, validateCyoaCanonicalReferences } from "./schema";
import type {
  CanonicalNodeSummary,
  CyoaBinding,
  CyoaChoice,
  CyoaOnramp,
} from "./types";

type RawCanonicalNode = {
  id: string;
  label: string;
  short?: string;
  title?: string;
};

const candidateBinding: unknown = rawBinding;
validateCyoaBinding(candidateBinding);

export const canonicalCyoaNodeIndex: Readonly<Record<string, CanonicalNodeSummary>> =
  Object.fromEntries(
    (canonicalNodeData as RawCanonicalNode[]).map((node) => [
      node.id,
      {
        id: node.id,
        label: node.label,
        summary: node.short ?? node.title ?? "",
        href: domainHref(node.id),
      },
    ]),
  );

validateCyoaCanonicalReferences(
  candidateBinding,
  new Set(Object.keys(canonicalCyoaNodeIndex)),
);

export const cyoaBinding: CyoaBinding = candidateBinding;

export const cyoaConceptIndex = Object.fromEntries(
  cyoaBinding.semantics.conceptRegistry.map((concept) => [concept.id, concept]),
);

export const cyoaOnramps: CyoaOnramp[] = cyoaBinding.semantics.onramps.map(
  (onramp) => ({
    ...onramp,
    choices: onramp.choices.map((choice): CyoaChoice => {
      const destination = canonicalCyoaNodeIndex[choice.destinationNodeId];
      return {
        id: choice.id,
        slug: choice.slug,
        title: choice.title,
        scene: choice.scene,
        conceptLabel: choice.conceptLabel,
        canonicalNodeIds: choice.canonicalNodeIds,
        lesson: choice.lesson,
        structuralMove: choice.structuralMove,
        firewall: choice.metaphorFirewall,
        bridge: choice.formalBridge,
        concepts: choice.conceptIds.map((id) => cyoaConceptIndex[id]),
        destination: { ...destination, actionLabel: choice.actionLabel },
      };
    }),
  }),
);
