export type ClaimRecord = {
  id: string;
  claim: string;
  status: string;
  requiresValidation: boolean | null;
  noveltyClaim: boolean | null;
  evidence: readonly string[];
  source: string | null;
};

export const claimProjection = {
  "sourceRepository": "codexsmith/boundary-first-labs",
  "sourcePath": "organized_library_curated/999_Library/02_Core_Theory/02_engine_core__theory/01_engine_modules/information_mechanics/machine/CLAIM_LEDGER.json",
  "sourceRevision": "3a8c984712ae1d87c7ec714876c356c20242cb15",
  "sourceRevisionDate": "2026-09-18",
  "ledgerProgram": "information_mechanics",
  "ledgerStatus": "working",
  "registrarId": "REG-IM-CLAIMS",
  "registrarStatus": "active",
  "authorityOwner": "Information Mechanics Research Program",
  "authority": "owner-local claim/evidence status and validation posture only; no claim truth, theorem proof, novelty, publication promotion, or cross-domain authority",
  "sourceRelationship": "source_owner",
  "idNamespace": "IM-C*",
  "sourceHref": "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/02_Core_Theory/02_engine_core__theory/01_engine_modules/information_mechanics/machine/CLAIM_LEDGER.json",
  "ownerResearch": {
    "atlasId": "research-im",
    "code": "IM",
    "title": "Information Mechanics"
  }
} as const;

export const claimRecords: readonly ClaimRecord[] = [
  {
    "id": "IM-C001",
    "claim": "Possible, admissible, and reachable are distinct notions in the general formalism.",
    "status": "candidate_foundational_separation",
    "requiresValidation": null,
    "noveltyClaim": null,
    "evidence": [
      "finite countermodels"
    ],
    "source": null
  },
  {
    "id": "IM-C002",
    "claim": "Static admissible forgetting relative to an obligation can be expressed by factorization through the forgetting map.",
    "status": "standard_factorization_pattern",
    "requiresValidation": null,
    "noveltyClaim": false,
    "evidence": [],
    "source": null
  },
  {
    "id": "IM-C003",
    "claim": "Testing can be modeled as interrogation/refinement of candidate equivalence and path structure.",
    "status": "methodological_synthesis",
    "requiresValidation": null,
    "noveltyClaim": false,
    "evidence": [],
    "source": null
  },
  {
    "id": "IM-C004",
    "claim": "Relational database theory is a canonical calibration domain for the proposed vocabulary.",
    "status": "programmatic_choice",
    "requiresValidation": null,
    "noveltyClaim": false,
    "evidence": [],
    "source": null
  },
  {
    "id": "IM-C005",
    "claim": "Schemathematics may be treated as reusable invariant form extracted from Information-Mechanical realizations.",
    "status": "working_architecture",
    "requiresValidation": true,
    "noveltyClaim": null,
    "evidence": [],
    "source": null
  },
  {
    "id": "IM-C006",
    "claim": "Emergent promotion may be modeled by admissible quotienting of internal distinctions relative to higher-order dynamics.",
    "status": "research_hypothesis",
    "requiresValidation": true,
    "noveltyClaim": null,
    "evidence": [],
    "source": null
  },
  {
    "id": "IM-C007",
    "claim": "For a declared obligation family, some effective boundary descriptions may be constructible as lawful reductions of more detailed state-transition systems.",
    "status": "research_hypothesis",
    "requiresValidation": true,
    "noveltyClaim": false,
    "evidence": [],
    "source": "bridges/STATE_STATISTICAL_BOUNDARY_SCALE_STACK.md"
  },
  {
    "id": "IM-C008",
    "claim": "Micro-to-macro scale change can be analyzed as representation transport whose defects are indexed by the protected distinctions and boundary obligations not preserved by the reduction.",
    "status": "methodological_synthesis",
    "requiresValidation": true,
    "noveltyClaim": false,
    "evidence": [],
    "source": "research/STATE_TO_BOUNDARY_SCALE_BRIDGE_PROTOCOL.md"
  }
];
