import json
import tempfile
import unittest
from pathlib import Path

from scripts.build_graph_context import BuildValidationError, build_outputs


class BuildGraphContextTests(unittest.TestCase):
    def make_project(self, nodes: list[dict]) -> tuple[Path, tempfile.TemporaryDirectory]:
        temporary_directory = tempfile.TemporaryDirectory()
        project_root = Path(temporary_directory.name)
        content_dir = project_root / "src" / "content"
        content_dir.mkdir(parents=True)
        (content_dir / "artifacts").mkdir()
        source_content_dir = Path(__file__).resolve().parents[1] / "src" / "content"
        (content_dir / "relationTypes.json").write_text(
            (source_content_dir / "relationTypes.json").read_text(
                encoding="utf-8",
            ),
            encoding="utf-8",
        )
        (content_dir / "facetMetadata.json").write_text(
            json.dumps(
                {
                    "schemaVersion": "1.0",
                    "defaultTargetPolicy": "none",
                    "facets": {},
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        fixture_nodes = []
        for index, node in enumerate(nodes):
            fixture_node = dict(node)
            if fixture_node.get("id") != "identity":
                fixture_node.setdefault("architectureStage", "test-stage")
                fixture_node.setdefault("architectureOrder", (index + 1) * 10)
            fixture_nodes.append(fixture_node)
        (content_dir / "nodes.json").write_text(
            json.dumps(fixture_nodes, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        return project_root, temporary_directory

    def test_empty_artifact_directory_preserves_nodes(self) -> None:
        nodes = [{"id": "domain", "label": "Domain", "facets": ["Facet"]}]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, index_json, node_count, artifact_count = build_outputs(
            project_root,
        )

        graph = json.loads(graph_json)
        self.assertEqual(graph[0]["id"], "domain")
        self.assertEqual(graph[0]["facetRecords"][0]["label"], "Facet")
        self.assertEqual(graph[0]["facetRecords"][0]["status"], "Scoped taxonomy")
        self.assertEqual(graph[0]["relationRecords"], [])
        self.assertIn("governance", graph[0]["projectionRecords"])
        self.assertEqual(json.loads(index_json), {})
        self.assertEqual(node_count, 1)
        self.assertEqual(artifact_count, 0)

    def test_semantic_records_are_generated_with_stable_provenance(self) -> None:
        nodes = [
            {
                "id": "source",
                "label": "Source",
                "short": "A source domain.",
                "facets": ["First Facet"],
                "claims": ["A bounded claim."],
                "dependsOn": ["target"],
                "contentVersion": "1.0",
            },
            {
                "id": "target",
                "label": "Target",
                "short": "A target domain.",
                "facets": [],
            },
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, _, _, _ = build_outputs(project_root)
        graph = json.loads(graph_json)
        source = graph[0]

        self.assertEqual(
            source["relationRecords"][0]["id"],
            "relation-dependsOn-source-target--source",
        )
        self.assertEqual(source["relationRecords"][0]["targetId"], "target")
        self.assertEqual(
            source["relationRecords"][0]["provenance"],
            "nodes.json#source.dependsOn[0]",
        )
        self.assertEqual(
            graph[1]["relationRecords"][0]["direction"],
            "incoming",
        )
        self.assertEqual(
            graph[1]["relationRecords"][0]["canonicalRelationId"],
            source["relationRecords"][0]["canonicalRelationId"],
        )
        self.assertEqual(
            source["relationRecords"][0]["evidenceStatus"],
            "not-linked",
        )
        self.assertEqual(
            source["facetRecords"][0]["provenance"],
            "nodes.json#source.facets[0]",
        )
        self.assertEqual(
            source["projectionRecords"]["evidence"][0]["label"],
            "Claim 01",
        )

    def test_explicit_facet_target_links_to_its_record(self) -> None:
        nodes = [
            {
                "id": "identity",
                "label": "Boundary First Labs",
                "facets": ["Mathematics & Formal Structures"],
            },
            {
                "id": "mathematics",
                "label": "Mathematics & Formal Structures",
                "facets": [],
            },
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        metadata_path = project_root / "src" / "content" / "facetMetadata.json"
        metadata_path.write_text(
            json.dumps(
                {
                    "schemaVersion": "1.0",
                    "defaultTargetPolicy": "none",
                    "facets": {
                        "identity--mathematics-formal-structures": {
                            "targetNodeIds": ["mathematics"],
                        },
                    },
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

        graph_json, _, _, _ = build_outputs(project_root)
        graph = json.loads(graph_json)
        facet = graph[0]["facetRecords"][0]

        self.assertEqual(facet["targetId"], "mathematics")
        self.assertEqual(facet["targetNodeIds"], ["mathematics"])
        self.assertEqual(facet["recordHref"], "/domain/mathematics")
        self.assertEqual(facet["actionLabel"], "Open related domain")

    def test_facet_target_does_not_depend_on_display_label_equality(self) -> None:
        nodes = [
            {
                "id": "identity",
                "label": "Boundary First Labs",
                "facets": ["Mathematics & Formal Structures"],
            },
            {
                "id": "mathematics",
                "label": "Mathematics & Formal Structures",
                "facets": [],
            },
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, _, _, _ = build_outputs(project_root)
        facet = json.loads(graph_json)[0]["facetRecords"][0]

        self.assertEqual(facet["targetNodeIds"], [])
        self.assertNotIn("targetId", facet)
        self.assertEqual(
            facet["recordHref"],
            "/domain/identity#mathematics-formal-structures",
        )

    def test_multi_target_facet_exposes_a_target_chooser(self) -> None:
        nodes = [
            {
                "id": "parent",
                "label": "Parent",
                "short": "A bounded parent.",
                "facets": ["Combined"],
            },
            {"id": "first", "label": "First", "facets": []},
            {"id": "second", "label": "Second", "facets": []},
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        metadata_path = project_root / "src" / "content" / "facetMetadata.json"
        metadata_path.write_text(
            json.dumps(
                {
                    "facets": {
                        "parent--combined": {
                            "targetNodeIds": ["first", "second"],
                        },
                    },
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

        graph_json, _, _, _ = build_outputs(project_root)
        facet = json.loads(graph_json)[0]["facetRecords"][0]

        self.assertEqual(facet["targetNodeIds"], ["first", "second"])
        self.assertEqual(len(facet["targetOptions"]), 2)
        self.assertNotIn("targetId", facet)
        self.assertEqual(facet["recordHref"], "/domain/parent#combined")

    def test_symmetric_and_inverse_paired_declarations_are_deduplicated(self) -> None:
        nodes = [
            {
                "id": "first",
                "label": "First",
                "facets": [],
                "relatedTo": ["second"],
                "formalApparatus": ["second"],
            },
            {
                "id": "second",
                "label": "Second",
                "facets": [],
                "relatedTo": ["first"],
                "formalApparatusFor": ["first"],
            },
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, _, _, _ = build_outputs(project_root)
        graph = json.loads(graph_json)

        for node in graph:
            self.assertEqual(len(node["relationRecords"]), 2)
            self.assertEqual(
                len(
                    {
                        relation["canonicalRelationId"]
                        for relation in node["relationRecords"]
                    },
                ),
                2,
            )
        symmetric = next(
            relation
            for relation in graph[0]["relationRecords"]
            if relation["directionality"] == "symmetric"
        )
        self.assertEqual(symmetric["direction"], "symmetric")
        self.assertEqual(len(symmetric["provenanceRefs"]), 2)
        inverse_pair = next(
            relation
            for relation in graph[0]["relationRecords"]
            if relation["directionality"] == "inverse-paired"
        )
        self.assertEqual(len(inverse_pair["provenanceRefs"]), 2)

    def test_missing_symmetric_reverse_is_visible_from_both_nodes(self) -> None:
        nodes = [
            {
                "id": "first",
                "label": "First",
                "facets": [],
                "relatedTo": ["second"],
            },
            {"id": "second", "label": "Second", "facets": []},
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, _, _, _ = build_outputs(project_root)
        graph = json.loads(graph_json)

        self.assertEqual(graph[0]["relationRecords"][0]["direction"], "symmetric")
        self.assertEqual(graph[1]["relationRecords"][0]["direction"], "symmetric")
        self.assertEqual(
            graph[0]["relationRecords"][0]["canonicalRelationId"],
            graph[1]["relationRecords"][0]["canonicalRelationId"],
        )

    def test_identity_catalog_survives_an_incoming_declared_relation(self) -> None:
        nodes = [
            {
                "id": "identity",
                "label": "Identity",
                "facets": [],
            },
            {
                "id": "service",
                "label": "Service",
                "facets": [],
                "governedBy": ["identity"],
            },
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        graph_json, _, _, _ = build_outputs(project_root)
        identity = json.loads(graph_json)[0]

        self.assertEqual(
            {
                record["relationKey"]
                for record in identity["relationRecords"]
            },
            {"governedBy", "institutionalDomain"},
        )

    def test_unregistered_node_reference_field_fails_validation(self) -> None:
        nodes = [
            {
                "id": "first",
                "label": "First",
                "facets": [],
                "mysteryLink": ["second"],
            },
            {"id": "second", "label": "Second", "facets": []},
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        with self.assertRaisesRegex(
            BuildValidationError,
            "has no relationTypes.json policy",
        ):
            build_outputs(project_root)

    def test_unknown_relation_target_fails_validation(self) -> None:
        nodes = [
            {
                "id": "source",
                "label": "Source",
                "facets": [],
                "dependsOn": ["missing"],
            }
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)

        with self.assertRaisesRegex(BuildValidationError, "unknown node 'missing'"):
            build_outputs(project_root)

    def test_orphan_facet_metadata_fails_validation(self) -> None:
        nodes = [{"id": "domain", "label": "Domain", "facets": ["Facet"]}]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        metadata_path = project_root / "src" / "content" / "facetMetadata.json"
        metadata_path.write_text(
            json.dumps(
                {
                    "facets": {
                        "domain--removed-facet": {
                            "targetNodeIds": [],
                        },
                    },
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

        with self.assertRaisesRegex(BuildValidationError, "orphan facet key"):
            build_outputs(project_root)

    def test_ambiguous_facet_requires_parent_node_without_mutating_source(self) -> None:
        nodes = [
            {"id": "first", "facets": ["Shared"]},
            {"id": "second", "facets": ["Shared"]},
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        artifact_path = (
            project_root / "src" / "content" / "artifacts" / "shared-note.md"
        )
        source = (
            b"---\r\n"
            b"title: Shared note\r\n"
            b"parent: Shared\r\n"
            b"claim_maturity: draft\r\n"
            b"---\r\n"
            b"# Shared note\r\n"
        )
        artifact_path.write_bytes(source)

        with self.assertRaisesRegex(BuildValidationError, "ambiguous"):
            build_outputs(project_root)

        self.assertEqual(artifact_path.read_bytes(), source)

    def test_parent_node_disambiguates_crlf_frontmatter(self) -> None:
        nodes = [
            {"id": "first", "facets": ["Shared"]},
            {"id": "second", "facets": ["Shared"]},
        ]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        artifact_path = (
            project_root / "src" / "content" / "artifacts" / "shared-note.md"
        )
        artifact_path.write_bytes(
            b"---\r\n"
            b"title: Shared note\r\n"
            b"parent: Shared\r\n"
            b"parent_node: second\r\n"
            b"claim_maturity: published\r\n"
            b"---\r\n"
            b"# Shared note\r\n",
        )

        graph_json, index_json, _, artifact_count = build_outputs(project_root)
        graph = json.loads(graph_json)
        index = json.loads(index_json)

        self.assertNotIn("artifacts", graph[0])
        self.assertEqual(graph[1]["artifacts"][0]["id"], "shared-note")
        self.assertEqual(index["shared-note"]["parent_node"], "second")
        self.assertEqual(index["shared-note"]["mapIcon"], "◈")
        self.assertEqual(artifact_count, 1)

    def test_missing_metadata_reports_error_without_mutating_source(self) -> None:
        nodes = [{"id": "domain", "facets": ["Facet"]}]
        project_root, temporary_directory = self.make_project(nodes)
        self.addCleanup(temporary_directory.cleanup)
        artifact_path = (
            project_root / "src" / "content" / "artifacts" / "draft.md"
        )
        source = b"---\ntitle: Draft\n---\nBody\n"
        artifact_path.write_bytes(source)

        with self.assertRaisesRegex(BuildValidationError, "parent"):
            build_outputs(project_root)

        self.assertEqual(artifact_path.read_bytes(), source)

    def test_production_graph_has_complete_semantic_coverage(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        graph_json, _, node_count, _ = build_outputs(project_root)
        graph = json.loads(graph_json)
        node_ids = {node["id"] for node in graph}
        relation_policies = json.loads(
            (
                project_root / "src" / "content" / "relationTypes.json"
            ).read_text(encoding="utf-8"),
        )["relations"]

        self.assertEqual(node_count, 29)
        declared_relation_fields: set[str] = set()
        for node in graph:
            self.assertEqual(len(node["facetRecords"]), len(node["facets"]))
            for facet in node["facetRecords"]:
                for field in (
                    "id",
                    "label",
                    "summary",
                    "authority",
                    "evidence",
                    "status",
                    "closure",
                    "provenance",
                ):
                    self.assertTrue(facet[field], f"{node['id']} facet {field}")
                self.assertTrue(facet["definition"])
                self.assertIn(
                    facet["definitionStatus"],
                    {
                        "curated",
                        "structured-source",
                        "target-derived",
                        "parent-derived",
                    },
                )
                self.assertNotIn(
                    "versioned",
                    f"{facet['summary']} {facet['evidence']} {facet['closure']}".lower(),
                )
                for target_id in facet["targetNodeIds"]:
                    self.assertIn(target_id, node_ids)

            for relation in node["relationRecords"]:
                self.assertIn(relation["targetId"], node_ids)
                for field in (
                    "summary",
                    "authority",
                    "evidence",
                    "status",
                    "closure",
                    "provenance",
                ):
                    self.assertTrue(
                        relation[field],
                        f"{node['id']} relation {field}",
                    )
                self.assertIn(
                    relation["directionality"],
                    {"directed", "symmetric", "inverse-paired"},
                )
                self.assertIn(
                    relation["direction"],
                    {"outgoing", "symmetric", "incoming"},
                )
                self.assertTrue(relation["canonicalRelationId"])
                self.assertTrue(relation["rationale"])
                self.assertEqual(relation["evidenceStatus"], "not-linked")

            for relation_key in relation_policies:
                if relation_key not in node:
                    continue
                declared_relation_fields.add(relation_key)
                targets = node[relation_key]
                if isinstance(targets, str):
                    targets = [targets]
                for index, target_id in enumerate(targets):
                    provenance = (
                        f"nodes.json#{node['id']}.{relation_key}[{index}]"
                    )
                    source_views = [
                        relation
                        for relation in node["relationRecords"]
                        if provenance in relation["provenanceRefs"]
                    ]
                    target = next(
                        candidate
                        for candidate in graph
                        if candidate["id"] == target_id
                    )
                    target_views = [
                        relation
                        for relation in target["relationRecords"]
                        if provenance in relation["provenanceRefs"]
                    ]
                    self.assertTrue(source_views, provenance)
                    self.assertTrue(target_views, provenance)

            for projection in (
                "work",
                "evidence",
                "lineage",
                "governance",
                "collaboration",
            ):
                records = node["projectionRecords"][projection]
                self.assertTrue(records, f"{node['id']} {projection}")
                for record in records:
                    self.assertTrue(record["summary"])
                    self.assertTrue(record["authority"])
                    self.assertTrue(record["evidence"])
                    self.assertTrue(record["closure"])

        self.assertEqual(
            declared_relation_fields,
            {
                relation_key
                for relation_key in relation_policies
                if any(relation_key in node for node in graph)
            },
        )
        for previously_ignored in (
            "composedOf",
            "discipline",
            "distinctFrom",
            "formalApparatus",
            "governedBy",
            "operatedThrough",
            "operatesOn",
            "pairedResearchLane",
            "siblingFacets",
        ):
            self.assertIn(previously_ignored, declared_relation_fields)


if __name__ == "__main__":
    unittest.main()
