# P4 Third-Layer Review Notes

## Reviewed failure modes

### Standalone retained-record routes

Several canonical objects exposed a richer retained record through a top-level landing alias. The alias was rendered before `WorldApp`, so following the link removed the Boundary Frame and entered a second page system.

Representative cases:

- Agency & Representation Audit → `/agency-audit`
- Software Before Code → `/software-before-code`
- Corpus Forge → `/corpus-forge`
- Closure-Driven Software Development → `/closure-driven-software-development`
- Boundary First UX → `/boundary-first-ux`

P4 treats an active public landing as a deeper record when a canonical graph node explicitly links to the landing alias. That link is the ownership declaration.

### Modal inspection

`InspectionPanel` previously rendered as a `role="dialog"` with `aria-modal="true"` plus a full backdrop. This made a through-inspection look like a separate window floating over the world.

P4 renders inspection as ordinary bounded main content at the same viewport coordinates as World/Evidence/Process. It remains attached to the focused object and closes back to that object.

## Migration strategy

1. Keep Search as the only global overlay because Search is a traversal instrument.
2. Convert inspection to an inline/main content detail surface.
3. Convert graph-owned landing aliases into compatibility redirects.
4. Address retained records through the canonical node with `?detail=record:<id>`.
5. Project record content inside the existing Boundary Frame.
6. Replace raw landing layouts progressively with domain-specific BFUX compositions.

## First specialized records

### Agency & Representation Audit

The new record surface is organized as an operating diagnostic:

- proposition and consequence trace;
- six diagnostic questions;
- failure field;
- five-pass method;
- closure test;
- pilot boundary;
- pilot handoff;
- evidence rule;
- claim firewall.

### Software Before Code

The new record surface is organized as an engineering instrument:

- method profile and software-object trace;
- representation-before-mechanism problem;
- nine boundary questions;
- distinction-to-closure sequence;
- controlled forgetting;
- invoice-approval stress test;
- defect/repair diagnostics;
- closure and witness tests;
- validation ladder;
- explicit non-claims.

## Transitional generic record projection

Other graph-owned active records receive a structured retained-record fallback instead of their old standalone raw landing renderer. This is a migration surface, not a universal final template. High-value records should receive specialized projections as their content and interaction needs become clear.
