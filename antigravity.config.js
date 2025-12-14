// Antigravity Configuration
// Enforcing usage of specifically granted billing-backed models.

const config = {
  project_id: "bespokeethos-analytics-475007",
  location: "us-central1",
  models: {
    // High-intelligence model (The "Brain") - "Nano Banana 3" 
    // UPGRADED to Gemini 2.5 Pro for best reasoning + higher rate limits
    // BEST FOR: Complex Layouts, Reasoning, Architecture
    main: "models/gemini-2.5-pro", 
    
    // High-speed/efficiency model (The "Nano Banana")
    // UPGRADED to Gemini 2.0 Flash for faster responses + higher limits
    // BEST FOR: Quick fixes, simple text, fast iterations
    fast: "models/gemini-2.0-flash",
    
    // Aliases for specific tasks
    complex_layout: "models/gemini-2.5-pro",
    nano_banana_3: "models/gemini-2.5-pro",
    
    // Fallbacks (if 2.x has issues)
    legacy_pro: "models/gemini-1.5-pro",
    legacy_flash: "models/gemini-1.5-flash"
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
