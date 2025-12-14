require('dotenv').config({ path: '.env.local' });
const config = require('./antigravity.config.js');

console.log('--- ANTIGRAVITY LAUNCH SEQUENCE ---');

// Check 1: What is the default model if we ask for nothing?
const defaultModel = config.getModel(); // Should be main
console.log('Default Model (No Args):', defaultModel);

// Check 2: What is the environment backup?
const envDefault = process.env.DEFAULT_GENERATION_MODEL;
console.log('Environment Default:', envDefault);

// Check 3: Is it the one the user wants?
const target = "models/gemini-1.5-pro";

if (defaultModel === target && envDefault === target) {
  console.log('\n✅ VERIFIED: "Nano Banana 3" (Gemini 1.5 Pro) is hard-wired as the autoload default.');
} else {
  console.error('\n❌ MISMATCH: Configuration does not match requested default.');
  console.error(`Expected: ${target}`);
  console.error(`Actual Config: ${defaultModel}`);
  console.error(`Actual Env: ${envDefault}`);
  process.exit(1);
}
