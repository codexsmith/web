---
artifact: "Boundary First UX"
version: "refined-packet-v0.1"
source_packet: "02_Boundary_First_UX.md"
representation_class: "refined editorial projection"
status: "working doctrine + operational specification"
claim_ceiling: "design doctrine, operational taxonomy, and provisional research agenda"
public_legibility: "mixed: publication-ready doctrine plus research/implementation material"
---

# Boundary First UX

## Editorial status

This refined file removes the earlier survey wrapper and duplicate preview excerpts while preserving the two substantive artifacts carried by the editorial source packet: the Boundary First UX analysis sheet and the Boundary First UX Suite README.

The governing distinction is retained:

- **public doctrine** may state the interaction principles and practical design claims;
- **operational methods** may be used and tested now;
- **machine-readable structures** are implementation artifacts;
- **formal/high-dimensional mathematical formulations remain provisional research objects** and do not inherit authority merely from the usability of the UX doctrine.

The canonical working principle from the source is:

> **Resolution navigation is the lawful differentiation and compression of a representational space under a declared context.**

The central product problem is likewise preserved: a user should be able to perceive a larger gestalt without being required to process every distinction within it simultaneously.

---

## Suite architecture

# Boundary First UX Suite v0.1

**Release class:** Initial doctrine and operational package  
**Status:** Working publication package; ready for internal review and prototype use  
**Canonical principle:** *Resolution navigation is the lawful differentiation and compression of a representational space under a declared context.*

## What this package does

This suite packages Boundary First UX into multiple coordinated forms rather than forcing one document to serve every audience.

The package distinguishes:

1. **Public doctrine** — the clearest claims that can be communicated now.
2. **Formal research notes** — promising mathematical formulations whose status remains provisional.
3. **Operational methods** — taxonomies, scorecards, patterns, specifications, and templates that can be used immediately.
4. **Machine-readable representations** — schemas and example data for website and prototype implementation.

## Foundational synthesis

Boundary First UX began as a response to data-first and knowledge-graph interfaces that could reveal a global gestalt but could not make that gestalt locally legible or navigable. The central repair is not to hide the structure. It is to create lawful transitions among levels of representation.

The package therefore treats a user interface as a representational system with:

- distinctions;
- typed objects and relations;
- visible and deferred boundaries;
- admissible transitions;
- protected context;
- resolution changes;
- compression and expansion;
- provenance;
- closure and repair paths.

The signature interaction is:

```text
zoom + contextual filtering -> resolution increase or decrease
```

Zoom becomes semantic rather than merely optical. Filtering selects which distinctions are consequential at the current resolution. The result is a navigable path through both the breadth and depth of a high-dimensional knowledge space.

## Package map

### Publication

- `boundary_first_ux_manifesto.md` — concise public declaration.
- `boundary_first_ux_whitepaper.md` — flagship doctrine and comparative framing.
- `resolution_navigation_formal_note.md` — formal research note and mathematical agenda.
- `data_first_to_boundary_first_lineage_essay.md` — intellectual and design lineage.
- `conference_talk_and_workshop_pack.md` — talk abstract, session outline, and workshop.
- `publication_series_and_release_plan.md` — sequenced publication strategy.

### Operational

- `visualization_boundary_interaction_taxonomy.md` — chart and graph taxonomy by boundary operation.
- `boundary_first_interaction_pattern_catalog.md` — reusable interaction patterns.
- `knowledge_atlas_product_spec.md` — implementation-ready product specification.
- `visualization_audit_scorecard.md` — scoring and review protocol.
- `research_claim_ledger.md` — current claim status and research obligations.
- `implementation_backlog.md` — phased prototype and validation backlog.

### Data

- `boundary_first_ux_schema.json` — machine-readable model for views, nodes, contexts, and resolution transitions.
- `interaction_grammar.json` — interaction operators and invariants.
- `visualization_catalog.csv` — initial catalog of familiar visualization forms.
- `example_resolution_graph.json` — small example showing semantic zoom and contextual filtering.
- `boundary_first_ux_visualization_audit.xlsx` — editable audit workbook.

### Templates

- `visualization_review_template.md`
- `interaction_pattern_template.md`
- `case_study_template.md`
- `publication_claim_box.md`
- `resolution_experiment_protocol.md`

