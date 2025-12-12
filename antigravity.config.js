// Antigravity Configuration
// Enforcing usage of specifically granted billing-backed models.

const config = {
  project_id: "gen-lang-client-0566947374",
  location: "us-central1",
  models: {
    // High-intelligence model (The "Brain") - "Nano Banana 3"
    // BEST FOR: Complex Layouts, Reasoning, Architecture
    main: "models/gemini-3-pro-preview", 
    
    // High-speed/efficiency model (The "Nano Banana")
    // BEST FOR: Quick fixes, simple text, fast iterations
    fast: "models/nano-banana-pro-preview",
    
    // Aliases for specific tasks
    complex_layout: "models/gemini-3-pro-preview",
    nano_banana_3: "models/gemini-3-pro-preview"
  },
  billing: {
    status: "verified",
    source: "Google Cloud Credits",
    api_key_ref: "GOOGLE_GEMINI_API"
  },
  arsenal: {
    grounding: { enabled: true, source: "google_search" },
    pipe: { enabled: true, path: "pipe/vibe_scanner.py" },
    voice: { enabled: true, path: "lib/antigravity-tts.js" },
    editor: { enabled: true, agent: "gemini-docs-agent" }
  },
  
  // Helper to ensure we always get the right model config
  getModel: (type = 'main') => {
    if (type === 'layout' || type === 'complex' || type === 'nano_banana_3') {
      return config.models.complex_layout;
    }
    return type === 'fast' ? config.models.fast : config.models.main;
  }
};

module.exports = config;
