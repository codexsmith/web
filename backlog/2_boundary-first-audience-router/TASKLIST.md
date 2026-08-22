# Audience Router Post-Close Task List

**Backlog status:** Closed  
**Closed:** 2026-08-02  
**Purpose:** Preserve product-disposition decisions that may be taken later without treating the audience-router implementation as unfinished.

## Product disposition

- [ ] Decide whether `/audience` should remain `noindex, nofollow` or become an indexable public entrance.
- [ ] Decide whether depth should materially change the content shown or remain a bounded route preference until depth-specific canonical artifacts exist.
- [ ] Review and approve or replace the canonical-ID compatibility mappings in `src/lib/audience/data.ts`.
- [ ] Review and approve or replace the ten audience-to-publication recommendations.
- [ ] Decide whether `data/audience.nodes.json` should remain an independently versioned routing overlay or be promoted into canonical site content.
- [ ] Decide whether any anonymous route analytics are justified and, if so, document a retention and non-classification boundary before implementation.

## Closeout records

- [x] Integrate the router into the main Next.js site.
- [x] Expose the people-first entrance from the homepage.
- [x] Validate audience relationships and canonical graph references.
- [x] Add contract and route-resolution tests.
- [x] Confirm lint, tests, graph integrity, and production build pass at closure.

## Decision record template

When a disposition item is resolved, add the date, decision, owner, evidence considered, and any resulting implementation link beneath that item.
