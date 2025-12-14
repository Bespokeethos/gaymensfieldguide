import json
import os

PRODUCTS_FILE = "pipe/products.json"
OUTPUT_FILE = "src/app/arsenal/page.tsx"

TEMPLATE_HEADER = """
import React from 'react';
import { VibeBento, BentoItem } from '@/components/Antigravity/VibeBento';
import { SimulatorEngine } from '@/components/Antigravity/SimulatorEngine';
import Image from 'next/image';

export const metadata = {
  title: "The Arsenal | GMFG",
  description: "Tactical hardware for the modern Vibe Coder. Tools, not toys.",
};

export default function ArsenalPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-dashed border-zinc-700 pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-amber-600 mb-4 uppercase glitch-text">
          The Arsenal.
        </h1>
        <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
          <span className="bg-zinc-900 px-2 py-1 rounded text-neon-yellow border border-neon-yellow/20">SUPPLY_DROP_ACTIVE</span>
          <span>STATUS: IN_STOCK</span>
          <span>SHIPPING: GLOBAL</span>
        </div>
      </div>

      <VibeBento>
"""

TEMPLATE_FOOTER = """      </VibeBento>
      
      <div className="mt-12 p-8 border border-zinc-800 bg-zinc-950/50 text-center font-mono text-zinc-500 text-xs">
        <p>DISCLAIMER: WE ARE NOT RESPONSIBLE FOR HOW YOU USE THESE TOOLS.</p>
        <p className="mt-2 text-neon-red">DO NOT BE EVIL.</p>
      </div>
    </div>
  );
}
"""

def generate_page():
    print("⚔️  FORGING THE ARSENAL...")
    
    if not os.path.exists(PRODUCTS_FILE):
        print(f"❌ ERROR: {PRODUCTS_FILE} not found.")
        return

    with open(PRODUCTS_FILE, 'r') as f:
        products = json.load(f)

    body = ""
    
    # Feature the first item (e.g. Flipper) as a hero span-2
    for i, p in enumerate(products):
        span = 2 if i == 0 else 1
        
        simulator_block = ""
        if p.get("simulator") and p["simulator"] != "none":
            # If it has a simulator, embed it
            simulator_block = f"""
            <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-[10px] text-zinc-500 mb-2 uppercase">VIRTUAL_DEMO_MODE:</p>
                <SimulatorEngine type="{p['simulator']}" autoStart={{false}} />
            </div>
            """
        
        item_html = f"""
        <BentoItem span={{{span}}} title="{p['category']}" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">{p['name']}</h3>
                    <span className="font-mono text-neon-yellow">{p['price']}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{p['description']}</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: {p['id']}]
                     </div>
                </div>
            </div>
            
            {simulator_block}
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        """
        body += item_html

    full_content = TEMPLATE_HEADER + body + TEMPLATE_FOOTER

    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(full_content)
        
    print(f"✅ Arsenal Page Deployed to: {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_page()
