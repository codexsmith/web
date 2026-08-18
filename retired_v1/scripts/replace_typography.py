import os
import glob
import re

target_dir = os.path.join(os.path.dirname(__file__), "..", "src")
files = glob.glob(os.path.join(target_dir, "**", "*.tsx"), recursive=True)
files.extend(glob.glob(os.path.join(target_dir, "**", "*.ts"), recursive=True))

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace text-[9px] and text-[10px] with text-[11px]
    new_content = re.sub(r'text-\[(9|10)px\]', 'text-[11px]', content)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {file_path}")

print("Typography replacements completed.")
