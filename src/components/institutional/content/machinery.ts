export type MachineryEntryPoint = {
  kind: string;
  locator: string;
};

export type MachineryRecord = {
  machineId: string;
  name: string;
  description?: string;
  canonicalHome: string;
  ownerScope?: string;
  functionRoles: readonly string[];
  maturity: string;
  integrationLevel: string;
  manifestStatus: string;
  entrypoints: readonly MachineryEntryPoint[];
  authorityCeiling: string;
  sideEffectClass: string;
  durableProjections: readonly string[];
  projectionPolicy?: string;
  nextIntegrationStep: string;
};

export const machineryProjection = {
  "sourceRepository": "codexsmith/boundary-first-labs",
  "sourcePath": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/LAB_MACHINERY_REGISTRY.json",
  "sourceRevision": "5dafabd14f8904f4002b404f115b4969f4b79e0c",
  "sourceRevisionDate": "2026-09-23",
  "registryDate": "2026-09-23",
  "sourceStatus": "human_reviewed_reconciliation_v0_2",
  "authority": "Discovery, routing, interoperability planning, and integration status only. This registry does not supersede component-local contracts or confer scientific, publication, institutional, or execution authority.",
  "generationPolicy": "Human-reviewed registry reconciled against package-local machinery contracts. Generated discovery remains subordinate and should be rebuilt from package-local bfl_machinery_manifest.json files; generated output must not be hand-edited into authority.",
  "sourceHref": "https://github.com/codexsmith/boundary-first-labs/blob/5dafabd14f8904f4002b404f115b4969f4b79e0c/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/LAB_MACHINERY_REGISTRY.json"
} as const;

