# World orientation projection

Boundary First UX distinguishes an object's full public record from the concise orientation needed to traverse the containing world.

The World renderer therefore treats boundary orientation as a separate projection field rather than shortening or overwriting the canonical `summary`.

## Current rule

- Root cards use a one-line boundary statement for each primary public region.
- Cards immediately inside a primary public region use a one-line boundary statement where declared.
- Deeper cards continue to use the richer object summary.
- Missing orientation metadata does not silently mutate the source summary.

This keeps orientation concise while preserving the richer object representation for detail, evidence, process, and publication views.
