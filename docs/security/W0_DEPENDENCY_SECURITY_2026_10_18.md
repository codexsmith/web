# W0 security gate remediation — 2026-10-18

**Scope:** `codexsmith/web` baseline dependency graph and [website issue #120](https://github.com/codexsmith/web/issues/120). This document is a security triage record, **not** an approval to waive the gate or a claim that the site is safe to release.

## Changes proposed

- Reproduce and apply the **compatible, lockfile-only** dependency update printed by the existing Review gate's `npm audit fix --package-lock-only --ignore-scripts` at workflow run 38027694546 (2026-10-10). Preserve npm-provided `resolved` URLs and integrity hashes.
- Raise the direct Next.js and ESLint-Next declared minor floors to `^16.4.0`, matching the lockfile resolution from the workflow. Other compatible transitive resolutions include DOMPurify, Sharp, source-map-js, and Mermaid.
- Do not alter the policy gate, pretend its results passed, introduce synthetic integrity hashes, or apply `--force` major downgrades.

## Remaining findings observed in the original workflow

- **`braces@3.0.3`:** GHSA-vfj7-8cjw-p6xm, **high**. Path: `eslint-config-next` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`. The GitHub-reviewed advisory reports **no patched npm release as of 2026-10-18**. Treat development-only reachability as an *assessment*, not an automatic exclusion. Do not invent a nonexistent `braces@3.0.4`.
- **`katex@0.16.x`:** GHSA-238p-pmpm-9mq7, underlying advisory low severity; delivered via Mermaid and still flagged in transitive high-severity dependency chains. Fix requires Mermaid to widen its KaTeX range, a compatibility-tested override, or an appropriate upstream release. Do not substitute an unreviewed major downgrade of Mermaid.

## Release gate and follow-up

1. Re-run `npm ci`, `npm audit --audit-level=high`, and the full existing Review gate on the candidate lockfile.
2. Verify the actual audited lockfile and check both `npm ls --omit=dev braces` and production runtime/package exposure; check usages of Next.js `ImageResponse` and Mermaid's KaTeX renderer.
3. Resolve the remaining advisories with compatible published patches or a **separately documented, expressly approved, narrowly scoped and time-bound exception**. **No exception is granted by this record.**
4. Restore full contract/type/lint/build and Website v3 browser QA success before merging navigation PR #119. Coordinate stale-architecture assertions with #121.
5. Record source and merged web SHA before declaring W0 deployed.

**No policy gates were disabled, bypassed, or weakened by this change.**
