import sys
# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

import asyncio
import os
from dotenv import load_dotenv
from google import genai

# Load environment
# Load environment safely
basedir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(basedir, '.env.local')
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
    print(f"✅ Loaded .env.local from: {env_path}")
else:
    print("⚠️  Warning: .env.local not found at computed path.")
    # Fallback to standard load
    load_dotenv()

API_KEY = os.getenv("GOOGLE_GEMINI_API")
if not API_KEY:
    print("❌ ERROR: No GOOGLE_GEMINI_API found in .env.local")
    sys.exit(1)

# Placeholder for genai-processors (simulating the structure for now as we set up)
# In a real implementation, we would import processors here.

async def scan_vibe(target_topic):
    print(f"🍌 NANO BANANA VIBE SCANNER INITIALIZED")
    print(f"📡 Target: {target_topic}")
    
    client = genai.Client(api_key=API_KEY)
    
    # Simulating the "Industrial Pipe" process
    print("⚙️  Spinning up genai-processors...")
    
    prompt = f"""
    You are the "Vibe Coder" Editor (Gemini 3 Pro Persona).
    
    TASK: Perform a deep dive analysis on: '{target_topic}'
    CONTEXT: Use your grounding/search capabilities to find LIVE trends.
    
    OUTPUT FORMAT: MDX
    TONE: Authentic, Tactical, Survival-Mode, "Nano Banana"
    
    REQUIRED SECTIONS:
    1. The Situation (H1 Title & Summary of current state)
    2. The Vibe Check (Cultural Analysis based on Search Trends)
    3. The Future (Inferred trajectory of the field)
    4. 15 Evergreen Content Ideas (Bulleted list, specific titles)
    5. The Verdict (Strategic Advice)
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp', # Using Flash for speed as per rules
            contents=prompt
        )
        
        content = response.text
        
        # Save to file
        slug = target_topic.lower().replace(" ", "-")
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