## Source basis

The package synthesizes:

- the Boundary First Labs guided-atlas UX structure;
- the Grok / Navigate / Dive interaction model;
- the project’s on-ramp work on resolution, projection, and observability;
- the unified theoretical spine’s explicit treatment of resolution and projection;
- the present conversation’s visualization taxonomy and resolution-navigation formulation.

It does **not** treat the proposed high-dimensional mathematics as already proved. Those formulations are isolated in the formal note and claim ledger with explicit research obligations.

## Stable-file workflow

The filenames inside this package are intended to remain stable during ordinary development. Update them in place and append changes to the ledgers. Create a new versioned package only at a deliberate review or release milestone.

---

## Visualization and graph boundary-interaction taxonomy

# Boundary First UX

## Visualization and Graph Boundary-Interaction Taxonomy — Preliminary Analysis Sheet

### Purpose

This analysis classifies familiar charts, graphs, and visualization interactions according to the boundary operations they support.

The goal is not merely to catalog visual forms by appearance—bar chart, tree, map, network—but to identify:

* what boundary each form constructs;
* what distinctions it makes legible;
* which boundary interactions it supports;
* what it hides or collapses;
* which user questions it answers well;
* where interaction is required to restore missing context.

The central working proposition is:

> A visualization is a representational boundary instrument.

It selects distinctions from a larger data space, encodes them into a visible field, and constrains which comparisons, paths, regions, transitions, and relationships the viewer can perceive.

---

# I. Primary boundary operations

## 1. Separate

Establish that two or more values, entities, categories, or states are distinct.

Typical questions:

* Are these things different?
* Which is larger?
* Which category does this belong to?
* Where does one regime end and another begin?

Canonical forms:

* bar chart;
* grouped bar chart;
* dot plot;
* histogram;
* categorical table;
* threshold map;
* box plot.

Primary boundary:

> A categorical, ordinal, or quantitative distinction between observations.

Main strength:

Clear comparison.

Main risk:

The representation may suggest that the selected variables exhaust the meaningful differences between the objects.

---

## 2. Position

Locate an entity within a coordinate space.

Typical questions:

* Where is it?
* What values describe its state?
* Which observations are nearby?
* How far apart are two states?

Canonical forms:

* scatterplot;
* geographic map;
* coordinate plot;
* bubble chart;
* multidimensional projection;
* matrix.

Primary boundary:

> A coordinate frame defining meaningful relative location.

Main strength:

Makes proximity, distance, clustering, and outliers perceptible.

Main risk:

Visual proximity may be mistaken for semantic, causal, or operational similarity.

---

## 3. Enclose

Show that one object or region is contained within another.

Typical questions:

* What belongs inside this group?
* What contains this object?
* How is the whole partitioned?
* Which boundary owns this element?

Canonical forms:

* treemap;
* circle packing;
* sunburst;
* icicle diagram;
* nested set diagram;
* geographic administrative map.

Treemaps recursively subdivide area according to the values associated with hierarchical nodes. Circle packing likewise represents hierarchy through enclosure, though it sacrifices some spatial efficiency to make the nesting more visually prominent.

Primary boundary:

> A membership or containment relation.

Supported interactions:

* enter a containing region;
* leave a region;
* compare siblings;
* reveal ancestors;
* inspect children;
* promote a child region to the current frame.

Main strength:

Makes part–whole organization explicit.

Main risk:

Containment may be incorrectly read as ownership, exclusivity, dependency, or causal control.

---

## 4. Partition

Divide a whole into mutually distinguished regions.

Typical questions:

* How is the whole allocated?
* Which part occupies how much?
* Where are the internal divisions?
* Does every item have exactly one place?

Canonical forms:

* pie chart;
* stacked bar;
* treemap;
* Voronoi diagram;
* mosaic plot;
* choropleth map;
* partition diagram.

Primary boundary:

> A division of a declared whole into differentiated subregions.

Main strength:

Makes allocation visible.

Main risk:

The visualization may imply that the categories are exhaustive and mutually exclusive even when the underlying domain overlaps.

Boundary First audit question:

> Is this truly a partition, or merely a convenient categorization?

---

## 5. Connect

Show that entities are related across otherwise separate positions.

Typical questions:

* What is connected to this?
* How many relationships does it have?
* Which entities form a cluster?
* What path joins two nodes?

