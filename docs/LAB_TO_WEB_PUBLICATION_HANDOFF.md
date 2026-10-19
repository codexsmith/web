# Lab-to-web publication import

Use this **offline**, from a reviewed local website working branch, to verify or import the exact four artifacts produced by the Lab-owned `website_v3_handoff_v0_1/build_public_bundle.mjs`.

```sh
# Run from the Lab checkout (candidate only; no approval/deploy):
node organized_library_curated/06_Website_Content/0602_Public_Projection/website_v3_handoff_v0_1/build_public_bundle.mjs --mode candidate --out /tmp/bfl-web-export

# Run from the website checkout (never pushes or deploys):
node scripts/import_public_projection.mjs --from /tmp/bfl-web-export --check --allow-candidate
node scripts/import_public_projection.mjs --from /tmp/bfl-web-export --write --allow-candidate
npm run contracts:check
```

The import command rejects candidate exports without `--allow-candidate`, validates a SHA-256 input digest and Git-blob hashes, refuses unexpected output paths and symlinks, and checks cross-view source revision and status consistency. Approval evidence and source-owned review remain in Lab; importer verification is **not approval**. A reviewed web PR and normal security/release checks are still mandatory. The imports are currently **manual**, not a CI pull from a private repository.

The current uncompiled W1 branch snapshot was curated manually. Until the Lab compiler's first replay and web import, it remains **legacy candidate review data**; the new importer will not silently treat that manual manifest as a compiled/approved Lab handoff.
