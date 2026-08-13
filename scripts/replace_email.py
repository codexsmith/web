from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
CANONICAL_EMAIL = "contact@boundaryfirstlabs.com"
LEGACY_EMAILS = ("contact@boundaryfirst.com", "nsc319@gmail.com")
SOURCE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".json", ".mdx"}


def main() -> None:
    changed = []
    for path in sorted(SRC.rglob("*")):
        if not path.is_file() or path.suffix not in SOURCE_EXTENSIONS:
            continue
        before = path.read_text(encoding="utf-8")
        after = before
        for legacy_email in LEGACY_EMAILS:
            after = after.replace(legacy_email, CANONICAL_EMAIL)
        if after == before:
            continue
        path.write_text(after, encoding="utf-8")
        changed.append(path.relative_to(ROOT).as_posix())

    print(f"Canonicalized public contact email in {len(changed)} files")
    for path in changed:
        print(f"  {path}")


if __name__ == "__main__":
    main()
