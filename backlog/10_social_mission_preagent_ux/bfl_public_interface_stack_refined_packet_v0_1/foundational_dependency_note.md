# Dependency on the Foundational Triad Packet

This Public Interface Stack intentionally depends on the previously refined foundational packet rather than embedding another copy of Core Identity.

Primary dependency:

- `bfl_foundational_triad_refined_packet_v0_1/refined/02_Core_Identity.md`

The website source packet duplicated several Core Identity artifacts exactly. The refined public-interface packet treats those upstream artifacts as authoritative and records the duplication in `metadata/overlap_deduplication_audit.md`.

This is an application of the same machinery rule being developed across the project: one semantic object may have many projections, but those projections should not accidentally become independent competing authorities.
