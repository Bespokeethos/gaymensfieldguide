import re

EDITORIAL_PATH = 'src/data/editorial.ts'

def main():
    try:
        with open(EDITORIAL_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find {EDITORIAL_PATH}")
        return

    # Count occurrences
    ids = len(re.findall(r"\bid:\s*['\"]", content))
    images = len(re.findall(r"\bimage:\s*['\"]", content))
    
    print(f"Total Articles (IDs): {ids}")
    print(f"Total Images Assigned: {images}")
    
    if ids > images:
        print(f"\n❌ DISCREPANCY DETECTED: {ids - images} articles are missing the 'image' property.")
        print("This is likely why thumbnails are not displaying for some items.")
        
        # Find exactly which ones (simple heuristic)
        # Split by objects is hard with regex, so we'll just report the count for now.
    else:
        print("\n✅ Counts match. Each article likely has an image property.")

if __name__ == "__main__":
    main()
