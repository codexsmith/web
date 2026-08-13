from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
SOURCE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".mdx"}

MUTED_RE = re.compile(r"(?<![\w-])text-muted-foreground(?:/\d+)?\b")
STANDARD_RE = re.compile(r"(?<![\w-])text-foreground/(\d+)\b")
INVERSE_RE = re.compile(r"(?<![\w-])text-primary-foreground/(\d+)\b")


def normalize_text_utilities(content: str) -> str:
    content = MUTED_RE.sub("text-foreground-muted", content)
    content = INVERSE_RE.sub(
        lambda match: (
            "text-primary-foreground-secondary"
            if int(match.group(1)) >= 70
            else "text-primary-foreground-muted"
        ),
        content,
    )
    return STANDARD_RE.sub(
        lambda match: (
            "text-foreground-secondary"
            if int(match.group(1)) >= 80
            else "text-foreground-muted"
        ),
        content,
    )


def main() -> None:
    changed = []
    for path in sorted(SRC.rglob("*")):
        if not path.is_file() or path.suffix not in SOURCE_EXTENSIONS:
            continue
        before = path.read_text(encoding="utf-8")
        after = normalize_text_utilities(before)
        if after == before:
            continue
        path.write_text(after, encoding="utf-8")
        changed.append(path.relative_to(ROOT).as_posix())

    print(f"Normalized text utilities in {len(changed)} files")
    for path in changed:
        print(f"  {path}")


if __name__ == "__main__":
    main()
