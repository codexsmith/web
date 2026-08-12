import os
import re

def main():
    src_dir = r"h:\Boundary First Institute\Webpage\src"
    
    # Replacement logic
    replacements = [
        # Primary Foreground (inverse text)
        (r"text-primary-foreground/(?:70|75|80|85|90)\b", "text-primary-foreground-secondary"),
        (r"text-primary-foreground/(?:30|40|45|50|55|60|65)\b", "text-primary-foreground-muted"),
        
        # Muted Foreground (which fails WCAG AA natively, map to new solid semantic muted)
        (r"text-muted-foreground(?:/[0-9]+)?\b", "text-foreground-muted"),
        
        # Standard Foreground (dark ink)
        (r"text-foreground/(?:80|85|90)\b", "text-foreground-secondary"),
        (r"text-foreground/(?:40|45|50|55|60|65|70|72|75)\b", "text-foreground-muted"),
    ]
    
    files_changed = 0
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith((".tsx", ".ts", ".jsx", ".js")):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    
                original = content
                for pattern, repl in replacements:
                    content = re.sub(pattern, repl, content)
                    
                if original != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(content)
                    files_changed += 1
                    print(f"Updated {os.path.relpath(path, src_dir)}")
                    
    print(f"Total files updated: {files_changed}")

if __name__ == "__main__":
    main()
