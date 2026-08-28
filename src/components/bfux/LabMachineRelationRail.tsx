"use client";

import { getLabMachineNode, getLabMachineRelations } from "./lab-machine-model";
import { useLabMachineNavigation } from "./LabMachineNavigationContext";

export function LabMachineRelationRail({ nodeId, compact = false }: { nodeId?: string; compact?: boolean }) {
  const navigation = useLabMachineNavigation();
  const activeNodeId = nodeId ?? navigation?.currentNodeId ?? undefined;
  const node = getLabMachineNode(activeNodeId);
  if (!navigation || !node) return null;

  const relations = getLabMachineRelations(node.id);

  return (
    <nav className="bf-machine-relations" data-compact={compact ? "true" : "false"} aria-label={`${node.label} cross-subsystem relations`}>
      <header>
        <div><small>CROSS-SUBSYSTEM PORTS</small><strong>{navigation.focusLabel} · {node.label}</strong></div>
        <span>{relations.length} LIVE RELATION{relations.length === 1 ? "" : "S"}</span>
      </header>
      <div className="bf-machine-relations__ports">
        {relations.map(({ edge, direction, other }) => (
          <button
            key={`${edge.from}-${edge.to}-${direction}`}
            type="button"
            data-direction={direction}
            onClick={() => navigation.navigateTo(other.id)}
            aria-label={`${direction === "outbound" ? "Traverse" : "Traverse backward along"} ${edge.relation} to ${other.label}`}
          >
            <b aria-hidden="true">{direction === "outbound" ? "→" : "←"}</b>
            <span><small>{direction === "outbound" ? "OUT" : "IN"} · {edge.kind}</small><strong>{edge.relation}</strong><em>{other.label}</em></span>
          </button>
        ))}
      </div>
    </nav>
  );
}
