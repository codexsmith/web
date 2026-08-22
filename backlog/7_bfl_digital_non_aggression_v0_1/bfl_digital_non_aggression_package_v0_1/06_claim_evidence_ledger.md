# Claim and Evidence Ledger

## Status vocabulary

- **Verified technical result:** Supported directly by a cited primary source.
- **Source interpretation:** A bounded reading of a cited result.
- **Project inference:** Boundary First Labs analysis derived from one or more sources.
- **Normative proposal:** A rule or principle the project recommends.
- **Candidate term:** Useful language not yet stabilized.
- **Open research question:** Requires legal, technical, historical, or empirical work.

| ID | Statement | Status | Evidence / basis | Required next action |
|---|---|---|---|---|
| C-001 | Morris-II used adversarial self-replicating prompts to create a worm-like chain across interconnected GenAI applications. | Verified technical result | Cohen, Bitton, and Nassi, arXiv:2403.02817 | Review final conference version and defense evaluation. |
| C-002 | Morris-II demonstrated confidential-data extraction and further compromise in an experimental RAG-based email-assistant ecosystem. | Verified technical result | arXiv:2403.02817 | Record exact threat assumptions, models, and experimental limits. |
| C-003 | Adaptive AI agents can generate target-specific attack strategies and propagate through heterogeneous hosts in a controlled network. | Verified technical result | Guan et al., arXiv:2606.03811 | Review full methods, success rates, topology, safeguards, and limitations. |
| C-004 | Compromised machines can be used to support the worm’s reasoning or extend its reach. | Verified technical result | arXiv:2606.03811 | Distinguish demonstrated configurations from broader possible deployments. |
| C-005 | Centralized model-provider safeguards are structurally insufficient for locally running open-weight attack systems. | Source interpretation | arXiv:2606.03811 | Compare with endpoint, network, hardware, and supply-chain controls. |
| C-006 | Agentic attacks collapse the boundary between data received and instructions obeyed. | Project inference | Morris-II mechanism; runtime prompt-injection literature | Formalize data/control boundary and identify counterexamples. |
| C-007 | A compromised system can become an unconsenting propagation substrate. | Project inference / candidate term | Both primary cases | Define “consent” appropriately for organizations and machines; likely use authorization instead. |
| C-008 | Local security controls alone may be insufficient for self-propagating cross-border agentic threats. | Project inference | Connectivity and propagation structure | Compare actual effectiveness of current security controls and incident cooperation. |
| C-009 | Digital non-aggression, non-destruction, and non-interference should be treated as separate but related prohibitions. | Normative proposal | Conversation-derived framework | Test against cyber law, international law, civil liberties, and security practice. |
| C-010 | Delegation cannot dissolve responsibility. | Normative proposal | Boundary First Labs agency doctrine | Develop a responsibility matrix and compare with current liability doctrines. |
| C-011 | High-consequence autonomous systems should retain effective stop, recall, investigation, and repair mechanisms. | Normative proposal | Repairability and consequence control | Identify feasibility limits and avoid impossible universal requirements. |
| C-012 | “Authorized-purpose integrity” is a safer technical invariant than attributing sovereignty to AI systems. | Project inference | Governance and terminology analysis | Expert review in AI governance, law, and political theory. |
| C-013 | “Representational sovereignty” can describe the legitimate principal’s control over operative representation. | Candidate term | Conversation-derived phrase | Decide whether rhetorical value exceeds ambiguity risk. |
| C-014 | A treaty may eventually be justified. | Open research question | No current evidence in package determines instrument form | Compare protocol, standard, compact, convention, model law, and treaty paths. |
| C-015 | Existing law and cyber norms inadequately cover all adaptive agentic propagation risks. | Open research question | Plausible but not established here | Conduct comparative legal and policy review before public claim. |
| C-016 | A right to detection, contest, recovery, and repair should apply to consequential digital systems. | Normative proposal | Boundary First Labs agency framework | Specify rights holders, duty bearers, thresholds, and enforceability. |
| C-017 | Defensive intervention must remain bounded by authority, necessity, proportionality, minimization, logging, review, and termination. | Normative proposal informed by established governance concepts | General legal and security principles; not yet mapped | Perform doctrine-specific legal review. |
| C-018 | Non-propagation controls should become a certification target for high-connectivity agent systems. | Normative and engineering proposal | Threat mechanics | Define testable controls and pilot a technical profile. |

## Claim firewall

No public artifact should state C-014 or C-015 as established fact. The first publishable paper should be framed as:

- a demonstrated technical threat class;
- a boundary and governance analysis;
- a research agenda for possible shared prohibitions and duties;
- a comparison of institutional forms.
