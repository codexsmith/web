"""Build the website graph and artifact index from canonical content.

The builder is intentionally validation-first: source Markdown is never
modified, and generated files are written only after every input is valid.

Artifact files live at ``src/content/artifacts/<slug>.md`` and require:

    ---
    title: Public title
    parent: Facet name or node-id
    parent_node: node-id  # required only for an ambiguous facet name
    claim_maturity: draft
    ---
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import tempfile
from collections import defaultdict
from pathlib import Path
from typing import Any

import yaml


DEFAULT_PROJECT_ROOT = Path(__file__).resolve().parents[1]
REQUIRED_ARTIFACT_FIELDS = ("title", "parent", "claim_maturity")
FRONTMATTER_PATTERN = re.compile(
    r"\A\ufeff?---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(?:\r?\n|\Z)",
    re.DOTALL,
)

RELATION_DIRECTIONS = {"directed", "symmetric", "inverse-paired"}
NON_RELATION_NODE_REFERENCE_KEYS = {"id", "role"}

PROJECTION_SOURCE_KEYS: dict[str, tuple[str, ...]] = {
    "work": (
        "researchPrograms",
        "practicePrograms",
        "programs",
        "softwarePortfolio",
        "consultingServices",
        "practiceAndServices",
        "researchShelves",
        "practiceShelves",
        "portfolioShelves",
        "scientificOnRamps",
        "evidenceOnRamps",
        "nextResearchActions",
        "nextPortfolioActions",
        "nextActions",
    ),
    "lineage": (
        "conceptualLineage",
        "history",
        "historyArchitecture",
        "conceptualPlacement",
        "foundingRationale",
        "foundationalRole",
    ),
}

GOVERNANCE_KEY_PATTERN = re.compile(
    r"governance|policy|steward|claimFirewall|validationGate|prohibitedClaim|"
    r"publicationAdmissibility|safeguard|editorialBoundar|operatingGuideline|"
    r"portfolioLifecycle",
    re.IGNORECASE,
)

COLLABORATION_MODES_BY_LAYER: dict[str, tuple[str, ...]] = {
    "center": (
        "institutional-partnership",
        "research-formalization",
        "funding-support",
    ),
    "theory": (
        "research-formalization",
        "independent-review-criticism",
        "advisory-domain-expertise",
    ),
    "public-spine": (
        "research-formalization",
        "independent-review-criticism",
        "advisory-domain-expertise",
    ),
    "research": (
        "research-formalization",
        "case-data-artifact-contribution",
        "independent-review-criticism",
    ),
    "practice": (
        "pilot-testbed",
        "software-product-codevelopment",
        "advisory-domain-expertise",
    ),
    "proof": (
        "pilot-testbed",
        "independent-review-criticism",
        "case-data-artifact-contribution",
    ),
    "public-policy": (
        "advisory-domain-expertise",
        "independent-review-criticism",
        "institutional-partnership",
    ),
    "public-interface": (
        "education-facilitation",
        "independent-review-criticism",
        "case-data-artifact-contribution",
    ),
    "support": (
        "case-data-artifact-contribution",
        "institutional-partnership",
        "funding-support",
    ),
}


class BuildValidationError(Exception):
    """Raised when one or more source records cannot be built safely."""

    def __init__(self, errors: list[str]) -> None:
        self.errors = errors
        super().__init__("\n".join(errors))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate and build graphNodes.json and artifactsIndex.json.",
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--check",
        action="store_true",
        help="Validate inputs and fail if generated outputs are stale.",
    )
    mode.add_argument(
        "--dry-run",
        action="store_true",
        help="Validate and report output status without writing files.",
    )
    parser.add_argument(
        "--project-root",
        type=Path,
        default=DEFAULT_PROJECT_ROOT,
        help=argparse.SUPPRESS,
    )
    return parser.parse_args()


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    if not slug:
        raise ValueError("does not produce a usable URL slug")
    return slug


def read_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except FileNotFoundError as exc:
        raise BuildValidationError([f"{path}: file not found"]) from exc
    except json.JSONDecodeError as exc:
        raise BuildValidationError(
            [f"{path}:{exc.lineno}:{exc.colno}: invalid JSON: {exc.msg}"],
        ) from exc


def load_relation_policies(content_dir: Path) -> dict[str, dict[str, Any]]:
    path = content_dir / "relationTypes.json"
    value = read_json(path)
    relations = value.get("relations") if isinstance(value, dict) else None
    if not isinstance(relations, dict) or not relations:
        raise BuildValidationError(
            [f"{path}: root object requires a non-empty 'relations' object"],
        )

    errors: list[str] = []
    policies: dict[str, dict[str, Any]] = {}
    required_strings = (
        "label",
        "inverseLabel",
        "directionality",
        "summary",
        "inverseSummary",
        "claimBoundary",
    )
    for key, raw_policy in relations.items():
        location = f"{path}: relation '{key}'"
        if not isinstance(key, str) or not key.strip():
            errors.append(f"{path}: relation keys must be non-empty strings")
            continue
        if not isinstance(raw_policy, dict):
            errors.append(f"{location} must be an object")
            continue
        policy = dict(raw_policy)
        for field in required_strings:
            field_value = policy.get(field)
            if not isinstance(field_value, str) or not field_value.strip():
                errors.append(
                    f"{location} requires a non-empty string '{field}'",
                )
        directionality = policy.get("directionality")
        if directionality not in RELATION_DIRECTIONS:
            errors.append(
                f"{location} directionality must be one of "
                f"{sorted(RELATION_DIRECTIONS)}",
            )
        if directionality == "inverse-paired":
            inverse_key = policy.get("inverseKey")
            if not isinstance(inverse_key, str) or not inverse_key.strip():
                errors.append(
                    f"{location} requires inverseKey for inverse-paired semantics",
                )
        policies[key] = policy

    for key, policy in policies.items():
        if policy.get("directionality") != "inverse-paired":
            continue
        inverse_key = policy.get("inverseKey")
        inverse = policies.get(str(inverse_key))
        if inverse is None:
            errors.append(
                f"{path}: relation '{key}' names unknown inverseKey "
                f"'{inverse_key}'",
            )
            continue
        if (
            inverse.get("directionality") != "inverse-paired"
            or inverse.get("inverseKey") != key
        ):
            errors.append(
                f"{path}: inverse pair '{key}'/'{inverse_key}' must be "
                "declared reciprocally",
            )

    if errors:
        raise BuildValidationError(errors)
    return policies


def load_facet_metadata(content_dir: Path) -> dict[str, dict[str, Any]]:
    path = content_dir / "facetMetadata.json"
    if not path.exists():
        return {}
    value = read_json(path)
    facets = value.get("facets") if isinstance(value, dict) else None
    if not isinstance(facets, dict):
        raise BuildValidationError(
            [f"{path}: root object requires a 'facets' object"],
        )
    errors: list[str] = []
    metadata: dict[str, dict[str, Any]] = {}
    for key, raw_record in facets.items():
        location = f"{path}: facet '{key}'"
        if not isinstance(key, str) or "--" not in key:
            errors.append(
                f"{location} must use the stable '<node-id>--<facet-slug>' key",
            )
            continue
        if not isinstance(raw_record, dict):
            errors.append(f"{location} must be an object")
            continue
        target_ids = raw_record.get("targetNodeIds", [])
        if not isinstance(target_ids, list) or not all(
            isinstance(target_id, str) and target_id.strip()
            for target_id in target_ids
        ):
            errors.append(
                f"{location} targetNodeIds must be an array of non-empty strings",
            )
            continue
        if len(set(target_ids)) != len(target_ids):
            errors.append(f"{location} targetNodeIds must not contain duplicates")
            continue
        definition = raw_record.get("definition")
        if definition is not None and (
            not isinstance(definition, str) or not definition.strip()
        ):
            errors.append(
                f"{location} definition must be a non-empty string when present",
            )
            continue
        metadata[key] = dict(raw_record)

    if errors:
        raise BuildValidationError(errors)
    return metadata


def parse_frontmatter(path: Path) -> dict[str, Any]:
    try:
        content = path.read_text(encoding="utf-8-sig")
    except (OSError, UnicodeError) as exc:
        raise ValueError(f"could not read UTF-8 Markdown: {exc}") from exc

    match = FRONTMATTER_PATTERN.match(content)
    if not match:
        raise ValueError("missing YAML frontmatter delimited by ---")

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as exc:
        raise ValueError(f"invalid YAML frontmatter: {exc}") from exc

    if not isinstance(frontmatter, dict):
        raise ValueError("frontmatter must be a YAML mapping")
    return frontmatter


def non_empty_string(
    frontmatter: dict[str, Any],
    field: str,
    *,
    required: bool = False,
    default: str = "",
) -> str:
    value = frontmatter.get(field)
    if value is None and not required:
        return default
    if not isinstance(value, str) or not value.strip():
        requirement = "required" if required else "must be a non-empty string"
        raise ValueError(f"frontmatter field '{field}' is {requirement}")
    return value.strip()


def validate_nodes(nodes_data: Any, nodes_path: Path) -> list[dict[str, Any]]:
    if not isinstance(nodes_data, list):
        raise BuildValidationError([f"{nodes_path}: root value must be an array"])

    errors: list[str] = []
    seen_ids: set[str] = set()
    nodes: list[dict[str, Any]] = []
    for index, value in enumerate(nodes_data):
        location = f"{nodes_path}: node {index}"
        if not isinstance(value, dict):
            errors.append(f"{location}: must be an object")
            continue

        node_id = value.get("id")
        if not isinstance(node_id, str) or not node_id.strip():
            errors.append(f"{location}: requires a non-empty string id")
        elif node_id in seen_ids:
            errors.append(f"{location}: duplicate node id '{node_id}'")
        else:
            seen_ids.add(node_id)

        if node_id != "identity":
            stage = value.get("architectureStage")
            if not isinstance(stage, str) or not stage.strip():
                errors.append(f"{location}: requires a non-empty string architectureStage")
            order = value.get("architectureOrder")
            if not isinstance(order, int):
                errors.append(f"{location}: requires an integer architectureOrder")

        facets = value.get("facets", [])
        if not isinstance(facets, list) or not all(
            isinstance(facet, str) and facet.strip() for facet in facets
        ):
            errors.append(f"{location}: facets must be an array of non-empty strings")

        # Artifacts are generated exclusively from Markdown on every build.
        value.pop("artifacts", None)
        # Semantic records are generated from canonical source fields on every
        # build so stale UI-facing metadata cannot survive a source update.
        value.pop("relationRecords", None)
        value.pop("facetRecords", None)
        value.pop("projectionRecords", None)
        nodes.append(value)

    if errors:
        raise BuildValidationError(errors)
    return nodes


def string_list(value: Any) -> list[str]:
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    if isinstance(value, list):
        return [
            item.strip()
            for item in value
            if isinstance(item, str) and item.strip()
        ]
    return []


def humanize_key(value: str) -> str:
    words = re.sub(r"([a-z0-9])([A-Z])", r"\1 \2", value)
    words = re.sub(r"[_-]+", " ", words).strip()
    return words[:1].upper() + words[1:] if words else "Record"


def shorten_label(value: str, fallback: str) -> str:
    text = re.sub(r"\s+", " ", value).strip()
    if not text:
        return fallback
    first_sentence = re.split(r"(?<=[.!?])\s+", text, maxsplit=1)[0]
    if len(first_sentence) <= 78:
        return first_sentence.rstrip(".")
    return first_sentence[:75].rstrip(" ,;:-") + "…"


def record_label(record: dict[str, Any], fallback: str) -> str:
    for field in (
        "label",
        "title",
        "work",
        "name",
        "statement",
        "period",
        "development",
        "thesis",
    ):
        value = record.get(field)
        if isinstance(value, str) and value.strip():
            return shorten_label(value, fallback)
    return fallback


def record_summary(record: dict[str, Any], fallback: str) -> str:
    for field in (
        "description",
        "summary",
        "body",
        "purpose",
        "relation",
        "development",
        "boundary",
        "thesis",
        "stage",
        "orientation",
    ):
        value = record.get(field)
        if isinstance(value, str) and value.strip():
            return re.sub(r"\s+", " ", value).strip()
    return fallback


def collect_named_records(
    value: Any,
    source_key: str,
    *,
    max_records: int = 12,
) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    label_fields = {
        "label",
        "title",
        "work",
        "name",
        "statement",
        "period",
        "development",
        "thesis",
    }

    def visit(current: Any, path: str, depth: int) -> None:
        if len(records) >= max_records or depth > 5:
            return
        if isinstance(current, str) and current.strip():
            records.append(
                {
                    "label": shorten_label(current, humanize_key(path)),
                    "description": re.sub(r"\s+", " ", current).strip(),
                    "_sourcePath": path,
                }
            )
            return
        if isinstance(current, list):
            for index, item in enumerate(current):
                visit(item, f"{path}[{index}]", depth + 1)
            return
        if not isinstance(current, dict):
            return

        if label_fields.intersection(current):
            copied = dict(current)
            copied["_sourcePath"] = path
            records.append(copied)
            return

        for key, child in current.items():
            visit(child, f"{path}.{key}", depth + 1)

    visit(value, source_key, 0)
    return records


def load_facet_status_evidence(content_dir: Path) -> dict[str, Any]:
    path = content_dir / "facetStatusEvidence.json"
    if not path.exists():
        return {
            "auditDate": "",
            "activeResearch": [],
            "documentedResearch": {},
            "prototypeProducts": {},
            "operationalProducts": {},
        }
    value = read_json(path)
    if not isinstance(value, dict):
        raise BuildValidationError([f"{path}: root value must be an object"])
    return value


def matching_structured_facet_record(
    node: dict[str, Any],
    facet_slug: str,
) -> dict[str, Any] | None:
    for key in ("researchShelves", "facetRecords", "researchFacets", "shelves"):
        for record in collect_named_records(node.get(key), key, max_records=64):
            candidates = [
                str(record.get("id", "")),
                record_label(record, ""),
            ]
            if any(
                candidate and slugify(candidate) == facet_slug
                for candidate in candidates
            ):
                return record
    return None


def build_facet_records(
    node: dict[str, Any],
    status_evidence: dict[str, Any],
    nodes_by_id: dict[str, dict[str, Any]],
    facet_metadata: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    node_id = str(node["id"])
    node_label = str(node.get("label", node_id))
    domain_summary = re.sub(
        r"\s+",
        " ",
        str(
            node.get("short")
            or node.get("coreThesis")
            or node.get("body")
            or f"the declared scope of {node_label}"
        ),
    ).strip()
    documented = status_evidence.get("documentedResearch", {})
    prototype = status_evidence.get("prototypeProducts", {})
    operational = status_evidence.get("operationalProducts", {})
    active = set(string_list(status_evidence.get("activeResearch", [])))
    audit_date = str(status_evidence.get("auditDate", ""))
    records: list[dict[str, Any]] = []

    for index, facet in enumerate(node.get("facets", [])):
        facet_slug = slugify(facet)
        key = f"{node_id}--{facet_slug}"
        documented_sources = string_list(
            documented.get(key, {}) if isinstance(documented, dict) else []
        )
        prototype_sources = string_list(
            prototype.get(key, {}) if isinstance(prototype, dict) else []
        )
        operational_sources = string_list(
            operational.get(key, {}) if isinstance(operational, dict) else []
        )
        if documented_sources:
            stage = "documented"
            status = "Documented corpus"
            evidence = (
                f"{len(documented_sources)} curated source "
                f"{'record is' if len(documented_sources) == 1 else 'records are'} "
                "indexed for this facet."
            )
        elif key in active:
            stage = "active"
            status = "Active adjacent corpus"
            evidence = (
                f"Related material is active within {node_label}; a distinct "
                "facet-specific source cluster has not yet been consolidated."
            )
        else:
            stage = "scoped"
            status = "Scoped taxonomy"
            evidence = (
                f"No facet-specific evidence source is currently linked; "
                f"the facet is declared by {node_label}."
            )

        structured = matching_structured_facet_record(node, facet_slug)
        metadata = facet_metadata.get(key, {})
        target_ids = string_list(metadata.get("targetNodeIds", []))
        target_options = [
            {
                "id": target_id,
                "label": str(nodes_by_id[target_id].get("label", target_id)),
                "recordHref": f"/domain/{target_id}",
            }
            for target_id in target_ids
        ]
        curated_definition = str(metadata.get("definition", "")).strip()
        structured_definition = (
            record_summary(structured, "") if structured is not None else ""
        )
        if curated_definition:
            summary = curated_definition
            definition_status = "curated"
            definition_provenance = (
                f"facetMetadata.json#facets.{key}.definition"
            )
        elif structured_definition:
            summary = structured_definition
            definition_status = "structured-source"
            definition_provenance = (
                f"nodes.json#{node_id}.{structured.get('_sourcePath', 'facet')}"
                if structured is not None
                else f"nodes.json#{node_id}"
            )
        elif len(target_options) == 1:
            target = nodes_by_id[target_ids[0]]
            target_summary = re.sub(
                r"\s+",
                " ",
                str(
                    target.get("short")
                    or target.get("coreThesis")
                    or target.get("body")
                    or ""
                ),
            ).strip()
            summary = (
                f"Within {node_label}, {facet} is the interface to "
                f"{target_options[0]['label']}. {target_summary}"
            )
            definition_status = "target-derived"
            definition_provenance = (
                f"facetMetadata.json#facets.{key}.targetNodeIds"
            )
        elif len(target_options) > 1:
            leading_labels = ", ".join(
                option["label"] for option in target_options[:-1]
            )
            target_labels = (
                f"{leading_labels}, and {target_options[-1]['label']}"
                if leading_labels
                else target_options[-1]["label"]
            )
            summary = (
                f"Within {node_label}, {facet} spans {target_labels}. "
                "The linked domains remain separate so their claims, evidence, "
                "and authority are not collapsed."
            )
            definition_status = "target-derived"
            definition_provenance = (
                f"facetMetadata.json#facets.{key}.targetNodeIds"
            )
        else:
            summary = (
                f"Within {node_label}, {facet} bounds inquiry into "
                f"{facet.lower()}. Its parent scope is: {domain_summary}"
            )
            definition_status = "parent-derived"
            definition_provenance = f"nodes.json#{node_id}.short"

        if operational_sources:
            product_stage = "operational"
        elif prototype_sources:
            product_stage = "prototype"
        else:
            product_stage = "research-led"

        record = {
            **(structured or {}),
            "id": f"facet-{node_id}-{facet_slug}",
            "slug": facet_slug,
            "label": facet,
            "summary": summary,
            "definition": summary,
            "definitionStatus": definition_status,
            "definitionProvenance": definition_provenance,
            "kind": "facet",
            "layer": str(node.get("layer", "support")),
            "relationType": "Facet affinity",
            "belonging": f"Declared facet of {node_label}",
            "authority": (
                f"Scope is inherited from {node_label}; selecting this facet "
                "does not authorize operational, professional, or public-result claims."
            ),
            "claimBoundary": (
                f"Scope is inherited from {node_label}; selecting this facet "
                "does not authorize operational, professional, or public-result claims."
            ),
            "evidence": evidence,
            "evidenceStatus": stage,
            "evidenceRefs": documented_sources,
            "status": status,
            "stage": stage,
            "productStage": product_stage,
            "sources": documented_sources,
            "productSources": operational_sources + prototype_sources,
            "closure": (
                f"Revise the facet declaration at nodes.json#{node_id}.facets "
                "and review its target, evidence, and product links separately."
            ),
            "sourceId": node_id,
            "targetNodeIds": target_ids,
            "targetOptions": target_options,
            "recordHref": (
                f"/domain/{target_ids[0]}"
                if len(target_ids) == 1
                else f"/domain/{node_id}#{facet_slug}"
            ),
            "actionLabel": (
                "Open related domain"
                if len(target_ids) == 1
                else "Open facet and related domains"
                if target_ids
                else "Open facet in record"
            ),
            "provenance": f"nodes.json#{node_id}.facets[{index}]",
            "auditDate": audit_date,
        }
        if len(target_ids) == 1:
            record["targetId"] = target_ids[0]
        records.append(record)
    return records


def validate_facet_metadata(
    nodes: list[dict[str, Any]],
    nodes_by_id: dict[str, dict[str, Any]],
    facet_metadata: dict[str, dict[str, Any]],
    errors: list[str],
) -> None:
    valid_keys = {
        f"{node['id']}--{slugify(facet)}"
        for node in nodes
        for facet in node.get("facets", [])
    }
    for key, metadata in facet_metadata.items():
        if key not in valid_keys:
            errors.append(
                f"facetMetadata.json: orphan facet key '{key}' does not match "
                "the active node taxonomy",
            )
        for target_id in string_list(metadata.get("targetNodeIds", [])):
            if target_id not in nodes_by_id:
                errors.append(
                    f"facetMetadata.json: facet '{key}' targets unknown node "
                    f"'{target_id}'",
                )


def relation_group_key(
    key: str,
    policy: dict[str, Any],
    source_id: str,
    target_id: str,
) -> tuple[str, str, str, str]:
    directionality = str(policy["directionality"])
    if directionality == "symmetric":
        first, second = sorted((source_id, target_id))
        return key, first, second, f"{key}:{first}:{second}"
    if directionality == "inverse-paired":
        inverse_key = str(policy["inverseKey"])
        canonical_key = min(key, inverse_key)
        if key == canonical_key:
            canonical_source, canonical_target = source_id, target_id
        else:
            canonical_source, canonical_target = target_id, source_id
        return (
            canonical_key,
            canonical_source,
            canonical_target,
            f"{canonical_key}:{canonical_source}:{canonical_target}",
        )
    return key, source_id, target_id, f"{key}:{source_id}:{target_id}"


def build_relation_records(
    nodes: list[dict[str, Any]],
    nodes_by_id: dict[str, dict[str, Any]],
    relation_policies: dict[str, dict[str, Any]],
    errors: list[str],
) -> dict[str, list[dict[str, Any]]]:
    records_by_node: dict[str, list[dict[str, Any]]] = {
        str(node["id"]): [] for node in nodes
    }
    groups: dict[str, dict[str, Any]] = {}
    inverse_orientations: dict[tuple[str, str, str], tuple[str, str]] = {}

    for node in nodes:
        source_id = str(node["id"])
        for raw_key, value in node.items():
            if (
                raw_key in relation_policies
                or raw_key in NON_RELATION_NODE_REFERENCE_KEYS
            ):
                continue
            possible_targets = string_list(value)
            expected_count = (
                1
                if isinstance(value, str)
                else len(value)
                if isinstance(value, list)
                else 0
            )
            if (
                possible_targets
                and len(possible_targets) == expected_count
                and all(target in nodes_by_id for target in possible_targets)
            ):
                errors.append(
                    f"nodes.json: node '{source_id}' field '{raw_key}' contains "
                    "node references but has no relationTypes.json policy",
                )

        for key, policy in relation_policies.items():
            value = node.get(key)
            if value is None:
                continue
            targets = string_list(value)
            expected_count = (
                1
                if isinstance(value, str)
                else len(value)
                if isinstance(value, list)
                else 0
            )
            if not targets or len(targets) != expected_count:
                errors.append(
                    f"nodes.json: node '{source_id}' relation '{key}' must be "
                    "a non-empty string or array of non-empty strings",
                )
                continue
            if len(set(targets)) != len(targets):
                errors.append(
                    f"nodes.json: node '{source_id}' relation '{key}' contains "
                    "duplicate targets",
                )
                continue

            for index, target_id in enumerate(targets):
                if target_id not in nodes_by_id:
                    errors.append(
                        f"nodes.json: node '{source_id}' relation '{key}' targets "
                        f"unknown node '{target_id}'",
                    )
                    continue
                if target_id == source_id:
                    errors.append(
                        f"nodes.json: node '{source_id}' relation '{key}' may not "
                        "target itself",
                    )
                    continue

                (
                    canonical_key,
                    canonical_source,
                    canonical_target,
                    group_key,
                ) = relation_group_key(
                    key,
                    policy,
                    source_id,
                    target_id,
                )
                if policy["directionality"] == "inverse-paired":
                    unordered = tuple(sorted((source_id, target_id)))
                    orientation_key = (
                        canonical_key,
                        unordered[0],
                        unordered[1],
                    )
                    orientation = (canonical_source, canonical_target)
                    previous_orientation = inverse_orientations.get(
                        orientation_key,
                    )
                    if (
                        previous_orientation is not None
                        and previous_orientation != orientation
                    ):
                        errors.append(
                            f"nodes.json: inverse-paired relation '{key}' "
                            f"contradicts its paired declaration between "
                            f"'{source_id}' and '{target_id}'",
                        )
                        continue
                    inverse_orientations[orientation_key] = orientation

                group = groups.setdefault(
                    group_key,
                    {
                        "canonicalKey": canonical_key,
                        "canonicalSourceId": canonical_source,
                        "canonicalTargetId": canonical_target,
                        "directionality": policy["directionality"],
                        "declarations": [],
                    },
                )
                group["declarations"].append(
                    {
                        "key": key,
                        "sourceId": source_id,
                        "targetId": target_id,
                        "index": index,
                        "policy": policy,
                        "provenance": (
                            f"nodes.json#{source_id}.{key}[{index}]"
                        ),
                    },
                )

    for group in groups.values():
        declarations = group["declarations"]
        canonical_key = str(group["canonicalKey"])
        canonical_source = str(group["canonicalSourceId"])
        canonical_target = str(group["canonicalTargetId"])
        directionality = str(group["directionality"])
        canonical_relation_id = (
            f"relation-{canonical_key}-{canonical_source}-{canonical_target}"
        )
        provenance_refs = sorted(
            {str(declaration["provenance"]) for declaration in declarations},
        )

        for local_id, other_id in (
            (canonical_source, canonical_target),
            (canonical_target, canonical_source),
        ):
            local = nodes_by_id[local_id]
            other = nodes_by_id[other_id]
            local_label = str(local.get("label", local_id))
            other_label = str(other.get("label", other_id))
            explicit = next(
                (
                    declaration
                    for declaration in declarations
                    if declaration["sourceId"] == local_id
                    and declaration["targetId"] == other_id
                ),
                None,
            )
            if explicit is not None:
                policy = explicit["policy"]
                relation_key = str(explicit["key"])
                relation_type = str(policy["label"])
                summary = str(policy["summary"]).format(
                    source=local_label,
                    target=other_label,
                )
                direction = (
                    "symmetric"
                    if directionality == "symmetric"
                    else "outgoing"
                )
                provenance = str(explicit["provenance"])
                rationale = (
                    f"Declared directly by {local_label} through its "
                    f"'{relation_key}' field."
                )
            else:
                origin = declarations[0]
                policy = origin["policy"]
                relation_key = str(origin["key"])
                relation_type = str(policy["inverseLabel"])
                summary = str(policy["inverseSummary"]).format(
                    source=local_label,
                    target=other_label,
                )
                direction = (
                    "symmetric"
                    if directionality == "symmetric"
                    else "incoming"
                )
                provenance = str(origin["provenance"])
                rationale = (
                    f"Derived as the inverse view of the declaration at "
                    f"{provenance}."
                )

            claim_boundary = str(policy["claimBoundary"])
            records_by_node[local_id].append(
                {
                    "id": f"{canonical_relation_id}--{local_id}",
                    "canonicalRelationId": canonical_relation_id,
                    "label": other_label,
                    "summary": summary,
                    "kind": "domain",
                    "layer": str(other.get("layer", "support")),
                    "relationKey": relation_key,
                    "relationFamily": canonical_key,
                    "relationType": relation_type,
                    "inverseRelationType": str(policy["inverseLabel"]),
                    "directionality": directionality,
                    "direction": direction,
                    "rationale": rationale,
                    "authority": claim_boundary,
                    "claimBoundary": claim_boundary,
                    "evidence": (
                        "No relation-specific evidence source is linked to "
                        "this declaration."
                    ),
                    "evidenceStatus": "not-linked",
                    "evidenceRefs": [],
                    "status": (
                        "Declared symmetric relation"
                        if directionality == "symmetric"
                        else "Declared relation"
                        if explicit is not None
                        else "Derived incoming view"
                    ),
                    "closure": (
                        "Revise the declaring relation field and review its "
                        "incoming, inverse, and projection views."
                    ),
                    "sourceId": local_id,
                    "targetId": other_id,
                    "declaredSourceIds": sorted(
                        {
                            str(declaration["sourceId"])
                            for declaration in declarations
                        },
                    ),
                    "declaredTargetIds": sorted(
                        {
                            str(declaration["targetId"])
                            for declaration in declarations
                        },
                    ),
                    "recordHref": f"/domain/{other_id}",
                    "actionLabel": "Open related domain",
                    "provenance": provenance,
                    "provenanceRefs": provenance_refs,
                    "strength": "declared",
                    "sourceContentVersion": str(
                        nodes_by_id[
                            str(declarations[0]["sourceId"])
                        ].get("contentVersion", "")
                    ),
                },
            )

    identity = nodes_by_id.get("identity")
    has_institutional_catalog = any(
        record.get("relationKey") == "institutionalDomain"
        for record in records_by_node.get("identity", [])
    )
    if identity is not None and not has_institutional_catalog:
        source_label = str(identity.get("label", "Boundary First Labs"))
        for index, (target_id, target) in enumerate(nodes_by_id.items()):
            if target_id == "identity":
                continue
            target_label = str(target.get("label", target_id))
            canonical_relation_id = (
                f"relation-institutionalDomain-identity-{target_id}"
            )
            records_by_node["identity"].append(
                {
                    "id": f"{canonical_relation_id}--identity",
                    "canonicalRelationId": canonical_relation_id,
                    "label": target_label,
                    "summary": (
                        f"{target_label} is catalogued within the "
                        f"{source_label} public domain atlas."
                    ),
                    "kind": "domain",
                    "layer": str(target.get("layer", "support")),
                    "relationKey": "institutionalDomain",
                    "relationFamily": "institutionalDomain",
                    "relationType": "Institutional domain",
                    "inverseRelationType": "Domain of",
                    "directionality": "directed",
                    "direction": "outgoing",
                    "rationale": (
                        "Derived from the active public node inventory so the "
                        "institutional atlas has an explicit catalog edge."
                    ),
                    "authority": (
                        "Institutional inclusion establishes stewardship and "
                        "context, not validation or endorsement."
                    ),
                    "claimBoundary": (
                        "Institutional inclusion establishes stewardship and "
                        "context, not validation or endorsement."
                    ),
                    "evidence": (
                        "Catalog membership is recorded; no relation-specific "
                        "evidence source is linked."
                    ),
                    "evidenceStatus": "not-linked",
                    "evidenceRefs": [],
                    "status": "Catalogued domain",
                    "closure": (
                        "Revise the node inventory and review affected atlas "
                        "and navigation views."
                    ),
                    "sourceId": "identity",
                    "targetId": target_id,
                    "declaredSourceIds": ["identity"],
                    "declaredTargetIds": [target_id],
                    "recordHref": f"/domain/{target_id}",
                    "actionLabel": "Open institutional domain",
                    "provenance": f"derived:nodes.json#nodes[{index}]",
                    "provenanceRefs": [
                        f"derived:nodes.json#nodes[{index}]",
                    ],
                    "strength": "catalogued",
                    "sourceContentVersion": str(
                        identity.get("contentVersion", ""),
                    ),
                },
            )

    direction_order = {"outgoing": 0, "symmetric": 1, "incoming": 2}
    for records in records_by_node.values():
        records.sort(
            key=lambda record: (
                direction_order.get(str(record.get("direction")), 3),
                str(record.get("relationType", "")).casefold(),
                str(record.get("label", "")).casefold(),
            ),
        )
    return records_by_node


def projection_record(
    node: dict[str, Any],
    raw: dict[str, Any],
    projection: str,
    index: int,
) -> dict[str, Any]:
    node_id = str(node["id"])
    node_label = str(node.get("label", node_id))
    source_path = str(raw.get("_sourcePath", projection))
    label = record_label(raw, f"{humanize_key(projection)} record {index + 1}")
    summary = record_summary(
        raw,
        f"{label} is recorded within the {node_label} {projection} projection.",
    )
    status = str(
        raw.get("status")
        or raw.get("maturity")
        or raw.get("stage")
        or "Scoped record"
    )
    kind_by_projection = {
        "work": "project",
        "evidence": "evidence",
        "lineage": "lineage",
        "governance": "policy",
        "collaboration": "collaborator",
    }
    authority_by_projection = {
        "work": (
            f"This work record is bounded to {node_label}; inclusion does not "
            "imply completion, publication, or product readiness."
        ),
        "evidence": (
            "Evidence carries only the authority supported by its declared "
            "maturity, source, method, and review state."
        ),
        "lineage": (
            "Lineage supplies context and comparison; it does not imply "
            "endorsement, equivalence, succession, or validation."
        ),
        "governance": (
            f"Governance authority is limited to the declared {node_label} "
            "scope and must remain distinguishable from classification."
        ),
        "collaboration": (
            f"Participation in {node_label} does not itself confer authorship, "
            "ownership, endorsement, institutional office, or claim authority."
        ),
    }
    closure_by_projection = {
        "work": "The work remains subject to review, hold, transfer, replacement, or retirement.",
        "evidence": "Correction, counterevidence, supersession, and withdrawal remain part of the evidence record.",
        "lineage": "Citation, interpretation, and claimed relation remain revisable with preserved provenance.",
        "governance": "The record must identify correction, escalation, transfer, withdrawal, or retirement.",
        "collaboration": "The relationship must preserve provenance while resolving duties, rights, support, and exit.",
    }
    evidence = str(
        raw.get("evidence")
        or raw.get("claimCeiling")
        or f"Canonical source path: {source_path}."
    )
    return {
        "id": f"{projection}-{node_id}-{slugify(label)}-{index}",
        "label": label,
        "summary": summary,
        "kind": kind_by_projection[projection],
        "layer": str(node.get("layer", "support")),
        "relationType": humanize_key(projection),
        "authority": str(
            raw.get("authority")
            or raw.get("boundary")
            or authority_by_projection[projection]
        ),
        "evidence": evidence,
        "status": status,
        "closure": str(
            raw.get("closure")
            or raw.get("closureConditions")
            or closure_by_projection[projection]
        ),
        "sourceId": node_id,
        "recordHref": f"/domain/{node_id}",
        "actionLabel": "Open source record",
        "provenance": f"nodes.json#{node_id}.{source_path}",
    }


def build_work_or_lineage_records(
    node: dict[str, Any],
    projection: str,
) -> list[dict[str, Any]]:
    raw_records: list[dict[str, Any]] = []
    seen_labels: set[str] = set()
    for key in PROJECTION_SOURCE_KEYS[projection]:
        if key not in node:
            continue
        for record in collect_named_records(node.get(key), key, max_records=24):
            label_key = slugify(record_label(record, humanize_key(key)))
            if label_key in seen_labels:
                continue
            seen_labels.add(label_key)
            raw_records.append(record)
            if len(raw_records) >= 12:
                break
        if len(raw_records) >= 12:
            break

    if not raw_records:
        raw_records = [
            {
                "label": f"{node.get('label', node['id'])} {projection} boundary",
                "description": str(
                    node.get("short")
                    or node.get("coreThesis")
                    or node.get("body")
                    or "The canonical record defines this projection's scope."
                ),
                "status": "Scoped record",
                "_sourcePath": "coreThesis",
            }
        ]
    return [
        projection_record(node, record, projection, index)
        for index, record in enumerate(raw_records)
    ]


def build_evidence_records(node: dict[str, Any]) -> list[dict[str, Any]]:
    raw_records: list[dict[str, Any]] = []
    for index, claim in enumerate(string_list(node.get("claims", []))):
        raw_records.append(
            {
                "id": f"claim-{index + 1}",
                "label": f"Claim {index + 1:02d}",
                "description": claim,
                "status": "Claim statement",
                "evidence": (
                    "This is a canonical claim statement. Its authority remains "
                    "bounded by the source record's evidence and maturity."
                ),
                "_sourcePath": f"claims[{index}]",
            }
        )
    for index, document in enumerate(node.get("documents", [])):
        if not isinstance(document, dict):
            continue
        copied = dict(document)
        copied["_sourcePath"] = f"documents[{index}]"
        copied.setdefault(
            "description",
            "A source document reference associated with this domain.",
        )
        raw_records.append(copied)
    return [
        projection_record(node, record, "evidence", index)
        for index, record in enumerate(raw_records[:12])
    ]


def build_governance_records(node: dict[str, Any]) -> list[dict[str, Any]]:
    node_id = str(node["id"])
    node_label = str(node.get("label", node_id))
    claim_count = len(string_list(node.get("claims", [])))
    document_count = len(node.get("documents", [])) if isinstance(
        node.get("documents"), list
    ) else 0
    raw_records: list[dict[str, Any]] = [
        {
            "label": f"{node_label} claim boundary",
            "description": str(
                node.get("coreThesis")
                or node.get("short")
                or f"The canonical record bounds claims made under {node_label}."
            ),
            "authority": (
                f"{node_label} may organize inquiry within its declared role; "
                "it cannot promote claims beyond appropriate evidence or professional authority."
            ),
            "status": str(node.get("role", "Declared domain")),
            "_sourcePath": "coreThesis",
        },
        {
            "label": f"{node_label} evidence gate",
            "description": (
                f"The domain currently exposes {claim_count} claim "
                f"{'statement' if claim_count == 1 else 'statements'} and "
                f"{document_count} document "
                f"{'reference' if document_count == 1 else 'references'}; "
                "promotion remains proportionate to the relevant proof, review, and use standard."
            ),
            "evidence": "Claims and document references are counted from the canonical node record.",
            "status": "Review required",
            "_sourcePath": "claims+documents",
        },
        {
            "label": f"{node_label} correction and closure",
            "description": (
                f"Correction, replacement, withdrawal, transfer, or retirement "
                f"must remain attached to the versioned {node_label} record."
            ),
            "closure": (
                "Preserve provenance, material disagreement, affected dependencies, "
                "and the final stewardship decision."
            ),
            "status": str(node.get("contentVersion", "Unversioned")),
            "_sourcePath": "contentVersion",
        },
    ]

    for key, value in node.items():
        if not GOVERNANCE_KEY_PATTERN.search(key):
            continue
        raw_records.extend(
            collect_named_records(value, key, max_records=12 - len(raw_records))
        )
        if len(raw_records) >= 12:
            break

    return [
        projection_record(node, record, "governance", index)
        for index, record in enumerate(raw_records[:12])
    ]


def build_collaboration_records(
    node: dict[str, Any],
    identity: dict[str, Any] | None,
) -> list[dict[str, Any]]:
    collaboration = (
        identity.get("collaboration", {})
        if isinstance(identity, dict)
        and isinstance(identity.get("collaboration"), dict)
        else {}
    )
    modes = collaboration.get("collaborationModes", [])
    modes_by_id = {
        str(mode.get("id")): mode
        for mode in modes
        if isinstance(mode, dict) and mode.get("id")
    }
    layer = str(node.get("layer", "support"))
    selected_ids = COLLABORATION_MODES_BY_LAYER.get(
        layer,
        COLLABORATION_MODES_BY_LAYER["support"],
    )
    raw_records: list[dict[str, Any]] = []
    for mode_id in selected_ids:
        mode = modes_by_id.get(mode_id)
        if mode is None:
            continue
        copied = dict(mode)
        purpose = str(
            mode.get("purpose")
            or "A bounded collaboration pathway."
        )
        outputs = string_list(mode.get("typicalOutputs", []))
        copied["description"] = (
            f"{purpose} In this projection the work is bounded to "
            f"{node.get('label', node['id'])}."
        )
        copied["evidence"] = (
            "Expected records include "
            + ", ".join(outputs[:3])
            + ("." if outputs else "declared outputs and review evidence.")
        )
        copied["status"] = "Available pathway · inquiry"
        copied["_sourcePath"] = f"identity.collaboration.collaborationModes.{mode_id}"
        raw_records.append(copied)

    if not raw_records:
        raw_records.append(
            {
                "label": f"Collaborate on {node.get('label', node['id'])}",
                "description": (
                    "Begin with a bounded inquiry that declares purpose, scope, "
                    "roles, authority, evidence, rights, stewardship, and closure."
                ),
                "status": "Inquiry",
                "_sourcePath": "identity.collaboration",
            }
        )

    records = [
        projection_record(node, record, "collaboration", index)
        for index, record in enumerate(raw_records)
    ]
    for record, raw in zip(records, raw_records):
        mode_id = str(raw.get("id", ""))
        if mode_id:
            record["recordHref"] = f"/collaborate#{mode_id}"
            record["actionLabel"] = "Open collaboration mode"
    return records


def build_projection_records(
    node: dict[str, Any],
    identity: dict[str, Any] | None,
) -> dict[str, list[dict[str, Any]]]:
    return {
        "work": build_work_or_lineage_records(node, "work"),
        "evidence": build_evidence_records(node),
        "lineage": build_work_or_lineage_records(node, "lineage"),
        "governance": build_governance_records(node),
        "collaboration": build_collaboration_records(node, identity),
    }


def resolve_parent(
    frontmatter: dict[str, Any],
    nodes_by_id: dict[str, dict[str, Any]],
    nodes_by_facet: dict[str, list[dict[str, Any]]],
) -> tuple[dict[str, Any], str]:
    parent = non_empty_string(frontmatter, "parent", required=True)
    explicit_node_id = non_empty_string(frontmatter, "parent_node")

    if explicit_node_id:
        node = nodes_by_id.get(explicit_node_id)
        if node is None:
            raise ValueError(
                f"parent_node '{explicit_node_id}' is not a node id",
            )
        if parent != explicit_node_id and parent not in node.get("facets", []):
            raise ValueError(
                f"parent '{parent}' is neither node '{explicit_node_id}' "
                "nor one of its facets",
            )
        return node, parent

    direct_node = nodes_by_id.get(parent)
    if direct_node is not None:
        return direct_node, parent

    candidates = nodes_by_facet.get(parent, [])
    if not candidates:
        raise ValueError(
            f"parent '{parent}' is not a node id or known facet",
        )
    if len(candidates) > 1:
        candidate_ids = ", ".join(str(node["id"]) for node in candidates)
        raise ValueError(
            f"parent facet '{parent}' is ambiguous across nodes "
            f"[{candidate_ids}]; add parent_node to select one",
        )
    return candidates[0], parent


def artifact_style(maturity: str) -> tuple[str, str]:
    normalized = maturity.lower()
    if "formal" in normalized:
        return "#db2777", "⟡"
    if "published" in normalized:
        return "#059669", "◈"
    return "#64748b", "◆"


def artifact_paths(artifacts_dir: Path) -> list[Path]:
    if not artifacts_dir.exists():
        return []
    if not artifacts_dir.is_dir():
        raise BuildValidationError([f"{artifacts_dir}: expected a directory"])
    return sorted(
        (path for path in artifacts_dir.rglob("*.md") if path.is_file()),
        key=lambda path: path.relative_to(artifacts_dir).as_posix().casefold(),
    )


def build_outputs(project_root: Path) -> tuple[str, str, int, int]:
    project_root = project_root.resolve()
    content_dir = project_root / "src" / "content"
    nodes_path = content_dir / "nodes.json"
    artifacts_dir = content_dir / "artifacts"

    nodes = validate_nodes(read_json(nodes_path), nodes_path)
    nodes_by_id = {str(node["id"]): node for node in nodes}
    relation_policies = load_relation_policies(content_dir)
    facet_metadata = load_facet_metadata(content_dir)
    status_evidence = load_facet_status_evidence(content_dir)
    nodes_by_facet: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for node in nodes:
        for facet in node.get("facets", []):
            nodes_by_facet[facet].append(node)

    artifacts_index: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    artifact_records: list[tuple[dict[str, Any], dict[str, Any]]] = []

    for source_path in artifact_paths(artifacts_dir):
        relative_path = source_path.relative_to(artifacts_dir)
        location = relative_path.as_posix()
        try:
            frontmatter = parse_frontmatter(source_path)
            for field in REQUIRED_ARTIFACT_FIELDS:
                non_empty_string(frontmatter, field, required=True)

            title = non_empty_string(frontmatter, "title", required=True)
            maturity = non_empty_string(
                frontmatter,
                "claim_maturity",
                required=True,
            )
            requested_slug = non_empty_string(frontmatter, "slug")
            slug = slugify(requested_slug or source_path.stem)
            expected_path = Path(f"{slug}.md")
            if relative_path != expected_path:
                raise ValueError(
                    f"file must be '{expected_path.as_posix()}' because the "
                    "artifact route loads canonical, root-level slug filenames",
                )
            if slug in artifacts_index:
                raise ValueError(f"duplicate artifact slug '{slug}'")

            parent_node, parent = resolve_parent(
                frontmatter,
                nodes_by_id,
                nodes_by_facet,
            )
            default_color, default_icon = artifact_style(maturity)
            map_icon = non_empty_string(
                frontmatter,
                "mapIcon",
                default=default_icon,
            )
            color = non_empty_string(
                frontmatter,
                "color",
                default=default_color,
            )
            misuse_potential = non_empty_string(
                frontmatter,
                "misuse_potential",
                default="low",
            )
            public_legibility = non_empty_string(
                frontmatter,
                "public_legibility",
                default="technical",
            )
            public_summary = frontmatter.get("public_summary", "")
            if not isinstance(public_summary, str):
                raise ValueError(
                    "frontmatter field 'public_summary' must be a string",
                )

            artifact_meta = {
                "original_title": title,
                "slug": slug,
                "filename": expected_path.as_posix(),
                "claim_maturity": maturity,
                "misuse_potential": misuse_potential,
                "public_legibility": public_legibility,
                "public_summary": public_summary.strip(),
                "parent": parent,
                "parent_node": str(parent_node["id"]),
                "mapIcon": map_icon,
                "color": color,
            }
            artifact_ref = {
                "id": slug,
                "title": title,
                "maturity": maturity,
                "parent": parent,
                "mapIcon": map_icon,
                "color": color,
            }
            artifacts_index[slug] = artifact_meta
            artifact_records.append((parent_node, artifact_ref))
        except ValueError as exc:
            errors.append(f"{location}: {exc}")

    if errors:
        raise BuildValidationError(errors)

    for parent_node, artifact_ref in artifact_records:
        parent_node.setdefault("artifacts", []).append(artifact_ref)

    semantic_errors: list[str] = []
    identity = nodes_by_id.get("identity")
    validate_facet_metadata(
        nodes,
        nodes_by_id,
        facet_metadata,
        semantic_errors,
    )
    relation_records_by_node = build_relation_records(
        nodes,
        nodes_by_id,
        relation_policies,
        semantic_errors,
    )
    for node in nodes:
        node_id = str(node["id"])
        node["relationRecords"] = relation_records_by_node[node_id]
        node["facetRecords"] = build_facet_records(
            node,
            status_evidence,
            nodes_by_id,
            facet_metadata,
        )
        node["projectionRecords"] = build_projection_records(node, identity)

    if semantic_errors:
        raise BuildValidationError(semantic_errors)

    graph_json = json.dumps(nodes, ensure_ascii=False, indent=2) + "\n"
    index_json = json.dumps(artifacts_index, ensure_ascii=False, indent=2) + "\n"
    return graph_json, index_json, len(nodes), len(artifacts_index)


def write_if_changed(path: Path, content: str) -> bool:
    try:
        if path.read_text(encoding="utf-8") == content:
            return False
    except FileNotFoundError:
        pass

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        mode="w",
        encoding="utf-8",
        newline="\n",
        dir=path.parent,
        delete=False,
    ) as temporary_file:
        temporary_file.write(content)
        temporary_path = Path(temporary_file.name)
    temporary_path.replace(path)
    return True


def output_status(path: Path, expected: str) -> str:
    try:
        return "current" if path.read_text(encoding="utf-8") == expected else "stale"
    except FileNotFoundError:
        return "missing"


def main() -> int:
    args = parse_args()
    project_root = args.project_root.resolve()
    graph_path = project_root / "src" / "app" / "context" / "graphNodes.json"
    index_path = project_root / "src" / "app" / "context" / "artifactsIndex.json"

    try:
        graph_json, index_json, node_count, artifact_count = build_outputs(
            project_root,
        )
    except BuildValidationError as exc:
        print("Graph content validation failed:", file=sys.stderr)
        for error in exc.errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    graph_status = output_status(graph_path, graph_json)
    index_status = output_status(index_path, index_json)
    print(
        f"Validated {node_count} nodes and {artifact_count} artifacts. "
        f"graphNodes.json: {graph_status}; artifactsIndex.json: {index_status}."
    )

    if args.check:
        if graph_status != "current" or index_status != "current":
            print(
                "Generated graph content is stale. "
                "Run this script without --check to update it.",
                file=sys.stderr,
            )
            return 1
        return 0

    if args.dry_run:
        return 0

    graph_changed = write_if_changed(graph_path, graph_json)
    index_changed = write_if_changed(index_path, index_json)
    changed = [
        name
        for name, was_changed in (
            ("graphNodes.json", graph_changed),
            ("artifactsIndex.json", index_changed),
        )
        if was_changed
    ]
    if changed:
        print(f"Updated {', '.join(changed)}.")
    else:
        print("Generated graph content was already current.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