Canonical forms:

* node-link diagram;
* force-directed graph;
* dependency graph;
* knowledge graph;
* arc diagram;
* adjacency matrix;
* dendrogram.

Primary boundary:

> A relation that crosses or joins entity boundaries.

Supported interactions:

* follow edge;
* inspect neighbor;
* reveal path;
* expand local neighborhood;
* collapse unrelated nodes;
* distinguish edge types;
* trace provenance.

Main strength:

Makes relational structure explicit.

Main risk:

“Connected” becomes semantically overloaded. Causation, citation, influence, membership, analogy, dependency, contradiction, and navigation may all be drawn as visually similar lines.

This is one of the central failures that originally motivates Boundary First UX:

> The whole graph is visible, but the meaning of traversal is not.

---

## 6. Order

Show sequence, ranking, ancestry, dependency, or progression.

Typical questions:

* What comes before this?
* What depends on what?
* What is higher or lower?
* What is the route from origin to result?

Canonical forms:

* ordered bar chart;
* ranking table;
* timeline;
* tree;
* flowchart;
* dependency graph;
* Gantt chart;
* process diagram.

D3 tree layouts assign positions to nodes in a rooted hierarchy and can be rendered in Cartesian or radial coordinate systems. Collapsible variants permit portions of the hierarchy to be expanded and contracted.

Primary boundary:

> A directed or ordinal relation constraining possible traversal.

Main strength:

Supports orientation and progression.

Main risk:

Visual order may imply temporal, causal, evaluative, or authority order without declaring which one is intended.

---

## 7. Flow

Represent movement, transfer, transition, or exchange across boundaries.

Typical questions:

* What moves from one region to another?
* How much crosses the boundary?
* Where does it come from?
* Where does it go?
* What is conserved or lost in transit?

Canonical forms:

* Sankey diagram;
* chord diagram;
* alluvial diagram;
* flow map;
* transition graph;
* funnel;
* state-transition diagram.

D3 chord diagrams represent flow among nodes using a matrix, while ribbon width can encode the volume of bidirectional or unidirectional flow between them.

Primary boundary:

> A source–destination relation describing transport across a distinction.

Supported interactions:

* follow source;
* follow destination;
* isolate a route;
* distinguish incoming and outgoing flow;
* compare volumes;
* inspect conversion or loss;
* replay transition.

Main strength:

Makes boundary crossing visible.

Main risk:

Flow diagrams can obscure:

* what changes during transport;
* whether the transferred entities remain identical;
* whether volume is conserved;
* what constraints govern admissibility;
* what happens when transport fails.

Boundary First extension:

A flow should ideally expose not only **where something moves**, but also:

* what qualifies it to cross;
* what transformation occurs at the boundary;
* which invariant is preserved;
* what residue or defect remains.

---

## 8. Accumulate

Show how repeated contributions produce a total, distribution, density, or field.

Typical questions:

* Where is activity concentrated?
* What accumulates here?
* What is the aggregate effect?
* Where does the system become saturated?

Canonical forms:

* histogram;
* density plot;
* heatmap;
* contour map;
* stacked area chart;
* cumulative line;
* hexbin plot.

Primary boundary:

> A region of aggregate intensity or concentration.

Main strength:

Reveals population-level structure that individual points obscure.

Main risk:

Aggregation removes identity, sequence, provenance, and exceptional cases.

Boundary First audit question:

> Which distinctions were intentionally forgotten in order to produce the field?

---

## 9. Compare

Place multiple representations into a shared frame.

Typical questions:

* How do these cases differ?
* What changed?
* Which condition performs better?
* What remains invariant between views?

Canonical forms:

* small multiples;
* grouped bars;
* before-and-after panels;
* slope graph;
* parallel coordinates;
* comparison table;
* layered line chart.

Primary boundary:

> A shared gauge enabling differences between representations to become meaningful.

Main strength:

Supports direct judgment.

Main risk:

The cases may not actually share a valid comparison basis.

Boundary First audit questions:

* Are the scales commensurable?
* Are the categories equivalent?
* Are the observation windows aligned?
* Is the same object being measured in both views?
* Has normalization erased a consequential difference?

---

## 10. Transform

Show an object or system changing through time, state, scale, or representation.

