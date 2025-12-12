/**
 * ANTIGRAVITY CLIENT
 * "It just works."
 * 
 * Automatically loads:
 * 1. Verified Google Cloud Credentials (.env.local)
 * 2. Approved Model Configuration (antigravity.config.js)
 * 3. Default "Gemini 3 Pro" autolaunch settings
 */

const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const config = require('../antigravity.config.js');
const API_KEY = process.env.GOOGLE_GEMINI_API;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

class AntigravityClient {
  constructor() {
    if (!API_KEY) {
      throw new Error("Antigravity Check Failed: No Billing-Backed API Key found in environment.");
    }
    this.defaultModel = config.getModel(); // Auto-selects Gemini 3 Pro
    console.log(`[Antigravity] System Online. Default Model: ${this.defaultModel}`);
  }

  /**
   * Generate content. model is OPTIONAL.
   * If model is omitted, it AUTOMATICALLY uses the billing-backed default.
   */
  async generate(prompt, model = null) {
    const targetModel = model || this.defaultModel;
    
    // Log intent for verification
    // console.log(`[Antigravity] Launching: ${targetModel}`);

    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }] // 🍌 AUTO-LAUNCH: Grounding Enabled by Default
    });

    return new Promise((resolve, reject) => {
      const req = https.request(`${BASE_URL}/${targetModel}:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const response = JSON.parse(data);
              // Handle Grounding response structure (candidates could be slightly different)
              const text = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
              resolve(text);
            } catch (e) {
              reject(new Error(`Parse Error: ${e.message}`));
            }
          } else {
            reject(new Error(`Antigravity Failure: ${res.statusCode} ${data}`));
          }
        });
      });

      req.on('error', (e) => reject(new Error(`Network Error: ${e.message}`)));
      req.write(postData);
      req.end();
    });
  }
}

// Export a singleton instance for "import and go" usage
module.exports = new AntigravityClient();
