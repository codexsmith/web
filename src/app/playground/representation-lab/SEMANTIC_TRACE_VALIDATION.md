# Semantic trace validation

Standalone strict TypeScript validation was run for the semantic timeline and semantic trace bus using the repository's TypeScript generation assumptions with minimal React/CSS declarations.

Validated invariants:

- semantic timeline types compile under `--strict`;
- Bayesian timeline expands each raw posterior observation into `PREDICT`, `OBSERVE`, and `UPDATE` semantic frames;
- Bayesian setup retains world truth outside the agent boundary and begins from a uniform hidden-state prior;
- prediction uses the same local random-walk transition grammar as the canonical exact filter;
- search frames classify frontier expansion as `INFER`, recovered-path motion as `ACT`, and final closure/defect as `CONSEQUENCE`;
- minimax/expectimax classify branch aggregation, action commitment, and modeled reply separately;
- MDP value sweeps remain `INFER` until the policy is exposed as `CONSEQUENCE`;
- the trace bus consumes semantic phase labels directly and does not derive phase from normalized frame index.

Repository-wide CI remains independently blocked earlier by the stale v2 route architecture contract on `main`, before typecheck/build.
