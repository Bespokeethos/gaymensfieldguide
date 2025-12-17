import os
import re

EDITORIAL_PATH = 'src/data/editorial.ts'
IMAGES_DIR = 'public/images/blog'

def main():
    try:
        with open(EDITORIAL_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find {EDITORIAL_PATH}")
        return

    # specific regex for the property in the TS file
    links = re.findall(r"image:\s*'(/images/blog/.*?)'", content)
    
    if not os.path.exists(IMAGES_DIR):
        print(f"Error: Directory {IMAGES_DIR} does not exist.")
        return

    existing_files = set(os.listdir(IMAGES_DIR))
    # map lowercase to actual filename for case check
    existing_lower = {f.lower(): f for f in existing_files}

    missing = []
    case_mismatch = []

    print(f"Checking {len(links)} image references...")

    for link in links:
        filename = os.path.basename(link)
        
        if filename in existing_files:
            continue
        elif filename.lower() in existing_lower:
            case_mismatch.append((filename, existing_lower[filename.lower()]))
        else:
            missing.append(filename)

    if missing:
        print("\n❌ MISSING IMAGES (File does not exist):")
        for m in missing:
            print(f" - {m}")
    else:
        print("\n✅ No completely missing images found.")

    if case_mismatch:
        print("\n⚠️ CASE SENSITIVITY ISSUES (Fix in editorial.ts):")
        for bad, good in case_mismatch:
            print(f" - Referenced: {bad} | Actual: {good}")
    else:
        print("\n✅ No case sensitivity issues found.")

if __name__ == "__main__":
    main()
