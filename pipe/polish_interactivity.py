import asyncio
import os
import re
import random
from dotenv import load_dotenv
from google import genai

# Configuration
TARGET_DIR = "src/app/blog/(content)"
CONCURRENCY_LIMIT = 6

# Load Env
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env.local'))
API_KEY = os.getenv("GOOGLE_GEMINI_API") or os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else None

# Game Templates
GAMES = {
    "VibeSnake": '<VibeSnake topic="{topic}" tokenName="{token}" />',
    "PromptTyper": '<PromptTyper topic="{topic}" customPrompt="{prompt}" />',
    "ContextCollapse": '<ContextCollapse topic="{topic}" />'
}

async def analyze_and_inject(filepath, semaphore):
    async with semaphore:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            filename = os.path.basename(filepath)
            
            # Skip if already has a game
            if any(g in content for g in GAMES.keys()):
                return f"✨ SKIP {filename}: Game already present"

            # AI Analysis (Simulated or Real depending on API Key)
            game_choice = random.choice(list(GAMES.keys()))
            props = {"topic": "VIBE", "token": "TOKENS", "prompt": "initiate sequence"}

            if client:
                try:
                    prompt = f"""
                    Analyze this article content and suggest a "Vibe Minigame" configuration.
                    Article Filename: {filename}
                    Preview: {content[:500]}...

                    Available Games:
                    1. VibeSnake (Needs 'topic' and 'token' name e.g. topic="IOT_HACK", token="PACKETS")
                    2. PromptTyper (Needs 'topic' and 'prompt' string relative to article)
                    3. ContextCollapse (Needs 'topic')

                    Return JSON ONLY: {{ "game": "GameName", "topic": "string", "token": "string", "prompt": "string" }}
                    """
                    response = client.models.generate_content(
                        model='gemini-2.0-flash-exp', 
                        contents=prompt,
                        config={'response_mime_type': 'application/json'}
                    )
                    import json
                    data = json.loads(response.text)
                    game_choice = data.get("game", game_choice)
                    props["topic"] = data.get("topic", "SYSTEM").upper().replace(" ", "_")
                    props["token"] = data.get("token", "DATA").upper()
                    props["prompt"] = data.get("prompt", "override system protocol").lower()
                except Exception as e:
                    print(f"⚠️ AI Fail for {filename}: {e}")

            # Construct Component Config
            component_str = GAMES.get(game_choice, GAMES["VibeSnake"]).format(**props)
            
            # Injection Logic
            modified = False
            
            # Add Import
            if f"import {{ {game_choice} }}" not in content:
                 last_imp = content.rfind("import ")
                 if last_imp != -1:
                     eol = content.find("\n", last_imp) + 1
                     import_line = f"import {{ {game_choice} }} from '@/components/Antigravity/{game_choice}';\n"
                     content = content[:eol] + import_line + content[eol:]
            
            # Inject at random strategic point (End or Middle)
            # Find a header to inject before
            headers = [m.start() for m in re.finditer(r'^## ', content, re.MULTILINE)]
            if headers:
                insert_pos = headers[-1] # Before last section
                content = content[:insert_pos] + "\n" + component_str + "\n\n" + content[insert_pos:]
                modified = True
            else:
                content += "\n\n" + component_str + "\n"
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                return f"✅ CUSTOMIZED {filename}: {game_choice} ({props['topic']})"
            
            return f"❌ NO-OP {filename}"

        except Exception as e:
            return f"❌ ERROR {filename}: {str(e)}"

async def main():
    print(f"🚀 AGENCY CONTEXTUAL INJECTOR (6-PARALLEL) STARTING...")
    
    files = [os.path.join(TARGET_DIR, f) for f in os.listdir(TARGET_DIR) if f.endswith(".mdx")]
    
    semaphore = asyncio.Semaphore(CONCURRENCY_LIMIT)
    tasks = [analyze_and_inject(f, semaphore) for f in files]
    results = await asyncio.gather(*tasks)
    
    injects = sum(1 for r in results if "CUSTOMIZED" in r)
    print(f"📊 REPORT: {injects} files customized with AI-Agent contexts.")
    for r in results:
        if "CUSTOMIZED" in r: print(r)

if __name__ == "__main__":
    asyncio.run(main())