export const machineryRecords: readonly MachineryRecord[] = [
  {
    "machineId": "BFL-MACH-AGENT-CONTROL",
    "name": "Agent Control",
    "description": "Governed packetized automation substrate for bounded work discovery, admission, scheduling, dispatch, execution evidence, independent verification, cadence, and capability-aware operation routing.",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/Agent_Control/",
    "ownerScope": "Daily Operations / Agent Control",
    "functionRoles": [
      "Store",
      "Route",
      "Transform",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "package_local",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/Agent_Control/00_AGENT_CONTROL.md"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/Agent_Control/runtime/bfl_agent_control/__main__.py"
      },
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/Agent_Control/agent_registry.yaml"
      }
    ],
    "authorityCeiling": "Bounded Agent Control admission/routing/scheduling/dispatch/execution-evidence/verification authority under explicit packet, transaction, capability, scope, budget, cadence, and human-gate contracts. A4 promotion and A5 external consequence remain human-authorized; Agent Control may not self-admit arbitrary work or silently enlarge scope.",
    "sideEffectClass": "bounded_mutation",
    "durableProjections": [],
    "nextIntegrationStep": "Adapt Agent Control run/verification/cadence evidence into the common Machinery Event envelope and include its package-local manifest in ordinary generated-registry validation/refresh."
  },
  {
    "machineId": "BFL-MACH-AGENTIC-ARTIFACT",
    "name": "Agentic Artifact Protocol",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/agentic_artifact_protocol/",
    "functionRoles": [
      "Route",
      "Transform",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "package_local",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/agentic_artifact_protocol/README.md"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/agentic_artifact_protocol/validate_agentic_artifacts.py"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/agentic_artifact_protocol/build_agentic_artifact_registry.py"
      }
    ],
    "authorityCeiling": "Representation and execution contract for explicitly opted-in research objects only; passing validation or successful execution cannot promote claims, publication status, canonical source, or institutional stage.",
    "sideEffectClass": "derived_write",
    "durableProjections": [],
    "nextIntegrationStep": "Expose Agentic Artifact validation/registry operations through the common machinery registry while retaining package-local agentic manifests as execution authority."
  },
  {
    "machineId": "BFL-MACH-ARCHITECTURE-OBSERVATORY",
    "name": "Architecture Observatory",
    "description": "File-backed architecture inspection and representation-analysis instrument over the governed Lab Architecture Atlas.",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/01_control_and_architecture/diagrams/lab_architecture_atlas_mermaid_v0_1/observatory_v0_1/",
    "ownerScope": "Pipeline Tooling / Control and Architecture / Architecture Observatory",
    "functionRoles": [
      "Route",
      "Transform",
      "Test",
      "Project"
    ],
    "maturity": "candidate",
    "integrationLevel": "L3",
    "manifestStatus": "package_local",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/01_control_and_architecture/diagrams/lab_architecture_atlas_mermaid_v0_1/observatory_v0_1/viewer/README.md"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/01_control_and_architecture/diagrams/lab_architecture_atlas_mermaid_v0_1/observatory_v0_1/viewer/serve.mjs"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/01_control_and_architecture/diagrams/lab_architecture_atlas_mermaid_v0_1/observatory_v0_1/viewer/scripts/build_catalog.mjs"
      }
    ],
    "authorityCeiling": "Read/derive-only architecture inspection and representation-analysis authority. The Observatory may build derived navigation catalogs, route questions, compare declared views, expose gaps, and prepare projection requests; it may not create source truth, durable identities, KTG relations, machine admission, promotion authority, deployment state, or scientific validation.",
    "sideEffectClass": "derived_write",
    "durableProjections": [],
    "nextIntegrationStep": "Enroll the Observatory in common machinery health/refresh and complete browser-level verification before considering a higher integration level."
  },
  {
    "machineId": "BFL-MACH-BLF-TRANSLATION",
    "name": "BLF Translation Program",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/blf_translation_program__operations/",
    "functionRoles": [
      "Transform",
      "Project",
      "Govern"
    ],
    "maturity": "candidate",
    "integrationLevel": "L3",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/blf_translation_program__operations/"
      }
    ],
    "authorityCeiling": "Controlled representation change across audiences/artifact types while preserving source relationships and claim ceilings; translation does not change source authority.",
    "sideEffectClass": "derived_write",
    "durableProjections": [
      "Publication Mine"
    ],
    "nextIntegrationStep": "Review operation-specific contracts and add explicit representation-transport adapters."
  },
  {
    "machineId": "BFL-MACH-CONTROL-PLANE",
    "name": "Structural and Semantic Control Plane",
    "canonicalHome": "organized_library_curated/CONTROL_PLANE.md",
    "functionRoles": [
      "Store",
      "Route",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/CONTROL_PLANE.md"
      },
      {
        "kind": "command",
        "locator": "python helper_scripts/bfi_run.py --run refresh_control_plane"
      },
      {
        "kind": "health_surface",
        "locator": "organized_library_curated/00_CONTROL_PLANE_HEALTH.md"
      }
    ],
    "authorityCeiling": "Routing, generated measurement, derived projection, freshness, and bounded validation authority only; no source, claim, publication, or institutional promotion authority.",
    "sideEffectClass": "derived_write",
    "durableProjections": [],
    "nextIntegrationStep": "Add package/local machinery manifest representation and enroll machinery registry generation/validation in refresh_control_plane after schema calibration."
  },
  {
    "machineId": "BFL-MACH-CORPUS-FORGE",
    "name": "Corpus Forge",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/corpus_forge/",
    "functionRoles": [
      "Store",
      "Transform",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "package_local",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/corpus_forge/corpus_forge_protocol.md"
      },
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/corpus_forge/corpus_forge_job_packet_template.md"
      }
    ],
    "authorityCeiling": "Source-bounded research refinement, criticism, evidence production, and candidate repair. Operator and critic output cannot cross the Human Promotion Gate automatically.",
    "sideEffectClass": "bounded_mutation",
    "durableProjections": [
      "Timeline",
      "Publication Mine",
      "Research Lane Register",
      "Experiment Register",
      "Atlas of Atlases"
    ],
    "projectionPolicy": "May emit candidate projection updates when a governed operation materially changes a durable cross-cutting object; acceptance remains with the relevant register/source authority.",
    "nextIntegrationStep": "Create Machinery Event adapter and first Corpus Forge -> durable projection candidate vertical slice."
  },
  {
    "machineId": "BFL-MACH-INTAKE",
    "name": "Intake Audit and Commit Closure",
    "canonicalHome": "organized_library_curated/998_Intake/",
    "functionRoles": [
      "Store",
      "Route",
      "Transform",
      "Govern"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "workflow",
        "locator": "audit -> adjudicate -> commit -> refresh -> re-audit"
      },
      {
        "kind": "document",
        "locator": "organized_library_curated/998_Intake/active_handoff.md"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/helper_scripts/audit_intake.py"
      },
      {
        "kind": "script",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/helper_scripts/commit_intake.py"
      }
    ],
    "authorityCeiling": "Bounded ingestion transaction after explicit adjudication; must preserve source hashes, path containment, collision checks, append-only commit evidence, and post-mutation refresh. Does not promote research claims.",
    "sideEffectClass": "bounded_mutation",
    "durableProjections": [],
    "nextIntegrationStep": "Define Machinery Event adapter for audit/adjudication/commit lineage and candidate durable-projection updates."
  },
  {
    "machineId": "BFL-MACH-MANAGEMENT-CONTROL",
    "name": "Management Control",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/management_control/",
    "functionRoles": [
      "Store",
      "Route",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/management_control/"
      }
    ],
    "authorityCeiling": "Cross-Lab management routing and rollup only; generated management projections do not silently reprioritize, close, or supersede domain-local work authority.",
    "sideEffectClass": "derived_write",
    "durableProjections": [],
    "nextIntegrationStep": "Verify current executable entrypoints and enroll capability/authority semantics in the common manifest."
  },
  {
    "machineId": "BFL-MACH-PUBLICATION-CONTROL",
    "name": "Publication Control and Paper Mine",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/",
    "functionRoles": [
      "Store",
      "Route",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/"
      }
    ],
    "authorityCeiling": "Publication discovery, dependency, measurement, queue, projection, snapshot, and history state. Generated outputs do not silently promote publication or scientific status.",
    "sideEffectClass": "derived_write",
    "durableProjections": [
      "Publication Mine"
    ],
    "nextIntegrationStep": "Bind publication events/projections to common Machinery Event identity without duplicating publication source authority."
  },
  {
    "machineId": "BFL-MACH-SANDBOX-PILOT",
    "name": "Boundary First Executable Sandbox / Workbench Pilot",
    "canonicalHome": "branch:agent/boundary-first-sandbox",
    "functionRoles": [
      "Transform",
      "Test",
      "Project"
    ],
    "maturity": "prototype",
    "integrationLevel": "L1",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "workflow",
        "locator": "PR #270 / branch agent/boundary-first-sandbox"
      }
    ],
    "authorityCeiling": "Prototype direct-manipulation/executable representation surface only; does not become institutional source authority by visualization or execution.",
    "sideEffectClass": "bounded_mutation",
    "durableProjections": [],
    "nextIntegrationStep": "ADAPT: consume the common machinery registry and runtime authority/event contracts rather than defining a parallel institutional control plane."
  },
  {
    "machineId": "BFL-MACH-SUPPORTING-CAPTURE",
    "name": "Supporting Capture Protocol",
    "canonicalHome": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/supporting_capture_protocol/",
    "functionRoles": [
      "Store",
      "Route",
      "Test",
      "Govern"
    ],
    "maturity": "stable",
    "integrationLevel": "L5",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "document",
        "locator": "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/supporting_capture_protocol/"
      }
    ],
    "authorityCeiling": "Provenance and integrity only; no execution authority and no promotion of historical/supporting material into current theory.",
    "sideEffectClass": "derived_write",
    "durableProjections": [
      "Timeline"
    ],
    "nextIntegrationStep": "Add manifest after verifying current validator/generator entrypoints and define provenance-event adapter only where useful."
  },
  {
    "machineId": "BFL-MACH-UX-RECIPE-ADMISSION-PILOT",
    "name": "UX Pattern Atlas Recipe Admission Gate Pilot",
    "canonicalHome": "branch:agent/bfux-pattern-atlas-v0-1-2026-09-04",
    "functionRoles": [
      "Route",
      "Test",
      "Govern",
      "Project"
    ],
    "maturity": "pilot",
    "integrationLevel": "L2",
    "manifestStatus": "seed_registry_only",
    "entrypoints": [
      {
        "kind": "workflow",
        "locator": "PR #268 / branch agent/bfux-pattern-atlas-v0-1-2026-09-04"
      }
    ],
    "authorityCeiling": "Scoped recipe/runtime admission prototype. Readiness is evidence, not authorization; explicit admission and revocation are distinct authority events.",
    "sideEffectClass": "authority_change",
    "durableProjections": [],
    "nextIntegrationStep": "COMPOSE: extract reusable admission/runtime-authorization semantics into the common runtime authority federation while preserving UX Pattern Atlas domain ownership."
  }
];