Typical questions:

* What changed?
* What remained stable?
* How did this state become that state?
* Which transition produced the current form?

Canonical forms:

* animated transition;
* animated map;
* bar-chart race;
* temporal network;
* state-transition animation;
* morphing chart;
* interactive simulation.

D3’s data join, interpolation, and easing facilities support animated transitions that can preserve object constancy across views.

Primary boundary:

> A distinction between prior and successor representational states.

Main strength:

Can preserve identity while exposing change.

Main risk:

Animation may create the impression of continuity even when the underlying transformation includes discontinuity, replacement, aggregation, or loss.

Boundary First criterion:

> A transformation should reveal what was preserved, what changed, and what ceased to be represented.

---

## 11. Focus

Temporarily increase the resolution of part of a larger structure.

Typical questions:

* What is inside this region?
* What is immediately related to this node?
* What becomes visible at the next scale?
* Can I inspect detail without losing the whole?

Canonical forms and interactions:

* zoomable treemap;
* zoomable sunburst;
* zoomable icicle;
* semantic zoom;
* fisheye view;
* focus-plus-context graph;
* expandable node;
* details-on-demand panel.

D3’s zoomable treemap, sunburst, and icicle examples explicitly allow users to enter a hierarchical region and return to a containing level. Some variants deliberately display only a limited number of layers at one time.

Primary boundary:

> A temporary contexture selected from a larger representational space.

Main strength:

Balances local legibility with global complexity.

Main risk:

Zoom frequently destroys orientation by replacing the parent frame rather than preserving it.

Boundary First requirement:

A focus operation should preserve or expose:

* current location;
* containing context;
* scale or depth;
* path of entry;
* path of return;
* neighboring possibilities.

This is the foundational interaction behind **Grok, Navigate, Dive**.

---

## 12. Filter

Change which elements are admitted into the current view.

Typical questions:

* Show only this class.
* Remove irrelevant cases.
* Which records satisfy this condition?
* What structure remains after the selection?

Canonical interactions:

* filter control;
* legend toggle;
* crossfilter;
* search;
* range selection;
* category selection;
* query;
* faceting.

Primary boundary:

> An admissibility rule defining membership in the visible set.

Main strength:

Reduces noise and supports inquiry.

Main risk:

Filtering can silently rewrite the apparent system.

Boundary First requirements:

* active filters must remain visible;
* excluded categories must remain discoverable;
* the user must be able to clear or reverse the filter;
* the filtered view must not present itself as the unqualified whole.

---

## 13. Brush and select

Create a provisional user-defined boundary within the visualization.

Typical questions:

* What belongs to this selected region?
* How do the selected cases differ?
* Where else do these cases appear?
* What happens when this subpopulation becomes the focus?

D3 explicitly supports brushing as one of its core reusable interaction behaviors, alongside zooming and dragging.

Primary boundary:

> A temporary selection boundary introduced by the viewer.

Main strength:

Lets users form and test their own distinctions.

Main risk:

The geometric selection may not correspond to a coherent domain category.

Boundary First interpretation:

Brushing is a **distinction-making operation**. The system should make clear:

* which rule selected the items;
* whether the selection is persistent;
* which linked views inherit it;
* whether it changes only presentation or also computation;
* how the distinction can be revised or removed.

---

## 14. Reposition

Allow the user to alter the layout without necessarily changing the represented data.

Typical interactions:

* drag node;
* reorder axis;
* move panel;
* rotate view;
* rearrange categories;
* pin graph node.

Primary boundary:

> A distinction between semantic state and presentation state.

Main strength:

Supports personal sense-making and untangling.

Main risk:

Users may infer that spatial changes alter semantic relationships—or forget which positions were data-derived and which were manually imposed.

Boundary First requirement:

The interface should distinguish:

* computed position;
* semantic position;
* manually adjusted position;
* saved interpretive arrangement.

---

## 15. Collapse and expand

Change the resolution at which a composite object is represented.

Typical questions:

* Can this cluster function as one object?
* What is hidden inside it?
* Which details are necessary now?
* Can the whole be treated as a reusable primitive?

Canonical forms:

* collapsible tree;
* clustered graph;
* expandable row;
* roll-up hierarchy;
* nested outline;
* compound node.

Primary boundary:

> A promotion or demotion between composite structure and operative unit.

