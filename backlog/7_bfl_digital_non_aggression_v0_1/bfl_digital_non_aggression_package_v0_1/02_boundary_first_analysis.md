# Boundary-First Analysis
## Digital Non-Aggression, Non-Destruction, and Non-Interference

## 1. Consequential boundary

The central boundary separates:

- information a system may observe;
- instructions it is authorized to execute;
- transformations it may perform;
- systems and persons it may affect;
- resources it may consume;
- representations it may alter;
- actions it may delegate or propagate.

Morris-II is significant because the attack crosses the boundary between **data received** and **control obeyed**. The affected application processes hostile content as part of an ordinary workflow, but that content induces new actions and further propagation.

The adaptive-worm demonstration adds another boundary failure: compromised machines cease to be only victims and become the reasoning, compute, and transport substrate of the attacker.

## 2. Protected invariants

A mature accord should identify invariants rather than only enumerate attack techniques.

### I-1. Authorized-purpose integrity

A digital system should remain governed by the purposes, permissions, and principals that legitimately authorize its operation.

### I-2. Data and state integrity

Data, memory, model state, identity, logs, and operational records should not be altered without authorization and accountable provenance.

### I-3. Confidentiality

Information should not be extracted, inferred, replicated, or transmitted beyond its authorized disclosure boundary.

### I-4. Continuity

Essential services and systems should not be disabled, degraded, or made unavailable through hostile or recklessly uncontrolled action.

### I-5. Non-propagation without consent

A system should not become a carrier, replicator, tool, or infrastructure node for an operation it did not knowingly authorize.

### I-6. Human and institutional agency

The people and institutions affected by a digital operation should retain meaningful capacity to understand, contest, interrupt, recover from, and seek remedy for consequential actions.

### I-7. Responsibility continuity

Responsibility should remain traceable across principal, developer, deployer, operator, platform, model, agent, tool, and downstream consequence.

### I-8. Repairability

Consequential systems should preserve practical paths to detection, containment, rollback, restoration, evidence preservation, and recertification.

## 3. Admissible and inadmissible transitions

A digital action is not made admissible merely because a system can technically perform it.

A first-pass admissibility test asks:

1. Was the action authorized by an accountable principal?
2. Was the target within the declared operating boundary?
3. Was the action necessary and proportionate to the permitted purpose?
4. Were propagation and delegation constrained?
5. Were protected invariants preserved?
6. Were logging, witness, and attribution available?
7. Could the operation be stopped or recalled?
8. Were foreseeable harms bounded?
9. Was repair capacity retained?
10. Was the affected party provided contest or remedy where appropriate?

Inadmissible transitions include unauthorized:

- instruction substitution;
- context or memory poisoning;
- privilege escalation;
- identity impersonation;
- data extraction;
- tool invocation;
- code execution;
- replication;
- lateral movement;
- compute appropriation;
- destructive alteration;
- concealment and anti-recovery behavior.

## 4. Canonical defect classes

### D-1. Observation-command collapse

Untrusted content is interpreted as authorized instruction.

### D-2. Context contamination

A prompt, retrieved record, message, file, memory, or tool response modifies future behavior beyond its legitimate informational role.

### D-3. Delegation escape

An agent or process acts outside the permissions, scope, duration, or consequence ceiling of its principal.

### D-4. Propagation without renewed authorization

A harmful operation copies or induces itself across systems without each system’s informed authorization.

### D-5. Responsibility dissipation

No actor accepts responsibility because the consequence passed through multiple developers, deployers, services, tools, or autonomous processes.

### D-6. Repair-path destruction

The operation removes logs, recovery data, backups, credentials, administrative access, or other means required for restoration and accountability.

### D-7. Adaptive consequence expansion

A system changes its attack strategy, scope, or target selection after release, causing consequences beyond the original operator’s bounded plan.

### D-8. Victim-resource capture

The operation appropriates compromised compute, identity, data, network position, or trust relationships to continue functioning.

## 5. Agency chain

The accord should model a complete consequence chain:

```text
principal
  -> sponsor or institution
  -> developer
  -> model or component provider
  -> deployer
  -> operator
  -> platform and tool layer
  -> artificial agent or automated process
  -> intermediary system
  -> affected person, institution, or infrastructure
  -> downstream consequences
```

The key doctrine is:

> Delegation may distribute action, but it must not dissolve responsibility.

This does not imply strict liability for every unforeseeable output. It means that an accountability model must specify which actor carries which duty at each boundary.

## 6. Closure conditions

A digital operation has not responsibly closed merely because execution ended.

Responsible closure may require:

- termination of the active operation;
- proof that propagation has stopped;
- containment of affected systems;
- preservation of evidence;
- notification of affected parties;
- restoration of trusted state;
- validation of backups and credentials;
- removal of persistence mechanisms;
- assessment of downstream contamination;
- remedy or compensation;
- independent review;
- recertification before reconnection.

## 7. Repair architecture

A useful accord must be paired with repair mechanisms.

### Detection

- instruction/data separation;
- provenance and integrity signals;
- anomaly detection;
- propagation-rate monitoring;
- agent and tool-call audit trails;
- memory and retrieval integrity checks.

### Containment

- scoped credentials;
- network segmentation;
- execution sandboxes;
- bounded tool permissions;
- propagation circuit breakers;
- safe-mode operation;
- quarantine of contaminated context and memory.

### Recovery

- trusted-state restoration;
- revocation and key rotation;
- reproducible model and configuration baselines;
- provenance-aware data recovery;
- dependency and downstream exposure review.

### Recertification

- evidence that the harmful chain has terminated;
- validation of repaired boundaries;
- independent or cross-functional review;
- explicit acceptance of residual risk.

## 8. Theoretical caution

“Representational sovereignty” is a useful diagnostic phrase for the condition in which a system’s operative representation is covertly subordinated to an unauthorized actor. It should not be used to imply that software or AI possesses sovereign political status.

The safer technical term for the protected invariant is:

> **authorized-purpose integrity**

The public-philosophy term may remain:

> **representational sovereignty of the legitimate principal**

That distinction should be preserved in all publication work.
