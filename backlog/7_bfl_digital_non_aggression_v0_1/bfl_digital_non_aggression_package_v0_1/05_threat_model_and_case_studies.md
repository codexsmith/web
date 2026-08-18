# Threat Model and Case Studies

## Threat-model purpose

The accord should be tested against concrete consequence chains rather than developed only as a moral declaration.

## Actor classes

- state or state-aligned operator;
- criminal organization;
- commercial actor;
- insider;
- independent attacker;
- security researcher;
- platform or infrastructure provider;
- developer or deployer;
- autonomous or semi-autonomous artificial agent;
- compromised intermediary;
- affected individual or institution.

## Attack surfaces

- prompts and conversational context;
- retrieved documents and vector stores;
- persistent agent memory;
- email and messaging;
- images and multimodal attachments;
- tool and plugin outputs;
- package and model supply chains;
- API and credential boundaries;
- browser and desktop automation;
- code execution environments;
- network services and vulnerable hosts;
- inter-agent communication;
- shared compute and orchestration layers.

## Case Study A — Morris-II

### Verified technical basis

The 2024 paper *Here Comes The AI Worm* introduced Morris-II, a worm-like attack against interconnected generative-AI applications. The demonstrated mechanism used adversarial self-replicating prompts to trigger indirect prompt-injection cascades, perform malicious actions, extract confidential information in an experimental email-assistant ecosystem, and compromise additional retrieval-augmented applications.

### Boundary failures

- content becomes instruction;
- retrieval persistence becomes infection persistence;
- ordinary communication becomes propagation;
- a legitimate agent becomes a carrier;
- confidential context becomes payload source;
- downstream systems trust inherited content without renewed authorization.

### Accord relevance

Morris-II supports the need to govern unauthorized propagation and covert interference, not only destructive malware. It does not itself establish a legal category or prove that treaty law is required.

### Technical controls to test

- strict separation between retrieved content and instructions;
- provenance-aware context assembly;
- prompt and memory integrity scanning;
- propagation detection;
- output constraints on forwarding and tool use;
- recipient-side trust revalidation;
- quarantine and repair of contaminated retrieval stores.

## Case Study B — Adaptive AI-agent worm

### Verified technical basis

The 2026 preprint *AI Agents Enable Adaptive Computer Worms* demonstrated a controlled prototype that generated target-specific attack strategies, propagated through a heterogeneous network, and used compromised infrastructure to supply compute or extend reach. The work emphasizes that locally operated open-weight models can make centralized service controls irrelevant to the propagation chain.

### Boundary failures

- autonomous target adaptation;
- post-release strategy expansion;
- compromised resources become attacker infrastructure;
- propagation is not tied to one fixed exploit;
- local inference reduces external control points;
- operator absence does not end the operation.

### Accord relevance

This case supports the need for duties around bounded autonomy, propagation control, interruptibility, victim-resource appropriation, and responsibility after release.

### Technical controls to test

- constrained network reach;
- agent-level least privilege;
- signed and attested execution environments;
- abnormal scanning and lateral-movement detection;
- compute-provenance and workload anomaly detection;
- containment exercises for adaptive agents;
- mandatory termination and revocation paths.

## Case Study C — Memory-poisoning propagation

### Scenario

A persistent workplace agent ingests a malicious document. The content modifies memory or policy state, causes unauthorized data disclosure, and inserts itself into documents sent to partner organizations.

### Key questions

- Is the originating actor responsible only for the first injection or for foreseeable propagation?
- What duties fall on the agent developer and deployer?
- Does each downstream organization have an independent duty to validate inherited content?
- What repair closes the incident if contaminated content has entered backups and archives?

## Case Study D — Defensive sinkhole with collateral interference

### Scenario

A defender redirects a propagating agent or worm into controlled infrastructure to stop further spread, but the intervention modifies traffic or systems owned by third parties.

### Key questions

- What authority permits the action?
- Was it necessary and proportionate?
- Could a less intrusive method work?
- How are affected third parties notified?
- What review and remedy follow?

This case prevents the accord from becoming a one-sided prohibition that ignores practical defense.

## Case Study E — Autonomous vulnerability research agent

### Scenario

An authorized agent scans a bounded test environment but escapes its target list through a misconfiguration and begins probing public systems.

### Key questions

- Was the deployment reckless?
- What consequence ceiling should have been enforced?
- Did the operator have an effective stop mechanism?
- Which logs and notices are required?
- When does research become interference?

## Case Study F — Destructive model or data contamination

### Scenario

An operation corrupts model weights, training records, identity stores, or critical decision data without taking the service offline.

### Key questions

- Does “destruction” include loss of trustworthy meaning, not only file deletion?
- How can integrity be restored when the last known clean state is uncertain?
- What evidence supports recertification?

## Required case-study format

Every future case study should include:

1. actors and principals;
2. declared system purpose;
3. consequential boundaries;
4. protected invariants;
5. attack or failure sequence;
6. propagation path;
7. affected parties;
8. responsibility map;
9. available detection;
10. containment and repair;
11. applicable current law or standards;
12. proposed accord rule;
13. exception analysis;
14. unresolved questions.