Main strength:

Controls complexity.

Main risk:

Collapsed objects may hide internal disagreement, exceptions, uncertainty, or unresolved structure.

Boundary First criterion:

> Collapse is warranted only when the internal structure is stable enough to function as a bounded primitive for the present task.

---

# II. Preliminary chart-family matrix

| Visualization        | Primary boundary            | Main operation        | Strongly supports               | Weakly supports or obscures              |
| -------------------- | --------------------------- | --------------------- | ------------------------------- | ---------------------------------------- |
| Bar chart            | Category/value              | Separate, compare     | Magnitude differences           | Relation, provenance, transformation     |
| Line chart           | Temporal/ordered coordinate | Transform, compare    | Trend and continuity            | Internal events, categorical change      |
| Scatterplot          | Coordinate field            | Position, separate    | Cluster, proximity, outlier     | Causal and semantic relationships        |
| Histogram            | Interval partition          | Accumulate, compare   | Distribution and frequency      | Individual identity and sequence         |
| Heatmap              | Matrix or spatial region    | Accumulate, compare   | Concentration and pattern       | Exact lineage and local mechanism        |
| Pie/donut            | Declared whole              | Partition             | Approximate allocation          | Fine comparison, overlap, uncertainty    |
| Treemap              | Nested enclosure            | Enclose, partition    | Part–whole hierarchy and value  | Relations across branches                |
| Circle packing       | Nested enclosure            | Enclose, focus        | Hierarchy and cluster identity  | Precise quantitative comparison          |
| Tree/dendrogram      | Rooted order                | Order, connect        | Ancestry and dependency         | Cross-links and multiple parentage       |
| Force-directed graph | Relational field            | Connect, explore      | Neighborhood and gestalt        | Stable coordinates, typed meaning        |
| Adjacency matrix     | Relational matrix           | Connect, compare      | Dense relational patterns       | Path-following and intuitive traversal   |
| Chord diagram        | Circular node boundary      | Flow, connect         | Reciprocal exchange             | Long paths, process stages, local detail |
| Sankey/alluvial      | Staged partitions           | Flow, transform       | Source-to-destination transport | Cycles, hidden admissibility conditions  |
| Sunburst/icicle      | Nested ordered partition    | Enclose, order, focus | Hierarchy and depth             | Cross-branch relations                   |
| Geographic map       | Spatial territory           | Position, partition   | Location and regional boundary  | Nonspatial relationships                 |
| Contour/density plot | Field threshold             | Accumulate, separate  | Regimes and concentrations      | Individual entities                      |
| Timeline             | Temporal axis               | Order, transform      | Chronology and duration         | Nonlinear dependence                     |
| Gantt chart          | Temporal lanes              | Order, enclose        | Scheduling and overlap          | Semantic dependency unless added         |
| Small multiples      | Shared comparison frame     | Compare               | Differences across cases        | Global relational gestalt                |
| Parallel coordinates | Multiaxis state             | Compare, position     | Multivariate profiles           | Local readability and causal meaning     |

---

# III. Interaction families as boundary mechanics

The familiar visualization interactions can be restated as boundary operations:

| Interaction     | Boundary operation                                          |
| --------------- | ----------------------------------------------------------- |
| Hover           | Probe a boundary without crossing it                        |
| Click/select    | Declare an entity or region consequential                   |
| Brush           | Draw a provisional distinction                              |
| Filter          | Change admission to the visible space                       |
| Zoom            | Change representational scale                               |
| Pan             | Move the observational frame                                |
| Drag            | Reposition an entity or alter presentation structure        |
| Expand          | Open the internal structure of a composite object           |
| Collapse        | Promote a composite structure into a temporary primitive    |
| Follow edge     | Cross a declared relational boundary                        |
| Breadcrumb/back | Repair or reverse a prior boundary crossing                 |
| Animate         | Display transport between representational states           |
| Link views      | Propagate a distinction across multiple representations     |
| Search          | Locate an entity without traversing the visible topology    |
| Reset           | Restore the declared baseline representation                |
| Compare         | Establish a common gauge between bounded views              |
| Annotate        | Add an interpretive boundary or claim to the representation |

---

# IV. The central failure of the data-first knowledge graph

The traditional data-first graph tries to give the user the gestalt:

