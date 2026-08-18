from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
SOURCE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".mdx"}
LEGACY_EMAILS = ("contact@boundaryfirst.com", "nsc319@gmail.com")
CANONICAL_EMAIL = "contact@boundaryfirstlabs.com"


def fail(errors: list[str], path: Path, reason: str) -> None:
    errors.append(f"{path.relative_to(ROOT).as_posix()}: {reason}")


def main() -> None:
    errors: list[str] = []
    canonical_contact_count = 0

    for path in sorted(SRC.rglob("*")):
        if not path.is_file() or path.suffix not in SOURCE_EXTENSIONS | {".json"}:
            continue
        content = path.read_text(encoding="utf-8")
        canonical_contact_count += content.count(CANONICAL_EMAIL)

        if path.suffix in SOURCE_EXTENSIONS:
            if "text-muted-foreground" in content:
                fail(errors, path, "legacy muted text token remains")
            if re.search(r"\btext-(?:primary-)?foreground/", content):
                fail(errors, path, "raw foreground alpha text utility remains")
            if re.search(r"<main\b[^>]*\boverflow-x-hidden\b", content, re.DOTALL):
                fail(errors, path, "top-level main still masks horizontal overflow")

        for legacy_email in LEGACY_EMAILS:
            if legacy_email in content:
                fail(errors, path, f"legacy public contact remains: {legacy_email}")

    globals_css = (SRC / "app" / "globals.css").read_text(encoding="utf-8")
    if "overflow-x-hidden" in globals_css:
        fail(errors, SRC / "app" / "globals.css", "global overflow-x mask remains")

    site = (SRC / "lib" / "site.ts").read_text(encoding="utf-8")
    if 'DEFAULT_SITE_ORIGIN = "https://boundaryfirstlabs.com"' not in site:
        fail(errors, SRC / "lib" / "site.ts", "canonical site origin is not boundaryfirstlabs.com")
    if f'PUBLIC_CONTACT_EMAIL = "{CANONICAL_EMAIL}"' not in site:
        fail(errors, SRC / "lib" / "site.ts", "canonical public contact constant is missing")

    header = (SRC / "components" / "site-header.tsx").read_text(encoding="utf-8")
    for required in ('variant="compact"', "h-12 w-12", "lg:flex", "lg:hidden"):
        if required not in header:
            fail(errors, SRC / "components" / "site-header.tsx", f"header invariant missing: {required}")

    if canonical_contact_count == 0:
        errors.append("src: canonical public contact email is not exposed anywhere")

    if errors:
        print("P0.4 UI stabilization check failed:")
        for error in errors:
            print(f"  - {error}")
        raise SystemExit(1)

    print("P0.4 UI stabilization invariants pass")
    print(f"Canonical public contact references: {canonical_contact_count}")


if __name__ == "__main__":
    main()
