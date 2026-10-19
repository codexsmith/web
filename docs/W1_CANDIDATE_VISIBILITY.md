# W1 candidate preview visibility

Pending Lab projections remain **hidden in production** and normal preview builds. To view the candidate research/Now/Changes/Observatory components locally, use `BFL_ENABLE_CANDIDATE_PUBLIC_PROJECTIONS=1` with `npm run dev`.

The server-side `mayRenderPublicStateProjection` gate requires **all publication reviewer states approved and matching source digest** before an approved projection can render outside development. It is not sufficient to merge a PR, supply an environment flag in production, or pass build/QA. The current manifest remains candidate/pending.

The Lab source compiler and web importer still require complete independent validation; no source-authority promotion or live deployment is authorized.
