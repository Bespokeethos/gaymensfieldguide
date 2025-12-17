import subprocess
import os

# The 4 priority targets to fix (replacing 6KB placeholders)
TARGETS = [
    ("cursor-vs-windsurf-thumb.png", "Cursor AI Editor vs Windsurf IDE coding battle, neon blue and orange, digital war"),
    ("rabbit-r1-thumb.png", "Rabbit R1 device disassembled, orange tech gadget, transparent xray view, cyberpunk style"),
    ("smart-fridge-thumb.png", "Evil Smart Fridge with red eye hal 9000, dark kitchen, ominous lighting, IoT nightmare"),
    ("flipper-thumb.png", "Flipper Zero hacking device, neon green waves, cyber security tool, glowing screen")
]

SCRIPT_PATH = "pipe/generate_image.js" # We'll use the existing JS wrapper if it works, or recreate it.
OUTPUT_DIR = "public/images/blog"

def main():
    print("🎨 REGENERATING 4 PRIORITY THUMBNAILS...")
    
    for filename, prompt in TARGETS:
        output_path = os.path.join(OUTPUT_DIR, filename)
        full_prompt = f"{prompt}. Photorealistic, 8-bit Noir, Dark Industrial, Volumetric Lighting. High Detail."
        
        print(f"\nGenerating: {filename}")
        print(f"Prompt: {full_prompt}")
        
        # Call the JS generation script
        # We assume pipe/generate_image.js exists and takes [prompt, output_path]
        try:
            subprocess.run(["node", SCRIPT_PATH, full_prompt, output_path], check=True)
            print(f"✅ Success: {filename}")
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed: {filename}")

if __name__ == "__main__":
    main()
