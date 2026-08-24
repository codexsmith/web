<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Boundary First Labs web repository rules

## Commit discipline

All code and configuration changes in this repository should be completed in as few commits as possible, ideally one coherent commit per task or pull request.

- Before the first repository write, inspect the relevant files, define the bounded change, and gather the edits needed to complete it.
- Prefer one atomic commit containing the implementation, tests/contracts, documentation, and configuration required for that bounded change.
- Do not use a sequence of exploratory, fixup, formatting, or "oops" commits when the same result can be assembled and validated before writing.
- When tooling permits, create all changed blobs/tree entries together and write one commit rather than one commit per file.
- If review or CI exposes a defect that genuinely requires another commit, keep follow-up commits to the minimum necessary and squash the pull request before merge so `main` receives one coherent change whenever practical.
- Exceptions are allowed when preserving separate commits is materially useful for review, bisectability, provenance, or an explicitly staged migration; the reason should be stated in the pull request.

## Vercel deployment discipline

Automatic Vercel Git deployments are reserved for `main`. Development and agent branches must not generate automatic preview builds unless a task explicitly requires one. This protects the deployment budget and keeps production deployment tied to reviewed integration state.