* all nodes;
* all edges;
* all clusters;
* all relations;
* all paths.

This succeeds at global exposure but frequently fails at local legibility.

The user encounters several problems:

### Relation collapse

Different relationships are drawn as equivalent edges.

### Scale collapse

The overview and the working view are forced into the same representation.

### Type collapse

People, ideas, claims, documents, programs, sources, and categories look like equivalent nodes.

### Context collapse

Entering one node causes the surrounding conceptual position to disappear.

### Path collapse

The graph exposes possible routes without communicating which route is meaningful for the current user.

### Boundary overload

Too many distinctions become simultaneously active.

### Interaction ambiguity

Clicking, dragging, zooming, expanding, and selecting alter the interface, but the semantic meaning of each operation is unclear.

### Closure failure

The user can explore indefinitely without arriving at a coherent understanding, decision, or next action.

Boundary First UX begins as a response to this exact condition:

> The user should be able to perceive the larger gestalt without being required to process every distinction within it simultaneously.

---

# V. Candidate Boundary First visualization principles

## 1. Every visualization declares its operative boundary

The user should be able to determine:

* what is inside the view;
* what is outside;
* what qualifies for inclusion;
* what the axes, regions, or edges mean;
* what has been aggregated or omitted.

## 2. Every interaction declares whether it changes data, representation, or attention

Dragging a node, filtering records, selecting a region, and changing the underlying data are not equivalent operations.

## 3. Overview and detail are coupled but not collapsed

The overview provides location.

The detail provides actionable resolution.

Neither should silently replace the other.

## 4. Edge semantics must be typed

A visible connection should distinguish at minimum among:

* containment;
* dependency;
* evidence;
* provenance;
* sequence;
* transformation;
* analogy;
* contradiction;
* navigation.

## 5. Zoom must preserve ancestry

Entering a region should retain:

* the containing structure;
* the route inward;
* the current depth;
* the route outward.

## 6. Filtering must expose exclusion

The active boundary of the visible set should never become invisible.

## 7. Aggregation must disclose forgotten distinctions

A field, cluster, average, or collapsed node should indicate what information is no longer individually represented.

## 8. Collapse requires provisional closure

A collection may act as one object only when its internal differences are not consequential to the current task.

## 9. The next interaction should be semantically legible

The user should know not merely what can be clicked, but what kind of representational transition the click performs.

## 10. Exploration should have closure conditions

The visualization should support movement toward:

* an answer;
* an explanation;
* a comparison;
* a decision;
* a saved view;
* a shareable path;
* a source;
* a next investigation.

---

# VI. Proposed classification fields for the full catalog

Each chart or interaction pattern can receive a record with the following fields:

```text
Name
Visualization family
Canonical examples

Primary represented objects
Primary boundary type
Secondary boundary types

Supported boundary operations
Unsupported or weak operations

What is foregrounded
What is backgrounded
What is excluded
What is aggregated
What is treated as invariant

Default user questions
Admissible user interactions
Semantic meaning of each interaction

Orientation mechanism
Return or repair mechanism
Provenance support
Comparison support
Closure condition

Typical misuse
Typical context-collapse failure
Typical false-inference risk

Boundary First adaptations
Best use conditions
Unsuitable use conditions
```

---

# VII. Initial Boundary First chart families

The eventual catalog may reorganize visualizations into these Boundary First families:

1. **Distinction views**
   Bar charts, dot plots, thresholds, classifications.

2. **Coordinate views**
   Scatterplots, maps, projections, matrices.

3. **Enclosure views**
   Treemaps, circle packing, sunbursts, nested regions.

4. **Relational views**
   Node-link graphs, matrices, dependency diagrams.

5. **Transport views**
   Sankey diagrams, chord diagrams, flow maps, transition graphs.

6. **Field views**
   Heatmaps, density plots, contours, distributions.

7. **Transformation views**
   Timelines, animated transitions, state sequences.

8. **Comparison views**
   Small multiples, layered charts, aligned panels.

9. **Focus-context views**
   Zoomable hierarchies, semantic zoom, expandable nodes.

10. **Participatory boundary views**
    Brushing, filtering, linking, annotation, user-defined regions.

This reorganization would classify visualizations according to **what representational work they perform**, rather than only according to geometry or statistical convention.

---
