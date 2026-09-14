<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Boundary First Labs web repository rules

## Repository boundary

This repository is the deployable website implementation boundary, not the Lab's planning corpus.

- Do **not** create or restore a `backlog/` directory here.
- Website strategy, product-owner intent, backlog state, positioning, UX exploration, public-projection planning, and retained source packets belong in `codexsmith/boundary-first-labs`, primarily under `organized_library_curated/06_Website_Content/`.
- The active website backlog is `organized_library_curated/06_Website_Content/0600_Control/BACKLOG.md` in the Lab repository.
- `docs/` is for implementation-local specifications, contracts, and architecture whose authority must remain version-coupled to this codebase.
- Before introducing a planning document here, ask whether changing that document alone should justify a website deployment. If not, it belongs in the Lab.

The former `web/backlog/` working tree was retired on 2026-09-14. Its final source snapshot remains in Git history at commit `8f369070ad89eb94e64f096ea383f7f167f52d0b`, tree `56e20f29aff68704673c0a6909b34bad8f038c1a`.

## Commit discipline

All code and configuration changes in this repository should be completed in as few commits as possible, ideally one coherent commit per task or pull request.

- Before the first repository write, inspect the relevant files, define the bounded change, and gather the edits needed to complete it.
- Prefer one atomic commit containing the implementation, tests/contracts, documentation, and configuration required for that bounded change.
- Do not use a sequence of exploratory, fixup, formatting, or "oops" commits when the same result can be assembled and validated before writing.
- When tooling permits, create all changed blobs/tree entries together and write one commit rather than one commit per file.
- If review or CI exposes a defect that genuinely requires another commit, keep follow-up commits to the minimum necessary and squash the pull request before merge so `main` receives one coherent change whenever practical.
- Exceptions are allowed when preserving separate commits is materially useful for review, bisectability, provenance, or an explicitly staged migration; the reason should be stated in the pull request.

## Vercel deployment discipline

Treat every Git commit in this repository as potentially consuming Vercel deployment quota.

Automatic Vercel Git deployments are intended for `main`; development/agent branches should not perform full preview builds unless a task explicitly requires one. The ignored-build step is a **compute guard**, not a substitute for repository boundaries: an ignored/canceled Git deployment can still create a deployment record and consume deployment-count quota.

Therefore:

- Keep high-churn planning/backlog work in the Lab repository rather than here.
- Minimize commits and prefer one coherent integration commit.
- Validate branch work with local/GitHub tooling where possible instead of relying on Vercel as a test runner.
- `scripts/vercel-ignore-build.sh` cancels non-`main` Git builds before `vercel build` and skips full builds for changes outside the runtime/build-input allowlist.
- The build-input allowlist covers `src`, `public`, `scripts`, package manifests, Next/PostCSS/TypeScript configuration, and `vercel.json` itself.
- If a new build-time input is introduced outside that allowlist, update the ignore/build configuration in the same coherent change.
