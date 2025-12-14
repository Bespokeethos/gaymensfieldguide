import os
import re

CONTENT_DIR = "src/app/blog/(content)"

def audit_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Check Metadata
    if "export const metadata =" not in content:
        issues.append("MISSING_METADATA")
    
    # Check Description
    if "description:" not in content:
        issues.append("MISSING_DESCRIPTION")
        
    # Check Vibe (Simple Heuristics)
    if "glitch-text" not in content and "Nano Banana" not in content:
        issues.append("LOW_VIBE_SCORE")
        
    # Check Image Prompts
    if "[IMAGE_PLACEHOLDER]" not in content and "<img" not in content:
         # It's okay if they have actual images, but if neither placeholder nor image, might be bare.
         pass 
         
    return issues

def main():
    print("🔎 Auditing Blog Content for Vibe Compliance...")
    print(f"📂 Directory: {CONTENT_DIR}")
    
    files = [f for f in os.listdir(CONTENT_DIR) if f.endswith('.mdx')]
    print(f"📄 Found {len(files)} files.")
    
    incomplete = []
    
    for filename in files:
        issues = audit_file(os.path.join(CONTENT_DIR, filename))
        if issues:
            print(f"❌ {filename}: {', '.join(issues)}")
            incomplete.append(filename)
        else:
            # print(f"✅ {filename}")
            pass
            
    print(f"\n📊 Audit Complete. {len(incomplete)} files need attention.")
    if len(incomplete) > 0:
        print("RECOMMENDATION: Run Vibe Fine-Tuning Agent on these files.")

if __name__ == "__main__":
    main()
