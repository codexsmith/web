# Boundary First Audience Router

**Status:** Closed on 2026-08-02. The feature is integrated into the main site. Remaining product-disposition decisions are tracked in `TASKLIST.md` and do not reopen this implementation backlog.

A bounded Next.js App Router feature slice for routing visitors through a large content graph by **arrival intent → audience relation → familiar doorway → desired depth**.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000/audience`.

## Key files

- `data/audience.nodes.json` — static audience/use-case registry compatible with node-oriented content data.
- `lib/audience/types.ts` — schema types.
- `lib/audience/schema.ts` — runtime dataset validation.
- `lib/audience/resolve.ts` — pure route resolution and compatibility filters.
- `components/audience/AudienceRouteOutlet.tsx` — configurable UI outlet.
- `app/audience/[[...path]]/page.tsx` — Next.js route adapter and static path generation.
- `docs/FEATURE-SLICE.md` — boundary-first design and integration documentation.

## Mount at a different URL

Copy the catch-all page to another route and provide a config whose `basePath` matches that route. The feature contains no hard-coded dependency on `/audience` outside the default config.
