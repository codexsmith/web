import os
import re
import json

LIBRARY_DIR = r"H:\Boundary First Institute\Lab\organized_library_curated\library"

DOCUMENTS_TO_TAG = {
    "0301_ai_computation_and_agency": [
        ("ai_as_forge_extended_draft_v0_2.md", "AI Is a Forge, Not an Oracle", "published", "low", "academic", "A defining essay on how Boundary First uses AI as an instrument of disciplined transformation rather than a truth oracle.", "Human Review"),
        ("distinction_theory_ai_alignment_and_boundary_preservation.md", "AI Alignment and Boundary Preservation", "formal", "low", "technical", "Formal analysis of how AI systems fail to preserve boundaries and how to correct this structurally.", "Bounded Agents")
    ],
    "0401_civilization_and_existential_risk": [
        ("the_throughput_trap.md", "The Throughput Trap", "published", "low", "public", "An analysis of how civilization optimizes for throughput at the cost of catastrophic fragility.", "Civilizational Systems"),
        ("from_grease_to_gate.md", "From Scarcity to Underutilization", "formal", "low", "academic", "Examining how modern scarcity is synthetically induced through underutilization gates.", "Public Engineering")
    ],
    "0402_public_law_and_antitrust": [
        ("Claim Regimes.md", "Claim Regimes", "formal", "low", "technical", "How law and institutions encode representational claims as binding regimes of power.", "Governance & Law"),
        ("antitrust_as_anti_sovereignty_law_draft_v0_1.md", "Antitrust as Anti-Sovereignty", "formal", "low", "academic", "Applying boundary-first analysis to the failure of legal representations in antitrust.", "Governance & Law")
    ],
    "0501_software_engineering_and_architecture": [
        ("boundary_first_engineering_revised_v_0_2_marked.md", "Boundary First Engineering", "published", "low", "technical", "The core methodology for engineering software that explicitly models the boundaries of its domain.", "Domain Archaeology"),
        ("executable_representation.md", "Executable Representation", "formal", "low", "technical", "Code is not just logic; it is the executable representation of an underlying systemic claim.", "Executable Skeletons")
    ],
    "0502_computing_and_systems": [
        ("problem_complexity_classes.md", "Problem Complexity Classes", "formal", "low", "academic", "Software architecture as the discipline of selecting which distinctions must be strictly preserved.", "Complexity & Observability"),
        ("distinction_theory_isotropic_computing_and_compression.md", "Isotropic Computing", "draft", "low", "technical", "Emerging design patterns for implementing Boundary First Engineering at the hardware level.", "Software Architecture")
    ],
    "0601_computational_simulations": [
        ("distinction_theory_weather_models_and_titans_experiment.md", "TITANUS Weather Model", "formal", "medium", "technical", "A look at weather models as systems of runaway distinction loss and representational defect.", "Weather@Home"),
        ("simulation_argument_flaws.md", "Simulation Argument Flaws", "draft", "low", "academic", "Formal modeling of existential and systemic risk through a volumetric lens.", "System Demonstrations")
    ],
    "0701_public_pedagogy_and_rhetoric": [
        ("distinction_theory_education_and_pedagogy.md", "Education and Pedagogy", "formal", "low", "public", "Rethinking education to focus on the transmission of distinction-making capacities.", "Workshops & Curriculum"),
        ("how_to_use_this_library.md", "Public Rhetoric Strategy", "published", "low", "public", "How to communicate complex systemic failures to a broad public audience.", "Visual Essays")
    ],
    "0901_bfl_ethos_and_strategy": [
        ("BFL_impact_comparison.md", "BFL Impact Comparison", "published", "low", "public", "A breakdown of Boundary First Labs' unique methodology and real-world impact compared to legacy institutions.", "Foundational Research"),
        ("BFL_ethos.md", "Boundary First Ethos", "published", "low", "public", "The core ethical and strategic commitments that drive our laboratory.", "Foundational Research")
    ],
    "1002_pipeline_tooling_and_logs": [
        ("SCRIPTS_INDEX.md", "Scripts Index", "draft", "low", "technical", "An index of the internal operational tools and parsers used by the laboratory pipeline.", "Corpus Forge"),
        ("The_Library_Dashboard.md", "The Library Dashboard", "published", "low", "academic", "An overview of how the Boundary First library is structured as a living operating system.", "Corpus Forge")
    ]
}

