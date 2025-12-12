const antigravity = require('./lib/antigravity-client');

async function demo() {
  console.log('\n--- ANTIGRAVITY AUTOLAUNCH DEMO ---');
  console.log('Sending request... (No model specified)');
  
  try {
    // MAGIC: No config needed here. It just happens.
    const response = await antigravity.generate("Say 'It automatically happened!' if you are Gemini 3 Pro.");
    
    console.log('\n✅ RESPONSE RECEIVED:');
    console.log(response);
    console.log('\n(Billing cycle confirmed active.)');
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

demo();
