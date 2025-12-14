import os
import re

TARGET_DIRS = [
    "src/app/blog/(content)",
    "src/components/Antigravity"
]

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    modified = False
    
    # FIX 1: Unsafe target="_blank"
    # Regex lookbehind/ahead is tricky, simple replacement is safer for this specific pattern
    if 'target="_blank"' in content and 'rel="noopener noreferrer"' not in content:
        content = content.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"')
        modified = True
        
    # FIX 2: Missing Metadata in MDX (Template)
    if filepath.endswith(".mdx") and "export const metadata" not in content:
        filename = os.path.basename(filepath).replace('.mdx', '').replace('-', ' ').title()
        metadata_block = f"""
export const metadata = {{
  title: "{filename}: The Nano Banana Perspective",
  description: "An deep dive into {filename}. Vibe coded for your pleasure.",
  openGraph: {{
    images: ['/images/blog/default-thumb.png'],
  }}
}};

"""
        # Insert after imports if exist, else at top
        if "import " in content:
            last_import = content.rfind("import ")
            # Find end of that line
            end_of_line = content.find("\n", last_import) + 1
            content = content[:end_of_line] + metadata_block + content[end_of_line:]
        else:
            content = metadata_block + content
            
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"✅ FIXED: {os.path.basename(filepath)}"
    return f"EARLY PASS: {os.path.basename(filepath)}"

def main():
    print("🔧 AUTO-FIX BATCH INITIATED...")
    count = 0
    for d in TARGET_DIRS:
        if os.path.exists(d):
            for root, dirs, files in os.walk(d):
                for file in files:
                    if file.endswith(('.tsx', '.mdx')):
                        result = fix_file(os.path.join(root, file))
                        if "FIXED" in result:
                            print(result)
                            count += 1
    print(f"🎉 Batch Complete. {count} files patched.")

if __name__ == "__main__":
    main()
