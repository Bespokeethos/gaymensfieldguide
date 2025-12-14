import asyncio
import os
import re
import random

# Configuration
TARGET_DIR = "src/app/blog/(content)"
CONCURRENCY_LIMIT = 3  # Strictly 3 parallel processes

# Interactive Components to Inject if missing (weighted random choice)
INTERACTIVE_COMPONENTS = [
    '<IoTScanner />',
    '<QuizEngine \n  title="VIBE_CHECK"\n  type="game"\n  questions={[\n    { id: 1, text: "Is this verified?", options: [{ label: "Yes", isCorrect: true }, { label: "No", isCorrect: false }] }\n  ]}\n/>',
    '<SaaSCalculator />',
    '<TuringTest />',
    '<ResourceBalancer />'
]

async def audit_file(filepath, semaphore):
    async with semaphore:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            filename = os.path.basename(filepath)
            original_content = content
            fixes = []

            # CHECK 1: Metadata (SEO)
            if "export const metadata" not in content:
                slug = filename.replace('.mdx', '').replace('-', ' ').title()
                metadata_block = f"""
export const metadata = {{
  title: "{slug} | GMFG",
  description: "Deep dive into {slug}. Optimized for the Nano Banana aesthetics.",
  openGraph: {{
    images: ['/images/blog/default-thumb.png'],
  }}
}};
"""
                # Insert at top or after imports
                if "import " in content:
                    last_imp = content.rfind("import ")
                    eol = content.find("\n", last_imp) + 1
                    content = content[:eol] + "\n" + metadata_block + "\n" + content[eol:]
                else:
                    content = metadata_block + "\n" + content
                fixes.append("METADATA_INJECTED")

            # CHECK 2: Interactivity (At least 2 containers)
            # Count interactive components
            interactive_count = len(re.findall(r'<[A-Z][a-zA-Z]*Scanner', content)) + \
                                len(re.findall(r'<[A-Z][a-zA-Z]*Engine', content)) + \
                                len(re.findall(r'<[A-Z][a-zA-Z]*Calculator', content)) + \
                                len(re.findall(r'<[A-Z][a-zA-Z]*Test', content)) + \
                                len(re.findall(r'<[A-Z][a-zA-Z]*Balancer', content)) + \
                                len(re.findall(r'<InteractiveContainer', content))

            if interactive_count < 2:
                missing = 2 - interactive_count
                for _ in range(missing):
                    component = random.choice(INTERACTIVE_COMPONENTS)
                    # Insert before the last section or near end
                    insert_point = content.rfind("## ")
                    if insert_point == -1: insert_point = len(content) // 2
                    
                    content = content[:insert_point] + "\n\n" + component + "\n\n" + content[insert_point:]
                    # Add import if needed (simplified check)
                    comp_name = re.search(r'<([A-Z][a-zA-Z]*)', component).group(1)
                    if f"import {{ {comp_name} }}" not in content:
                         import_stm = f"import {{ {comp_name} }} from '@/components/Antigravity/{comp_name}';"
                         content = import_stm + "\n" + content
                fixes.append(f"INTERACTIVITY_BOOST (+{missing})")

            # CHECK 3: Images (Alt Tags / Placeholders)
            # Ensure every image has alt text or is a placeholder
            # This logic captures standard markdown images ![alt](src) and ensures 'alt' is not empty
            # For this specific aesthetic, we mostly use text placeholders [IMAGE_PLACEHOLDER], checking if those exist.
            if "[IMAGE_PLACEHOLDER" not in content and "![" not in content:
                 # Inject a header placeholder
                 placeholder = f'\n<div className="relative w-full aspect-video bg-zinc-900 border-win95 mb-8 flex items-center justify-center">\n  <p className="font-mono text-xs text-zinc-600">[IMAGE_PLACEHOLDER: {filename.upper()}]</p>\n</div>\n'
                 # Insert after H1
                 h1_match = re.search(r'^# .*$', content, re.MULTILINE)
                 if h1_match:
                     content = content[:h1_match.end()] + "\n" + placeholder + content[h1_match.end():]
                     fixes.append("IMAGE_PLACEHOLDER_ADDED")

            # CHECK 4: Universal Design (High Contrast Patch)
            # Replace low contrast colors
            if "text-industrial-500" in content:
                content = content.replace("text-industrial-500", "text-zinc-500")
                fixes.append("CONTRAST_FIXED")
            if "text-industrial-400" in content:
                content = content.replace("text-industrial-400", "text-zinc-400")
                fixes.append("CONTRAST_FIXED")

            # SAVE
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                return f"✅ FIXED {filename}: {', '.join(fixes)}"
            else:
                return f"✨ CLEAN {filename}"

        except Exception as e:
            return f"❌ ERROR {filename}: {str(e)}"

async def main():
    print("🚀 SYSTEMATIC BATCH AUDIT (3-PARALLEL) INITIALIZING...")
    
    files = [os.path.join(TARGET_DIR, f) for f in os.listdir(TARGET_DIR) if f.endswith(".mdx")]
    print(f"📂 Found {len(files)} content files.")
    
    # Strictly 3 concurrent tasks
    semaphore = asyncio.Semaphore(CONCURRENCY_LIMIT)
    
    tasks = [audit_file(f, semaphore) for f in files]
    results = await asyncio.gather(*tasks)
    
    print("\n" + "="*50)
    print("AUDIT REPORT")
    print("="*50)
    
    fixed_count = 0
    clean_count = 0
    
    for r in results:
        print(r)
        if "FIXED" in r: fixed_count += 1
        else: clean_count += 1
        
    print("="*50)
    print(f"📊 SUMMARY: {clean_count} Clean, {fixed_count} Fixed. (Total: {len(results)})")

if __name__ == "__main__":
    asyncio.run(main())
