/**
 * ANTIGRAVITY CLIENT
 * "It just works."
 * 
 * Automatically loads:
 * 1. Verified Google Cloud Credentials (.env.local)
 * 2. Approved Model Configuration (antigravity.config.js)
 * 3. Default "Gemini 3 Pro" autolaunch settings
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const config = require('../antigravity.config.js');
const API_KEY = process.env.GOOGLE_GEMINI_API;

class AntigravityClient {
  constructor() {
    if (!API_KEY) {
      throw new Error("Antigravity Check Failed: No Billing-Backed API Key found in environment.");
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    this.defaultModelName = config.getModel(); // Auto-selects Gemini 3 Pro
    this.model = genAI.getGenerativeModel({ 
      model: this.defaultModelName,
      tools: [{ google_search: {} }] // 🍌 AUTO-LAUNCH: Grounding Enabled by Default
    });

    console.log(`[Antigravity] System Online. Default Model: ${this.defaultModelName}`);
  }

  /**
   * Generate content from a single prompt.
   * This is a convenience wrapper for batchGenerate.
   */
  async generate(prompt) {
    const results = await this.batchGenerate([prompt]);
    return results[0];
  }

  /**
   * Generates content for an array of prompts in parallel.
   * @param {string[]} prompts An array of prompts to process.
   * @returns {Promise<string[]>} A promise that resolves to an array of generated texts.
   */
  async batchGenerate(prompts) {
    console.log(`[Antigravity] Batch processing ${prompts.length} prompts in parallel.`);
    
    const generationPromises = prompts.map(prompt => {
      return this.model.generateContent(prompt).then(result => {
        const text = result.response.text();
        return text?.trim();
      }).catch(error => {
        console.error(`[Antigravity] Error generating content for a prompt:`, error);
        return null; // Return null for failed requests to not break the entire batch
      });
    });

    return Promise.all(generationPromises);
  }
}

// Export a singleton instance for "import and go" usage
module.exports = new AntigravityClient();
