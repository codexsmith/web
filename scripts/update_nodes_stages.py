import json
import os

nodes_file = os.path.join(os.path.dirname(__file__), "..", "src", "content", "nodes.json")

stages = [
  {
    "id": "foundations",
    "nodeIds": [
      "boundary-theory",
      "distinction-space",
      "contexture",
      "system",
      "distinction-theory",
      "admissibility-theory",
      "emergence-theory",
    ],
  },
  {
    "id": "processes",
    "nodeIds": [
      "representational-mechanics",
      "formal-grammars",
      "boundary-first",
      "ai-forge",
      "corpus-forge",
    ],
  },
  {
    "id": "programs",
    "nodeIds": [
      "mathematics",
      "physics",
      "computational-systems",
      "bfe",
      "software-engineering-practice",
      "constructive-humanist-agentics",
    ],
  },
  {
    "id": "applications",
    "nodeIds": [
      "positions",
      "governance-institutions",
      "law-public-trust",
      "finance-capital",
      "infrastructure-repair",
      "systems-criticism",
      "on-ramps",
      "public-philosophy-satire",
    ],
  },
  {
    "id": "stewardship",
    "nodeIds": ["products-testbeds", "corpus"],
  },
]

# Map node id to (stage_id, order)
node_mapping = {}
for stage in stages:
    for idx, node_id in enumerate(stage["nodeIds"]):
        node_mapping[node_id] = (stage["id"], (idx + 1) * 10)

with open(nodes_file, "r", encoding="utf-8") as f:
    nodes = json.load(f)

for node in nodes:
    if node["id"] in node_mapping:
        stage_id, order = node_mapping[node["id"]]
        node["architectureStage"] = stage_id
        node["architectureOrder"] = order

with open(nodes_file, "w", encoding="utf-8") as f:
    json.dump(nodes, f, ensure_ascii=False, indent=2)
    f.write("\n")

print("nodes.json updated with architectureStage and architectureOrder.")
