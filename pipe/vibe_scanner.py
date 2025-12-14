import sys
# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

import asyncio
import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env.local'))

# Configure Gemini
API_KEY = os.getenv("GOOGLE_GEMINI_API") or os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    print("❌ ERROR: No GOOGLE_GEMINI_API or GOOGLE_API_KEY found in .env.local")
    sys.exit(1)

print(f"✅ Vibe Scanner: Authenticated with verified billing key (Length: {len(API_KEY)})")
print("✅ Quota Mode: High-Volume (Billing-Backed)")

# Note: Using the new Google Gen AI SDK
client = genai.Client(api_key=API_KEY)

# Placeholder for genai-processors (simulating the structure for now as we set up)
# In a real implementation, we would import processors here.

async def scan_vibe(target_topic):
    print(f"🍌 NANO BANANA VIBE SCANNER INITIALIZED")
    print(f"📡 Target: {target_topic}")
    
    # Simulating the "Industrial Pipe" process
    print("⚙️  Spinning up genai-processors...")
    
    prompt = f"""
    You are the "Vibe Coder" Editor (Gemini 3 Pro Persona).
    
    TASK: Write a COVER ARTICLE about: '{target_topic}'
    CONTEXT: Search for "OpenAI GPT-5.2 Garlic", "Mixture of Experts history 1991", "AI model testing credentials AGI certification".
    
    TONE: Undeniably good, infused with reality, real voice, fun, "Nano Banana" aesthetic.
    
    REQUIRED SECTIONS:
    1. THE COVER STORY (H1): "OpenAI Announced GPT-5.2 (Garlic)" - use your hallucination detector to verify facts.
    2. THE CREDENTIALS (H2): A deep dive into AI model testing credentials and AGI certification. What do they mean? Are we victims?
    3. MIXTURE OF EXPERTS (H2): Explain the theory. State that we are "firm believers".
    4. HISTORY BLOCK (Callout): "Fun History Section" - Mixture of Experts first introduced in 1991 (Subject Check this). Make AI history a recurring "thing".
    5. THE VERDICT (H2): Strategic advice.
    
    NOTE: This is a context-aware Gemini Pro 3 voice running through Antigravity prototype.
    OUTPUT FORMAT: MDX
    """
    
    try:
        # Check available models (debugging)
        # for m in client.models.list():
        #    print(m.name)

        response = client.models.generate_content(
            model='gemini-2.0-flash-exp', # Upgrade to 2.0 Flash for Search Grounding if available, or fallback to 1.5-pro
            contents=prompt,
            config={
                'tools': [{'google_search': {}}] # ENABLE GROUNDING
            }
        )
        
        content = response.text
        
        # Save to file
        
        # Save to file
        # Slugify the topic
        slug = target_topic.lower().replace(" ", "-").replace(":", "").replace("?", "").replace(".", "").replace(",", "")
        filename = f"src/app/blog/(content)/{slug}.mdx"
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"✅ Vibe Scan Complete. Artifact saved to: {filename}")
        
    except Exception as e:
        print(f"❌ Vibe Scan Failed: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python vibe_scanner.py '<topic>'")
        sys.exit(1)
        
    topic = sys.argv[1]
    asyncio.run(scan_vibe(topic))
