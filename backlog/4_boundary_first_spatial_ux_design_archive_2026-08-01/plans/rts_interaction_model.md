# RTS Research Operations Interaction Model

## Product framing

> A real-time strategy interface for inquiry—where the terrain is research state, the resources are evidence and attention, the units are governed processes, and progress means lawful transformation rather than conquest.

## Useful RTS grammar

- strategic overview;
- operational room/inquiry view;
- artifact/object view;
- minimap;
- queues;
- alerts;
- control groups;
- task assignment;
- multiple simultaneous processes;
- fog and visibility states;
- continuous zoom;
- replay/history.

## Research translation

| RTS concept | Corpus Forge meaning |
|---|---|
| Map | Atlas/research landscape |
| Base/command center | Central Workbench |
| Facility | Method-specific room or workflow |
| Unit | Governed process or bounded agent assignment |
| Resource | Evidence, attention, compute, time, authority |
| Production queue | Research or artifact workflow queue |
| Fog of war | Unknown, unobserved, unresolved, restricted, unintegrated, or unreliable state |
| Control group | Saved artifact set or research context |
| Tech tree | Dependency and prerequisite graph, without reward-game framing |
| Victory | Not applicable; use bounded closure, learning, repair, or principled abandonment |

## Strategic view requirements

- display programs and active inquiries;
- show bottlenecks, contradictions, overdue review, and blocked gates;
- distinguish different reasons for opacity;
- support zoom from program to individual artifact;
- retain selection and context across scale;
- support bounded group operations;
- show agent assignments and permissions;
- allow replay of consequential state transitions.

## Boundary selection

Replace rectangular box-select with semantic/spatial boundary selection:

```text
project candidate volume
→ filter by type, relation, status, and scope
→ preview selected set
→ show lawful group actions
→ commit
```

Examples:

- all claims dependent on an assumption;
- all artifacts affected by a contradiction;
- all items awaiting critic review;
- all sources inside a declared evidence boundary;
- all unresolved objects in one research program.

## Anti-patterns

- points and leveling detached from rigor;
- artificial urgency;
- volume-based productivity scores;
- conquest language as default;
- clearing negative results as waste;
- anthropomorphic agents concealing their work;
- rewarding publication over correct non-promotion;
- treating every inquiry as a problem that must be “won.”