def inject_frontmatter(filepath, fm_dict):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        import re
        # Check if frontmatter exists
        match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
        if match:
            existing_yaml = match.group(1)
            body = match.group(2)
            
            # If parent isn't in there, append it (simple hack)
            if "parent:" not in existing_yaml:
                new_yaml = existing_yaml + f"\nparent: \"{fm_dict['parent']}\""
                new_content = f"---\n{new_yaml}\n---\n{body}"
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            return True
            
        frontmatter = "---\n"
        frontmatter += "web_publish: true\n"
        frontmatter += f"claim_maturity: \"{fm_dict['maturity']}\"\n"
        frontmatter += f"misuse_potential: \"{fm_dict['misuse']}\"\n"
        frontmatter += f"public_legibility: \"{fm_dict['legibility']}\"\n"
        frontmatter += f"public_summary: \"{fm_dict['summary']}\"\n"
        frontmatter += f"parent: \"{fm_dict['parent']}\"\n"
        frontmatter += "---\n\n"
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter + content)
        return True
    except Exception as e:
        print(f"Failed to inject {filepath}: {e}")
        return False

def update_node_md(node_path, documents_to_add):
    try:
        with open(node_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "documents:" not in content:
            parts = content.split('---', 2)
            if len(parts) >= 3:
                yaml_block = parts[1]
                if not yaml_block.endswith('\n'): yaml_block += '\n'
                yaml_block += "documents:\n"
                for doc in documents_to_add:
                    yaml_block += f"  - id: \"{doc['id']}\"\n"
                    yaml_block += f"    title: \"{doc['title']}\"\n"
                    yaml_block += f"    type: \"artifact\"\n"
                    yaml_block += f"    maturity: \"{doc['maturity']}\"\n"
                new_content = f"---{yaml_block}---{parts[2]}"
                with open(node_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True
        else:
            lines = content.split('\n')
            docs_idx = -1
            end_yaml_idx = -1
            for i, line in enumerate(lines):
                if line.startswith('documents:'):
                    docs_idx = i
                elif docs_idx != -1 and line == '---' and i > docs_idx:
                    end_yaml_idx = i
                    break
                    
            if docs_idx != -1 and end_yaml_idx != -1:
                new_docs_str = ""
                for doc in documents_to_add:
                    if doc['id'] not in content:
                        new_docs_str += f"  - id: \"{doc['id']}\"\n"
                        new_docs_str += f"    title: \"{doc['title']}\"\n"
                        new_docs_str += f"    type: \"artifact\"\n"
                        new_docs_str += f"    maturity: \"{doc['maturity']}\"\n"
                
                if new_docs_str:
                    lines.insert(end_yaml_idx, new_docs_str.rstrip('\n'))
                    with open(node_path, 'w', encoding='utf-8') as f:
                        f.write('\n'.join(lines))
                return True
    except Exception as e:
        print(f"Failed to update node {node_path}: {e}")
        return False
        

def main():
    for dirname, docs in DOCUMENTS_TO_TAG.items():
        dirpath = os.path.join(LIBRARY_DIR, dirname)
        if not os.path.exists(dirpath):
            print(f"Warning: Directory {dirpath} does not exist. Searching recursively...")
            found = False
            for root, dirs, files in os.walk(LIBRARY_DIR):
                if dirname in root:
                    dirpath = root
                    found = True
                    break
            if not found:
                print(f"Could not find {dirname}")
                continue
                
        node_path = os.path.join(dirpath, "_node.md")
        if not os.path.exists(node_path):
            print(f"Warning: No _node.md in {dirpath}")
            
        docs_to_add_to_node = []
        
        for doc_tuple in docs:
            filename = doc_tuple[0]
            target_file = None
            for root, dirs, files in os.walk(dirpath):
                if filename in files:
                    target_file = os.path.join(root, filename)
                    break
                    
            if target_file:
                fm_dict = {
                    "maturity": doc_tuple[2],
                    "misuse": doc_tuple[3],
                    "legibility": doc_tuple[4],
                    "summary": doc_tuple[5],
                    "parent": doc_tuple[6]
                }
                # To ensure it gets added even if it already has frontmatter without parent
                if inject_frontmatter(target_file, fm_dict):
                    print(f"Tagged: {filename}")
                    docs_to_add_to_node.append({
                        "id": os.path.splitext(filename)[0].lower(),
                        "title": doc_tuple[1],
                        "maturity": doc_tuple[2]
                    })
            else:
                print(f"Warning: File {filename} not found in {dirname}")
                
        if os.path.exists(node_path) and docs_to_add_to_node:
            update_node_md(node_path, docs_to_add_to_node)
            print(f"Updated _node.md in {dirname}")

if __name__ == "__main__":
    main()
